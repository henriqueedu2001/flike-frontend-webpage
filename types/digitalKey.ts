export interface CreateDigitalKeyRequest {
  user_id: number;
  digital_lock_id: number;
  expiration: string;
}

export interface DigitalKey {
  id: number;
  user_id: number;
  digital_lock_id: number;
  payload: string;
  expires_at: string;
  used: number;
  created_at: string;
}

export interface CreateDigitalKeyResponse {
  digital_key_id: number;
  created_at: string;
}

export interface RequestDigitalKeyResponse {
  request_id: number;
  created_at: string;
}

export type DigitalKeyRequestStatus = "pending" | "approved" | "rejected";

export interface DigitalKeyRequest {
  id: number;
  user_id: number;
  digital_lock_id: number;
  status: DigitalKeyRequestStatus;
  created_at: string;
}
