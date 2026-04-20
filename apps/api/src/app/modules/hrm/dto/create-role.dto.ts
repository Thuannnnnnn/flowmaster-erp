
export class CreateRoleDto {
  name: string;
  description?: string;
  is_active?: boolean;
  permissions?: number[];
}
