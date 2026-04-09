
import { apiClient } from '@/lib/api-client';
import { LoginRequest, LoginResponse } from '@/lib/dto/auth.dto';

const login = async ({ code, password }: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', { code, password });
  return response.data;
};

export const authService = {
  login,
};
