import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, ThumbsUp, RefreshCw, X, Flame } from 'lucide-react';

export type MascotMood = 'idle' | 'happy' | 'celebrating' | 'thinking' | 'proud' | 'flying' | 'dragging' | 'dancing';

interface Props {
  mood?: MascotMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  pendingTasksCount?: number;
  averageGrade?: number;
  studentName?: string;
  onInteracted?: () => void;
  className?: string;
  compact?: boolean;
  isDragging?: boolean;
  isFlipping?: boolean;
  isDancing?: boolean;
  isSquishing?: boolean;
  isRoam?: boolean;
  customQuote?: string | null;
  onCloseBubble?: () => void;
}

const QUOTES = [
  'Привет! Сегодня отличный день, чтобы закрыть все дедлайны! 🚀',
  'Учишься для себя, а не для оценок! Но пятерка в дневнике лишней не будет 😉',
  'Ты уже проверил расписание на завтра? Там может быть сюрприз!',
  'По статистике, те, кто ведут дневник в SchoolHub, защищают диплом на 5+! 🎓',
  'Не забывай делать перерыв каждые 45 минут: разомни спину и выпей воды! 💧',
  'Ого, ты кликнул на меня! Дай пять! 🖐️ Я твой личный академический штурман!',
  'Сложная тема по физике? Разбей её на 3 простых вопроса и всё получится! ⚡',
  'Каждый шаг приближает тебя к выпуску и заветному аттестату с отличием! 🏆',
  'Перетаскивай меня куда хочешь! Я люблю летать по экрану! 🛸✨',
];

export const SchoolyMascot: React.FC<Props> = ({
  mood = 'idle',
  size = 'md',
  pendingTasksCount = 0,
  averageGrade = 4.7,
  studentName = 'Алексей',
  onInteracted,
  className = '',
  compact = false,
  isDragging = false,
  isFlipping = false,
  isDancing = false,
  isSquishing = false,
  isRoam = false,
  customQuote = null,
  onCloseBubble,
}) => {
  const [currentMood, setCurrentMood] = useState<MascotMood>(mood);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isWinking, setIsWinking] = useState(false);
  const [isTalking, setIsTalking] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [isBouncing, setIsBouncing] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    setCurrentMood(mood);
  }, [mood]);

  // Contextual smart quote logic
  const getContextQuote = () => {
    if (customQuote) return customQuote;
    if (isDragging) return 'Уииии! Летим! Держи крепче! 🪽💨';
    if (isDancing) return 'Музыка в душе, пятерки в дневнике! 🎶🕺';
    if (isFlipping) return 'Смотри, какой трюк! 360 градусов в воздухе! 🔄✨';
    if (clickCount > 0) {
      return QUOTES[quoteIndex % QUOTES.length];
    }
    if (pendingTasksCount === 0) {
      return `Красота, ${studentName}! Все задания выполнены. Время пить чай и отдыхать! ☕✨`;
    }
    if (pendingTasksCount >= 4) {
      return `Внимание! Накопилось ${pendingTasksCount} заданий. Давай начнем с самого легкого! 🎯`;
    }
    if (averageGrade >= 4.75) {
      return `Средний балл ${averageGrade.toFixed(2)} — это уровень круглой пятерки! Так держать! 🌟`;
    }
    return QUOTES[0];
  };

  const handleClick = (e: React.MouseEvent) => {
    setIsBouncing(true);
    setClickCount((prev) => prev + 1);
    setQuoteIndex((prev) => prev + 1);
    setIsTalking(true);

    // Spawn floating heart
    const newHeart = { id: Date.now(), x: (Math.random() - 0.5) * 40, y: -20 };
    setHearts((prev) => [...prev.slice(-3), newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);

    // Randomize temporary mood
    const moods: MascotMood[] = ['happy', 'celebrating', 'proud'];
    const nextMood = moods[Math.floor(Math.random() * moods.length)];
    setCurrentMood(nextMood);

    // Wink
    setIsWinking(true);
    setTimeout(() => setIsWinking(false), 600);
    setTimeout(() => setIsBouncing(false), 800);
    setTimeout(() => setCurrentMood(mood), 2600);

    if (onInteracted) onInteracted();
  };

  const dimensions = {
    sm: { width: 75, height: 75 },
    md: { width: 135, height: 135 },
    lg: { width: 180, height: 180 },
    xl: { width: 220, height: 220 },
  }[size];

  // Dynamic animation class
  const getAnimationClass = () => {
    if (isFlipping) return 'animate-schooly-flip';
    if (isDancing) return 'animate-schooly-dance';
    if (isSquishing) return 'animate-schooly-squish';
    if (isDragging) return '';
    if (isBouncing) return 'animate-schooly-bounce';
    if (isRoam) return 'animate-schooly-roam';
    return 'animate-schooly-bob';
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      
      {/* Floating Hearts Particle Effect */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute -top-4 pointer-events-none text-rose-500 font-bold text-sm animate-schooly-heart z-30"
          style={{ transform: `translate(${heart.x}px, ${heart.y}px)` }}
        >
          ❤️
        </div>
      ))}

      {/* Speech Bubble */}
      {isTalking && !compact && (
        <div className="relative mb-3 max-w-xs animate-in fade-in zoom-in-95 duration-200 pointer-events-auto">
          <div className="bg-white border-2 border-[#0abab5] shadow-xl rounded-2xl p-3 sm:p-3.5 text-xs text-[#0b172a] font-medium leading-relaxed relative">
            <div className="flex items-start justify-between gap-2">
              <span className="flex-1 font-sans">{getContextQuote()}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTalking(false);
                  if (onCloseBubble) onCloseBubble();
                }}
                className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer shrink-0"
                title="Скрыть реплику"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {/* Mascot Mini Tag */}
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#077b78] font-bold">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#0abab5]" />
                Скули · Твой штурман
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuoteIndex((prev) => prev + 1);
                }}
                className="hover:underline flex items-center gap-0.5 cursor-pointer text-slate-500"
              >
                <RefreshCw className="w-2.5 h-2.5" /> Еще совет
              </button>
            </div>

            {/* Bubble Tail pointing down */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-r-2 border-b-2 border-[#0abab5] rotate-45" />
          </div>
        </div>
      )}

      {/* Interactive Mascot SVG Canvas */}
      <div
        onClick={handleClick}
        className={`transition-transform duration-200 relative group ${getAnimationClass()}`}
      >
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox="0 0 200 200"
          className="drop-shadow-md overflow-visible"
        >
          {/* Shadow beneath character (shrinks when dragging or jumping) */}
          <ellipse
            cx="100"
            cy="188"
            rx={isDragging ? '24' : '48'}
            ry={isDragging ? '4' : '9'}
            fill="#0b172a"
            opacity={isDragging ? '0.08' : '0.15'}
            className="transition-all duration-200"
          />

          {/* Left Wing (flapping / flutter / moving) */}
          <g className={isDragging ? 'animate-schooly-flutter' : currentMood === 'celebrating' || isBouncing || isDancing ? 'animate-schooly-wing-left' : ''}>
            <path
              d="M 52 95 C 22 105 18 135 38 152 C 48 160 62 150 68 138 Z"
              fill="#089b97"
              stroke="#0b172a"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Wing feathers detail */}
            <path
              d="M 32 118 C 30 134 45 142 54 135"
              fill="none"
              stroke="#0b172a"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* Right Wing (waving / celebratory / flutter) */}
          <g className={isDragging ? 'animate-schooly-flutter' : currentMood === 'celebrating' || isBouncing || isDancing ? 'animate-schooly-wing-right' : ''}>
            <path
              d={
                currentMood === 'celebrating' || currentMood === 'happy' || isDragging
                  ? 'M 148 95 C 178 85 186 115 168 142 C 158 152 142 146 134 134 Z'
                  : 'M 148 95 C 178 105 182 135 162 152 C 152 160 138 150 132 138 Z'
              }
              fill="#089b97"
              stroke="#0b172a"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M 168 118 C 170 134 155 142 146 135"
              fill="none"
              stroke="#0b172a"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          {/* Feet (Cute golden feet - dangles wildly during drag!) */}
          <g className={isDragging ? 'animate-schooly-feet' : ''}>
            <ellipse cx="78" cy="180" rx="14" ry="7" fill="#f59e0b" stroke="#0b172a" strokeWidth="3" />
            <ellipse cx="122" cy="180" rx="14" ry="7" fill="#f59e0b" stroke="#0b172a" strokeWidth="3" />
          </g>

          {/* Main Body (Tiffany Blue) */}
          <ellipse
            cx="100"
            cy="115"
            rx="66"
            ry="68"
            fill="#0abab5"
            stroke="#0b172a"
            strokeWidth="5"
          />

          {/* Belly Badge (Soft off-white / mint feather patch) */}
          <ellipse
            cx="100"
            cy="130"
            rx="44"
            ry="45"
            fill="#f0fbfb"
            stroke="#077b78"
            strokeWidth="3"
            opacity="0.95"
          />

          {/* Belly Feather Chevron details (academic owl style) */}
          <path
            d="M 88 115 Q 100 125 112 115"
            fill="none"
            stroke="#0abab5"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 84 130 Q 100 142 116 130"
            fill="none"
            stroke="#0abab5"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 90 145 Q 100 155 110 145"
            fill="none"
            stroke="#0abab5"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Eyes Group with Blinking effect and Drag Surprised state */}
          <g className={!isWinking && !isDragging ? 'animate-schooly-blink' : ''}>
            {/* Left Eye background */}
            <circle cx="74" cy="98" r="23" fill="#ffffff" stroke="#0b172a" strokeWidth="4" />
            {/* Right Eye background */}
            <circle cx="126" cy="98" r="23" fill="#ffffff" stroke="#0b172a" strokeWidth="4" />

            {/* Left Eye Pupil */}
            {isWinking ? (
              <path
                d="M 60 98 Q 74 88 88 98"
                fill="none"
                stroke="#0b172a"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ) : isDragging ? (
              /* Surprised wide eyes while dragged */
              <>
                <circle cx="74" cy="98" r="14" fill="#0b172a" />
                <circle cx="70" cy="94" r="5" fill="#ffffff" />
                <circle cx="79" cy="103" r="2.5" fill="#ffffff" />
              </>
            ) : currentMood === 'celebrating' || currentMood === 'happy' || isDancing ? (
              /* Joyful happy arc eyes ^ ^ */
              <path
                d="M 62 100 Q 74 84 86 100"
                fill="none"
                stroke="#0b172a"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ) : (
              <>
                <circle cx="76" cy="98" r="12" fill="#0b172a" />
                <circle cx="72" cy="94" r="4.5" fill="#ffffff" />
                <circle cx="81" cy="102" r="2.2" fill="#ffffff" />
              </>
            )}

            {/* Right Eye Pupil */}
            {isDragging ? (
              <>
                <circle cx="126" cy="98" r="14" fill="#0b172a" />
                <circle cx="122" cy="94" r="5" fill="#ffffff" />
                <circle cx="131" cy="103" r="2.5" fill="#ffffff" />
              </>
            ) : currentMood === 'celebrating' || currentMood === 'happy' || isDancing ? (
              <path
                d="M 114 100 Q 126 84 138 100"
                fill="none"
                stroke="#0b172a"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ) : (
              <>
                <circle cx="124" cy="98" r="12" fill="#0b172a" />
                <circle cx="120" cy="94" r="4.5" fill="#ffffff" />
                <circle cx="129" cy="102" r="2.2" fill="#ffffff" />
              </>
            )}
          </g>

          {/* Golden Smart Spectacles / Round Glasses Frame */}
          <g>
            <circle
              cx="74"
              cy="98"
              r="24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3.5"
            />
            <circle
              cx="126"
              cy="98"
              r="24"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3.5"
            />
            {/* Bridge */}
            <path
              d="M 97 95 Q 100 90 103 95"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>

          {/* Beak / Smile */}
          <polygon
            points="93,109 107,109 100,123"
            fill="#f59e0b"
            stroke="#0b172a"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Rosy Cheeks */}
          <circle cx="56" cy="118" r="7" fill="#fb7185" opacity="0.65" />
          <circle cx="144" cy="118" r="7" fill="#fb7185" opacity="0.65" />

          {/* Academic Graduation Cap (Dark Navy with Gold Tassel) */}
          <g transform="translate(0, -6)">
            {/* Skull cap band */}
            <path
              d="M 75 58 C 75 50 125 50 125 58 L 122 68 C 122 72 78 72 78 68 Z"
              fill="#060c18"
              stroke="#0b172a"
              strokeWidth="3"
            />
            {/* Diamond mortarboard cap top */}
            <polygon
              points="100,28 152,48 100,68 48,48"
              fill="#0b172a"
              stroke="#3f6da3"
              strokeWidth="2.5"
            />
            {/* Cap button center */}
            <circle cx="100" cy="48" r="4.5" fill="#f59e0b" stroke="#0b172a" strokeWidth="2" />
            {/* Gold Tassel dangling to the side */}
            <path
              d="M 100 48 Q 130 52 135 70 L 137 84"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Tassel fringe */}
            <ellipse cx="137" cy="85" rx="4" ry="6" fill="#f59e0b" stroke="#0b172a" strokeWidth="2" />
          </g>

          {/* Sparkling Stars around mascot */}
          {(currentMood === 'celebrating' || currentMood === 'happy' || isBouncing || isFlipping || isDancing) && (
            <g className="animate-pulse">
              <path
                d="M 28 45 L 32 35 L 36 45 L 46 49 L 36 53 L 32 63 L 28 53 L 18 49 Z"
                fill="#f59e0b"
              />
              <path
                d="M 165 40 L 168 32 L 171 40 L 179 43 L 171 46 L 168 54 L 165 46 L 157 43 Z"
                fill="#0abab5"
              />
            </g>
          )}

          {/* Music Notes if dancing */}
          {isDancing && (
            <g className="animate-bounce">
              <text x="30" y="55" fontSize="18" fill="#f59e0b">♪</text>
              <text x="160" y="65" fontSize="22" fill="#0abab5">♫</text>
            </g>
          )}
        </svg>

        {/* Hover / Drag indicator */}
        {!isDragging && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#0b172a] text-[#0abab5] border border-[#0abab5]/40 text-[10px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            Тащи меня мышкой! 🖱️
          </div>
        )}
      </div>
    </div>
  );
};

