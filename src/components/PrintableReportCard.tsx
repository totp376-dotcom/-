import React from 'react';
import { StudentProfile, Grade, AttendanceRecord } from '../types';
import { calculateOverallAverage, calculateSubjectAverages } from '../utils/storage';
import { Printer, X, Award, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  grades: Grade[];
  attendance: AttendanceRecord;
}

export const PrintableReportCard: React.FC<Props> = ({
  isOpen,
  onClose,
  profile,
  grades,
  attendance,
}) => {
  if (!isOpen) return null;

  const subjectMap = calculateSubjectAverages(grades);
  const overallAvg = calculateOverallAverage(grades);
  const subjects = Object.keys(subjectMap);

  const handlePrint = () => {
    window.print();
  };

  const attendancePercent = (
    ((attendance.totalDays - (attendance.excusedDays + attendance.unexcusedDays + attendance.illnessDays)) /
      attendance.totalDays) *
    100
  ).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-auto overflow-hidden border border-slate-200">
        
        {/* Top actions toolbar (hidden during print) */}
        <div className="no-print p-4 bg-[#0b172a] text-white flex items-center justify-between border-b border-[#13243d]">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#0abab5]" />
            <span className="font-bold text-sm">Официальный табель успеваемости (Печатная форма)</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-[#0abab5] hover:bg-[#3eccca] text-[#0b172a] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#0b172a]" />
              Распечатать / Экспорт в PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Area */}
        <div className="p-8 sm:p-12 text-slate-900 font-serif leading-relaxed bg-white">
          
          {/* Header */}
          <div className="text-center border-b-2 border-slate-900 pb-6 mb-6">
            <div className="text-xs uppercase tracking-widest text-slate-500 font-sans mb-1 font-semibold">
              Министерство просвещения РФ · Государственная система учета успеваемости
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 font-serif">
              ТАБЕЛЬ УСПЕВАЕМОСТИ УЧАЩЕГОСЯ
            </h1>
            <div className="text-sm font-sans text-slate-600 mt-2 font-medium">
              {profile.schoolName}
            </div>
          </div>

          {/* Student Meta Details */}
          <div className="grid grid-cols-2 gap-4 text-xs font-sans mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500">Учащийся:</span>{' '}
              <strong className="text-slate-900 text-sm">{profile.name}</strong>
            </div>
            <div>
              <span className="text-slate-500">Класс / Группа:</span>{' '}
              <strong className="text-slate-900 text-sm">{profile.className}</strong>
            </div>
            <div>
              <span className="text-slate-500">Учебный период:</span>{' '}
              <span className="font-semibold text-slate-800">2026/2027 учебный год (I полугодие)</span>
            </div>
            <div>
              <span className="text-slate-500">Статус:</span>{' '}
              <span className="font-semibold text-emerald-700 flex items-center gap-1 inline-flex">
                <CheckCircle2 className="w-3.5 h-3.5" /> Аттестован
              </span>
            </div>
          </div>

          {/* Grades Table */}
          <div className="font-sans mb-6 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="py-2.5 px-3 border-r border-slate-200 w-12 text-center">№</th>
                  <th className="py-2.5 px-3 border-r border-slate-200">Наименование дисциплины</th>
                  <th className="py-2.5 px-3 border-r border-slate-200 text-center">Кол-во оценок</th>
                  <th className="py-2.5 px-3 border-r border-slate-200 text-center">Текущие отметки</th>
                  <th className="py-2.5 px-3 border-r border-slate-200 text-center">Ср. балл</th>
                  <th className="py-2.5 px-3 text-center bg-slate-200 font-extrabold">Итоговая</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {subjects.map((subj, idx) => {
                  const data = subjectMap[subj];
                  const finalMark = Math.round(data.avg);
                  return (
                    <tr key={subj} className="hover:bg-slate-50">
                      <td className="py-2 px-3 border-r border-slate-200 text-center text-slate-500 font-mono">
                        {idx + 1}
                      </td>
                      <td className="py-2 px-3 border-r border-slate-200 font-semibold text-slate-900">
                        {subj}
                      </td>
                      <td className="py-2 px-3 border-r border-slate-200 text-center font-mono">
                        {data.count}
                      </td>
                      <td className="py-2 px-3 border-r border-slate-200 text-center font-mono text-slate-600">
                        {data.grades.map(g => g.value).join(', ')}
                      </td>
                      <td className="py-2 px-3 border-r border-slate-200 text-center font-mono font-bold text-slate-800">
                        {data.avg.toFixed(2)}
                      </td>
                      <td className="py-2 px-3 text-center font-mono font-bold text-base bg-slate-50">
                        <span className={`px-2 py-0.5 rounded font-bold ${
                          finalMark === 5 ? 'text-emerald-700 bg-emerald-100' :
                          finalMark === 4 ? 'text-blue-700 bg-blue-100' :
                          finalMark === 3 ? 'text-amber-700 bg-amber-100' : 'text-rose-700 bg-rose-100'
                        }`}>
                          {finalMark}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary Box */}
          <div className="grid grid-cols-2 gap-4 font-sans text-xs mb-8">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="text-slate-500 font-medium">Сводные показатели:</div>
              <div className="text-sm font-bold text-slate-900">
                Средний академический балл: <span className="font-mono text-indigo-700 text-base">{overallAvg}</span> / 5.0
              </div>
              <div className="text-slate-600">
                Всего выставлено отметок в журнал: <strong>{grades.length}</strong>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="text-slate-500 font-medium">Сведения о посещаемости:</div>
              <div className="text-sm font-bold text-slate-900">
                Посещаемость: <span className="font-mono text-emerald-700 text-base">{attendancePercent}%</span>
              </div>
              <div className="text-slate-600">
                Пропущено дней: {attendance.excusedDays + attendance.unexcusedDays + attendance.illnessDays} (из {attendance.totalDays})
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 font-sans text-xs pt-8 border-t border-slate-300">
            <div>
              <div className="text-slate-600 mb-6">Классный руководитель:</div>
              <div className="border-b border-slate-900 pb-1 flex justify-between">
                <span>Иванова Е.В.</span>
                <span className="text-slate-400 italic">(подпись)</span>
              </div>
            </div>
            <div>
              <div className="text-slate-600 mb-6">Директор образовательного учреждения:</div>
              <div className="border-b border-slate-900 pb-1 flex justify-between">
                <span>Кузнецов В.М.</span>
                <span className="text-slate-400 italic">М.П. (подпись)</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-sans text-center mt-8">
            Документ сформирован программным комплексом SchoolHub v2.4 в рамках выпускной квалификационной работы.
          </div>

        </div>

      </div>
    </div>
  );
};
