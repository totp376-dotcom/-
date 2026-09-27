import React, { useState } from 'react';
import { Lesson, DayOfWeek } from '../types';
import { SCHOOL_SUBJECTS } from '../data/initialData';
import { Plus, Trash2, Search, Clock, MapPin, User, Check, X } from 'lucide-react';

interface Props {
  schedule: Lesson[];
  onAddLesson: (lesson: Omit<Lesson, 'id'>) => void;
  onDeleteLesson: (id: string) => void;
}

export const ScheduleView: React.FC<Props> = ({ schedule, onAddLesson, onDeleteLesson }) => {
  const days: DayOfWeek[] = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Понедельник');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New lesson form state
  const [newSubject, setNewSubject] = useState(SCHOOL_SUBJECTS[0]);
  const [customSubject, setCustomSubject] = useState('');
  const [newLessonNumber, setNewLessonNumber] = useState(1);
  const [newTimeStart, setNewTimeStart] = useState('08:30');
  const [newTimeEnd, setNewTimeEnd] = useState('09:15');
  const [newRoom, setNewRoom] = useState('301');
  const [newTeacher, setNewTeacher] = useState('');

  // Filter lessons
  const dayLessons = schedule
    .filter((l) => l.day === selectedDay)
    .filter((l) =>
      searchQuery
        ? l.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (l.teacher && l.teacher.toLowerCase().includes(searchQuery.toLowerCase()))
        : true
    )
    .sort((a, b) => a.lessonNumber - b.lessonNumber);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSubject = customSubject.trim() ? customSubject.trim() : newSubject;
    if (!finalSubject) return;

    onAddLesson({
      day: selectedDay,
      lessonNumber: Number(newLessonNumber),
      timeStart: newTimeStart,
      timeEnd: newTimeEnd,
      subject: finalSubject,
      room: newRoom.trim() || 'каб.',
      teacher: newTeacher.trim() || undefined,
    });

    setIsAddModalOpen(false);
    setCustomSubject('');
    setNewTeacher('');
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0b172a] tracking-tight">Расписание уроков</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Учебная сетка занятий на неделю, кабинеты и преподаватели
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-[#0abab5] hover:bg-[#3eccca] text-[#0b172a] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4 text-[#0b172a]" />
          Добавить урок в {selectedDay}
        </button>
      </div>

      {/* Day Selector Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
        
        {/* Days Tabs in Tiffany & Dark Navy */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {days.map((day) => {
            const count = schedule.filter((l) => l.day === day).length;
            const isSelected = selectedDay === day;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#0abab5] text-[#0b172a] shadow-xs'
                    : 'bg-slate-50 hover:bg-[#f0fbfb] text-slate-700 hover:text-[#089b97]'
                }`}
              >
                <span>{day}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-[#0b172a] text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск предмета, кабинета..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white transition-colors"
          />
        </div>

      </div>

      {/* Lessons List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#0b172a]">{selectedDay}</h2>
            <span className="text-xs text-[#089b97] font-semibold">· уроков: {dayLessons.length}</span>
          </div>
          <span className="text-xs text-slate-400">Стандартный урок: 45 мин</span>
        </div>

        {dayLessons.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <Clock className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs">На этот день уроков пока не запланировано.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="text-xs text-[#089b97] font-bold hover:underline cursor-pointer"
            >
              + Добавить первый урок
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {dayLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#f0fbfb]/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Lesson number badge in Tiffany */}
                  <div className="w-10 h-10 rounded-xl bg-[#0abab5]/15 text-[#077b78] font-bold font-mono text-sm flex items-center justify-center shrink-0 border border-[#0abab5]/30">
                    {lesson.lessonNumber}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#0b172a] flex items-center gap-2">
                      <span>{lesson.subject}</span>
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {lesson.timeStart} – {lesson.timeEnd}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        Кабинет {lesson.room}
                      </span>
                      {lesson.teacher && (
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {lesson.teacher}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDeleteLesson(lesson.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Удалить урок"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Lesson Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b172a]/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#0b172a]">
                Новый урок · {selectedDay}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Предмет</label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white"
                >
                  {SCHOOL_SUBJECTS.map((subj) => (
                    <option key={subj} value={subj}>
                      {subj}
                    </option>
                  ))}
                  <option value="custom">+ Другой предмет...</option>
                </select>
              </div>

              {newSubject === 'custom' && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Название своего предмета
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Например: Астрономия"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white"
                  />
                </div>
              )}

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Номер урока</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newLessonNumber}
                    onChange={(e) => setNewLessonNumber(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Начало</label>
                  <input
                    type="time"
                    value={newTimeStart}
                    onChange={(e) => setNewTimeStart(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Окончание</label>
                  <input
                    type="time"
                    value={newTimeEnd}
                    onChange={(e) => setNewTimeEnd(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Кабинет</label>
                  <input
                    type="text"
                    required
                    placeholder="301"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Преподаватель</label>
                  <input
                    type="text"
                    placeholder="Иванова Е.В."
                    value={newTeacher}
                    onChange={(e) => setNewTeacher(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0abab5] hover:bg-[#3eccca] text-[#0b172a] rounded-xl font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Check className="w-4 h-4" />
                  Сохранить урок
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
