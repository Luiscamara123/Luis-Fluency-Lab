const TARGET_LISTENING_HOURS = 1000;
let currentModule = 'hub';
let currentTab = 'dashboard';

let targetLang = localStorage.getItem('luis_target_language') || 'en';
let uiLang = localStorage.getItem('luis_ui_language') || 'pt';

const LANG_META = {
    en: { name: 'English', flag: '🇺🇸' },
    es: { name: 'Español', flag: '🇪🇸' },
    fr: { name: 'Français', flag: '🇫🇷' },
    ja: { name: '日本語', flag: '🇯🇵' },
    pt: { name: 'Português', flag: '🇧🇷' }
};

// Dicionário de Vocabulário padrão traduzido para cada idioma da interface
const VOCAB_TRANSLATIONS = {
    pt: [
        { id: '1', word: 'Breathtaking', translation: 'De tirar o fôlego / Deslumbrante', example: 'The view from the mountain was breathtaking.', correctCount: 0, wrongCount: 0 },
        { id: '2', word: 'Achievement', translation: 'Conquista / Realização', example: 'Learning a new language is a great achievement.', correctCount: 0, wrongCount: 0 }
    ],
    en: [
        { id: '1', word: 'Breathtaking', translation: 'Stunning / Extremely exciting', example: 'The view from the mountain was breathtaking.', correctCount: 0, wrongCount: 0 },
        { id: '2', word: 'Achievement', translation: 'A thing done successfully with effort', example: 'Learning a new language is a great achievement.', correctCount: 0, wrongCount: 0 }
    ],
    es: [
        { id: '1', word: 'Breathtaking', translation: 'Impresionante / Deslumbrante', example: 'The view from the mountain was breathtaking.', correctCount: 0, wrongCount: 0 },
        { id: '2', word: 'Achievement', translation: 'Logro / Conquista', example: 'Learning a new language is a great achievement.', correctCount: 0, wrongCount: 0 }
    ],
    fr: [
        { id: '1', word: 'Breathtaking', translation: 'Époustouflant / Saisissant', example: 'The view from the mountain was breathtaking.', correctCount: 0, wrongCount: 0 },
        { id: '2', word: 'Achievement', translation: 'Réussite / Réalisation', example: 'Learning a new language is a great achievement.', correctCount: 0, wrongCount: 0 }
    ],
    ja: [
        { id: '1', word: 'Breathtaking', translation: '息をのむような (Subarashii)', example: 'The view from the mountain was breathtaking.', correctCount: 0, wrongCount: 0 },
        { id: '2', word: 'Achievement', translation: '達成 / 成果 (Tassei)', example: 'Learning a new language is a great achievement.', correctCount: 0, wrongCount: 0 }
    ]
};

const UI_TEXTS = {
    pt: {
        subtitle: "Plataforma Global de Imersão",
        learningLabel: "Estudando", uiLabel: "Interface",
        navHub: "Início", navDash: "Dashboard", navCad: "Cadastrar",
        welcome: "Bem-vindo, Luis!",
        hubTitle: "O que você quer registrar ou treinar hoje?",
        hubDesc: "Escolha uma das modalidades abaixo para acompanhar sua evolução.",
        cardListeningGoal: "Meta: 1000 Horas", cardListeningTitle: "Listening Tracker", cardListeningDesc: "Filmes e séries assistidos no idioma selecionado.",
        cardReadingTag: "Leitura de Livros", cardReadingTitle: "Reading Tracker", cardReadingDesc: "Livros lidos, contagem de obras e páginas acumuladas.",
        cardVocabTag: "Flashcards", cardVocabTitle: "Vocabulary Trainer", cardVocabDesc: "Treine palavras aprendidas com teste de verificação.",
        btnAccess: "Acessar Dashboard", btnTrain: "Treinar Vocabulário",
        goalFixed: "Meta Fixa", progress: "Progresso", of1000: "de 1000h",
        summaryListening: "Resumo do Listening", realTime: "Tempo Real", registered: "Cadastrados",
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
        totalWords: "Palavras", accuracyRate: "Taxa Acerto", registeredVocab: "Suas Palavras Cadastradas", addWordTitle: "Cadastrar Nova Palavra", addWordDesc: "Adicione termos para treinos.",
        termInLang: "Palavra / Termo no Idioma", termTranslation: "Tradução / Significado", termExample: "Exemplo de Frase (Opcional)",
        tapFlip: "Toque para Virar", clickToFlip: "Clique no cartão para revelar a tradução 🔄", translationTag: "Tradução",
        correctHits: "Acertos:", wrongHits: "Erros:", btnWrong: "Não Lembrei", btnCorrect: "Lembrei (Certo!)", btnNextRandom: "Sortear Próxima Palavra Aleatória",
        emptyVocabTitle: "Nenhuma palavra", emptyVocabExample: "Cadastre palavras no menu superior.", emptyVocabList: "Nenhuma palavra cadastrada.", emptyMediaList: "Nenhum título cadastrado.", emptyBookList: "Nenhum livro cadastrado."
    },
    en: {
        subtitle: "Global Immersion Platform",
        learningLabel: "Studying", uiLabel: "Interface",
        navHub: "Home", navDash: "Dashboard", navCad: "Add New",
        welcome: "Welcome, Luis!",
        hubTitle: "What do you want to track or practice today?",
        hubDesc: "Select one of the modules below to track your progress.",
        cardListeningGoal: "Goal: 1000 Hours", cardListeningTitle: "Listening Tracker", cardListeningDesc: "Movies and series watched in your target language.",
        cardReadingTag: "Book Reading", cardReadingTitle: "Reading Tracker", cardReadingDesc: "Books read, count of works and total pages accumulated.",
        cardVocabTag: "Flashcards", cardVocabTitle: "Vocabulary Trainer", cardVocabDesc: "Practice vocabulary with active memory tests.",
        btnAccess: "Open Dashboard", btnTrain: "Train Vocabulary",
        goalFixed: "Fixed Goal", progress: "Progress", of1000: "of 1000h",
        summaryListening: "Listening Summary", realTime: "Real Time", registered: "Tracked Items",
        hoursByType: "Hours by Study Type", hoursByTypeDesc: "Breakdown by Diamond, Silver, and Gold.",
        titlesWatched: "Titles Watched", decimalTotal: "DECIMAL TOTAL:", target: "TARGET:",
        addMediaTitle: "Add Movie or Series", addMediaDesc: "Log your immersion hours.",
        mediaType: "Media Type", optMovie: "Movie", optSeries: "Series",
        titleName: "Title Name", coverImg: "Cover (Image File)", listeningMode: "Listening Mode",
        descDiamond: "No subtitles (100% focused practice)", descGold: "Audio and subtitles in target language", descSilver: "Original audio with translated subtitles",
        hours: "Hours", minutes: "Minutes", season: "Season (Optional)", epCount: "Episodes Watched", avgHours: "Avg Ep (Hours)", avgMins: "Avg Ep (Minutes)",
        save: "Save Entry", cancel: "Cancel",
        totalBooks: "Total Books", totalPages: "Total Pages", pagesPerBook: "Pages Read per Book", pagesPerBookDesc: "Volume of reading per book.",
        registeredBooks: "Saved Books", sumPages: "TOTAL PAGES:", addBookTitle: "Add New Book", addBookDesc: "Log books read to calculate total pages.",
        bookTitle: "Book Title", bookAuthor: "Author (Optional)", bookPages: "Number of Pages", bookCover: "Book Cover",
        totalWords: "Words", accuracyRate: "Accuracy Rate", registeredVocab: "Saved Vocabulary", addWordTitle: "Add New Word", addWordDesc: "Add new terms for training.",
        termInLang: "Word / Term in Target Language", termTranslation: "Translation / Meaning", termExample: "Example Sentence (Optional)",
        tapFlip: "Tap to Flip", clickToFlip: "Click card to reveal translation 🔄", translationTag: "Translation",
        correctHits: "Correct:", wrongHits: "Wrong:", btnWrong: "Forgot", btnCorrect: "Remembered!", btnNextRandom: "Draw Next Random Word",
        emptyVocabTitle: "No words added", emptyVocabExample: "Add words using the top menu.", emptyVocabList: "No words registered.", emptyMediaList: "No titles registered.", emptyBookList: "No books registered."
    },
    es: {
        subtitle: "Plataforma Global de Inmersión",
        learningLabel: "Estudiando", uiLabel: "Interfaz",
        navHub: "Inicio", navDash: "Panel", navCad: "Añadir",
        welcome: "¡Bienvenido, Luis!",
        hubTitle: "¿Qué quieres registrar o practicar hoy?",
        hubDesc: "Selecciona un módulo a continuación para ver tu progreso.",
        cardListeningGoal: "Meta: 1000 Horas", cardListeningTitle: "Listening Tracker", cardListeningDesc: "Películas y series vistas en el idioma seleccionado.",
        cardReadingTag: "Lectura de Libros", cardReadingTitle: "Reading Tracker", cardReadingDesc: "Libros leídos, número de obras y páginas acumuladas.",
        cardVocabTag: "Tarjetas", cardVocabTitle: "Vocabulary Trainer", cardVocabDesc: "Practica palabras con prueba de memoria.",
        btnAccess: "Ver Panel", btnTrain: "Entrenar Vocabulario",
        goalFixed: "Meta Fija", progress: "Progreso", of1000: "de 1000h",
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
        emptyVocabTitle: "Sin palabras", emptyVocabExample: "Añade palabras desde el menú superior.", emptyVocabList: "No hay palabras registradas.", emptyMediaList: "No hay títulos registrados.", emptyBookList: "No hay libros registrados."
    },
    fr: {
        subtitle: "Plateforme d'Immersion Globale",
        learningLabel: "Apprentissage", uiLabel: "Interface",
        navHub: "Accueil", navDash: "Tableau de bord", navCad: "Ajouter",
        welcome: "Bienvenue, Luis !",
        hubTitle: "Que souhaitez-vous enregistrer ou pratiquer aujourd'hui ?",
        hubDesc: "Sélectionnez un module ci-dessous pour suivre vos progrès.",
        cardListeningGoal: "Objectif : 1000 Heures", cardListeningTitle: "Listening Tracker", cardListeningDesc: "Films et séries regardés dans la langue cible.",
        cardReadingTag: "Lecture de Livres", cardReadingTitle: "Reading Tracker", cardReadingDesc: "Livres lus, nombre d'ouvrages et total de pages.",
        cardVocabTag: "Flashcards", cardVocabTitle: "Vocabulary Trainer", cardVocabDesc: "Entraînez-vous avec des tests de mémoire.",
        btnAccess: "Accéder au Tableau", btnTrain: "Entraîner le Vocabulaire",
        goalFixed: "Objectif Fixe", progress: "Progrès", of1000: "sur 1000h",
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
        emptyVocabTitle: "Aucun mot", emptyVocabExample: "Ajoutez des mots depuis le menu haut.", emptyVocabList: "Aucun mot enregistré.", emptyMediaList: "Aucun titre enregistré.", emptyBookList: "Aucun livre enregistré."
    },
    ja: {
        subtitle: "グローバル・イマージョン・プラットフォーム",
        learningLabel: "学習言語", uiLabel: "表示言語",
        navHub: "ホーム", navDash: "ダッシュボード", navCad: "新規登録",
        welcome: "ようこそ、Luisさん！",
        hubTitle: "今日記録・練習する項目を選択してください",
        hubDesc: "以下のモジュールを選択して進捗を記録しましょう。",
        cardListeningGoal: "目標：1000時間", cardListeningTitle: "Listening Tracker", cardListeningDesc: "選択した言語で視聴した映画・ドラマ。",
        cardReadingTag: "読書記録", cardReadingTitle: "Reading Tracker", cardReadingDesc: "読了した本と累積ページ数。",
        cardVocabTag: "単語カード", cardVocabTitle: "Vocabulary Trainer", cardVocabDesc: "記憶テストで語彙力を鍛えましょう。",
        btnAccess: "ダッシュボードを開く", btnTrain: "単語を練習する",
        goalFixed: "固定目標", progress: "進捗率", of1000: " / 1000時間",
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
        emptyVocabTitle: "単語がありません", emptyVocabExample: "上のメニューから単語を追加してください。", emptyVocabList: "登録済みの単語はありません。", emptyMediaList: "登録済みの作品はありません。", emptyBookList: "登録済みの本はありません。"
    }
};

let listeningList = [];
let readingList = [];
let vocabularyList = [];
let currentVocabularyIndex = 0;
let isCardFlipped = false;

function loadLanguageData() {
    listeningList = JSON.parse(localStorage.getItem(`luis_listening_${targetLang}`)) || [];
    readingList = JSON.parse(localStorage.getItem(`luis_reading_${targetLang}`)) || [];
    
    // Carrega o vocabulário base correspondente ao idioma da interface atual se não houver dados salvos
    let savedVocab = JSON.parse(localStorage.getItem(`luis_vocab_${uiLang}`));
    if (!savedVocab || savedVocab.length === 0) {
        vocabularyList = VOCAB_TRANSLATIONS[uiLang] || VOCAB_TRANSLATIONS['pt'];
        saveVocabularyData();
    } else {
        vocabularyList = savedVocab;
    }
}

function saveListeningData() { localStorage.setItem(`luis_listening_${targetLang}`, JSON.stringify(listeningList)); }
function saveReadingData() { localStorage.setItem(`luis_reading_${targetLang}`, JSON.stringify(readingList)); }
function saveVocabularyData() { localStorage.setItem(`luis_vocab_${uiLang}`, JSON.stringify(vocabularyList)); }

function changeTargetLanguage(newLang) {
    targetLang = newLang;
    localStorage.setItem('luis_target_language', targetLang);
    loadLanguageData();
    updateUIWithTargetLang();
    refreshAllDashboards();
}

function changeUILanguage(newUILang) {
    uiLang = newUILang;
    localStorage.setItem('luis_ui_language', uiLang);
    loadLanguageData(); // Recarrega o vocabulário traduzido para a nova UI
    applyUITranslations();
    refreshAllDashboards();
}

function refreshAllDashboards() {
    applyUITranslations();
    if (currentModule === 'listening') renderListeningDashboard();
    if (currentModule === 'reading') renderReadingDashboard();
    if (currentModule === 'vocabulary') renderVocabularyDashboard();
}

function updateUIWithTargetLang() {
    const meta = LANG_META[targetLang] || LANG_META['en'];
    document.getElementById('listening-flag-icon').innerText = meta.flag;
    document.getElementById('reading-flag-icon').innerText = meta.flag;
    document.getElementById('vocab-flag-icon').innerText = meta.flag;
    
    document.getElementById('listening-welcome-prefix').innerText = `Listening (${meta.name})`;
    document.getElementById('reading-title-prefix').innerText = `Reading (${meta.name})`;
    document.getElementById('vocab-title-prefix').innerText = `Vocabulary (${meta.name})`;
    document.getElementById('card-front-lang-label').innerText = meta.name;
}

function applyUITranslations() {
    const txt = UI_TEXTS[uiLang] || UI_TEXTS['pt'];

    document.getElementById('header-subtitle').innerText = txt.subtitle;
    document.getElementById('label-learning').innerText = txt.learningLabel;
    document.getElementById('label-ui-lang').innerText = txt.uiLabel;

    document.getElementById('lbl-nav-hub').innerText = txt.navHub;
    document.getElementById('lbl-nav-dash').innerText = txt.navDash;
    document.getElementById('lbl-nav-cad').innerText = txt.navCad;

    document.getElementById('hub-welcome').innerText = `${txt.welcome} ${LANG_META[targetLang].flag}`;
    document.getElementById('hub-title').innerText = txt.hubTitle;
    document.getElementById('hub-desc').innerText = txt.hubDesc;

    document.getElementById('card-listening-goal').innerText = txt.cardListeningGoal;
    document.getElementById('card-listening-title').innerText = txt.cardListeningTitle;
    document.getElementById('card-listening-desc').innerText = txt.cardListeningDesc;
    
    document.getElementById('card-reading-tag').innerText = txt.cardReadingTag;
    document.getElementById('card-reading-title').innerText = txt.cardReadingTitle;
    document.getElementById('card-reading-desc').innerText = txt.cardReadingDesc;

    document.getElementById('card-vocab-tag').innerText = txt.cardVocabTag;
    document.getElementById('card-vocab-title').innerText = txt.cardVocabTitle;
    document.getElementById('card-vocab-desc').innerText = txt.cardVocabDesc;

    document.querySelectorAll('.hub-btn-access').forEach(el => el.innerText = txt.btnAccess);
    document.getElementById('hub-btn-train').innerText = txt.btnTrain;

    document.getElementById('lbl-goal-fixed').innerText = txt.goalFixed;
    document.getElementById('lbl-progress').innerText = txt.progress;
    document.getElementById('lbl-of-1000').innerText = txt.of1000;
    document.getElementById('lbl-summary-listening').innerText = txt.summaryListening;
    document.getElementById('lbl-real-time').innerText = txt.realTime;
    document.getElementById('lbl-registered').innerText = txt.registered;
    document.getElementById('lbl-hours-by-type').innerText = txt.hoursByType;
    document.getElementById('lbl-hours-by-type-desc').innerText = txt.hoursByTypeDesc;
    document.getElementById('lbl-titles-watched').innerText = txt.titlesWatched;
    document.getElementById('lbl-decimal-total').innerText = txt.decimalTotal;
    document.getElementById('lbl-target').innerText = txt.target;

    document.getElementById('lbl-add-media-title').innerText = txt.addMediaTitle;
    document.getElementById('lbl-add-media-desc').innerText = txt.addMediaDesc;
    document.getElementById('lbl-media-type').innerText = txt.mediaType;
    document.getElementById('opt-movie').innerText = txt.optMovie;
    document.getElementById('opt-series').innerText = txt.optSeries;
    document.getElementById('lbl-title-name').innerText = txt.titleName;
    document.getElementById('lbl-cover-img').innerText = txt.coverImg;
    document.getElementById('lbl-listening-mode').innerText = txt.listeningMode;
    document.getElementById('desc-diamond').innerText = txt.descDiamond;
    document.getElementById('desc-gold').innerText = txt.descGold;
    document.getElementById('desc-silver').innerText = txt.descSilver;
    document.getElementById('lbl-hours').innerText = txt.hours;
    document.getElementById('lbl-minutes').innerText = txt.minutes;
    document.getElementById('lbl-season').innerText = txt.season;
    document.getElementById('lbl-ep-count').innerText = txt.epCount;
    document.getElementById('lbl-avg-hours').innerText = txt.avgHours;
    document.getElementById('lbl-avg-mins').innerText = txt.avgMins;

    document.querySelectorAll('.btn-save').forEach(el => el.innerText = txt.save);
    document.querySelectorAll('.btn-cancel').forEach(el => el.innerText = txt.cancel);

    document.getElementById('lbl-total-books').innerText = txt.totalBooks;
    document.getElementById('lbl-total-pages').innerText = txt.totalPages;
    document.getElementById('lbl-pages-per-book').innerText = txt.pagesPerBook;
    document.getElementById('lbl-pages-per-book-desc').innerText = txt.pagesPerBookDesc;
    document.getElementById('lbl-registered-books').innerText = txt.registeredBooks;
    document.getElementById('lbl-sum-pages').innerText = txt.sumPages;
    document.getElementById('lbl-add-book-title').innerText = txt.addBookTitle;
    document.getElementById('lbl-add-book-desc').innerText = txt.addBookDesc;
    document.getElementById('lbl-book-title').innerText = txt.bookTitle;
    document.getElementById('lbl-book-author').innerText = txt.bookAuthor;
    document.getElementById('lbl-book-pages').innerText = txt.bookPages;
    document.getElementById('lbl-book-cover').innerText = txt.bookCover;

    document.getElementById('lbl-total-words').innerText = txt.totalWords;
    document.getElementById('lbl-accuracy-rate').innerText = txt.accuracyRate;
    document.getElementById('lbl-registered-vocab').innerText = txt.registeredVocab;
    document.getElementById('lbl-add-word-title').innerText = txt.addWordTitle;
    document.getElementById('lbl-add-word-desc').innerText = txt.addWordDesc;
    document.getElementById('lbl-term-in-lang').innerText = txt.termInLang;
    document.getElementById('lbl-term-translation').innerText = txt.termTranslation;
    document.getElementById('lbl-term-example').innerText = txt.termExample;

    document.getElementById('lbl-tap-flip').innerText = txt.tapFlip;
    document.getElementById('lbl-click-to-flip').innerText = txt.clickToFlip;
    document.getElementById('lbl-translation-tag').innerText = txt.translationTag;
    document.getElementById('lbl-correct-hits').innerText = txt.correctHits;
    document.getElementById('lbl-wrong-hits').innerText = txt.wrongHits;
    document.getElementById('btn-wrong-action').innerText = txt.btnWrong;
    document.getElementById('btn-correct-action').innerText = txt.btnCorrect;
    document.getElementById('btn-next-random').innerText = txt.btnNextRandom;
}

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
        const activeEl = document.getElementById(`module-${moduleName}`);
        activeEl.classList.remove('hidden');
        switchTab('dashboard');
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    refreshAllDashboards();
}

function updateThemeIcon(isDark) {
    const iconClass = isDark ? 'fa-solid fa-sun text-amber-400' : 'fa-solid fa-moon text-slate-600';
    document.getElementById('theme-icon-desktop').className = iconClass;
    document.getElementById('theme-icon-mobile').className = iconClass;
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
    const txt = UI_TEXTS[uiLang] || UI_TEXTS['pt'];
    let totalMins = 0, hoursByStudy = { 'DIAMANTE': 0, 'PRATA': 0, 'OURO': 0 };
    
    listeningList.forEach(item => {
        const mins = (Number(item.hours) * 60) + Number(item.minutes);
        totalMins += mins;
        if (hoursByStudy[item.studyType] !== undefined) hoursByStudy[item.studyType] += mins;
    });

    const totalDecimal = totalMins / 60;
    const pct = Math.min((totalDecimal / TARGET_LISTENING_HOURS) * 100, 100);

    document.getElementById('total-hours-display').innerText = totalDecimal.toFixed(2) + 'h';
    document.getElementById('percentage-display').innerText = pct.toFixed(2) + '%';
    document.getElementById('banner-progress').innerText = pct.toFixed(2) + '%';
    document.getElementById('stat-total-time').innerText = `${Math.floor(totalMins / 60)}h ${totalMins % 60}m`;
    document.getElementById('stat-total-items').innerText = listeningList.length;
    document.getElementById('summary-total').innerText = totalDecimal.toFixed(2) + 'h';

    const container = document.getElementById('listening-details-list');
    container.innerHTML = listeningList.length === 0 ? `<p class="text-xs text-slate-400 text-center py-4">${txt.emptyMediaList}</p>` : '';
    listeningList.forEach(item => {
        const itemDec = getDecimalHours(Number(item.hours), Number(item.minutes));
        const labelMap = { 'DIAMANTE': '💎 DIAMANTE', 'OURO': '🥇 OURO', 'PRATA': '🥈 PRATA' };
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
    const txt = UI_TEXTS[uiLang] || UI_TEXTS['pt'];
    let totalPages = 0;
    readingList.forEach(b => totalPages += Number(b.pages));
    document.getElementById('reading-stat-books').innerText = readingList.length;
    document.getElementById('reading-stat-pages').innerText = totalPages;
    document.getElementById('summary-reading-pages').innerText = totalPages;

    const container = document.getElementById('reading-details-list');
    container.innerHTML = readingList.length === 0 ? `<p class="text-xs text-slate-400 text-center py-4">${txt.emptyBookList}</p>` : '';
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
    const txt = UI_TEXTS[uiLang] || UI_TEXTS['pt'];
    document.getElementById('vocab-stat-count').innerText = vocabularyList.length;
    
    let totalCorrect = 0, totalWrong = 0;
    vocabularyList.forEach(v => { totalCorrect += (v.correctCount || 0); totalWrong += (v.wrongCount || 0); });
    const totalAttempts = totalCorrect + totalWrong;
    const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
    document.getElementById('vocab-stat-accuracy').innerText = accuracy + '%';

    const container = document.getElementById('vocabulary-details-list');
    container.innerHTML = vocabularyList.length === 0 ? `<p class="text-xs text-slate-400 text-center py-4">${txt.emptyVocabList}</p>` : '';
    
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
                    <span class="text-[10px] text-slate-500 block">${txt.correctHits} <strong class="text-emerald-500">${v.correctCount || 0}</strong> | ${txt.wrongHits} <strong class="text-red-500">${v.wrongCount || 0}</strong></span>
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
    const txt = UI_TEXTS[uiLang] || UI_TEXTS['pt'];
    
    if (vocabularyList.length === 0) {
        document.getElementById('fc-word').innerText = txt.emptyVocabTitle;
        document.getElementById('fc-translation').innerText = '-';
        document.getElementById('fc-example').innerText = txt.emptyVocabExample;
        document.getElementById('vocab-card-number').innerText = '#0';
        document.getElementById('vocab-card-counter').innerText = `0 ${txt.registered}`;
        return;
    }

    const item = vocabularyList[currentVocabularyIndex];
    const seqNumber = currentVocabularyIndex + 1;

    document.getElementById('vocab-card-number').innerText = `#${seqNumber}`;
    document.getElementById('vocab-card-counter').innerText = `${vocabularyList.length} ${txt.registered}`;
    document.getElementById('fc-word').innerText = item.word;
    document.getElementById('fc-translation').innerText = item.translation;
    document.getElementById('fc-example').innerText = item.example ? `"${item.example}"` : '-';
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
    document.getElementById('select-target-lang').value = targetLang;
    document.getElementById('select-ui-lang').value = uiLang;
    loadLanguageData();
    updateUIWithTargetLang();
    applyUITranslations();
    openModule('hub');
};