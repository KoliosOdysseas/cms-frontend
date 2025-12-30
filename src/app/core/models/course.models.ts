// //course entity
export interface Course {
  id: number;
  title: string;
  description?: string;
  credits: number;
  startDate: string;   // ISO string
  endDate: string;     // ISO string
  teacherId?: number | null;
}

//  CourseCreateDto
export interface CourseCreateDto {
  title: string;
  description?: string;
  credits: number;
  startDate: string;
  endDate: string;
  teacherId?: number | null;
}

// CourseUpdateDto
export interface CourseUpdateDto {
  title: string;
  description?: string;
  credits: number;
  startDate: string;
  endDate: string;
  teacherId?: number | null;
}
