import React from 'react';
import { StudentProfile } from '../types';
import { GraduationCap, Sparkles, Download } from 'lucide-react';

interface Props {
  profile: StudentProfile;
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenDiplomaGuide: () => void;
  onOpenReportCard: () => void;
  onOpenDownloadModal?: () => void;
}

export const Header: React.FC<Props> = ({
  profile,
  activePage,
  onNavigate,
  onOpenDiplomaGuide,
  onOpenDownloadModal,
}) => {
  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'schedule', label: 'Расписание' },
    { id: 'homework', label: 'Задания' },
    { id: 'grades', label: 'Оценки' },
    { id: 'stats', label: 'Аналитика' },
    { id: 'news', label: 'Новости' },
  ];

  const roleLabels = {
    student: 'Ученик',
    class_president: 'Староста',
    teacher: 'Преподаватель',
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0b172a] text-white border-b border-[#13243d] px-4 sm:px-6 flex items-center justify-between shadow-sm">
      
      {/* Zone 1: Single text element wordmark with Tiffany accent */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate('home')}
          className="text-xl font-bold tracking-tight text-white flex items-center gap-2.5 hover:opacity-95 transition-opacity cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0abab5] to-[#3eccca] text-[#0b172a] flex items-center justify-center font-extrabold text-base shadow-sm">
            S
          </div>
          <span className="font-extrabold tracking-tight text-white">
            School<span className="text-[#0abab5]">Hub</span>
          </span>
        </button>
      </div>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`transition-colors whitespace-nowrap cursor-pointer py-1 ${
              activePage === item.id
                ? 'text-[#0abab5] font-semibold border-b-2 border-[#0abab5] -mb-1'
                : 'hover:text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Zone 3: 1-2 primary actions with Tiffany highlights */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenDownloadModal}
          className="px-3 py-1.5 text-xs font-semibold text-white bg-[#13243d] hover:bg-[#1a3154] border border-[#0abab5]/40 hover:border-[#0abab5] rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
          title="Скачать файлы проекта (HTML и ZIP)"
        >
          <Download className="w-3.5 h-3.5 text-[#0abab5]" />
          <span className="hidden md:inline">Файлы приложения</span>
        </button>

        <button
          onClick={onOpenDiplomaGuide}
          className="px-3.5 py-1.5 text-xs font-semibold text-[#0b172a] bg-[#0abab5] hover:bg-[#3eccca] rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm font-sans"
          title="Специальный раздел для защиты дипломной работы"
        >
          <GraduationCap className="w-4 h-4 text-[#0b172a]" />
          <span className="hidden sm:inline">Для диплома</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
        </button>

        <button
          onClick={() => onNavigate('profile')}
          className="flex items-center gap-2.5 p-1 pl-2 pr-2.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0abab5] to-[#077b78] text-[#0b172a] text-xs font-extrabold flex items-center justify-center">
            {profile.name ? profile.name.charAt(0).toUpperCase() : 'У'}
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-white leading-tight truncate max-w-[120px]">
              {profile.name}
            </div>
            <div className="text-[10px] text-[#0abab5] leading-tight">
              {roleLabels[profile.role]} · {profile.className}
            </div>
          </div>
        </button>
      </div>

    </header>
  );
};
