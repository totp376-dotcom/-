import React from 'react';
import { Lesson, HomeworkTask, Grade, AttendanceRecord, StudentProfile, NewsItem } from '../types';
import { calculateOverallAverage, formatDueDate } from '../utils/storage';
import { Calendar, CheckSquare, Award, Clock, ArrowRight, AlertCircle, Sparkles, ChevronRight, Download } from 'lucide-react';
import { SchoolyMascot } from './SchoolyMascot';

interface Props {
  profile: StudentProfile;
  schedule: Lesson[];
  tasks: HomeworkTask[];
  grades: Grade[];
  attendance: AttendanceRecord;
  news: NewsItem[];
  onNavigate: (page: string) => void;
  onToggleTask: (taskId: string) => void;
  onOpenDiplomaGuide: () => void;
  onOpenDownloadModal?: () => void;
}

export const HomeView: React.FC<Props> = ({
  profile,
  schedule,
  tasks,
  grades,
  attendance,
  news,
  onNavigate,
  onToggleTask,
  onOpenDiplomaGuide,
  onOpenDownloadModal,
}) => {
  const avgGrade = calculateOverallAverage(grades);
  const pendingTasks = tasks.filter((t) => !t.done);
  const completedTasks = tasks.filter((t) => t.done);

  // Determine today's day of week in Russian
  const daysMap = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const todayIndex = new Date().getDay();
  const currentDayName = todayIndex === 0 ? 'Понедельник' : daysMap[todayIndex];

  // Lessons for current day (fallback to Monday if Sunday)
  const todayLessons = schedule
    .filter((l) => l.day === currentDayName)
    .sort((a, b) => a.lessonNumber - b.lessonNumber);

  // Attendance percentage
  const missedDays = attendance.excusedDays + attendance.unexcusedDays + attendance.illnessDays;
  const attendanceRate = (
    ((attendance.totalDays - missedDays) / attendance.totalDays) *
    100
  ).toFixed(0);

  const urgentTasks = [...pendingTasks]
    .sort((a, b) => (a.dueDate || '9999').localeCompare(b.dueDate || '9999'))
    .slice(0, 4);

  const pinnedNews = news.filter((n) => n.pinned).slice(0, 2);

  return (
    <div className="space-y-6">
      
      {/* Hero Welcome Banner with Tiffany & Dark Navy, plus Animated Mascot Schooly */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b172a] via-[#13243d] to-[#077b78] text-white p-6 sm:p-8 shadow-md border border-[#0abab5]/20">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0abab5] mb-2">
              <span>{profile.schoolName}</span>
              <span>·</span>
              <span>{currentDayName}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Добро пожаловать, {profile.name}!
            </h1>
            
            <p className="text-sm text-slate-200 leading-relaxed mb-5">
              Учебный день в разгаре! На сегодня запланировано уроков:{' '}
              <strong className="text-[#0abab5]">{todayLessons.length}</strong>, активных домашних заданий:{' '}
              <strong className="text-[#0abab5]">{pendingTasks.length}</strong>. Твой напарник Скули готов помочь!
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => onNavigate('schedule')}
                className="px-4 py-2 bg-[#0abab5] hover:bg-[#3eccca] text-[#0b172a] font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                Расписание на сегодня
              </button>
              
              <button
                onClick={() => onNavigate('homework')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <CheckSquare className="w-3.5 h-3.5 text-[#0abab5]" />
                Задания ({pendingTasks.length})
              </button>
              
              {onOpenDownloadModal && (
                <button
                  onClick={onOpenDownloadModal}
                  className="px-3.5 py-2 bg-[#0b172a]/80 hover:bg-[#0b172a] text-[#0abab5] hover:text-white font-bold text-xs rounded-xl border border-[#0abab5]/40 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                  title="Скачать файлы приложения (.HTML и .ZIP)"
                >
                  <Download className="w-3.5 h-3.5 text-[#0abab5]" />
                  <span>Скачать файлы</span>
                </button>
              )}

              <button
                onClick={onOpenDiplomaGuide}
                className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-[#0b172a] font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer ml-auto"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0b172a]" />
                Для диплома
              </button>
            </div>
          </div>

          {/* Interactive Hero Mascot "Скули" */}
          <div className="shrink-0 flex flex-col items-center">
            <SchoolyMascot
              mood={pendingTasks.length === 0 ? 'celebrating' : 'idle'}
              size="md"
              pendingTasksCount={pendingTasks.length}
              averageGrade={avgGrade}
              studentName={profile.name.split(' ')[0]}
            />
          </div>

        </div>

        {/* Decorative background Tiffany glow */}
        <div className="absolute -right-10 -bottom-16 w-72 h-72 rounded-full bg-[#0abab5]/15 blur-3xl pointer-events-none" />
      </div>

      {/* 4 Metric Cards in Tiffany and Dark Navy */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#0abab5]/60 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold text-slate-500">Средний балл</span>
            <div className="w-8 h-8 rounded-lg bg-[#0abab5]/15 text-[#089b97] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0b172a] tabular-nums">
            {avgGrade.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span>Шкала 5.0</span>
            <span>·</span>
            <span className="text-[#089b97] font-semibold">Отличный темп</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#0abab5]/60 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold text-slate-500">Заданий к сдаче</span>
            <div className="w-8 h-8 rounded-lg bg-[#0b172a]/10 text-[#0b172a] flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0b172a] tabular-nums">
            {pendingTasks.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Выполнено: <span className="font-semibold text-[#089b97]">{completedTasks.length}</span> из {tasks.length}
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#0abab5]/60 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold text-slate-500">Посещаемость</span>
            <div className="w-8 h-8 rounded-lg bg-[#0abab5]/15 text-[#077b78] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0b172a] tabular-nums">
            {attendanceRate}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Пропусков: <span className="font-semibold text-slate-700">{missedDays} дн.</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#0abab5]/60 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-semibold text-slate-500">Уроков сегодня</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0b172a] tabular-nums">
            {todayLessons.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {todayLessons.length > 0 ? `Кабинет: ${todayLessons[0].room}` : 'Выходной день'}
          </div>
        </div>

      </div>

      {/* Two Column Layout: Today's Schedule + Urgent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Today's Schedule */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#0b172a]">Расписание на {currentDayName}</h3>
                <p className="text-xs text-slate-500">Список занятий и кабинеты</p>
              </div>
              <button
                onClick={() => onNavigate('schedule')}
                className="text-xs font-semibold text-[#089b97] hover:text-[#06726f] flex items-center gap-1 cursor-pointer"
              >
                Все дни <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {todayLessons.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                На сегодня уроков нет. Отличный день для отдыха или подготовки диплома!
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {todayLessons.map((l) => (
                  <div key={l.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#0abab5]/15 text-[#077b78] font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-[#0abab5]/30">
                        {l.lessonNumber}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0b172a]">{l.subject}</div>
                        <div className="text-[11px] text-slate-500">
                          {l.timeStart} – {l.timeEnd} {l.teacher && `· ${l.teacher}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-[#0b172a] bg-slate-100 px-2.5 py-1 rounded-md shrink-0">
                      каб. {l.room}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Продолжительность урока: 45 минут</span>
            <button
              onClick={() => onNavigate('schedule')}
              className="text-[#089b97] hover:underline font-semibold cursor-pointer"
            >
              Редактировать расписание
            </button>
          </div>
        </div>

        {/* Right: Urgent Homework Tasks */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-[#0b172a]">Ближайшие задания</h3>
                <p className="text-xs text-slate-500">Отметьте выполненные прямо здесь</p>
              </div>
              <button
                onClick={() => onNavigate('homework')}
                className="text-xs font-semibold text-[#089b97] hover:text-[#06726f] flex items-center gap-1 cursor-pointer"
              >
                Все задания <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {urgentTasks.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Все задания выполнены! Нет срочных дедлайнов.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {urgentTasks.map((task) => {
                  const dateInfo = formatDueDate(task.dueDate);
                  return (
                    <div key={task.id} className="py-3 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => onToggleTask(task.id)}
                          className="mt-0.5 w-4 h-4 rounded text-[#0abab5] focus:ring-[#0abab5] border-slate-300 cursor-pointer"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#0b172a] flex items-center gap-2">
                            <span>{task.subject}</span>
                            {task.priority === 'high' && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-50 text-rose-700">
                                Срочно
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                            {task.text}
                          </p>
                        </div>
                      </div>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md whitespace-nowrap shrink-0 ${
                        dateInfo.isPast
                          ? 'bg-rose-100 text-rose-700 font-semibold'
                          : dateInfo.isUrgent
                          ? 'bg-amber-100 text-amber-800 font-semibold'
                          : 'bg-[#f0fbfb] text-[#077b78] font-semibold'
                      }`}>
                        {dateInfo.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Осталось сдать: {pendingTasks.length}</span>
            <button
              onClick={() => onNavigate('homework')}
              className="text-[#089b97] hover:underline font-semibold cursor-pointer"
            >
              + Добавить задание
            </button>
          </div>
        </div>

      </div>

      {/* Pinned News & Announcements */}
      {pinnedNews.length > 0 && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#0abab5]" />
              <h3 className="text-sm font-bold text-[#0b172a]">Важные объявления лицея</h3>
            </div>
            <button
              onClick={() => onNavigate('news')}
              className="text-xs text-[#089b97] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              Все новости <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pinnedNews.map((n) => (
              <div key={n.id} className="p-3.5 bg-[#f0fbfb]/70 rounded-xl border border-[#0abab5]/20">
                <div className="text-xs font-bold text-[#0b172a] mb-1">{n.title}</div>
                <p className="text-xs text-slate-600 line-clamp-2">{n.content}</p>
                <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-2">
                  <span>{n.date}</span>
                  <span>·</span>
                  <span>{n.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
