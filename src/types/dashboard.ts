// Shared types for Business & Government dashboards

export type InventoryStatus = "available" | "reserved" | "processing";
export type InventoryGrade = "A" | "B" | "C";

export interface InventoryItem {
  id: string;
  category: string;
  quantity: number;
  unit: string;
  grade: InventoryGrade;
  price_min: number | null;
  price_max: number | null;
  location: string | null;
  status: InventoryStatus;
  qr_code: string | null;
  description: string | null;
  image_url: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export type RequestStatus =
  | "draft"
  | "submitted"
  | "approved"
  | "rejected"
  | "mou_pending"
  | "in_delivery"
  | "delivered";

export interface BusinessRequest {
  id: string;
  business_user_id: string;
  company_name: string | null;
  material_type: string;
  quantity: number;
  quantity_unit: string;
  budget: string | null;
  deadline: string | null;
  status: RequestStatus;
  gov_notes: string | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
}

export type CollaborationStatus = "pending" | "approved" | "revision";

export interface Collaboration {
  id: string;
  request_id: string;
  title: string | null;
  detail: string | null;
  status: CollaborationStatus;
  gov_user_id: string | null;
  document_urls: string[];
  created_at: string;
  updated_at: string;
}

export type OrderStatus = "processing" | "quality_check" | "in_transit" | "delivered";

export interface Order {
  id: string;
  request_id: string | null;
  business_user_id: string;
  material_type: string;
  quantity: string;
  amount: string | null;
  status: OrderStatus;
  supplier: string | null;
  delivery_date: string | null;
  progress: number;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  actor_role: string;
  action: string;
  detail: string | null;
  entity_type: string | null;
  entity_id: string | null;
  created_at: string;
}

export interface ConsumerProduct {
  id: string;
  business_user_id: string;
  company_name: string | null;
  name: string;
  category: string;
  description: string | null;
  story: string | null;
  image_url: string | null;
  price: number;
  original_price: number | null;
  waste_used: string | null;
  co2_saved: string | null;
  materials_source: string | null;
  qr_code: string | null;
  blockchain_tx_hash: string | null;
  verified: boolean;
  badge: string | null;
  created_at: string;
  updated_at: string;
}
