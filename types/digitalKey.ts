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

export interface CreateDigitalKeyResponse extends DigitalKey {}