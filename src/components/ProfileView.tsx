import React, { useState } from 'react';
import { StudentProfile, Grade, AttendanceRecord } from '../types';
import { Printer, RotateCcw, Check, Sparkles, Download, FolderArchive } from 'lucide-react';

interface Props {
  profile: StudentProfile;
  grades: Grade[];
  attendance: AttendanceRecord;
  onSaveProfile: (profile: StudentProfile) => void;
  onResetData: () => void;
  onOpenReportCard: () => void;
  onOpenDiplomaGuide: () => void;
  onOpenDownloadModal?: () => void;
}

export const ProfileView: React.FC<Props> = ({
  profile,
  onSaveProfile,
  onResetData,
  onOpenReportCard,
  onOpenDiplomaGuide,
  onOpenDownloadModal,
}) => {
  const [formData, setFormData] = useState<StudentProfile>(profile);
  const [isSavedRecently, setIsSavedRecently] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 2500);
  };

  const handleResetConfirm = () => {
    if (window.confirm('Сбросить все данные портала к первоначальному демо-состоянию?')) {
      onResetData();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#0b172a] tracking-tight">Профиль пользователя</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Персональные данные, роль в системе, настройки отображения и выгрузка документов
        </p>
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
        
        {/* User Card Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0abab5] to-[#077b78] text-[#0b172a] font-extrabold text-2xl flex items-center justify-center shadow-md">
              {formData.name ? formData.name.charAt(0).toUpperCase() : 'У'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0b172a]">{formData.name}</h2>
              <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                <span>{formData.className}</span>
                <span>·</span>
                <span className="font-bold text-[#077b78] bg-[#0abab5]/15 px-2 py-0.5 rounded-md">
                  {formData.role === 'student' ? 'Ученик' : formData.role === 'class_president' ? 'Староста' : 'Преподаватель'}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">{formData.schoolName}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenReportCard}
            className="px-4 py-2 bg-[#f0fbfb] hover:bg-[#0abab5]/20 text-[#077b78] border border-[#0abab5]/40 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer w-fit shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#0abab5]" />
            Печать официального табеля
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                ФИО учащегося / пользователя
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Класс / Группа
              </label>
              <input
                type="text"
                required
                value={formData.className}
                onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Учебное заведение
              </label>
              <input
                type="text"
                required
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Контактный e-mail
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Роль в системе (для демонстрации дипломной комиссии)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'student', label: 'Ученик', desc: 'Просмотр оценок и сдача ДЗ' },
                { id: 'class_president', label: 'Староста', desc: 'Управление новостями и журналом' },
                { id: 'teacher', label: 'Преподаватель', desc: 'Выставление оценок и расписание' },
              ].map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: role.id as any })}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    formData.role === role.id
                      ? 'bg-[#f0fbfb] border-[#0abab5] ring-2 ring-[#0abab5]/20'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-[#0b172a]">{role.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{role.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              О себе / направление обучения
            </label>
            <textarea
              rows={3}
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {isSavedRecently ? (
              <span className="text-[#077b78] font-bold flex items-center gap-1.5 animate-in fade-in">
                <Check className="w-4 h-4 text-[#0abab5]" /> Изменения успешно сохранены!
              </span>
            ) : (
              <span className="text-slate-400">Данные сохраняются в защищенном локальном хранилище</span>
            )}

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0abab5] hover:bg-[#3eccca] text-[#0b172a] rounded-xl font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Check className="w-4 h-4" />
              Сохранить профиль
            </button>
          </div>
        </form>

      </div>

      {/* Diploma and System Management Card (Dark Navy & Tiffany) */}
      <div className="bg-[#0b172a] text-white p-6 rounded-2xl border border-[#13243d] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#0abab5] font-bold text-xs">
            <Sparkles className="w-4 h-4 text-[#0abab5]" />
            <span>Управление состоянием дипломного проекта</span>
          </div>
          <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
            Если в процессе тестирования вы изменили слишком много оценок или заданий, вы можете вернуть демонстрационный набор данных в 1 клик.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onOpenDownloadModal && (
            <button
              type="button"
              onClick={onOpenDownloadModal}
              className="flex-1 sm:flex-none px-4 py-2 bg-[#0abab5] hover:bg-[#3eccca] text-[#0b172a] font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#0b172a]" />
              Скачать проект
            </button>
          )}
          <button
            type="button"
            onClick={onOpenDiplomaGuide}
            className="flex-1 sm:flex-none px-4 py-2 bg-[#13243d] hover:bg-[#1a3254] text-[#0abab5] font-bold text-xs rounded-xl border border-[#0abab5]/30 transition-colors cursor-pointer"
          >
            Гид по защите
          </button>
          <button
            type="button"
            onClick={handleResetConfirm}
            className="flex-1 sm:flex-none px-4 py-2 bg-[#13243d] hover:bg-[#1a3254] text-slate-200 hover:text-white font-medium text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#0abab5]" />
            Сброс данных
          </button>
        </div>
      </div>

    </div>
  );
};
