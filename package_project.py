import os
import glob
import zipfile
import re

print("Starting packaging process...")

# 1. Generate standalone single-file HTML from dist
dist_html_path = "dist/index.html"
css_files = glob.glob("dist/assets/*.css")
js_files = glob.glob("dist/assets/*.js")

if os.path.exists(dist_html_path) and css_files and js_files:
    with open(dist_html_path, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    with open(css_files[0], "r", encoding="utf-8") as f:
        css_content = f.read()

    with open(js_files[0], "r", encoding="utf-8") as f:
        js_content = f.read()

    # Replace stylesheet link with inline <style>
    link_match = re.search(r'<link rel="stylesheet"[^>]*href="[^"]*\.css"[^>]*>', html_content)
    if link_match:
        html_content = html_content[:link_match.start()] + f'<style>\n{css_content}\n</style>' + html_content[link_match.end():]
    
    # Replace module script tag with inline <script type="module">
    script_match = re.search(r'<script type="module"[^>]*src="[^"]*\.js"[^>]*></script>', html_content)
    if script_match:
        html_content = html_content[:script_match.start()] + f'<script type="module">\n{js_content}\n</script>' + html_content[script_match.end():]

    os.makedirs("public", exist_ok=True)
    standalone_path = "public/SchoolHub_standalone.html"
    with open(standalone_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Created standalone file: {standalone_path} ({os.path.getsize(standalone_path)} bytes)")
else:
    print("Warning: dist build files not found, run npm run build first")

# 2. Create README.md for the diploma defense
readme_content = """# SchoolHub — Электронный школьный портал с интерактивным маскотом Скули

## 🎓 О проекте (Дипломная работа)
**SchoolHub** — это современное многофункциональное веб-приложение для школ, лицеев и гимназий.
Разработано специально для дипломного проекта в стильной фирменной палитре **Tiffany Blue (#0ABAB5) и Dark Navy (#0B172A)**.

### Ключевые возможности:
1. **Интерактивный маскот «Скули» (Schooly)**:
   - Вдохновлен концепцией Duolingo, но с уникальным авторским дизайном и характером совы-помощника.
   - Свободное перетаскивание мышью (Drag & Drop) в любую точку экрана с живой физикой полета, болтанием лапками и размахиванием крыльями.
   - Анимированный перелет при переключении страниц и слайдов.
   - Множество эмоций и анимаций: сальто (backflip), танец под музыку, сердечки, реакция на клики, моргание, подсказки.
2. **Расписание уроков (Schedule)**:
   - Полное расписание на 6 дней недели с поддержкой четных/нечетных недель (числитель/знаменатель).
   - Индикация текущего урока по времени с расчетом оставшихся минут.
   - Добавление, редактирование и удаление уроков.
3. **Электронный дневник и журнал оценок (Grades)**:
   - Расчет среднего балла по каждому предмету и общего среднего балла.
   - Прогнозирование четвертных оценок.
   - Интерактивное добавление оценок с весом и типами работ (контрольная, ответ у доски, домашняя, проект).
4. **Трекер домашних заданий (Homework)**:
   - Управление дедлайнами, статусами готовности, приоритетами (срочные, средние, обычные).
5. **Аналитика и калькулятор успеваемости (Stats)**:
   - Графики распределения оценок, динамика, контроль посещаемости.
   - Интеллектуальный калькулятор: расчет, сколько и каких оценок нужно получить для желаемого среднего балла (например, для 5.0).
6. **Официальный табель успеваемости (Report Card)**:
   - Модуль генерации официального документа с печатью для печати/экспорта в PDF.
7. **Руководство к защите диплома**:
   - Встроенный интерактивный блок с готовым докладом на 5-7 минут, разбором стека технологий и ответами на частые вопросы комиссии.

## 🚀 Быстрый запуск проекта на компьютере

### Вариант 1. Запуск без установки программ (в 1 клик):
Откройте файл `SchoolHub_standalone.html` в любом браузере (Chrome, Яндекс.Браузер, Safari, Edge, Firefox). Он полностью автономен и работает без интернета и локального сервера!

### Вариант 2. Запуск в режиме разработки (Node.js):
1. Установите [Node.js](https://nodejs.org/) (версия 18+).
2. Распакуйте архив в любую папку.
3. Откройте терминал в папке проекта и выполните команды:
   ```bash
   npm install
   npm run dev
   ```
4. Откройте в браузере адрес: `http://localhost:3000`

### Сборка production-версии:
```bash
npm run build
```

## 🛠 Стек технологий:
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (Framer Motion v12), Lucide React.
- **Сборщик**: Vite.
- **Хранение данных**: LocalStorage (полная автономность клиента, сохранение изменений при перезагрузке).
"""

with open("README.md", "w", encoding="utf-8") as f:
    f.write(readme_content)

# 3. Create full ZIP archive of source code
zip_filename = "public/schoolhub-project.zip"
exclude_dirs = {"node_modules", ".git", "dist", ".cache"}
exclude_files = {".DS_Store"}

with zipfile.ZipFile(zip_filename, "w", zipfile.ZIP_DEFLATED) as zipf:
    # Add root files
    root_files = ["package.json", "tsconfig.json", "vite.config.ts", "index.html", "metadata.json", ".env.example", "README.md"]
    for rf in root_files:
        if os.path.exists(rf):
            zipf.write(rf, rf)
    
    # Add src tree
    for root, dirs, files in os.walk("src"):
        for file in files:
            filepath = os.path.join(root, file)
            zipf.write(filepath, filepath)

    # Also add the standalone html if created
    if os.path.exists("public/SchoolHub_standalone.html"):
        zipf.write("public/SchoolHub_standalone.html", "SchoolHub_standalone.html")

print(f"Created ZIP archive: {zip_filename} ({os.path.getsize(zip_filename)} bytes)")
print("Packaging complete successfully!")
