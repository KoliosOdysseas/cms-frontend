export interface TeacherCourseInfo {
  courseId: number;
  title: string;
  studentsCount: number;
  studentFullNames: string[];
}

export interface TeacherInfo {
  teacherId: number;
  fullName: string;
  email?: string | null;
  phone?: string | null;
  courses: TeacherCourseInfo[];
}
