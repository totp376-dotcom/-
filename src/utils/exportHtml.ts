export function downloadStandaloneHtml() {
  const htmlContent = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>SchoolHub — Электронный школьный портал</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}
:root{
  --tiffany:#0abab5;--tiffany-hover:#3eccca;--tiffany-dark:#077b78;--tiffany-bg:#f0fbfb;
  --navy:#0b172a;--navy-card:#13243d;--navy-border:#1e3557;
  --bg:#f4f8f8;--card:#ffffff;--text:#0b172a;--muted:#64748b;--border:#e2e8f0;
  --shadow:0 10px 25px rgba(11,23,42,0.06);
}
body{margin:0;font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden}
button,input,textarea,select{font:inherit}button{cursor:pointer}
.app{min-height:100vh;display:flex;flex-direction:column}
.topbar{height:64px;background:var(--navy);border-bottom:1px solid var(--navy-border);display:flex;align-items:center;justify-content:space-between;padding:0 24px;position:sticky;top:0;z-index:40}
.logo{display:flex;align-items:center;gap:10px;font-size:20px;font-weight:800;color:#fff}
.logo-mark{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--tiffany),#3eccca);color:var(--navy);display:grid;place-items:center;font-weight:900}
.student-mini{color:var(--tiffany);font-size:13px;font-weight:600}
.layout{display:flex;flex:1}
.sidebar{width:240px;background:var(--navy);border-right:1px solid var(--navy-border);padding:20px 14px;flex-shrink:0;color:#fff;display:flex;flex-direction:column;justify-content:space-between}
.nav-btn{width:100%;display:flex;align-items:center;gap:12px;padding:12px 14px;margin-bottom:6px;background:transparent;color:#94a3b8;border:0;border-radius:12px;text-align:left;transition:.2s;font-size:14px;font-weight:600}
.nav-btn:hover{background:rgba(255,255,255,0.06);color:#fff}
.nav-btn.active{background:rgba(10,186,181,0.15);color:var(--tiffany);border-left:4px solid var(--tiffany)}
.main{flex:1;padding:28px;max-width:1240px}
.page{display:none}.page.active{display:block}
.page-title{margin:0 0 4px;font-size:26px;font-weight:800;color:var(--navy)}
.page-subtitle{margin:0 0 22px;color:var(--muted);font-size:13px}
.grid{display:grid;gap:18px}.grid2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid4{grid-template-columns:repeat(4,minmax(0,1fr))}
.card{background:#fff;border:1px solid var(--border);border-radius:18px;padding:20px;box-shadow:var(--shadow)}
.hero{background:linear-gradient(135deg,#0b172a,#13243d 60%,#077b78);color:#fff;border-radius:24px;padding:28px;margin-bottom:20px;position:relative;border:1px solid rgba(10,186,181,0.25)}
.hero h2{margin:0 0 8px;font-size:26px;font-weight:800}.hero p{margin:0 0 16px;opacity:.9;font-size:14px}
.stat{display:flex;justify-content:space-between;align-items:center}
.stat-number{font-size:28px;font-weight:800;font-family:'JetBrains Mono',monospace;color:var(--navy)}
.stat-label{color:var(--muted);margin-top:4px;font-size:12px;font-weight:600}
.icon-box{width:44px;height:44px;border-radius:12px;background:var(--tiffany-bg);color:var(--tiffany-dark);display:grid;place-items:center;font-size:20px}
.list{display:grid;gap:10px}
.row{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border)}.row:last-child{border-bottom:0}
.subject{font-weight:700;font-size:14px}.muted{color:var(--muted);font-size:12px}
.badge{display:inline-flex;align-items:center;padding:4px 9px;border-radius:8px;font-size:11px;font-weight:700}
.badge.tiffany{color:var(--tiffany-dark);background:var(--tiffany-bg)}
.badge.yellow{color:#8a6200;background:#fff4d8}.badge.red{color:#a72e3b;background:#ffe7ea}
.badge.grade5{background:rgba(10,186,181,0.18);color:var(--tiffany-dark);font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:800;width:38px;height:38px;border-radius:10px;display:grid;place-items:center}
.badge.grade4{background:rgba(11,23,42,0.1);color:var(--navy);font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:800;width:38px;height:38px;border-radius:10px;display:grid;place-items:center}
.badge.grade3{background:#fef3c7;color:#b45309;font-family:'JetBrains Mono',monospace;font-size:16px;font-weight:800;width:38px;height:38px;border-radius:10px;display:grid;place-items:center}
.btn{background:var(--tiffany);color:var(--navy);border:0;padding:10px 18px;border-radius:11px;font-weight:700;font-size:13px;transition:.2s}.btn:hover{background:var(--tiffany-hover)}
.btn.dark{background:var(--navy);color:#fff}.btn.secondary{background:var(--tiffany-bg);color:var(--tiffany-dark)}
.btn.danger{background:#ffe7ea;color:#a72e3b}
.input,textarea,select{width:100%;border:1px solid var(--border);border-radius:11px;padding:10px 12px;outline:none;background:#fff;font-size:13px}
.input:focus,textarea:focus,select:focus{border-color:var(--tiffany)}
textarea{min-height:90px;resize:vertical}.form-grid{display:grid;gap:12px}
.profile-head{display:flex;gap:18px;align-items:center}
.avatar{width:72px;height:72px;border-radius:20px;background:linear-gradient(135deg,var(--tiffany),var(--tiffany-dark));color:var(--navy);display:grid;place-items:center;font-size:28px;font-weight:900}
.progress{height:9px;background:#edf0f5;border-radius:99px;overflow:hidden}.progress>div{height:100%;background:var(--tiffany);border-radius:99px}
.day-tabs{display:flex;gap:8px;overflow-x:auto;padding-bottom:6px;margin-bottom:16px}
.day-tab{border:1px solid var(--border);background:#fff;color:#68738a;padding:9px 14px;border-radius:11px;white-space:nowrap;font-size:13px;font-weight:600}
.day-tab.active{background:var(--tiffany);color:var(--navy);border-color:var(--tiffany);font-weight:800}
.lesson{display:grid;grid-template-columns:56px 1fr auto;gap:14px;align-items:center;padding:14px 0;border-bottom:1px solid var(--border)}
.lesson:last-child{border-bottom:0}
.lesson-num{width:38px;height:38px;border-radius:10px;background:var(--tiffany-bg);color:var(--tiffany-dark);display:grid;place-items:center;font-weight:800;font-family:'JetBrains Mono'}
.toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%) translateY(20px);background:var(--navy);color:#fff;padding:12px 20px;border-radius:14px;border:1px solid var(--tiffany);opacity:0;pointer-events:none;transition:.25s;z-index:90;font-size:13px;font-weight:600;box-shadow:var(--shadow)}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0)}

/* Draggable Schooly */
#schooly-container{position:fixed;right:25px;bottom:25px;z-index:80;cursor:grab;user-select:none;touch-action:none}
#schooly-container.dragging{cursor:grabbing}
.schooly-bubble{background:#fff;border:2px solid var(--tiffany);border-radius:16px;padding:10px 14px;font-size:12px;font-weight:600;color:var(--navy);box-shadow:0 8px 24px rgba(0,0,0,0.12);max-width:240px;margin-bottom:8px;position:relative}
.schooly-bubble:after{content:"";position:absolute;bottom:-6px;left:50%;transform:translateX(-50%) rotate(45deg);width:10px;height:10px;background:#fff;border-right:2px solid var(--tiffany);border-bottom:2px solid var(--tiffany)}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes flutter{0%,100%{transform:rotate(0)}50%{transform:rotate(18deg)}}
.animate-bob{animation:bob 3s ease-in-out infinite}
.animate-wing{transform-origin:70% 60%;animation:flutter 1.4s ease-in-out infinite}

@media(max-width:768px){.sidebar{display:none}.main{padding:16px}.grid2,.grid4{grid-template-columns:1fr}}
</style>
</head>
<body>
<div class="app">
<header class="topbar">
 <div class="logo"><div class="logo-mark">S</div>School<span style="color:var(--tiffany)">Hub</span></div>
 <div class="student-mini" id="miniStudent">9 класс · Ученик</div>
</header>

<div class="layout">
<aside class="sidebar">
 <div>
  <button class="nav-btn active" data-page="home">🏠 <span>Главная</span></button>
  <button class="nav-btn" data-page="schedule">📅 <span>Расписание</span></button>
  <button class="nav-btn" data-page="homework">📝 <span>Задания</span></button>
  <button class="nav-btn" data-page="grades">⭐ <span>Оценки</span></button>
  <button class="nav-btn" data-page="stats">📈 <span>Аналитика</span></button>
  <button class="nav-btn" data-page="news">📢 <span>Новости</span></button>
  <button class="nav-btn" data-page="profile">👤 <span>Профиль</span></button>
 </div>
 <div style="font-size:11px;color:#64748b;text-align:center">Tiffany & Navy Edition · 2026</div>
</aside>

<main class="main">

<section class="page active" id="home">
 <div class="hero">
  <h2 id="welcome">Добро пожаловать в SchoolHub 👋</h2>
  <p>Школьный портал с расписанием, трекером заданий, оценками и анимированным совёнком Скули!</p>
  <div style="display:flex;gap:10px">
   <button class="btn" onclick="goTo('schedule')">📅 Расписание</button>
   <button class="btn dark" onclick="goTo('homework')">📝 Задания</button>
  </div>
 </div>
 <div class="grid grid4">
  <div class="card stat"><div><div class="stat-number" id="avgGrade">4.75</div><div class="stat-label">Средний балл</div></div><div class="icon-box">⭐</div></div>
  <div class="card stat"><div><div class="stat-number" id="todoCount">3</div><div class="stat-label">Заданий осталось</div></div><div class="icon-box">📚</div></div>
  <div class="card stat"><div><div class="stat-number">95%</div><div class="stat-label">Посещаемость</div></div><div class="icon-box">✅</div></div>
  <div class="card stat"><div><div class="stat-number" id="todayCount">5</div><div class="stat-label">Уроков сегодня</div></div><div class="icon-box">📅</div></div>
 </div>
 <div class="grid grid2" style="margin-top:18px">
  <div class="card"><h3 style="margin-top:0">Расписание на сегодня</h3><div id="todayLessons" class="list"></div></div>
  <div class="card"><h3 style="margin-top:0">Ближайшие задания</h3><div id="homeTasks" class="list"></div></div>
 </div>
</section>

<section class="page" id="schedule">
 <h1 class="page-title">Расписание уроков</h1><p class="page-subtitle">Выбери учебный день.</p>
 <div class="day-tabs" id="dayTabs"></div>
 <div class="card"><div id="scheduleList"></div></div>
</section>

<section class="page" id="homework">
 <h1 class="page-title">Домашние задания</h1><p class="page-subtitle">Добавляй задачи и отмечай готовые.</p>
 <div class="card">
  <div class="form-grid">
   <input class="input" id="taskSubject" placeholder="Предмет, например: Информатика">
   <input class="input" id="taskText" placeholder="Что нужно сделать?">
   <input class="input" id="taskDate" type="date">
   <button class="btn" id="addTask">Добавить задание</button>
  </div>
 </div>
 <div class="card" style="margin-top:18px"><div id="taskList" class="list"></div></div>
</section>

<section class="page" id="grades">
 <h1 class="page-title">Журнал оценок</h1><p class="page-subtitle">Текущие отметки и расчет среднего балла.</p>
 <div class="card">
  <div class="form-grid" style="grid-template-columns:1fr 1fr 1fr auto">
   <input class="input" id="newGradeSubj" placeholder="Предмет">
   <select class="input" id="newGradeVal"><option value="5">Оценка 5 (Отлично)</option><option value="4">Оценка 4 (Хорошо)</option><option value="3">Оценка 3</option><option value="2">Оценка 2</option></select>
   <input class="input" id="newGradeTopic" placeholder="Тема работы">
   <button class="btn" id="addGradeBtn">Поставить оценку</button>
  </div>
 </div>
 <div class="card" style="margin-top:18px"><div id="gradeList" class="list"></div></div>
</section>

<section class="page" id="stats">
 <h1 class="page-title">Аналитика успеваемости</h1><p class="page-subtitle">Динамика и статистика.</p>
 <div class="grid grid2">
  <div class="card"><h3>Успеваемость</h3><div style="font-size:36px;font-weight:800;margin:6px 0 12px;color:var(--navy);font-family:'JetBrains Mono'" id="statsAverage">4.75 / 5.0</div><div class="progress"><div style="width:95%"></div></div></div>
  <div class="card"><h3>Посещаемость</h3><div style="font-size:36px;font-weight:800;margin:6px 0 12px;color:var(--navy);font-family:'JetBrains Mono'">95%</div><div class="progress"><div style="width:95%"></div></div></div>
 </div>
</section>

<section class="page" id="news">
 <h1 class="page-title">Новости и объявления</h1><p class="page-subtitle">Жизнь школы и важные события.</p>
 <div class="list">
  <div class="card"><b>📢 Защита дипломных проектов</b><p class="muted">На этой неделе состоятся защиты выпускных квалификационных работ.</p></div>
  <div class="card"><b>🏆 Всероссийская олимпиада по информатике</b><p class="muted">Поздравляем призёров школьного этапа!</p></div>
 </div>
</section>

<section class="page" id="profile">
 <h1 class="page-title">Профиль учащегося</h1><p class="page-subtitle">Персональные данные.</p>
 <div class="card">
  <div class="profile-head"><div class="avatar" id="avatar">А</div><div><h2 id="profileName" style="margin:0 0 5px">Алексей Смирнов</h2><div class="muted" id="profileClass">9 «А» класс · Ученик</div></div></div>
  <hr style="border:0;border-top:1px solid var(--border);margin:20px 0">
  <div class="form-grid">
   <label>Имя<input class="input" id="nameInput" value="Алексей Смирнов"></label>
   <label>Класс<input class="input" id="classInput" value="9 «А» класс"></label>
   <button class="btn" id="saveProfile">Сохранить профиль</button>
  </div>
 </div>
</section>

</main></div></div>

<!-- Interactive Draggable Mascot Schooly -->
<div id="schooly-container" class="animate-bob">
 <div class="schooly-bubble" id="schooly-bubble">Привет! Я Скули! Зажми меня ЛКМ и лети! 🪽✨</div>
 <svg width="110" height="110" viewBox="0 0 200 200">
  <ellipse cx="100" cy="188" rx="46" ry="8" fill="#0b172a" opacity="0.15"/>
  <path class="animate-wing" d="M 52 95 C 22 105 18 135 38 152 C 48 160 62 150 68 138 Z" fill="#089b97" stroke="#0b172a" stroke-width="4"/>
  <path class="animate-wing" d="M 148 95 C 178 85 186 115 168 142 C 158 152 142 146 134 134 Z" fill="#089b97" stroke="#0b172a" stroke-width="4"/>
  <ellipse cx="78" cy="180" rx="14" ry="7" fill="#f59e0b" stroke="#0b172a" stroke-width="3"/>
  <ellipse cx="122" cy="180" rx="14" ry="7" fill="#f59e0b" stroke="#0b172a" stroke-width="3"/>
  <ellipse cx="100" cy="115" rx="66" ry="68" fill="#0abab5" stroke="#0b172a" stroke-width="5"/>
  <ellipse cx="100" cy="130" rx="44" ry="45" fill="#f0fbfb" stroke="#077b78" stroke-width="3"/>
  <circle cx="74" cy="98" r="23" fill="#ffffff" stroke="#0b172a" stroke-width="4"/>
  <circle cx="126" cy="98" r="23" fill="#ffffff" stroke="#0b172a" stroke-width="4"/>
  <circle cx="76" cy="98" r="12" fill="#0b172a"/>
  <circle cx="72" cy="94" r="4.5" fill="#ffffff"/>
  <circle cx="124" cy="98" r="12" fill="#0b172a"/>
  <circle cx="120" cy="94" r="4.5" fill="#ffffff"/>
  <circle cx="74" cy="98" r="24" fill="none" stroke="#f59e0b" stroke-width="3.5"/>
  <circle cx="126" cy="98" r="24" fill="none" stroke="#f59e0b" stroke-width="3.5"/>
  <polygon points="93,109 107,109 100,123" fill="#f59e0b" stroke="#0b172a" stroke-width="3"/>
  <circle cx="56" cy="118" r="7" fill="#fb7185" opacity="0.6"/>
  <circle cx="144" cy="118" r="7" fill="#fb7185" opacity="0.6"/>
  <polygon points="100,28 152,48 100,68 48,48" fill="#0b172a" stroke="#3eccca" stroke-width="2.5"/>
  <circle cx="100" cy="48" r="4.5" fill="#f59e0b"/>
  <path d="M 100 48 Q 130 52 135 70 L 137 84" fill="none" stroke="#f59e0b" stroke-width="3"/>
 </svg>
</div>

<div class="toast" id="toast"></div>

<script>
const schedule={
 "Понедельник":[["08:30","Алгебра","301"],["09:25","Информатика","IT-лаб"],["10:30","Физика","312"],["11:35","Русский язык","204"],["12:40","История","205"]],
 "Вторник":[["08:30","Геометрия","301"],["09:25","Биология","310"],["10:30","Информатика","IT-лаб"],["11:35","Английский","402"],["12:40","Химия","308"]],
 "Среда":[["08:30","Физика","312"],["09:25","География","206"],["10:30","Алгебра","301"],["11:35","Литература","204"],["12:40","Физкультура","Спортзал"]],
 "Четверг":[["08:30","Геометрия","301"],["09:25","Химия","308"],["10:30","Русский язык","204"],["11:35","Биология","310"],["12:40","Информатика","IT-лаб"]],
 "Пятница":[["08:30","Информатика","IT-лаб"],["09:25","Физика","312"],["10:30","История","205"],["11:35","Физкультура","Спортзал"],["12:40","Алгебра","301"]]
};
let grades=[
 {subject:"Информатика",val:5,topic:"Базы данных",date:"Сегодня"},
 {subject:"Алгебра",val:5,topic:"Квадратные уравнения",date:"Вчера"},
 {subject:"Физика",val:4,topic:"Лабораторная работа",date:"2 дня назад"},
 {subject:"Английский",val:5,topic:"Эссе",date:"3 дня назад"},
 {subject:"Русский язык",val:5,topic:"Диктант",date:"4 дня назад"}
];
let tasks=JSON.parse(localStorage.getItem("sh_tasks")||"null")||[
 {id:1,subject:"Информатика",text:"Доделать дипломный проект",date:"2026-09-29",done:false},
 {id:2,subject:"Алгебра",text:"Решить №342, №345",date:"2026-09-30",done:false},
 {id:3,subject:"Физика",text:"Оформить протокол",date:"2026-10-01",done:false}
];
let selectedDay="Понедельник";

function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function goTo(page){document.querySelector(\`[data-page="\${page}"]\`).click()}

document.querySelectorAll(".nav-btn").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
 document.getElementById(btn.dataset.page).classList.add("active");
 document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
 const bubble=document.getElementById("schooly-bubble");
 bubble.textContent=\`Летим в «\${btn.querySelector("span").textContent}»! 🚀🪽\`;
}));

function renderSchedule(){
 const tabs=document.getElementById("dayTabs");
 tabs.innerHTML=Object.keys(schedule).map(day=>\`<button class="day-tab \${day===selectedDay?"active":""}" onclick="selectDay('\${day}')">\${day}</button>\`).join("");
 document.getElementById("scheduleList").innerHTML=schedule[selectedDay].map((x,i)=>\`
 <div class="lesson">
  <div class="lesson-num">\${i+1}</div>
  <div><div class="subject">\${x[1]}</div><div class="muted">\${x[0]}</div></div>
  <div class="muted">🚪 каб. \${x[2]}</div>
 </div>\`).join("");
}
function selectDay(d){selectedDay=d;renderSchedule()}

function renderTasks(){
 const el=document.getElementById("taskList");
 el.innerHTML=tasks.length?tasks.map(t=>\`
 <div class="row">
  <div style="display:flex;gap:10px;align-items:center">
   <input type="checkbox" \${t.done?"checked":""} onchange="toggleTask(\${t.id},this.checked)">
   <div><div class="subject \${t.done?"done":""}">\${t.subject}</div><div class="muted">\${t.text} · \${t.date}</div></div>
  </div>
  <button class="btn danger" onclick="deleteTask(\${t.id})">Удалить</button>
 </div>\`).join(""):'<div class="muted">Заданий нет! 🎉</div>';
 document.getElementById("todoCount").textContent=tasks.filter(t=>!t.done).length;
 document.getElementById("homeTasks").innerHTML=tasks.filter(t=>!t.done).slice(0,3).map(t=>\`<div class="row"><div class="subject">\${t.subject}</div><span class="badge tiffany">\${t.date}</span></div>\`).join("");
}
function toggleTask(id,done){const t=tasks.find(x=>x.id===id);if(t)t.done=done;saveTasks();renderTasks();toast(done?"Скули ликует! Пятерка! ⭐":"Задание возвращено")}
function deleteTask(id){tasks=tasks.filter(x=>x.id!==id);saveTasks();renderTasks();toast("Задание удалено")}
function saveTasks(){localStorage.setItem("sh_tasks",JSON.stringify(tasks))}

document.getElementById("addTask").onclick=()=>{
 const s=document.getElementById("taskSubject").value.trim(),txt=document.getElementById("taskText").value.trim(),d=document.getElementById("taskDate").value;
 if(!s||!txt)return;
 tasks.push({id:Date.now(),subject:s,text:txt,date:d||"Без даты",done:false});saveTasks();renderTasks();
 document.getElementById("taskSubject").value="";document.getElementById("taskText").value="";
 toast("Задание добавлено ✅");
};

function renderGrades(){
 document.getElementById("gradeList").innerHTML=grades.map((g,i)=>\`
 <div class="row">
  <div><div class="subject">\${g.subject}</div><div class="muted">\${g.topic} · \${g.date}</div></div>
  <div class="badge grade\${g.val}">\${g.val}</div>
 </div>\`).join("");
 const avg=grades.reduce((s,g)=>s+g.val,0)/grades.length;
 document.getElementById("avgGrade").textContent=avg.toFixed(2);
 document.getElementById("statsAverage").textContent=avg.toFixed(2)+" / 5.0";
}
document.getElementById("addGradeBtn").onclick=()=>{
 const s=document.getElementById("newGradeSubj").value.trim(),v=Number(document.getElementById("newGradeVal").value),top=document.getElementById("newGradeTopic").value.trim();
 if(!s)return;
 grades.unshift({subject:s,val:v,topic:top||"Текущий контроль",date:"Сегодня"});renderGrades();
 toast(\`Оценка \${v} по «\${s}» выставлена! 🏆\`);
 document.getElementById("newGradeSubj").value="";document.getElementById("newGradeTopic").value="";
};

// Drag and drop for Schooly
const sc=document.getElementById("schooly-container");
let isDragging=false,offX=0,offY=0;
sc.addEventListener("pointerdown",e=>{
 isDragging=true;offX=e.clientX-sc.offsetLeft;offY=e.clientY-sc.offsetTop;
 sc.classList.add("dragging");sc.setPointerCapture(e.pointerId);
 document.getElementById("schooly-bubble").textContent="Уиии! Летим! Держи крепче! 🪽💨";
});
sc.addEventListener("pointermove",e=>{
 if(!isDragging)return;
 sc.style.left=Math.max(10,Math.min(window.innerWidth-120,e.clientX-offX))+"px";
 sc.style.top=Math.max(10,Math.min(window.innerHeight-140,e.clientY-offY))+"px";
 sc.style.right="auto";sc.style.bottom="auto";
});
sc.addEventListener("pointerup",e=>{
 isDragging=false;sc.classList.remove("dragging");
 document.getElementById("schooly-bubble").textContent="Мягкая посадка! 🎯✨";
});

renderSchedule();renderTasks();renderGrades();
document.getElementById("todayLessons").innerHTML=schedule["Понедельник"].slice(0,3).map(x=>\`<div class="row"><div class="subject">\${x[1]}</div><div class="muted">\${x[0]} (каб. \${x[2]})</div></div>\`).join("");
</script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'schoolhub_standalone.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
