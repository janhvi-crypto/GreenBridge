import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchInventory,
  insertInventory,
  updateInventoryStatus,
  fetchBusinessRequests,
  insertBusinessRequest,
  updateRequestStatus,
  fetchCollaborations,
  upsertCollaborationFromRequest,
  updateCollaborationStatus,
  fetchOrders,
  insertOrder,
  updateOrderStatus,
  fetchActivityLog,
  logActivity,
  fetchConsumerProducts,
  insertConsumerProduct,
} from "@/lib/dashboard-api";
import type { InventoryStatus, RequestStatus, OrderStatus, CollaborationStatus } from "@/types/dashboard";

const QUERY_KEYS = {
  inventory: ["inventory"] as const,
  inventoryAvailable: ["inventory", "available"] as const,
  requests: ["business_requests"] as const,
  myRequests: ["business_requests", "my"] as const,
  collaborations: ["collaborations"] as const,
  myCollaborations: ["collaborations", "my"] as const,
  orders: ["orders"] as const,
  myOrders: ["orders", "my"] as const,
  activity: ["activity_log"] as const,
  consumerProducts: ["consumer_products"] as const,
};

// ---------- Inventory ----------
export function useInventory(onlyAvailable = false) {
  return useQuery({
    queryKey: onlyAvailable ? QUERY_KEYS.inventoryAvailable : QUERY_KEYS.inventory,
    queryFn: () => fetchInventory(onlyAvailable),
    retry: 1,
  });
}

export function useInsertInventory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: insertInventory,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.inventory });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.inventoryAvailable });
    },
  });
}

export function useUpdateInventoryStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: InventoryStatus }) =>
      updateInventoryStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.inventory });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.inventoryAvailable });
    },
  });
}

// ---------- Business requests ----------
export function useBusinessRequests(myOnly = false) {
  return useQuery({
    queryKey: myOnly ? QUERY_KEYS.myRequests : QUERY_KEYS.requests,
    queryFn: () => fetchBusinessRequests(myOnly),
    retry: 1,
  });
}

export function useInsertBusinessRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: insertBusinessRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.requests });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.myRequests });
    },
  });
}

export function useUpdateRequestStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
      gov_notes,
    }: {
      id: string;
      status: RequestStatus;
      gov_notes?: string;
    }) => updateRequestStatus(id, status, gov_notes),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.requests });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.myRequests });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.orders });
    },
  });
}

// ---------- Collaborations ----------
export function useCollaborations(myOnly = false) {
  return useQuery({
    queryKey: myOnly ? QUERY_KEYS.myCollaborations : QUERY_KEYS.collaborations,
    queryFn: () => fetchCollaborations(myOnly),
    retry: 1,
  });
}

export function useUpsertCollaboration() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      request_id,
      title,
      detail,
    }: {
      request_id: string;
      title: string;
      detail: string;
    }) => upsertCollaborationFromRequest(request_id, title, detail),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.collaborations });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.myCollaborations });
    },
  });
}

export function useUpdateCollaborationStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: CollaborationStatus }) =>
      updateCollaborationStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.collaborations });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.myCollaborations });
    },
  });
}

// ---------- Orders ----------
export function useOrders(myOnly = false) {
  return useQuery({
    queryKey: myOnly ? QUERY_KEYS.myOrders : QUERY_KEYS.orders,
    queryFn: () => fetchOrders(myOnly),
    retry: 1,
  });
}

export function useInsertOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: insertOrder,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.orders });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.myOrders });
    },
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
      progress,
    }: {
      id: string;
      status: OrderStatus;
      progress?: number;
    }) => updateOrderStatus(id, status, progress),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.orders });
      qc.invalidateQueries({ queryKey: QUERY_KEYS.myOrders });
    },
  });
}

// ---------- Activity ----------
export function useActivityLog(limit = 20) {
  return useQuery({
    queryKey: [...QUERY_KEYS.activity, limit],
    queryFn: () => fetchActivityLog(limit),
    retry: 1,
  });
}

export function useLogActivity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: { actor_role: string; action: string; detail?: string; entity_type?: string; entity_id?: string }) => logActivity(p),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.activity });
    },
  });
}

// ---------- Consumer products ----------
export function useConsumerProducts() {
  return useQuery({
    queryKey: QUERY_KEYS.consumerProducts,
    queryFn: fetchConsumerProducts,
    retry: 1,
  });
}

export function useInsertConsumerProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: insertConsumerProduct,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: QUERY_KEYS.consumerProducts });
    },
  });
}
