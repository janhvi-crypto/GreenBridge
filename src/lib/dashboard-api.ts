/**
 * Supabase data layer for Business ↔ Government dashboards.
 * Use these from hooks; components use hooks so we can add loading/error and fallbacks.
 */

import { supabase } from "@/lib/supabase";
import type {
  InventoryItem,
  BusinessRequest,
  Collaboration,
  Order,
  ActivityLog,
  ConsumerProduct,
  InventoryStatus,
  RequestStatus,
  OrderStatus,
  CollaborationStatus,
} from "@/types/dashboard";

// ---------- Profile (ensure role for RLS) ----------
/** Call when government user loads dashboard so user_role() returns 'government' for RLS. */
export async function ensureGovernmentProfile(): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        role: "government",
        email: user.email ?? undefined,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
}

// ---------- Inventory ----------
export async function fetchInventory(onlyAvailable = false): Promise<InventoryItem[]> {
  let q = supabase
    .from("inventory")
    .select("*")
    .order("created_at", { ascending: false });
  if (onlyAvailable) {
    q = q.eq("status", "available");
  }
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as InventoryItem[];
}

export async function insertInventory(row: {
  category: string;
  quantity: number;
  unit?: string;
  grade: "A" | "B" | "C";
  price_min?: number;
  price_max?: number;
  location?: string;
  status?: InventoryStatus;
  qr_code?: string;
  description?: string;
  image_url?: string;
}): Promise<InventoryItem> {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("inventory")
    .insert({
      ...row,
      unit: row.unit ?? "MT",
      status: row.status ?? "available",
      created_by: user?.id ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data as InventoryItem;
}

export async function updateInventoryStatus(
  id: string,
  status: InventoryStatus
): Promise<void> {
  const { error } = await supabase
    .from("inventory")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

// ---------- Business requests ----------
export async function fetchBusinessRequests(myOnly = false): Promise<BusinessRequest[]> {
  let q = supabase
    .from("business_requests")
    .select("*")
    .order("created_at", { ascending: false });
  if (myOnly) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) q = q.eq("business_user_id", user.id);
  }
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as BusinessRequest[];
}

export async function insertBusinessRequest(row: {
  material_type: string;
  quantity: number;
  quantity_unit?: string;
  budget?: string;
  deadline?: string;
  company_name?: string;
}): Promise<BusinessRequest> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("business_requests")
    .insert({
      ...row,
      business_user_id: user.id,
      company_name: row.company_name ?? user.user_metadata?.company_name ?? user.email ?? null,
      status: "submitted",
      submitted_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) throw error;
  return data as BusinessRequest;
}

export async function updateRequestStatus(
  id: string,
  status: RequestStatus,
  gov_notes?: string
): Promise<void> {
  const updates: { status: RequestStatus; gov_notes?: string; updated_at: string } = {
    status,
    updated_at: new Date().toISOString(),
  };
  if (gov_notes !== undefined) updates.gov_notes = gov_notes;
  const { data, error } = await supabase
    .from("business_requests")
    .update(updates)
    .eq("id", id)
    .select("id")
    .maybeSingle();
  if (error) throw error;
  if (!data) {
    throw new Error(
      "Permission denied: ensure your account has Government role (Supabase Auth → Users → user_metadata.role = 'government', or sign in again from Government login)."
    );
  }
}

// ---------- Collaborations ----------
export async function fetchCollaborations(myOnly = false): Promise<Collaboration[]> {
  let q = supabase
    .from("collaborations")
    .select("*")
    .order("created_at", { ascending: false });
  if (myOnly) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: reqs } = await supabase
        .from("business_requests")
        .select("id")
        .eq("business_user_id", user.id);
      const ids = (reqs ?? []).map((r) => r.id);
      if (ids.length) q = q.in("request_id", ids);
      else return [];
    }
  }
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Collaboration[];
}

export async function upsertCollaborationFromRequest(
  request_id: string,
  title: string,
  detail: string
): Promise<Collaboration> {
  const { data: existing } = await supabase
    .from("collaborations")
    .select("*")
    .eq("request_id", request_id)
    .maybeSingle();
  if (existing) {
    const { data, error } = await supabase
      .from("collaborations")
      .update({ title, detail, updated_at: new Date().toISOString() })
      .eq("id", existing.id)
      .select()
      .single();
    if (error) throw error;
    return data as Collaboration;
  }
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("collaborations")
    .insert({
      request_id,
      title,
      detail,
      status: "pending",
      gov_user_id: user?.id ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data as Collaboration;
}

export async function updateCollaborationStatus(
  id: string,
  status: CollaborationStatus
): Promise<void> {
  const { error } = await supabase
    .from("collaborations")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

// ---------- Orders ----------
export async function fetchOrders(myOnly = false): Promise<Order[]> {
  let q = supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (myOnly) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) q = q.eq("business_user_id", user.id);
  }
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as Order[];
}

export async function insertOrder(row: {
  request_id?: string;
  business_user_id: string;
  material_type: string;
  quantity: string;
  amount?: string;
  supplier?: string;
  delivery_date?: string;
}): Promise<Order> {
  const { data, error } = await supabase
    .from("orders")
    .insert({ ...row, status: "processing", progress: 0 })
    .select()
    .single();
  if (error) throw error;
  return data as Order;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  progress?: number
): Promise<void> {
  const updates: { status: OrderStatus; updated_at: string; progress?: number } = {
    status,
    updated_at: new Date().toISOString(),
  };
  if (progress !== undefined) updates.progress = progress;
  const { error } = await supabase.from("orders").update(updates).eq("id", id);
  if (error) throw error;
}

// ---------- Activity log ----------
export async function fetchActivityLog(limit = 20): Promise<ActivityLog[]> {
  const { data, error } = await supabase
    .from("activity_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as ActivityLog[];
}

export async function logActivity(p: {
  actor_role: string;
  action: string;
  detail?: string;
  entity_type?: string;
  entity_id?: string;
}): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.from("activity_log").insert({
    user_id: user?.id ?? null,
    actor_role: p.actor_role,
    action: p.action,
    detail: p.detail ?? null,
    entity_type: p.entity_type ?? null,
    entity_id: p.entity_id ?? null,
  });
}

// ---------- Consumer products (for consumer marketplace) ----------
export async function fetchConsumerProducts(): Promise<ConsumerProduct[]> {
  const { data, error } = await supabase
    .from("consumer_products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ConsumerProduct[];
}

export async function insertConsumerProduct(row: {
  name: string;
  category: string;
  description?: string;
  story?: string;
  image_url?: string;
  price: number;
  original_price?: number;
  waste_used?: string;
  co2_saved?: string;
  materials_source?: string;
  qr_code?: string;
  badge?: string;
}): Promise<ConsumerProduct> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  const { data, error } = await supabase
    .from("consumer_products")
    .insert({
      ...row,
      business_user_id: user.id,
      company_name: user.user_metadata?.company_name ?? user.email ?? null,
      verified: true,
    })
    .select()
    .single();
  if (error) throw error;
  return data as ConsumerProduct;
}
