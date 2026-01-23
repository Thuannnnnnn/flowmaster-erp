export interface Department {
  id: number;
  name: string;
  manager_id?: string;
  description?: string;
}

export interface Role {
  id: number;
  name: string;
  description?: string;
  is_active: boolean;
  permissions?: any;
  is_system: boolean;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  last_login_at?: Date;
  role_id?: number;
  role?: Role;
  refresh_token?: string; // Should probably not be exposed to frontend often, but part of entity
  created_at: Date;
  updated_at: Date;
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export interface Employee {
  id: string;
  user_id?: string;
  user?: User;
  department_id?: number;
  department?: Department;
  code: string;
  name: string;
  dob?: Date;
  gender?: Gender;
  address?: string;
  hire_date?: Date;
  bank_account?: string;
  bank_name?: string;
  base_salary: number;
}

export enum AttendanceStatus {
  LATE = 'Late',
  ON_TIME = 'OnTime',
  ABSENT = 'Absent',
}

export interface Attendance {
  id: string;
  employee_id: string;
  employee?: Employee;
  date: Date;
  check_in?: Date;
  check_out?: Date;
  status: AttendanceStatus;
  note?: string;
}
