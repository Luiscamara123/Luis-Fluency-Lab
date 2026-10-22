let targetListeningHours = Number(localStorage.getItem('luis_target_listening_hours')) || 1000;
let currentModule = 'hub';
let currentTab = 'dashboard';

let targetLang = localStorage.getItem('luis_target_language') || 'en';
let uiLang = localStorage.getItem('luis_ui_language') || 'pt';
let themeMode = localStorage.getItem('luis_theme_mode') || 'light';

const LANG_META = {
    en: { name: 'English', flagImg: 'img/bandeira-eua.webp', themeClass: 'theme-en', platformName: 'American Immersion Platform', edition: 'American Edition' },
    es: { name: 'Español', flagImg: 'img/bandeira-espanha.webp', themeClass: 'theme-es', platformName: 'Plataforma de Inmersión Española', edition: 'Edición Española' },
    fr: { name: 'Français', flagImg: 'img/bandeira-franca.jpg', themeClass: 'theme-fr', platformName: "Plateforme d'Immersion Française", edition: 'Édition Française' },
    ja: { name: '日本語', flagImg: 'img/bandeira-japao.jpg', themeClass: 'theme-ja', platformName: '日本没入プラットフォーム・和の学習ダッシュボード', edition: '和風 Edition' },
    pt: { name: 'Português', flagImg: 'img/bandeira-brasil.webp', themeClass: 'theme-pt', platformName: 'Plataforma de Imersão Brasileira', edition: 'Edición Brasil' }
};

const UI_TEXTS = {
    pt: {
        learningLabel: "Estudando", uiLabel: "Interface",
        navHub: "Início", navDash: "Dashboard", navCad: "Cadastrar",
        welcome: "BEM-VINDO, LUIS •",
        hubTitle: "O que você deseja registrar ou praticar hoje?",
        hubDesc: "Selecione um módulo abaixo para acompanhar seu progresso.",
        cardListeningGoal: "META DE HORAS", cardListeningTitle: "Rastreador de Escuta", cardListeningDesc: "Filmes, séries e podcasts assistidos no idioma.",
        cardReadingTag: "LEITURA DE LIVROS", cardReadingTitle: "Rastreador de Leitura", cardReadingDesc: "Livros lidos, páginas e total de obras.",
        cardVocabTag: "FLASHCARDS", cardVocabTitle: "Treinador de Vocabulário", cardVocabDesc: "Pratique com exercícios de memória e vocabulário.",
        btnAccess: "Acessar o Painel", btnTrain: "Treinar Vocabulário",
        goalFixed: "Meta (Horas)", progress: "Progresso", ofTarget: "da meta",
        summaryListening: "Resumo de Escuta", realTime: "Tempo Real", registered: "Cadastrados",
        hoursByType: "Horas por Tipo de Estudo", hoursByTypeDesc: "Separação por Diamante, Prata e Ouro.",
        titlesWatched: "Títulos Assistidos", decimalTotal: "TOTAL DECIMAL:", target: "ALVO:",
        addMediaTitle: "Cadastrar Filme ou Série", addMediaDesc: "Adicione suas horas de imersão.",
        mediaType: "Tipo de Mídia", optMovie: "Filme", optSeries: "Série",
        titleName: "Nome do Título", coverImg: "Capa (Arquivo de Imagem)", listeningMode: "Modo de Listening",
        descDiamond: "Sem legendas (Treino 100% focado)", descGold: "Áudio e legendas no idioma estudado", descSilver: "Áudio original com legendas traduzidas",
        hours: "Horas", minutes: "Minutos", season: "Temporada (Opcional)", epCount: "Qtd Episódios Assistidos", avgHours: "Média Ep (Horas)", avgMins: "Média Ep (Minutos)",
        save: "Salvar Registro", cancel: "Cancelar",
        totalBooks: "Total Livros", totalPages: "Total Páginas", pagesPerBook: "Páginas Lidas por Livro", pagesPerBookDesc: "Volume de leitura por obra.",
        registeredBooks: "Livros Cadastrados", sumPages: "TOTAL DE PÁGINAS:", addBookTitle: "Cadastrar Novo Livro", addBookDesc: "Adicione livros lidos para contabilizar páginas.",
        bookTitle: "Título do Livro", bookAuthor: "Autor(a) (Opcional)", bookPages: "Quantidade de Páginas", bookCover: "Capa do Livro",
        totalWords: "Palavras", accuracyRate: "Taxa Acerto", registeredVocab: "Suas Palavras Cadastradas", addWordTitle: "Cadastrar Nova Palabra", addWordDesc: "Adicione termos para treinos.",
        termInLang: "Palavra / Termo no Idioma", termTranslation: "Tradução / Significado", termExample: "Exemplo de Frase (Opcional)",
        tapFlip: "Toque para Virar", clickToFlip: "Clique no cartão para revelar a tradução 🔄", translationTag: "Tradução",
        correctHits: "Acertos:", wrongHits: "Erros:", btnWrong: "Não Lembrei", btnCorrect: "Lembrei (Certo!)", btnNextRandom: "Sortear Próxima Palavra Aleatória",
        emptyVocabTitle: "Nenhuma palavra cadastrada", emptyVocabExample: "Cadastre sua primeira palavra no menu superior.", emptyVocabList: "Nenhuma palavra cadastrada.", emptyMediaList: "Nenhum título cadastrado.", emptyBookList: "Nenhum livro cadastrado."
    },
    en: {
        learningLabel: "Studying", uiLabel: "Interface",
        navHub: "Home", navDash: "Dashboard", navCad: "Add New",
        welcome: "WELCOME, LUIS •",
        hubTitle: "What would you like to track or practice today?",
        hubDesc: "Select a module below to monitor your progress.",
        cardListeningGoal: "HOURS GOAL", cardListeningTitle: "LISTENING TRACKER", cardListeningDesc: "Podcasts & series watched in target language. Track listening time.",
        cardReadingTag: "BOOKS READ / PAGES", cardReadingTitle: "READING TRACKER", cardReadingDesc: "Books read, total pages completed. Build your reading habit.",
        cardVocabTag: "FLASHCARDS & WORDS", cardVocabTitle: "VOCABULARY TRAINER", cardVocabDesc: "Practice vocabulary with flashcards. Review and strengthen recall.",
        btnAccess: "Open Dashboard", btnTrain: "Practice Now",
        goalFixed: "Goal (Hours)", progress: "Progress", ofTarget: "of goal",
        summaryListening: "Listening Summary", realTime: "Real Time", registered: "Tracked Items",
        hoursByType: "Hours by Study Type", hoursByTypeDesc: "Breakdown by Diamond, Silver, and Gold categories.",
        titlesWatched: "Titles Watched", decimalTotal: "DECIMAL TOTAL:", target: "TARGET:",
        addMediaTitle: "Add Movie or Series", addMediaDesc: "Log your immersion hours.",
        mediaType: "Media Type", optMovie: "Movie", optSeries: "Series",
        titleName: "Title Name", coverImg: "Cover (Image File)", listeningMode: "Listening Mode",
        descDiamond: "No subtitles (100% focused practice)", descGold: "Audio and subtitles in target language", descSilver: "Original audio with translated subtitles",
        hours: "Hours", minutes: "Minutes", season: "Season (Optional)", epCount: "Episodes Watched", avgHours: "Avg Ep (Hours)", avgMins: "Avg Ep (Minutes)",
        save: "Save Entry", cancel: "Cancel",
        totalBooks: "Total Books", totalPages: "Total Pages", pagesPerBook: "Pages Read per Book", pagesPerBookDesc: "Volume of reading per registered work.",
        registeredBooks: "Saved Books", sumPages: "TOTAL PAGES:", addBookTitle: "Add New Book", addBookDesc: "Log books read to calculate total pages.",
        bookTitle: "Book Title", bookAuthor: "Author (Optional)", bookPages: "Number of Pages", bookCover: "Book Cover",
        totalWords: "Words", accuracyRate: "Accuracy Rate", registeredVocab: "Saved Vocabulary", addWordTitle: "Add New Word", addWordDesc: "Add new terms for training.",
        termInLang: "Word / Term in Target Language", termTranslation: "Translation / Meaning", termExample: "Example Sentence (Optional)",
        tapFlip: "Tap to Flip", clickToFlip: "Click card to reveal translation 🔄", translationTag: "Translation",
        correctHits: "Correct:", wrongHits: "Wrong:", btnWrong: "Forgot", btnCorrect: "Remembered!", btnNextRandom: "Draw Next Random Word",
        emptyVocabTitle: "No words added", emptyVocabExample: "Add your first word using the top menu.", emptyVocabList: "No words registered.", emptyMediaList: "No titles registered.", emptyBookList: "No books registered."
    },
    es: {
        learningLabel: "Estudando", uiLabel: "Interfaz",
        navHub: "Inicio", navDash: "Panel", navCad: "Añadir",
        welcome: "BIENVENIDO, LUIS •",
        hubTitle: "¿Qué quieres registrar o practicar hoy?",
        hubDesc: "Selecciona un módulo a continuación para seguir tu progreso.",
        cardListeningGoal: "META DE HORAS", cardListeningTitle: "Seguimiento de Escucha", cardListeningDesc: "Podcasts, series y vídeos en el idioma.",
        cardReadingTag: "LECTURA DE LIBROS", cardReadingTitle: "Seguimiento de Lectura", cardReadingDesc: "Libros leídos, obras completadas y total de páginas.",
        cardVocabTag: "TARJETAS", cardVocabTitle: "Entrenador de Vocabulario", cardVocabDesc: "Practica con tarjetas y ejercicios de memoria.",
        btnAccess: "Acceder al Panel", btnTrain: "Practicar Vocabulario",
        goalFixed: "Meta (Horas)", progress: "Progreso", ofTarget: "de la meta",
        summaryListening: "Resumen de Escucha", realTime: "Tiempo Real", registered: "Registrados",
        hoursByType: "Horas por Tipo de Estudio", hoursByTypeDesc: "Separación por Diamante, Plata y Oro.",
        titlesWatched: "Títulos Vistos", decimalTotal: "TOTAL DECIMAL:", target: "OBJETIVO:",
        addMediaTitle: "Añadir Película o Serie", addMediaDesc: "Registra tus horas de inmersión.",
        mediaType: "Tipo de Medio", optMovie: "Película", optSeries: "Serie",
        titleName: "Nombre del Título", coverImg: "Portada (Imagen)", listeningMode: "Modo de Escucha",
        descDiamond: "Sin subtítulos (Práctica 100% enfocada)", descGold: "Audio y subtítulos en el idioma", descSilver: "Audio original con subtítulos traducidos",
        hours: "Horas", minutes: "Minutos", season: "Temporada (Opcional)", epCount: "Episodios Vistos", avgHours: "Media Ep (Horas)", avgMins: "Media Ep (Minutos)",
        save: "Guardar", cancel: "Cancelar",
        totalBooks: "Total Libros", totalPages: "Total Páginas", pagesPerBook: "Páginas por Libro", pagesPerBookDesc: "Volumen de lectura acumulado.",
        registeredBooks: "Libros Guardados", sumPages: "TOTAL DE PÁGINAS:", addBookTitle: "Añadir Nuevo Libro", addBookDesc: "Registra libros para calcular páginas.",
        bookTitle: "Título del Libro", bookAuthor: "Autor/a (Opcional)", bookPages: "Número de Páginas", bookCover: "Portada del Libro",
        totalWords: "Palabras", accuracyRate: "Aciertos", registeredVocab: "Vocabulario Guardado", addWordTitle: "Añadir Palabra", addWordDesc: "Añade nuevos términos.",
        termInLang: "Término en el Idioma", termTranslation: "Traducción / Significado", termExample: "Ejemplo (Opcional)",
        tapFlip: "Toca para Girar", clickToFlip: "Haz clic en la tarjeta para ver traducción 🔄", translationTag: "Traducción",
        correctHits: "Aciertos:", wrongHits: "Errores:", btnWrong: "Olvidé", btnCorrect: "¡Recordé!", btnNextRandom: "Siguiente Palabra Aleatoria",
        emptyVocabTitle: "Sin palabras", emptyVocabExample: "Añade tu primera palabra desde el menú.", emptyVocabList: "No hay palabras registradas.", emptyMediaList: "No hay títulos registrados.", emptyBookList: "No hay libros registrados."
    },
    fr: {
        learningLabel: "Apprentissage", uiLabel: "Interface",
        navHub: "Accueil", navDash: "Tableau", navCad: "Ajouter",
        welcome: "BIENVENUE, LUIS •",
        hubTitle: "Que souhaitez-vous enregistrer ou pratiquer aujourd'hui ?",
        hubDesc: "Sélectionnez un module ci-dessous pour suivre vos progrès.",
        cardListeningGoal: "OBJECTIF HEURES", cardListeningTitle: "Listening Tracker", cardListeningDesc: "Films et séries regardés dans la langue cible.",
        cardReadingTag: "LECTURE DE LIVRES", cardReadingTitle: "Reading Tracker", cardReadingDesc: "Livres lus, nombre d'ouvrages et total de pages.",
        cardVocabTag: "FLASHCARDS", cardVocabTitle: "Vocabulary Trainer", cardVocabDesc: "Entraînez-vous avec des tests de mémoire.",
        btnAccess: "Accéder au Tableau", btnTrain: "Entraîner le Vocabulaire",
        goalFixed: "Objectif (Heures)", progress: "Progrès", ofTarget: "de l'objectif",
        summaryListening: "Résumé d'Écoute", realTime: "Temps Réel", registered: "Enregistrés",
        hoursByType: "Heures par Type d'Étude", hoursByTypeDesc: "Répartition Diamant, Argent et Or.",
        titlesWatched: "Titres Visionnés", decimalTotal: "TOTAL DÉCIMAL :", target: "CIBLE :",
        addMediaTitle: "Ajouter Film ou Série", addMediaDesc: "Enregistrez vos heures d'immersion.",
        mediaType: "Type de Média", optMovie: "Film", optSeries: "Série",
        titleName: "Titre", coverImg: "Pochette (Image)", listeningMode: "Mode d'Écoute",
        descDiamond: "Sans sous-titres (Entraînement 100% focalisé)", descGold: "Audio et sous-titres dans la langue", descSilver: "Audio original avec sous-titres traduits",
        hours: "Heures", minutes: "Minutes", season: "Saison (Optionnel)", epCount: "Épisodes Regardés", avgHours: "Moy. Ép (Heures)", avgMins: "Moy. Ép (Minutes)",
        save: "Enregistrer", cancel: "Annuler",
        totalBooks: "Total Livres", totalPages: "Total Pages", pagesPerBook: "Pages par Livre", pagesPerBookDesc: "Volume de lecture par ouvrage.",
        registeredBooks: "Livres Enregistrés", sumPages: "TOTAL DE PAGES :", addBookTitle: "Ajouter un Livre", addBookDesc: "Enregistrez vos livres lus.",
        bookTitle: "Titre du Livre", bookAuthor: "Auteur (Optionnel)", bookPages: "Nombre de Pages", bookCover: "Couverture",
        totalWords: "Mots", accuracyRate: "Taux de Réussite", registeredVocab: "Vocabulaire Enregistré", addWordTitle: "Ajouter un Mot", addWordDesc: "Ajoutez de nouveaux termes.",
        termInLang: "Terme dans la Langue", termTranslation: "Traduction / Sens", termExample: "Exemple (Optionnel)",
        tapFlip: "Appuyez pour Retourner", clickToFlip: "Cliquez pour voir la traduction 🔄", translationTag: "Traduction",
        correctHits: "Correct :", wrongHits: "Erreurs :", btnWrong: "Oublié", btnCorrect: "Rappelé !", btnNextRandom: "Tirer un Mot au Hasard",
        emptyVocabTitle: "Aucun mot", emptyVocabExample: "Ajoutez un mot depuis le menu.", emptyVocabList: "Aucun mot enregistré.", emptyMediaList: "Aucun titre enregistré.", emptyBookList: "Aucun livre enregistré."
    },
    ja: {
        learningLabel: "学習モード", uiLabel: "インターフェース",
        navHub: "ホーム", navDash: "ダッシュボード", navCad: "新規登録",
        welcome: "ようこそ、ルイイスさん •",
        hubTitle: "今日は何を記録・練習しますか？",
        hubDesc: "下のモジュールを選択して、進捗を記録しましょう。",
        cardListeningGoal: "目標時間", cardListeningTitle: "リスニングトラッカー", cardListeningDesc: "アニメ・ドラマ・ポッドキャストで聞き取り練習。",
        cardReadingTag: "読書・テキスト学習", cardReadingTitle: "リーディングトラッカー", cardReadingDesc: "本・漫画・記事を読んで、ページ数と作品数を記録。",
        cardVocabTag: "語彙学習", cardVocabTitle: "語彙トレーナー", cardVocabDesc: "単語を復習し、記憶を定着させるフラッシュカード。",
        btnAccess: "ダッシュボードへ", btnTrain: "学習を開始",
        goalFixed: "目標時間 (時間)", progress: "進捗率", ofTarget: "の目標",
        summaryListening: "リスニング概要", realTime: "実時間", registered: "登録数",
        hoursByType: "学習タイプ別時間", hoursByTypeDesc: "ダイヤモンド、シルバー、ゴールド分類。",
        titlesWatched: "視聴タイトル一覧", decimalTotal: "合計時間:", target: "目標:",
        addMediaTitle: "作品の登録", addMediaDesc: "学習時間を追加します。",
        mediaType: "メディア形式", optMovie: "映画", optSeries: "ドラマ・アニメ",
        titleName: "作品名", coverImg: "カバー画像", listeningMode: "リスニングモード",
        descDiamond: "字幕なし（集中トレーニング）", descGold: "学習言語の音声＋字幕", descSilver: "原語音声＋翻訳字幕",
        hours: "時間", minutes: "分", season: "シーズン（任意）", epCount: "視聴話数", avgHours: "1話の平均（時間）", avgMins: "1話の平均（分）",
        save: "保存する", cancel: "キャンセル",
        totalBooks: "総本数", totalPages: "総ページ数", pagesPerBook: "本ごとのページ数", pagesPerBookDesc: "各作品の読書量。",
        registeredBooks: "登録済みの本", sumPages: "合計ページ数:", addBookTitle: "新しい本を登録", addBookDesc: "読了した本を追加します。",
        bookTitle: "本のタイトル", bookAuthor: "著者（任意）", bookPages: "ページ数", bookCover: "表紙画像",
        totalWords: "単語数", accuracyRate: "正解率", registeredVocab: "登録済みの単語", addWordTitle: "新しい単語を追加", addWordDesc: "練習用の単語を追加します。",
        termInLang: "学習言語の単語", termTranslation: "翻訳・意味", termExample: "例文（任意）",
        tapFlip: "タップして裏返す", clickToFlip: "カードをクリックして意味を表示 🔄", translationTag: "翻訳・意味",
        correctHits: "正解:", wrongHits: "不正解:", btnWrong: "覚えていない", btnCorrect: "覚えていた！", btnNextRandom: "次の単語をランダム抽出",
        emptyVocabTitle: "単語がありません", emptyVocabExample: "メニューから単語を追加してください。", emptyVocabList: "登録済みの単語はありません。", emptyMediaList: "登録済みの作品はありません。", emptyBookList: "登録済みの本はありません。"
    }
};

let listeningList = [];
let readingList = [];
let vocabularyList = [];
let vocabStreakData = {}; 
let currentVocabularyIndex = 0;
let isCardFlipped = false;

const ACHIEVEMENTS_DATA = [
    { id: 'first_word', title: 'Primeira Palavra', desc: 'Cadastre sua primeira palavra no vocabulário.', icon: 'fa-book-bookmark' },
    { id: 'streak_3', title: 'Foco Inicial', desc: 'Mantenha uma ofensiva de 3 dias seguidos.', icon: 'fa-fire' },
    { id: 'vocab_10', title: 'Léxico em Expansão', desc: 'Cadastre ao menos 10 palavras no idioma ativo.', icon: 'fa-brain' },
    { id: 'listening_10', title: 'Ouvido Atento', desc: 'Registre pelo menos 10 horas de imersão.', icon: 'fa-headphones' }
];

function loadLanguageData() {
    listeningList = JSON.parse(localStorage.getItem(`luis_listening_${targetLang}`)) || [];
    readingList = JSON.parse(localStorage.getItem(`luis_reading_${targetLang}`)) || [];
    
    vocabStreakData = JSON.parse(localStorage.getItem(`luis_vocab_streak_${targetLang}`)) || { 
        lastPracticeDate: '', 
        streakCount: 0, 
        history: {}, 
        currentMonth: new Date().getMonth(),
        missedThisMonth: 0,
        popShownDates: {} // Controla exibição única da popup por dia
    };

    checkMidnightAndTolerance();

    // Idioma isolado
    vocabularyList = JSON.parse(localStorage.getItem(`luis_vocab_${targetLang}`)) || [];
}

function checkMidnightAndTolerance() {
    const todayStr = new Date().toISOString().split('T')[0];
    const currentMonth = new Date().getMonth();

    if (vocabStreakData.currentMonth !== currentMonth) {
        vocabStreakData.currentMonth = currentMonth;
        vocabStreakData.missedThisMonth = 0;
        saveVocabStreakData();
    }

    if (!vocabStreakData.lastPracticeDate) return;

    const lastDate = new Date(vocabStreakData.lastPracticeDate);
    const currentDate = new Date(todayStr);
    const diffTime = currentDate - lastDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
        const missedDays = diffDays - 1;
        for (let i = 1; i <= missedDays; i++) {
            const pastDate = new Date(lastDate);
            pastDate.setDate(lastDate.getDate() + i);
            const pastDateStr = pastDate.toISOString().split('T')[0];
            
            if (!vocabStreakData.history[pastDateStr]) {
                vocabStreakData.history[pastDateStr] = 'missed';
            }

            if (vocabStreakData.missedThisMonth < 3) {
                vocabStreakData.missedThisMonth += 1; 
            } else {
                vocabStreakData.streakCount = 0;
            }
        }
        saveVocabStreakData();
    }
}

function saveListeningData() { localStorage.setItem(`luis_listening_${targetLang}`, JSON.stringify(listeningList)); }
function saveReadingData() { localStorage.setItem(`luis_reading_${targetLang}`, JSON.stringify(readingList)); }
function saveVocabularyData() { localStorage.setItem(`luis_vocab_${targetLang}`, JSON.stringify(vocabularyList)); }
function saveVocabStreakData() { localStorage.setItem(`luis_vocab_streak_${targetLang}`, JSON.stringify(vocabStreakData)); }

function speakWord(wordText) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(wordText);
    const langMap = { en: 'en-US', es: 'es-ES', fr: 'fr-FR', ja: 'ja-JP', pt: 'pt-BR' };
    utterance.lang = langMap[targetLang] || 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

function speakCurrentWord() {
    if (vocabularyList.length === 0) return;
    const item = vocabularyList[currentVocabularyIndex];
    if (item && item.word) speakWord(item.word);
}

function updateListeningGoal(newVal) {
    const val = Number(newVal);
    if (val > 0) {
        targetListeningHours = val;
        localStorage.setItem('luis_target_listening_hours', targetListeningHours);
        renderListeningDashboard();
    }
}

function changeTargetLanguage(newLang) {
    targetLang = newLang;
    localStorage.setItem('luis_target_language', targetLang);
    loadLanguageData();
    updateThemeAndFlags();
    refreshAllDashboards();
}

function changeUILanguage(newUILang) {
    uiLang = newUILang;
    localStorage.setItem('luis_ui_language', uiLang);
    loadLanguageData();
    applyUITranslations();
    refreshAllDashboards();
}

function toggleDarkMode() {
    themeMode = themeMode === 'light' ? 'dark' : 'light';
    localStorage.setItem('luis_theme_mode', themeMode);
    updateThemeAndFlags();
}

function updateThemeAndFlags() {
    const meta = LANG_META[targetLang] || LANG_META['en'];
    const body = document.getElementById('app-body');
    if (body) body.className = `${meta.themeClass} mode-${themeMode} min-h-screen transition-all duration-500 flex flex-col relative overflow-x-hidden`;
    
    const setImgSrc = (id, src) => { const el = document.getElementById(id); if (el) el.src = src; };
    setImgSrc('header-flag-img', meta.flagImg);
    setImgSrc('hub-flag-img', meta.flagImg);
    setImgSrc('listening-flag-img', meta.flagImg);
    setImgSrc('reading-flag-img', meta.flagImg);
    setImgSrc('vocab-flag-img', meta.flagImg);
    
    const watermark = document.getElementById('bg-flag-watermark');
    if (watermark) watermark.style.backgroundImage = `url('${meta.flagImg}')`;

    const setText = (id, txt) => { const el = document.getElementById(id); if (el) el.innerText = txt; };
    setText('header-subtitle', meta.platformName);
    setText('listening-welcome-prefix', `Listening (${meta.name})`);
    setText('reading-title-prefix', `Reading (${meta.name})`);
    setText('vocab-title-prefix', `Vocabulary (${meta.name})`);
    setText('card-front-lang-label', meta.name);
    setText('hub-welcome', `WELCOME, LUIS • ${meta.name.toUpperCase()}`);
    setText('footer-text', `Fluency Lab • ${meta.edition} • 2026`);

    const iconClass = themeMode === 'dark' ? 'fa-solid fa-sun text-amber-400' : 'fa-solid fa-moon text-stone-700';
    const iconDesk = document.getElementById('theme-icon-desktop');
    const iconMob = document.getElementById('theme-icon-mobile');
    if (iconDesk) iconDesk.className = iconClass;
    if (iconMob) iconMob.className = iconClass;
    
    updateHeaderStreakUI();
}

function refreshAllDashboards() {
    applyUITranslations();
    const goalInput = document.getElementById('input-listening-goal');
    if (goalInput) goalInput.value = targetListeningHours;
    if (currentModule === 'listening') renderListeningDashboard();
    if (currentModule === 'reading') renderReadingDashboard();
    if (currentModule === 'vocabulary') renderVocabularyDashboard();
}

function applyUITranslations() {
    const txt = UI_TEXTS[uiLang] || UI_TEXTS['pt'];
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    const setHtml = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };

    setText('label-learning', txt.learningLabel);
    setText('label-ui-lang', txt.uiLabel);
    setText('lbl-nav-hub', txt.navHub);
    setText('lbl-nav-dash', txt.navDash);
    setText('lbl-nav-cad', txt.navCad);
    setText('hub-title', txt.hubTitle);
    setText('hub-desc', txt.hubDesc);
    setText('card-listening-goal', txt.cardListeningGoal);
    setText('card-listening-title', txt.cardListeningTitle);
    setText('card-listening-desc', txt.cardListeningDesc);
    setText('card-reading-tag', txt.cardReadingTag);
    setText('card-reading-title', txt.cardReadingTitle);
    setText('card-reading-desc', txt.cardReadingDesc);
    setText('card-vocab-tag', txt.cardVocabTag);
    setText('card-vocab-title', txt.cardVocabTitle);
    setText('card-vocab-desc', txt.cardVocabDesc);

    document.querySelectorAll('.hub-btn-access').forEach(el => el.innerText = txt.btnAccess);
    setText('hub-btn-train', txt.btnTrain);
    setText('lbl-goal-fixed', txt.goalFixed);
    setText('lbl-progress', txt.progress);
    setText('lbl-of-target', txt.ofTarget);
    setHtml('lbl-summary-listening', `<i class="fa-solid fa-chart-line"></i> ${txt.summaryListening}`);
    setText('lbl-real-time', txt.realTime);
    setText('lbl-registered', txt.registered);
    setText('lbl-hours-by-type', txt.hoursByType);
    setText('lbl-hours-by-type-desc', txt.hoursByTypeDesc);
    setHtml('lbl-titles-watched', `<i class="fa-solid fa-list"></i> ${txt.titlesWatched}`);
    setText('lbl-decimal-total', txt.decimalTotal);
    setText('lbl-target', txt.target);
    setText('lbl-add-media-title', txt.addMediaTitle);
    setText('lbl-add-media-desc', txt.addMediaDesc);
    setText('lbl-media-type', txt.mediaType);
    setText('opt-movie', txt.optMovie);
    setText('opt-series', txt.optSeries);
    setText('lbl-title-name', txt.titleName);
    setText('lbl-cover-img', txt.coverImg);
    setText('lbl-listening-mode', txt.listeningMode);
    setText('desc-diamond', txt.descDiamond);
    setText('desc-gold', txt.descGold);
    setText('desc-silver', txt.descSilver);
    setText('lbl-hours', txt.hours);
    setText('lbl-minutes', txt.minutes);
    setText('lbl-season', txt.season);
    setText('lbl-ep-count', txt.epCount);
    setText('lbl-avg-hours', txt.avgHours);
    setText('lbl-avg-mins', txt.avgMins);

    document.querySelectorAll('.btn-save').forEach(el => el.innerText = txt.save);
    document.querySelectorAll('.btn-cancel').forEach(el => el.innerText = txt.cancel);

    setText('lbl-total-books', txt.totalBooks);
    setText('lbl-total-pages', txt.totalPages);
    setText('lbl-pages-per-book', txt.pagesPerBook);
    setText('lbl-pages-per-book-desc', txt.pagesPerBookDesc);
    setHtml('lbl-registered-books', `<i class="fa-solid fa-bookmark"></i> ${txt.registeredBooks}`);
    setText('lbl-sum-pages', txt.sumPages);
    setText('lbl-add-book-title', txt.addBookTitle);
    setText('lbl-add-book-desc', txt.addBookDesc);
    setText('lbl-book-title', txt.bookTitle);
    setText('lbl-book-author', txt.bookAuthor);
    setText('lbl-book-pages', txt.bookPages);
    setText('lbl-book-cover', txt.bookCover);
    setText('lbl-total-words', txt.totalWords);
    setText('lbl-accuracy-rate', txt.accuracyRate);
    setHtml('lbl-registered-vocab', `<i class="fa-solid fa-list-check"></i> ${txt.registeredVocab}`);
    setText('lbl-add-word-title', txt.addWordTitle);
    setText('lbl-add-word-desc', txt.addWordDesc);
    setText('lbl-term-in-lang', txt.termInLang);
    setText('lbl-term-translation', txt.termTranslation);
    setText('lbl-term-example', txt.termExample);
    setText('lbl-tap-flip', txt.tapFlip);
    setText('lbl-click-to-flip', txt.clickToFlip);
    setText('lbl-translation-tag', txt.translationTag);
    setText('lbl-correct-hits', txt.correctHits);
    setText('lbl-wrong-hits', txt.wrongHits);
    setText('btn-wrong-action', txt.btnWrong);
    setText('btn-correct-action', txt.btnCorrect);
    setText('btn-next-random', txt.btnNextRandom);
}

function openModule(moduleName) {
    currentModule = moduleName;
    const modHub = document.getElementById('module-hub');
    const modListening = document.getElementById('module-listening');
    const modReading = document.getElementById('module-reading');
    const modVocab = document.getElementById('module-vocabulary');

    if (modHub) modHub.classList.add('hidden');
    if (modListening) modListening.classList.add('hidden');
    if (modReading) modReading.classList.add('hidden');
    if (modVocab) modVocab.classList.add('hidden');

    const nav = document.getElementById('main-nav');
    if (moduleName === 'hub') {
        if (modHub) modHub.classList.remove('hidden');
        if (nav) nav.classList.add('hidden');
    } else {
        if (nav) nav.classList.remove('hidden');
        const activeEl = document.getElementById(`module-${moduleName}`);
        if (activeEl) {
            activeEl.classList.remove('hidden');
            activeEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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

    refreshAllDashboards();

    if (tabId === 'dashboard') {
        if (btnDash) btnDash.className = "px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow nav-btn-active";
        if (btnCad) btnCad.className = "px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all opacity-70 hover:opacity-100";
    } else {
        if (btnCad) btnCad.className = "px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all shadow nav-btn-active";
        if (btnDash) btnDash.className = "px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all opacity-70 hover:opacity-100";
    }
}

function toggleMediaType(type) {
    const movieFields = document.getElementById('movie-time-fields');
    const seriesFields = document.getElementById('series-time-fields');
    if (movieFields) movieFields.classList.toggle('hidden', type !== 'filme');
    if (seriesFields) seriesFields.classList.toggle('hidden', type !== 'serie');
}

function getDecimalHours(h, m) { return h + (m / 60); }

let listeningDonutChart = null, listeningBarChart = null, readingBarChart = null;

function renderListeningDashboard() {
    let totalMins = 0, hoursByStudy = { 'DIAMANTE': 0, 'PRATA': 0, 'OURO': 0 };
    listeningList.forEach(item => {
        const mins = (Number(item.hours) * 60) + Number(item.minutes);
        totalMins += mins;
        if (hoursByStudy[item.studyType] !== undefined) hoursByStudy[item.studyType] += mins;
    });

    const totalDecimal = totalMins / 60;
    const targetHours = targetListeningHours > 0 ? targetListeningHours : 1000;
    const pct = Math.min((totalDecimal / targetHours) * 100, 100);

    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    setText('total-hours-display', totalDecimal.toFixed(2) + 'h');
    setText('lbl-of-target', `de ${targetHours}h`);
    setText('summary-target-display', `${targetHours}h`);
    setText('percentage-display', pct.toFixed(2) + '%');
    setText('banner-progress', pct.toFixed(2) + '%');
    setText('stat-total-time', `${Math.floor(totalMins / 60)}h ${totalMins % 60}m`);
    setText('stat-total-items', listeningList.length);
    setText('summary-total', totalDecimal.toFixed(2) + 'h');
    
    const goalInput = document.getElementById('input-listening-goal');
    if (goalInput) goalInput.value = targetListeningHours;

    const container = document.getElementById('listening-details-list');
    if (container) {
        const txt = UI_TEXTS[uiLang] || UI_TEXTS['pt'];
        container.innerHTML = listeningList.length === 0 ? `<p class="text-xs opacity-60 text-center py-6 font-medium">${txt.emptyMediaList}</p>` : '';
        listeningList.forEach(item => {
            const itemDec = getDecimalHours(Number(item.hours), Number(item.minutes));
            const labelMap = { 'DIAMANTE': '💎 DIAMANTE', 'OURO': '🥇 OURO', 'PRATA': '🥈 PRATA' };

            const div = document.createElement('div');
            div.className = "flex items-center justify-between p-3 rounded-xl border-2 transition-all sub-card";
            div.innerHTML = `
                <div class="flex items-center gap-3">
                    ${item.cover ? `<img src="${item.cover}" class="w-11 h-11 rounded-lg object-cover border-2 shadow-sm">` : `<div class="w-11 h-11 rounded-lg flex items-center justify-center text-sm font-bold card-icon-box"><i class="fa-solid fa-film"></i></div>`}
                    <div class="space-y-0.5">
                        <span class="text-xs font-bold block">${item.name} ${item.season ? '('+item.season+')' : ''}</span>
                        <span class="text-[11px] opacity-70 block">${item.hours}h ${item.minutes}m • ${itemDec.toFixed(2)}h</span>
                        <span class="text-[10px] font-black block">${labelMap[item.studyType]}</span>
                    </div>
                </div>
                <button onclick="deleteListeningItem('${item.id}', '${item.name}')" class="opacity-60 hover:opacity-100 hover:text-red-600 p-2.5 transition-colors"><i class="fa-solid fa-trash-can text-xs"></i></button>
            `;
            container.appendChild(div);
        });
    }

    const chartDonutColor = themeMode === 'dark' ? '#f8fafc' : '#1c1917';
    const chartRestColor = themeMode === 'dark' ? '#1e293b' : '#e2d9cd';
    const gridColor = themeMode === 'dark' ? 'rgba(255,255,255,0.06)' : '#e7dfd3';

    const canvasDonut = document.getElementById('progressDonutChart');
    if (canvasDonut) {
        const ctxDonut = canvasDonut.getContext('2d');
        if (listeningDonutChart) listeningDonutChart.destroy();
        listeningDonutChart = new Chart(ctxDonut, {
            type: 'doughnut',
            data: { labels: ['Concluído', 'Restante'], datasets: [{ data: [totalDecimal, Math.max(targetHours - totalDecimal, 0)], backgroundColor: [chartDonutColor, chartRestColor], borderWidth: 0 }] },
            options: { responsive: true, maintainAspectRatio: false, cutout: '82%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }
        });
    }

    const canvasBar = document.getElementById('barTypeChart');
    if (canvasBar) {
        const ctxBar = canvasBar.getContext('2d');
        if (listeningBarChart) listeningBarChart.destroy();
        listeningBarChart = new Chart(ctxBar, {
            type: 'bar',
            data: { labels: ['💎 DIAMANTE', '🥇 OURO', '🥈 PRATA'], datasets: [{ data: [hoursByStudy['DIAMANTE']/60, hoursByStudy['OURO']/60, hoursByStudy['PRATA']/60], backgroundColor: ['#06b6d4', '#eab308', '#94a3b8'], borderRadius: 6, barThickness: 24 }] },
            options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true, grid: { color: gridColor }, ticks: { font: { size: 10 } } }, y: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' } } } }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ' ' + c.parsed.x.toFixed(2) + 'h' } } } }
        });
    }
}

function renderReadingDashboard() {
    const txt = UI_TEXTS[uiLang] || UI_TEXTS['pt'];
    let totalPages = 0;
    readingList.forEach(b => totalPages += Number(b.pages));
    
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    setText('reading-stat-books', readingList.length);
    setText('reading-stat-pages', totalPages);
    setText('summary-reading-pages', totalPages);

    const container = document.getElementById('reading-details-list');
    if (container) {
        container.innerHTML = readingList.length === 0 ? `<p class="text-xs opacity-60 text-center py-6 font-medium">${txt.emptyBookList}</p>` : '';
        readingList.forEach(book => {
            const div = document.createElement('div');
            div.className = "flex items-center justify-between p-3 rounded-xl border-2 transition-all sub-card";
            div.innerHTML = `
                <div class="flex items-center gap-3">
                    ${book.cover ? `<img src="${book.cover}" class="w-10 h-12 rounded-lg object-cover border-2 shadow-sm">` : `<div class="w-10 h-12 rounded-lg flex items-center justify-center text-xs font-bold card-icon-box"><i class="fa-solid fa-book"></i></div>`}
                    <div class="space-y-0.5">
                        <span class="text-xs font-bold block">${book.title}</span>
                        ${book.author ? `<span class="text-[11px] opacity-70 block">${book.author}</span>` : ''}
                        <span class="text-[10px] font-black text-emerald-600 block">${book.pages} páginas</span>
                    </div>
                </div>
                <button onclick="deleteReadingItem('${book.id}', '${book.title}')" class="opacity-60 hover:opacity-100 hover:text-red-600 p-2.5 transition-colors"><i class="fa-solid fa-trash-can text-xs"></i></button>
            `;
            container.appendChild(div);
        });
    }

    const gridColor = themeMode === 'dark' ? 'rgba(255,255,255,0.06)' : '#e7dfd3';
    const canvasBar = document.getElementById('readingBarChart');
    if (canvasBar) {
        const ctxBar = canvasBar.getContext('2d');
        if (readingBarChart) readingBarChart.destroy();
        readingBarChart = new Chart(ctxBar, {
            type: 'bar',
            data: { labels: readingList.map(b => b.title.length > 15 ? b.title.substring(0, 15) + '...' : b.title), datasets: [{ data: readingList.map(b => Number(b.pages)), backgroundColor: '#10b981', borderRadius: 6, barThickness: 20 }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, grid: { color: gridColor }, ticks: { font: { size: 10 } } }, x: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' } } } }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ' ' + c.parsed.y + ' páginas' } } } }
        });
    }
}

function renderVocabularyDashboard() {
    const txt = UI_TEXTS[uiLang] || UI_TEXTS['pt'];
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    setText('vocab-stat-count', vocabularyList.length);
    
    let totalCorrect = 0, totalWrong = 0;
    vocabularyList.forEach(v => { totalCorrect += (v.correctCount || 0); totalWrong += (v.wrongCount || 0); });
    const totalAttempts = totalCorrect + totalWrong;
    const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
    setText('vocab-stat-accuracy', accuracy + '%');

    const container = document.getElementById('vocabulary-details-list');
    if (container) {
        container.innerHTML = vocabularyList.length === 0 ? `<p class="text-xs opacity-60 text-center py-6 font-medium">${txt.emptyVocabList}</p>` : '';
        vocabularyList.forEach((v, idx) => {
            const seqNumber = idx + 1;
            const div = document.createElement('div');
            div.className = "flex items-center justify-between p-3 rounded-xl border-2 transition-all sub-card";
            div.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="w-7 h-7 rounded-lg font-black text-xs flex items-center justify-center border-2 card-icon-box">#${seqNumber}</span>
                    <div class="space-y-0.5">
                        <span class="text-xs font-bold block">${v.word}</span>
                        <span class="text-[11px] opacity-70 block">${v.translation}</span>
                        <span class="text-[10px] opacity-80 block">${txt.correctHits} <strong class="text-emerald-600 font-black">${v.correctCount || 0}</strong> | ${txt.wrongHits} <strong class="text-red-600 font-black">${v.wrongCount || 0}</strong></span>
                    </div>
                </div>
                <div class="flex items-center gap-1">
                    <button onclick="speakWord('${v.word}')" class="p-2 opacity-70 hover:opacity-100 text-amber-500 transition-colors" title="Ouvir"><i class="fa-solid fa-volume-high text-xs"></i></button>
                    <button onclick="deleteVocabularyItem('${v.id}', '${v.word}')" class="opacity-60 hover:opacity-100 hover:text-red-600 p-2.5 transition-colors"><i class="fa-solid fa-trash-can text-xs"></i></button>
                </div>
            `;
            container.appendChild(div);
        });
    }

    if (vocabularyList.length > 0 && currentVocabularyIndex >= vocabularyList.length) {
        currentVocabularyIndex = 0;
    }
    updateFlashcardUI();
}

function updateFlashcardUI() {
    const cardInner = document.getElementById('flip-card-inner');
    const txt = UI_TEXTS[uiLang] || UI_TEXTS['pt'];
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    
    if (vocabularyList.length === 0) {
        setText('fc-word', txt.emptyVocabTitle);
        setText('fc-translation', '-');
        setText('fc-example', txt.emptyVocabExample);
        setText('vocab-card-number', '#0');
        setText('vocab-card-counter', `0 ${txt.registered}`);
        return;
    }

    const item = vocabularyList[currentVocabularyIndex];
    const seqNumber = currentVocabularyIndex + 1;

    setText('vocab-card-number', `#${seqNumber}`);
    setText('vocab-card-counter', `${vocabularyList.length} ${txt.registered}`);
    setText('fc-word', item.word);
    setText('fc-translation', item.translation);
    setText('fc-example', item.example ? `"${item.example}"` : '-');
    setText('fc-correct', item.correctCount || 0);
    setText('fc-wrong', item.wrongCount || 0);

    isCardFlipped = false;
    if (cardInner) cardInner.classList.remove('flipped');
}

function flipFlashcard() {
    if (vocabularyList.length === 0) return;
    const cardInner = document.getElementById('flip-card-inner');
    isCardFlipped = !isCardFlipped;
    if (cardInner) cardInner.classList.toggle('flipped', isCardFlipped);
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

function recordVocabPracticeToday() {
    const todayStr = new Date().toISOString().split('T')[0];
    const isAlreadyDone = vocabStreakData.lastPracticeDate === todayStr;

    if (!vocabStreakData.popShownDates) vocabStreakData.popShownDates = {};

    if (!isAlreadyDone) {
        if (!vocabStreakData.lastPracticeDate) {
            vocabStreakData.streakCount = 1;
        } else {
            const lastDate = new Date(vocabStreakData.lastPracticeDate);
            const currentDate = new Date(todayStr);
            const diffTime = currentDate - lastDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                vocabStreakData.streakCount += 1;
            } else if (diffDays > 1) {
                vocabStreakData.streakCount += 1; 
            } else {
                vocabStreakData.streakCount = 1;
            }
        }

        vocabStreakData.lastPracticeDate = todayStr;
        if (!vocabStreakData.history) vocabStreakData.history = {};
        vocabStreakData.history[todayStr] = 'done';
    }

    // DISPARO DA POPUP CENTRAL DA OFENSIVA APENAS 1 VEZ AO DIA
    if (!vocabStreakData.popShownDates[todayStr]) {
        vocabStreakData.popShownDates[todayStr] = true;
        saveVocabStreakData();
        updateHeaderStreakUI();
        triggerStreakAnimation(); 
    } else {
        saveVocabStreakData();
        updateHeaderStreakUI();
    }
}

function triggerStreakAnimation() {
    const overlay = document.getElementById('streak-animation-overlay');
    const popup = document.getElementById('streak-popup-box');
    if (overlay && popup) {
        overlay.classList.remove('opacity-0', 'pointer-events-none');
        popup.classList.remove('scale-75');
        popup.classList.add('scale-100');
    }
}

function closeStreakAnimation() {
    const overlay = document.getElementById('streak-animation-overlay');
    const popup = document.getElementById('streak-popup-box');
    if (overlay && popup) {
        overlay.classList.add('opacity-0', 'pointer-events-none');
        popup.classList.remove('scale-100');
        popup.classList.add('scale-75');
    }
}

function openStreakModal() {
    const modal = document.getElementById('streak-details-modal');
    if (modal) {
        document.getElementById('modal-streak-count').innerText = `${vocabStreakData.streakCount || 0} dias`;
        document.getElementById('modal-missed-count').innerText = `${vocabStreakData.missedThisMonth || 0} / 3`;
        
        const weekContainer = document.getElementById('week-days-container');
        if (weekContainer) {
            weekContainer.innerHTML = '';
            const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const dateStr = d.toISOString().split('T')[0];
                const dayName = daysOfWeek[d.getDay()];
                
                const status = vocabStreakData.history ? vocabStreakData.history[dateStr] : null;
                const isDone = status === 'done';
                const isMissed = status === 'missed';

                let cardClass = 'sub-card opacity-60';
                let iconColor = 'text-stone-400 opacity-40';

                if (isDone) {
                    cardClass = 'bg-amber-500/10 border-amber-500 text-amber-600 font-bold';
                    iconColor = 'text-amber-500 opacity-100 animate-pulse';
                } else if (isMissed) {
                    cardClass = 'bg-red-500/10 border-red-500 text-red-600 font-bold';
                    iconColor = 'text-red-500 opacity-100';
                }

                const div = document.createElement('div');
                div.className = `p-2 rounded-xl border flex flex-col items-center justify-center gap-1 ${cardClass}`;
                div.innerHTML = `
                    <span class="text-[9px] uppercase">${dayName}</span>
                    <i class="fa-solid fa-fire text-xs ${iconColor}"></i>
                `;
                weekContainer.appendChild(div);
            }
        }

        modal.classList.remove('hidden');
    }
}

function closeStreakModal() {
    const modal = document.getElementById('streak-details-modal');
    if (modal) modal.classList.add('hidden');
}

function openAchievementsModal() {
    const modal = document.getElementById('achievements-modal');
    const container = document.getElementById('achievements-list-container');
    if (!modal || !container) return;

    container.innerHTML = '';
    ACHIEVEMENTS_DATA.forEach(ach => {
        let isUnlocked = false;
        if (ach.id === 'first_word') isUnlocked = vocabularyList.length > 0;
        if (ach.id === 'streak_3') isUnlocked = (vocabStreakData.streakCount || 0) >= 3;
        if (ach.id === 'vocab_10') isUnlocked = vocabularyList.length >= 10;
        if (ach.id === 'listening_10') {
            let sumMins = 0;
            listeningList.forEach(item => sumMins += (Number(item.hours) * 60) + Number(item.minutes));
            isUnlocked = (sumMins / 60) >= 10;
        }

        const div = document.createElement('div');
        div.className = `p-3 rounded-2xl border-2 flex flex-col items-center text-center space-y-1.5 ${isUnlocked ? 'sub-card border-amber-500/50' : 'opacity-40 grayscale sub-card'}`;
        div.innerHTML = `
            <div class="w-8 h-8 rounded-xl flex items-center justify-center text-amber-500 font-bold ${isUnlocked ? 'bg-amber-500/10' : 'bg-stone-500/10'}">
                <i class="fa-solid ${ach.icon}"></i>
            </div>
            <span class="text-xs font-black block">${ach.title}</span>
            <span class="text-[10px] opacity-75 font-medium leading-tight block">${ach.desc}</span>
        `;
        container.appendChild(div);
    });

    modal.classList.remove('hidden');
}

function closeAchievementsModal() {
    const modal = document.getElementById('achievements-modal');
    if (modal) modal.classList.add('hidden');
}

function updateHeaderStreakUI() {
    const todayStr = new Date().toISOString().split('T')[0];
    const isAccessedToday = vocabStreakData.lastPracticeDate === todayStr;
    const count = vocabStreakData.streakCount || 0;

    const countMobile = document.getElementById('header-streak-count');
    const iconMobile = document.getElementById('header-streak-icon');
    const countDesk = document.getElementById('header-streak-count-desktop');
    const iconDesk = document.getElementById('header-streak-icon-desktop');

    if (countMobile) countMobile.innerText = count;
    if (countDesk) countDesk.innerText = count;

    if (isAccessedToday) {
        if (iconMobile) iconMobile.className = "fa-solid fa-fire text-amber-500 opacity-100 animate-pulse";
        if (iconDesk) iconDesk.className = "fa-solid fa-fire text-amber-500 opacity-100 animate-pulse";
    } else {
        if (iconMobile) iconMobile.className = "fa-solid fa-fire text-stone-400 opacity-60";
        if (iconDesk) iconDesk.className = "fa-solid fa-fire text-stone-400 opacity-60";
    }
}

function gradeFlashcard(isCorrect) {
    if (vocabularyList.length === 0) return;
    const item = vocabularyList[currentVocabularyIndex];
    if (isCorrect) item.correctCount = (item.correctCount || 0) + 1;
    else item.wrongCount = (item.wrongCount || 0) + 1;
    
    saveVocabularyData();
    recordVocabPracticeToday(); 
    renderVocabularyDashboard();
    nextFlashcardRandom();
}

async function handleListeningFormSubmit(e) {
    e.preventDefault();
    const mediaTypeRadio = document.querySelector('input[name="mediaType"]:checked');
    const mediaType = mediaTypeRadio ? mediaTypeRadio.value : 'filme';
    const nameEl = document.getElementById('mediaName');
    const name = nameEl ? nameEl.value.trim() : '';
    const studyTypeRadio = document.querySelector('input[name="studyType"]:checked');
    const studyType = studyTypeRadio ? studyTypeRadio.value : 'DIAMANTE';
    const coverInput = document.getElementById('mediaCoverFile');
    let hours = 0, minutes = 0, season = '';

    if (mediaType === 'filme') {
        hours = parseInt(document.getElementById('filmHours')?.value) || 0;
        minutes = parseInt(document.getElementById('filmMinutes')?.value) || 0;
    } else {
        season = document.getElementById('seriesSeason')?.value.trim() || '';
        const epCount = parseInt(document.getElementById('seriesEpCount')?.value) || 1;
        const totalMins = (((parseInt(document.getElementById('seriesEpHours')?.value) || 0) * 60) + (parseInt(document.getElementById('seriesEpMinutes')?.value) || 22)) * epCount;
        hours = Math.floor(totalMins / 60);
        minutes = totalMins % 60;
        if (epCount > 0) season += season ? ` (${epCount} eps)` : `${epCount} eps`;
    }

    let coverBase64 = '';
    if (coverInput && coverInput.files && coverInput.files[0]) {
        coverBase64 = await new Promise(r => { const reader = new FileReader(); reader.onload = (e) => r(e.target.result); reader.readAsDataURL(coverInput.files[0]); });
    }

    listeningList.push({ id: Date.now().toString(), type: mediaType, name, season, cover: coverBase64, studyType, hours, minutes });
    saveListeningData();
    const form = document.getElementById('media-form');
    if (form) form.reset();
    switchTab('dashboard');
}

async function handleReadingFormSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('bookTitle')?.value.trim() || '';
    const author = document.getElementById('bookAuthor')?.value.trim() || '';
    const pages = parseInt(document.getElementById('bookPages')?.value) || 0;
    const coverInput = document.getElementById('bookCoverFile');

    let coverBase64 = '';
    if (coverInput && coverInput.files && coverInput.files[0]) {
        coverBase64 = await new Promise(r => { const reader = new FileReader(); reader.onload = (e) => r(e.target.result); reader.readAsDataURL(coverInput.files[0]); });
    }

    readingList.push({ id: Date.now().toString(), title, author, pages, cover: coverBase64 });
    saveReadingData();
    const form = document.getElementById('book-form');
    if (form) form.reset();
    switchTab('dashboard');
}

function handleVocabularyFormSubmit(e) {
    e.preventDefault();
    const word = document.getElementById('vocabWord')?.value.trim() || '';
    const translation = document.getElementById('vocabTranslation')?.value.trim() || '';
    const example = document.getElementById('vocabExample')?.value.trim() || '';

    vocabularyList.push({ id: Date.now().toString(), word, translation, example, correctCount: 0, wrongCount: 0 });
    saveVocabularyData(); 
    const form = document.getElementById('vocab-form');
    if (form) form.reset();
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
    const targetLangSelect = document.getElementById('select-target-lang');
    const uiLangSelect = document.getElementById('select-ui-lang');
    if (targetLangSelect) targetLangSelect.value = targetLang;
    if (uiLangSelect) uiLangSelect.value = uiLang;
    loadLanguageData();
    updateThemeAndFlags();
    applyUITranslations();
    openModule('hub');
    updateHeaderStreakUI();
};