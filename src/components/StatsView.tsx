import React, { useState } from 'react';
import { Grade, HomeworkTask, AttendanceRecord } from '../types';
import { calculateOverallAverage, calculateSubjectAverages, calculateGradeDistribution } from '../utils/storage';
import { TrendingUp, Clock, CheckCircle2, Calculator, Sparkles } from 'lucide-react';

interface Props {
  grades: Grade[];
  tasks: HomeworkTask[];
  attendance: AttendanceRecord;
  onUpdateAttendance: (attendance: AttendanceRecord) => void;
}

export const StatsView: React.FC<Props> = ({ grades, tasks, attendance, onUpdateAttendance }) => {
  const overallAvg = calculateOverallAverage(grades);
  const subjectMap = calculateSubjectAverages(grades);
  const distribution = calculateGradeDistribution(grades);
  const totalGrades = grades.length;

  // Sorted subjects by average
  const sortedSubjects = Object.keys(subjectMap)
    .map((s) => ({ subject: s, ...subjectMap[s] }))
    .sort((a, b) => b.avg - a.avg);

  // Homework completion stats
  const completedTasks = tasks.filter((t) => t.done).length;
  const homeworkRate = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 100;

  // Attendance stats
  const missedDays = attendance.excusedDays + attendance.unexcusedDays + attendance.illnessDays;
  const attendanceRate = (
    ((attendance.totalDays - missedDays) / attendance.totalDays) *
    100
  ).toFixed(1);

  // Target Grade Calculator State
  const [calcSubject, setCalcSubject] = useState(sortedSubjects[0]?.subject || 'Алгебра');
  const [targetGoal, setTargetGoal] = useState<number>(4.6); // For an "excellent" 5

  const currentCalcData = subjectMap[calcSubject] || { avg: 5, count: 1, sum: 5 };
  
  let neededFives = 0;
  if (currentCalcData.avg < targetGoal) {
    const currentSum = currentCalcData.avg * currentCalcData.count;
    const numerator = targetGoal * currentCalcData.count - currentSum;
    const denominator = 5 - targetGoal;
    neededFives = denominator > 0 ? Math.ceil(numerator / denominator) : 0;
    if (neededFives < 0) neededFives = 0;
  }

  // Attendance editor state
  const [isEditingAttendance, setIsEditingAttendance] = useState(false);
  const [tempIllness, setTempIllness] = useState(attendance.illnessDays);
  const [tempExcused, setTempExcused] = useState(attendance.excusedDays);
  const [tempUnexcused, setTempUnexcused] = useState(attendance.unexcusedDays);

  const handleSaveAttendance = () => {
    onUpdateAttendance({
      ...attendance,
      illnessDays: Number(tempIllness),
      excusedDays: Number(tempExcused),
      unexcusedDays: Number(tempUnexcused),
    });
    setIsEditingAttendance(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0b172a] tracking-tight">Аналитика и статистика</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Автоматический расчет успеваемости, динамика и калькулятор прогнозирования оценок
        </p>
      </div>

      {/* 2 Big Headline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Academic Performance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Успеваемость
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#0abab5]/15 text-[#077b78] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#0b172a] tabular-nums">
              {overallAvg.toFixed(2)}{' '}
              <span className="text-base font-normal text-slate-400">/ 5.0</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Средний балл по {sortedSubjects.length} предметам на основе {totalGrades} оценок
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span>Процент от максимума</span>
              <span className="font-mono font-bold text-[#077b78]">
                {((overallAvg / 5) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0abab5] rounded-full transition-all duration-500"
                style={{ width: `${(overallAvg / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Attendance Statistics */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Посещаемость уроков
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#0b172a]/10 text-[#0b172a] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#0b172a] tabular-nums">
              {attendanceRate}%
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Пропущено дней: <strong className="text-slate-800">{missedDays}</strong> из {attendance.totalDays}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span>Посещено занятий</span>
              <button
                onClick={() => setIsEditingAttendance(!isEditingAttendance)}
                className="text-xs text-[#089b97] hover:underline font-semibold cursor-pointer"
              >
                {isEditingAttendance ? 'Свернуть' : 'Редактировать пропуски'}
              </button>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0b172a] rounded-full transition-all duration-500"
                style={{ width: `${attendanceRate}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Attendance Editor Drawer if toggled */}
      {isEditingAttendance && (
        <div className="p-4 bg-[#f0fbfb] border border-[#0abab5]/30 rounded-2xl space-y-3">
          <div className="text-xs font-bold text-[#0b172a]">
            Учет пропущенных учебных дней (для демонстрации комиссии):
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-600 mb-1">По болезни (дн.)</label>
              <input
                type="number"
                min="0"
                value={tempIllness}
                onChange={(e) => setTempIllness(Number(e.target.value))}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono focus:border-[#0abab5]"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">По заявлению (дн.)</label>
              <input
                type="number"
                min="0"
                value={tempExcused}
                onChange={(e) => setTempExcused(Number(e.target.value))}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono focus:border-[#0abab5]"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1">Без уважительной (дн.)</label>
              <input
                type="number"
                min="0"
                value={tempUnexcused}
                onChange={(e) => setTempUnexcused(Number(e.target.value))}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-mono focus:border-[#0abab5]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsEditingAttendance(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
            >
              Отмена
            </button>
            <button
              onClick={handleSaveAttendance}
              className="px-3 py-1.5 text-xs bg-[#0abab5] text-[#0b172a] font-bold rounded-lg hover:bg-[#3eccca]"
            >
              Пересчитать статистику
            </button>
          </div>
        </div>
      )}

      {/* Grade Distribution Breakdown & Goal Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Distribution */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-[#0b172a]">Распределение оценок</h3>
            <p className="text-xs text-slate-500">Доли отметок в общем объеме текущего контроля</p>
          </div>

          <div className="space-y-3">
            {[
              { val: '5', label: 'Отлично (5)', count: distribution['5'], color: 'bg-[#0abab5]' },
              { val: '4', label: 'Хорошо (4)', count: distribution['4'], color: 'bg-[#0b172a]' },
              { val: '3', label: 'Удовлетворительно (3)', count: distribution['3'], color: 'bg-amber-500' },
              { val: '2', label: 'Неудовлетворительно (2)', count: distribution['2'], color: 'bg-rose-500' },
            ].map((item) => {
              const pct = totalGrades ? Math.round((item.count / totalGrades) * 100) : 0;
              return (
                <div key={item.val} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{item.label}</span>
                    <span className="font-mono text-slate-500">
                      <strong>{item.count}</strong> шт. ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-[#f0fbfb] rounded-xl border border-[#0abab5]/20 text-xs text-[#0b172a] flex items-center justify-between">
            <span>Процент качества знаний (4 и 5):</span>
            <strong className="text-[#077b78] font-mono text-sm">
              {totalGrades ? Math.round(((distribution['5'] + distribution['4']) / totalGrades) * 100) : 0}%
            </strong>
          </div>
        </div>

        {/* Right: Target Grade Calculator (Algorithm demonstration) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calculator className="w-4 h-4 text-[#0abab5]" />
              <h3 className="text-base font-bold text-[#0b172a]">Калькулятор отличника</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Расчет необходимого количества оценок «5» для достижения итоговой пятерки
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Выберите предмет:</label>
                <select
                  value={calcSubject}
                  onChange={(e) => setCalcSubject(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] font-medium"
                >
                  {sortedSubjects.map((s) => (
                    <option key={s.subject} value={s.subject}>
                      {s.subject} (текущий балл: {s.avg.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-[#f0fbfb] border border-[#0abab5]/30 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Текущий средний балл:</span>
                  <span className="font-mono font-bold text-[#0b172a] text-sm">
                    {currentCalcData.avg.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Целевой балл для аттестата:</span>
                  <span className="font-mono font-bold text-[#077b78] text-sm">
                    &ge; 4.60 («Отлично»)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            {currentCalcData.avg >= 4.6 ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  По предмету <strong>{calcSubject}</strong> уже обеспечена пятерка! Продолжайте в том же духе.
                </span>
              </div>
            ) : (
              <div className="p-3 bg-[#f0fbfb] border border-[#0abab5]/40 rounded-xl text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-[#077b78]">
                  <Sparkles className="w-4 h-4 text-[#0abab5]" />
                  Совет от Скули:
                </div>
                <p className="text-[#0b172a]">
                  Чтобы средний балл стал не ниже <strong>4.60</strong>, вам необходимо получить{' '}
                  <strong className="text-base font-mono text-[#077b78] underline">
                    {neededFives} {neededFives === 1 ? 'пятерку' : neededFives < 5 ? 'пятерки' : 'пятерок'}
                  </strong>{' '}
                  подряд без троек.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Subject Rankings Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100">
          <h3 className="text-base font-bold text-[#0b172a]">Рейтинг успеваемости по дисциплинам</h3>
          <p className="text-xs text-slate-500">
            Полный перечень предметов, упорядоченный по среднему баллу
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {sortedSubjects.map((s, idx) => (
            <div
              key={s.subject}
              className="p-3.5 sm:p-4 flex items-center justify-between gap-4 hover:bg-[#f0fbfb]/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 text-center text-xs font-mono font-bold text-slate-400">
                  #{idx + 1}
                </span>
                <div>
                  <div className="text-xs font-bold text-[#0b172a]">{s.subject}</div>
                  <div className="text-[11px] text-slate-400">Оценок в журнале: {s.count}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:block w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      s.avg >= 4.5 ? 'bg-[#0abab5]' : s.avg >= 3.5 ? 'bg-[#0b172a]' : 'bg-amber-500'
                    }`}
                    style={{ width: `${(s.avg / 5) * 100}%` }}
                  />
                </div>
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                  s.avg >= 4.5
                    ? 'bg-[#0abab5]/15 text-[#077b78]'
                    : s.avg >= 3.5
                    ? 'bg-[#0b172a]/10 text-[#0b172a]'
                    : 'bg-amber-50 text-amber-700'
                }`}>
                  {s.avg.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
