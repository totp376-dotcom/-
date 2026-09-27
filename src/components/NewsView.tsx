import React, { useState } from 'react';
import { NewsItem, NewsCategory } from '../types';
import { Plus, Pin, User, X, Check } from 'lucide-react';

interface Props {
  news: NewsItem[];
  onAddNews: (item: Omit<NewsItem, 'id'>) => void;
  onDeleteNews: (id: string) => void;
}

export const NewsView: React.FC<Props> = ({ news, onAddNews, onDeleteNews }) => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New item form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<NewsCategory>('announcement');
  const [newAuthor, setNewAuthor] = useState('Учебная часть');
  const [isPinned, setIsPinned] = useState(false);

  const categoryLabels: Record<string, string> = {
    all: 'Все категории',
    announcement: 'Объявления',
    event: 'Мероприятия',
    olympiad: 'Олимпиады',
    exam: 'Экзамены и аттестация',
  };

  const filteredNews = news
    .filter((n) => (selectedCategory === 'all' ? true : n.category === selectedCategory))
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.date.localeCompare(a.date);
    });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    onAddNews({
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      author: newAuthor.trim() || 'Администрация лицея',
      date: new Date().toISOString().split('T')[0],
      pinned: isPinned,
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewContent('');
    setIsPinned(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0b172a] tracking-tight">Новости и объявления</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Школьные события, регламенты проведения олимпиад, расписание экзаменов и хакатонов
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-[#0abab5] hover:bg-[#3eccca] text-[#0b172a] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4 text-[#0b172a]" />
          Опубликовать новость
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs">
        {Object.keys(categoryLabels).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat as NewsCategory)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#0abab5] text-[#0b172a] shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-[#0b172a]'
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* News Cards */}
      <div className="space-y-4">
        {filteredNews.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-400 text-xs">
            Новостей в выбранной категории пока нет.
          </div>
        ) : (
          filteredNews.map((item) => (
            <div
              key={item.id}
              className={`bg-white p-5 rounded-2xl border transition-all ${
                item.pinned
                  ? 'border-[#0abab5]/40 bg-gradient-to-r from-[#f0fbfb]/80 via-white to-white'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.pinned && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#0abab5]/20 text-[#077b78] flex items-center gap-1">
                        <Pin className="w-3 h-3 text-[#0abab5]" /> Закреплено
                      </span>
                    )}
                    <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {categoryLabels[item.category] || item.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0b172a] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed pt-1 whitespace-pre-line">
                    {item.content}
                  </p>

                  <div className="text-[11px] text-slate-400 pt-2 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Автор: {item.author}</span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteNews(item.id)}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                  title="Удалить новость"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add News Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b172a]/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#0b172a]">Опубликовать новость</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Заголовок объявления
                </label>
                <input
                  type="text"
                  required
                  placeholder="Например: Сроки сдачи контрольных работ"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Категория</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as NewsCategory)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white"
                  >
                    <option value="announcement">Объявление</option>
                    <option value="event">Мероприятие</option>
                    <option value="olympiad">Олимпиада</option>
                    <option value="exam">Экзамен</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Автор / орган</label>
                  <input
                    type="text"
                    required
                    placeholder="Учебная часть"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Текст сообщения
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Подробный текст новости или регламент..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0abab5] focus:bg-white resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pinnedCheck"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0abab5] focus:ring-[#0abab5] border-slate-300 cursor-pointer"
                />
                <label htmlFor="pinnedCheck" className="text-slate-700 font-medium cursor-pointer">
                  Закрепить новость вверху списка
                </label>
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
                  Опубликовать
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
