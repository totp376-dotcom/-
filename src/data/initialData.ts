import { Lesson, HomeworkTask, Grade, NewsItem, StudentProfile, AttendanceRecord } from '../types';

export const DEFAULT_PROFILE: StudentProfile = {
  name: 'Алексей Смирнов',
  className: '9 «А» класс',
  schoolName: 'Лицей №1535 (Информационно-технологический профиль)',
  email: 'a.smirnov@schoolhub.edu',
  about: 'Увлекаюсь веб-разработкой, алгоритмами и робототехникой. Готовлю дипломный проект портала SchoolHub.',
  avatarColor: 'from-blue-600 to-indigo-600',
  role: 'student',
};

export const DEFAULT_ATTENDANCE: AttendanceRecord = {
  totalDays: 120,
  excusedDays: 3,
  unexcusedDays: 1,
  illnessDays: 5,
};

export const DEFAULT_SCHEDULE: Lesson[] = [
  // Понедельник
  { id: 'mon-1', day: 'Понедельник', lessonNumber: 1, timeStart: '08:30', timeEnd: '09:15', subject: 'Алгебра', room: '301', teacher: 'Иванова Е.В.' },
  { id: 'mon-2', day: 'Понедельник', lessonNumber: 2, timeStart: '09:25', timeEnd: '10:10', subject: 'Русский язык', room: '204', teacher: 'Смирнова О.П.' },
  { id: 'mon-3', day: 'Понедельник', lessonNumber: 3, timeStart: '10:30', timeEnd: '11:15', subject: 'Информатика', room: 'IT-лаб', teacher: 'Ковалев Д.А.' },
  { id: 'mon-4', day: 'Понедельник', lessonNumber: 4, timeStart: '11:35', timeEnd: '12:20', subject: 'Физика', room: '312', teacher: 'Петров С.Н.' },
  { id: 'mon-5', day: 'Понедельник', lessonNumber: 5, timeStart: '12:40', timeEnd: '13:25', subject: 'История России', room: '205', teacher: 'Михайлов А.В.' },
  { id: 'mon-6', day: 'Понедельник', lessonNumber: 6, timeStart: '13:35', timeEnd: '14:20', subject: 'Английский язык', room: '402', teacher: 'Браун М.И.' },

  // Вторник
  { id: 'tue-1', day: 'Вторник', lessonNumber: 1, timeStart: '08:30', timeEnd: '09:15', subject: 'Геометрия', room: '301', teacher: 'Иванова Е.В.' },
  { id: 'tue-2', day: 'Вторник', lessonNumber: 2, timeStart: '09:25', timeEnd: '10:10', subject: 'Биология', room: '310', teacher: 'Васильева Т.И.' },
  { id: 'tue-3', day: 'Вторник', lessonNumber: 3, timeStart: '10:30', timeEnd: '11:15', subject: 'Информатика', room: 'IT-лаб', teacher: 'Ковалев Д.А.' },
  { id: 'tue-4', day: 'Вторник', lessonNumber: 4, timeStart: '11:35', timeEnd: '12:20', subject: 'Английский язык', room: '402', teacher: 'Браун М.И.' },
  { id: 'tue-5', day: 'Вторник', lessonNumber: 5, timeStart: '12:40', timeEnd: '13:25', subject: 'Химия', room: '308', teacher: 'Соколова Н.А.' },

  // Среда
  { id: 'wed-1', day: 'Среда', lessonNumber: 1, timeStart: '08:30', timeEnd: '09:15', subject: 'Физика', room: '312', teacher: 'Петров С.Н.' },
  { id: 'wed-2', day: 'Среда', lessonNumber: 2, timeStart: '09:25', timeEnd: '10:10', subject: 'Обществознание', room: '205', teacher: 'Михайлов А.В.' },
  { id: 'wed-3', day: 'Среда', lessonNumber: 3, timeStart: '10:30', timeEnd: '11:15', subject: 'География', room: '206', teacher: 'Федорова К.М.' },
  { id: 'wed-4', day: 'Среда', lessonNumber: 4, timeStart: '11:35', timeEnd: '12:20', subject: 'Алгебра', room: '301', teacher: 'Иванова Е.В.' },
  { id: 'wed-5', day: 'Среда', lessonNumber: 5, timeStart: '12:40', timeEnd: '13:25', subject: 'Литература', room: '204', teacher: 'Смирнова О.П.' },
  { id: 'wed-6', day: 'Среда', lessonNumber: 6, timeStart: '13:35', timeEnd: '14:20', subject: 'Физическая культура', room: 'Спортзал', teacher: 'Григорьев В.В.' },

  // Четверг
  { id: 'thu-1', day: 'Четверг', lessonNumber: 1, timeStart: '08:30', timeEnd: '09:15', subject: 'Геометрия', room: '301', teacher: 'Иванова Е.В.' },
  { id: 'thu-2', day: 'Четверг', lessonNumber: 2, timeStart: '09:25', timeEnd: '10:10', subject: 'Химия', room: '308', teacher: 'Соколова Н.А.' },
  { id: 'thu-3', day: 'Четверг', lessonNumber: 3, timeStart: '10:30', timeEnd: '11:15', subject: 'Русский язык', room: '204', teacher: 'Смирнова О.П.' },
  { id: 'thu-4', day: 'Четверг', lessonNumber: 4, timeStart: '11:35', timeEnd: '12:20', subject: 'Биология', room: '310', teacher: 'Васильева Т.И.' },
  { id: 'thu-5', day: 'Четверг', lessonNumber: 5, timeStart: '12:40', timeEnd: '13:25', subject: 'Информатика', room: 'IT-лаб', teacher: 'Ковалев Д.А.' },

  // Пятница
  { id: 'fri-1', day: 'Пятница', lessonNumber: 1, timeStart: '08:30', timeEnd: '09:15', subject: 'Информатика', room: 'IT-лаб', teacher: 'Ковалев Д.А.' },
  { id: 'fri-2', day: 'Пятница', lessonNumber: 2, timeStart: '09:25', timeEnd: '10:10', subject: 'Физика (лабораторная)', room: '312', teacher: 'Петров С.Н.' },
  { id: 'fri-3', day: 'Пятница', lessonNumber: 3, timeStart: '10:30', timeEnd: '11:15', subject: 'История России', room: '205', teacher: 'Михайлов А.В.' },
  { id: 'fri-4', day: 'Пятница', lessonNumber: 4, timeStart: '11:35', timeEnd: '12:20', subject: 'Физическая культура', room: 'Спортзал', teacher: 'Григорьев В.В.' },
  { id: 'fri-5', day: 'Пятница', lessonNumber: 5, timeStart: '12:40', timeEnd: '13:25', subject: 'Алгебра', room: '301', teacher: 'Иванова Е.В.' },

  // Суббота (факультативы)
  { id: 'sat-1', day: 'Суббота', lessonNumber: 1, timeStart: '09:00', timeEnd: '10:20', subject: 'Олимпиадное программирование', room: 'IT-лаб', teacher: 'Ковалев Д.А.' },
  { id: 'sat-2', day: 'Суббота', lessonNumber: 2, timeStart: '10:35', timeEnd: '11:55', subject: 'Робототехника и IoT', room: 'Технопарк', teacher: 'Алексеев Д.В.' },
];

export const DEFAULT_TASKS: HomeworkTask[] = [
  {
    id: 'task-1',
    subject: 'Алгебра',
    text: 'Решить №342 (а, б), №345 из учебника. Подготовиться к проверочной работе по квадратным уравнениям.',
    dueDate: '2026-09-29',
    priority: 'high',
    done: false,
    createdAt: '2026-09-26',
  },
  {
    id: 'task-2',
    subject: 'Информатика',
    text: 'Подготовить практическую работу по структурам данных на Python и загрузить отчет в систему.',
    dueDate: '2026-09-30',
    priority: 'high',
    done: false,
    createdAt: '2026-09-25',
  },
  {
    id: 'task-3',
    subject: 'Английский язык',
    text: 'Unit 4: выучить слова со страницы 54, сделать упражнения 3 и 4 в рабочей тетради.',
    dueDate: '2026-10-01',
    priority: 'medium',
    done: false,
    createdAt: '2026-09-26',
  },
  {
    id: 'task-4',
    subject: 'Физика',
    text: 'Оформить протокол лабораторной работы №4 «Определение КПД наклонной плоскости».',
    dueDate: '2026-10-02',
    priority: 'medium',
    done: false,
    createdAt: '2026-09-26',
  },
  {
    id: 'task-5',
    subject: 'Русский язык',
    text: 'Упражнение 189: синтаксический разбор двух сложных предложений с разными видами связи.',
    dueDate: '2026-09-28',
    priority: 'low',
    done: true,
    createdAt: '2026-09-24',
    completedAt: '2026-09-27',
  },
  {
    id: 'task-6',
    subject: 'Литература',
    text: 'Прочитать главы 4-6 романа «Герой нашего времени», выписать ключевые цитаты Печорина.',
    dueDate: '2026-10-03',
    priority: 'low',
    done: false,
    createdAt: '2026-09-26',
  }
];

export const DEFAULT_GRADES: Grade[] = [
  { id: 'g-1', subject: 'Информатика', value: 5, date: '2026-09-26', type: 'project', topic: 'Практическая работа: Архитектура баз данных' },
  { id: 'g-2', subject: 'Алгебра', value: 5, date: '2026-09-25', type: 'test', topic: 'Контрольная работа: Системы уравнений' },
  { id: 'g-3', subject: 'Физика', value: 4, date: '2026-09-24', type: 'lesson', topic: 'Законы сохранения в механике' },
  { id: 'g-4', subject: 'Английский язык', value: 5, date: '2026-09-23', type: 'homework', topic: 'Эссе: Technology and Future' },
  { id: 'g-5', subject: 'Русский язык', value: 5, date: '2026-09-22', type: 'test', topic: 'Сложноподчиненные предложения' },
  { id: 'g-6', subject: 'История России', value: 4, date: '2026-09-21', type: 'lesson', topic: 'Реформы XIX века' },
  { id: 'g-7', subject: 'Геометрия', value: 5, date: '2026-09-20', type: 'homework', topic: 'Теорема синусов и косинусов' },
  { id: 'g-8', subject: 'Химия', value: 4, date: '2026-09-19', type: 'lesson', topic: 'Окислительно-восстановительные реакции' },
  { id: 'g-9', subject: 'Биология', value: 4, date: '2026-09-18', type: 'homework', topic: 'Строение клетки' },
  { id: 'g-10', subject: 'Обществознание', value: 5, date: '2026-09-17', type: 'lesson', topic: 'Экономические системы' },
  { id: 'g-11', subject: 'Литература', value: 4, date: '2026-09-16', type: 'homework', topic: 'Анализ стихотворения' },
  { id: 'g-12', subject: 'Информатика', value: 5, date: '2026-09-15', type: 'test', topic: 'Тестирование: Базовый синтаксис SQL' },
];

export const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Открытие регистрации на Всероссийскую олимпиаду школьников',
    content: 'Начался прием заявок на школьный этап ВсОШ по информатике, математике и физике. Заявки принимаются у классных руководителей до 10 октября.',
    date: '2026-09-25',
    category: 'olympiad',
    pinned: true,
    author: 'Учебная часть лицея',
  },
  {
    id: 'news-2',
    title: 'Хакатон проектов «IT-Лицей 2026»',
    content: 'В следующую субботу в технопарке лицея пройдет 12-часовой хакатон по разработке веб-сервисов и мобильных приложений. Победители получат дополнительные баллы к аттестату.',
    date: '2026-09-24',
    category: 'event',
    pinned: true,
    author: 'Кафедра информатики',
  },
  {
    id: 'news-3',
    title: 'График промежуточной аттестации за I четверть',
    content: 'Опубликованы даты контрольных срезов знаний. Просим учащихся и родителей ознакомиться с расписанием и не допускать пропусков уроков.',
    date: '2026-09-22',
    category: 'exam',
    pinned: false,
    author: 'Завуч по учебной работе',
  },
  {
    id: 'news-4',
    title: 'Обновление библиотечного фонда и электронного каталога',
    content: 'В школьную библиотеку поступили новые методические пособия для подготовки к ОГЭ и ЕГЭ, а также доступ к онлайн-платформе с научно-популярной литературой.',
    date: '2026-09-20',
    category: 'announcement',
    pinned: false,
    author: 'Библиотечный центр',
  }
];

export const SCHOOL_SUBJECTS = [
  'Алгебра',
  'Геометрия',
  'Информатика',
  'Физика',
  'Русский язык',
  'Литература',
  'История России',
  'Обществознание',
  'Английский язык',
  'Химия',
  'Биология',
  'География',
  'Физическая культура',
  'Олимпиадное программирование',
  'Робототехника и IoT'
];
