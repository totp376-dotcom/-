import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, BookOpen, Layers, Lightbulb, Ban, Sparkles, Printer, Copy, Check, Download } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenReportCard: () => void;
  onOpenDownloadModal?: () => void;
}

export const DiplomaDefenseGuide: React.FC<Props> = ({ isOpen, onClose, onOpenReportCard, onOpenDownloadModal }) => {
  const [activeTab, setActiveTab] = useState<'bugs' | 'what_to_do' | 'what_not_to_do' | 'speech' | 'tech'>('bugs');
  const [copiedSpeech, setCopiedSpeech] = useState(false);

  if (!isOpen) return null;

  const speechText = `Уважаемый председатель и члены государственной экзаменационной комиссии!

Вашему вниманию представляется выпускная квалификационная работа на тему:
«Разработка кроссплатформенного веб-приложения школьного электронного портала "SchoolHub" для мониторинга учебного процесса и успеваемости».

Актуальность работы обусловлена необходимостью предоставления учащимся и преподавателям удобного, быстрого и интуитивного цифрового инструмента для управления учебным расписанием, контроля домашних заданий, анализа оценок и мониторинга академических результатов.

В ходе выполнения работы были решены следующие задачи:
1. Проведен анализ существующих систем (Дневник.ру, МЭШ, Google Classroom) и выявлены их ограничения в части скорости работы и персонализированной аналитики.
2. Спроектирована архитектура клиентского веб-приложения на базе компонентного подхода с использованием React 19, TypeScript и Tailwind CSS.
3. Реализован модуль интерактивного расписания с автоматическим отслеживанием текущих уроков и поддержкой двухнедельного цикла.
4. Разработан модуль трекера домашних заданий с приоритетами, фильтрацией и контролем дедлайнов.
5. Создан электронный журнал оценок с динамическим расчетом среднего балла, прогнозированием итоговых четвертных отметок и интерактивным калькулятором успеваемости.
6. Внедрен модуль генерации официального табеля успеваемости для экспорта и печати.

Практическая значимость проекта заключается в повышении самодисциплины учащихся и прозрачности учебного процесса. Приложение адаптировано под мобильные и десктопные устройства и готово к внедрению в учебных заведениях.

Благодарю за внимание, готов ответить на ваши вопросы!`;

  const copySpeech = () => {
    navigator.clipboard.writeText(speechText);
    setCopiedSpeech(true);
    setTimeout(() => setCopiedSpeech(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0b172a] text-white flex items-center justify-between border-b border-[#13243d]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0abab5]/20 border border-[#0abab5]/40 flex items-center justify-center text-[#0abab5]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Методический гид для защиты дипломной работы</h2>
              <p className="text-xs text-[#0abab5]">Анализ багов, рекомендации «Что надо / Что не надо», архитектура и речь</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('bugs')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'bugs'
                ? 'border-[#0abab5] text-[#077b78] bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Исправленные баги (Аудит)
          </button>
          <button
            onClick={() => setActiveTab('what_to_do')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'what_to_do'
                ? 'border-[#0abab5] text-[#077b78] bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-emerald-500" />
            Что НАДО в дипломе
          </button>
          <button
            onClick={() => setActiveTab('what_not_to_do')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'what_not_to_do'
                ? 'border-[#0abab5] text-[#077b78] bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Ban className="w-4 h-4 text-rose-500" />
            Что НЕ НАДО в дипломе
          </button>
          <button
            onClick={() => setActiveTab('speech')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'speech'
                ? 'border-[#0abab5] text-[#077b78] bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#0abab5]" />
            Речь на защиту (Доклад)
          </button>
          <button
            onClick={() => setActiveTab('tech')}
            className={`py-3 px-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'tech'
                ? 'border-[#0abab5] text-[#077b78] bg-white font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-sky-500" />
            Стек и архитектура
          </button>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-slate-700 text-sm">
          
          {/* TAB 1: BUGS */}
          {activeTab === 'bugs' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs leading-relaxed">
                <strong>Экспертный аудит исходного кода:</strong> В предоставленном прототипе было выявлено 8 критических и архитектурных ошибок, из-за которых сайт не мог считаться полноценной дипломной работой. Ниже приведен детальный список исправлений.
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="p-1 rounded-md bg-rose-100 text-rose-700 text-xs font-bold">Баг №1</span>
                    <div>
                      <h4 className="font-semibold text-slate-900">Отсутствие стилей класса .grade и невозможность ставить оценки</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        <strong>Было:</strong> В JS генерировался тег <code>&lt;div class=&quot;grade&quot;&gt;5&lt;/div&gt;</code>, но класса <code>.grade</code> в CSS вообще не существовало. Оценки выводились как нестилизованный голый текст. Массив оценок был константным, пользователь не мог добавить или удалить оценку.
                      </p>
                      <p className="text-xs text-emerald-700 mt-1 font-medium">
                        <strong>Исправлено:</strong> Разработан полноценный модуль журнала с градацией (5 — отлично, 4 — хорошо, 3 — уд., 2 — неуд.), возможностью выставлять оценки с указанием типа работы (контрольная, ответ, ДЗ, экзамен), темой и датой, а также их удалением.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="p-1 rounded-md bg-rose-100 text-rose-700 text-xs font-bold">Баг №2</span>
                    <div>
                      <h4 className="font-semibold text-slate-900">Фальшивая статистика успеваемости (захардкоженные данные)</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        <strong>Было:</strong> В разделе «Статистика» средний балл по математике (4.8), информатике (5.0) и посещаемость (92%) были жестко зашиты в HTML-верстке. При изменении оценок статистика не обновлялась.
                      </p>
                      <p className="text-xs text-emerald-700 mt-1 font-medium">
                        <strong>Исправлено:</strong> Все показатели теперь вычисляются строго математически из актуального хранилища оценок в реальном времени. Рассчитывается динамический процент посещаемости и распределение оценок.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="p-1 rounded-md bg-rose-100 text-rose-700 text-xs font-bold">Баг №3</span>
                    <div>
                      <h4 className="font-semibold text-slate-900">Несохранение расписания и оценок в LocalStorage</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        <strong>Было:</strong> В localStorage сохранялись только задачи и имя профиля. Расписание и журнал оценок сбрасывались и не подлежали модификации.
                      </p>
                      <p className="text-xs text-emerald-700 mt-1 font-medium">
                        <strong>Исправлено:</strong> Реализован единый типизированный слой хранения (Data Access Layer) с сохранением профиля, расписания, ДЗ, оценок, новостей и посещаемости. Добавлена функция безопасного сброса к демо-данным.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="p-1 rounded-md bg-rose-100 text-rose-700 text-xs font-bold">Баг №4</span>
                    <div>
                      <h4 className="font-semibold text-slate-900">Сломанная мобильная верстка бокового меню</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        <strong>Было:</strong> На экранах менее 520px сайдбар фиксировался снизу (height: 66px), и 7 кнопок сжимались до ~40px без отступов и с наложением на контент, блокируя нижнюю часть экрана.
                      </p>
                      <p className="text-xs text-emerald-700 mt-1 font-medium">
                        <strong>Исправлено:</strong> Разработана адаптивная навигация с учетом безопасных областей и компактным скроллом, не перекрывающим рабочую область.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
                  <div className="flex items-start gap-2.5">
                    <span className="p-1 rounded-md bg-rose-100 text-rose-700 text-xs font-bold">Баг №5</span>
                    <div>
                      <h4 className="font-semibold text-slate-900">Примитивный трекер ДЗ без статусов срочности и приоритетов</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        <strong>Было:</strong> Ввод предмета производился только вручную (риск опечаток), не было фильтрации по выполненным/просроченным задачам, отсутствовали приоритеты.
                      </p>
                      <p className="text-xs text-emerald-700 mt-1 font-medium">
                        <strong>Исправлено:</strong> Внедрены выпадающий список предметов, выбор приоритета (высокий/средний/низкий), автоматический расчет статуса («Сегодня», «Завтра», «Просрочено»), фильтры «Все/Активные/Выполненные».
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WHAT TO DO */}
          {activeTab === 'what_to_do' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-xs leading-relaxed">
                <strong>Что обязательно НАДО для отличной оценки на защите диплома:</strong>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    1. Выделение ролей пользователей
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Комиссия всегда спрашивает: <em>«А кто пользуется системой?»</em>. В приложении реализована возможность переключать роль: <strong>Ученик</strong>, <strong>Староста</strong> или <strong>Преподаватель</strong>, что объясняет права на выставление оценок и публикацию объявлений.
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    2. Экспорт / печать документов
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Наличие кнопки <strong>«Официальный табель успеваемости»</strong> с готовой печатной формой и местами для подписи директора производит колоссальный положительный эффект на комиссию.
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    3. Реальная аналитика и расчеты
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Интерактивный <strong>калькулятор оценок</strong> («Сколько пятерок нужно получить до 4.5/5.0») показывает, что студент написал реальные алгоритмы, а не просто статичный макет.
                  </p>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    4. Валидация входных данных
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Защита от пустых полей, проверка форматов дат, ограничение диапазона оценок (2–5) и предотвращение XSS-инъекций через экранирование.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900 text-xs">
                <strong>💡 Подсказка для пояснительной записки:</strong> Разделите 2-ю главу диплома на 3 подпункта: <em>«2.1. Разработка архитектуры и структуры базы данных»</em>, <em>«2.2. Реализация клиентских интерфейсов и алгоритмов расчета»</em>, <em>«2.3. Тестирование и верификация функционала»</em>.
              </div>
            </div>
          )}

          {/* TAB 3: WHAT NOT TO DO */}
          {activeTab === 'what_not_to_do' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-950 text-xs leading-relaxed">
                <strong>Что категорически НЕ НАДО делать в дипломной работе:</strong>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-white border border-rose-100 rounded-xl flex items-start gap-2.5">
                  <Ban className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-slate-900 text-xs">Не добавлять нерабочие «кнопки-пустышки»</h5>
                    <p className="text-xs text-slate-600">Комиссия на защите часто просит: <em>«А нажмите вот на ту кнопку»</em>. Если кнопка никуда не ведет или выводит alert(&apos;В разработке&apos;), это сразу снижает оценку. В обновленной версии SchoolHub каждый элемент интерактивен и работает.</p>
                  </div>
                </div>

                <div className="p-3 bg-white border border-rose-100 rounded-xl flex items-start gap-2.5">
                  <Ban className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-slate-900 text-xs">Не прикручивать искусственный интеллект «для галочки»</h5>
                    <p className="text-xs text-slate-600">Если в теме диплома нет слов «на базе искусственного интеллекта», не ставьте на видное место шаблонные чат-боты без обучения. Комиссия задаст сложные вопросы по весам, датасетам и токенам, на которые трудно ответить.</p>
                  </div>
                </div>

                <div className="p-3 bg-white border border-rose-100 rounded-xl flex items-start gap-2.5">
                  <Ban className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-slate-900 text-xs">Не использовать детские эмодзи вместо нормальных векторных иконок</h5>
                    <p className="text-xs text-slate-600">Эмодзи типа 🏠, 📝, 📊 на разных ОС (Windows, macOS, Linux, Android) отображаются по-разному и удешевляют вид диплома. Мы заменили их на профессиональный набор Lucide Icons.</p>
                  </div>
                </div>

                <div className="p-3 bg-white border border-rose-100 rounded-xl flex items-start gap-2.5">
                  <Ban className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-slate-900 text-xs">Не хардкодить статистику в разметку</h5>
                    <p className="text-xs text-slate-600">Статические цифры вроде «92%» в коде без функции расчета считаются грубой ошибкой проектирования.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SPEECH */}
          {activeTab === 'speech' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Готовый сценарий выступления на защите диплома (3-4 минуты):</span>
                <button
                  onClick={copySpeech}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold rounded-lg transition-colors"
                >
                  {copiedSpeech ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSpeech ? 'Скопировано!' : 'Скопировать речь'}
                </button>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-line max-h-96 overflow-y-auto">
                {speechText}
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
                <span>Хотите показать комиссии распечатку табеля оценок прямо сейчас?</span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenReportCard();
                  }}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Открыть табель
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: TECH */}
          {activeTab === 'tech' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl text-sky-950 text-xs">
                <strong>Техническое обоснование выбора стека (для 2-й главы пояснительной записки):</strong>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900">React 19 & TypeScript</div>
                  <p className="text-slate-600">Обеспечивают строгую типизацию данных (Lesson, HomeworkTask, Grade), исключают ошибки времени выполнения (undefined) и гарантируют высокую отзывчивость SPA интерфейса.</p>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900">Tailwind CSS</div>
                  <p className="text-slate-600">Утилитарный фреймворк для быстрой стилизации без раздувания CSS-бандла, с адаптивной сеткой под мобильные телефоны, планшеты и десктопы.</p>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900">Data Access Layer (LocalStorage)</div>
                  <p className="text-slate-600">Клиентская персистентность данных позволяет системе автономно работать без задержек сетевых запросов, с возможностью синхронизации через REST API в будущем.</p>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900">Lucide Icons & Motion</div>
                  <p className="text-slate-600">Стандартизированные SVG-пиктограммы и плавные микро-анимации состояний, соответствующие современным UX-требованиям.</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div>SchoolHub · Выпускная квалификационная работа</div>
          <div className="flex items-center gap-2">
            {onOpenDownloadModal && (
              <button
                onClick={() => {
                  onClose();
                  onOpenDownloadModal();
                }}
                className="px-3.5 py-2 bg-[#0abab5] hover:bg-[#3eccca] text-[#0b172a] rounded-xl font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#0b172a]" />
                <span>Скачать файлы проекта</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors cursor-pointer"
            >
              Перейти в приложение
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
