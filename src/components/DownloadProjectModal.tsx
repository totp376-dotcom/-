import React, { useState } from 'react';
import { X, Download, FileCode, CheckCircle2, Sparkles, Terminal, Copy, Check, FolderArchive, Laptop } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadProjectModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [copiedCmd, setCopiedCmd] = useState(false);

  if (!isOpen) return null;

  const copyRunCommand = () => {
    navigator.clipboard.writeText('npm install && npm run dev');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#0b172a] text-white p-5 px-6 flex items-center justify-between border-b border-[#13243d]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0abab5] to-[#3eccca] text-[#0b172a] flex items-center justify-center font-bold">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Скачать файлы приложения
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#0abab5]/20 text-[#0abab5] border border-[#0abab5]/30">
                  SchoolHub v2.4
                </span>
              </h2>
              <p className="text-xs text-slate-300">
                Готовые файлы для сдачи дипломной работы и локального запуска
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800">
          
          {/* Main 2 download options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Option 1: Standalone HTML */}
            <div className="p-5 rounded-2xl border-2 border-[#0abab5]/30 bg-[#f0fbfb] hover:border-[#0abab5] transition-all flex flex-col justify-between group shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0abab5] text-[#0b172a] flex items-center justify-center font-bold shadow-xs">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#0abab5]/20 text-[#077b78]">
                    Рекомендуется
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#0b172a] mb-1">
                  SchoolHub_standalone.html
                </h3>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  Полностью автономный файл приложения. Открывается <strong>в 1 клик на любом ПК</strong> в обычном браузере без установки программ, интернета и Node.js.
                </p>
                <div className="space-y-1 mb-4 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Все стили, скрипты и маскот Скули внутри</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Идеально для показа на флешке комиссии</span>
                  </div>
                </div>
              </div>

              <a
                href="/SchoolHub_standalone.html"
                download="SchoolHub_standalone.html"
                className="w-full py-2.5 px-4 bg-[#0abab5] hover:bg-[#089b97] text-[#0b172a] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm group-hover:shadow-md cursor-pointer text-center"
              >
                <Download className="w-4 h-4" />
                <span>Скачать .HTML (~700 КБ)</span>
              </a>
            </div>

            {/* Option 2: Full Source ZIP */}
            <div className="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50/70 hover:border-[#0b172a] transition-all flex flex-col justify-between group shadow-xs">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0b172a] text-[#0abab5] flex items-center justify-center font-bold shadow-xs">
                    <FolderArchive className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    Полный исходный код
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#0b172a] mb-1">
                  schoolhub-project.zip
                </h3>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  Полный архив проекта: React 19, TypeScript, Tailwind CSS, все компоненты интерфейса, маскот Скули и готовый <code className="text-[#077b78] font-bold">README.md</code> для диплома.
                </p>
                <div className="space-y-1 mb-4 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Чистая модульная архитектура React + TS</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Готов к загрузке на GitHub или сдаче кафедре</span>
                  </div>
                </div>
              </div>

              <a
                href="/schoolhub-project.zip"
                download="SchoolHub-diploma-project.zip"
                className="w-full py-2.5 px-4 bg-[#0b172a] hover:bg-[#13243d] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm group-hover:shadow-md cursor-pointer text-center"
              >
                <Download className="w-4 h-4 text-[#0abab5]" />
                <span>Скачать .ZIP (~253 КБ)</span>
              </a>
            </div>

          </div>

          {/* Quick instructions for running the project */}
          <div className="p-4 rounded-xl bg-[#0b172a] text-white border border-[#13243d] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0abab5] flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                Как запустить проект из архива .ZIP:
              </span>
              <button
                onClick={copyRunCommand}
                className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg transition-colors cursor-pointer"
              >
                {copiedCmd ? (
                  <>
                    <Check className="w-3 h-3 text-[#0abab5]" />
                    <span className="text-[#0abab5]">Скопировано!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Копировать команду</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-black/40 p-2.5 rounded-lg font-mono text-xs text-[#0abab5] overflow-x-auto select-all">
              npm install && npm run dev
            </div>

            <ol className="text-xs text-slate-300 space-y-1 list-decimal list-inside leading-relaxed">
              <li>Распакуйте скачанный архив <span className="text-white font-semibold">SchoolHub-diploma-project.zip</span>.</li>
              <li>Откройте командную строку (терминал) в папке проекта.</li>
              <li>Выполните команду выше и откройте <span className="text-white font-semibold">http://localhost:3000</span>.</li>
            </ol>
          </div>

          {/* Schooly Mascot note */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong>Совет от Скули для защиты диплома:</strong> на защите лучше всего иметь с собой оба файла — файл <span className="font-semibold underline">SchoolHub_standalone.html</span> на флешке (чтобы мгновенно показать работающее приложение даже если на компьютере комиссии нет Node.js), а архив <span className="font-semibold underline">.ZIP</span> приложить к дипломной работе как официальный исходный код!
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Оба файла уже сгенерированы и готовы к загрузке
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
};
