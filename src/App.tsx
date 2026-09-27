/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { storage, calculateOverallAverage } from './utils/storage';
import { Lesson, HomeworkTask, Grade, NewsItem, StudentProfile, AttendanceRecord } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { ScheduleView } from './components/ScheduleView';
import { HomeworkView } from './components/HomeworkView';
import { GradesView } from './components/GradesView';
import { StatsView } from './components/StatsView';
import { NewsView } from './components/NewsView';
import { ProfileView } from './components/ProfileView';
import { DiplomaDefenseGuide } from './components/DiplomaDefenseGuide';
import { PrintableReportCard } from './components/PrintableReportCard';
import { InteractiveDraggableSchooly } from './components/InteractiveDraggableSchooly';
import { DownloadProjectModal } from './components/DownloadProjectModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [profile, setProfile] = useState<StudentProfile>(() => storage.getProfile());
  const [schedule, setSchedule] = useState<Lesson[]>(() => storage.getSchedule());
  const [tasks, setTasks] = useState<HomeworkTask[]>(() => storage.getTasks());
  const [grades, setGrades] = useState<Grade[]>(() => storage.getGrades());
  const [news, setNews] = useState<NewsItem[]>(() => storage.getNews());
  const [attendance, setAttendance] = useState<AttendanceRecord>(() => storage.getAttendance());

  const [isDiplomaGuideOpen, setIsDiplomaGuideOpen] = useState(false);
  const [isReportCardOpen, setIsReportCardOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const avgGrade = calculateOverallAverage(grades);
  const pendingTasksCount = tasks.filter((t) => !t.done).length;

  const showToast = (msg: string, _mood?: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Task actions
  const handleAddTask = (newTaskData: Omit<HomeworkTask, 'id' | 'createdAt' | 'done'>) => {
    const task: HomeworkTask = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      done: false,
    };
    const updated = [task, ...tasks];
    setTasks(updated);
    storage.saveTasks(updated);
    showToast('Домашнее задание успешно создано! 🎯', 'happy');
  };

  const handleToggleTask = (id: string) => {
    const updated = tasks.map((t) => {
      if (t.id === id) {
        const nextDone = !t.done;
        return {
          ...t,
          done: nextDone,
          completedAt: nextDone ? new Date().toISOString().split('T')[0] : undefined,
        };
      }
      return t;
    });
    setTasks(updated);
    storage.saveTasks(updated);
    const target = updated.find((t) => t.id === id);
    if (target?.done) {
      showToast('Задание выполнено! Скули ликует! 🌟🎉', 'celebrating');
    } else {
      showToast('Задание возвращено в работу', 'thinking');
    }
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    storage.saveTasks(updated);
    showToast('Задание удалено', 'idle');
  };

  // Schedule actions
  const handleAddLesson = (newLessonData: Omit<Lesson, 'id'>) => {
    const lesson: Lesson = {
      ...newLessonData,
      id: `lesson-${Date.now()}`,
    };
    const updated = [...schedule, lesson];
    setSchedule(updated);
    storage.saveSchedule(updated);
    showToast('Урок успешно добавлен в расписание! 📅', 'happy');
  };

  const handleDeleteLesson = (id: string) => {
    const updated = schedule.filter((l) => l.id !== id);
    setSchedule(updated);
    storage.saveSchedule(updated);
    showToast('Урок удален из расписания', 'idle');
  };

  // Grades actions
  const handleAddGrade = (newGradeData: Omit<Grade, 'id'>) => {
    const grade: Grade = {
      ...newGradeData,
      id: `grade-${Date.now()}`,
    };
    const updated = [grade, ...grades];
    setGrades(updated);
    storage.saveGrades(updated);
    const mood = grade.value === 5 ? 'celebrating' : grade.value === 4 ? 'happy' : 'thinking';
    showToast(`Оценка ${grade.value} по дисциплине «${grade.subject}» выставлена! 🏆`, mood);
  };

  const handleDeleteGrade = (id: string) => {
    const updated = grades.filter((g) => g.id !== id);
    setGrades(updated);
    storage.saveGrades(updated);
    showToast('Оценка удалена из журнала', 'idle');
  };

  // News actions
  const handleAddNews = (newNewsData: Omit<NewsItem, 'id'>) => {
    const item: NewsItem = {
      ...newNewsData,
      id: `news-${Date.now()}`,
    };
    const updated = [item, ...news];
    setNews(updated);
    storage.saveNews(updated);
    showToast('Новость успешно опубликована! 📢', 'happy');
  };

  const handleDeleteNews = (id: string) => {
    const updated = news.filter((n) => n.id !== id);
    setNews(updated);
    storage.saveNews(updated);
    showToast('Новость удалена', 'idle');
  };

  // Profile actions
  const handleSaveProfile = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    storage.saveProfile(newProfile);
    showToast('Профиль сохранен! 👤', 'happy');
  };

  // Attendance actions
  const handleUpdateAttendance = (newAttendance: AttendanceRecord) => {
    setAttendance(newAttendance);
    storage.saveAttendance(newAttendance);
    showToast('Сведения о посещаемости обновлены! ⏱️', 'proud');
  };

  // Reset to default
  const handleResetData = () => {
    storage.resetAllToDefault();
    setProfile(storage.getProfile());
    setSchedule(storage.getSchedule());
    setTasks(storage.getTasks());
    setGrades(storage.getGrades());
    setNews(storage.getNews());
    setAttendance(storage.getAttendance());
    showToast('Все данные сброшены к исходному состоянию', 'idle');
  };

  return (
    <div className="min-h-screen bg-[#f4f8f8] flex flex-col font-sans text-[#0b172a]">
      
      {/* Header (Dark Navy & Tiffany) */}
      <Header
        profile={profile}
        activePage={activePage}
        onNavigate={setActivePage}
        onOpenDiplomaGuide={() => setIsDiplomaGuideOpen(true)}
        onOpenReportCard={() => setIsReportCardOpen(true)}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
      />

      {/* Main Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Sidebar */}
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          pendingTasksCount={pendingTasksCount}
          profile={profile}
          onOpenDiplomaGuide={() => setIsDiplomaGuideOpen(true)}
          onOpenReportCard={() => setIsReportCardOpen(true)}
          onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 pb-24 md:pb-8">
          {activePage === 'home' && (
            <HomeView
              profile={profile}
              schedule={schedule}
              tasks={tasks}
              grades={grades}
              attendance={attendance}
              news={news}
              onNavigate={setActivePage}
              onToggleTask={handleToggleTask}
              onOpenDiplomaGuide={() => setIsDiplomaGuideOpen(true)}
              onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
            />
          )}

          {activePage === 'schedule' && (
            <ScheduleView
              schedule={schedule}
              onAddLesson={handleAddLesson}
              onDeleteLesson={handleDeleteLesson}
            />
          )}

          {activePage === 'homework' && (
            <HomeworkView
              tasks={tasks}
              onAddTask={handleAddTask}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          )}

          {activePage === 'grades' && (
            <GradesView
              grades={grades}
              onAddGrade={handleAddGrade}
              onDeleteGrade={handleDeleteGrade}
            />
          )}

          {activePage === 'stats' && (
            <StatsView
              grades={grades}
              tasks={tasks}
              attendance={attendance}
              onUpdateAttendance={handleUpdateAttendance}
            />
          )}

          {activePage === 'news' && (
            <NewsView
              news={news}
              onAddNews={handleAddNews}
              onDeleteNews={handleDeleteNews}
            />
          )}

          {activePage === 'profile' && (
            <ProfileView
              profile={profile}
              grades={grades}
              attendance={attendance}
              onSaveProfile={handleSaveProfile}
              onResetData={handleResetData}
              onOpenReportCard={() => setIsReportCardOpen(true)}
              onOpenDiplomaGuide={() => setIsDiplomaGuideOpen(true)}
              onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Floating Interactive & Draggable Schooly Companion */}
      <InteractiveDraggableSchooly
        activePage={activePage}
        studentName={profile.name.split(' ')[0]}
        pendingTasksCount={pendingTasksCount}
        averageGrade={avgGrade}
        onNavigate={setActivePage}
      />


      {/* Diploma Defense Guide Modal */}
      <DiplomaDefenseGuide
        isOpen={isDiplomaGuideOpen}
        onClose={() => setIsDiplomaGuideOpen(false)}
        onOpenReportCard={() => {
          setIsDiplomaGuideOpen(false);
          setIsReportCardOpen(true);
        }}
        onOpenDownloadModal={() => {
          setIsDiplomaGuideOpen(false);
          setIsDownloadModalOpen(true);
        }}
      />

      {/* Project Files Download Modal */}
      <DownloadProjectModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      {/* Official Printable Report Card Modal */}
      <PrintableReportCard
        isOpen={isReportCardOpen}
        onClose={() => setIsReportCardOpen(false)}
        profile={profile}
        grades={grades}
        attendance={attendance}
      />

      {/* Toast Notification Container in Dark Navy & Tiffany */}
      {toastMessage && (
        <div className="fixed bottom-22 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#0b172a] text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-2xl border border-[#0abab5] flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#0abab5] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
