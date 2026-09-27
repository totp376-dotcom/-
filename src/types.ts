export type DayOfWeek = 'Понедельник' | 'Вторник' | 'Среда' | 'Четверг' | 'Пятница' | 'Суббота';

export type WeekType = 'all' | 'numerator' | 'denominator';

export interface Lesson {
  id: string;
  day: DayOfWeek;
  lessonNumber: number;
  timeStart: string;
  timeEnd: string;
  subject: string;
  room: string;
  teacher?: string;
  weekType?: WeekType;
}

export type TaskPriority = 'low' | 'medium' | 'high';

export interface HomeworkTask {
  id: string;
  subject: string;
  text: string;
  dueDate: string;
  priority: TaskPriority;
  done: boolean;
  createdAt: string;
  completedAt?: string;
}

export type GradeType = 'lesson' | 'homework' | 'test' | 'exam' | 'project';

export interface Grade {
  id: string;
  subject: string;
  value: number; // 2, 3, 4, 5
  date: string;
  type: GradeType;
  topic?: string;
}

export type NewsCategory = 'all' | 'announcement' | 'event' | 'olympiad' | 'exam';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: NewsCategory;
  pinned?: boolean;
  author: string;
}

export interface StudentProfile {
  name: string;
  className: string;
  schoolName: string;
  email: string;
  about: string;
  avatarColor: string;
  role: 'student' | 'class_president' | 'teacher';
}

export interface AttendanceRecord {
  totalDays: number;
  excusedDays: number;
  unexcusedDays: number;
  illnessDays: number;
}
