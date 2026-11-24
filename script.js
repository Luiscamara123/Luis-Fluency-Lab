/* ==========================================================================
   FLUENCY LAB - SISTEMA DE IMERSÃO MULTILÍNGUE (LÓGICA PRINCIPAL)
   ========================================================================== */

let appState = {
    currentUser: {
        name: "Luis",
        originLang: "pt",
        uiLang: "pt",
        targetLang: "en",
        avatar: "",
        onboardingCompleted: false
    },
    isDarkMode: true,
    activeModule: "hub",
    activeSubTab: "dashboard",
    streak: {
        count: 0,
        lastActiveDate: null,
        history: {},
        missedThisMonth: 0,
        vocabDoneToday: false
    },
    data: {
        en: { listening: [], reading: [], vocabulary: [], listeningGoal: 1000, speechCompleted: [], typingWords: [], typingBestScore: 0 },
        es: { listening: [], reading: [], vocabulary: [], listeningGoal: 1000, speechCompleted: [], typingWords: [], typingBestScore: 0 },
        fr: { listening: [], reading: [], vocabulary: [], listeningGoal: 1000, speechCompleted: [], typingWords: [], typingBestScore: 0 },
        ja: { listening: [], reading: [], vocabulary: [], listeningGoal: 1000, speechCompleted: [], typingWords: [], typingBestScore: 0 },
        pt: { listening: [], reading: [], vocabulary: [], listeningGoal: 1000, speechCompleted: [], typingWords: [], typingBestScore: 0 }
    },
    vocabStats: {
        correct: 0,
        wrong: 0
    },
    speechStats: {
        totalRead: 0,
        perfectReads: 0,
        highAccuracyReads: 0
    },
    typingStats: {
        gamesPlayed: 0,
        totalWordsDestroyed: 0,
        bestCombo: 0
    },
    unlockedAchievements: []
};

let currentVocabIndex = 0;
let currentAchievementFilter = 'all';
let onboardingTempOrigin = 'pt';
let onboardingTempTarget = 'en';

let donutChartInstance = null;
let barTypeChartInstance = null;
let readingBarChartInstance = null;

/* ==========================================================================
   TOP 30 PALAVRAS MAIS USADAS POR IDIOMA (PARA O JOGO FOGUETE A LASER)
   ========================================================================== */
const TOP_30_TYPING_WORDS = {
    en: [
        "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
        "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
        "this", "but", "his", "by", "from", "they", "we", "say", "her", "she"
    ],
    es: [
        "de", "la", "que", "el", "en", "y", "a", "los", "del", "se",
        "las", "por", "un", "para", "con", "no", "una", "su", "al", "lo",
        "como", "más", "pero", "sus", "le", "ya", "o", "este", "sí", "porque"
    ],
    fr: [
        "de", "la", "le", "et", "les", "des", "en", "un", "du", "une",
        "que", "est", "pour", "qui", "dans", "a", "par", "plus", "pas", "au",
        "sur", "ne", "se", "ce", "il", "sont", "avec", "tout", "mais", "comme"
    ],
    ja: [
        "私", "これ", "それ", "ある", "する", "いる", "なる", "見る", "行く", "来る",
        "言う", "思う", "知る", "使う", "作る", "食べる", "飲む", "聞く", "読む", "書く",
        "話す", "買う", "待つ", "会う", "学ぶ", "時間", "今日", "明日", "友達", "言葉"
    ],
    pt: [
        "de", "a", "o", "que", "e", "do", "da", "em", "um", "para",
        "com", "não", "uma", "os", "no", "se", "na", "por", "mais", "as",
        "dos", "como", "mas", "foi", "ao", "ele", "das", "tem", "à", "seu"
    ]
};

/* ==========================================================================
   CONFIGURAÇÕES DE IDIOMA E DICIONÁRIO MULTILÍNGUE COMPLETO (UI)
   ========================================================================== */
const LANG_CONFIG = {
    en: {
        name: "English",
        subtitle: "American Immersion Platform",
        welcomeBadge: "AMERICAN",
        flag: "img/bandeira-eua.webp",
        voice: "en-US",
        footer: "Fluency Lab • American Edition • 2026"
    },
    es: {
        name: "Español",
        subtitle: "Plataforma de Inmersión Hispana",
        welcomeBadge: "ESPAÑOL",
        flag: "img/bandeira-espanha.webp",
        voice: "es-ES",
        footer: "Fluency Lab • Edición Española • 2026"
    },
    fr: {
        name: "Français",
        subtitle: "Plateforme d'Immersion Française",
        welcomeBadge: "FRANÇAIS",
        flag: "img/bandeira-franca.jpg",
        voice: "fr-FR",
        footer: "Fluency Lab • Édition Française • 2026"
    },
    ja: {
        name: "日本語",
        subtitle: "日本語イマージョンプラットフォーム",
        welcomeBadge: "日本語",
        flag: "img/bandeira-japao.jpg",
        voice: "ja-JP",
        footer: "Fluency Lab • 日本語エディション • 2026"
    },
    pt: {
        name: "Português",
        subtitle: "Plataforma de Imersão em Português",
        welcomeBadge: "PORTUGUÊS",
        flag: "img/bandeira-brasil.jpg",
        voice: "pt-BR",
        footer: "Fluency Lab • Edição Brasileira • 2026"
    }
};

const UI_TEXTS = {
    pt: {
        welcome: "BEM-VINDO",
        hubTitle: "O que você deseja registrar ou praticar hoje?",
        hubDesc: "Selecione um módulo abaixo para acompanhar seu progresso e evoluir no idioma.",
        navHub: "Início",
        navDash: "Dashboard",
        navCad: "Cadastrar",
        headerAch: "Conquistas",
        listeningGoalTag: "META DE HORAS",
        listeningTitle: "Rastreador de Escuta",
        listeningDesc: "Filmes, séries e podcasts assistidos no idioma com controle de horas e categorias.",
        readingTag: "LEITURA DE LIVROS",
        readingTitle: "Rastreador de Leitura",
        readingDesc: "Livros lidos, contagem de páginas e total de obras concluídas para construir seu hábito.",
        vocabTag: "FLASHCARDS",
        vocabTitle: "Treinador de Vocabulário",
        vocabDesc: "Pratique com exercícios de memória, flashcards interativos e áudio nativo.",
        speechTag: "LEITURA & PRONÚNCIA",
        speechTitle: "Leitor e Fala",
        speechDesc: "Leia histórias por nível, teste sua pronúncia com feedback em tempo real e treine a escuta.",
        achTag: "DESAFIOS & TROFÉUS",
        achTitle: "GALERIA DE CONQUISTAS",
        achDesc: "Desbloqueie conquistas únicas com sua evolução diária nos estudos.",
        typingTag: "FOGUETE & LASER",
        typingTitle: "Jogo de Digitação",
        typingDesc: "Comande seu foguete a laser no espaço destruindo palavras com flashcards, palavras próprias ou top 30.",
        btnAccess: "Acessar o Painel",
        btnTrain: "Treinar Vocabulário",
        btnSpeech: "Praticar Pronúncia",
        btnAch: "Ver Conquistas",
        btnTyping: "Jogar Agora",
        ofTarget: "de",
        goalFixed: "Meta (Horas)",
        progress: "Progresso",
        summaryListening: "Resumo de Escuta",
        summaryListeningDesc: "Volume acumulado no idioma selecionado.",
        realTime: "Tempo Real",
        registered: "Cadastrados",
        hoursByType: "Horas por Tipo de Estudo",
        hoursByTypeDesc: "Separação por Diamante, Prata e Ouro.",
        diamondLabel: "💎 Diamante",
        goldLabel: "🥇 Ouro",
        silverLabel: "🥈 Prata",
        titlesWatched: "Títulos Assistidos",
        titlesWatchedDesc: "Lista de filmes e séries registrados.",
        decimalTotal: "TOTAL DECIMAL:",
        addMediaTitle: "Cadastrar Filme ou Série",
        addMediaDesc: "Adicione suas horas de imersão assistidas.",
        mediaType: "Tipo de Mídia",
        movie: "Filme",
        series: "Série",
        titleName: "Nome do Título",
        coverImg: "Capa (Arquivo de Imagem)",
        listeningMode: "Modo de Listening",
        diamondDesc: "Sem legendas (Treino 100% focado)",
        goldDesc: "Áudio e legendas no idioma estudado",
        silverDesc: "Áudio original com legendas traduzidas",
        hours: "Horas",
        minutes: "Minutos",
        season: "Temporada",
        epCount: "Qtd Episódios",
        avgHours: "Média Ep (Horas)",
        avgMins: "Média Ep (Minutos)",
        saveBtn: "Salvar Registro",
        cancelBtn: "Cancelar",
        totalBooks: "Total de livros lidos.",
        totalPages: "Total Páginas",
        pagesPerBookDesc: "Volume de leitura por obra.",
        registeredBooks: "Livros Cadastrados",
        sumPages: "TOTAL DE PÁGINAS:",
        pagesPerBook: "Páginas Lidas por Livro",
        pagesShort: "págs",
        addBookTitle: "Cadastrar Novo Livro",
        addBookDesc: "Adicione livros lidos para contabilizar páginas.",
        bookTitle: "Título do Livro",
        bookAuthor: "Autor(a) (Opcional)",
        bookPages: "Quantidade de Páginas",
        bookCover: "Capa do Livro",
        clickToFlip: "Clique no cartão para revelar a tradução 🔄",
        translationTag: "Tradução",
        btnWrong: "Não Lembrei",
        btnCorrect: "Lembrei (Certo!)",
        btnNextRandom: "Sortear Próxima Palavra Aleatória",
        totalWords: "Palavras",
        accuracyRate: "Taxa Acerto",
        registeredVocab: "Suas Palavras Cadastradas",
        addWordTitle: "Cadastrar Nova Palavra",
        addWordDesc: "Adicione novos termos para treinos e flashcards.",
        termInLang: "Palavra / Termo no Idioma",
        termTranslation: "Tradução / Significado",
        termExample: "Exemplo de Frase (Opcional)",
        speechPrefix: "Leitura e Pronúncia",
        storyDefaultTitle: "História Curta",
        selectStory: "Texto:",
        difficultyLevel: "Nível:",
        lvlEasy: "Fácil",
        lvlMedium: "Médio",
        lvlHard: "Difícil",
        speechInstruction: "💡 Clique em qualquer palavra para escutar a pronúncia individual. Aperte no botão para escutar a história completa ou no microfone para testar sua leitura em voz alta.",
        btnListenStory: "Escutar História Completa",
        btnStopStory: "Parar Áudio",
        btnRecordVoice: "Gravar e Ver Pronúncia",
        btnStopVoice: "Parar Gravação",
        speechListeningStatus: "Ouvindo... Fale a história em voz alta!",
        speechAccuracyLabel: "de precisão",
        speechNotSupported: "Seu navegador não suporta reconhecimento de voz. Tente usar o Google Chrome.",
        achBannerTag: "Galeria de Troféus",
        achBannerTitle: "Galeria de Conquistas",
        achBannerDesc: "Acompanhe seu progresso e conquiste badges estudando diariamente.",
        achUnlocked: "Desbloqueadas",
        achProgress: "Progresso Geral",
        achUnlockedBadge: "✓ Desbloqueada",
        achLockedBadge: "🔒 Bloqueada",
        filterAll: "Todas",
        filterStreak: "🔥 Ofensiva",
        filterVocab: "🧠 Vocabulário",
        filterListening: "🎧 Listening",
        filterReading: "📖 Leitura",
        filterSpeech: "🎤 Fala",
        filterTyping: "🚀 Foguete Laser",
        filterPolyglot: "🌍 Poliglota",
        typingPrefix: "Missão Espacial a Laser",
        typingMainTitle: "Foguete a Laser",
        typingScore: "Pontuação",
        typingRecord: "Recorde",
        typingCombo: "Combo",
        typingLives: "Escudos",
        typingModeTitle: "Escolha a Fonte das Palavras:",
        typingModeFlashcards: "Flashcards",
        typingModeCustom: "Minhas Palavras",
        typingModeTop30: "Top 30 Mais Usadas",
        typingCustomPlaceholder: "Digite uma palavra no idioma alvo...",
        typingBtnAddWord: "Cadastrar Palavra",
        typingWave: "Setor",
        typingHits: "Alvos",
        typingBtnStart: "Iniciar Missão",
        typingBtnStop: "Abortar",
        typingBtnFullscreen: "Tela Cheia",
        typingBtnExitFullscreen: "Sair da Tela Cheia",
        typingOverlayReadyTitle: "Pronto para Decolar?",
        typingOverlayReadyDesc: "Digite as letras das palavras que avançam no espaço. Cada acerto dispara um feixe de laser do seu foguete!",
        typingOverlayGameOverTitle: "Fim de Partida!",
        typingOverlayGameOverDesc: "Os escudos do foguete foram rompidos. Tente superar seu recorde!",
        typingBtnOverlayStart: "Decolar Agora",
        typingBtnOverlayRestart: "Jogar Novamente",
        typingInputPlaceholder: "Digite aqui para mirar e disparar o laser...",
        typingTargetLabel: "Alvo",
        typingEmptyPool: "Adicione palavras primeiro ou escolha o modo Top 30 Mais Usadas!",
        typingNewRecordBadge: "🏆 NOVO RECORDE!",
        popupStreakTitle: "Foguinho Acendido! 🔥",
        popupStreakDesc: "Excelente! Ofensiva garantida e salva no histórico diário.",
        btnContinue: "Continuar",
        modalStreakTitle: "Estatísticas de Ofensiva",
        modalStreakSub: "Controle diário e histórico persistente",
        currentSeq: "Sequência Atual",
        missedMonth: "Faltas no Mês",
        weekHist: "Histórico da Semana",
        redNote: "Dias sem realizar a tarefa ficam marcados a vermelho.",
        streakDoneNotice: "✅ Tarefa diária concluída hoje! Sua ofensiva está protegida.",
        streakPendingNotice: "⚡ Registre qualquer atividade hoje (Listening, Leitura, Vocabulário, Fala ou Foguete Laser) para acender o foguinho!",
        streakResetTime: "Reseta às 00:00:",
        btnUnderstood: "Entendido",
        studyingLang: "Idioma que está Estudando",
        uiLangLabel: "Idioma da Interface",
        redoOnboarding: "Refazer Perguntas Iniciais",
        btnClose: "Fechar",
        noRecords: "Nenhum registro ainda.",
        noWord: "Nenhuma palavra",
        registeredCount: "Registradas",
        daysText: "dias",
        originText: "Origem",
        weekDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        obTitle1: "Bem-vindo ao Fluency Lab!",
        obDesc1: "Como devemos te chamar e de onde você é?",
        obName: "Seu Nome",
        obOrigin: "Idioma de Origem (Interface)",
        obNext: "Avançar",
        obTitle2: "Qual idioma você vai estudar?",
        obDesc2: "Você poderá alternar entre idiomas no seu perfil depois.",
        obBack: "Voltar",
        obTitle3: "Tudo pronto para a imersão!",
        obDesc3: "Seu painel personalizado foi configurado com sucesso.",
        obFinish: "Começar Jornada"
    },
    en: {
        welcome: "WELCOME",
        hubTitle: "What do you want to log or practice today?",
        hubDesc: "Select a module below to track your progress and master the language.",
        navHub: "Home",
        navDash: "Dashboard",
        navCad: "Add New",
        headerAch: "Achievements",
        listeningGoalTag: "HOURS GOAL",
        listeningTitle: "Listening Tracker",
        listeningDesc: "Movies, TV shows, and podcasts watched in the language with hours and category tracking.",
        readingTag: "BOOK READING",
        readingTitle: "Reading Tracker",
        readingDesc: "Books read, page counts, and completed works to build your reading habit.",
        vocabTag: "FLASHCARDS",
        vocabTitle: "Vocabulary Trainer",
        vocabDesc: "Practice with memory exercises, interactive flashcards, and native audio.",
        speechTag: "READING & SPEAKING",
        speechTitle: "Reader & Speech",
        speechDesc: "Read leveled stories, test your pronunciation with real-time feedback, and train listening.",
        achTag: "CHALLENGES & TROPHIES",
        achTitle: "ACHIEVEMENT GALLERY",
        achDesc: "Unlock unique badges with your daily study progress.",
        typingTag: "ROCKET & LASER",
        typingTitle: "Typing Shooter",
        typingDesc: "Pilot your laser rocket through space blasting words with flashcards, custom words, or top 30.",
        btnAccess: "Open Dashboard",
        btnTrain: "Train Vocabulary",
        btnSpeech: "Practice Speaking",
        btnAch: "View Achievements",
        btnTyping: "Play Now",
        ofTarget: "of",
        goalFixed: "Goal (Hours)",
        progress: "Progress",
        summaryListening: "Listening Summary",
        summaryListeningDesc: "Accumulated volume in the selected language.",
        realTime: "Real Time",
        registered: "Logged",
        hoursByType: "Hours by Study Type",
        hoursByTypeDesc: "Breakdown by Diamond, Gold, and Silver.",
        diamondLabel: "💎 Diamond",
        goldLabel: "🥇 Gold",
        silverLabel: "🥈 Silver",
        titlesWatched: "Watched Titles",
        titlesWatchedDesc: "List of logged movies and shows.",
        decimalTotal: "DECIMAL TOTAL:",
        addMediaTitle: "Add Movie or TV Show",
        addMediaDesc: "Log your watched immersion hours.",
        mediaType: "Media Type",
        movie: "Movie",
        series: "TV Show",
        titleName: "Title Name",
        coverImg: "Cover (Image File)",
        listeningMode: "Listening Mode",
        diamondDesc: "No subtitles (100% focused practice)",
        goldDesc: "Audio and subtitles in the target language",
        silverDesc: "Original audio with translated subtitles",
        hours: "Hours",
        minutes: "Minutes",
        season: "Season",
        epCount: "Episodes Qty",
        avgHours: "Avg Ep (Hours)",
        avgMins: "Avg Ep (Minutes)",
        saveBtn: "Save Entry",
        cancelBtn: "Cancel",
        totalBooks: "Total books read.",
        totalPages: "Total Pages",
        pagesPerBookDesc: "Reading volume per book.",
        registeredBooks: "Logged Books",
        sumPages: "TOTAL PAGES:",
        pagesPerBook: "Pages Read per Book",
        pagesShort: "pages",
        addBookTitle: "Add New Book",
        addBookDesc: "Log read books to count pages.",
        bookTitle: "Book Title",
        bookAuthor: "Author (Optional)",
        bookPages: "Page Count",
        bookCover: "Book Cover",
        clickToFlip: "Click the card to reveal the translation 🔄",
        translationTag: "Translation",
        btnWrong: "Forgot",
        btnCorrect: "Remembered!",
        btnNextRandom: "Draw Next Random Word",
        totalWords: "Words",
        accuracyRate: "Accuracy",
        registeredVocab: "Your Saved Words",
        addWordTitle: "Add New Word",
        addWordDesc: "Add new terms for practice and flashcards.",
        termInLang: "Word / Term in Target Language",
        termTranslation: "Translation / Meaning",
        termExample: "Example Sentence (Optional)",
        speechPrefix: "Reading & Pronunciation",
        storyDefaultTitle: "Short Story",
        selectStory: "Story:",
        difficultyLevel: "Level:",
        lvlEasy: "Easy",
        lvlMedium: "Medium",
        lvlHard: "Hard",
        speechInstruction: "💡 Click any word to hear its individual pronunciation. Click the button to listen to the full story or the microphone to test your reading aloud.",
        btnListenStory: "Listen to Full Story",
        btnStopStory: "Stop Audio",
        btnRecordVoice: "Record & Check Pronunciation",
        btnStopVoice: "Stop Recording",
        speechListeningStatus: "Listening... Read the story aloud!",
        speechAccuracyLabel: "accuracy",
        speechNotSupported: "Your browser does not support speech recognition. Try using Google Chrome.",
        achBannerTag: "Trophy Gallery",
        achBannerTitle: "Achievement Gallery",
        achBannerDesc: "Track your progress and earn badges by studying daily.",
        achUnlocked: "Unlocked",
        achProgress: "Overall Progress",
        achUnlockedBadge: "✓ Unlocked",
        achLockedBadge: "🔒 Locked",
        filterAll: "All",
        filterStreak: "🔥 Streak",
        filterVocab: "🧠 Vocabulary",
        filterListening: "🎧 Listening",
        filterReading: "📖 Reading",
        filterSpeech: "🎤 Speech",
        filterTyping: "🚀 Laser Rocket",
        filterPolyglot: "🌍 Polyglot",
        typingPrefix: "Deep Space Laser Mission",
        typingMainTitle: "Laser Rocket",
        typingScore: "Score",
        typingRecord: "Best Score",
        typingCombo: "Combo",
        typingLives: "Shields",
        typingModeTitle: "Choose Word Source:",
        typingModeFlashcards: "Flashcards",
        typingModeCustom: "My Words",
        typingModeTop30: "Top 30 Most Used",
        typingCustomPlaceholder: "Type a word in the target language...",
        typingBtnAddWord: "Add Word",
        typingWave: "Sector",
        typingHits: "Targets",
        typingBtnStart: "Start Mission",
        typingBtnStop: "Abort",
        typingBtnFullscreen: "Fullscreen",
        typingBtnExitFullscreen: "Exit Fullscreen",
        typingOverlayReadyTitle: "Ready for Liftoff?",
        typingOverlayReadyDesc: "Type the letters of words advancing through space. Every hit fires a laser beam from your rocket!",
        typingOverlayGameOverTitle: "Mission Over!",
        typingOverlayGameOverDesc: "Rocket shields breached. Try to beat your high score!",
        typingBtnOverlayStart: "Launch Now",
        typingBtnOverlayRestart: "Play Again",
        typingInputPlaceholder: "Type here to aim and fire the laser...",
        typingTargetLabel: "Target",
        typingEmptyPool: "Add words first or switch to Top 30 Most Used mode!",
        typingNewRecordBadge: "🏆 NEW RECORD!",
        popupStreakTitle: "Streak Ignited! 🔥",
        popupStreakDesc: "Awesome! Daily streak secured and saved to history.",
        btnContinue: "Continue",
        modalStreakTitle: "Streak Statistics",
        modalStreakSub: "Daily tracking and persistent history",
        currentSeq: "Current Streak",
        missedMonth: "Missed This Month",
        weekHist: "Weekly History",
        redNote: "Days without completing the task are marked in red.",
        streakDoneNotice: "✅ Today's daily task is complete! Your streak is safe.",
        streakPendingNotice: "⚡ Log any activity today (Listening, Reading, Vocabulary, Speech, or Laser Rocket) to ignite your streak!",
        streakResetTime: "Resets at 00:00:",
        btnUnderstood: "Got It",
        studyingLang: "Language You Are Studying",
        uiLangLabel: "Interface Language",
        redoOnboarding: "Redo Initial Setup",
        btnClose: "Close",
        noRecords: "No entries yet.",
        noWord: "No words",
        registeredCount: "Saved",
        daysText: "days",
        originText: "Origin",
        weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        obTitle1: "Welcome to Fluency Lab!",
        obDesc1: "What should we call you and where are you from?",
        obName: "Your Name",
        obOrigin: "Native Language (Interface)",
        obNext: "Next",
        obTitle2: "Which language will you study?",
        obDesc2: "You can switch languages in your profile later.",
        obBack: "Back",
        obTitle3: "All set for immersion!",
        obDesc3: "Your personalized dashboard has been configured.",
        obFinish: "Start Journey"
    },
    es: {
        welcome: "BIENVENIDO",
        hubTitle: "¿Qué deseas registrar o practicar hoy?",
        hubDesc: "Selecciona un módulo abajo para seguir tu progreso y mejorar en el idioma.",
        navHub: "Inicio",
        navDash: "Panel",
        navCad: "Registrar",
        headerAch: "Logros",
        listeningGoalTag: "META DE HORAS",
        listeningTitle: "Rastreador de Escucha",
        listeningDesc: "Películas, series y podcasts vistos en el idioma con control de horas.",
        readingTag: "LECTURA DE LIBROS",
        readingTitle: "Rastreador de Lectura",
        readingDesc: "Libros leídos y conteo de páginas para construir tu hábito.",
        vocabTag: "TARJETAS",
        vocabTitle: "Entrenador de Vocabulario",
        vocabDesc: "Practica con ejercicios de memoria, tarjetas interactivas y audio nativo.",
        speechTag: "LECTURA Y PRONUNCIACIÓN",
        speechTitle: "Lector y Habla",
        speechDesc: "Lee historias por nivel y prueba tu pronunciación en tiempo real.",
        achTag: "DESAFÍOS Y TROFEOS",
        achTitle: "GALERÍA DE LOGROS",
        achDesc: "Desbloquea medallas únicas con tu evolución diaria.",
        typingTag: "COHETE Y LÁSER",
        typingTitle: "Juego de Mecanografía",
        typingDesc: "Comanda tu cohete láser en el espacio destruyendo palabras con tarjetas, palabras propias o top 30.",
        btnAccess: "Abrir Panel",
        btnTrain: "Entrenar Vocabulario",
        btnSpeech: "Practicar Pronunciación",
        btnAch: "Ver Logros",
        btnTyping: "Jugar Ahora",
        ofTarget: "de",
        goalFixed: "Meta (Horas)",
        progress: "Progreso",
        summaryListening: "Resumen de Escucha",
        summaryListeningDesc: "Volumen acumulado en el idioma seleccionado.",
        realTime: "Tiempo Real",
        registered: "Registrados",
        hoursByType: "Horas por Tipo",
        hoursByTypeDesc: "Separación por Diamante, Oro y Plata.",
        diamondLabel: "💎 Diamante",
        goldLabel: "🥇 Oro",
        silverLabel: "🥈 Plata",
        titlesWatched: "Títulos Vistos",
        titlesWatchedDesc: "Lista de películas y series registradas.",
        decimalTotal: "TOTAL DECIMAL:",
        addMediaTitle: "Registrar Película o Serie",
        addMediaDesc: "Añade tus horas de inmersión vistas.",
        mediaType: "Tipo de Medio",
        movie: "Película",
        series: "Serie",
        titleName: "Nombre del Título",
        coverImg: "Portada (Imagen)",
        listeningMode: "Modo de Escucha",
        diamondDesc: "Sin subtítulos (100% enfocado)",
        goldDesc: "Audio y subtítulos en el idioma estudiado",
        silverDesc: "Audio original con subtítulos traducidos",
        hours: "Horas",
        minutes: "Minutos",
        season: "Temporada",
        epCount: "Cant. Episodios",
        avgHours: "Prom. Ep (Horas)",
        avgMins: "Prom. Ep (Minutos)",
        saveBtn: "Guardar",
        cancelBtn: "Cancelar",
        totalBooks: "Total de libros leídos.",
        totalPages: "Total Páginas",
        pagesPerBookDesc: "Volumen de lectura por obra.",
        registeredBooks: "Libros Registrados",
        sumPages: "TOTAL DE PÁGINAS:",
        pagesPerBook: "Páginas Leídas por Libro",
        pagesShort: "págs",
        addBookTitle: "Registrar Nuevo Libro",
        addBookDesc: "Añade libros leídos para contar páginas.",
        bookTitle: "Título del Libro",
        bookAuthor: "Autor(a) (Opcional)",
        bookPages: "Cantidad de Páginas",
        bookCover: "Portada del Libro",
        clickToFlip: "Haz clic en la tarjeta para ver la traducción 🔄",
        translationTag: "Traducción",
        btnWrong: "No Recordé",
        btnCorrect: "¡Recordé!",
        btnNextRandom: "Siguiente Palabra Aleatoria",
        totalWords: "Palabras",
        accuracyRate: "Tasa Acierto",
        registeredVocab: "Tus Palabras Guardadas",
        addWordTitle: "Registrar Nueva Palabra",
        addWordDesc: "Añade nuevos términos para practicar.",
        termInLang: "Palabra en el Idioma",
        termTranslation: "Traducción / Significado",
        termExample: "Ejemplo de Frase (Opcional)",
        speechPrefix: "Lectura y Pronunciación",
        storyDefaultTitle: "Historia Corta",
        selectStory: "Texto:",
        difficultyLevel: "Nivel:",
        lvlEasy: "Fácil",
        lvlMedium: "Medio",
        lvlHard: "Difícil",
        speechInstruction: "💡 Haz clic en cualquier palabra para escuchar su pronunciación. Pulsa el botón para escuchar toda la historia o el micrófono para leer en voz alta.",
        btnListenStory: "Escuchar Historia Completa",
        btnStopStory: "Detener Audio",
        btnRecordVoice: "Grabar y Ver Pronunciación",
        btnStopVoice: "Detener Grabación",
        speechListeningStatus: "Escuchando... ¡Lee la historia en voz alta!",
        speechAccuracyLabel: "de precisión",
        speechNotSupported: "Tu navegador no admite reconocimiento de voz. Prueba con Google Chrome.",
        achBannerTag: "Galería de Trofeos",
        achBannerTitle: "Galería de Logros",
        achBannerDesc: "Sigue tu progreso y gana insignias estudiando a diario.",
        achUnlocked: "Desbloqueados",
        achProgress: "Progreso General",
        achUnlockedBadge: "✓ Desbloqueado",
        achLockedBadge: "🔒 Bloqueado",
        filterAll: "Todos",
        filterStreak: "🔥 Racha",
        filterVocab: "🧠 Vocabulario",
        filterListening: "🎧 Escucha",
        filterReading: "📖 Lectura",
        filterSpeech: "🎤 Habla",
        filterTyping: "🚀 Cohete Láser",
        filterPolyglot: "🌍 Políglota",
        typingPrefix: "Misión Espacial Láser",
        typingMainTitle: "Cohete Láser",
        typingScore: "Puntuación",
        typingRecord: "Récord",
        typingCombo: "Combo",
        typingLives: "Escudos",
        typingModeTitle: "Elige la Fuente de Palabras:",
        typingModeFlashcards: "Tarjetas",
        typingModeCustom: "Mis Palabras",
        typingModeTop30: "Top 30 Más Usadas",
        typingCustomPlaceholder: "Escribe una palabra en el idioma...",
        typingBtnAddWord: "Añadir Palabra",
        typingWave: "Sector",
        typingHits: "Objetivos",
        typingBtnStart: "Iniciar Misión",
        typingBtnStop: "Abortar",
        typingBtnFullscreen: "Pantalla Completa",
        typingBtnExitFullscreen: "Salir de Pantalla Completa",
        typingOverlayReadyTitle: "¿Listo para Despegar?",
        typingOverlayReadyDesc: "Escribe las letras de las palabras que avanzan en el espacio. ¡Cada acierto dispara un rayo láser de tu cohete!",
        typingOverlayGameOverTitle: "¡Fin de Partida!",
        typingOverlayGameOverDesc: "Los escudos fueron superados. ¡Intenta superar tu récord!",
        typingBtnOverlayStart: "Despegar Ahora",
        typingBtnOverlayRestart: "Jugar de Nuevo",
        typingInputPlaceholder: "Escribe aquí para apuntar y disparar...",
        typingTargetLabel: "Objetivo",
        typingEmptyPool: "¡Añade palabras primero o elige Top 30 Más Usadas!",
        typingNewRecordBadge: "🏆 ¡NUEVO RÉCORD!",
        popupStreakTitle: "¡Racha Encendida! 🔥",
        popupStreakDesc: "¡Excelente! Racha diaria guardada en tu historial.",
        btnContinue: "Continuar",
        modalStreakTitle: "Estadísticas de Racha",
        modalStreakSub: "Control diario e historial persistente",
        currentSeq: "Racha Actual",
        missedMonth: "Faltas del Mes",
        weekHist: "Historial Semanal",
        redNote: "Los días sin completar la tarea aparecen en rojo.",
        streakDoneNotice: "✅ ¡Tarea diaria completada hoy! Tu racha está protegida.",
        streakPendingNotice: "⚡ ¡Registra cualquier actividad hoy (Escucha, Lectura, Vocabulario, Habla o Cohete Láser) para encender tu racha!",
        streakResetTime: "Se reinicia a las 00:00:",
        btnUnderstood: "Entendido",
        studyingLang: "Idioma que Estudias",
        uiLangLabel: "Idioma de Interfaz",
        redoOnboarding: "Rehacer Configuración Inicial",
        btnClose: "Cerrar",
        noRecords: "Sin registros aún.",
        noWord: "Sin palabras",
        registeredCount: "Guardadas",
        daysText: "días",
        originText: "Origen",
        weekDays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        obTitle1: "¡Bienvenido a Fluency Lab!",
        obDesc1: "¿Cómo debemos llamarte y de dónde eres?",
        obName: "Tu Nombre",
        obOrigin: "Idioma de Origen",
        obNext: "Siguiente",
        obTitle2: "¿Qué idioma vas a estudiar?",
        obDesc2: "Podrás cambiar de idioma en tu perfil después.",
        obBack: "Volver",
        obTitle3: "¡Todo listo para la inmersión!",
        obDesc3: "Tu panel personalizado está configurado.",
        obFinish: "Comenzar"
    },
    fr: {
        welcome: "BIENVENUE",
        hubTitle: "Que souhaitez-vous enregistrer ou pratiquer aujourd'hui ?",
        hubDesc: "Sélectionnez un module ci-dessous pour suivre vos progrès.",
        navHub: "Accueil",
        navDash: "Tableau",
        navCad: "Ajouter",
        headerAch: "Succès",
        listeningGoalTag: "OBJECTIF D'HEURES",
        listeningTitle: "Suivi d'Écoute",
        listeningDesc: "Films, séries et podcasts regardés avec suivi des heures.",
        readingTag: "LECTURE DE LIVRES",
        readingTitle: "Suivi de Lecture",
        readingDesc: "Livres lus et nombre de pages pour bâtir votre habitude.",
        vocabTag: "CARTES MÉMOIRE",
        vocabTitle: "Entraîneur de Vocabulaire",
        vocabDesc: "Pratiquez avec des cartes interactives et l'audio natif.",
        speechTag: "LECTURE & PRONONCIATION",
        speechTitle: "Lecteur et Parole",
        speechDesc: "Lisez des histoires par niveau et testez votre prononciation.",
        achTag: "DÉFIS & TROPHÉES",
        achTitle: "GALERIE DES SUCCÈS",
        achDesc: "Débloquez des badges uniques grâce à vos études quotidiennes.",
        typingTag: "FUSÉE & LASER",
        typingTitle: "Jeu de Frappe",
        typingDesc: "Pilotez votre fusée laser dans l'espace en détruisant les mots avec vos cartes, vos mots ou le top 30.",
        btnAccess: "Ouvrir le Tableau",
        btnTrain: "Entraîner le Vocabulaire",
        btnSpeech: "Pratiquer la Prononciation",
        btnAch: "Voir les Succès",
        btnTyping: "Jouer",
        ofTarget: "sur",
        goalFixed: "Objectif (Heures)",
        progress: "Progrès",
        summaryListening: "Résumé d'Écoute",
        summaryListeningDesc: "Volume accumulé dans la langue choisie.",
        realTime: "Temps Réel",
        registered: "Enregistrés",
        hoursByType: "Heures par Type",
        hoursByTypeDesc: "Répartition Diamant, Or et Argent.",
        diamondLabel: "💎 Diamant",
        goldLabel: "🥇 Or",
        silverLabel: "🥈 Argent",
        titlesWatched: "Titres Regardés",
        titlesWatchedDesc: "Liste des films et séries enregistrés.",
        decimalTotal: "TOTAL DÉCIMAL :",
        addMediaTitle: "Ajouter un Film ou une Série",
        addMediaDesc: "Ajoutez vos heures d'immersion.",
        mediaType: "Type de Média",
        movie: "Film",
        series: "Série",
        titleName: "Nom du Titre",
        coverImg: "Couverture (Image)",
        listeningMode: "Mode d'Écoute",
        diamondDesc: "Sans sous-titres (100% concentré)",
        goldDesc: "Audio et sous-titres dans la langue étudiée",
        silverDesc: "Audio original avec sous-titres traduits",
        hours: "Heures",
        minutes: "Minutes",
        season: "Saison",
        epCount: "Nb Épisodes",
        avgHours: "Moy. Ép (Heures)",
        avgMins: "Moy. Ép (Minutes)",
        saveBtn: "Enregistrer",
        cancelBtn: "Annuler",
        totalBooks: "Total des livres lus.",
        totalPages: "Total Pages",
        pagesPerBookDesc: "Volume de lecture par livre.",
        registeredBooks: "Livres Enregistrés",
        sumPages: "TOTAL DES PAGES :",
        pagesPerBook: "Pages Lues par Livre",
        pagesShort: "pages",
        addBookTitle: "Ajouter un Nouveau Livre",
        addBookDesc: "Ajoutez des livres lus pour compter les pages.",
        bookTitle: "Titre du Livre",
        bookAuthor: "Auteur (Optionnel)",
        bookPages: "Nombre de Pages",
        bookCover: "Couverture",
        clickToFlip: "Cliquez sur la carte pour voir la traduction 🔄",
        translationTag: "Traduction",
        btnWrong: "Oublié",
        btnCorrect: "Retenu !",
        btnNextRandom: "Mot Aléatoire Suivant",
        totalWords: "Mots",
        accuracyRate: "Réussite",
        registeredVocab: "Vos Mots Enregistrés",
        addWordTitle: "Ajouter un Nouveau Mot",
        addWordDesc: "Ajoutez de nouveaux termes pour réviser.",
        termInLang: "Mot dans la Langue",
        termTranslation: "Traduction / Sens",
        termExample: "Exemple de Phrase (Optionnel)",
        speechPrefix: "Lecture & Prononciation",
        storyDefaultTitle: "Histoire Courte",
        selectStory: "Texte :",
        difficultyLevel: "Niveau :",
        lvlEasy: "Facile",
        lvlMedium: "Moyen",
        lvlHard: "Difficile",
        speechInstruction: "💡 Cliquez sur un mot pour écouter sa prononciation. Utilisez les boutons pour écouter toute l'histoire ou tester votre voix.",
        btnListenStory: "Écouter l'Histoire Complète",
        btnStopStory: "Arrêter l'Audio",
        btnRecordVoice: "Enregistrer et Vérifier",
        btnStopVoice: "Arrêter",
        speechListeningStatus: "Écoute en cours... Lisez à voix haute !",
        speechAccuracyLabel: "de précision",
        speechNotSupported: "Votre navigateur ne supporte pas la reconnaissance vocale. Essayez Google Chrome.",
        achBannerTag: "Galerie des Trophées",
        achBannerTitle: "Galerie des Succès",
        achBannerDesc: "Suivez vos progrès et gagnez des badges chaque jour.",
        achUnlocked: "Débloqués",
        achProgress: "Progrès Global",
        achUnlockedBadge: "✓ Débloqué",
        achLockedBadge: "🔒 Verrouillé",
        filterAll: "Tous",
        filterStreak: "🔥 Série",
        filterVocab: "🧠 Vocabulaire",
        filterListening: "🎧 Écoute",
        filterReading: "📖 Lecture",
        filterSpeech: "🎤 Parole",
        filterTyping: "🚀 Fusée Laser",
        filterPolyglot: "🌍 Polyglotte",
        typingPrefix: "Mission Spatiale Laser",
        typingMainTitle: "Fusée Laser",
        typingScore: "Score",
        typingRecord: "Record",
        typingCombo: "Combo",
        typingLives: "Boucliers",
        typingModeTitle: "Source des Mots :",
        typingModeFlashcards: "Cartes",
        typingModeCustom: "Mes Mots",
        typingModeTop30: "Top 30 Plus Utilisés",
        typingCustomPlaceholder: "Entrez un mot dans la langue cible...",
        typingBtnAddWord: "Ajouter le Mot",
        typingWave: "Secteur",
        typingHits: "Cibles",
        typingBtnStart: "Lancer la Mission",
        typingBtnStop: "Abandonner",
        typingBtnFullscreen: "Plein Écran",
        typingBtnExitFullscreen: "Quitter le Plein Écran",
        typingOverlayReadyTitle: "Prêt pour le Décollage ?",
        typingOverlayReadyDesc: "Tapez les lettres des mots dans l'espace. Chaque réussite tire un rayon laser depuis votre fusée !",
        typingOverlayGameOverTitle: "Partie Terminée !",
        typingOverlayGameOverDesc: "Vos boucliers ont cédé. Essayez de battre votre record !",
        typingBtnOverlayStart: "Décoller",
        typingBtnOverlayRestart: "Rejouer",
        typingInputPlaceholder: "Tapez ici pour viser et tirer au laser...",
        typingTargetLabel: "Cible",
        typingEmptyPool: "Ajoutez des mots ou choisissez le mode Top 30 !",
        typingNewRecordBadge: "🏆 NOUVEAU RECORD !",
        popupStreakTitle: "Série Allumée ! 🔥",
        popupStreakDesc: "Bravo ! Votre série quotidienne est enregistrée.",
        btnContinue: "Continuer",
        modalStreakTitle: "Statistiques de Série",
        modalStreakSub: "Suivi quotidien et historique",
        currentSeq: "Série Actuelle",
        missedMonth: "Manqués ce Mois",
        weekHist: "Historique Hebdomadaire",
        redNote: "Les jours manqués sont marqués en rouge.",
        streakDoneNotice: "✅ Tâche quotidienne accomplie aujourd'hui ! Votre série est protégée.",
        streakPendingNotice: "⚡ Enregistrez une activité aujourd'hui (Écoute, Lecture, Vocabulaire, Parole ou Fusée Laser) pour allumer votre série !",
        streakResetTime: "Réinitialise à 00h00 :",
        btnUnderstood: "Compris",
        studyingLang: "Langue Étudiée",
        uiLangLabel: "Langue de l'Interface",
        redoOnboarding: "Refaire la Configuration",
        btnClose: "Fermer",
        noRecords: "Aucun enregistrement.",
        noWord: "Aucun mot",
        registeredCount: "Enregistrés",
        daysText: "jours",
        originText: "Origine",
        weekDays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
        obTitle1: "Bienvenue sur Fluency Lab !",
        obDesc1: "Comment devons-nous vous appeler ?",
        obName: "Votre Nom",
        obOrigin: "Langue d'Origine",
        obNext: "Suivant",
        obTitle2: "Quelle langue étudiez-vous ?",
        obDesc2: "Vous pourrez changer plus tard dans votre profil.",
        obBack: "Retour",
        obTitle3: "Tout est prêt !",
        obDesc3: "Votre tableau personnalisé est configuré.",
        obFinish: "Commencer"
    },
    ja: {
        welcome: "ようこそ",
        hubTitle: "今日は何を記録・練習しますか？",
        hubDesc: "下のモジュールを選んで学習の進捗を管理しましょう。",
        navHub: "ホーム",
        navDash: "ダッシュボード",
        navCad: "新規登録",
        headerAch: "実績",
        listeningGoalTag: "目標時間",
        listeningTitle: "リスニング記録",
        listeningDesc: "映画やドラマの視聴時間をカテゴリー別に管理します。",
        readingTag: "読書記録",
        readingTitle: "リーディング記録",
        readingDesc: "読んだ本とページ数を記録して読書習慣を作ります。",
        vocabTag: "フラッシュカード",
        vocabTitle: "単語トレーナー",
        vocabDesc: "フラッシュカードとネイティブ音声で単語を練習します。",
        speechTag: "リーディング＆発音",
        speechTitle: "朗読とスピーキング",
        speechDesc: "レベル別の物語を読み、リアルタイムで発音をチェックします。",
        achTag: "チャレンジ＆トロフィー",
        achTitle: "実績ギャラリー",
        achDesc: "毎日の学習で特別なバッジを獲得しましょう。",
        typingTag: "ロケット＆レーザー",
        typingTitle: "タイピングゲーム",
        typingDesc: "宇宙でロケットからレーザーを発射して単語を撃ち落とそう！カード・登録単語・Top30に対応。",
        btnAccess: "パネルを開く",
        btnTrain: "単語を練習",
        btnSpeech: "発音を練習",
        btnAch: "実績を見る",
        btnTyping: "今すぐプレイ",
        ofTarget: "/",
        goalFixed: "目標 (時間)",
        progress: "進捗",
        summaryListening: "リスニング概要",
        summaryListeningDesc: "選択した言語の累計視聴時間。",
        realTime: "合計時間",
        registered: "登録数",
        hoursByType: "学習タイプ別時間",
        hoursByTypeDesc: "ダイヤモンド・ゴールド・シルバー別。",
        diamondLabel: "💎 ダイヤモンド",
        goldLabel: "🥇 ゴールド",
        silverLabel: "🥈 シルバー",
        titlesWatched: "視聴タイトル",
        titlesWatchedDesc: "登録済みの映画・ドラマ一覧。",
        decimalTotal: "合計時間:",
        addMediaTitle: "映画・ドラマを登録",
        addMediaDesc: "視聴したイマージョン時間を追加します。",
        mediaType: "メディア種類",
        movie: "映画",
        series: "ドラマ・アニメ",
        titleName: "タイトル名",
        coverImg: "カバー画像",
        listeningMode: "リスニングモード",
        diamondDesc: "字幕なし（100%集中トレーニング）",
        goldDesc: "学習言語の音声＋学習言語の字幕",
        silverDesc: "原語音声＋翻訳字幕",
        hours: "時間",
        minutes: "分",
        season: "シーズン",
        epCount: "話数",
        avgHours: "1話平均 (時間)",
        avgMins: "1話平均 (分)",
        saveBtn: "保存する",
        cancelBtn: "キャンセル",
        totalBooks: "読了した本の合計。",
        totalPages: "合計ページ数",
        pagesPerBookDesc: "本ごとの読書量。",
        registeredBooks: "登録済みの本",
        sumPages: "合計ページ数:",
        pagesPerBook: "本別の読書ページ数",
        pagesShort: "ページ",
        addBookTitle: "新しい本を登録",
        addBookDesc: "読んだ本を追加してページ数を記録します。",
        bookTitle: "本のタイトル",
        bookAuthor: "著者 (任意)",
        bookPages: "ページ数",
        bookCover: "表紙画像",
        clickToFlip: "カードをクリックして訳を表示 🔄",
        translationTag: "意味・翻訳",
        btnWrong: "忘れた",
        btnCorrect: "覚えた！",
        btnNextRandom: "次のランダム単語",
        totalWords: "単語数",
        accuracyRate: "正答率",
        registeredVocab: "登録済みの単語",
        addWordTitle: "新しい単語を登録",
        addWordDesc: "練習用の新しい単語を追加します。",
        termInLang: "学習言語の単語",
        termTranslation: "翻訳・意味",
        termExample: "例文 (任意)",
        speechPrefix: "リーディング＆発音",
        storyDefaultTitle: "短い物語",
        selectStory: "物語:",
        difficultyLevel: "レベル:",
        lvlEasy: "初級",
        lvlMedium: "中級",
        lvlHard: "上級",
        speechInstruction: "💡 単語をクリックすると個別の発音を聞けます。ボタンで全文再生やマイク録音による発音チェックができます。",
        btnListenStory: "全文を聞く",
        btnStopStory: "音声を停止",
        btnRecordVoice: "録音して発音チェック",
        btnStopVoice: "録音を停止",
        speechListeningStatus: "聞き取り中... 声に出して読んでください！",
        speechAccuracyLabel: "の一致度",
        speechNotSupported: "お使いのブラウザは音声認識に対応していません。Google Chromeをお試しください。",
        achBannerTag: "トロフィーギャラリー",
        achBannerTitle: "実績ギャラリー",
        achBannerDesc: "毎日の学習でバッジをアンロックしましょう。",
        achUnlocked: "解除済み",
        achProgress: "全体の進捗",
        achUnlockedBadge: "✓ 解除済み",
        achLockedBadge: "🔒 未解除",
        filterAll: "すべて",
        filterStreak: "🔥 連続記録",
        filterVocab: "🧠 単語",
        filterListening: "🎧 リスニング",
        filterReading: "📖 読書",
        filterSpeech: "🎤 スピーキング",
        filterTyping: "🚀 ロケットレーザー",
        filterPolyglot: "🌍 多言語",
        typingPrefix: "宇宙レーザーミッション",
        typingMainTitle: "レーザーロケット",
        typingScore: "スコア",
        typingRecord: "ハイスコア",
        typingCombo: "コンボ",
        typingLives: "シールド",
        typingModeTitle: "単語ソースを選択:",
        typingModeFlashcards: "フラッシュカード",
        typingModeCustom: "マイ単語",
        typingModeTop30: "よく使う単語 Top 30",
        typingCustomPlaceholder: "学習言語の単語を入力...",
        typingBtnAddWord: "単語を追加",
        typingWave: "セクター",
        typingHits: "撃破数",
        typingBtnStart: "ミッション開始",
        typingBtnStop: "中止",
        typingBtnFullscreen: "全画面表示",
        typingBtnExitFullscreen: "全画面を終了",
        typingOverlayReadyTitle: "発射準備完了？",
        typingOverlayReadyDesc: "宇宙を進む単語の文字を入力しよう。1文字正解するごとにロケットからレーザーが発射されます！",
        typingOverlayGameOverTitle: "ミッション終了！",
        typingOverlayGameOverDesc: "シールドが突破されました。ハイスコア更新に挑戦しよう！",
        typingBtnOverlayStart: "今すぐ発射",
        typingBtnOverlayRestart: "もう一度プレイ",
        typingInputPlaceholder: "ここに入力してレーザー発射...",
        typingTargetLabel: "ターゲット",
        typingEmptyPool: "単語を登録するか、Top 30モードを選択してください！",
        typingNewRecordBadge: "🏆 新記録達成！",
        popupStreakTitle: "連続記録達成！🔥",
        popupStreakDesc: "素晴らしい！今日の学習記録が保存されました。",
        btnContinue: "続ける",
        modalStreakTitle: "連続学習統計",
        modalStreakSub: "毎日の学習履歴",
        currentSeq: "現在の連続日数",
        missedMonth: "今月の未達成日",
        weekHist: "今週の履歴",
        redNote: "学習しなかった日は赤色で表示されます。",
        streakDoneNotice: "✅ 今日の学習タスクは完了しています！連続記録は安全です。",
        streakPendingNotice: "⚡ 今日いずれかの学習（リスニング・読書・単語・発音・レーザーロケット）を記録して連続記録をつなげましょう！",
        streakResetTime: "00:00にリセット:",
        btnUnderstood: "了解",
        studyingLang: "学習中の言語",
        uiLangLabel: "表示言語",
        redoOnboarding: "初期設定をやり直す",
        btnClose: "閉じる",
        noRecords: "まだ記録がありません。",
        noWord: "単語がありません",
        registeredCount: "登録済み",
        daysText: "日",
        originText: "出身",
        weekDays: ["日", "月", "火", "水", "木", "金", "土"],
        obTitle1: "Fluency Labへようこそ！",
        obDesc1: "お名前と使用言語を教えてください。",
        obName: "お名前",
        obOrigin: "表示言語",
        obNext: "次へ",
        obTitle2: "どの言語を学習しますか？",
        obDesc2: "後からプロフィールで変更できます。",
        obBack: "戻る",
        obTitle3: "準備完了！",
        obDesc3: "あなた専用の学習ダッシュボードが完成しました。",
        obFinish: "学習を始める"
    }
};

/* ==========================================================================
   CONQUISTAS MULTILÍNGUES (PT, EN, ES, FR, JA)
   ========================================================================== */
const ACH_TEXTS = {
    pt: {
        st_1: ["Primeira Chama", "Complete 1 dia de ofensiva."],
        st_3: ["Ritmo Inicial", "Mantenha 3 dias seguidos de estudo."],
        st_7: ["Semana Perfeita", "Complete 7 dias seguidos de estudo."],
        st_14: ["Duas Semanas Firmes", "Alcance 14 dias de ofensiva."],
        st_30: ["Mês Imparável", "Alcance 30 dias seguidos de estudo."],
        st_60: ["Hábito de Aço", "Alcance 60 dias de ofensiva."],
        st_100: ["Centurião da Fluência", "Alcance 100 dias seguidos."],
        vc_1: ["Primeira Palavra", "Cadastre sua 1ª palavra."],
        vc_10: ["Colecionador Iniciante", "Cadastre 10 palavras."],
        vc_25: ["Mente Expansiva", "Cadastre 25 palavras."],
        vc_50: ["Banco de Palavras", "Cadastre 50 palavras."],
        vc_100: ["Léxico Sólido", "Cadastre 100 palavras."],
        vc_250: ["Mestre do Vocabulário", "Cadastre 250 palavras."],
        vc_hit10: ["Memória Afiada", "Acerte 10 revisões de flashcards."],
        vc_hit50: ["Memória Fotográfica", "Acerte 50 revisões de flashcards."],
        ls_1: ["Primeira Sessão", "Registre seu 1º título assistido."],
        ls_5h: ["Ouvido Atento", "Acumule 5 horas de listening."],
        ls_25h: ["Maratonista de Imersão", "Acumule 25 horas de listening."],
        ls_50h: ["Cinéfilo Bilíngue", "Acumule 50 horas de listening."],
        ls_100h: ["100 Horas de Escuta", "Alcance 100 horas de imersão."],
        ls_250h: ["Compreensão Natural", "Alcance 250 horas de imersão."],
        ls_500h: ["Meio Milhar", "Alcance 500 horas de imersão."],
        ls_1000h: ["Lenda das 1000 Horas", "Alcance 1000 horas de imersão."],
        rd_1: ["Primeiro Capítulo", "Cadastre seu 1º livro lido."],
        rd_3: ["Leitor Constante", "Registre 3 livros lidos."],
        rd_10: ["Biblioteca Pessoal", "Registre 10 livros lidos."],
        rd_100p: ["100 Páginas", "Leia 100 páginas no total."],
        rd_500p: ["500 Páginas", "Leia 500 páginas no total."],
        rd_1000p: ["Devorador de Livros", "Leia 1.000 páginas no total."],
        sp_1: ["Primeira Voz", "Complete 1 leitura em voz alta no Leitor e Fala."],
        sp_5: ["Voz Solta", "Complete 5 leituras em voz alta."],
        sp_15: ["Orador em Treino", "Complete 15 leituras em voz alta."],
        sp_acc85: ["Pronúncia Clara", "Alcance 85%+ de precisão em 3 leituras."],
        sp_perf1: ["Dicção Impecável", "Consiga 100% de precisão em uma história."],
        sp_perf5: ["Nativo no Microfone", "Consiga 100% de precisão em 5 histórias."],
        tp_1: ["Primeiro Disparo", "Jogue 1 partida no Foguete a Laser."],
        tp_w10: ["Artilheiro Iniciante", "Destrua 10 palavras no Foguete a Laser."],
        tp_w50: ["Mira Rápida", "Destrua 50 palavras no Foguete a Laser."],
        tp_w200: ["Tempestade de Laser", "Destrua 200 palavras no Foguete a Laser."],
        tp_c15: ["Combo em Chamas", "Alcance um combo de 15 acertos seguidos."],
        tp_s500: ["Comandante do Teclado", "Alcance 500 pontos em qualquer idioma."],
        tp_s1500: ["Lenda do Foguete", "Alcance 1.500 pontos em qualquer idioma."],
        pg_2: ["Explorador Bilíngue", "Tenha registros em 2 idiomas diferentes."],
        pg_3: ["Trilíngue em Ação", "Tenha registros em 3 idiomas diferentes."],
        pg_4: ["Cidadão do Mundo", "Tenha registros em 4 idiomas diferentes."]
    },
    en: {
        st_1: ["First Spark", "Complete a 1-day streak."],
        st_3: ["Early Rhythm", "Keep a 3-day study streak."],
        st_7: ["Perfect Week", "Complete a 7-day study streak."],
        st_14: ["Two Weeks Strong", "Reach a 14-day streak."],
        st_30: ["Unstoppable Month", "Reach a 30-day study streak."],
        st_60: ["Iron Habit", "Reach a 60-day streak."],
        st_100: ["Fluency Centurion", "Reach a 100-day streak."],
        vc_1: ["First Word", "Save your 1st word."],
        vc_10: ["Rookie Collector", "Save 10 words."],
        vc_25: ["Expanding Mind", "Save 25 words."],
        vc_50: ["Word Bank", "Save 50 words."],
        vc_100: ["Solid Lexicon", "Save 100 words."],
        vc_250: ["Vocabulary Master", "Save 250 words."],
        vc_hit10: ["Sharp Memory", "Get 10 flashcard reviews right."],
        vc_hit50: ["Photographic Memory", "Get 50 flashcard reviews right."],
        ls_1: ["First Session", "Log your 1st watched title."],
        ls_5h: ["Attentive Ear", "Accumulate 5 listening hours."],
        ls_25h: ["Immersion Marathoner", "Accumulate 25 listening hours."],
        ls_50h: ["Bilingual Cinephile", "Accumulate 50 listening hours."],
        ls_100h: ["100 Listening Hours", "Reach 100 immersion hours."],
        ls_250h: ["Natural Comprehension", "Reach 250 immersion hours."],
        ls_500h: ["Half Thousand", "Reach 500 immersion hours."],
        ls_1000h: ["1000-Hour Legend", "Reach 1,000 immersion hours."],
        rd_1: ["First Chapter", "Log your 1st read book."],
        rd_3: ["Steady Reader", "Log 3 read books."],
        rd_10: ["Personal Library", "Log 10 read books."],
        rd_100p: ["100 Pages", "Read 100 pages total."],
        rd_500p: ["500 Pages", "Read 500 pages total."],
        rd_1000p: ["Book Devourer", "Read 1,000 pages total."],
        sp_1: ["First Voice", "Complete 1 read-aloud in Reader & Speech."],
        sp_5: ["Confident Voice", "Complete 5 read-aloud sessions."],
        sp_15: ["Speaker in Training", "Complete 15 read-aloud sessions."],
        sp_acc85: ["Clear Pronunciation", "Reach 85%+ accuracy in 3 readings."],
        sp_perf1: ["Spotless Diction", "Get 100% accuracy on one story."],
        sp_perf5: ["Mic Native", "Get 100% accuracy on 5 stories."],
        tp_1: ["First Shot", "Play 1 match in Laser Rocket."],
        tp_w10: ["Rookie Gunner", "Blast 10 words in Laser Rocket."],
        tp_w50: ["Quick Aim", "Blast 50 words in Laser Rocket."],
        tp_w200: ["Laser Storm", "Blast 200 words in Laser Rocket."],
        tp_c15: ["Blazing Combo", "Reach a 15-hit combo streak."],
        tp_s500: ["Keyboard Commander", "Score 500 points in any language."],
        tp_s1500: ["Rocket Legend", "Score 1,500 points in any language."],
        pg_2: ["Bilingual Explorer", "Have entries in 2 different languages."],
        pg_3: ["Trilingual Action", "Have entries in 3 different languages."],
        pg_4: ["Citizen of the World", "Have entries in 4 different languages."]
    },
    es: {
        st_1: ["Primera Llama", "Completa 1 día de racha."],
        st_3: ["Ritmo Inicial", "Mantén 3 días seguidos de estudio."],
        st_7: ["Semana Perfecta", "Completa 7 días seguidos de estudio."],
        st_14: ["Dos Semanas Firmes", "Alcanza 14 días de racha."],
        st_30: ["Mes Imparable", "Alcanza 30 días seguidos."],
        st_60: ["Hábito de Acero", "Alcanza 60 días de racha."],
        st_100: ["Centurión de Fluidez", "Alcanza 100 días seguidos."],
        vc_1: ["Primera Palabra", "Guarda tu 1.ª palabra."],
        vc_10: ["Coleccionista Inicial", "Guarda 10 palabras."],
        vc_25: ["Mente Expansiva", "Guarda 25 palabras."],
        vc_50: ["Banco de Palabras", "Guarda 50 palabras."],
        vc_100: ["Léxico Sólido", "Guarda 100 palabras."],
        vc_250: ["Maestro del Vocabulario", "Guarda 250 palabras."],
        vc_hit10: ["Memoria Afilada", "Acierta 10 revisiones de tarjetas."],
        vc_hit50: ["Memoria Fotográfica", "Acierta 50 revisiones de tarjetas."],
        ls_1: ["Primera Sesión", "Registra tu 1.er título visto."],
        ls_5h: ["Oído Atento", "Acumula 5 horas de escucha."],
        ls_25h: ["Maratonista", "Acumula 25 horas de escucha."],
        ls_50h: ["Cinéfilo Bilingüe", "Acumula 50 horas de escucha."],
        ls_100h: ["100 Horas de Escucha", "Alcanza 100 horas de inmersión."],
        ls_250h: ["Comprensión Natural", "Alcanza 250 horas de inmersión."],
        ls_500h: ["Medio Millar", "Alcanza 500 horas de inmersión."],
        ls_1000h: ["Leyenda de 1000 Horas", "Alcanza 1000 horas de inmersión."],
        rd_1: ["Primer Capítulo", "Registra tu 1.er libro leído."],
        rd_3: ["Lector Constante", "Registra 3 libros leídos."],
        rd_10: ["Biblioteca Personal", "Registra 10 libros leídos."],
        rd_100p: ["100 Páginas", "Lee 100 páginas en total."],
        rd_500p: ["500 Páginas", "Lee 500 páginas en total."],
        rd_1000p: ["Devorador de Libros", "Lee 1.000 páginas en total."],
        sp_1: ["Primera Voz", "Completa 1 lectura en voz alta."],
        sp_5: ["Voz Suelta", "Completa 5 lecturas en voz alta."],
        sp_15: ["Orador en Entrenamiento", "Completa 15 lecturas en voz alta."],
        sp_acc85: ["Pronunciación Clara", "Logra 85%+ de precisión en 3 lecturas."],
        sp_perf1: ["Dicción Impecable", "Logra 100% de precisión en una historia."],
        sp_perf5: ["Nativo al Micrófono", "Logra 100% de precisión en 5 historias."],
        tp_1: ["Primer Disparo", "Juega 1 partida en Cohete Láser."],
        tp_w10: ["Artillero Inicial", "Destruye 10 palabras en Cohete Láser."],
        tp_w50: ["Puntería Rápida", "Destruye 50 palabras en Cohete Láser."],
        tp_w200: ["Tormenta Láser", "Destruye 200 palabras en Cohete Láser."],
        tp_c15: ["Combo en Llamas", "Alcanza un combo de 15 aciertos."],
        tp_s500: ["Comandante del Teclado", "Alcanza 500 puntos en cualquier idioma."],
        tp_s1500: ["Leyenda del Cohete", "Alcanza 1.500 puntos en cualquier idioma."],
        pg_2: ["Explorador Bilingüe", "Ten registros en 2 idiomas distintos."],
        pg_3: ["Trilingüe en Acción", "Ten registros en 3 idiomas distintos."],
        pg_4: ["Ciudadano del Mundo", "Ten registros en 4 idiomas distintos."]
    },
    fr: {
        st_1: ["Première Étincelle", "Complétez 1 jour de série."],
        st_3: ["Bon Rythme", "Gardez une série de 3 jours."],
        st_7: ["Semaine Parfaite", "Complétez une série de 7 jours."],
        st_14: ["Deux Semaines Solides", "Atteignez 14 jours de série."],
        st_30: ["Mois Imparable", "Atteignez 30 jours de série."],
        st_60: ["Habitude d'Acier", "Atteignez 60 jours de série."],
        st_100: ["Centurion de la Fluidité", "Atteignez 100 jours de série."],
        vc_1: ["Premier Mot", "Enregistrez votre 1er mot."],
        vc_10: ["Collectionneur Débutant", "Enregistrez 10 mots."],
        vc_25: ["Esprit Curieux", "Enregistrez 25 mots."],
        vc_50: ["Banque de Mots", "Enregistrez 50 mots."],
        vc_100: ["Lexique Solide", "Enregistrez 100 mots."],
        vc_250: ["Maître du Vocabulaire", "Enregistrez 250 mots."],
        vc_hit10: ["Mémoire Vive", "Réussissez 10 révisions de cartes."],
        vc_hit50: ["Mémoire Photographique", "Réussissez 50 révisions de cartes."],
        ls_1: ["Première Session", "Ajoutez votre 1er titre regardé."],
        ls_5h: ["Oreille Attentive", "Cumulez 5 heures d'écoute."],
        ls_25h: ["Marathonien", "Cumulez 25 heures d'écoute."],
        ls_50h: ["Cinéphile Bilingue", "Cumulez 50 heures d'écoute."],
        ls_100h: ["100 Heures d'Écoute", "Atteignez 100 heures d'immersion."],
        ls_250h: ["Compréhension Naturelle", "Atteignez 250 heures d'immersion."],
        ls_500h: ["Cinq Cents Heures", "Atteignez 500 heures d'immersion."],
        ls_1000h: ["Légende des 1000 Heures", "Atteignez 1000 heures d'immersion."],
        rd_1: ["Premier Chapitre", "Ajoutez votre 1er livre lu."],
        rd_3: ["Lecteur Régulier", "Ajoutez 3 livres lus."],
        rd_10: ["Bibliothèque Personnelle", "Ajoutez 10 livres lus."],
        rd_100p: ["100 Pages", "Lisez 100 pages au total."],
        rd_500p: ["500 Pages", "Lisez 500 pages au total."],
        rd_1000p: ["Dévorateur de Livres", "Lisez 1 000 pages au total."],
        sp_1: ["Première Voix", "Terminez 1 lecture à voix haute."],
        sp_5: ["Voix Assurée", "Terminez 5 lectures à voix haute."],
        sp_15: ["Orateur en Entraînement", "Terminez 15 lectures à voix haute."],
        sp_acc85: ["Prononciation Claire", "Atteignez 85%+ de précision sur 3 lectures."],
        sp_perf1: ["Diction Impeccable", "Obtenez 100% de précision sur une histoire."],
        sp_perf5: ["Natif au Micro", "Obtenez 100% de précision sur 5 histoires."],
        tp_1: ["Premier Tir", "Jouez 1 partie dans Fusée Laser."],
        tp_w10: ["Artilleur Débutant", "Détruisez 10 mots dans Fusée Laser."],
        tp_w50: ["Visée Rapide", "Détruisez 50 mots dans Fusée Laser."],
        tp_w200: ["Tempête Laser", "Détruisez 200 mots dans Fusée Laser."],
        tp_c15: ["Combo Enflammé", "Atteignez un combo de 15 réussites."],
        tp_s500: ["Commandant du Clavier", "Marquez 500 points dans n'importe quelle langue."],
        tp_s1500: ["Légende de la Fusée", "Marquez 1 500 points dans n'importe quelle langue."],
        pg_2: ["Explorateur Bilingue", "Ayez des entrées dans 2 langues différentes."],
        pg_3: ["Trilingue en Action", "Ayez des entrées dans 3 langues différentes."],
        pg_4: ["Citoyen du Monde", "Ayez des entrées dans 4 langues différentes."]
    },
    ja: {
        st_1: ["最初の火種", "1日連続学習を達成しよう。"],
        st_3: ["順調なリズム", "3日連続学習を達成しよう。"],
        st_7: ["パーフェクト週間", "7日連続学習を達成しよう。"],
        st_14: ["2週間の継続", "14日連続学習を達成しよう。"],
        st_30: ["止まらない1ヶ月", "30日連続学習を達成しよう。"],
        st_60: ["鋼の習慣", "60日連続学習を達成しよう。"],
        st_100: ["流暢さの百人隊長", "100日連続学習を達成しよう。"],
        vc_1: ["最初の単語", "1つ目の単語を登録しよう。"],
        vc_10: ["単語コレクター入門", "10個の単語を登録しよう。"],
        vc_25: ["広がる知識", "25個の単語を登録しよう。"],
        vc_50: ["単語バンク", "50個の単語を登録しよう。"],
        vc_100: ["確かな語彙力", "100個の単語を登録しよう。"],
        vc_250: ["単語マスター", "250個の単語を登録しよう。"],
        vc_hit10: ["鋭い記憶力", "フラッシュカードに10回正解しよう。"],
        vc_hit50: ["写真のような記憶力", "フラッシュカードに50回正解しよう。"],
        ls_1: ["最初のセッション", "1つ目の視聴タイトルを記録しよう。"],
        ls_5h: ["集中リスナー", "リスニング5時間を達成しよう。"],
        ls_25h: ["イマージョンランナー", "リスニング25時間を達成しよう。"],
        ls_50h: ["バイリンガルシネフィル", "リスニング50時間を達成しよう。"],
        ls_100h: ["100時間リスニング", "100時間の視聴を達成しよう。"],
        ls_250h: ["自然な理解力", "250時間の視聴を達成しよう。"],
        ls_500h: ["500時間の壁", "500時間の視聴を達成しよう。"],
        ls_1000h: ["1000時間のレジェンド", "1000時間の視聴を達成しよう。"],
        rd_1: ["第1章", "1冊目の読了本を記録しよう。"],
        rd_3: [" 꾸준なリーダー", "3冊の本を記録しよう。"],
        rd_10: ["マイライブラリ", "10冊の本を記録しよう。"],
        rd_100p: ["100ページ達成", "合計100ページ読もう。"],
        rd_500p: ["500ページ達成", "合計500ページ読もう。"],
        rd_1000p: ["読書家マスター", "合計1,000ページ読もう。"],
        sp_1: ["最初の声", "朗読チェックを1回完了しよう。"],
        sp_5: ["伸びやかな声", "朗読チェックを5回完了しよう。"],
        sp_15: ["スピーカー修行中", "朗読チェックを15回完了しよう。"],
        sp_acc85: ["クリアな発音", "3回の朗読で85%以上の一致度を出そう。"],
        sp_perf1: ["完璧な発音", "物語で100%の一致度を達成しよう。"],
        sp_perf5: ["マイクの達人", "5つの物語で100%の一致度を達成しよう。"],
        tp_1: ["初ショット", "レーザーロケットを1回プレイしよう。"],
        tp_w10: ["ルーキーガンナー", "10個の単語を撃ち落とそう。"],
        tp_w50: ["クイックエイム", "50個の単語を撃ち落とそう。"],
        tp_w200: ["レーザーストーム", "200個の単語を撃ち落とそう。"],
        tp_c15: ["炎のコンボ", "15連続コンボを達成しよう。"],
        tp_s500: ["キーボード司令官", "いずれかの言語で500点達成しよう。"],
        tp_s1500: ["ロケットレジェンド", "いずれかの言語で1,500点達成しよう。"],
        pg_2: ["バイリンガル探検家", "2言語以上で記録を残そう。"],
        pg_3: ["トリリンガル挑戦", "3言語以上で記録を残そう。"],
        pg_4: ["世界の市民", "4言語以上で記録を残そう。"]
    }
};

/* ==========================================================================
   SISTEMA DE CONQUISTAS
   ========================================================================== */
const ACHIEVEMENTS_LIST = [
    { id: 'st_1', cat: 'streak', icon: 'fa-fire', check: s => s.streak.count >= 1 },
    { id: 'st_3', cat: 'streak', icon: 'fa-fire', check: s => s.streak.count >= 3 },
    { id: 'st_7', cat: 'streak', icon: 'fa-fire-flame-curved', check: s => s.streak.count >= 7 },
    { id: 'st_14', cat: 'streak', icon: 'fa-fire-flame-curved', check: s => s.streak.count >= 14 },
    { id: 'st_30', cat: 'streak', icon: 'fa-medal', check: s => s.streak.count >= 30 },
    { id: 'st_60', cat: 'streak', icon: 'fa-crown', check: s => s.streak.count >= 60 },
    { id: 'st_100', cat: 'streak', icon: 'fa-trophy', check: s => s.streak.count >= 100 },

    { id: 'vc_1', cat: 'vocab', icon: 'fa-seedling', check: s => getTotalVocabWords(s) >= 1 },
    { id: 'vc_10', cat: 'vocab', icon: 'fa-layer-group', check: s => getTotalVocabWords(s) >= 10 },
    { id: 'vc_25', cat: 'vocab', icon: 'fa-brain', check: s => getTotalVocabWords(s) >= 25 },
    { id: 'vc_50', cat: 'vocab', icon: 'fa-book-bookmark', check: s => getTotalVocabWords(s) >= 50 },
    { id: 'vc_100', cat: 'vocab', icon: 'fa-graduation-cap', check: s => getTotalVocabWords(s) >= 100 },
    { id: 'vc_250', cat: 'vocab', icon: 'fa-gem', check: s => getTotalVocabWords(s) >= 250 },
    { id: 'vc_hit10', cat: 'vocab', icon: 'fa-check-double', check: s => s.vocabStats.correct >= 10 },
    { id: 'vc_hit50', cat: 'vocab', icon: 'fa-bolt', check: s => s.vocabStats.correct >= 50 },

    { id: 'ls_1', cat: 'listening', icon: 'fa-headphones', check: s => getTotalListeningCount(s) >= 1 },
    { id: 'ls_5h', cat: 'listening', icon: 'fa-ear-listen', check: s => getTotalListeningHours(s) >= 5 },
    { id: 'ls_25h', cat: 'listening', icon: 'fa-tv', check: s => getTotalListeningHours(s) >= 25 },
    { id: 'ls_50h', cat: 'listening', icon: 'fa-film', check: s => getTotalListeningHours(s) >= 50 },
    { id: 'ls_100h', cat: 'listening', icon: 'fa-star', check: s => getTotalListeningHours(s) >= 100 },
    { id: 'ls_250h', cat: 'listening', icon: 'fa-award', check: s => getTotalListeningHours(s) >= 250 },
    { id: 'ls_500h', cat: 'listening', icon: 'fa-crown', check: s => getTotalListeningHours(s) >= 500 },
    { id: 'ls_1000h', cat: 'listening', icon: 'fa-trophy', check: s => getTotalListeningHours(s) >= 1000 },

    { id: 'rd_1', cat: 'reading', icon: 'fa-book', check: s => getTotalBooksCount(s) >= 1 },
    { id: 'rd_3', cat: 'reading', icon: 'fa-book-open', check: s => getTotalBooksCount(s) >= 3 },
    { id: 'rd_10', cat: 'reading', icon: 'fa-books', check: s => getTotalBooksCount(s) >= 10 },
    { id: 'rd_100p', cat: 'reading', icon: 'fa-file-lines', check: s => getTotalPagesCount(s) >= 100 },
    { id: 'rd_500p', cat: 'reading', icon: 'fa-scroll', check: s => getTotalPagesCount(s) >= 500 },
    { id: 'rd_1000p', cat: 'reading', icon: 'fa-feather-pointed', check: s => getTotalPagesCount(s) >= 1000 },

    { id: 'sp_1', cat: 'speech', icon: 'fa-microphone', check: s => (s.speechStats?.totalRead || 0) >= 1 },
    { id: 'sp_5', cat: 'speech', icon: 'fa-volume-high', check: s => (s.speechStats?.totalRead || 0) >= 5 },
    { id: 'sp_15', cat: 'speech', icon: 'fa-podcast', check: s => (s.speechStats?.totalRead || 0) >= 15 },
    { id: 'sp_acc85', cat: 'speech', icon: 'fa-bullseye', check: s => (s.speechStats?.highAccuracyReads || 0) >= 3 },
    { id: 'sp_perf1', cat: 'speech', icon: 'fa-star', check: s => (s.speechStats?.perfectReads || 0) >= 1 },
    { id: 'sp_perf5', cat: 'speech', icon: 'fa-crown', check: s => (s.speechStats?.perfectReads || 0) >= 5 },

    { id: 'tp_1', cat: 'typing', icon: 'fa-rocket', check: s => (s.typingStats?.gamesPlayed || 0) >= 1 },
    { id: 'tp_w10', cat: 'typing', icon: 'fa-bolt', check: s => (s.typingStats?.totalWordsDestroyed || 0) >= 10 },
    { id: 'tp_w50', cat: 'typing', icon: 'fa-jet-fighter-up', check: s => (s.typingStats?.totalWordsDestroyed || 0) >= 50 },
    { id: 'tp_w200', cat: 'typing', icon: 'fa-meteor', check: s => (s.typingStats?.totalWordsDestroyed || 0) >= 200 },
    { id: 'tp_c15', cat: 'typing', icon: 'fa-fire', check: s => (s.typingStats?.bestCombo || 0) >= 15 },
    { id: 'tp_s500', cat: 'typing', icon: 'fa-trophy', check: s => getMaxTypingScore(s) >= 500 },
    { id: 'tp_s1500', cat: 'typing', icon: 'fa-crown', check: s => getMaxTypingScore(s) >= 1500 },

    { id: 'pg_2', cat: 'polyglot', icon: 'fa-earth-americas', check: s => getActiveLanguagesCount(s) >= 2 },
    { id: 'pg_3', cat: 'polyglot', icon: 'fa-globe', check: s => getActiveLanguagesCount(s) >= 3 },
    { id: 'pg_4', cat: 'polyglot', icon: 'fa-compass', check: s => getActiveLanguagesCount(s) >= 4 }
];

function getAchLocalized(id) {
    const ui = appState.currentUser.uiLang || 'pt';
    const dict = ACH_TEXTS[ui] || ACH_TEXTS.pt;
    const fallback = ACH_TEXTS.pt[id] || [id, ''];
    const pair = dict[id] || fallback;
    return { title: pair[0], desc: pair[1] };
}

function getTotalVocabWords(s) {
    return Object.values(s.data).reduce((acc, d) => acc + (d.vocabulary?.length || 0), 0);
}
function getTotalListeningCount(s) {
    return Object.values(s.data).reduce((acc, d) => acc + (d.listening?.length || 0), 0);
}
function getTotalListeningHours(s) {
    return Object.values(s.data).reduce((acc, d) => acc + (d.listening || []).reduce((sum, item) => sum + (item.hours || 0), 0), 0);
}
function getTotalBooksCount(s) {
    return Object.values(s.data).reduce((acc, d) => acc + (d.reading?.length || 0), 0);
}
function getTotalPagesCount(s) {
    return Object.values(s.data).reduce((acc, d) => acc + (d.reading || []).reduce((sum, b) => sum + (b.pages || 0), 0), 0);
}
function getMaxTypingScore(s) {
    return Object.values(s.data).reduce((max, d) => Math.max(max, d.typingBestScore || 0), 0);
}
function getActiveLanguagesCount(s) {
    let count = 0;
    Object.values(s.data).forEach(d => {
        if ((d.listening?.length || 0) + (d.reading?.length || 0) + (d.vocabulary?.length || 0) + (d.typingWords?.length || 0) > 0 || (d.typingBestScore || 0) > 0) {
            count++;
        }
    });
    return count;
}

/* ==========================================================================
   PERSISTÊNCIA (LOCALSTORAGE)
   ========================================================================== */
function saveState() {
    evaluateAchievements();
    localStorage.setItem('fluencyLabState_v2', JSON.stringify(appState));
}

function loadState() {
    const saved = localStorage.getItem('fluencyLabState_v2');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            appState = {
                ...appState,
                ...parsed,
                currentUser: { ...appState.currentUser, ...(parsed.currentUser || {}) },
                streak: { ...appState.streak, ...(parsed.streak || {}) },
                vocabStats: { ...appState.vocabStats, ...(parsed.vocabStats || {}) },
                speechStats: { ...appState.speechStats, ...(parsed.speechStats || {}) },
                typingStats: { ...appState.typingStats, ...(parsed.typingStats || {}) }
            };
            ['en', 'es', 'fr', 'ja', 'pt'].forEach(lang => {
                appState.data[lang] = {
                    listening: [],
                    reading: [],
                    vocabulary: [],
                    listeningGoal: 1000,
                    speechCompleted: [],
                    typingWords: [],
                    typingBestScore: 0,
                    ...(parsed.data?.[lang] || {})
                };
            });
        } catch (e) {
            console.error("Erro ao carregar estado:", e);
        }
    }
}

/* ==========================================================================
   INICIALIZAÇÃO E ONBOARDING
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    applyThemeMode();
    checkDailyStreakReset();
    updateAllUIStrings();
    initInfiniteCarousel();

    if (!appState.currentUser.onboardingCompleted) {
        document.getElementById('onboarding-overlay')?.classList.remove('hidden');
    } else {
        document.getElementById('onboarding-overlay')?.classList.add('hidden');
    }

    document.addEventListener('fullscreenchange', syncFullscreenButtonUI);
    startCountdownClock();
    renderAllModules();
});

function selectOnboardingOrigin(lang) {
    onboardingTempOrigin = lang;
    document.getElementById('ob-origin-pt')?.classList.toggle('ob-option-selected', lang === 'pt');
    document.getElementById('ob-origin-en')?.classList.toggle('ob-option-selected', lang === 'en');
    appState.currentUser.originLang = lang;
    appState.currentUser.uiLang = lang;
    updateAllUIStrings();
    renderAllModules();
}

function selectOnboardingTarget(lang) {
    onboardingTempTarget = lang;
    ['en', 'es', 'fr', 'ja'].forEach(l => {
        document.getElementById(`ob-target-${l}`)?.classList.toggle('ob-option-selected', l === lang);
    });
}

function nextOnboardingStep(step) {
    const nameInput = document.getElementById('onboarding-input-name');
    if (step === 2 && nameInput && nameInput.value.trim()) {
        appState.currentUser.name = nameInput.value.trim();
    }
    [1, 2, 3].forEach(s => {
        document.getElementById(`onboarding-step-${s}`)?.classList.toggle('hidden', s !== step);
    });
    const prog = document.getElementById('onboarding-progress');
    if (prog) prog.style.width = `${(step / 3) * 100}%`;
}

function finishOnboarding() {
    const nameInput = document.getElementById('onboarding-input-name');
    if (nameInput && nameInput.value.trim()) {
        appState.currentUser.name = nameInput.value.trim();
    }
    appState.currentUser.originLang = onboardingTempOrigin;
    appState.currentUser.uiLang = onboardingTempOrigin;
    appState.currentUser.targetLang = onboardingTempTarget;
    appState.currentUser.onboardingCompleted = true;
    saveState();
    document.getElementById('onboarding-overlay')?.classList.add('hidden');
    updateAllUIStrings();
    renderAllModules();
}

function resetOnboardingData() {
    closeUserProfileModal();
    nextOnboardingStep(1);
    document.getElementById('onboarding-overlay')?.classList.remove('hidden');
}

/* ==========================================================================
   TEMA CLARO/ESCURO E IDIOMAS
   ========================================================================== */
function toggleDarkMode() {
    appState.isDarkMode = !appState.isDarkMode;
    applyThemeMode();
    saveState();
    renderListeningCharts();
    renderReadingChart();
}

function applyThemeMode() {
    const body = document.getElementById('app-body');
    if (!body) return;
    body.classList.toggle('mode-dark', appState.isDarkMode);
    body.classList.toggle('mode-light', !appState.isDarkMode);
    const iconClass = appState.isDarkMode ? 'fa-solid fa-moon text-xs' : 'fa-solid fa-sun text-xs text-amber-500';
    const dIcon = document.getElementById('theme-icon-desktop');
    const mIcon = document.getElementById('theme-icon-mobile');
    if (dIcon) dIcon.className = iconClass;
    if (mIcon) mIcon.className = iconClass;
}

function changeTargetLanguage(lang) {
    if (typingGameState.running) stopTypingGame(false);
    appState.currentUser.targetLang = lang;
    currentVocabIndex = 0;
    currentStoryIndex = 0;
    saveState();
    updateAllUIStrings();
    renderAllModules();
}

function changeUILanguage(lang) {
    appState.currentUser.uiLang = lang;
    saveState();
    updateAllUIStrings();
    renderAllModules();
}

function t(key) {
    const ui = appState.currentUser.uiLang || 'pt';
    return (UI_TEXTS[ui] && UI_TEXTS[ui][key]) || UI_TEXTS.pt[key] || key;
}

function updateAllUIStrings() {
    const target = appState.currentUser.targetLang || 'en';
    const cfg = LANG_CONFIG[target] || LANG_CONFIG.en;
    const userName = appState.currentUser.name || 'Luis';

    const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const setImg = (id, src) => { const el = document.getElementById(id); if (el) el.src = src; };

    setImg('header-flag-img', cfg.flag);
    setImg('hub-flag-img', cfg.flag);
    setImg('listening-flag-img', cfg.flag);

    setTxt('header-subtitle', cfg.subtitle);
    setTxt('footer-text', cfg.footer);
    setTxt('hub-welcome', `${t('welcome')}, ${userName.toUpperCase()} • ${cfg.welcomeBadge}`);
    setTxt('hub-title-text', t('hubTitle'));
    setTxt('hub-desc', t('hubDesc'));

    setTxt('lbl-nav-hub', t('navHub'));
    setTxt('lbl-nav-dash', t('navDash'));
    setTxt('lbl-nav-cad', t('navCad'));
    setTxt('lbl-header-achievements', t('headerAch'));

    // Hub Cards (incluindo clones do carrossel infinito)
    document.querySelectorAll('#card-listening-goal').forEach(el => el.textContent = t('listeningGoalTag'));
    document.querySelectorAll('#card-listening-title').forEach(el => el.textContent = t('listeningTitle'));
    document.querySelectorAll('#card-listening-desc').forEach(el => el.textContent = t('listeningDesc'));

    document.querySelectorAll('#card-reading-tag').forEach(el => el.textContent = t('readingTag'));
    document.querySelectorAll('#card-reading-title').forEach(el => el.textContent = t('readingTitle'));
    document.querySelectorAll('#card-reading-desc').forEach(el => el.textContent = t('readingDesc'));

    document.querySelectorAll('#card-vocab-tag').forEach(el => el.textContent = t('vocabTag'));
    document.querySelectorAll('#card-vocab-title').forEach(el => el.textContent = t('vocabTitle'));
    document.querySelectorAll('#card-vocab-desc').forEach(el => el.textContent = t('vocabDesc'));

    document.querySelectorAll('#card-speech-tag').forEach(el => el.textContent = t('speechTag'));
    document.querySelectorAll('#card-speech-title').forEach(el => el.textContent = t('speechTitle'));
    document.querySelectorAll('#card-speech-desc').forEach(el => el.textContent = t('speechDesc'));

    document.querySelectorAll('#card-ach-tag').forEach(el => el.textContent = t('achTag'));
    document.querySelectorAll('#card-ach-title').forEach(el => el.textContent = t('achTitle'));
    document.querySelectorAll('#card-ach-desc').forEach(el => el.textContent = t('achDesc'));

    document.querySelectorAll('#card-typing-tag').forEach(el => el.textContent = t('typingTag'));
    document.querySelectorAll('#card-typing-title').forEach(el => el.textContent = t('typingTitle'));
    document.querySelectorAll('#card-typing-desc').forEach(el => el.textContent = t('typingDesc'));

    document.querySelectorAll('.hub-btn-access').forEach(el => el.textContent = t('btnAccess'));
    document.querySelectorAll('#hub-btn-train').forEach(el => el.textContent = t('btnTrain'));
    document.querySelectorAll('#hub-btn-speech').forEach(el => el.textContent = t('btnSpeech'));
    document.querySelectorAll('#hub-btn-ach').forEach(el => el.textContent = t('btnAch'));
    document.querySelectorAll('#hub-btn-typing').forEach(el => el.textContent = t('btnTyping'));

    // Listening
    const goal = appState.data[target].listeningGoal || 1000;
    setTxt('listening-welcome-prefix', `Listening (${cfg.name})`);
    setTxt('lbl-of-target', `${t('ofTarget')} ${goal}h`);
    setTxt('lbl-goal-fixed', t('goalFixed'));
    setTxt('lbl-progress', t('progress'));
    setTxt('lbl-summary-listening', t('summaryListening'));
    setTxt('lbl-summary-listening-desc', t('summaryListeningDesc'));
    setTxt('lbl-real-time', t('realTime'));
    setTxt('lbl-registered', t('registered'));
    setTxt('lbl-hours-by-type', t('hoursByType'));
    setTxt('lbl-hours-by-type-desc', t('hoursByTypeDesc'));
    setTxt('lbl-titles-watched', t('titlesWatched'));
    setTxt('lbl-titles-watched-desc', t('titlesWatchedDesc'));
    setTxt('lbl-decimal-total', t('decimalTotal'));
    setTxt('lbl-add-media-title', t('addMediaTitle'));
    setTxt('lbl-add-media-desc', t('addMediaDesc'));
    setTxt('lbl-media-type', t('mediaType'));
    setTxt('opt-movie', t('movie'));
    setTxt('opt-series', t('series'));
    setTxt('lbl-title-name', t('titleName'));
    setTxt('lbl-cover-img', t('coverImg'));
    setTxt('lbl-listening-mode', t('listeningMode'));
    setTxt('desc-diamond', t('diamondDesc'));
    setTxt('desc-gold', t('goldDesc'));
    setTxt('desc-silver', t('silverDesc'));
    setTxt('lbl-hours', t('hours'));
    setTxt('lbl-minutes', t('minutes'));
    setTxt('lbl-season', t('season'));
    setTxt('lbl-ep-count', t('epCount'));
    setTxt('lbl-avg-hours', t('avgHours'));
    setTxt('lbl-avg-mins', t('avgMins'));

    // Reading
    setTxt('reading-title-prefix', `Reading (${cfg.name})`);
    setTxt('lbl-total-books', t('totalBooks'));
    setTxt('lbl-total-pages', t('totalPages'));
    setTxt('lbl-pages-per-book-desc', t('pagesPerBookDesc'));
    setTxt('lbl-registered-books', t('registeredBooks'));
    setTxt('lbl-sum-pages', t('sumPages'));
    setTxt('lbl-pages-per-book', t('pagesPerBook'));
    setTxt('lbl-add-book-title', t('addBookTitle'));
    setTxt('lbl-add-book-desc', t('addBookDesc'));
    setTxt('lbl-book-title', t('bookTitle'));
    setTxt('lbl-book-author', t('bookAuthor'));
    setTxt('lbl-book-pages', t('bookPages'));
    setTxt('lbl-book-cover', t('bookCover'));

    // Vocabulary
    setTxt('card-front-lang-label', cfg.name);
    setTxt('lbl-click-to-flip', t('clickToFlip'));
    setTxt('lbl-translation-tag', t('translationTag'));
    setTxt('btn-wrong-action', t('btnWrong'));
    setTxt('btn-correct-action', t('btnCorrect'));
    setTxt('btn-next-random', t('btnNextRandom'));
    setTxt('lbl-total-words', t('totalWords'));
    setTxt('lbl-accuracy-rate', t('accuracyRate'));
    setTxt('lbl-registered-vocab', t('registeredVocab'));
    setTxt('lbl-add-word-title', t('addWordTitle'));
    setTxt('lbl-add-word-desc', t('addWordDesc'));
    setTxt('lbl-term-in-lang', t('termInLang'));
    setTxt('lbl-term-translation', t('termTranslation'));
    setTxt('lbl-term-example', t('termExample'));

    // Botões gerais de formulário
    document.querySelectorAll('.btn-save').forEach(b => b.textContent = t('saveBtn'));
    document.querySelectorAll('.btn-cancel').forEach(b => b.textContent = t('cancelBtn'));

    // Speech
    setTxt('speech-title-prefix', `${t('speechPrefix')} (${cfg.name})`);
    setTxt('lbl-select-story', t('selectStory'));
    setTxt('lbl-difficulty-level', t('difficultyLevel'));
    setTxt('speech-lvl-easy', t('lvlEasy'));
    setTxt('speech-lvl-medium', t('lvlMedium'));
    setTxt('speech-lvl-hard', t('lvlHard'));
    setTxt('speech-instruction', t('speechInstruction'));
    setTxt('lbl-btn-listen-story', isSpeakingStory ? t('btnStopStory') : t('btnListenStory'));
    setTxt('lbl-btn-record-voice', isRecordingVoice ? t('btnStopVoice') : t('btnRecordVoice'));

    // Achievements
    setTxt('ach-banner-tag', t('achBannerTag'));
    setTxt('ach-banner-title', t('achBannerTitle'));
    setTxt('ach-banner-desc', t('achBannerDesc'));
    setTxt('lbl-ach-unlocked', t('achUnlocked'));
    setTxt('lbl-ach-progress', t('achProgress'));
    setTxt('ach-filter-all', t('filterAll'));
    setTxt('ach-filter-streak', t('filterStreak'));
    setTxt('ach-filter-vocab', t('filterVocab'));
    setTxt('ach-filter-listening', t('filterListening'));
    setTxt('ach-filter-reading', t('filterReading'));
    setTxt('ach-filter-speech', t('filterSpeech'));
    setTxt('ach-filter-typing', t('filterTyping'));
    setTxt('ach-filter-polyglot', t('filterPolyglot'));

    // Foguete a Laser (Seção 6)
    setTxt('typing-title-prefix', t('typingPrefix'));
    setTxt('typing-main-title', `${t('typingMainTitle')} (${cfg.name})`);
    setTxt('lbl-typing-score', t('typingScore'));
    setTxt('lbl-typing-record', t('typingRecord'));
    setTxt('lbl-typing-combo', t('typingCombo'));
    setTxt('lbl-typing-lives', t('typingLives'));
    setTxt('lbl-typing-mode-title', t('typingModeTitle'));
    setTxt('lbl-mode-flashcards', t('typingModeFlashcards'));
    setTxt('lbl-mode-custom', t('typingModeCustom'));
    setTxt('lbl-mode-top30', t('typingModeTop30'));
    setTxt('lbl-btn-add-word', t('typingBtnAddWord'));
    setTxt('lbl-typing-wave', t('typingWave'));
    setTxt('lbl-typing-hits', t('typingHits'));
    setTxt('lbl-btn-start-typing', t('typingBtnStart'));
    setTxt('lbl-btn-stop-typing', t('typingBtnStop'));
    setTxt('typing-overlay-title', typingGameState.gameOver ? t('typingOverlayGameOverTitle') : t('typingOverlayReadyTitle'));
    setTxt('typing-overlay-desc', typingGameState.gameOver ? t('typingOverlayGameOverDesc') : t('typingOverlayReadyDesc'));
    setTxt('lbl-btn-overlay-start', typingGameState.gameOver ? t('typingBtnOverlayRestart') : t('typingBtnOverlayStart'));
    setTxt('lbl-typing-target-word', t('typingTargetLabel'));

    const customInp = document.getElementById('typing-custom-input');
    if (customInp) customInp.placeholder = t('typingCustomPlaceholder');
    const typingInp = document.getElementById('typing-input');
    if (typingInp) typingInp.placeholder = t('typingInputPlaceholder');

    syncFullscreenButtonUI();

    // Modais & Onboarding
    setTxt('popup-streak-title', t('popupStreakTitle'));
    setTxt('popup-streak-desc', t('popupStreakDesc'));
    setTxt('btn-streak-continue', t('btnContinue'));
    setTxt('modal-streak-title', t('modalStreakTitle'));
    setTxt('modal-streak-sub', t('modalStreakSub'));
    setTxt('lbl-modal-current-seq', t('currentSeq'));
    setTxt('lbl-modal-missed-month', t('missedMonth'));
    setTxt('lbl-modal-week-hist', t('weekHist'));
    setTxt('lbl-modal-red-note', t('redNote'));
    setTxt('lbl-streak-reset-time', t('streakResetTime'));
    setTxt('btn-modal-understood', t('btnUnderstood'));
    setTxt('lbl-modal-studying', t('studyingLang'));
    setTxt('lbl-modal-ui', t('uiLangLabel'));
    setTxt('btn-refazer-perguntas', t('redoOnboarding'));
    setTxt('btn-modal-close', t('btnClose'));

    setTxt('ob-title-step1', t('obTitle1'));
    setTxt('ob-desc-step1', t('obDesc1'));
    setTxt('ob-lbl-name', t('obName'));
    setTxt('ob-lbl-origin', t('obOrigin'));
    setTxt('ob-btn-next1', t('obNext'));
    setTxt('ob-title-step2', t('obTitle2'));
    setTxt('ob-desc-step2', t('obDesc2'));
    setTxt('ob-btn-back2', t('obBack'));
    setTxt('ob-btn-next2', t('obNext'));
    setTxt('ob-title-step3', t('obTitle3'));
    setTxt('ob-desc-step3', t('obDesc3'));
    setTxt('ob-btn-finish', t('obFinish'));

    updateProfileUI();
}

/* ==========================================================================
   NAVEGAÇÃO ENTRE MÓDULOS E ABAS
   ========================================================================== */
function openModule(modName) {
    if (appState.activeModule === 'typing' && modName !== 'typing') {
        if (typingGameState.running) stopTypingGame(false);
        exitTypingFullscreenIfNeeded();
    }

    appState.activeModule = modName;
    appState.activeSubTab = 'dashboard';

    ['hub', 'listening', 'reading', 'vocabulary', 'speech', 'achievements', 'typing'].forEach(m => {
        document.getElementById(`module-${m}`)?.classList.toggle('hidden', m !== modName);
    });

    const nav = document.getElementById('main-nav');
    const subTabs = document.getElementById('subnav-tabs-container');
    const hasSubTabs = ['listening', 'reading', 'vocabulary'].includes(modName);

    if (modName === 'hub') {
        nav?.classList.add('hidden');
        document.body.classList.remove('dock-visible');
    } else {
        nav?.classList.remove('hidden');
        document.body.classList.add('dock-visible');
        subTabs?.classList.toggle('hidden', !hasSubTabs);
        switchTab('dashboard');
    }

    if (modName === 'listening') renderListeningModule();
    if (modName === 'reading') renderReadingModule();
    if (modName === 'vocabulary') renderVocabularyModule();
    if (modName === 'speech') initSpeechModule();
    if (modName === 'achievements') renderAchievementsGallery();
    if (modName === 'typing') initTypingModule();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToDashboard() {
    switchTab('dashboard');
}

function switchTab(tab) {
    appState.activeSubTab = tab;
    const mod = appState.activeModule;
    if (['listening', 'reading', 'vocabulary'].includes(mod)) {
        document.getElementById(`${mod}-tab-dashboard`)?.classList.toggle('hidden', tab !== 'dashboard');
        document.getElementById(`${mod}-tab-cadastro`)?.classList.toggle('hidden', tab !== 'cadastro');
    }

    const btnDash = document.getElementById('btn-dashboard');
    const btnCad = document.getElementById('btn-cadastro');
    if (btnDash && btnCad) {
        btnDash.classList.toggle('nav-btn-active', tab === 'dashboard');
        btnCad.classList.toggle('nav-btn-active', tab === 'cadastro');
    }
}

/* ==========================================================================
   CARROSSEL INFINITO DO HUB (COM MOVIMENTO AUTOMÁTICO CONTÍNUO)
   ========================================================================== */
function initInfiniteCarousel() {
    const track = document.getElementById('infinite-carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    if (!track || track.dataset.initialized === 'true') return;
    track.dataset.initialized = 'true';

    const originalCards = Array.from(track.children);
    originalCards.forEach(card => {
        const cloneAfter = card.cloneNode(true);
        cloneAfter.setAttribute('aria-hidden', 'true');
        track.appendChild(cloneAfter);
    });
    originalCards.slice().reverse().forEach(card => {
        const cloneBefore = card.cloneNode(true);
        cloneBefore.setAttribute('aria-hidden', 'true');
        track.insertBefore(cloneBefore, track.firstChild);
    });

    const getSingleSetWidth = () => track.scrollWidth / 3;
    let isPaused = false;
    let lastTime = performance.now();

    requestAnimationFrame(() => {
        track.scrollLeft = getSingleSetWidth();
    });

    const normalizeLoop = () => {
        const setW = getSingleSetWidth();
        if (setW <= 0) return;
        if (track.scrollLeft <= setW * 0.25) {
            track.scrollLeft += setW;
        } else if (track.scrollLeft >= setW * 1.75) {
            track.scrollLeft -= setW;
        }
    };

    track.addEventListener('scroll', normalizeLoop, { passive: true });

    track.addEventListener('mouseenter', () => { isPaused = true; });
    track.addEventListener('mouseleave', () => { isPaused = false; lastTime = performance.now(); });
    track.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
    track.addEventListener('touchend', () => { isPaused = false; lastTime = performance.now(); }, { passive: true });

    prevBtn?.addEventListener('click', () => {
        track.scrollBy({ left: -340, behavior: 'smooth' });
    });
    nextBtn?.addEventListener('click', () => {
        track.scrollBy({ left: 340, behavior: 'smooth' });
    });

    const stepMarquee = now => {
        const dt = Math.min(0.05, (now - lastTime) / 1000);
        lastTime = now;
        if (!isPaused && appState.activeModule === 'hub' && track.scrollWidth > track.clientWidth) {
            track.scrollLeft += 26 * dt;
            normalizeLoop();
        }
        requestAnimationFrame(stepMarquee);
    };
    requestAnimationFrame(stepMarquee);
}

/* ==========================================================================
   OFENSIVA (STREAK) E HISTÓRICO DIÁRIO
   ========================================================================== */
function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function checkDailyStreakReset() {
    const today = getTodayKey();
    const last = appState.streak.lastActiveDate;
    if (last && last !== today) {
        const lastDate = new Date(last + 'T00:00:00');
        const currDate = new Date(today + 'T00:00:00');
        const diffDays = Math.round((currDate - lastDate) / (1000 * 60 * 60 * 24));
        if (diffDays > 1) {
            appState.streak.missedThisMonth = (appState.streak.missedThisMonth || 0) + (diffDays - 1);
            if (appState.streak.missedThisMonth > 3) {
                appState.streak.count = 0;
            }
        }
        appState.streak.vocabDoneToday = false;
    }
    updateStreakBadges();
}

function registerDailyStudyActivity() {
    const today = getTodayKey();
    if (appState.streak.lastActiveDate !== today) {
        appState.streak.lastActiveDate = today;
        appState.streak.count = (appState.streak.count || 0) + 1;
        appState.streak.history[today] = true;
        saveState();
        updateStreakBadges();
        showStreakPopup();
    } else {
        appState.streak.history[today] = true;
        saveState();
        updateStreakBadges();
    }
}

function updateStreakBadges() {
    const count = appState.streak.count || 0;
    const dCount = document.getElementById('header-streak-count-desktop');
    const mCount = document.getElementById('header-streak-count');
    if (dCount) dCount.textContent = count;
    if (mCount) mCount.textContent = count;
}

function showStreakPopup() {
    const overlay = document.getElementById('streak-animation-overlay');
    const box = document.getElementById('streak-popup-box');
    if (!overlay || !box) return;
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    box.classList.remove('scale-75');
    box.classList.add('scale-100');
}

function closeStreakAnimation() {
    const overlay = document.getElementById('streak-animation-overlay');
    const box = document.getElementById('streak-popup-box');
    if (!overlay || !box) return;
    overlay.classList.add('opacity-0', 'pointer-events-none');
    box.classList.remove('scale-100');
    box.classList.add('scale-75');
}

function openStreakModal() {
    const modal = document.getElementById('streak-details-modal');
    if (!modal) return;
    document.getElementById('modal-streak-count').textContent = `${appState.streak.count || 0} ${t('daysText')}`;
    document.getElementById('modal-missed-count').textContent = `${appState.streak.missedThisMonth || 0} / 3`;

    const container = document.getElementById('week-days-container');
    if (container) {
        container.innerHTML = '';
        const now = new Date();
        const dayNames = t('weekDays');
        for (let i = 6; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(now.getDate() - i);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            const done = !!appState.streak.history[key];
            const isToday = i === 0;
            const div = document.createElement('div');
            div.className = `p-2 rounded-xl border text-center flex flex-col items-center gap-1 ${
                done
                    ? 'bg-blue-600/30 border-blue-500 text-blue-300'
                    : isToday
                        ? 'sub-card border-white/20 opacity-80'
                        : 'bg-red-500/20 border-red-500/40 text-red-400'
            }`;
            div.innerHTML = `
                <span class="text-[10px] font-bold">${dayNames[d.getDay()]}</span>
                <i class="fa-solid ${done ? 'fa-fire text-blue-400' : isToday ? 'fa-clock' : 'fa-xmark'} text-xs"></i>
            `;
            container.appendChild(div);
        }
    }

    const notice = document.getElementById('streak-vocab-notice');
    if (notice) {
        notice.textContent = appState.streak.lastActiveDate === getTodayKey()
            ? t('streakDoneNotice')
            : t('streakPendingNotice');
    }

    modal.classList.remove('hidden');
}

function closeStreakModal() {
    document.getElementById('streak-details-modal')?.classList.add('hidden');
}

function startCountdownClock() {
    const update = () => {
        const el = document.getElementById('streak-countdown-timer');
        if (!el) return;
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        const diff = midnight - now;
        const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
        const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
        el.textContent = `${h}:${m}:${s}`;
    };
    update();
    setInterval(update, 1000);
}

/* ==========================================================================
   PERFIL DO USUÁRIO
   ========================================================================== */
function openUserProfileModal() {
    updateProfileUI();
    document.getElementById('user-profile-modal')?.classList.remove('hidden');
}

function closeUserProfileModal() {
    document.getElementById('user-profile-modal')?.classList.add('hidden');
}

function updateProfileUI() {
    const user = appState.currentUser;
    const nameEl = document.getElementById('user-modal-name');
    const originEl = document.getElementById('user-modal-origin');
    const targetSel = document.getElementById('user-modal-target-select');
    const uiSel = document.getElementById('user-modal-ui-select');

    if (nameEl) nameEl.textContent = user.name || 'Luis';
    if (originEl) originEl.textContent = `${t('originText')}: ${user.originLang === 'en' ? 'USA 🇺🇸' : 'Brasil 🇧🇷'}`;
    if (targetSel) targetSel.value = user.targetLang || 'en';
    if (uiSel) uiSel.value = user.uiLang || 'pt';

    const avatarTargets = [
        ['header-user-img-desktop', 'header-user-icon-desktop'],
        ['header-user-img-mobile', 'header-user-icon-mobile'],
        ['user-avatar-img', 'user-avatar-icon']
    ];
    avatarTargets.forEach(([imgId, iconId]) => {
        const img = document.getElementById(imgId);
        const icon = document.getElementById(iconId);
        if (img && icon) {
            if (user.avatar) {
                img.src = user.avatar;
                img.classList.remove('hidden');
                icon.classList.add('hidden');
            } else {
                img.classList.add('hidden');
                icon.classList.remove('hidden');
            }
        }
    });
}

function handleAvatarUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        appState.currentUser.avatar = e.target.result;
        saveState();
        updateProfileUI();
    };
    reader.readAsDataURL(file);
}

/* ==========================================================================
   MÓDULO 1: LISTENING TRACKER
   ========================================================================== */
function toggleMediaType(type) {
    document.getElementById('movie-time-fields')?.classList.toggle('hidden', type !== 'filme');
    document.getElementById('series-time-fields')?.classList.toggle('hidden', type !== 'serie');
}

function updateListeningGoal(val) {
    const target = appState.currentUser.targetLang;
    const num = Math.max(1, parseFloat(val) || 1000);
    appState.data[target].listeningGoal = num;
    saveState();
    renderListeningModule();
}

function handleListeningFormSubmit(event) {
    event.preventDefault();
    const target = appState.currentUser.targetLang;
    const editId = document.getElementById('editingMediaId').value;
    const mediaType = document.querySelector('input[name="mediaType"]:checked')?.value || 'filme';
    const studyType = document.querySelector('input[name="studyType"]:checked')?.value || 'DIAMANTE';
    const name = document.getElementById('mediaName').value.trim();
    if (!name) return;

    let totalHours = 0;
    let detailsLabel = '';
    if (mediaType === 'filme') {
        const h = parseInt(document.getElementById('filmHours').value) || 0;
        const m = parseInt(document.getElementById('filmMinutes').value) || 0;
        totalHours = h + m / 60;
        detailsLabel = `${h}h ${m}m`;
    } else {
        const season = document.getElementById('seriesSeason').value.trim() || 'T1';
        const eps = parseInt(document.getElementById('seriesEpCount').value) || 1;
        const epH = parseInt(document.getElementById('seriesEpHours').value) || 0;
        const epM = parseInt(document.getElementById('seriesEpMinutes').value) || 0;
        totalHours = eps * (epH + epM / 60);
        detailsLabel = `${season} • ${eps} eps`;
    }

    const fileInput = document.getElementById('mediaCoverFile');
    const saveRecord = coverData => {
        const list = appState.data[target].listening;
        if (editId) {
            const idx = list.findIndex(i => i.id === editId);
            if (idx > -1) {
                list[idx] = {
                    ...list[idx],
                    name,
                    mediaType,
                    studyType,
                    hours: totalHours,
                    details: detailsLabel,
                    cover: coverData || list[idx].cover
                };
            }
        } else {
            list.unshift({
                id: 'ls_' + Date.now(),
                name,
                mediaType,
                studyType,
                hours: totalHours,
                details: detailsLabel,
                cover: coverData || ''
            });
        }
        registerDailyStudyActivity();
        saveState();
        cancelMediaEdit();
        renderListeningModule();
    };

    if (fileInput?.files?.[0]) {
        const reader = new FileReader();
        reader.onload = e => saveRecord(e.target.result);
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        saveRecord('');
    }
}

function editListeningItem(id) {
    const target = appState.currentUser.targetLang;
    const item = appState.data[target].listening.find(i => i.id === id);
    if (!item) return;

    document.getElementById('editingMediaId').value = item.id;
    document.getElementById('mediaName').value = item.name;
    const typeRadio = document.querySelector(`input[name="mediaType"][value="${item.mediaType}"]`);
    if (typeRadio) {
        typeRadio.checked = true;
        toggleMediaType(item.mediaType);
    }
    const studyRadio = document.querySelector(`input[name="studyType"][value="${item.studyType}"]`);
    if (studyRadio) studyRadio.checked = true;

    switchTab('cadastro');
}

function deleteListeningItem(id) {
    const target = appState.currentUser.targetLang;
    appState.data[target].listening = appState.data[target].listening.filter(i => i.id !== id);
    saveState();
    renderListeningModule();
}

function cancelMediaEdit() {
    document.getElementById('editingMediaId').value = '';
    document.getElementById('media-form')?.reset();
    toggleMediaType('filme');
    switchTab('dashboard');
}

function renderListeningModule() {
    const target = appState.currentUser.targetLang;
    const list = appState.data[target].listening || [];
    const goal = appState.data[target].listeningGoal || 1000;

    const totalHours = list.reduce((acc, i) => acc + (i.hours || 0), 0);
    const pct = Math.min(100, (totalHours / goal) * 100);
    const wholeH = Math.floor(totalHours);
    const mins = Math.round((totalHours - wholeH) * 60);

    document.getElementById('total-hours-display').textContent = `${totalHours.toFixed(2)}h`;
    document.getElementById('lbl-of-target').textContent = `${t('ofTarget')} ${goal}h`;
    document.getElementById('input-listening-goal').value = goal;
    document.getElementById('percentage-display').textContent = `${pct.toFixed(2)}%`;
    document.getElementById('banner-progress').textContent = `${Math.round(pct)}%`;
    document.getElementById('summary-target-display').textContent = `${goal}h`;
    document.getElementById('stat-total-time').textContent = `${wholeH}h ${mins}m`;
    document.getElementById('stat-total-items').textContent = list.length;
    document.getElementById('summary-total').textContent = `${totalHours.toFixed(2)}h`;

    const detailsContainer = document.getElementById('listening-details-list');
    if (detailsContainer) {
        if (list.length === 0) {
            detailsContainer.innerHTML = `<p class="text-xs opacity-60 text-center py-6">${t('noRecords')}</p>`;
        } else {
            detailsContainer.innerHTML = list.map(item => `
                <div class="p-3 rounded-xl border sub-card flex items-center justify-between gap-3">
                    <div class="flex items-center gap-2.5 min-w-0">
                        ${item.cover ? `<img src="${item.cover}" class="w-9 h-9 rounded-lg object-cover border shrink-0">` : `<div class="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0"><i class="fa-solid fa-film text-xs"></i></div>`}
                        <div class="min-w-0">
                            <p class="text-xs font-black truncate">${escapeHtml(item.name)}</p>
                            <p class="text-[10px] opacity-75">${item.studyType} • ${item.details} (${item.hours.toFixed(2)}h)</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-1.5 shrink-0">
                        <button type="button" onclick="editListeningItem('${item.id}')" class="w-7 h-7 rounded-lg border sub-card text-[10px] hover:text-blue-400"><i class="fa-solid fa-pen"></i></button>
                        <button type="button" onclick="deleteListeningItem('${item.id}')" class="w-7 h-7 rounded-lg border sub-card text-[10px] hover:text-red-400"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `).join('');
        }
    }

    renderListeningCharts();
}

function renderListeningCharts() {
    const target = appState.currentUser.targetLang;
    const list = appState.data[target].listening || [];
    const goal = appState.data[target].listeningGoal || 1000;
    const totalHours = list.reduce((acc, i) => acc + (i.hours || 0), 0);

    const donutCtx = document.getElementById('progressDonutChart');
    if (donutCtx && typeof Chart !== 'undefined') {
        if (donutChartInstance) donutChartInstance.destroy();
        donutChartInstance = new Chart(donutCtx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [Math.min(totalHours, goal), Math.max(0, goal - totalHours)],
                    backgroundColor: ['#3b82f6', 'rgba(148, 163, 184, 0.2)'],
                    borderWidth: 0
                }]
            },
            options: { cutout: '76%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }
        });
    }

    const barCtx = document.getElementById('barTypeChart');
    if (barCtx && typeof Chart !== 'undefined') {
        if (barTypeChartInstance) barTypeChartInstance.destroy();
        const diamond = list.filter(i => i.studyType === 'DIAMANTE').reduce((a, b) => a + b.hours, 0);
        const gold = list.filter(i => i.studyType === 'OURO').reduce((a, b) => a + b.hours, 0);
        const silver = list.filter(i => i.studyType === 'PRATA').reduce((a, b) => a + b.hours, 0);

        barTypeChartInstance = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: [t('diamondLabel'), t('goldLabel'), t('silverLabel')],
                datasets: [{
                    data: [diamond, gold, silver],
                    backgroundColor: ['#38bdf8', '#fbbf24', '#94a3b8'],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(148,163,184,0.12)' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
}

/* ==========================================================================
   MÓDULO 2: READING TRACKER
   ========================================================================== */
function handleReadingFormSubmit(event) {
    event.preventDefault();
    const target = appState.currentUser.targetLang;
    const editId = document.getElementById('editingBookId').value;
    const title = document.getElementById('bookTitle').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const pages = parseInt(document.getElementById('bookPages').value) || 0;
    if (!title || pages <= 0) return;

    const fileInput = document.getElementById('bookCoverFile');
    const saveBook = coverData => {
        const list = appState.data[target].reading;
        if (editId) {
            const idx = list.findIndex(b => b.id === editId);
            if (idx > -1) {
                list[idx] = { ...list[idx], title, author, pages, cover: coverData || list[idx].cover };
            }
        } else {
            list.unshift({ id: 'bk_' + Date.now(), title, author, pages, cover: coverData || '' });
        }
        registerDailyStudyActivity();
        saveState();
        cancelBookEdit();
        renderReadingModule();
    };

    if (fileInput?.files?.[0]) {
        const reader = new FileReader();
        reader.onload = e => saveBook(e.target.result);
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        saveBook('');
    }
}

function editBookItem(id) {
    const target = appState.currentUser.targetLang;
    const book = appState.data[target].reading.find(b => b.id === id);
    if (!book) return;
    document.getElementById('editingBookId').value = book.id;
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.author || '';
    document.getElementById('bookPages').value = book.pages;
    switchTab('cadastro');
}

function deleteBookItem(id) {
    const target = appState.currentUser.targetLang;
    appState.data[target].reading = appState.data[target].reading.filter(b => b.id !== id);
    saveState();
    renderReadingModule();
}

function cancelBookEdit() {
    document.getElementById('editingBookId').value = '';
    document.getElementById('book-form')?.reset();
    switchTab('dashboard');
}

function renderReadingModule() {
    const target = appState.currentUser.targetLang;
    const books = appState.data[target].reading || [];
    const totalPages = books.reduce((acc, b) => acc + (b.pages || 0), 0);

    document.getElementById('reading-stat-books').textContent = books.length;
    document.getElementById('reading-stat-pages').textContent = totalPages;
    document.getElementById('summary-reading-pages').textContent = totalPages;

    const container = document.getElementById('reading-details-list');
    if (container) {
        if (books.length === 0) {
            container.innerHTML = `<p class="text-xs opacity-60 text-center py-6">${t('noRecords')}</p>`;
        } else {
            container.innerHTML = books.map(b => `
                <div class="p-3 rounded-xl border sub-card flex items-center justify-between gap-3">
                    <div class="flex items-center gap-2.5 min-w-0">
                        ${b.cover ? `<img src="${b.cover}" class="w-9 h-9 rounded-lg object-cover border shrink-0">` : `<div class="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0"><i class="fa-solid fa-book text-xs"></i></div>`}
                        <div class="min-w-0">
                            <p class="text-xs font-black truncate">${escapeHtml(b.title)}</p>
                            <p class="text-[10px] opacity-75">${b.author ? escapeHtml(b.author) + ' • ' : ''}${b.pages} ${t('pagesShort')}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-1.5 shrink-0">
                        <button type="button" onclick="editBookItem('${b.id}')" class="w-7 h-7 rounded-lg border sub-card text-[10px] hover:text-blue-400"><i class="fa-solid fa-pen"></i></button>
                        <button type="button" onclick="deleteBookItem('${b.id}')" class="w-7 h-7 rounded-lg border sub-card text-[10px] hover:text-red-400"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `).join('');
        }
    }

    renderReadingChart();
}

function renderReadingChart() {
    const target = appState.currentUser.targetLang;
    const books = appState.data[target].reading || [];
    const ctx = document.getElementById('readingBarChart');
    if (!ctx || typeof Chart === 'undefined') return;

    if (readingBarChartInstance) readingBarChartInstance.destroy();
    readingBarChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: books.slice(0, 10).map(b => b.title.slice(0, 18)),
            datasets: [{
                data: books.slice(0, 10).map(b => b.pages),
                backgroundColor: '#3b82f6',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(148,163,184,0.12)' } },
                x: { grid: { display: false } }
            }
        }
    });
}

/* ==========================================================================
   MÓDULO 3: VOCABULARY TRAINER (FLASHCARDS)
   ========================================================================== */
function handleVocabularyFormSubmit(event) {
    event.preventDefault();
    const target = appState.currentUser.targetLang;
    const editId = document.getElementById('editingVocabId').value;
    const word = document.getElementById('vocabWord').value.trim();
    const translation = document.getElementById('vocabTranslation').value.trim();
    const example = document.getElementById('vocabExample').value.trim();
    if (!word || !translation) return;

    const list = appState.data[target].vocabulary;
    if (editId) {
        const idx = list.findIndex(v => v.id === editId);
        if (idx > -1) list[idx] = { ...list[idx], word, translation, example };
    } else {
        list.unshift({ id: 'vc_' + Date.now(), word, translation, example });
    }

    registerDailyStudyActivity();
    saveState();
    cancelVocabEdit();
    renderVocabularyModule();
}

function editVocabItem(id) {
    const target = appState.currentUser.targetLang;
    const item = appState.data[target].vocabulary.find(v => v.id === id);
    if (!item) return;
    document.getElementById('editingVocabId').value = item.id;
    document.getElementById('vocabWord').value = item.word;
    document.getElementById('vocabTranslation').value = item.translation;
    document.getElementById('vocabExample').value = item.example || '';
    switchTab('cadastro');
}

function deleteVocabItem(id) {
    const target = appState.currentUser.targetLang;
    appState.data[target].vocabulary = appState.data[target].vocabulary.filter(v => v.id !== id);
    currentVocabIndex = 0;
    saveState();
    renderVocabularyModule();
}

function cancelVocabEdit() {
    document.getElementById('editingVocabId').value = '';
    document.getElementById('vocab-form')?.reset();
    switchTab('dashboard');
}

function flipFlashcard() {
    document.getElementById('flip-card-inner')?.classList.toggle('flipped');
}

function speakCurrentWord() {
    const target = appState.currentUser.targetLang;
    const list = appState.data[target].vocabulary || [];
    if (!list.length) return;
    const item = list[currentVocabIndex % list.length];
    speakText(item.word, target);
}

function gradeFlashcard(remembered) {
    if (remembered) appState.vocabStats.correct++;
    else appState.vocabStats.wrong++;
    registerDailyStudyActivity();
    saveState();
    nextFlashcardRandom();
}

function nextFlashcardRandom() {
    const target = appState.currentUser.targetLang;
    const list = appState.data[target].vocabulary || [];
    document.getElementById('flip-card-inner')?.classList.remove('flipped');
    if (list.length > 1) {
        let nextIdx = currentVocabIndex;
        while (nextIdx === currentVocabIndex) {
            nextIdx = Math.floor(Math.random() * list.length);
        }
        currentVocabIndex = nextIdx;
    }
    renderVocabularyModule();
}

function renderVocabularyModule() {
    const target = appState.currentUser.targetLang;
    const list = appState.data[target].vocabulary || [];

    document.getElementById('vocab-stat-count').textContent = list.length;
    document.getElementById('vocab-card-counter').textContent = `${list.length} ${t('registeredCount')}`;

    const totalAttempts = appState.vocabStats.correct + appState.vocabStats.wrong;
    const acc = totalAttempts > 0 ? Math.round((appState.vocabStats.correct / totalAttempts) * 100) : 0;
    document.getElementById('vocab-stat-accuracy').textContent = `${acc}%`;

    if (list.length === 0) {
        document.getElementById('vocab-card-number').textContent = '#0';
        document.getElementById('fc-word').textContent = t('noWord');
        document.getElementById('fc-translation').textContent = '-';
        document.getElementById('fc-example').textContent = '"-"';
    } else {
        const idx = currentVocabIndex % list.length;
        const item = list[idx];
        document.getElementById('vocab-card-number').textContent = `#${idx + 1}`;
        document.getElementById('fc-word').textContent = item.word;
        document.getElementById('fc-translation').textContent = item.translation;
        document.getElementById('fc-example').textContent = item.example ? `"${item.example}"` : '""';
    }

    const container = document.getElementById('vocabulary-details-list');
    if (container) {
        if (list.length === 0) {
            container.innerHTML = `<p class="text-xs opacity-60 text-center py-6">${t('noRecords')}</p>`;
        } else {
            container.innerHTML = list.map(v => `
                <div class="p-3 rounded-xl border sub-card flex items-center justify-between gap-3">
                    <div class="min-w-0">
                        <p class="text-xs font-black truncate">${escapeHtml(v.word)} <span class="text-blue-400 font-bold">→ ${escapeHtml(v.translation)}</span></p>
                        ${v.example ? `<p class="text-[10px] opacity-70 truncate italic">"${escapeHtml(v.example)}"</p>` : ''}
                    </div>
                    <div class="flex items-center gap-1.5 shrink-0">
                        <button type="button" onclick="speakText('${escapeAttr(v.word)}', '${target}')" class="w-7 h-7 rounded-lg border sub-card text-[10px] text-blue-400"><i class="fa-solid fa-volume-high"></i></button>
                        <button type="button" onclick="editVocabItem('${v.id}')" class="w-7 h-7 rounded-lg border sub-card text-[10px] hover:text-blue-400"><i class="fa-solid fa-pen"></i></button>
                        <button type="button" onclick="deleteVocabItem('${v.id}')" class="w-7 h-7 rounded-lg border sub-card text-[10px] hover:text-red-400"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `).join('');
        }
    }
}

/* ==========================================================================
   MÓDULO 4: LEITOR & PRONÚNCIA
   ========================================================================== */
let currentStoryIndex = 0;
let currentSpeechLevel = 'easy';
let isSpeakingStory = false;
let isRecordingVoice = false;
let recognitionInstance = null;

function getStoriesForCurrentLang() {
    const target = appState.currentUser.targetLang || 'en';
    if (typeof FLUENCY_STORIES !== 'undefined' && FLUENCY_STORIES[target]?.length) {
        return FLUENCY_STORIES[target];
    }
    return (typeof FLUENCY_STORIES !== 'undefined' && FLUENCY_STORIES.en) || [];
}

function initSpeechModule() {
    const stories = getStoriesForCurrentLang();
    const select = document.getElementById('speech-story-select');
    if (select) {
        select.innerHTML = stories.map((st, idx) => `<option value="${idx}">${idx + 1}. ${st.title}</option>`).join('');
        select.value = String(currentStoryIndex < stories.length ? currentStoryIndex : 0);
    }
    renderCurrentStory();
}

function changeStoryIndex(val) {
    currentStoryIndex = parseInt(val) || 0;
    stopFullStoryAudio();
    renderCurrentStory();
}

function setSpeechLevel(lvl) {
    currentSpeechLevel = lvl;
    ['easy', 'medium', 'hard'].forEach(l => {
        const btn = document.getElementById(`speech-lvl-${l}`);
        if (!btn) return;
        if (l === lvl) {
            btn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-blue-600 text-white shadow';
        } else {
            btn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition-all opacity-70 hover:opacity-100';
        }
    });
    stopFullStoryAudio();
    renderCurrentStory();
}

function renderCurrentStory() {
    const stories = getStoriesForCurrentLang();
    const story = stories[currentStoryIndex] || stories[0];

    const target = appState.currentUser.targetLang || 'en';
    const cfg = LANG_CONFIG[target] || LANG_CONFIG.en;
    document.getElementById('speech-title-prefix').textContent = `${t('speechPrefix')} (${cfg.name})`;
    document.getElementById('speech-story-title').textContent = story ? story.title : t('storyDefaultTitle');

    const text = (story && (story[currentSpeechLevel] || story.easy)) || '';
    const container = document.getElementById('speech-story-container');
    if (container) {
        const words = text.split(/\s+/).filter(Boolean);
        container.innerHTML = words.map((w, idx) =>
            `<span class="story-word" data-word-idx="${idx}" onclick="speakText('${escapeAttr(w.replace(/[.,!?;:"'()—–-]/g, ''))}', '${target}')">${escapeHtml(w)}</span>`
        ).join(' ');
    }
    document.getElementById('speech-feedback-bar')?.classList.add('hidden');
}

function speakText(text, langCode) {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const cfg = LANG_CONFIG[langCode] || LANG_CONFIG.en;
    utter.lang = cfg.voice;
    utter.rate = 0.95;
    window.speechSynthesis.speak(utter);
}

function listenFullStory() {
    if (!('speechSynthesis' in window)) return;
    if (isSpeakingStory) {
        stopFullStoryAudio();
        return;
    }
    const stories = getStoriesForCurrentLang();
    const story = stories[currentStoryIndex] || stories[0];
    if (!story) return;

    const target = appState.currentUser.targetLang || 'en';
    const cfg = LANG_CONFIG[target] || LANG_CONFIG.en;
    const utter = new SpeechSynthesisUtterance(story[currentSpeechLevel] || story.easy);
    utter.lang = cfg.voice;
    utter.rate = 0.92;
    utter.onend = () => {
        isSpeakingStory = false;
        updateAllUIStrings();
    };
    isSpeakingStory = true;
    updateAllUIStrings();
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
}

function stopFullStoryAudio() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    isSpeakingStory = false;
    updateAllUIStrings();
}

function toggleVoiceRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
        alert(t('speechNotSupported'));
        return;
    }

    if (isRecordingVoice && recognitionInstance) {
        recognitionInstance.stop();
        return;
    }

    const stories = getStoriesForCurrentLang();
    const story = stories[currentStoryIndex] || stories[0];
    if (!story) return;

    const target = appState.currentUser.targetLang || 'en';
    const cfg = LANG_CONFIG[target] || LANG_CONFIG.en;
    const expectedText = story[currentSpeechLevel] || story.easy;

    recognitionInstance = new SpeechRec();
    recognitionInstance.lang = cfg.voice;
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;

    const feedbackBar = document.getElementById('speech-feedback-bar');
    const statusText = document.getElementById('speech-status-text');
    const scoreText = document.getElementById('speech-score-text');

    feedbackBar?.classList.remove('hidden');
    if (statusText) statusText.textContent = t('speechListeningStatus');
    if (scoreText) scoreText.textContent = `0% ${t('speechAccuracyLabel')}`;

    let latestTranscript = '';

    recognitionInstance.onresult = event => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript + ' ';
        }
        latestTranscript = transcript.trim();
        evaluateSpokenPronunciation(expectedText, latestTranscript);
    };

    recognitionInstance.onend = () => {
        isRecordingVoice = false;
        updateAllUIStrings();
        if (latestTranscript) {
            const pct = evaluateSpokenPronunciation(expectedText, latestTranscript);
            appState.speechStats.totalRead = (appState.speechStats.totalRead || 0) + 1;
            if (pct >= 85) appState.speechStats.highAccuracyReads = (appState.speechStats.highAccuracyReads || 0) + 1;
            if (pct === 100) appState.speechStats.perfectReads = (appState.speechStats.perfectReads || 0) + 1;
            registerDailyStudyActivity();
            saveState();
        }
    };

    isRecordingVoice = true;
    updateAllUIStrings();
    recognitionInstance.start();
}

function evaluateSpokenPronunciation(expectedText, spokenText) {
    const clean = str => str.toLowerCase().replace(/[.,!?;:"'()—–-]/g, '').trim();
    const expectedWords = expectedText.split(/\s+/);
    const spokenSet = new Set(clean(spokenText).split(/\s+/).filter(Boolean));

    let matched = 0;
    const wordEls = document.querySelectorAll('#speech-story-container .story-word');
    expectedWords.forEach((rawWord, idx) => {
        const normalized = clean(rawWord);
        const el = wordEls[idx];
        if (!el) return;
        el.classList.remove('word-correct', 'word-incorrect');
        if (spokenSet.has(normalized)) {
            matched++;
            el.classList.add('word-correct');
        } else if (spokenSet.size > 0) {
            el.classList.add('word-incorrect');
        }
    });

    const pct = expectedWords.length > 0 ? Math.round((matched / expectedWords.length) * 100) : 0;
    const scoreText = document.getElementById('speech-score-text');
    if (scoreText) scoreText.textContent = `${pct}% ${t('speechAccuracyLabel')}`;
    return pct;
}

/* ==========================================================================
   MÓDULO 5: GALERIA DE CONQUISTAS
   ========================================================================== */
function evaluateAchievements() {
    ACHIEVEMENTS_LIST.forEach(ach => {
        if (!appState.unlockedAchievements.includes(ach.id) && ach.check(appState)) {
            appState.unlockedAchievements.push(ach.id);
        }
    });
}

function filterAchievements(cat) {
    currentAchievementFilter = cat;
    ['all', 'streak', 'vocab', 'listening', 'reading', 'speech', 'typing', 'polyglot'].forEach(c => {
        const btn = document.getElementById(`ach-filter-${c}`);
        if (!btn) return;
        btn.classList.toggle('ach-filter-active', c === cat);
        btn.classList.toggle('sub-card', c !== cat);
    });
    renderAchievementsGallery();
}

function renderAchievementsGallery() {
    evaluateAchievements();
    const total = ACHIEVEMENTS_LIST.length;
    const unlocked = appState.unlockedAchievements.length;
    const pct = total > 0 ? Math.round((unlocked / total) * 100) : 0;

    document.getElementById('ach-unlocked-count').textContent = `${unlocked} / ${total}`;
    document.getElementById('ach-progress-pct').textContent = `${pct}%`;

    const grid = document.getElementById('achievements-full-grid');
    if (!grid) return;

    const filtered = currentAchievementFilter === 'all'
        ? ACHIEVEMENTS_LIST
        : ACHIEVEMENTS_LIST.filter(a => a.cat === currentAchievementFilter);

    grid.innerHTML = filtered.map(ach => {
        const isUnlocked = appState.unlockedAchievements.includes(ach.id);
        const loc = getAchLocalized(ach.id);
        return `
            <div class="panel-card p-5 border flex flex-col items-center text-center justify-between gap-3 ${isUnlocked ? 'border-cyan-400/60 shadow-[0_0_24px_rgba(34,211,238,0.22)]' : 'opacity-50 grayscale'}">
                <div class="w-12 h-12 rounded-2xl ${isUnlocked ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/40' : 'sub-card'} flex items-center justify-center text-lg">
                    <i class="fa-solid ${ach.icon}"></i>
                </div>
                <div class="space-y-1">
                    <h4 class="text-xs font-black">${escapeHtml(loc.title)}</h4>
                    <p class="text-[11px] opacity-80 leading-snug">${escapeHtml(loc.desc)}</p>
                </div>
                <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${isUnlocked ? 'bg-emerald-500/20 text-emerald-400' : 'sub-card'}">
                    ${isUnlocked ? t('achUnlockedBadge') : t('achLockedBadge')}
                </span>
            </div>
        `;
    }).join('');
}

/* ==========================================================================
   SEÇÃO 6: FOGUETE A LASER (TELA CHEIA + ANIMAÇÃO ESPACIAL)
   ========================================================================== */
let typingGameState = {
    source: 'flashcards',
    running: false,
    gameOver: false,
    score: 0,
    combo: 0,
    lives: 3,
    wave: 1,
    hits: 0,
    enemies: [],
    lockedEnemyId: null,
    lastFrameTime: 0,
    lastSpawnTime: 0,
    rafId: null,
    nextId: 1
};

function isArenaFullscreen() {
    const shell = document.getElementById('typing-arena-box');
    return !!(document.fullscreenElement === shell || shell?.classList.contains('is-pseudo-fullscreen'));
}

function toggleTypingFullscreen() {
    const shell = document.getElementById('typing-arena-box');
    if (!shell) return;

    if (document.fullscreenElement === shell) {
        document.exitFullscreen?.().catch(() => {});
        shell.classList.remove('is-pseudo-fullscreen');
        syncFullscreenButtonUI();
        return;
    }

    if (shell.classList.contains('is-pseudo-fullscreen')) {
        shell.classList.remove('is-pseudo-fullscreen');
        syncFullscreenButtonUI();
        return;
    }

    if (shell.requestFullscreen) {
        shell.requestFullscreen().then(syncFullscreenButtonUI).catch(() => {
            shell.classList.add('is-pseudo-fullscreen');
            syncFullscreenButtonUI();
        });
    } else {
        shell.classList.add('is-pseudo-fullscreen');
        syncFullscreenButtonUI();
    }
}

function exitTypingFullscreenIfNeeded() {
    const shell = document.getElementById('typing-arena-box');
    if (document.fullscreenElement === shell) {
        document.exitFullscreen?.().catch(() => {});
    }
    shell?.classList.remove('is-pseudo-fullscreen');
    syncFullscreenButtonUI();
}

function syncFullscreenButtonUI() {
    const active = isArenaFullscreen();
    const lbl = document.getElementById('lbl-btn-fullscreen');
    const icon = document.getElementById('typing-fs-icon');
    if (lbl) lbl.textContent = active ? t('typingBtnExitFullscreen') : t('typingBtnFullscreen');
    if (icon) icon.className = active ? 'fa-solid fa-compress mr-1' : 'fa-solid fa-expand mr-1';
}

function initTypingModule() {
    const target = appState.currentUser.targetLang || 'en';
    const best = appState.data[target].typingBestScore || 0;
    document.getElementById('typing-record-display').textContent = best;
    setTypingSource(typingGameState.source);
    renderCustomTypingTags();
    updateTypingHud();
}

function setTypingSource(src) {
    typingGameState.source = src;
    ['flashcards', 'custom', 'top30'].forEach(mode => {
        const btn = document.getElementById(`typing-src-${mode}`);
        if (!btn) return;
        btn.classList.toggle('typing-mode-active', mode === src);
        btn.classList.toggle('sub-card', mode !== src);
    });
    document.getElementById('typing-custom-manager')?.classList.toggle('hidden', src !== 'custom');
    if (src === 'custom') renderCustomTypingTags();
}

function addCustomTypingWord() {
    const input = document.getElementById('typing-custom-input');
    if (!input) return;
    const raw = input.value.trim();
    if (!raw) return;

    const target = appState.currentUser.targetLang || 'en';
    const list = appState.data[target].typingWords || [];
    if (!list.some(w => w.toLowerCase() === raw.toLowerCase())) {
        list.unshift(raw);
        appState.data[target].typingWords = list;
        saveState();
    }
    input.value = '';
    renderCustomTypingTags();
}

function removeCustomTypingWord(idx) {
    const target = appState.currentUser.targetLang || 'en';
    appState.data[target].typingWords.splice(idx, 1);
    saveState();
    renderCustomTypingTags();
}

function renderCustomTypingTags() {
    const container = document.getElementById('typing-custom-tags');
    if (!container) return;
    const target = appState.currentUser.targetLang || 'en';
    const list = appState.data[target].typingWords || [];

    if (list.length === 0) {
        container.innerHTML = `<span class="text-[11px] opacity-65">${t('noRecords')}</span>`;
        return;
    }

    container.innerHTML = list.map((word, idx) => `
        <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border sub-card text-xs font-bold">
            ${escapeHtml(word)}
            <button type="button" onclick="removeCustomTypingWord(${idx})" class="text-rose-400 hover:text-rose-300"><i class="fa-solid fa-xmark text-[10px]"></i></button>
        </span>
    `).join('');
}

function getTypingWordPool() {
    const target = appState.currentUser.targetLang || 'en';
    if (typingGameState.source === 'flashcards') {
        return (appState.data[target].vocabulary || []).map(v => v.word.trim()).filter(Boolean);
    }
    if (typingGameState.source === 'custom') {
        return (appState.data[target].typingWords || []).map(w => w.trim()).filter(Boolean);
    }
    return TOP_30_TYPING_WORDS[target] || TOP_30_TYPING_WORDS.en;
}

function startTypingGame() {
    const pool = getTypingWordPool();
    if (!pool.length) {
        alert(t('typingEmptyPool'));
        return;
    }

    if (typingGameState.rafId) cancelAnimationFrame(typingGameState.rafId);

    const wordsLayer = document.getElementById('typing-words-layer');
    const laserSvg = document.getElementById('typing-laser-svg');
    if (wordsLayer) wordsLayer.innerHTML = '';
    if (laserSvg) {
        laserSvg.innerHTML = `
            <defs>
                <linearGradient id="typingLaserGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stop-color="#2563eb" />
                    <stop offset="55%" stop-color="#22d3ee" />
                    <stop offset="100%" stop-color="#ffffff" />
                </linearGradient>
            </defs>
        `;
    }

    typingGameState.running = true;
    typingGameState.gameOver = false;
    typingGameState.score = 0;
    typingGameState.combo = 0;
    typingGameState.lives = 3;
    typingGameState.wave = 1;
    typingGameState.hits = 0;
    typingGameState.enemies = [];
    typingGameState.lockedEnemyId = null;
    typingGameState.lastFrameTime = performance.now();
    typingGameState.lastSpawnTime = 0;

    appState.typingStats.gamesPlayed = (appState.typingStats.gamesPlayed || 0) + 1;
    registerDailyStudyActivity();
    saveState();

    document.getElementById('typing-overlay-state')?.classList.add('hidden');
    document.getElementById('typing-overlay-summary')?.classList.add('hidden');
    document.getElementById('btn-start-typing')?.classList.add('hidden');
    document.getElementById('btn-stop-typing')?.classList.remove('hidden');

    const input = document.getElementById('typing-input');
    if (input) {
        input.value = '';
        input.focus();
    }

    updateTypingHud();
    spawnTypingEnemy();
    typingGameState.lastSpawnTime = performance.now();
    typingGameState.rafId = requestAnimationFrame(typingGameLoop);
}

function stopTypingGame(showGameOver) {
    typingGameState.running = false;
    typingGameState.gameOver = !!showGameOver;
    if (typingGameState.rafId) {
        cancelAnimationFrame(typingGameState.rafId);
        typingGameState.rafId = null;
    }

    const target = appState.currentUser.targetLang || 'en';
    const prevBest = appState.data[target].typingBestScore || 0;
    const isNewRecord = typingGameState.score > prevBest;
    if (isNewRecord) {
        appState.data[target].typingBestScore = typingGameState.score;
    }
    saveState();

    document.getElementById('btn-start-typing')?.classList.remove('hidden');
    document.getElementById('btn-stop-typing')?.classList.add('hidden');

    const overlay = document.getElementById('typing-overlay-state');
    const summary = document.getElementById('typing-overlay-summary');
    if (overlay) {
        overlay.classList.remove('hidden');
        document.getElementById('typing-overlay-title').textContent = showGameOver ? t('typingOverlayGameOverTitle') : t('typingOverlayReadyTitle');
        document.getElementById('typing-overlay-desc').textContent = showGameOver ? t('typingOverlayGameOverDesc') : t('typingOverlayReadyDesc');
        document.getElementById('lbl-btn-overlay-start').textContent = showGameOver ? t('typingBtnOverlayRestart') : t('typingBtnOverlayStart');
    }
    if (summary && showGameOver) {
        summary.classList.remove('hidden');
        summary.innerHTML = `
            <div>${t('typingScore')}: <span class="text-white font-black">${typingGameState.score}</span> • ${t('typingRecord')}: <span class="text-amber-300 font-black">${appState.data[target].typingBestScore}</span></div>
            ${isNewRecord ? `<div class="text-amber-300 font-black pt-1">${t('typingNewRecordBadge')}</div>` : ''}
        `;
    }

    updateTypingHud();
}

function spawnTypingEnemy() {
    const playfield = document.getElementById('typing-playfield');
    const layer = document.getElementById('typing-words-layer');
    const pool = getTypingWordPool();
    if (!playfield || !layer || !pool.length) return;

    const word = pool[Math.floor(Math.random() * pool.length)];
    const fieldW = playfield.clientWidth || 640;
    const approxWidth = Math.max(88, word.length * 14 + 36);
    const minX = 16;
    const maxX = Math.max(minX + 10, fieldW - approxWidth - 16);
    const x = minX + Math.random() * (maxX - minX);

    const el = document.createElement('div');
    el.className = 'typing-word-enemy';
    el.style.transform = `translate3d(${x}px, -38px, 0)`;
    layer.appendChild(el);

    const enemy = {
        id: typingGameState.nextId++,
        word,
        typedCount: 0,
        x,
        y: -38,
        speed: 36 + (typingGameState.wave - 1) * 9 + Math.random() * 14,
        el
    };
    renderEnemyLetters(enemy);
    typingGameState.enemies.push(enemy);
}

function renderEnemyLetters(enemy) {
    const hitPart = escapeHtml(enemy.word.slice(0, enemy.typedCount));
    const nextChar = escapeHtml(enemy.word.slice(enemy.typedCount, enemy.typedCount + 1));
    const restPart = escapeHtml(enemy.word.slice(enemy.typedCount + 1));

    enemy.el.classList.toggle('is-locked', enemy.id === typingGameState.lockedEnemyId);
    enemy.el.innerHTML = `<span class="typing-char-hit">${hitPart}</span><span class="typing-char-next">${nextChar}</span><span>${restPart}</span>`;
}

function typingGameLoop(now) {
    if (!typingGameState.running) return;

    const dt = Math.min(0.05, (now - typingGameState.lastFrameTime) / 1000);
    typingGameState.lastFrameTime = now;

    const spawnInterval = Math.max(920, 2300 - (typingGameState.wave - 1) * 180);
    if (now - typingGameState.lastSpawnTime >= spawnInterval && typingGameState.enemies.length < 7) {
        spawnTypingEnemy();
        typingGameState.lastSpawnTime = now;
    }

    const playfield = document.getElementById('typing-playfield');
    const dangerY = (playfield?.clientHeight || 520) - 86;

    for (let i = typingGameState.enemies.length - 1; i >= 0; i--) {
        const enemy = typingGameState.enemies[i];
        enemy.y += enemy.speed * dt;
        enemy.el.style.transform = `translate3d(${enemy.x}px, ${enemy.y}px, 0)`;

        if (enemy.y >= dangerY) {
            createExplosionSparks(enemy.x + enemy.el.offsetWidth / 2, dangerY, '#fb7185', 14);
            enemy.el.remove();
            if (typingGameState.lockedEnemyId === enemy.id) {
                typingGameState.lockedEnemyId = null;
                const inp = document.getElementById('typing-input');
                if (inp) inp.value = '';
            }
            typingGameState.enemies.splice(i, 1);
            typingGameState.lives--;
            typingGameState.combo = 0;

            playfield?.classList.remove('typing-hit-shake');
            void playfield?.offsetWidth;
            playfield?.classList.add('typing-hit-shake');

            updateTypingHud();
            if (typingGameState.lives <= 0) {
                stopTypingGame(true);
                return;
            }
        }
    }

    typingGameState.rafId = requestAnimationFrame(typingGameLoop);
}

function handleTypingInput(event) {
    if (!typingGameState.running) return;
    const input = event.target;
    const typed = input.value;
    if (!typed) return;

    const lastChar = typed.slice(-1).toLowerCase();

    let targetEnemy = typingGameState.enemies.find(e => e.id === typingGameState.lockedEnemyId);

    if (!targetEnemy) {
        const candidates = typingGameState.enemies
            .filter(e => e.word.charAt(0).toLowerCase() === lastChar)
            .sort((a, b) => b.y - a.y);

        if (candidates.length > 0) {
            targetEnemy = candidates[0];
            typingGameState.lockedEnemyId = targetEnemy.id;
        }
    }

    if (targetEnemy) {
        const expectedChar = targetEnemy.word.charAt(targetEnemy.typedCount).toLowerCase();
        if (lastChar === expectedChar) {
            targetEnemy.typedCount++;
            renderEnemyLetters(targetEnemy);
            fireLaserAtEnemy(targetEnemy);

            if (targetEnemy.typedCount >= targetEnemy.word.length) {
                const centerX = targetEnemy.x + (targetEnemy.el.offsetWidth || 60) / 2;
                const centerY = targetEnemy.y + 18;
                createExplosionSparks(centerX, centerY, '#22d3ee', 18);
                speakText(targetEnemy.word, appState.currentUser.targetLang || 'en');

                targetEnemy.el.remove();
                typingGameState.enemies = typingGameState.enemies.filter(e => e.id !== targetEnemy.id);
                typingGameState.lockedEnemyId = null;

                typingGameState.hits++;
                typingGameState.combo++;
                typingGameState.score += 10 * targetEnemy.word.length + typingGameState.combo * 2;
                typingGameState.wave = 1 + Math.floor(typingGameState.hits / 6);

                appState.typingStats.totalWordsDestroyed = (appState.typingStats.totalWordsDestroyed || 0) + 1;
                if (typingGameState.combo > (appState.typingStats.bestCombo || 0)) {
                    appState.typingStats.bestCombo = typingGameState.combo;
                }
                const targetLang = appState.currentUser.targetLang || 'en';
                if (typingGameState.score > (appState.data[targetLang].typingBestScore || 0)) {
                    appState.data[targetLang].typingBestScore = typingGameState.score;
                }
                saveState();
            }
        } else {
            typingGameState.combo = 0;
        }
    } else {
        typingGameState.combo = 0;
    }

    input.value = '';
    updateTypingHud();
}

function fireLaserAtEnemy(enemy) {
    const playfield = document.getElementById('typing-playfield');
    const rocket = document.getElementById('typing-cannon');
    const svg = document.getElementById('typing-laser-svg');
    if (!playfield || !rocket || !svg) return;

    const fieldW = playfield.clientWidth || 640;
    const fieldH = playfield.clientHeight || 520;

    const rocketX = fieldW / 2;
    const rocketY = fieldH - 48;
    const targetX = enemy.x + (enemy.el.offsetWidth || 60) / 2;
    const targetY = Math.max(10, enemy.y + 16);

    const angleDeg = Math.atan2(targetX - rocketX, rocketY - targetY) * (180 / Math.PI);
    rocket.style.transform = `translate3d(0, 0, 0) rotate(${angleDeg}deg)`;
    rocket.classList.remove('is-firing');
    void rocket.offsetWidth;
    rocket.classList.add('is-firing');

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', rocketX);
    line.setAttribute('y1', rocketY - 18);
    line.setAttribute('x2', targetX);
    line.setAttribute('y2', targetY);
    line.setAttribute('class', 'typing-laser-beam');
    svg.appendChild(line);
    setTimeout(() => line.remove(), 240);

    createExplosionSparks(targetX, targetY, '#67e8f9', 6);
}

function createExplosionSparks(x, y, color, count) {
    const playfield = document.getElementById('typing-playfield');
    if (!playfield) return;
    for (let i = 0; i < count; i++) {
        const spark = document.createElement('div');
        spark.className = 'typing-spark';
        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;
        spark.style.background = color;
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const dist = 26 + Math.random() * 48;
        spark.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
        spark.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
        playfield.appendChild(spark);
        setTimeout(() => spark.remove(), 500);
    }
}

function updateTypingHud() {
    const target = appState.currentUser.targetLang || 'en';
    const best = appState.data[target].typingBestScore || 0;

    document.getElementById('typing-score-display').textContent = typingGameState.score;
    document.getElementById('typing-record-display').textContent = best;
    document.getElementById('typing-combo-display').textContent = `${typingGameState.combo}x`;
    document.getElementById('typing-wave-num').textContent = typingGameState.wave;
    document.getElementById('typing-hits-num').textContent = typingGameState.hits;

    const hearts = '❤️'.repeat(Math.max(0, typingGameState.lives)) + '🖤'.repeat(Math.max(0, 3 - typingGameState.lives));
    document.getElementById('typing-lives-display').textContent = hearts;

    const locked = typingGameState.enemies.find(e => e.id === typingGameState.lockedEnemyId);
    document.getElementById('typing-target-preview').textContent = locked ? locked.word : '---';
}

/* ==========================================================================
   UTILITÁRIOS E RENDERIZAÇÃO GERAL
   ========================================================================== */
function renderAllModules() {
    renderListeningModule();
    renderReadingModule();
    renderVocabularyModule();
    initSpeechModule();
    renderAchievementsGallery();
    initTypingModule();
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
    return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}