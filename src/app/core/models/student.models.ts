// Student Data Transfer Objects (DTOs)
export interface StudentReadDto {
  id: number;
  fullName: string;
  email: string;
  phone?: string | null;
}
// StudentCreateDto
export interface StudentCreateDto {
  fullName: string;
  email: string;
  phone?: string | null;
}
// StudentUpdateDto
export interface StudentUpdateDto {
  fullName: string;
  email: string;
  phone?: string | null;
}
