export interface LoginRequest {
  code: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
}
