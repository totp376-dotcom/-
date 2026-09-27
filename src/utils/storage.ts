import { Lesson, HomeworkTask, Grade, NewsItem, StudentProfile, AttendanceRecord } from '../types';
import { DEFAULT_PROFILE, DEFAULT_SCHEDULE, DEFAULT_TASKS, DEFAULT_GRADES, DEFAULT_NEWS, DEFAULT_ATTENDANCE } from '../data/initialData';

const KEYS = {
  PROFILE: 'schoolhub_v2_profile',
  SCHEDULE: 'schoolhub_v2_schedule',
  TASKS: 'schoolhub_v2_tasks',
  GRADES: 'schoolhub_v2_grades',
  NEWS: 'schoolhub_v2_news',
  ATTENDANCE: 'schoolhub_v2_attendance',
};

export const storage = {
  getProfile: (): StudentProfile => {
    try {
      const data = localStorage.getItem(KEYS.PROFILE);
      return data ? JSON.parse(data) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },
  saveProfile: (profile: StudentProfile): void => {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  },

  getSchedule: (): Lesson[] => {
    try {
      const data = localStorage.getItem(KEYS.SCHEDULE);
      return data ? JSON.parse(data) : DEFAULT_SCHEDULE;
    } catch {
      return DEFAULT_SCHEDULE;
    }
  },
  saveSchedule: (schedule: Lesson[]): void => {
    localStorage.setItem(KEYS.SCHEDULE, JSON.stringify(schedule));
  },

  getTasks: (): HomeworkTask[] => {
    try {
      const data = localStorage.getItem(KEYS.TASKS);
      return data ? JSON.parse(data) : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  },
  saveTasks: (tasks: HomeworkTask[]): void => {
    localStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
  },

  getGrades: (): Grade[] => {
    try {
      const data = localStorage.getItem(KEYS.GRADES);
      return data ? JSON.parse(data) : DEFAULT_GRADES;
    } catch {
      return DEFAULT_GRADES;
    }
  },
  saveGrades: (grades: Grade[]): void => {
    localStorage.setItem(KEYS.GRADES, JSON.stringify(grades));
  },

  getNews: (): NewsItem[] => {
    try {
      const data = localStorage.getItem(KEYS.NEWS);
      return data ? JSON.parse(data) : DEFAULT_NEWS;
    } catch {
      return DEFAULT_NEWS;
    }
  },
  saveNews: (news: NewsItem[]): void => {
    localStorage.setItem(KEYS.NEWS, JSON.stringify(news));
  },

  getAttendance: (): AttendanceRecord => {
    try {
      const data = localStorage.getItem(KEYS.ATTENDANCE);
      return data ? JSON.parse(data) : DEFAULT_ATTENDANCE;
    } catch {
      return DEFAULT_ATTENDANCE;
    }
  },
  saveAttendance: (attendance: AttendanceRecord): void => {
    localStorage.setItem(KEYS.ATTENDANCE, JSON.stringify(attendance));
  },

  resetAllToDefault: (): void => {
    localStorage.removeItem(KEYS.PROFILE);
    localStorage.removeItem(KEYS.SCHEDULE);
    localStorage.removeItem(KEYS.TASKS);
    localStorage.removeItem(KEYS.GRADES);
    localStorage.removeItem(KEYS.NEWS);
    localStorage.removeItem(KEYS.ATTENDANCE);
  }
};

// Calculations and analytics helpers
export function calculateOverallAverage(grades: Grade[]): number {
  if (!grades.length) return 0;
  const sum = grades.reduce((acc, curr) => acc + curr.value, 0);
  return Number((sum / grades.length).toFixed(2));
}

export function calculateSubjectAverages(grades: Grade[]): Record<string, { avg: number; count: number; grades: Grade[] }> {
  const map: Record<string, { sum: number; count: number; grades: Grade[] }> = {};
  
  grades.forEach(g => {
    if (!map[g.subject]) {
      map[g.subject] = { sum: 0, count: 0, grades: [] };
    }
    map[g.subject].sum += g.value;
    map[g.subject].count += 1;
    map[g.subject].grades.push(g);
  });

  const result: Record<string, { avg: number; count: number; grades: Grade[] }> = {};
  Object.keys(map).forEach(subj => {
    result[subj] = {
      avg: Number((map[subj].sum / map[subj].count).toFixed(2)),
      count: map[subj].count,
      grades: map[subj].grades,
    };
  });
  return result;
}

export function calculateGradeDistribution(grades: Grade[]): { '5': number; '4': number; '3': number; '2': number } {
  const dist = { '5': 0, '4': 0, '3': 0, '2': 0 };
  grades.forEach(g => {
    if (g.value === 5) dist['5']++;
    else if (g.value === 4) dist['4']++;
    else if (g.value === 3) dist['3']++;
    else if (g.value === 2) dist['2']++;
  });
  return dist;
}

export function formatDueDate(dateStr: string): { label: string; isUrgent: boolean; isPast: boolean } {
  if (!dateStr) return { label: 'Без срока', isUrgent: false, isPast: false };
  
  const due = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { label: `Просрочено (${Math.abs(diffDays)} дн.)`, isUrgent: true, isPast: true };
  } else if (diffDays === 0) {
    return { label: 'Сегодня', isUrgent: true, isPast: false };
  } else if (diffDays === 1) {
    return { label: 'Завтра', isUrgent: true, isPast: false };
  } else if (diffDays <= 3) {
    return { label: `Через ${diffDays} дн.`, isUrgent: false, isPast: false };
  } else {
    return { 
      label: due.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      isUrgent: false,
      isPast: false 
    };
  }
}
