import React, { useState, useEffect, useRef } from 'react';
import { SchoolyMascot, MascotMood } from './SchoolyMascot';
import { RotateCcw, Music, Sparkles, Move, Compass, Pin, MessageCircle, X, ChevronUp, ChevronDown } from 'lucide-react';

interface Props {
  activePage: string;
  studentName?: string;
  pendingTasksCount?: number;
  averageGrade?: number;
  onNavigate?: (page: string) => void;
}

const PAGE_NAMES: Record<string, string> = {
  home: 'Главная',
  schedule: 'Расписание',
  homework: 'Задания',
  grades: 'Оценки',
  stats: 'Аналитика',
  news: 'Новости',
  profile: 'Профиль',
};

export const InteractiveDraggableSchooly: React.FC<Props> = ({
  activePage,
  studentName = 'Алексей',
  pendingTasksCount = 0,
  averageGrade = 4.8,
}) => {
  // Coordinates (default to bottom-right corner)
  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    if (typeof window !== 'undefined') {
      return {
        x: Math.max(20, window.innerWidth - 180),
        y: Math.max(40, window.innerHeight - 240),
      };
    }
    return { x: 300, y: 500 };
  });

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasMovedDuringDrag, setHasMovedDuringDrag] = useState(false);

  // Animation states
  const [isFlipping, setIsFlipping] = useState(false);
  const [isDancing, setIsDancing] = useState(false);
  const [isSquishing, setIsSquishing] = useState(false);
  const [isRoam, setIsRoam] = useState(false);
  const [mascotMood, setMascotMood] = useState<MascotMood>('idle');
  const [customQuote, setCustomQuote] = useState<string | null>(null);
  const [showControlDeck, setShowControlDeck] = useState(false);
  const [sparkleTrail, setSparkleTrail] = useState<{ id: number; x: number; y: number }[]>([]);

  // Page Transition awareness: fly to new slide animation!
  const prevPageRef = useRef(activePage);

  useEffect(() => {
    if (prevPageRef.current !== activePage) {
      const pageTitle = PAGE_NAMES[activePage] || activePage;
      setCustomQuote(`Перелетаем в «${pageTitle}»! 🚀🪽`);
      setMascotMood('flying');
      setIsFlipping(true);

      // Spawn celebratory particles
      const newSparkles = [
        { id: Date.now() + 1, x: position.x + 30, y: position.y - 20 },
        { id: Date.now() + 2, x: position.x + 70, y: position.y - 30 },
        { id: Date.now() + 3, x: position.x + 110, y: position.y - 15 },
      ];
      setSparkleTrail(newSparkles);

      const t1 = setTimeout(() => {
        setIsFlipping(false);
        setMascotMood('happy');
      }, 900);

      const t2 = setTimeout(() => {
        setCustomQuote(null);
        setMascotMood('idle');
        setSparkleTrail([]);
      }, 3500);

      prevPageRef.current = activePage;
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [activePage, position]);

  // Window resize protection to keep Schooly on screen
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(prev.x, window.innerWidth - 160),
        y: Math.min(prev.y, window.innerHeight - 200),
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pointer / Mouse Dragging Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag with left mouse button (e.button === 0)
    if (e.button !== 0) return;
    
    // Don't drag if clicking buttons inside bubble or controls
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('input')) return;

    setIsDragging(true);
    setHasMovedDuringDrag(false);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    setMascotMood('dragging');
    setCustomQuote('Уиии! Летим! Перетаскивай куда угодно! 🪽💨');

    // Capture pointer
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    setHasMovedDuringDrag(true);
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Viewport clamping
    const clampedX = Math.max(10, Math.min(window.innerWidth - 160, newX));
    const clampedY = Math.max(10, Math.min(window.innerHeight - 210, newY));

    setPosition({ x: clampedX, y: clampedY });

    // Spawn tiny trail sparkles occasionally while flying
    if (Math.random() < 0.25) {
      const p = { id: Date.now() + Math.random(), x: clampedX + 60, y: clampedY + 70 };
      setSparkleTrail((prev) => [...prev.slice(-6), p]);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    // Squish on drop!
    setIsSquishing(true);
    setMascotMood('happy');
    setCustomQuote('Мягкая посадка! Отличное место! 🎯✨');

    setTimeout(() => {
      setIsSquishing(false);
      setCustomQuote(null);
      setMascotMood('idle');
      setSparkleTrail([]);
    }, 2400);
  };

  // Fun trick actions
  const triggerBackflip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipping(true);
    setCustomQuote('Смотри: крутое сальто на 360 градусов! 🔄✨');
    setMascotMood('celebrating');
    setTimeout(() => {
      setIsFlipping(false);
      setCustomQuote(null);
      setMascotMood('idle');
    }, 1000);
  };

  const triggerDance = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDancing((prev) => !prev);
    if (!isDancing) {
      setCustomQuote('Врубаем диско! Учиться нужно весело! 🎶🕺');
      setMascotMood('dancing');
    } else {
      setCustomQuote(null);
      setMascotMood('idle');
    }
  };

  const triggerRoam = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRoam((prev) => !prev);
    if (!isRoam) {
      setCustomQuote('Режим свободного полета активирован! 🕊️');
    } else {
      setCustomQuote(null);
    }
  };

  const resetToCorner = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPosition({
      x: window.innerWidth - 180,
      y: window.innerHeight - 240,
    });
    setIsSquishing(true);
    setTimeout(() => setIsSquishing(false), 500);
  };

  // Double click trick: instant backflip!
  const handleDoubleClick = (e: React.MouseEvent) => {
    triggerBackflip(e);
  };

  return (
    <div
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={handleDoubleClick}
      className={`z-50 no-print transition-shadow select-none ${
        isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab'
      }`}
    >
      {/* Sparkle Trail particles */}
      {sparkleTrail.map((sp) => (
        <div
          key={sp.id}
          className="fixed pointer-events-none text-[#0abab5] animate-ping text-xs z-40 font-bold"
          style={{ left: `${sp.x}px`, top: `${sp.y}px` }}
        >
          ✦
        </div>
      ))}

      {/* Main Mascot Visual */}
      <div className="relative group">
        <SchoolyMascot
          mood={mascotMood}
          size="sm"
          pendingTasksCount={pendingTasksCount}
          averageGrade={averageGrade}
          studentName={studentName}
          isDragging={isDragging}
          isFlipping={isFlipping}
          isDancing={isDancing}
          isSquishing={isSquishing}
          isRoam={isRoam}
          customQuote={customQuote}
          onCloseBubble={() => setCustomQuote(null)}
          compact={false}
        />

        {/* Quick Tricks Button Toggle (attached to character) */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#0b172a] border border-[#0abab5]/40 rounded-full px-2 py-0.5 shadow-lg text-[10px] text-white">
          <button
            onClick={() => setShowControlDeck(!showControlDeck)}
            className="flex items-center gap-1 font-bold text-[#0abab5] hover:text-white cursor-pointer"
            title="Открыть панель трюков"
          >
            <Sparkles className="w-3 h-3 text-[#0abab5]" />
            <span>Трюки</span>
            {showControlDeck ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
        </div>

        {/* Expanded Trick Deck */}
        {showControlDeck && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-full mt-8 left-1/2 -translate-x-1/2 bg-[#0b172a] border-2 border-[#0abab5] text-white p-2.5 rounded-2xl shadow-2xl flex flex-col gap-1.5 w-44 animate-in fade-in zoom-in-95 pointer-events-auto"
          >
            <div className="text-[10px] font-bold text-slate-300 px-1 border-b border-[#13243d] pb-1 flex items-center justify-between">
              <span>Анимации Скули:</span>
              <button
                onClick={() => setShowControlDeck(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            <button
              onClick={triggerBackflip}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[#13243d] hover:bg-[#0abab5] hover:text-[#0b172a] text-xs font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Сальто 360°</span>
            </button>

            <button
              onClick={triggerDance}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                isDancing
                  ? 'bg-[#0abab5] text-[#0b172a]'
                  : 'bg-[#13243d] hover:bg-[#0abab5] hover:text-[#0b172a]'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>{isDancing ? 'Остановить танец' : 'Диско-танец'}</span>
            </button>

            <button
              onClick={triggerRoam}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                isRoam
                  ? 'bg-[#0abab5] text-[#0b172a]'
                  : 'bg-[#13243d] hover:bg-[#0abab5] hover:text-[#0b172a]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{isRoam ? 'Стоп патруль' : 'Режим патруля'}</span>
            </button>

            <button
              onClick={resetToCorner}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[#13243d] hover:bg-slate-700 text-xs font-semibold transition-colors cursor-pointer text-slate-300"
            >
              <Pin className="w-3.5 h-3.5 text-[#0abab5]" />
              <span>В правый угол</span>
            </button>

            <div className="text-[9px] text-slate-400 text-center pt-0.5">
              Подсказка: зажми ЛКМ и перетаскивай!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
