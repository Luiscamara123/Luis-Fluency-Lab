const TARGET_LISTENING_HOURS = 1000;
let currentModule = 'hub';
let currentTab = 'dashboard';

// Dados Iniciais
let listeningList = JSON.parse(localStorage.getItem('luis_listening_media_list')) || [
    { id: '1', type: 'filme', name: 'Toy Story 1', season: '', cover: '', studyType: 'OURO', hours: 1, minutes: 21 },
    { id: '2', type: 'filme', name: 'Toy Story 2', season: '', cover: '', studyType: 'PRATA', hours: 1, minutes: 32 }
];

let readingList = JSON.parse(localStorage.getItem('luis_reading_book_list')) || [
    { id: '101', title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', pages: 96, cover: '' }
];

let vocabularyList = JSON.parse(localStorage.getItem('luis_vocabulary_list')) || [
    { id: '201', word: 'Breathtaking', translation: 'Deslumbrante, de tirar o fôlego', example: 'The view was breathtaking.', correctCount: 0, wrongCount: 0 },
    { id: '202', word: 'Enhance', translation: 'Aprimorar, melhorar', example: 'Reading will enhance your vocabulary.', correctCount: 0, wrongCount: 0 }
];

let currentVocabularyIndex = 0;
let isCardFlipped = false;

function saveListeningData() { localStorage.setItem('luis_listening_media_list', JSON.stringify(listeningList)); }
function saveReadingData() { localStorage.setItem('luis_reading_book_list', JSON.stringify(readingList)); }
function saveVocabularyData() { localStorage.setItem('luis_vocabulary_list', JSON.stringify(vocabularyList)); }

function openModule(moduleName) {
    currentModule = moduleName;
    document.getElementById('module-hub').classList.add('hidden');
    document.getElementById('module-listening').classList.add('hidden');
    document.getElementById('module-reading').classList.add('hidden');
    document.getElementById('module-vocabulary').classList.add('hidden');

    const nav = document.getElementById('main-nav');
    if (moduleName === 'hub') {
        document.getElementById('module-hub').classList.remove('hidden');
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
        document.getElementById(`module-${moduleName}`).classList.remove('hidden');
        switchTab('dashboard');
    }
}

function switchTab(tabId) {
    currentTab = tabId;
    const btnDash = document.getElementById('btn-dashboard');
    const btnCad = document.getElementById('btn-cadastro');

    ['listening', 'reading', 'vocabulary'].forEach(mod => {
        const dashEl = document.getElementById(`${mod}-tab-dashboard`);
        const cadEl = document.getElementById(`${mod}-tab-cadastro`);
        if (dashEl) dashEl.classList.toggle('hidden', currentModule !== mod || tabId !== 'dashboard');
        if (cadEl) cadEl.classList.toggle('hidden', currentModule !== mod || tabId !== 'cadastro');
    });

    if (currentModule === 'listening' && tabId === 'dashboard') renderListeningDashboard();
    if (currentModule === 'reading' && tabId === 'dashboard') renderReadingDashboard();
    if (currentModule === 'vocabulary' && tabId === 'dashboard') renderVocabularyDashboard();

    if (tabId === 'dashboard') {
        btnDash.className = "px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow";
        btnCad.className = "px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all text-slate-600 dark:text-slate-300";
    } else {
        btnCad.className = "px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow";
        btnDash.className = "px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all text-slate-600 dark:text-slate-300";
    }
}

function toggleMediaType(type) {
    document.getElementById('movie-time-fields').classList.toggle('hidden', type !== 'filme');
    document.getElementById('series-time-fields').classList.toggle('hidden', type !== 'serie');
}

function getDecimalHours(h, m) { return h + (m / 60); }

function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('luis_theme_mode', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
    if (currentModule === 'listening') renderListeningDashboard();
    if (currentModule === 'reading') renderReadingDashboard();
}

function updateThemeIcon(isDark) {
    document.getElementById('theme-icon').className = isDark ? 'fa-solid fa-sun text-amber-400' : 'fa-solid fa-moon text-slate-600';
}

function initTheme() {
    const savedTheme = localStorage.getItem('luis_theme_mode');
    const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    updateThemeIcon(isDark);
}

let listeningDonutChart = null, listeningBarChart = null, readingBarChart = null;

function renderListeningDashboard() {
    let totalMins = 0, hoursByStudy = { 'DIAMANTE': 0, 'PRATA': 0, 'OURO': 0 };
    listeningList.forEach(item => {
        const mins = (Number(item.hours) * 60) + Number(item.minutes);
        totalMins += mins;
        if (hoursByStudy[item.studyType] !== undefined) hoursByStudy[item.studyType] += mins;
    });

    const totalDecimal = totalMins / 60;
    const pct = Math.min((totalDecimal / TARGET_LISTENING_HOURS) * 100, 100);

    document.getElementById('total-hours-display').innerText = totalDecimal.toFixed(2) + 'h';
    document.getElementById('percentage-display').innerText = pct.toFixed(2) + '% completo';
    document.getElementById('banner-progress').innerText = pct.toFixed(2) + '%';
    document.getElementById('stat-total-time').innerText = `${Math.floor(totalMins / 60)}h ${totalMins % 60}m`;
    document.getElementById('stat-total-items').innerText = listeningList.length;
    document.getElementById('summary-total').innerText = totalDecimal.toFixed(2) + 'h';

    const container = document.getElementById('listening-details-list');
    container.innerHTML = listeningList.length === 0 ? '<p class="text-xs text-slate-400 text-center py-4">Nenhum título cadastrado.</p>' : '';
    listeningList.forEach(item => {
        const itemDec = getDecimalHours(Number(item.hours), Number(item.minutes));
        const labelMap = { 'DIAMANTE': '💎 DIAMANTE • Sem legenda', 'OURO': '🥇 OURO • Audio EN + Leg EN', 'PRATA': '🥈 PRATA • Audio EN + Leg PT' };
        const colorMap = { 'DIAMANTE': 'text-cyan-400', 'OURO': 'text-amber-400', 'PRATA': 'text-slate-400' };

        const div = document.createElement('div');
        div.className = "flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30";
        div.innerHTML = `
            <div class="flex items-center gap-3">
                ${item.cover ? `<img src="${item.cover}" class="w-10 h-10 rounded-lg object-cover border border-slate-700">` : `<div class="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 text-xs font-bold"><i class="fa-solid fa-film"></i></div>`}
                <div class="space-y-0.5">
                    <span class="text-xs font-bold text-slate-900 dark:text-white block">${item.name} ${item.season ? '('+item.season+')' : ''}</span>
                    <span class="text-[11px] text-slate-400 block">${item.hours}h ${item.minutes}m • ${itemDec.toFixed(2)}h</span>
                    <span class="text-[10px] font-semibold ${colorMap[item.studyType]} block">${labelMap[item.studyType]}</span>
                </div>
            </div>
            <button onclick="deleteListeningItem('${item.id}', '${item.name}')" class="text-slate-400 hover:text-red-500 p-2"><i class="fa-solid fa-trash-can text-xs"></i></button>
        `;
        container.appendChild(div);
    });

    const isDark = document.documentElement.classList.contains('dark');
    const ctxDonut = document.getElementById('progressDonutChart').getContext('2d');
    if (listeningDonutChart) listeningDonutChart.destroy();
    listeningDonutChart = new Chart(ctxDonut, {
        type: 'doughnut',
        data: { labels: ['Concluído', 'Restante'], datasets: [{ data: [totalDecimal, Math.max(TARGET_LISTENING_HOURS - totalDecimal, 0)], backgroundColor: [isDark ? '#818cf8' : '#312e81', isDark ? '#334155' : '#e2e8f0'], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '82%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }
    });

    const ctxBar = document.getElementById('barTypeChart').getContext('2d');
    if (listeningBarChart) listeningBarChart.destroy();
    listeningBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: { labels: ['💎 DIAMANTE', '🥇 OURO', '🥈 PRATA'], datasets: [{ data: [hoursByStudy['DIAMANTE']/60, hoursByStudy['OURO']/60, hoursByStudy['PRATA']/60], backgroundColor: ['#06b6d4', '#eab308', '#94a3b8'], borderRadius: 6, barThickness: 24 }] },
        options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true, grid: { color: isDark ? '#1e293b' : '#f1f5f9' }, ticks: { color: isDark ? '#94a3b8' : '#64748b', font: { size: 10 } } }, y: { grid: { display: false }, ticks: { color: isDark ? '#cbd5e1' : '#334155', font: { size: 10, weight: 'bold' } } } }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ' ' + c.parsed.x.toFixed(2) + 'h' } } } }
    });
}

function renderReadingDashboard() {
    let totalPages = 0;
    readingList.forEach(b => totalPages += Number(b.pages));
    document.getElementById('reading-stat-books').innerText = readingList.length;
    document.getElementById('reading-stat-pages').innerText = totalPages;
    document.getElementById('summary-reading-pages').innerText = totalPages;

    const container = document.getElementById('reading-details-list');
    container.innerHTML = readingList.length === 0 ? '<p class="text-xs text-slate-400 text-center py-4">Nenhum livro cadastrado.</p>' : '';
    readingList.forEach(book => {
        const div = document.createElement('div');
        div.className = "flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30";
        div.innerHTML = `
            <div class="flex items-center gap-3">
                ${book.cover ? `<img src="${book.cover}" class="w-10 h-12 rounded-md object-cover border border-slate-700">` : `<div class="w-10 h-12 rounded-md bg-slate-700 flex items-center justify-center text-slate-400 text-xs font-bold"><i class="fa-solid fa-book"></i></div>`}
                <div class="space-y-0.5">
                    <span class="text-xs font-bold text-slate-900 dark:text-white block">${book.title}</span>
                    ${book.author ? `<span class="text-[11px] text-slate-400 block">${book.author}</span>` : ''}
                    <span class="text-[10px] font-semibold text-emerald-400 block">${book.pages} páginas</span>
                </div>
            </div>
            <button onclick="deleteReadingItem('${book.id}', '${book.title}')" class="text-slate-400 hover:text-red-500 p-2"><i class="fa-solid fa-trash-can text-xs"></i></button>
        `;
        container.appendChild(div);
    });

    const isDark = document.documentElement.classList.contains('dark');
    const ctxBar = document.getElementById('readingBarChart').getContext('2d');
    if (readingBarChart) readingBarChart.destroy();
    readingBarChart = new Chart(ctxBar, {
        type: 'bar',
        data: { labels: readingList.map(b => b.title.length > 15 ? b.title.substring(0, 15) + '...' : b.title), datasets: [{ data: readingList.map(b => Number(b.pages)), backgroundColor: '#10b981', borderRadius: 6, barThickness: 20 }] },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, grid: { color: isDark ? '#1e293b' : '#f1f5f9' }, ticks: { color: isDark ? '#94a3b8' : '#64748b', font: { size: 10 } } }, x: { grid: { display: false }, ticks: { color: isDark ? '#cbd5e1' : '#334155', font: { size: 10, weight: 'bold' } } } }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ' ' + c.parsed.y + ' páginas' } } } }
    });
}

function renderVocabularyDashboard() {
    document.getElementById('vocab-stat-count').innerText = vocabularyList.length;
    
    let totalCorrect = 0, totalWrong = 0;
    vocabularyList.forEach(v => { totalCorrect += (v.correctCount || 0); totalWrong += (v.wrongCount || 0); });
    const totalAttempts = totalCorrect + totalWrong;
    const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
    document.getElementById('vocab-stat-accuracy').innerText = accuracy + '%';

    const container = document.getElementById('vocabulary-details-list');
    container.innerHTML = vocabularyList.length === 0 ? '<p class="text-xs text-slate-400 text-center py-4">Nenhuma palavra cadastrada.</p>' : '';
    
    vocabularyList.forEach((v, idx) => {
        const seqNumber = idx + 1;
        const div = document.createElement('div');
        div.className = "flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30";
        div.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 font-bold text-xs flex items-center justify-center border border-amber-500/20">#${seqNumber}</span>
                <div class="space-y-0.5">
                    <span class="text-xs font-bold text-slate-900 dark:text-white block">${v.word}</span>
                    <span class="text-[11px] text-slate-400 block">${v.translation}</span>
                    <span class="text-[10px] text-slate-500 block">Acertos: <strong class="text-emerald-500">${v.correctCount || 0}</strong> | Erros: <strong class="text-red-500">${v.wrongCount || 0}</strong></span>
                </div>
            </div>
            <button onclick="deleteVocabularyItem('${v.id}', '${v.word}')" class="text-slate-400 hover:text-red-500 p-2"><i class="fa-solid fa-trash-can text-xs"></i></button>
        `;
        container.appendChild(div);
    });

    if (vocabularyList.length > 0 && currentVocabularyIndex >= vocabularyList.length) {
        currentVocabularyIndex = 0;
    }
    updateFlashcardUI();
}

function updateFlashcardUI() {
    const cardInner = document.getElementById('flip-card-inner');
    
    if (vocabularyList.length === 0) {
        document.getElementById('fc-word').innerText = 'Nenhuma palavra';
        document.getElementById('fc-translation').innerText = '-';
        document.getElementById('fc-example').innerText = 'Cadastre palavras no menu superior.';
        document.getElementById('vocab-card-number').innerText = '#0';
        document.getElementById('vocab-card-counter').innerText = '0 total';
        return;
    }

    const item = vocabularyList[currentVocabularyIndex];
    const seqNumber = currentVocabularyIndex + 1;

    document.getElementById('vocab-card-number').innerText = `#${seqNumber}`;
    document.getElementById('vocab-card-counter').innerText = `${vocabularyList.length} cadastradas`;
    document.getElementById('fc-word').innerText = item.word;
    document.getElementById('fc-translation').innerText = item.translation;
    document.getElementById('fc-example').innerText = item.example ? `"${item.example}"` : 'Sem frase de exemplo.';
    document.getElementById('fc-correct').innerText = item.correctCount || 0;
    document.getElementById('fc-wrong').innerText = item.wrongCount || 0;

    isCardFlipped = false;
    if (cardInner) cardInner.classList.remove('flipped');
}

function flipFlashcard() {
    if (vocabularyList.length === 0) return;
    const cardInner = document.getElementById('flip-card-inner');
    isCardFlipped = !isCardFlipped;
    if (isCardFlipped) {
        cardInner.classList.add('flipped');
    } else {
        cardInner.classList.remove('flipped');
    }
}

function nextFlashcardRandom() {
    if (vocabularyList.length === 0) return;
    if (vocabularyList.length === 1) {
        currentVocabularyIndex = 0;
    } else {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * vocabularyList.length);
        } while (newIndex === currentVocabularyIndex);
        currentVocabularyIndex = newIndex;
    }
    updateFlashcardUI();
}

function gradeFlashcard(isCorrect) {
    if (vocabularyList.length === 0) return;
    const item = vocabularyList[currentVocabularyIndex];
    if (isCorrect) item.correctCount = (item.correctCount || 0) + 1;
    else item.wrongCount = (item.wrongCount || 0) + 1;
    saveVocabularyData();
    renderVocabularyDashboard();
    nextFlashcardRandom();
}

async function handleListeningFormSubmit(e) {
    e.preventDefault();
    const mediaType = document.querySelector('input[name="mediaType"]:checked').value;
    const name = document.getElementById('mediaName').value.trim();
    const studyType = document.querySelector('input[name="studyType"]:checked').value;
    const coverInput = document.getElementById('mediaCoverFile');
    let hours = 0, minutes = 0, season = '';

    if (mediaType === 'filme') {
        hours = parseInt(document.getElementById('filmHours').value) || 0;
        minutes = parseInt(document.getElementById('filmMinutes').value) || 0;
    } else {
        season = document.getElementById('seriesSeason').value.trim();
        const epCount = parseInt(document.getElementById('seriesEpCount').value) || 1;
        const totalMins = (((parseInt(document.getElementById('seriesEpHours').value) || 0) * 60) + (parseInt(document.getElementById('seriesEpMinutes').value) || 22)) * epCount;
        hours = Math.floor(totalMins / 60);
        minutes = totalMins % 60;
        if (epCount > 0) season += season ? ` (${epCount} eps)` : `${epCount} eps`;
    }

    let coverBase64 = '';
    if (coverInput.files && coverInput.files[0]) {
        coverBase64 = await new Promise(r => { const reader = new FileReader(); reader.onload = (e) => r(e.target.result); reader.readAsDataURL(coverInput.files[0]); });
    }

    listeningList.push({ id: Date.now().toString(), type: mediaType, name, season, cover: coverBase64, studyType, hours, minutes });
    saveListeningData();
    document.getElementById('media-form').reset();
    switchTab('dashboard');
}

async function handleReadingFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const pages = parseInt(document.getElementById('bookPages').value) || 0;
    const coverInput = document.getElementById('bookCoverFile');

    let coverBase64 = '';
    if (coverInput.files && coverInput.files[0]) {
        coverBase64 = await new Promise(r => { const reader = new FileReader(); reader.onload = (e) => r(e.target.result); reader.readAsDataURL(coverInput.files[0]); });
    }

    readingList.push({ id: Date.now().toString(), title, author, pages, cover: coverBase64 });
    saveReadingData();
    document.getElementById('book-form').reset();
    switchTab('dashboard');
}

function handleVocabularyFormSubmit(e) {
    e.preventDefault();
    const word = document.getElementById('vocabWord').value.trim();
    const translation = document.getElementById('vocabTranslation').value.trim();
    const example = document.getElementById('vocabExample').value.trim();

    vocabularyList.push({ id: Date.now().toString(), word, translation, example, correctCount: 0, wrongCount: 0 });
    saveVocabularyData();
    document.getElementById('vocab-form').reset();
    switchTab('dashboard');
}

function deleteListeningItem(id, name) {
    if (confirm(`Luis, tem certeza que quer excluir "${name}"?`)) {
        listeningList = listeningList.filter(i => i.id !== id);
        saveListeningData();
        renderListeningDashboard();
    }
}

function deleteReadingItem(id, title) {
    if (confirm(`Luis, tem certeza que quer excluir o livro "${title}"?`)) {
        readingList = readingList.filter(i => i.id !== id);
        saveReadingData();
        renderReadingDashboard();
    }
}

function deleteVocabularyItem(id, word) {
    if (confirm(`Luis, tem certeza que quer excluir a palavra "${word}"?`)) {
        vocabularyList = vocabularyList.filter(i => i.id !== id);
        saveVocabularyData();
        renderVocabularyDashboard();
    }
}

window.onload = function() {
    initTheme();
    openModule('hub');
};