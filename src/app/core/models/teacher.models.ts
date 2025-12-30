// Teacher Data Transfer Objects (DTOs)
export interface TeacherReadDto {
  id: number;
  fullName: string;
  email: string;
  phone?: string | null;
}
// TeacherCreateDto
export interface TeacherCreateDto {
  fullName: string;
  email: string;
  phone?: string | null;
}
// TeacherUpdateDto
export interface TeacherUpdateDto {
  fullName: string;
  email: string;
  phone?: string | null;
}
