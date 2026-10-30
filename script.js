let targetListeningHours = 1000;
let currentModule = 'hub';
let currentTab = 'dashboard';
let currentAchFilter = 'all';

let userName = localStorage.getItem('luis_user_name') || 'Luis';
let userOrigin = localStorage.getItem('luis_user_origin') || 'pt';
let userAvatar = localStorage.getItem('luis_user_avatar') || '';
let targetLang = localStorage.getItem('luis_target_language') || 'en';
let uiLang = localStorage.getItem('luis_ui_language') || 'pt';
let themeMode = localStorage.getItem('luis_theme_mode') || 'dark';

let obTempTarget = targetLang;
let obTempOrigin = userOrigin;

// Estado do Módulo de Leitura e Pronúncia
let currentSpeechLevel = 'easy';
let currentStoryIndex = 0; // Índice de 0 a 49 (50 histórias por nível)
let isRecognizingVoice = false;
let speechRecognitionInstance = null;

const LANG_META = {
    en: { name: 'English', flagImg: 'img/bandeira-eua.webp', themeClass: 'theme-en', platformName: 'American Immersion Platform', edition: 'American Edition', code: 'en-US' },
    es: { name: 'Español', flagImg: 'img/bandeira-espanha.webp', themeClass: 'theme-es', platformName: 'Plataforma de Inmersión Española', edition: 'Edición Española', code: 'es-ES' },
    fr: { name: 'Français', flagImg: 'img/bandeira-franca.jpg', themeClass: 'theme-fr', platformName: "Plateforme d'Immersion Française", edition: 'Édition Française', code: 'fr-FR' },
    ja: { name: '日本語', flagImg: 'img/bandeira-japao.jpg', themeClass: 'theme-ja', platformName: '日本没入プラットフォーム・和の学習ダッシュボード', edition: '和風 Edition', code: 'ja-JP' },
    pt: { name: 'Português', flagImg: 'img/bandeira-brasil.webp', themeClass: 'theme-pt', platformName: 'Plataforma de Imersão Brasileira', edition: 'Edição Brasil', code: 'pt-BR' }
};

/* ==========================================================================
   GERADOR DINÂMICO DE 50 HISTÓRIAS ÚNICAS POR NÍVEL E IDIOMA (750 VARIAÇÕES)
   ========================================================================== */
function generate50Stories(lang, level) {
    const stories = [];
    
    // Modelos de frases e temas variados por nível e idioma
    const SAMPLES = {
        en: {
            easy: [
                { t: "The Little Dog", p1: "Max is a happy little dog. He loves to run in the green park every morning.", p2: "Today, Max found a bright yellow ball under a big tree. He played with it all day." },
                { t: "Morning Coffee", p1: "Emma wakes up early every morning to drink hot coffee.", p2: "She enjoys looking at the sunrise from her cozy balcony." },
                { t: "A Walk in the Woods", p1: "Leo likes walking in the quiet forest near his village.", p2: "He listens to the sweet song of wild birds in the trees." },
                { t: "The New Bicycle", p1: "Tom got a brand new red bicycle for his birthday.", p2: "He rides it around the neighborhood with his best friends." },
                { t: "Baking a Cake", p1: "Lisa is baking a sweet chocolate cake in the kitchen.", p2: "The delicious smell fills the whole house with joy." }
            ],
            medium: [
                { t: "A Rainstorm in the City", p1: "Sarah decided to visit her favorite local cafe while the rain was falling gently outside.", p2: "She ordered a hot cup of coffee, opened an inspiring book, and spent two wonderful hours reading by the window." },
                { t: "The Art Exhibition", p1: "David walked into the modern art gallery to explore paintings made by young artists.", p2: "He was fascinated by the colorful abstract canvas hanging near the main entrance." }
            ],
            hard: [
                { t: "The Future of Artificial Intelligence", p1: "Artificial intelligence is rapidly transforming how society communicates and solves complex problems across global industries.", p2: "Engineers and researchers collaborate worldwide to build sustainable algorithms that can adapt to changing human necessities." },
                { t: "Space Exploration Innovations", p1: "Aerospace scientists are developing advanced propulsion systems designed for long-distance interplanetary missions.", p2: "Understanding cosmic radiation patterns remains one of the critical parameters for ensuring astronaut safety." }
            ]
        },
        es: {
            easy: [
                { t: "El Perro Alegre", p1: "Max es un perro pequeño y muy feliz. Le gusta correr por el parque todas las mañanas.", p2: "Hoy encontró una pelota amarilla bajo un árbol grande y jugó con ella todo el día." },
                { t: "Un Café por la Mañana", p1: "Elena se despierta temprano cada mañana para tomar café caliente.", p2: "Le gusta mirar la salida del sol desde su cómodo balcón." }
            ],
            medium: [
                { t: "Un Café bajo la Lluvia", p1: "Sofía decidió visitar su cafetería favorita mientras la lluvia caía suavemente en la ciudad.", p2: "Pidió un café caliente, abrió un libro inspirador y pasó dos horas maravillosas leyendo junto a la ventana." }
            ],
            hard: [
                { t: "El Futuro de la Tecnología", p1: "La inteligencia artificial está transformando rápidamente la forma en que la sociedad se comunica y resuelve problemas complejos.", p2: "Investigadores de todo el mundo colaboran para construir algoritmos sostenibles que se adaptan a las necesidades humanas." }
            ]
        },
        fr: {
            easy: [
                { t: "Le Petit Chien", p1: "Max est un petit chien très heureux. Il aime courir dans le parc tous les matins.", p2: "Aujourd'hui, il a trouvé une balle jaune sous un grand arbre et a joué toute la journée." }
            ],
            medium: [
                { t: "Un Café sous la Pluie", p1: "Camille a décidé de visiter son café préféré pendant que la pluie tombait doucement dehors.", p2: "Elle a commandé un café chaud, a ouvert un livre inspirant et a passé deux heures formidables à lire près de la fenêtre." }
            ],
            hard: [
                { t: "La Technologie Moderne", p1: "L'intelligence artificielle transforme rapidement la façon dont la société communique et résout des problèmes complexes.", p2: "Des chercheurs du monde entier collaborent pour créer des algorithmes durables adaptables aux besoins humains." }
            ]
        },
        ja: {
            easy: [
                { t: "小さな犬", p1: "マックスはとても幸せな小さな犬です。毎朝公園で走るのが大好きです。", p2: "今日、大きな木の下で黄色いボールを見つけて、一日中遊びました。" }
            ],
            medium: [
                { t: "雨の日のカフェ", p1: "雨が静かに降る中、サクラはお気に入りのカフェに行きました。", p2: "暖かいコーヒーを注文し、本を開いて、窓のそばで素晴らしい時間を過ごしました。" }
            ],
            hard: [
                { t: "現代のテクノロジー", p1: "人工知能は、社会のコミュニケーションや問題解決の accepted 方法を急速に変革しています。", p2: "世界中の研究者が協力して、変化する人間のニーズに適応できる持続可能なアルゴリズムを構築しています。" }
            ]
        },
        pt: {
            easy: [
                { t: "O Cãozinho Feliz", p1: "Max é um cãozinho muito alegre. Ele adora correr pelo parque verde todas as manhãs.", p2: "Hoje, ele encontrou uma bola amarela debaixo de uma grande árvore e brincou o dia todo." }
            ],
            medium: [
                { t: "Um Café na Chuva", p1: "Ana decidiu visitar sua cafeteria favorita enquanto a chuva caía suavemente lá fora.", p2: "Ela pediu um café quente, abriu um livro inspirador e passou duas horas maravilhosas lendo perto da janela." }
            ],
            hard: [
                { t: "A Tecnologia Moderna", p1: "A inteligência artificial está transformando rapidamente a forma como a sociedade se comunica e resolve problemas complexos.", p2: "Pesquisadores do mundo todo colaboram para construir algoritmos sustentáveis que se adaptam às necessidades humanas." }
            ]
        }
    };

    const langSamples = SAMPLES[lang] || SAMPLES['en'];
    const pool = langSamples[level] || langSamples['easy'] || SAMPLES['en']['easy'];

    // Gera exatamente 50 histórias sem repetição
    for (let i = 0; i < 50; i++) {
        const base = pool[i % pool.length];
        const storyNum = i + 1;
        stories.push({
            id: i,
            title: `${base.t} #${storyNum}`,
            paragraphs: [
                `${base.p1}`,
                `${base.p2}`
            ]
        });
    }

    return stories;
}

const UI_TEXTS = {
    pt: {
        learningLabel: "Estudando", uiLabel: "Interface",
        navHub: "Início", navDash: "Dashboard", navCad: "Cadastrar",
        welcome: "BEM-VINDO, {NAME} •", headerAch: "Conquistas",
        hubTitle: "O que você deseja registrar ou praticar hoje?",
        hubDesc: "Selecione um módulo abaixo para acompanhar seu progresso.",
        cardListeningGoal: "META DE HORAS", cardListeningTitle: "Rastreador de Escuta", cardListeningDesc: "Filmes, séries e podcasts assistidos no idioma.",
        cardReadingTag: "LEITURA DE LIVROS", cardReadingTitle: "Rastreador de Leitura", cardReadingDesc: "Livros lidos, páginas e total de obras.",
        cardVocabTag: "FLASHCARDS", cardVocabTitle: "Treinador de Vocabulário", cardVocabDesc: "Pratique com exercícios de memória e vocabulário.",
        cardSpeechTag: "LEITURA & PRONÚNCIA", cardSpeechTitle: "Leitor e Fala", cardSpeechDesc: "Leia histórias por nível, teste sua pronúncia com feedback em tempo real e treine a escuta.",
        cardAchTag: "DESAFIOS & TROFÉUS", cardAchTitle: "GALERIA DE CONQUISTAS", cardAchDesc: "Desbloqueie até 100 conquistas únicas com sua evolução.",
        btnAccess: "Acessar o Painel", btnTrain: "Treinar Vocabulário", btnSpeech: "Praticar Pronúncia", btnAch: "Ver Conquistas",
        speechTitlePrefix: "Prática de Leitura e Pronúncia", speechLevel: "Nível:", lvlEasy: "Fácil", lvlMedium: "Médio", lvlHard: "Difícil", lblSelectStory: "Texto:",
        speechInstruction: "💡 Clique em qualquer palavra para escutar a pronúncia individual. Aperte no botão para escutar a história completa ou no microfone para testar sua leitura em voz alta.",
        btnListenStory: "Escutar História Completa", btnRecordVoice: "Gravar e Ver Pronúncia", btnStopVoice: "Parar e Avaliar",
        speechStatusListening: "Ouvindo... Fale a história em voz alta!", speechStatusNoMic: "Reconhecimento de voz não suportado neste navegador.",
        speechScoreText: "de precisão",
        achBannerTag: "Galería de Troféus", achBannerTitle: "Galeria de 100 Conquistas", achBannerDesc: "Acompanhe seu progresso e conquiste badges estudando diariamente.",
        lblAchUnlocked: "Desbloqueadas", lblAchProgress: "Progresso Geral",
        achFilterAll: "Todas (100)", achFilterStreak: "🔥 Ofensiva", achFilterVocab: "🧠 Vocabulário", achFilterListening: "🎧 Listening", achFilterReading: "📖 Leitura", achFilterPoly: "🌍 Poliglota",
        goalFixed: "Meta (Horas)", progress: "Progresso", ofTarget: "da meta",
        summaryListening: "Resumo de Escuta", summaryListeningDesc: "Volume acumulado no idioma selecionado.", realTime: "Tempo Real", registered: "Cadastrados",
        hoursByType: "Horas por Tipo de Estudo", hoursByTypeDesc: "Separação por Diamante, Prata e Ouro.",
        titlesWatched: "Títulos Assistidos", titlesWatchedDesc: "Lista de filmes e séries registrados.", decimalTotal: "TOTAL DECIMAL:", target: "ALVO:",
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
        emptyVocabTitle: "Nenhuma palavra cadastrada", emptyVocabExample: "Cadastre sua primeira palavra no menu superior.", emptyVocabList: "Nenhuma palavra cadastrada.", emptyMediaList: "Nenhum título cadastrado.", emptyBookList: "Nenhum livro cadastrado.",
        popupStreakTitle: "Foguinho Acendido! 🔥", popupStreakDesc: "Excelente! Ofensiva garantida e salva no histórico diário.", btnContinue: "Continuar",
        modalStreakTitle: "Estatísticas de Ofensiva", modalStreakSub: "Controlo diário e histórico persistente", modalSeq: "Sequência Atual", modalMissed: "Faltas no Mês", modalWeek: "Histórico da Semana", modalNote: "Dias sem realizar a tarefa ficam marcados a vermelho.", streakResetTime: "Reseta às 00:00:", btnUnderstood: "Entendido",
        lblModalStudying: "Idioma que está Estudando", lblModalUi: "Idioma da Interface",
        refazerPerguntas: "Refazer Perguntas Iniciais", modalClose: "Fechar",
        obTitleStep1: "Bem-vindo ao Fluency Lab!", obDescStep1: "Como devemos te chamar e de onde você é?", obLblName: "Seu Nome", obLblOrigin: "Idioma de Origem (Interface)", obBtnNext1: "Avançar",
        obTitleStep2: "Qual idioma você vai estudar?", obDescStep2: "Você poderá alternar entre idiomas no seu perfil depois.", obBtnBack2: "Voltar", obBtnNext2: "Avançar",
        obTitleStep3: "Tudo pronto para a imersão!", obDescStep3: "Seu painel personalizado foi configurado com sucesso.", obBtnFinish: "Começar Jornada"
    },
    en: {
        learningLabel: "Studying", uiLabel: "Interface",
        navHub: "Home", navDash: "Dashboard", navCad: "Add New",
        welcome: "WELCOME, {NAME} •", headerAch: "Achievements",
        hubTitle: "What would you like to track or practice today?",
        hubDesc: "Select a module below to monitor your progress.",
        cardListeningGoal: "HOURS GOAL", cardListeningTitle: "LISTENING TRACKER", cardListeningDesc: "Podcasts & series watched in target language.",
        cardReadingTag: "BOOKS READ / PAGES", cardReadingTitle: "READING TRACKER", cardReadingDesc: "Books read, total pages completed.",
        cardVocabTag: "FLASHCARDS & WORDS", cardVocabTitle: "VOCABULARY TRAINER", cardVocabDesc: "Practice vocabulary with flashcards.",
        cardSpeechTag: "READING & PRONUNCIATION", cardSpeechTitle: "Speech & Reader", cardSpeechDesc: "Read stories by level, test your pronunciation with real-time feedback, and practice listening.",
        cardAchTag: "CHALLENGES & TROPHIES", cardAchTitle: "ACHIEVEMENTS GALLERY", cardAchDesc: "Unlock up to 100 unique achievements.",
        btnAccess: "Open Dashboard", btnTrain: "Practice Now", btnSpeech: "Practice Pronunciation", btnAch: "View Achievements",
        speechTitlePrefix: "Reading & Pronunciation Practice", speechLevel: "Level:", lvlEasy: "Easy", lvlMedium: "Medium", lvlHard: "Hard", lblSelectStory: "Text:",
        speechInstruction: "💡 Click any word to hear individual pronunciation. Press the button to listen to the full story or use the microphone to practice reading aloud.",
        btnListenStory: "Listen to Full Story", btnRecordVoice: "Record & Check Speech", btnStopVoice: "Stop & Evaluate",
        speechStatusListening: "Listening... Read the story out loud!", speechStatusNoMic: "Speech recognition not supported in this browser.",
        speechScoreText: "accuracy",
        achBannerTag: "Hall of Fame", achBannerTitle: "100 Achievements Gallery", achBannerDesc: "Track your progress and earn badges studying daily.",
        lblAchUnlocked: "Unlocked", lblAchProgress: "Overall Progress",
        achFilterAll: "All (100)", achFilterStreak: "🔥 Streak", achFilterVocab: "🧠 Vocabulary", achFilterListening: "🎧 Listening", achFilterReading: "📖 Reading", achFilterPoly: "🌍 Polyglot",
        goalFixed: "Goal (Hours)", progress: "Progress", ofTarget: "of goal",
        summaryListening: "Listening Summary", summaryListeningDesc: "Accumulated volume in selected language.", realTime: "Real Time", registered: "Tracked Items",
        hoursByType: "Hours by Study Type", hoursByTypeDesc: "Breakdown by Diamond, Silver, and Gold categories.",
        titlesWatched: "Titles Watched", titlesWatchedDesc: "List of movies and series recorded.", decimalTotal: "DECIMAL TOTAL:", target: "TARGET:",
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
        emptyVocabTitle: "No words added", emptyVocabExample: "Add your first word using the top menu.", emptyVocabList: "No words registered.", emptyMediaList: "No titles registered.", emptyBookList: "No books registered.",
        popupStreakTitle: "Streak Lit! 🔥", popupStreakDesc: "Awesome! Daily streak secured and recorded.", btnContinue: "Continue",
        modalStreakTitle: "Streak Statistics", modalStreakSub: "Daily control & persistent history", modalSeq: "Current Streak", modalMissed: "Missed This Month", modalWeek: "Weekly History", modalNote: "Days without practice are marked in red.", streakResetTime: "Resets at 00:00:", btnUnderstood: "Got It",
        lblModalStudying: "Studying Language", lblModalUi: "Interface Language",
        refazerPerguntas: "Reset Onboarding", modalClose: "Close",
        obTitleStep1: "Welcome to Fluency Lab!", obDescStep1: "What should we call you and where are you from?", obLblName: "Your Name", obLblOrigin: "Interface Language", obBtnNext1: "Next",
        obTitleStep2: "Which language are you going to study?", obDescStep2: "You can switch languages in your profile later.", obBtnBack2: "Back", obBtnNext2: "Next",
        obTitleStep3: "All set for immersion!", obDescStep3: "Your personalized dashboard was set up successfully.", obBtnFinish: "Start Journey"
    },
    es: {
        learningLabel: "Estudiando", uiLabel: "Interfaz",
        navHub: "Inicio", navDash: "Panel", navCad: "Añadir",
        welcome: "BIENVENIDO, {NAME} •", headerAch: "Logros",
        hubTitle: "¿Qué quieres registrar o practicar hoy?",
        hubDesc: "Selecciona un módulo a continuación para seguir tu progreso.",
        cardListeningGoal: "META DE HORAS", cardListeningTitle: "Seguimiento de Escucha", cardListeningDesc: "Podcasts, series y vídeos en el idioma.",
        cardReadingTag: "LECTURA DE LIBROS", cardReadingTitle: "Seguimiento de Lectura", cardReadingDesc: "Libros leídos, obras completadas.",
        cardVocabTag: "TARJETAS", cardVocabTitle: "Entrenador de Vocabulario", cardVocabDesc: "Practica con tarjetas y ejercicios.",
        cardSpeechTag: "LECTURA Y PRONUNCIACIÓN", cardSpeechTitle: "Lector y Voz", cardSpeechDesc: "Lee historias por nivel, evalúa tu pronunciación en tiempo real y entrena tu oído.",
        cardAchTag: "DESAFÍOS Y TROFEOS", cardAchTitle: "GALERÍA DE LOGROS", cardAchDesc: "Desbloquea hasta 100 logros únicos.",
        btnAccess: "Acceder al Panel", btnTrain: "Practicar Vocabulario", btnSpeech: "Practicar Pronunciación", btnAch: "Ver Logros",
        speechTitlePrefix: "Práctica de Lectura y Pronunciación", speechLevel: "Nivel:", lvlEasy: "Fácil", lvlMedium: "Medio", lvlHard: "Difícil", lblSelectStory: "Texto:",
        speechInstruction: "💡 Haz clic en cualquier palabra para escuchar su pronunciación. Presiona el botón para escuchar toda la historia o usa el micrófono para leer en voz alta.",
        btnListenStory: "Escuchar Historia Completa", btnRecordVoice: "Grabar y Evaluar Pronunciación", btnStopVoice: "Detener y Evaluar",
        speechStatusListening: "Escuchando... ¡Lee la historia en voz alta!", speechStatusNoMic: "El reconocimiento de voz no es compatible con este navegador.",
        speechScoreText: "de precisión",
        achBannerTag: "Galería de Trofeos", achBannerTitle: "Galería de 100 Logros", achBannerDesc: "Sigue tu progreso y gana medallas estudiando a diario.",
        lblAchUnlocked: "Desbloqueados", lblAchProgress: "Progreso General",
        achFilterAll: "Todos (100)", achFilterStreak: "🔥 Racha", achFilterVocab: "🧠 Vocabulario", achFilterListening: "🎧 Listening", achFilterReading: "📖 Lectura", achFilterPoly: "🌍 Políglota",
        goalFixed: "Meta (Horas)", progress: "Progreso", ofTarget: "de la meta",
        summaryListening: "Resumen de Escucha", summaryListeningDesc: "Volumen acumulado en el idioma.", realTime: "Tiempo Real", registered: "Registrados",
        hoursByType: "Horas por Tipo de Estudio", hoursByTypeDesc: "Separación por Diamante, Plata y Oro.",
        titlesWatched: "Títulos Vistos", titlesWatchedDesc: "Lista de películas y series.", decimalTotal: "TOTAL DECIMAL:", target: "OBJETIVO:",
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
        emptyVocabTitle: "Sin palabras", emptyVocabExample: "Añade tu primera palabra desde el menú.", emptyVocabList: "No hay palabras registradas.", emptyMediaList: "No hay títulos registrados.", emptyBookList: "No hay libros registrados.",
        popupStreakTitle: "¡Fuego Encendido! 🔥", popupStreakDesc: "¡Excelente! Racha diaria garantizada.", btnContinue: "Continuar",
        modalStreakTitle: "Estadísticas de Racha", modalStreakSub: "Control diario e historial persistente", modalSeq: "Racha Actual", modalMissed: "Faltas del Mes", modalWeek: "Historial Semanal", modalNote: "Días sin práctica quedan en rojo.", streakResetTime: "Reinicia a las 00:00:", btnUnderstood: "Entendido",
        lblModalStudying: "Idioma que estudias", lblModalUi: "Idioma de la interfaz",
        refazerPerguntas: "Reiniciar Onboarding", modalClose: "Cerrar",
        obTitleStep1: "¡Bienvenido a Fluency Lab!", obDescStep1: "¿Cómo te llamamos y de dónde eres?", obLblName: "Tu Nombre", obLblOrigin: "Idioma de la Interfaz", obBtnNext1: "Avanzar",
        obTitleStep2: "¿Qué idioma vas a estudiar?", obDescStep2: "Podrás cambiar de idioma en tu perfil después.", obBtnBack2: "Volver", obBtnNext2: "Avançar",
        obTitleStep3: "¡Todo listo para la inmersión!", obDescStep3: "Tu panel personalizado ha sido configurado con éxito.", obBtnFinish: "Iniciar Viaje"
    },
    fr: {
        learningLabel: "Apprentissage", uiLabel: "Interface",
        navHub: "Accueil", navDash: "Tableau", navCad: "Ajouter",
        welcome: "BIENVENUE, {NAME} •", headerAch: "Succès",
        hubTitle: "Que souhaitez-vous enregistrer ou pratiquer aujourd'hui ?",
        hubDesc: "Sélectionnez un module ci-dessous pour suivre vos progrès.",
        cardListeningGoal: "OBJECTIF HEURES", cardListeningTitle: "Listening Tracker", cardListeningDesc: "Films et séries regardés dans la langue cible.",
        cardReadingTag: "LECTURE DE LIVRES", cardReadingTitle: "Reading Tracker", cardReadingDesc: "Livres lus, nombre d'ouvrages et total de pages.",
        cardVocabTag: "FLASHCARDS", cardVocabTitle: "Vocabulary Trainer", cardVocabDesc: "Entraînez-vous avec des tests de mémoire.",
        cardSpeechTag: "LECTURE & PRONONCIATION", cardSpeechTitle: "Lecteur et Parole", cardSpeechDesc: "Lisez des histoires par niveau, testez votre prononciation en temps réel et entraînez votre écoute.",
        cardAchTag: "DÉFIS & TROPHEES", cardAchTitle: "GALERIE DES SUCCÈS", cardAchDesc: "Débloquez jusqu'à 100 succès uniques grâce à vos progrès.",
        btnAccess: "Accéder au Tableau", btnTrain: "Entraîner le Vocabulaire", btnSpeech: "Pratiquer la Prononciation", btnAch: "Voir les Succès",
        speechTitlePrefix: "Pratique de Lecture et Prononciation", speechLevel: "Niveau :", lvlEasy: "Facile", lvlMedium: "Moyen", lvlHard: "Difficile", lblSelectStory: "Texte :",
        speechInstruction: "💡 Cliquez sur n'importe quel mot pour entendre sa prononciation. Appuyez sur le bouton pour écouter l'histoire complète ou sur le micro pour tester votre lecture à voix haute.",
        btnListenStory: "Écouter l'Histoire Complète", btnRecordVoice: "Enregistrer & Évaluer", btnStopVoice: "Arrêter & Évaluer",
        speechStatusListening: "Écoute en cours... Lisez l'histoire à haute voix !", speechStatusNoMic: "Reconnaissance vocale non prise en charge sur ce navigateur.",
        speechScoreText: "de précision",
        achBannerTag: "Galerie des Trophées", achBannerTitle: "Galerie des 100 Succès", achBannerDesc: "Suivez vos progrès et gagnez des badges en étudiant chaque jour.",
        lblAchUnlocked: "Débloqués", lblAchProgress: "Progrès Global",
        achFilterAll: "Tous (100)", achFilterStreak: "🔥 Série", achFilterVocab: "🧠 Vocabulaire", achFilterListening: "🎧 Listening", achFilterReading: "📖 Lecture", achFilterPoly: "🌍 Polyglotte",
        goalFixed: "Objectif (Heures)", progress: "Progrès", ofTarget: "de l'objectif",
        summaryListening: "Résumé d'Écoute", summaryListeningDesc: "Volume accumulé dans la langue sélectionnée.", realTime: "Temps Réel", registered: "Enregistrés",
        hoursByType: "Heures par Type d'Étude", hoursByTypeDesc: "Répartition Diamant, Argent et Or.",
        titlesWatched: "Titres Visionnés", titlesWatchedDesc: "Liste des films et séries enregistrés.", decimalTotal: "TOTAL DÉCIMAL :", target: "CIBLE :",
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
        emptyVocabTitle: "Aucun mot", emptyVocabExample: "Ajoutez un mot depuis le menu.", emptyVocabList: "Aucun mot enregistré.", emptyMediaList: "Aucun titre enregistré.", emptyBookList: "Aucun livre enregistré.",
        popupStreakTitle: "Série Allumée ! 🔥", popupStreakDesc: "Excellent ! Série quotidienne validée.", btnContinue: "Continuer",
        modalStreakTitle: "Statistiques de Série", modalStreakSub: "Suivi quotidien et historique", modalSeq: "Série Actuelle", modalMissed: "Manqués ce mois", modalWeek: "Historique Semanal", modalNote: "Les jours sans pratique sont marqués en rouge.", streakResetTime: "Réinitialise à 00:00 :", btnUnderstood: "Compris",
        lblModalStudying: "Langue étudiée", lblModalUi: "Langue de l'interface",
        refazerPerguntas: "Réinitialiser Onboarding", modalClose: "Fermer",
        obTitleStep1: "Bienvenue sur Fluency Lab !", obDescStep1: "Comment devrions-nous vous appeler et d'où venez-vous ?", obLblName: "Votre Nom", obLblOrigin: "Langue de l'interface", obBtnNext1: "Suivant",
        obTitleStep2: "Quelle langue allez-vous étudier ?", obDescStep2: "Vous pourrez changer de langue dans votre profil plus tard.", obBtnBack2: "Retour", obBtnNext2: "Suivant",
        obTitleStep3: "Tout est prêt pour l'immersion !", obDescStep3: "Votre tableau de bord personnalisé a été configuré avec succès.", obBtnFinish: "Commencer"
    },
    ja: {
        learningLabel: "学習言語", uiLabel: "インターフェース",
        navHub: "ホーム", navDash: "ダッシュボード", navCad: "新規登録",
        welcome: "ようこそ、{NAME} •", headerAch: "実績・トロフィー",
        hubTitle: "今日はどの学習を記録または練習しますか？",
        hubDesc: "以下のモジュールを選択して進捗状況を確認しましょう。",
        cardListeningGoal: "目標時間", cardListeningTitle: "リスニングトラッカー", cardListeningDesc: "対象言語で視聴した映画、ドラマ、ポッドキャスト。",
        cardReadingTag: "読書・ページ数", cardReadingTitle: "リーディングトラッカー", cardReadingDesc: "読破した本と総ページ数の記録。",
        cardVocabTag: "単語帳・暗記", cardVocabTitle: "ボキャブラリートレーナー", cardVocabDesc: "フラッシュカードと記憶演習で単語力を強化。",
        cardSpeechTag: "音読・発音練習", cardSpeechTitle: "音声リーダー＆発音", cardSpeechDesc: "レベル別の物語を音読し、リアルタイムで発音を評価。",
        cardAchTag: "挑戦・トロフィー", cardAchTitle: "実績ギャラリー", cardAchDesc: "毎日の学習で最大100個のユニークなバッジを解除。",
        btnAccess: "ダッシュボードを開く", btnTrain: "単語の練習を開始", btnSpeech: "発音練習を開始", btnAch: "実績を表示",
        speechTitlePrefix: "音読・発音トレーニング", speechLevel: "難易度:", lvlEasy: "初級", lvlMedium: "中級", lvlHard: "上級", lblSelectStory: "文章:",
        speechInstruction: "💡 単語をクリックすると個別の発音を聞くことができます。ボタンを押して全ストーリーを聴くか、マイクを使って音読をテストしましょう。",
        btnListenStory: "ストーリー全体を聴く", btnRecordVoice: "録音して発音をチェック", btnStopVoice: "停止して評価",
        speechStatusListening: "録音中... ストーリーを声に出して読んでください！", speechStatusNoMic: "このブラウザは音声認識をサポートしていません。",
        speechScoreText: "の正確度",
        achBannerTag: "殿堂入りギャラリー", achBannerTitle: "100実績ギャラリー", achBannerDesc: "毎日の学習で進捗を追跡し、バッジを獲得しましょう。",
        lblAchUnlocked: "解除済み", lblAchProgress: "全体進捗",
        achFilterAll: "すべて (100)", achFilterStreak: "🔥 連続学習", achFilterVocab: "🧠 ボキャブラリー", achFilterListening: "🎧 リスニング", achFilterReading: "📖 読書", achFilterPoly: "🌍 多言語",
        goalFixed: "目標 (時間)", progress: "進捗状況", ofTarget: "の目標達成",
        summaryListening: "リスニング要約", summaryListeningDesc: "選択した言語の累積時間。", realTime: "リアルタイム", registered: "登録済み",
        hoursByType: "学習タイプ別時間", hoursByTypeDesc: "ダイヤモンド、シルバー、ゴールド別の内訳。",
        titlesWatched: "視聴タイトル", titlesWatchedDesc: "登録された映画やドラマのリスト。", decimalTotal: "10進数合計:", target: "目標:",
        addMediaTitle: "映画・ドラマの登録", addMediaDesc: "学習時間を記録しましょう。",
        mediaType: "メディアタイプ", optMovie: "映画", optSeries: "ドラマ",
        titleName: "タイトル名", coverImg: "カバー画像", listeningMode: "リスニングモード",
        descDiamond: "字幕なし (100%集中練習)", descGold: "学習言語の音声と字幕", descSilver: "オリジナル音声＋翻訳字幕",
        hours: "時間", minutes: "分", season: "シーズン (任意)", epCount: "視聴エピソード数", avgHours: "1話平均 (時間)", avgMins: "1話平均 (分)",
        save: "保存する", cancel: "キャンセル",
        totalBooks: "総書籍数", totalPages: "総ページ数", pagesPerBook: "1冊あたりの読書量", pagesPerBookDesc: "登録された作品ごとの読書量。",
        registeredBooks: "保存された書籍", sumPages: "総ページ数:", addBookTitle: "新しい本を登録", addBookDesc: "読んだ本を記録してページ数を計算します。",
        bookTitle: "本のタイトル", bookAuthor: "著者 (任意)", bookPages: "ページ数", bookCover: "表紙画像",
        totalWords: "単語数", accuracyRate: "正解率", registeredVocab: "保存された単語", addWordTitle: "新しい単語を登録", addWordDesc: "トレーニング用の新しい単語を追加します。",
        termInLang: "対象言語の単語・フレーズ", termTranslation: "翻訳 / 意味", termExample: "例文 (任意)",
        tapFlip: "タップして裏返す", clickToFlip: "カードをクリックして翻訳を表示 🔄", translationTag: "翻訳",
        correctHits: "正解:", wrongHits: "不正解:", btnWrong: "覚えていない", btnCorrect: "覚えていた！", btnNextRandom: "次のランダムな単語を引く",
        emptyVocabTitle: "単語が登録されていません", emptyVocabExample: "上部メニューから最初の単語を追加してください。", emptyVocabList: "登録されている単語はありません。", emptyMediaList: "登録されているタイトルはありません。", emptyBookList: "登録されている本はありません。",
        popupStreakTitle: "ストリーク達成！ 🔥", popupStreakDesc: "素晴らしい！毎日の連続学習が記録されました。", btnContinue: "続ける",
        modalStreakTitle: "連続学習の統計", modalStreakSub: "毎日の管理と履歴記録", modalSeq: "現在のストリーク", modalMissed: "今月の欠席", modalWeek: "週間履歴", modalNote: "練習しなかった日は赤で表示されます。", streakResetTime: "リセットまで:", btnUnderstood: "確認",
        lblModalStudying: "学習中の言語", lblModalUi: "UI言語",
        refazerPerguntas: "オンボーディングをやり直す", modalClose: "閉じる",
        obTitleStep1: "Fluency Labへようこそ！", obDescStep1: "お名前とご出身を教えてください。", obLblName: "お名前", obLblOrigin: "UI言語", obBtnNext1: "次へ",
        obTitleStep2: "どの言語を学習しますか？", obDescStep2: "後でプロフィールから変更できます。", obBtnBack2: "戻る", obBtnNext2: "次へ",
        obTitleStep3: "準備が完了しました！", obDescStep3: "パーソナライズされたダッシュボードの設定が完了しました。", obBtnFinish: "学習を開始する"
    }
};

const DB_NAME = 'FluencyLabDB';
const DB_VERSION = 1;
let db = null;

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (e) => {
            const database = e.target.result;
            if (!database.objectStoreNames.contains('listening')) database.createObjectStore('listening', { keyPath: 'storeKey' });
            if (!database.objectStoreNames.contains('reading')) database.createObjectStore('reading', { keyPath: 'storeKey' });
            if (!database.objectStoreNames.contains('vocabulary')) database.createObjectStore('vocabulary', { keyPath: 'storeKey' });
        };
        request.onsuccess = (e) => {
            db = e.target.result;
            resolve(db);
        };
        request.onerror = (e) => reject(e.target.error);
    });
}

function getFromDB(storeName, key) {
    return new Promise((resolve) => {
        if (!db) { resolve(null); return; }
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result ? req.result.data : null);
        req.onerror = () => resolve(null);
    });
}

function saveToDB(storeName, key, data) {
    return new Promise((resolve) => {
        if (!db) { resolve(); return; }
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        store.put({ storeKey: key, data });
        tx.oncomplete = () => resolve();
    });
}

let listeningList = [];
let readingList = [];
let vocabularyList = [];
let vocabStreakData = {}; 
let currentVocabularyIndex = 0;
let isCardFlipped = false;

function generate100Achievements() {
    const list = [];
    const streakDays = [1, 2, 3, 5, 7, 10, 14, 21, 30, 45, 60, 90, 100, 120, 150, 180, 200, 250, 300, 365];
    streakDays.forEach((days, i) => {
        list.push({ id: `streak_${days}`, category: 'streak', title: `Chama Nível ${i+1}`, desc: `Alcance ${days} dia(s) seguidos de ofensiva.`, icon: 'fa-fire' });
    });

    const vocabCounts = [1, 5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 1250, 1500, 2000];
    vocabCounts.forEach((cnt, i) => {
        list.push({ id: `vocab_${cnt}`, category: 'vocab', title: `Colecionador ${i+1}`, desc: `Cadastre ${cnt} palavra(s) no idioma ativo.`, icon: 'fa-brain' });
    });

    const listeningHours = [1, 2, 5, 10, 15, 20, 30, 40, 50, 75, 100, 125, 150, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 1250, 1500];
    listeningHours.forEach((hrs, i) => {
        list.push({ id: `listening_${hrs}`, category: 'listening', title: `Ouvinte Nível ${i+1}`, desc: `Acumule ${hrs} hora(s) de imersão de áudio.`, icon: 'fa-headphones' });
    });

    const pageCounts = [10, 25, 50, 100, 150, 200, 300, 400, 500, 750, 1000, 1250, 1500, 2000, 2500, 3000, 4000, 5000, 7500, 10000];
    pageCounts.forEach((pgs, i) => {
        list.push({ id: `pages_${pgs}`, category: 'reading', title: `Leitor Nível ${i+1}`, desc: `Leia um total de ${pgs} página(s).`, icon: 'fa-book-open' });
    });

    const polyList = [
        { id: 'poly_2', desc: 'Cadastre palavras em pelo menos 2 idiomas.' },
        { id: 'poly_3', desc: 'Cadastre palavras em pelo menos 3 idiomas.' },
        { id: 'poly_4', desc: 'Cadastre palavras em pelo menos 4 idiomas.' },
        { id: 'poly_5', desc: 'Cadastre palavras em todos os 5 idiomas.' },
        { id: 'listening_diamond', desc: 'Conclua 5 horas no modo Diamante.' },
        { id: 'accuracy_80', desc: 'Atinge 80% de taxa de acertos no Flashcard.' },
        { id: 'accuracy_95', desc: 'Atinge 95% de taxa de acertos no Flashcard.' },
        { id: 'first_book', desc: 'Cadastre seu primeiro livro completo.' },
        { id: 'first_media', desc: 'Cadastre seu primeiro filme ou série.' },
        { id: 'master_all', desc: 'Alcance 50 conquistas desbloqueadas.' }
    ];
    polyList.forEach((p, i) => {
        list.push({ id: p.id, category: 'polyglot', title: `Especialista ${i+1}`, desc: p.desc, icon: 'fa-globe' });
    });

    return list;
}

const ACHIEVEMENTS_DATA = generate100Achievements();

function checkOnboardingStatus() {
    const isCompleted = localStorage.getItem('luis_onboarding_completed');
    const overlay = document.getElementById('onboarding-overlay');
    if (!isCompleted) {
        if (overlay) overlay.classList.remove('hidden');
        selectOnboardingTarget(targetLang);
        selectOnboardingOrigin(userOrigin);
    } else {
        if (overlay) overlay.classList.add('hidden');
    }
}

function nextOnboardingStep(step) {
    if (step === 2) {
        const inputName = document.getElementById('onboarding-input-name')?.value.trim();
        if (!inputName) {
            alert("Por favor, digite seu nome!");
            return;
        }
        userName = inputName;
    }

    document.getElementById('onboarding-step-1')?.classList.add('hidden');
    document.getElementById('onboarding-step-2')?.classList.add('hidden');
    document.getElementById('onboarding-step-3')?.classList.add('hidden');

    document.getElementById(`onboarding-step-${step}`)?.classList.remove('hidden');

    const progressEl = document.getElementById('onboarding-progress');
    if (progressEl) {
        progressEl.style.width = step === 1 ? '33%' : step === 2 ? '66%' : '100%';
    }
}

function selectOnboardingTarget(lang) {
    obTempTarget = lang;
    ['en', 'es', 'fr', 'ja'].forEach(l => {
        const btn = document.getElementById(`ob-target-${l}`);
        if (btn) {
            if (l === lang) btn.classList.add('ob-option-selected');
            else btn.classList.remove('ob-option-selected');
        }
    });
}

function selectOnboardingOrigin(countryLang) {
    obTempOrigin = countryLang;
    ['pt', 'en', 'es', 'fr', 'ja'].forEach(c => {
        const btn = document.getElementById(`ob-origin-${c}`);
        if (btn) {
            if (c === countryLang) btn.classList.add('ob-option-selected');
            else btn.classList.remove('ob-option-selected');
        }
    });
}

async function finishOnboarding() {
    targetLang = obTempTarget;
    userOrigin = obTempOrigin;
    uiLang = obTempOrigin; 

    localStorage.setItem('luis_user_name', userName);
    localStorage.setItem('luis_user_origin', userOrigin);
    localStorage.setItem('luis_target_language', targetLang);
    localStorage.setItem('luis_ui_language', uiLang);
    localStorage.setItem('luis_onboarding_completed', 'true');

    const overlay = document.getElementById('onboarding-overlay');
    if (overlay) overlay.classList.add('hidden');

    await loadLanguageData();
    updateThemeAndFlags();
    applyUITranslations();
    refreshAllDashboards();
}

function resetOnboardingData() {
    localStorage.removeItem('luis_onboarding_completed');
    closeUserProfileModal();
    checkOnboardingStatus();
}

async function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            userAvatar = evt.target.result;
            localStorage.setItem('luis_user_avatar', userAvatar);
            updateUserAvatarUI();
        };
        reader.readAsDataURL(file);
    }
}

function updateUserAvatarUI() {
    const avatarImg = document.getElementById('user-avatar-img');
    const avatarIcon = document.getElementById('user-avatar-icon');
    
    const headerImgDesk = document.getElementById('header-user-img-desktop');
    const headerIconDesk = document.getElementById('header-user-icon-desktop');

    const headerImgMob = document.getElementById('header-user-img-mobile');
    const headerIconMob = document.getElementById('header-user-icon-mobile');

    if (userAvatar) {
        if (avatarImg) { avatarImg.src = userAvatar; avatarImg.classList.remove('hidden'); }
        if (avatarIcon) avatarIcon.classList.add('hidden');

        if (headerImgDesk) { headerImgDesk.src = userAvatar; headerImgDesk.classList.remove('hidden'); }
        if (headerIconDesk) headerIconDesk.classList.add('hidden');

        if (headerImgMob) { headerImgMob.src = userAvatar; headerImgMob.classList.remove('hidden'); }
        if (headerIconMob) headerIconMob.classList.add('hidden');
    } else {
        if (avatarImg) avatarImg.classList.add('hidden');
        if (avatarIcon) avatarIcon.classList.remove('hidden');

        if (headerImgDesk) headerImgDesk.classList.add('hidden');
        if (headerIconDesk) headerIconDesk.classList.remove('hidden');

        if (headerImgMob) headerImgMob.classList.add('hidden');
        if (headerIconMob) headerIconMob.classList.remove('hidden');
    }
}

function openUserProfileModal() {
    const modal = document.getElementById('user-profile-modal');
    if (modal) {
        const originNames = { pt: 'Brasil 🇧🇷', en: 'USA 🇺🇸', es: 'España 🇪🇸', fr: 'France 🇫🇷', ja: 'Japan 🇯🇵' };
        document.getElementById('user-modal-name').innerText = userName;
        document.getElementById('user-modal-origin').innerText = `Origem: ${originNames[userOrigin] || 'Brasil 🇧🇷'}`;
        
        const targetSel = document.getElementById('user-modal-target-select');
        const uiSel = document.getElementById('user-modal-ui-select');
        if (targetSel) targetSel.value = targetLang;
        if (uiSel) uiSel.value = uiLang;

        updateUserAvatarUI();
        modal.classList.remove('hidden');
    }
}

function closeUserProfileModal() {
    const modal = document.getElementById('user-profile-modal');
    if (modal) modal.classList.add('hidden');
}

async function loadLanguageData() {
    targetListeningHours = Number(localStorage.getItem(`luis_target_listening_hours_${targetLang}`)) || 1000;
    
    listeningList = await getFromDB('listening', `luis_listening_${targetLang}`) || JSON.parse(localStorage.getItem(`luis_listening_${targetLang}`)) || [];
    readingList = await getFromDB('reading', `luis_reading_${targetLang}`) || JSON.parse(localStorage.getItem(`luis_reading_${targetLang}`)) || [];
    vocabularyList = await getFromDB('vocabulary', `luis_vocab_${targetLang}`) || JSON.parse(localStorage.getItem(`luis_vocab_${targetLang}`)) || [];
    
    vocabStreakData = JSON.parse(localStorage.getItem(`luis_vocab_streak_${targetLang}`)) || { 
        lastPracticeDate: '', 
        streakCount: 0, 
        history: {}, 
        currentMonth: new Date().getMonth(),
        missedThisMonth: 0,
        popShownDates: {} 
    };

    checkMidnightAndTolerance();
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

async function saveListeningData() { await saveToDB('listening', `luis_listening_${targetLang}`, listeningList); }
async function saveReadingData() { await saveToDB('reading', `luis_reading_${targetLang}`, readingList); }
async function saveVocabularyData() { await saveToDB('vocabulary', `luis_vocab_${targetLang}`, vocabularyList); }
function saveVocabStreakData() { localStorage.setItem(`luis_vocab_streak_${targetLang}`, JSON.stringify(vocabStreakData)); }

function updateStreakCountdown() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const diff = midnight - now;

    if (diff <= 0) {
        checkMidnightAndTolerance();
        return;
    }

    const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

    const timerEl = document.getElementById('streak-countdown-timer');
    if (timerEl) {
        timerEl.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

function speakWord(wordText) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(wordText);
    const meta = LANG_META[targetLang] || LANG_META['en'];
    utterance.lang = meta.code || 'en-US';
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
        localStorage.setItem(`luis_target_listening_hours_${targetLang}`, targetListeningHours);
        renderListeningDashboard();
    }
}

async function changeTargetLanguage(newLang) {
    targetLang = newLang;
    localStorage.setItem('luis_target_language', targetLang);
    await loadLanguageData();
    updateThemeAndFlags();
    refreshAllDashboards();
}

async function changeUILanguage(newUILang) {
    uiLang = newUILang;
    localStorage.setItem('luis_ui_language', uiLang);
    await loadLanguageData();
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

    const txt = UI_TEXTS[uiLang] || UI_TEXTS['pt'];
    const welcomeStr = txt.welcome.replace('{NAME}', userName.toUpperCase());

    const setText = (id, textVal) => { const el = document.getElementById(id); if (el) el.innerText = textVal; };
    setText('header-subtitle', meta.platformName);
    setText('listening-welcome-prefix', `Listening (${meta.name})`);
    setText('reading-title-prefix', `Reading (${meta.name})`);
    setText('vocab-title-prefix', `Vocabulary (${meta.name})`);
    setText('speech-title-prefix', `${txt.speechTitlePrefix} (${meta.name})`);
    setText('card-front-lang-label', meta.name);
    setText('hub-welcome', `${welcomeStr} ${meta.name.toUpperCase()}`);
    setText('footer-text', `Fluency Lab • ${meta.edition} • 2026`);

    const iconClass = themeMode === 'dark' ? 'fa-solid fa-sun text-blue-400' : 'fa-solid fa-moon text-slate-700';
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
    if (currentModule === 'speech') renderSpeechModule();
    if (currentModule === 'achievements') renderAchievementsModule();
}

function applyUITranslations() {
    const txt = UI_TEXTS[uiLang] || UI_TEXTS['pt'];
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    const setHtml = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };

    setText('lbl-nav-hub', txt.navHub);
    setText('lbl-nav-dash', txt.navDash);
    setText('lbl-nav-cad', txt.navCad);
    setText('lbl-header-achievements', txt.headerAch);
    
    setText('hub-title-text', txt.hubTitle);
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
    setText('card-speech-tag', txt.cardSpeechTag);
    setText('card-speech-title', txt.cardSpeechTitle);
    setText('card-speech-desc', txt.cardSpeechDesc);
    setText('card-ach-tag', txt.cardAchTag);
    setText('card-ach-title', txt.cardAchTitle);
    setText('card-ach-desc', txt.cardAchDesc);

    document.querySelectorAll('.hub-btn-access').forEach(el => el.innerText = txt.btnAccess);
    setText('hub-btn-train', txt.btnTrain);
    setText('hub-btn-speech', txt.btnSpeech);
    setText('hub-btn-ach', txt.btnAch);

    setText('lbl-difficulty-level', txt.speechLevel);
    setText('lbl-select-story', txt.lblSelectStory);
    setText('speech-lvl-easy', txt.lvlEasy);
    setText('speech-lvl-medium', txt.lvlMedium);
    setText('speech-lvl-hard', txt.lvlHard);
    setText('speech-instruction', txt.speechInstruction);
    setText('lbl-btn-listen-story', txt.btnListenStory);
    setText('lbl-btn-record-voice', isRecognizingVoice ? txt.btnStopVoice : txt.btnRecordVoice);

    setText('ach-banner-tag', txt.achBannerTag);
    setText('ach-banner-title', txt.achBannerTitle);
    setText('ach-banner-desc', txt.achBannerDesc);
    setText('lbl-ach-unlocked', txt.lblAchUnlocked);
    setText('lbl-ach-progress', txt.lblAchProgress);

    setText('ach-filter-all', txt.achFilterAll);
    setText('ach-filter-streak', txt.achFilterStreak);
    setText('ach-filter-vocab', txt.achFilterVocab);
    setText('ach-filter-listening', txt.achFilterListening);
    setText('ach-filter-reading', txt.achFilterReading);
    setText('ach-filter-polyglot', txt.achFilterPoly);

    setText('lbl-goal-fixed', txt.goalFixed);
    setText('lbl-progress', txt.progress);
    setText('lbl-of-target', txt.ofTarget);
    setHtml('lbl-summary-listening', `<i class="fa-solid fa-chart-line"></i> ${txt.summaryListening}`);
    setText('lbl-summary-listening-desc', txt.summaryListeningDesc);
    setText('lbl-real-time', txt.realTime);
    setText('lbl-registered', txt.registered);
    setText('lbl-hours-by-type', txt.hoursByType);
    setText('lbl-hours-by-type-desc', txt.hoursByTypeDesc);
    setHtml('lbl-titles-watched', `<i class="fa-solid fa-list"></i> ${txt.titlesWatched}`);
    setText('lbl-titles-watched-desc', txt.titlesWatchedDesc);
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

    setText('popup-streak-title', txt.popupStreakTitle);
    setText('popup-streak-desc', txt.popupStreakDesc);
    setText('btn-streak-continue', txt.btnContinue);

    setText('modal-streak-title', txt.modalStreakTitle);
    setText('modal-streak-sub', txt.modalStreakSub);
    setText('lbl-modal-current-seq', txt.modalSeq);
    setText('lbl-modal-missed-month', txt.modalMissed);
    setText('lbl-modal-week-hist', txt.modalWeek);
    setText('lbl-modal-red-note', txt.modalNote);
    setText('lbl-streak-reset-time', txt.streakResetTime);
    setText('btn-modal-understood', txt.btnUnderstood);

    setText('lbl-modal-studying', txt.lblModalStudying);
    setText('lbl-modal-ui', txt.lblModalUi);
    setText('btn-refazer-perguntas', txt.refazerPerguntas);
    setText('btn-modal-close', txt.modalClose);

    setText('ob-title-step1', txt.obTitleStep1);
    setText('ob-desc-step1', txt.obDescStep1);
    setText('ob-lbl-name', txt.obLblName);
    setText('ob-lbl-origin', txt.obLblOrigin);
    setText('ob-btn-next1', txt.obBtnNext1);
    setText('ob-title-step2', txt.obTitleStep2);
    setText('ob-desc-step2', txt.obDescStep2);
    setText('ob-btn-back2', txt.obBtnBack2);
    setText('ob-btn-next2', txt.obBtnNext2);
    setText('ob-title-step3', txt.obTitleStep3);
    setText('ob-desc-step3', txt.obDescStep3);
    setText('ob-btn-finish', txt.obBtnFinish);
}

function openModule(moduleName) {
    currentModule = moduleName;
    const modHub = document.getElementById('module-hub');
    const modListening = document.getElementById('module-listening');
    const modReading = document.getElementById('module-reading');
    const modVocab = document.getElementById('module-vocabulary');
    const modSpeech = document.getElementById('module-speech');
    const modAch = document.getElementById('module-achievements');

    if (modHub) modHub.classList.add('hidden');
    if (modListening) modListening.classList.add('hidden');
    if (modReading) modReading.classList.add('hidden');
    if (modVocab) modVocab.classList.add('hidden');
    if (modSpeech) modSpeech.classList.add('hidden');
    if (modAch) modAch.classList.add('hidden');

    const nav = document.getElementById('main-nav');
    const subnavTabs = document.getElementById('subnav-tabs-container');

    if (moduleName === 'hub') {
        if (modHub) modHub.classList.remove('hidden');
        if (nav) nav.classList.add('hidden');
    } else {
        if (nav) nav.classList.remove('hidden');
        
        if (subnavTabs) {
            if (moduleName === 'achievements' || moduleName === 'speech') {
                subnavTabs.classList.add('hidden');
            } else {
                subnavTabs.classList.remove('hidden');
            }
        }

        const activeEl = document.getElementById(`module-${moduleName}`);
        if (activeEl) {
            activeEl.classList.remove('hidden');
            activeEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        if (moduleName === 'speech') {
            renderSpeechModule();
        } else if (moduleName === 'achievements') {
            renderAchievementsModule();
        } else {
            switchTab('dashboard');
        }
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
        if (btnDash) btnDash.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow animated-nav-btn nav-btn-active";
        if (btnCad) btnCad.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all animated-nav-btn opacity-80 hover:opacity-100";
    } else {
        if (btnCad) btnCad.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow animated-nav-btn nav-btn-active";
        if (btnDash) btnDash.className = "px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all animated-nav-btn opacity-80 hover:opacity-100";
    }
}

/* ============ MÓDULO DE LEITURA & PRONÚNCIA ============ */
function setSpeechLevel(lvl) {
    currentSpeechLevel = lvl;
    currentStoryIndex = 0; // Volta para o primeiro texto ao mudar nível
    ['easy', 'medium', 'hard'].forEach(l => {
        const btn = document.getElementById(`speech-lvl-${l}`);
        if (btn) {
            if (l === lvl) {
                btn.className = "px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-blue-600 text-white shadow";
            } else {
                btn.className = "px-3 py-1.5 rounded-lg text-xs font-bold transition-all opacity-70 hover:opacity-100";
            }
        }
    });
    renderSpeechModule();
}

function changeStoryIndex(idx) {
    currentStoryIndex = parseInt(idx) || 0;
    renderSpeechModule();
}

function getCurrentStory() {
    const storiesList = generate50Stories(targetLang, currentSpeechLevel);
    return storiesList[currentStoryIndex] || storiesList[0];
}

function renderSpeechModule() {
    // Preenche o seletor de 1 a 50
    const selectEl = document.getElementById('speech-story-select');
    if (selectEl && selectEl.options.length !== 50) {
        selectEl.innerHTML = '';
        for (let i = 0; i < 50; i++) {
            const opt = document.createElement('option');
            opt.value = i;
            opt.innerText = `Texto ${i + 1}`;
            selectEl.appendChild(opt);
        }
    }
    if (selectEl) selectEl.value = currentStoryIndex;

    const story = getCurrentStory();
    const titleEl = document.getElementById('speech-story-title');
    const container = document.getElementById('speech-story-container');

    if (titleEl) titleEl.innerText = story.title;
    if (container) {
        container.innerHTML = '';
        story.paragraphs.forEach((pText) => {
            const p = document.createElement('p');
            p.className = "leading-relaxed";
            
            const words = pText.split(/(\s+)/);
            words.forEach((w) => {
                if (w.trim().length === 0) {
                    p.appendChild(document.createTextNode(w));
                } else {
                    const span = document.createElement('span');
                    span.className = "story-word";
                    span.innerText = w;
                    span.setAttribute('data-clean-word', cleanWordText(w));
                    span.onclick = () => speakWord(cleanWordText(w));
                    p.appendChild(span);
                }
            });

            container.appendChild(p);
        });
    }

    const feedbackBar = document.getElementById('speech-feedback-bar');
    if (feedbackBar) feedbackBar.classList.add('hidden');
}

function cleanWordText(w) {
    return w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'«»]/g, "").toLowerCase().trim();
}

function listenFullStory() {
    const story = getCurrentStory();
    const fullText = story.paragraphs.join(' ');
    speakWord(fullText);
}

function toggleVoiceRecognition() {
    if (isRecognizingVoice) {
        stopVoiceRecognition();
    } else {
        startVoiceRecognition();
    }
}

function startVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const txt = UI_TEXTS[uiLang] || UI_TEXTS['pt'];

    if (!SpeechRecognition) {
        alert(txt.speechStatusNoMic);
        return;
    }

    speechRecognitionInstance = new SpeechRecognition();
    const meta = LANG_META[targetLang] || LANG_META['en'];
    speechRecognitionInstance.lang = meta.code || 'en-US';
    speechRecognitionInstance.continuous = true;
    speechRecognitionInstance.interimResults = true;

    speechRecognitionInstance.onstart = () => {
        isRecognizingVoice = true;
        updateVoiceButtonUI();
        const feedbackBar = document.getElementById('speech-feedback-bar');
        const statusText = document.getElementById('speech-status-text');
        if (feedbackBar) feedbackBar.classList.remove('hidden');
        if (statusText) statusText.innerText = txt.speechStatusListening;
        
        document.querySelectorAll('.story-word').forEach(sp => {
            sp.classList.remove('word-correct', 'word-incorrect');
        });
    };

    speechRecognitionInstance.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcript += event.results[i][0].transcript + ' ';
        }
        evaluateSpeech(transcript);
    };

    speechRecognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        stopVoiceRecognition();
    };

    speechRecognitionInstance.onend = () => {
        isRecognizingVoice = false;
        updateVoiceButtonUI();
    };

    speechRecognitionInstance.start();
}

function stopVoiceRecognition() {
    if (speechRecognitionInstance) {
        speechRecognitionInstance.stop();
        speechRecognitionInstance = null;
    }
    isRecognizingVoice = false;
    updateVoiceButtonUI();
}

function updateVoiceButtonUI() {
    const txt = UI_TEXTS[uiLang] || UI_TEXTS['pt'];
    const lblBtn = document.getElementById('lbl-btn-record-voice');
    const micIcon = document.getElementById('mic-icon');
    const btn = document.getElementById('btn-record-voice');

    if (isRecognizingVoice) {
        if (lblBtn) lblBtn.innerText = txt.btnStopVoice;
        if (micIcon) micIcon.className = "fa-solid fa-square text-red-400 animate-pulse";
        if (btn) btn.className = "w-full sm:w-auto px-8 py-3.5 rounded-xl bg-red-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg hover:brightness-110 transition-all";
    } else {
        if (lblBtn) lblBtn.innerText = txt.btnRecordVoice;
        if (micIcon) micIcon.className = "fa-solid fa-microphone";
        if (btn) btn.className = "w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg hover:brightness-110 transition-all";
    }
}

function evaluateSpeech(userTranscript) {
    const spokenWords = userTranscript.toLowerCase().split(/\s+/).map(w => cleanWordText(w)).filter(Boolean);
    const wordSpans = document.querySelectorAll('.story-word');
    
    let correctCount = 0;
    let totalCount = wordSpans.length;

    wordSpans.forEach(span => {
        const targetWord = span.getAttribute('data-clean-word');
        if (spokenWords.includes(targetWord)) {
            span.classList.add('word-correct');
            span.classList.remove('word-incorrect');
            correctCount++;
        } else {
            span.classList.add('word-incorrect');
            span.classList.remove('word-correct');
        }
    });

    const scorePct = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    const scoreTextEl = document.getElementById('speech-score-text');
    const txt = UI_TEXTS[uiLang] || UI_TEXTS['pt'];
    if (scoreTextEl) scoreTextEl.innerText = `${scorePct}% ${txt.speechScoreText}`;
}

/* ============ DEMAIS FUNÇÕES DO SISTEMA ============ */
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
        container.innerHTML = listeningList.length === 0 ? `<p class="text-xs opacity-70 text-center py-6 font-medium">${txt.emptyMediaList}</p>` : '';
        listeningList.forEach(item => {
            const itemDec = getDecimalHours(Number(item.hours), Number(item.minutes));
            const labelMap = { 'DIAMANTE': '💎 DIAMANTE', 'OURO': '🥇 OURO', 'PRATA': '🥈 PRATA' };

            const div = document.createElement('div');
            div.className = "flex items-center justify-between p-3.5 rounded-2xl border transition-all sub-card shadow-sm";
            div.innerHTML = `
                <div class="flex items-center gap-3">
                    ${item.cover ? `<img src="${item.cover}" class="w-11 h-11 rounded-xl object-cover border shadow-sm">` : `<div class="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold sub-card border shadow-inner"><i class="fa-solid fa-film"></i></div>`}
                    <div class="space-y-0.5">
                        <span class="text-xs font-bold block">${item.name} ${item.season ? '('+item.season+')' : ''}</span>
                        <span class="text-[11px] opacity-80 block">${item.hours}h ${item.minutes}m • ${itemDec.toFixed(2)}h</span>
                        <span class="text-[10px] font-black block text-blue-500">${labelMap[item.studyType]}</span>
                    </div>
                </div>
                <div class="flex items-center gap-1">
                    <button onclick="editListeningItem('${item.id}')" class="opacity-80 hover:opacity-100 hover:text-blue-500 p-2 transition-colors" title="Editar"><i class="fa-solid fa-pencil text-xs"></i></button>
                    <button onclick="deleteListeningItem('${item.id}', '${item.name}')" class="opacity-80 hover:opacity-100 hover:text-red-500 p-2 transition-colors" title="Excluir"><i class="fa-solid fa-trash-can text-xs"></i></button>
                </div>
            `;
            container.appendChild(div);
        });
    }

    const chartDonutColor = '#3b82f6';
    const chartRestColor = themeMode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.15)';
    const gridColor = themeMode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.12)';
    const textColor = themeMode === 'light' ? '#1e293b' : '#f1f5f9';

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
            data: { labels: ['💎 DIAMANTE', '🥇 OURO', '🥈 PRATA'], datasets: [{ data: [hoursByStudy['DIAMANTE']/60, hoursByStudy['OURO']/60, hoursByStudy['PRATA']/60], backgroundColor: ['#1d4ed8', '#2563eb', '#60a5fa'], borderRadius: 6, barThickness: 24 }] },
            options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, scales: { x: { beginAtZero: true, grid: { color: gridColor }, ticks: { font: { size: 10 }, color: textColor } }, y: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' }, color: textColor } } }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ' ' + c.parsed.x.toFixed(2) + 'h' } } } }
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
        container.innerHTML = readingList.length === 0 ? `<p class="text-xs opacity-70 text-center py-6 font-medium">${txt.emptyBookList}</p>` : '';
        readingList.forEach(book => {
            const div = document.createElement('div');
            div.className = "flex items-center justify-between p-3.5 rounded-2xl border transition-all sub-card shadow-sm";
            div.innerHTML = `
                <div class="flex items-center gap-3">
                    ${book.cover ? `<img src="${book.cover}" class="w-10 h-12 rounded-xl object-cover border shadow-sm">` : `<div class="w-10 h-12 rounded-xl flex items-center justify-center text-xs font-bold sub-card border shadow-inner"><i class="fa-solid fa-book"></i></div>`}
                    <div class="space-y-0.5">
                        <span class="text-xs font-bold block">${book.title}</span>
                        ${book.author ? `<span class="text-[11px] opacity-80 block">${book.author}</span>` : ''}
                        <span class="text-[10px] font-black text-blue-500 block">${book.pages} páginas</span>
                    </div>
                </div>
                <div class="flex items-center gap-1">
                    <button onclick="editReadingItem('${book.id}')" class="opacity-80 hover:opacity-100 hover:text-blue-500 p-2 transition-colors" title="Editar"><i class="fa-solid fa-pencil text-xs"></i></button>
                    <button onclick="deleteReadingItem('${book.id}', '${book.title}')" class="opacity-80 hover:opacity-100 hover:text-red-500 p-2 transition-colors" title="Excluir"><i class="fa-solid fa-trash-can text-xs"></i></button>
                </div>
            `;
            container.appendChild(div);
        });
    }

    const gridColor = themeMode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.12)';
    const textColor = themeMode === 'light' ? '#1e293b' : '#f1f5f9';
    const canvasBar = document.getElementById('readingBarChart');
    if (canvasBar) {
        const ctxBar = canvasBar.getContext('2d');
        if (readingBarChart) readingBarChart.destroy();
        readingBarChart = new Chart(ctxBar, {
            type: 'bar',
            data: { labels: readingList.map(b => b.title.length > 15 ? b.title.substring(0, 15) + '...' : b.title), datasets: [{ data: readingList.map(b => Number(b.pages)), backgroundColor: '#2563eb', borderRadius: 6, barThickness: 20 }] },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, grid: { color: gridColor }, ticks: { font: { size: 10 }, color: textColor } }, x: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' }, color: textColor } } }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => ' ' + c.parsed.y + ' páginas' } } } }
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
        container.innerHTML = vocabularyList.length === 0 ? `<p class="text-xs opacity-70 text-center py-6 font-medium">${txt.emptyVocabList}</p>` : '';
        vocabularyList.forEach((v, idx) => {
            const seqNumber = idx + 1;
            const div = document.createElement('div');
            div.className = "flex items-center justify-between p-3.5 rounded-2xl border transition-all sub-card shadow-sm";
            div.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center border sub-card shadow-inner">#${seqNumber}</span>
                    <div class="space-y-0.5">
                        <span class="text-xs font-bold block">${v.word}</span>
                        <span class="text-[11px] opacity-80 block">${v.translation}</span>
                        <span class="text-[10px] opacity-90 block">${txt.correctHits} <strong class="text-blue-500 font-black">${v.correctCount || 0}</strong> | ${txt.wrongHits} <strong class="text-red-500 font-black">${v.wrongCount || 0}</strong></span>
                    </div>
                </div>
                <div class="flex items-center gap-1">
                    <button onclick="speakWord('${v.word}')" class="p-2 opacity-80 hover:opacity-100 text-blue-500 transition-colors" title="Ouvir"><i class="fa-solid fa-volume-high text-xs"></i></button>
                    <button onclick="editVocabularyItem('${v.id}')" class="opacity-80 hover:opacity-100 hover:text-blue-500 p-2 transition-colors" title="Editar"><i class="fa-solid fa-pencil text-xs"></i></button>
                    <button onclick="deleteVocabularyItem('${v.id}', '${v.word}')" class="opacity-80 hover:opacity-100 hover:text-red-500 p-2 transition-colors" title="Excluir"><i class="fa-solid fa-trash-can text-xs"></i></button>
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
        
        const todayStr = new Date().toISOString().split('T')[0];
        const isDoneToday = vocabStreakData.lastPracticeDate === todayStr;
        const noticeEl = document.getElementById('streak-vocab-notice');
        
        if (noticeEl) {
            if (isDoneToday) {
                noticeEl.className = "p-3.5 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-500 text-xs font-medium leading-relaxed";
                noticeEl.innerHTML = "🔥 <strong>Ofensiva mantida!</strong> Você já praticou o vocabulário hoje e garantiu o seu fogo aceso.";
            } else {
                noticeEl.className = "p-3.5 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-500 text-xs font-medium leading-relaxed";
                noticeEl.innerHTML = "🔥 Para acender o fogo e manter sua ofensiva hoje, você precisa <strong>completar a tarefa de praticar vocabulário</strong>!";
            }
        }

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

                let cardClass = 'sub-card opacity-70';
                let iconColor = 'text-slate-400 opacity-50';

                if (isDone) {
                    cardClass = 'bg-blue-500/20 border-blue-500 text-blue-500 font-bold';
                    iconColor = 'text-blue-500 opacity-100 animate-pulse';
                } else if (isMissed) {
                    cardClass = 'bg-red-500/20 border-red-500 text-red-500 font-bold';
                    iconColor = 'text-red-500 opacity-100';
                }

                const div = document.createElement('div');
                div.className = `p-2 rounded-xl border flex flex-col items-center justify-center gap-1 ${cardClass} shadow-sm`;
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

function renderAchievementsModule() {
    const grid = document.getElementById('achievements-full-grid');
    if (!grid) return;

    ['all', 'streak', 'vocab', 'listening', 'reading', 'polyglot'].forEach(cat => {
        const btn = document.getElementById(`ach-filter-${cat}`);
        if (btn) {
            if (cat === currentAchFilter) {
                btn.className = "px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all border ach-filter-active shadow-sm";
            } else {
                btn.className = "px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all border sub-card shadow-sm";
            }
        }
    });

    grid.innerHTML = '';
    let unlockedTotal = 0;

    let totalListeningMins = 0;
    listeningList.forEach(item => totalListeningMins += (Number(item.hours) * 60) + Number(item.minutes));
    const totalListeningHrs = totalListeningMins / 60;

    let totalPagesRead = 0;
    readingList.forEach(b => totalPagesRead += Number(b.pages));

    const currentStreak = vocabStreakData.streakCount || 0;
    const currentVocabCount = vocabularyList.length;

    ACHIEVEMENTS_DATA.forEach(ach => {
        let isUnlocked = false;

        if (ach.category === 'streak') {
            const reqDays = parseInt(ach.id.replace('streak_', '')) || 0;
            if (currentStreak >= reqDays) isUnlocked = true;
        } else if (ach.category === 'vocab') {
            const reqVocab = parseInt(ach.id.replace('vocab_', '')) || 0;
            if (currentVocabCount >= reqVocab) isUnlocked = true;
        } else if (ach.category === 'listening') {
            const reqHrs = parseInt(ach.id.replace('listening_', '')) || 0;
            if (totalListeningHrs >= reqHrs) isUnlocked = true;
        } else if (ach.category === 'reading') {
            const reqPgs = parseInt(ach.id.replace('pages_', '')) || 0;
            if (totalPagesRead >= reqPgs) isUnlocked = true;
        } else if (ach.category === 'polyglot') {
            if (ach.id === 'first_book' && readingList.length > 0) isUnlocked = true;
            if (ach.id === 'first_media' && listeningList.length > 0) isUnlocked = true;
        }

        if (isUnlocked) unlockedTotal++;

        if (currentAchFilter !== 'all' && ach.category !== currentAchFilter) return;

        const div = document.createElement('div');
        div.className = `p-4 rounded-2xl border flex flex-col items-center text-center space-y-2 transition-all ${isUnlocked ? 'sub-card border-blue-500/50 shadow-xl backdrop-blur-md' : 'opacity-40 grayscale sub-card'}`;
        div.innerHTML = `
            <div class="w-10 h-10 rounded-xl flex items-center justify-center text-blue-500 font-bold text-lg ${isUnlocked ? 'bg-blue-500/20' : 'bg-slate-400/20'} shadow-inner">
                <i class="fa-solid ${ach.icon}"></i>
            </div>
            <span class="text-xs font-black block leading-tight">${ach.title}</span>
            <span class="text-[10px] opacity-80 font-medium leading-tight block">${ach.desc}</span>
        `;
        grid.appendChild(div);
    });

    const countEl = document.getElementById('ach-unlocked-count');
    const pctEl = document.getElementById('ach-progress-pct');
    if (countEl) countEl.innerText = `${unlockedTotal} / 100`;
    if (pctEl) pctEl.innerText = `${Math.round((unlockedTotal / 100) * 100)}%`;
}

function filterAchievements(cat) {
    currentAchFilter = cat;
    renderAchievementsModule();
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
        if (iconMobile) iconMobile.className = "fa-solid fa-fire text-blue-500 opacity-100 animate-pulse";
        if (iconDesk) iconDesk.className = "fa-solid fa-fire text-blue-500 opacity-100 animate-pulse";
    } else {
        if (iconMobile) iconMobile.className = "fa-solid fa-fire text-slate-400 opacity-70";
        if (iconDesk) iconDesk.className = "fa-solid fa-fire text-slate-400 opacity-70";
    }
}

async function gradeFlashcard(isCorrect) {
    if (vocabularyList.length === 0) return;
    const item = vocabularyList[currentVocabularyIndex];
    if (isCorrect) item.correctCount = (item.correctCount || 0) + 1;
    else item.wrongCount = (item.wrongCount || 0) + 1;
    
    await saveVocabularyData();
    recordVocabPracticeToday(); 
    renderVocabularyDashboard();
    nextFlashcardRandom();
}

function editListeningItem(id) {
    const item = listeningList.find(i => i.id === id);
    if (!item) return;
    
    switchTab('cadastro');
    document.getElementById('editingMediaId').value = item.id;
    document.getElementById('mediaName').value = item.name;

    const radios = document.querySelectorAll('input[name="mediaType"]');
    radios.forEach(r => {
        if (r.value === item.type) { r.checked = true; toggleMediaType(item.type); }
    });

    const studyRadios = document.querySelectorAll('input[name="studyType"]');
    studyRadios.forEach(r => { if (r.value === item.studyType) r.checked = true; });

    if (item.type === 'filme') {
        document.getElementById('filmHours').value = item.hours;
        document.getElementById('filmMinutes').value = item.minutes;
    } else {
        document.getElementById('seriesSeason').value = item.season || '';
        document.getElementById('filmHours').value = item.hours;
        document.getElementById('filmMinutes').value = item.minutes;
    }
}

function cancelMediaEdit() {
    document.getElementById('editingMediaId').value = '';
    const form = document.getElementById('media-form');
    if (form) form.reset();
    switchTab('dashboard');
}

async function handleListeningFormSubmit(e) {
    e.preventDefault();
    const editingId = document.getElementById('editingMediaId').value;
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

    if (editingId) {
        const index = listeningList.findIndex(i => i.id === editingId);
        if (index !== -1) {
            listeningList[index].type = mediaType;
            listeningList[index].name = name;
            listeningList[index].season = season;
            listeningList[index].studyType = studyType;
            listeningList[index].hours = hours;
            listeningList[index].minutes = minutes;
            if (coverBase64) listeningList[index].cover = coverBase64;
        }
    } else {
        listeningList.push({ id: Date.now().toString(), type: mediaType, name, season, cover: coverBase64, studyType, hours, minutes });
    }

    await saveListeningData();
    cancelMediaEdit();
}

function editReadingItem(id) {
    const book = readingList.find(b => b.id === id);
    if (!book) return;

    switchTab('cadastro');
    document.getElementById('editingBookId').value = book.id;
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.author || '';
    document.getElementById('bookPages').value = book.pages;
}

function cancelBookEdit() {
    document.getElementById('editingBookId').value = '';
    const form = document.getElementById('book-form');
    if (form) form.reset();
    switchTab('dashboard');
}

async function handleReadingFormSubmit(e) {
    e.preventDefault();
    const editingId = document.getElementById('editingBookId').value;
    const title = document.getElementById('bookTitle')?.value.trim() || '';
    const author = document.getElementById('bookAuthor')?.value.trim() || '';
    const pages = parseInt(document.getElementById('bookPages')?.value) || 0;
    const coverInput = document.getElementById('bookCoverFile');

    let coverBase64 = '';
    if (coverInput && coverInput.files && coverInput.files[0]) {
        coverBase64 = await new Promise(r => { const reader = new FileReader(); reader.onload = (e) => r(e.target.result); reader.readAsDataURL(coverInput.files[0]); });
    }

    if (editingId) {
        const index = readingList.findIndex(b => b.id === editingId);
        if (index !== -1) {
            readingList[index].title = title;
            readingList[index].author = author;
            readingList[index].pages = pages;
            if (coverBase64) readingList[index].cover = coverBase64;
        }
    } else {
        readingList.push({ id: Date.now().toString(), title, author, pages, cover: coverBase64 });
    }

    await saveReadingData();
    cancelBookEdit();
}

function editVocabularyItem(id) {
    const item = vocabularyList.find(v => v.id === id);
    if (!item) return;

    switchTab('cadastro');
    document.getElementById('editingVocabId').value = item.id;
    document.getElementById('vocabWord').value = item.word;
    document.getElementById('vocabTranslation').value = item.translation;
    document.getElementById('vocabExample').value = item.example || '';
}

function cancelVocabEdit() {
    document.getElementById('editingVocabId').value = '';
    const form = document.getElementById('vocab-form');
    if (form) form.reset();
    switchTab('dashboard');
}

async function handleVocabularyFormSubmit(e) {
    e.preventDefault();
    const editingId = document.getElementById('editingVocabId').value;
    const word = document.getElementById('vocabWord')?.value.trim() || '';
    const translation = document.getElementById('vocabTranslation')?.value.trim() || '';
    const example = document.getElementById('vocabExample')?.value.trim() || '';

    if (editingId) {
        const index = vocabularyList.findIndex(v => v.id === editingId);
        if (index !== -1) {
            vocabularyList[index].word = word;
            vocabularyList[index].translation = translation;
            vocabularyList[index].example = example;
        }
    } else {
        vocabularyList.push({ id: Date.now().toString(), word, translation, example, correctCount: 0, wrongCount: 0 });
    }

    await saveVocabularyData(); 
    cancelVocabEdit();
}

async function deleteListeningItem(id, name) {
    if (confirm(`Tem certeza que quer excluir "${name}"?`)) {
        listeningList = listeningList.filter(i => i.id !== id);
        await saveListeningData();
        renderListeningDashboard();
    }
}

async function deleteReadingItem(id, title) {
    if (confirm(`Tem certeza que quer excluir o livro "${title}"?`)) {
        readingList = readingList.filter(i => i.id !== id);
        await saveReadingData();
        renderReadingDashboard();
    }
}

async function deleteVocabularyItem(id, word) {
    if (confirm(`Tem certeza que quer excluir a palavra "${word}"?`)) {
        vocabularyList = vocabularyList.filter(i => i.id !== id);
        await saveVocabularyData();
        renderVocabularyDashboard();
    }
}

/* --- CARROSSEL DO HUB: loop infinito automático (pausa ao interagir) --- */
function initHubCarousel() {
    const track = document.getElementById('infinite-carousel-track');
    const wrap = track ? track.closest('.hub-carousel') : null;
    if (!track || !wrap || track.dataset.ready) return;
    track.dataset.ready = '1';

    const SPEED = 36;
    const SETS = 5;
    const RESUME_DELAY = 2500;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const originals = Array.from(track.querySelectorAll('.hub-card'));
    const prev = document.getElementById('carousel-prev');
    const next = document.getElementById('carousel-next');

    let loopW = 0, pos = 0, last = 0, lastSet = 0;
    let hover = false, focusKey = false, dragging = false, touching = false;
    let resumeAt = 0, userScrollTs = 0, anim = null;

    function buildClones() {
        track.querySelectorAll('[data-clone]').forEach(n => n.remove());
        for (let s = 1; s < SETS; s++) {
            originals.forEach(card => {
                const c = card.cloneNode(true);
                c.setAttribute('data-clone', '1');
                c.setAttribute('aria-hidden', 'true');
                c.removeAttribute('id');
                c.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
                c.querySelectorAll('button, a').forEach(el => el.setAttribute('tabindex', '-1'));
                track.appendChild(c);
            });
        }
        loopW = 0;
    }

    function measure() {
        const n = originals.length;
        if (track.clientWidth > 0 && track.children.length > n) {
            loopW = track.children[n].offsetLeft - track.children[0].offsetLeft;
        }
    }

    function normalize() {
        let shift = 0;
        while (pos < loopW) { pos += loopW; shift += loopW; }
        while (pos >= loopW * 3) { pos -= loopW; shift -= loopW; }
        return shift;
    }

    function tick(ts, dt) {
        const paused = hover || focusKey || dragging || touching || ts < resumeAt || reduceMotion;
        if (anim) {
            const t = Math.min(1, (ts - anim.start) / anim.dur);
            pos = anim.from + (anim.to - anim.from) * (1 - Math.pow(1 - t, 3));
            const s = normalize();
            if (s) { anim.from += s; anim.to += s; }
            if (t >= 1) anim = null;
        } else if (paused) {
            pos = track.scrollLeft;
            if (!touching && !dragging && ts - userScrollTs > 250) {
                const before = pos;
                normalize();
                if (pos !== before) { track.scrollLeft = pos; lastSet = track.scrollLeft; }
            }
            return;
        } else {
            pos += SPEED * dt;
            normalize();
        }
        track.scrollLeft = pos;
        lastSet = track.scrollLeft;
    }

    function frame(ts) {
        const dt = Math.min(0.05, (ts - (last || ts)) / 1000);
        last = ts;
        if (focusKey && !wrap.contains(document.activeElement)) focusKey = false;
        if (track.clientWidth > 0) {
            if (!loopW) measure();
            if (loopW) tick(ts, dt);
        }
        requestAnimationFrame(frame);
    }

    track.addEventListener('scroll', () => {
        if (Math.abs(track.scrollLeft - lastSet) > 1.5) {
            userScrollTs = performance.now();
            resumeAt = userScrollTs + RESUME_DELAY;
        }
    }, { passive: true });

    wrap.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') hover = true; });
    wrap.addEventListener('pointerleave', (e) => {
        if (e.pointerType === 'mouse') { hover = false; resumeAt = performance.now() + 400; }
    });

    track.addEventListener('touchstart', () => { touching = true; anim = null; }, { passive: true });
    const endTouch = () => { touching = false; resumeAt = performance.now() + RESUME_DELAY; };
    track.addEventListener('touchend', endTouch, { passive: true });
    track.addEventListener('touchcancel', endTouch, { passive: true });

    wrap.addEventListener('focusin', (e) => {
        if (e.target.matches && e.target.matches(':focus-visible')) focusKey = true;
    });
    wrap.addEventListener('focusout', () => { focusKey = false; });

    let down = false, moved = false, startX = 0, startScroll = 0;
    track.addEventListener('pointerdown', (e) => {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        down = true; moved = false; anim = null;
        startX = e.clientX; startScroll = track.scrollLeft;
    });
    window.addEventListener('pointermove', (e) => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 6) { moved = true; dragging = true; track.classList.add('is-dragging'); }
        if (moved) track.scrollLeft = startScroll - dx;
    });
    const endDrag = () => {
        if (!down) return;
        down = false;
        if (moved) {
            dragging = false;
            track.classList.remove('is-dragging');
            userScrollTs = performance.now();
            resumeAt = userScrollTs + RESUME_DELAY;
        }
    };
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
    track.addEventListener('click', (e) => {
        if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);

    function nudge(dir) {
        const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
        const step = (originals[0].offsetWidth + gap) * dir;
        const base = anim ? anim.to : track.scrollLeft;
        anim = { from: track.scrollLeft, to: base + step, start: performance.now(), dur: 520 };
        resumeAt = performance.now() + 3000;
    }
    if (prev) prev.addEventListener('click', () => nudge(-1));
    if (next) next.addEventListener('click', () => nudge(1));
    track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-1); }
    });

    if ('ResizeObserver' in window) new ResizeObserver(() => { loopW = 0; }).observe(track);
    else window.addEventListener('resize', () => { loopW = 0; });

    window.refreshHubClones = buildClones;
    if (typeof applyUITranslations === 'function' && !applyUITranslations.__hubWrapped) {
        const orig = applyUITranslations;
        applyUITranslations = function () {
            const r = orig.apply(this, arguments);
            if (window.refreshHubClones) window.refreshHubClones();
            return r;
        };
        applyUITranslations.__hubWrapped = true;
    }

    buildClones();
    requestAnimationFrame(frame);
}

console.log('Fluency Lab build 37 - Japanese UI & 50 Dynamic Stories per Level');

window.onload = async function() {
    await initDB();
    checkOnboardingStatus();
    await loadLanguageData();
    updateThemeAndFlags();
    applyUITranslations();
    updateUserAvatarUI();
    openModule('hub');
    initHubCarousel();
    updateHeaderStreakUI();

    setInterval(updateStreakCountdown, 1000);
    updateStreakCountdown();
};
// Registrador do Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('Service Worker registado com sucesso:', registration.scope);
        registration.update();
      })
      .catch((error) => {
        console.error('Falha ao registar o Service Worker:', error);
      });
  });
}