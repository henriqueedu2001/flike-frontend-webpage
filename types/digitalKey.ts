export interface CreateDigitalKeyRequest {
  user_id: number;
  digital_lock_id: number;
  expiration: string;
}

export interface DigitalKey {
  id: number;
  user_id: number;
  digital_lock_id: number;
  expiration: string;
  created_at: string;
}

export type CreateDigitalKeyResponse = DigitalKey;

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
