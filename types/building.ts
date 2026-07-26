export interface Building {
  id: number;
  institution_id: number;
  name: string;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  created_at: string;
}
