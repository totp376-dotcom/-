import React, { useState } from 'react';
import { HomeworkTask, TaskPriority } from '../types';
import { SCHOOL_SUBJECTS } from '../data/initialData';
import { formatDueDate } from '../utils/storage';
import { Plus, CheckSquare, Trash2, Search, Check, X, Calendar } from 'lucide-react';

interface Props {
  tasks: HomeworkTask[];
  onAddTask: (task: Omit<HomeworkTask, 'id' | 'createdAt' | 'done'>) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const HomeworkView: React.FC<Props> = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed' | 'urgent'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New task form state
  const [newSubject, setNewSubject] = useState(SCHOOL_SUBJECTS[0]);
  const [customSubject, setCustomSubject] = useState('');
  const [newText, setNewText] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState<TaskPriority>('medium');

  // Stats calculation
  const totalCount = tasks.length;
  const pendingCount = tasks.filter((t) => !t.done).length;
  const completedCount = tasks.filter((t) => t.done).length;
  const urgentCount = tasks.filter((t) => {
    if (t.done) return false;
    const dateInfo = formatDueDate(t.dueDate);
    return dateInfo.isUrgent || dateInfo.isPast;
  }).length;

  // Filter tasks
  const filteredTasks = tasks
    .filter((task) => {
      if (filterStatus === 'pending') return !task.done;
      if (filterStatus === 'completed') return task.done;
      if (filterStatus === 'urgent') {
        if (task.done) return false;
        const d = formatDueDate(task.dueDate);
        return d.isUrgent || d.isPast;
      }
      return true;
    })
    .filter((task) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return task.subject.toLowerCase().includes(q) || task.text.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return (a.dueDate || '9999').localeCompare(b.dueDate || '9999');
    });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSubject = customSubject.trim() ? customSubject.trim() : newSubject;
    if (!finalSubject || !newText.trim()) return;

    onAddTask({
      subject: finalSubject,
      text: newText.trim(),
      dueDate: newDueDate || new Date().toISOString().split('T')[0],
      priority: newPriority,
    });

    setIsAddModalOpen(false);
    setNewText('');
    setCustomSubject('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0b172a] tracking-tight">Домашние задания</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Контроль выполнения учебных задач, практических и лабораторных работ
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-[#0abab5] hover:bg-[#3eccca] text-[#0b172a] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4 text-[#0b172a]" />
          Добавить задание
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setFilterStatus('all')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            filterStatus === 'all'
              ? 'bg-[#f0fbfb] border-[#0abab5] ring-2 ring-[#0abab5]/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs text-slate-500 font-medium">Всего заданий</div>
          <div className="text-2xl font-bold font-mono text-[#0b172a] mt-1 tabular-nums">
            {totalCount}
          </div>
        </button>

        <button
          onClick={() => setFilterStatus('pending')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            filterStatus === 'pending'
              ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs text-amber-700 font-medium">В процессе</div>
          <div className="text-2xl font-bold font-mono text-amber-900 mt-1 tabular-nums">
            {pendingCount}
          </div>
        </button>

        <button
          onClick={() => setFilterStatus('urgent')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            filterStatus === 'urgent'
              ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-500/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs text-rose-700 font-medium">Срочные / Просроч.</div>
          <div className="text-2xl font-bold font-mono text-rose-900 mt-1 tabular-nums">
            {urgentCount}
          </div>
        </button>

        <button
          onClick={() => setFilterStatus('completed')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            filterStatus === 'completed'
              ? 'bg-[#f0fbfb] border-[#0abab5] ring-2 ring-[#0abab5]/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-xs text-[#077b78] font-medium">Выполненные</div>
          <div className="text-2xl font-bold font-mono text-[#077b78] mt-1 tabular-nums">
            {completedCount}
          </div>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs">
        
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Все' },
            { id: 'pending', label: 'Активные' },
            { id: 'urgent', label: 'Срочные' },
            { id: 'completed', label: 'Выполненные' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                filterStatus === tab.id
                  ? 'bg-[#0b172a] text-[#0abab5]'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск по предмету или тексту..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white"
          />
        </div>

      </div>

      {/* Task List */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <CheckSquare className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs">Заданий по выбранному фильтру не найдено.</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="text-xs text-[#089b97] font-bold hover:underline cursor-pointer"
            >
              + Создать задание
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredTasks.map((task) => {
              const dateInfo = formatDueDate(task.dueDate);
              return (
                <div
                  key={task.id}
                  className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors ${
                    task.done ? 'bg-slate-50/50' : 'hover:bg-[#f0fbfb]/40'
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => onToggleTask(task.id)}
                      className="mt-1 w-5 h-5 rounded text-[#0abab5] focus:ring-[#0abab5] border-slate-300 cursor-pointer shrink-0"
                    />

                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-xs font-bold ${
                          task.done ? 'line-through text-slate-400' : 'text-[#0b172a]'
                        }`}>
                          {task.subject}
                        </span>

                        {task.priority === 'high' && !task.done && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-50 text-rose-700 border border-rose-200">
                            Высокий приоритет
                          </span>
                        )}

                        {task.done && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#f0fbfb] text-[#077b78]">
                            Сдано
                          </span>
                        )}
                      </div>

                      <p className={`text-xs leading-relaxed ${
                        task.done ? 'line-through text-slate-400' : 'text-slate-700'
                      }`}>
                        {task.text}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-[#0abab5]" />
                          Сдать до: {task.dueDate || 'не указана'}
                        </span>
                        {task.completedAt && (
                          <span>· Завершено: {task.completedAt}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-lg ${
                      task.done
                        ? 'bg-slate-100 text-slate-400'
                        : dateInfo.isPast
                        ? 'bg-rose-100 text-rose-700 font-bold'
                        : dateInfo.isUrgent
                        ? 'bg-amber-100 text-amber-800 font-bold'
                        : 'bg-[#f0fbfb] text-[#077b78] font-bold'
                    }`}>
                      {task.done ? 'Выполнено' : dateInfo.label}
                    </span>

                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Удалить задание"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b172a]/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#0b172a]">Новое домашнее задание</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
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
                    Свое название предмета
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Например: Правоведение"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Описание задания
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Что необходимо сделать? Номера задач, параграфы, лабораторные..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Дата сдачи</label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Приоритет</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white"
                  >
                    <option value="low">Обычный</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий (Срочно)</option>
                  </select>
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
                  Добавить задание
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
