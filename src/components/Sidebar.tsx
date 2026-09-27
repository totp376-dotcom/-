import React from 'react';
import { Home, Calendar, CheckSquare, Award, BarChart3, Newspaper, User, GraduationCap, Printer, Download } from 'lucide-react';
import { StudentProfile } from '../types';

interface Props {
  activePage: string;
  onNavigate: (page: string) => void;
  pendingTasksCount: number;
  profile: StudentProfile;
  onOpenDiplomaGuide: () => void;
  onOpenReportCard: () => void;
  onOpenDownloadModal?: () => void;
}

export const Sidebar: React.FC<Props> = ({
  activePage,
  onNavigate,
  pendingTasksCount,
  profile,
  onOpenDiplomaGuide,
  onOpenReportCard,
  onOpenDownloadModal,
}) => {
  const menu = [
    { id: 'home', label: 'Главная', icon: Home },
    { id: 'schedule', label: 'Расписание', icon: Calendar },
    { id: 'homework', label: 'Домашние задания', icon: CheckSquare, badge: pendingTasksCount > 0 ? pendingTasksCount : undefined },
    { id: 'grades', label: 'Оценки и журнал', icon: Award },
    { id: 'stats', label: 'Статистика', icon: BarChart3 },
    { id: 'news', label: 'Новости школы', icon: Newspaper },
    { id: 'profile', label: 'Профиль ученика', icon: User },
  ];

  return (
    <>
      {/* Desktop Sidebar (Dark Navy & Tiffany) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0b172a] border-r border-[#13243d] shrink-0 min-h-[calc(100vh-4rem)] p-4 justify-between text-white">
        <div className="space-y-6">
          
          {/* User mini banner */}
          <div className="p-3 bg-[#13243d]/70 border border-[#0abab5]/20 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0abab5] to-[#3eccca] text-[#0b172a] font-extrabold flex items-center justify-center text-sm shadow-xs shrink-0">
              {profile.name ? profile.name.charAt(0).toUpperCase() : 'У'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate">
                {profile.name}
              </div>
              <div className="text-[11px] text-[#0abab5] truncate">
                {profile.className}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
              Навигация
            </div>
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#0abab5]/15 text-[#0abab5] font-semibold border-l-4 border-[#0abab5]'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0abab5]' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#0abab5] text-[#0b172a]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick action buttons for diploma presentation */}
        <div className="pt-4 border-t border-[#13243d] space-y-2">
          <button
            onClick={onOpenDownloadModal}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#0b172a] bg-[#0abab5] hover:bg-[#3eccca] rounded-xl transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-4 h-4 text-[#0b172a]" />
            <span>Скачать проект (.ZIP / .HTML)</span>
          </button>

          <button
            onClick={onOpenReportCard}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-white/5 rounded-xl transition-colors cursor-pointer border border-[#13243d]"
          >
            <Printer className="w-4 h-4 text-[#0abab5]" />
            <span>Печать табеля</span>
          </button>

          <button
            onClick={onOpenDiplomaGuide}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#0abab5] bg-[#0abab5]/10 hover:bg-[#0abab5]/20 border border-[#0abab5]/30 rounded-xl transition-colors cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-[#0abab5]" />
            <span>Гид для защиты</span>
          </button>

          <div className="text-[11px] text-slate-400 text-center pt-1 font-mono">
            SchoolHub · Tiffany & Navy Edition
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (Dark Navy & Tiffany) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0b172a]/95 backdrop-blur-md border-t border-[#13243d] py-1.5 px-2 flex justify-around items-center no-print text-white">
        {menu.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 min-w-[54px] rounded-lg transition-colors relative cursor-pointer ${
                isActive ? 'text-[#0abab5] font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] leading-tight truncate max-w-[54px]">
                {item.label.split(' ')[0]}
              </span>
              {item.badge !== undefined && (
                <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-[#0abab5] text-[#0b172a] text-[9px] font-mono font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
        <button
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center justify-center p-1.5 min-w-[54px] rounded-lg transition-colors cursor-pointer ${
            activePage === 'profile' ? 'text-[#0abab5] font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] leading-tight">Профиль</span>
        </button>
      </nav>
    </>
  );
};
