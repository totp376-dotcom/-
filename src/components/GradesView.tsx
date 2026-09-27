import React, { useState } from 'react';
import { Grade, GradeType } from '../types';
import { SCHOOL_SUBJECTS } from '../data/initialData';
import { calculateOverallAverage, calculateSubjectAverages, calculateGradeDistribution } from '../utils/storage';
import { Award, Plus, Trash2, Filter, Check, X } from 'lucide-react';

interface Props {
  grades: Grade[];
  onAddGrade: (grade: Omit<Grade, 'id'>) => void;
  onDeleteGrade: (id: string) => void;
}

export const GradesView: React.FC<Props> = ({ grades, onAddGrade, onDeleteGrade }) => {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New grade form state
  const [newSubject, setNewSubject] = useState(SCHOOL_SUBJECTS[0]);
  const [customSubject, setCustomSubject] = useState('');
  const [newValue, setNewValue] = useState<number>(5);
  const [newType, setNewType] = useState<GradeType>('lesson');
  const [newTopic, setNewTopic] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);

  const overallAvg = calculateOverallAverage(grades);
  const subjectMap = calculateSubjectAverages(grades);
  const distribution = calculateGradeDistribution(grades);

  const typeLabels: Record<GradeType, string> = {
    lesson: 'Ответ на уроке',
    homework: 'Домашняя работа',
    test: 'Контрольная работа',
    exam: 'Экзамен / Зачет',
    project: 'Проектная работа',
  };

  const filteredGrades = grades
    .filter((g) => (selectedSubjectFilter === 'all' ? true : g.subject === selectedSubjectFilter))
    .sort((a, b) => b.date.localeCompare(a.date));

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalSubject = customSubject.trim() ? customSubject.trim() : newSubject;
    if (!finalSubject) return;

    onAddGrade({
      subject: finalSubject,
      value: Number(newValue),
      date: newDate,
      type: newType,
      topic: newTopic.trim() || undefined,
    });

    setIsAddModalOpen(false);
    setNewTopic('');
    setCustomSubject('');
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0b172a] tracking-tight">Электронный журнал оценок</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Успеваемость по предметам, четвертные средние баллы и аттестация
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-[#0abab5] hover:bg-[#3eccca] text-[#0b172a] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4 text-[#0b172a]" />
          Выставить оценку
        </button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Общий средний балл</div>
          <div className="text-3xl font-extrabold font-mono text-[#077b78] mt-2 tabular-nums">
            {overallAvg.toFixed(2)}
          </div>
          <div className="text-xs text-slate-400 mt-1">из 5.0 возможных</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Отличных отметок («5»)</div>
          <div className="text-3xl font-extrabold font-mono text-[#0abab5] mt-2 tabular-nums">
            {distribution['5']}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {grades.length ? `${((distribution['5'] / grades.length) * 100).toFixed(0)}% от общего числа` : '0%'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Хороших отметок («4»)</div>
          <div className="text-3xl font-extrabold font-mono text-[#0b172a] mt-2 tabular-nums">
            {distribution['4']}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {grades.length ? `${((distribution['4'] / grades.length) * 100).toFixed(0)}% от общего числа` : '0%'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold">Всего выставлено оценок</div>
          <div className="text-3xl font-extrabold font-mono text-[#0b172a] mt-2 tabular-nums">
            {grades.length}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            По {Object.keys(subjectMap).length} дисциплинам
          </div>
        </div>

      </div>

      {/* Subject Summary Cards Grid */}
      <div>
        <h2 className="text-base font-bold text-[#0b172a] mb-3">Средний балл по предметам</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(subjectMap).map((subject) => {
            const data = subjectMap[subject];
            const projectedGrade = Math.round(data.avg);
            return (
              <div
                key={subject}
                className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#0abab5]/50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-[#0b172a] text-sm">{subject}</h3>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-[#077b78] bg-[#0abab5]/15 px-2 py-0.5 rounded-md">
                        {data.avg.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Badges for historical grades */}
                  <div className="flex flex-wrap gap-1.5 mt-3 mb-2">
                    {data.grades.map((g, i) => (
                      <span
                        key={i}
                        className={`w-6 h-6 rounded-md font-mono font-bold text-xs flex items-center justify-center ${
                          g.value === 5
                            ? 'bg-[#0abab5]/20 text-[#077b78]'
                            : g.value === 4
                            ? 'bg-[#0b172a]/10 text-[#0b172a]'
                            : g.value === 3
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                        title={`${g.date}: ${g.topic || typeLabels[g.type]}`}
                      >
                        {g.value}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-2">
                  <span>Оценок: {data.count}</span>
                  <span className="font-semibold text-slate-700">
                    Прогноз: <strong className="text-[#089b97] font-bold">{projectedGrade}</strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grade Activity Feed */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-[#0b172a]">Журнал последних оценок</h2>
            <p className="text-xs text-slate-500">История выставления отметок с указанием тем и дат</p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#0abab5] focus:bg-white"
            >
              <option value="all">Все дисциплины</option>
              {Object.keys(subjectMap).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredGrades.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            Нет отметок по выбранному фильтру.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredGrades.map((grade) => (
              <div
                key={grade.id}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#f0fbfb]/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Fixed grade badge with Tiffany styling */}
                  <div
                    className={`w-11 h-11 rounded-xl font-bold font-mono text-lg flex items-center justify-center shrink-0 border ${
                      grade.value === 5
                        ? 'bg-[#0abab5]/15 text-[#077b78] border-[#0abab5]/30'
                        : grade.value === 4
                        ? 'bg-[#0b172a]/10 text-[#0b172a] border-[#0b172a]/20'
                        : grade.value === 3
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {grade.value}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0b172a]">{grade.subject}</span>
                      <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {typeLabels[grade.type]}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      {grade.topic || 'Текущий контроль успеваемости'}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 font-mono">
                      Дата: {grade.date}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDeleteGrade(grade.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Удалить запись"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Grade Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b172a]/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#0b172a]">Выставить оценку в журнал</h3>
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
                    placeholder="Например: Право"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white"
                  />
                </div>
              )}

              {/* Grade Selector (2, 3, 4, 5) */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Оценка</label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 4, 3, 2].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setNewValue(val)}
                      className={`py-2 rounded-xl font-bold font-mono text-base border transition-all cursor-pointer ${
                        newValue === val
                          ? val === 5
                            ? 'bg-[#0abab5] text-[#0b172a] border-[#0abab5] shadow-sm font-extrabold'
                            : val === 4
                            ? 'bg-[#0b172a] text-white border-[#0b172a] shadow-sm'
                            : val === 3
                            ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                            : 'bg-rose-600 text-white border-rose-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Тип работы</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as GradeType)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white"
                  >
                    <option value="lesson">Ответ на уроке</option>
                    <option value="homework">Домашняя работа</option>
                    <option value="test">Контрольная работа</option>
                    <option value="project">Проектная работа</option>
                    <option value="exam">Экзамен</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Дата</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Тема урока / комментарий (необязательно)
                </label>
                <input
                  type="text"
                  placeholder="Например: Квадратные уравнения, проверочная работа"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white"
                />
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
                  Сохранить оценку
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
