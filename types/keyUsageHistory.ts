export interface KeyUsageHistoryEntry {
  key_id: number;
  used: number;
  used_at: string | null;
  expires_at: string;
  created_at: string;
  room_id: number;
  room_name: string;
  building_id: number;
  building_name: string;
}
