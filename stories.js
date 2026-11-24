/* ==========================================================================
   FLUENCY LAB - BANCO DE HISTÓRIAS MULTILÍNGUES (EN, ES, FR, JA, PT)
   50 textos Fáceis (easy) + 50 Médios (medium) + 50 Difíceis (hard) por idioma
   ========================================================================== */

const FLUENCY_STORIES = {
    en: [
        {
            title: "Morning Coffee",
            easy: "Leo wakes up early. He makes hot coffee and sits near the window. Birds sing outside and the sun shines bright.",
            medium: "Leo wakes up early every weekday before work. He brews hot coffee, sits by the sunny window, and reviews his daily goals while listening to the morning birds.",
            hard: "Every morning before the city fully awakens, Leo brews a fresh cup of coffee and sits beside the sun-drenched window, organizing his thoughts and embracing the quiet momentum of a brand-new day."
        },
        {
            title: "Walk in the Park",
            easy: "Maya walks in the park with her dog. They run on the green grass and play with a red ball.",
            medium: "Maya takes her energetic dog for a walk through the neighborhood park every afternoon. They jog along the winding path and play fetch on the open grass.",
            hard: "As golden afternoon light filters through tall oak trees, Maya jogs along the winding park trail with her loyal dog, pausing only when a red ball rolls beneath a cluster of fallen leaves."
        },
        {
            title: "Train Station",
            easy: "Sam arrives at the station. He buys a ticket and waits for the blue train. People hurry to their jobs.",
            medium: "Sam arrives at the busy train station ten minutes early. He checks the departure board, buys a ticket, and watches commuters rush toward their morning trains.",
            hard: "Amid the rhythmic hum of announcements and hurried footsteps, Sam checks the departure schedule at the central station, stepping aboard the express train just as the sliding doors lock into place."
        },
        {
            title: "Cooking Together",
            easy: "Ana and Tom cook dinner at home. They cut fresh vegetables and make pasta with tomato sauce.",
            medium: "Ana and Tom cook dinner together after a long day. They chop fresh vegetables, boil pasta, and simmer a rich tomato sauce with garlic and basil.",
            hard: "Turning their small kitchen into a lively workspace, Ana and Tom chop fresh herbs, toast garlic in olive oil, and simmer a fragrant tomato sauce while sharing stories from the day."
        },
        {
            title: "Lost Keys",
            easy: "Ben cannot find his house keys. He checks his bag, his jacket pocket, and the table near the door.",
            medium: "Ben searches the apartment before leaving because his house keys are missing. He checks his backpack, coat pockets, and the entryway table before spotting them under a notebook.",
            hard: "With the clock ticking toward an important meeting, Ben retraces his steps across the living room, searching coat pockets and desk drawers before discovering his keys tucked beneath a stack of notebooks."
        },
        {
            title: "Rainy Afternoon",
            easy: "Rain falls on the glass roof. Clara reads a good book and drinks warm tea on the sofa.",
            medium: "A steady rain taps against the window all afternoon. Clara curls up on the sofa with a warm mug of tea and reads a gripping mystery novel.",
            hard: "While cool rain streaks down the windowpane, Clara settles into the corner of the sofa with steaming herbal tea, losing herself in a chapter that refuses to let go of her attention."
        },
        {
            title: "First Day at Work",
            easy: "David meets his new team. Everyone smiles and shows him his desk and computer.",
            medium: "David arrives early for his first day at the new office. His manager introduces the team, sets up his workspace, and explains the main project.",
            hard: "Stepping into the new office with equal parts excitement and focus, David greets his teammates, configures his workstation, and maps out his first milestones with quiet confidence."
        },
        {
            title: "Stargazing on the Roof",
            easy: "The night sky is clear. Elena looks at the stars and the bright moon from the balcony.",
            medium: "On a clear autumn night, Elena steps onto the balcony to watch the stars. The air is cool, and the moon shines silver over the quiet street.",
            hard: "Beneath a crisp canopy of stars far from city glare, Elena stands on the quiet terrace tracing constellations and appreciating how vast and peaceful the night sky feels."
        },
        {
            title: "Little Bookstore",
            easy: "Lucas enters a small bookstore. The shelves are full of old and new books. He picks two stories.",
            medium: "Lucas stops by a cozy corner bookstore on his way home. Between wooden shelves packed with novels and travel guides, he picks two books to read this week.",
            hard: "Tucked along a quiet cobblestone lane, the small bookstore smells of paper and cedar, inviting Lucas to linger among towering shelves until two compelling titles earn a place in his bag."
        },
        {
            title: "Catching the Sunset",
            easy: "The sun goes down behind the hills. Orange and pink colors fill the sky.",
            medium: "At the end of the day, friends gather on the hill to watch the sunset. Warm orange and violet light spreads across the valley as the breeze cools.",
            hard: "As the sun dips below the distant ridge, ribbons of amber, rose, and deep indigo sweep across the horizon, turning an ordinary evening into a moment worth remembering."
        },
        {
            title: "Baking Bread",
            easy: "Mia mixes flour and warm water. She puts the dough in the oven and waits for the smell.",
            medium: "Mia kneads fresh dough on the counter and lets it rise before baking. Soon the kitchen fills with the warm scent of crusty homemade bread.",
            hard: "Dusting flour across the wooden counter, Mia shapes the risen dough with practiced hands and slides it into the hot oven until a golden crust and rich aroma fill the room."
        },
        {
            title: "Morning Bus Ride",
            easy: "Noah gets on the bus at seven. He listens to music and looks out the window.",
            medium: "Noah catches the seven o'clock bus across town. With headphones on, he watches shop lights turn on as the morning traffic begins to move.",
            hard: "Settled beside the window of the early morning bus, Noah lets familiar music set his pace while watching city storefronts wake up one by one in the cool dawn light."
        },
        {
            title: "Watering the Plants",
            easy: "Sofia has green plants on the balcony. She uses a small can to give them water.",
            medium: "Sofia waters her potted plants every two days. She checks the soil, trims dry leaves, and moves ferns where they get gentle sunlight.",
            hard: "Moving from pot to pot with a slender watering can, Sofia tends to her leafy collection by checking soil moisture, pruning tired stems, and balancing shade with morning sun."
        },
        {
            title: "Grocery List",
            easy: "Liam writes a short list. He buys apples, milk, rice, and eggs at the market.",
            medium: "Liam writes a grocery list before heading to the market so he does not forget anything. He picks up fresh fruit, dairy, grains, and vegetables.",
            hard: "Guided by a neat list on his phone, Liam weaves through the market aisles selecting crisp produce, pantry staples, and fresh ingredients without wasting time or impulse-buying."
        },
        {
            title: "Study Desk",
            easy: "Emma sits at her desk. She opens her notebook, takes a blue pen, and studies for an hour.",
            medium: "Emma clears her desk before a study session so she can stay focused. She reviews her notes, highlights key ideas, and writes a quick summary.",
            hard: "With a quiet lamp glowing over her desk, Emma organizes her notes, connects new concepts to old ones, and turns an hour of focused study into lasting understanding."
        },
        {
            title: "Friendly Neighbor",
            easy: "Mr. Park waves from the yard. He brings fresh oranges to his neighbors.",
            medium: "Mr. Park often chats with his neighbors over the garden fence. Yesterday he shared ripe oranges harvested from his backyard tree.",
            hard: "Known throughout the block for his warm greeting and generous spirit, Mr. Park stops by with a basket of sweet oranges picked fresh from the tree behind his house."
        },
        {
            title: "Bike Ride at Dusk",
            easy: "Leo rides his bike on the path. The air is cool and street lamps turn on.",
            medium: "Leo rides his bicycle along the river path as evening arrives. Cool air greets him while street lamps reflect on the calm water.",
            hard: "Pedaling smoothly along the riverside path as twilight settles, Leo feels the evening breeze cool his face while amber streetlights begin shimmering across the water."
        },
        {
            title: "Packing a Bag",
            easy: "Chloe packs a small bag for the trip. She puts in shirts, shoes, and a charger.",
            medium: "Chloe makes a checklist before packing her weekend bag. She folds light clothes, packs her toiletries, and checks her travel tickets twice.",
            hard: "Laying everything out on the bed first, Chloe packs her weekend bag with tidy efficiency, making sure clothes, chargers, and travel documents are ready before morning."
        },
        {
            title: "Quiet Library",
            easy: "The library is quiet and cool. Daniel reads a history book at a wooden table.",
            medium: "Daniel spends two quiet hours at the library after class. He finds a corner table and reads a book on world history without distractions.",
            hard: "Inside the hushed reading room of the library, Daniel settles at a sturdy oak table, turning pages of history at a steady rhythm while the outside world fades away."
        },
        {
            title: "Making Tea",
            easy: "Hannah boils water in the kettle. She pours hot water over mint leaves in a cup.",
            medium: "Hannah boils water and steeps fresh mint leaves for an evening tea. The warm drink helps her relax after a busy day.",
            hard: "As steam rises from the kettle, Hannah pours hot water over fresh mint leaves, inhaling the crisp aroma while letting the tension of a long day slowly unwind."
        },
        {
            title: "Weekend Market",
            easy: "On Saturday, people visit the street market. There are flowers, bread, and fruit.",
            medium: "Every Saturday morning, the street market comes alive with colorful stalls. Visitors buy fresh flowers, warm pastries, and seasonal fruit.",
            hard: "Bustling with conversation and bright colors every Saturday morning, the open-air market offers everything from crusty loaves and ripe fruit to freshly cut garden flowers."
        },
        {
            title: "Fixing a Chair",
            easy: "Dad gets a screwdriver from the box. He tightens the loose leg on the chair.",
            medium: "When a dining chair starts to wobble, Dad checks the screws and tightens them carefully until the chair feels sturdy again.",
            hard: "Testing the wobble with a careful hand, Dad retrieves his tool kit, aligns the joint, and tightens each bolt until the chair stands firm and solid once more."
        },
        {
            title: "Phone Call Home",
            easy: "Ines calls her parents in the evening. They talk for twenty minutes and laugh.",
            medium: "Ines calls her parents every Sunday evening to catch up. They share news from the week and laugh about family memories.",
            hard: "Even miles apart, Ines keeps a steady Sunday ritual of calling her parents, trading stories from the week and sharing laughter that bridges the distance."
        },
        {
            title: "Clean Room",
            easy: "Toby puts his clothes away and cleans his desk. Now the room looks neat and open.",
            medium: "Toby spends fifteen minutes tidying his bedroom before going to sleep. Putting books and clothes in their place makes tomorrow easier.",
            hard: "With a quick fifteen-minute reset before bedtime, Toby clears clutter from his desk, folds stray clothes, and leaves the room calm and ready for the next day."
        },
        {
            title: "Sunny Balcony",
            easy: "Morning sun warms the balcony. Paul drinks juice and reads the news.",
            medium: "Paul enjoys a quiet breakfast on the sunny balcony. He sips fresh juice and reads a few articles before starting his tasks.",
            hard: "Bathed in bright morning sunlight, Paul sits on the balcony with a glass of fresh juice, reading a few stories and easing into the day with a clear head."
        },
        {
            title: "New Shoes",
            easy: "Nina tries on new running shoes. They feel light and soft on her feet.",
            medium: "Nina tests a pair of running shoes around the store to check the fit. They feel cushioned and supportive for her daily walks.",
            hard: "Taking a few measured strides across the aisle, Nina tests how the new running shoes cushion her heel and support her arch for long walks ahead."
        },
        {
            title: "Fruit Salad",
            easy: "They cut banana, apple, and mango. They mix the fruit in a big bowl.",
            medium: "For a fresh afternoon snack, they slice ripe bananas, apples, and mangoes and toss them together in a large bowl with a squeeze of lime.",
            hard: "Combining sweet mango, crisp apple, and ripe banana in a chilled bowl with a hint of lime, they turn simple fruit into a refreshing afternoon treat."
        },
        {
            title: "Late Night Code",
            easy: "Arthur writes small lines of code. He tests the page and smiles when it works.",
            medium: "Arthur works on a personal web project in the evening. He fixes a small bug, refreshes the browser, and sees the layout work cleanly.",
            hard: "Focused by the soft glow of his monitor late at night, Arthur traces a stubborn bug, refines the logic, and watches the interface respond smoothly on screen."
        },
        {
            title: "Cloudy Morning",
            easy: "Gray clouds cover the sky today. The wind is soft and the air feels fresh.",
            medium: "Soft gray clouds drift across the sky on a cool morning. A light breeze moves the trees while people walk briskly to school.",
            hard: "Under a blanket of pale gray clouds, a cool morning breeze sweeps through the neighborhood, giving the air a crisp freshness that feels like a quiet reset."
        },
        {
            title: "Art Class",
            easy: "Students paint with watercolors on paper. Blue and yellow mix into green.",
            medium: "In art class, students experiment with watercolor washes on thick paper. Blending blue and yellow creates soft shades of green.",
            hard: "Dipping a fine brush into water and pigment, the students watch blue and yellow bloom across damp paper into layered shades of emerald and soft green."
        },
        {
            title: "Feeding the Fish",
            easy: "The small fish swim in clear water. Lucas gives them a pinch of food.",
            medium: "Lucas checks the aquarium filter and feeds the fish a small pinch of flakes. They swim up quickly and eat calmly.",
            hard: "Watching the clear aquarium water catch the light, Lucas offers a measured pinch of flakes and observes the fish dart forward with lively curiosity."
        },
        {
            title: "Airport Gate",
            easy: "Passengers wait near gate four. A plane lands outside on the runway.",
            medium: "Travelers gather near boarding gate four as a flight prepares for departure. Outside, another plane touches down smoothly on the runway.",
            hard: "Beside wide glass windows overlooking the tarmac, travelers await boarding while an arriving aircraft glides down and touches the runway in a smooth arc."
        },
        {
            title: "Warm Soup",
            easy: "Soup is hot in the bowl. Carrot, potato, and chicken smell very good.",
            medium: "On a chilly evening, a bowl of hot vegetable and chicken soup warms everyone up after a long day outside.",
            hard: "Ladled steaming into deep bowls, the rich broth of tender carrots, potatoes, and chicken brings immediate warmth against the evening chill."
        },
        {
            title: "Piano Practice",
            easy: "Sara plays a slow song on the piano. Her fingers move carefully on the keys.",
            medium: "Sara practices a short piece on the piano every day. She repeats tricky measures slowly until her hands find a smooth rhythm.",
            hard: "With measured patience, Sara works through a challenging passage on the piano, smoothing out uneven notes until the melody flows with poise and warmth."
        },
        {
            title: "City Bridge",
            easy: "Cars cross the wide bridge over the river. Walkers take photos of the view.",
            medium: "Many cars and cyclists cross the river bridge during the day. Pedestrians stop at the overlook to admire the skyline.",
            hard: "Spanning the wide river below, the bridge carries steady lines of traffic while walkers pause along the railing to take in the sweeping city view."
        },
        {
            title: "Morning Stretch",
            easy: "Evan stands up and stretches his arms. He takes a deep breath and feels ready.",
            medium: "Evan starts his morning with a five-minute stretch by the open window. Deep breaths help wake up his body and focus his mind.",
            hard: "Standing beside the open window as morning air enters the room, Evan stretches his shoulders, breathes deeply, and shakes off the last traces of sleep."
        },
        {
            title: "Lost Umbrella",
            easy: "It starts to rain, but Julia left her umbrella at home. She runs to the store.",
            medium: "A sudden shower catches Julia on her way back from work. Without her umbrella, she ducks under a shop awning until the rain slows down.",
            hard: "Caught off guard by a sudden downpour without her umbrella, Julia steps beneath a dry storefront awning and waits out the heaviest rush of rain."
        },
        {
            title: "Movie Night",
            easy: "They turn off the lights and start a movie. Popcorn is in a big bowl.",
            medium: "On Friday night, they dim the lights, share a bowl of popcorn, and watch an adventure movie together at home.",
            hard: "With the room lights dimmed and a bowl of warm popcorn close at hand, they settle in for an adventure film that keeps everyone hooked until the credits."
        },
        {
            title: "Writing a Letter",
            easy: "Grandpa writes a short note on paper. He puts it in an envelope with a stamp.",
            medium: "Grandpa writes a thoughtful letter to an old friend. He folds the page neatly, seals the envelope, and posts it on his walk.",
            hard: "Taking his time with neat handwriting on lined paper, Grandpa writes a warm note to an old friend, sealing an envelope that carries real care across the miles."
        },
        {
            title: "Botanical Garden",
            easy: "Tall trees and colorful flowers fill the garden. Paths go around a small pond.",
            medium: "Visitors stroll along winding paths in the botanical garden, passing blooming flowerbeds, shade trees, and a peaceful pond.",
            hard: "Winding past specimen trees, vibrant flowerbeds, and a still pond reflecting the sky, the botanical garden offers a calm sanctuary a short walk from the city."
        },
        {
            title: "Quick Breakfast",
            easy: "Toast, butter, and a banana make a fast breakfast. Leo eats before leaving.",
            medium: "Leo prepares a quick breakfast of toasted bread, butter, and a banana so he has steady energy for his morning classes.",
            hard: "With golden toast, a slice of banana, and a quick cup of coffee, Leo puts together a simple breakfast that fuels a busy morning ahead."
        },
        {
            title: "Sunset on the Beach",
            easy: "Waves roll onto the sand. The sky turns orange near the ocean line.",
            medium: "People walk along the wet sand at sunset as gentle waves reach the shore and warm colors glow above the water.",
            hard: "As gentle waves brush the shoreline and the tide glints with fading light, deep orange and violet streaks gather along the ocean horizon."
        },
        {
            title: "Group Project",
            easy: "Four friends work on a project together. They share ideas and write the plan.",
            medium: "Four classmates meet at a table to plan their group project. Each person takes a clear task so everyone finishes on time.",
            hard: "Gathered around a shared table with notebooks open, four teammates divide responsibilities, test ideas aloud, and turn a complex project into a clear plan."
        },
        {
            title: "Cold Lemonade",
            easy: "The day is hot and sunny. Mia makes cold lemonade with ice and sugar.",
            medium: "On a warm afternoon, Mia squeezes fresh lemons, stirs in cold water and ice, and pours a tall glass of refreshing lemonade.",
            hard: "Clinking with ice in a tall glass, Mia's freshly squeezed lemonade balances bright citrus tartness with cool sweetness on a scorching afternoon."
        },
        {
            title: "Train Window",
            easy: "Green fields pass outside the train window. Cows eat grass near a white fence.",
            medium: "Through the train window, green hills and quiet farms pass by. A herd of cattle grazes beside a low fence under a wide sky.",
            hard: "Beyond the rattling window of the train, patchwork fields, scattered farmhouses, and grazing cattle drift past in an unbroken rural panorama."
        },
        {
            title: "First Snowfall",
            easy: "White flakes fall softly from the sky. The roof and street turn white.",
            medium: "Soft snowflakes begin to fall in the quiet evening, coating parked cars, rooftops, and tree branches in a thin white layer.",
            hard: "Drifting down without a sound in the hush of evening, the first snowflakes dust rooftops, fences, and quiet streets in a delicate coat of white."
        },
        {
            title: "Book Exchange",
            easy: "Friends trade books they finished. Each person gets a new story to read.",
            medium: "A group of friends swaps finished books every month so everyone can discover new authors without spending extra money.",
            hard: "Passing along dog-eared favorites and fresh discoveries each month, the friends keep a lively book exchange going that introduces everyone to new voices."
        },
        {
            title: "Morning Alarm",
            easy: "The alarm rings at six. Alex turns it off, gets up, and opens the curtains.",
            medium: "When the six o'clock alarm sounds, Alex gets out of bed right away, opens the curtains, and welcomes the new day.",
            hard: "Resisting the urge to hit snooze, Alex turns off the morning alarm, draws back the curtains to let daylight in, and starts the day with purpose."
        },
        {
            title: "Baker's Window",
            easy: "Sweet cakes and rolls sit behind the glass. People stop to look inside.",
            medium: "Passersby pause in front of the bakery window to admire trays of golden croissants, fruit tarts, and cinnamon rolls.",
            hard: "Behind spotless glass in the morning light, trays of flaky pastries, fruit tarts, and braided loaves draw admiring glances from everyone passing by."
        },
        {
            title: "Starry Campfire",
            easy: "Friends sit near a small fire at night. Sparks rise up toward the stars.",
            medium: "Around a crackling campfire in the woods, friends tell stories and watch bright sparks rise beneath a sky full of stars.",
            hard: "Beneath a vast canopy of stars in the quiet clearing, a small campfire crackles softly as friends trade stories and watch warm sparks drift upward into the night."
        }
    ],
    es: [
        {
            title: "El Café de la Mañana",
            easy: "Leo despierta temprano. Prepara café caliente y se sienta cerca de la ventana. Los pájaros cantan afuera.",
            medium: "Leo despierta temprano cada día antes de trabajar. Prepara café caliente, se sienta junto a la ventana soleada y repasa sus metas del día.",
            hard: "Cada mañana antes de que la ciudad despierte del todo, Leo prepara una taza de café recién hecho y se sienta junto a la ventana luminosa para ordenar sus ideas con calma."
        },
        {
            title: "Un Paseo por el Parque",
            easy: "Maya pasea por el parque con su perro. Corren sobre la hierba verde y juegan con una pelota roja.",
            medium: "Maya lleva a su perro a pasear por el parque cada tarde. Trotaban por el sendero y juegan con una pelota roja en el césped.",
            hard: "Mientras la luz dorada de la tarde atraviesa los árboles altos, Maya corre por el sendero del parque con su perro, deteniéndose solo cuando la pelota rueda entre las hojas."
        },
        {
            title: "La Estación del Tren",
            easy: "Sam llega a la estación. Compra un boleto y espera el tren azul. La gente camina rápido.",
            medium: "Sam llega diez minutos antes a la estación. Revisa los horarios, compra su boleto y observa a los viajeros apresurarse hacia sus trenes.",
            hard: "Entre los avisos de megafonía y los pasos apresurados, Sam consulta la pantalla de salidas y sube al tren expreso justo antes de que cierren las puertas."
        },
        {
            title: "Cocinando Juntos",
            easy: "Ana y Tom cocinan la cena en casa. Cortan verduras frescas y preparan pasta con salsa de tomate.",
            medium: "Ana y Tom cocinan juntos después del trabajo. Pican verduras frescas, cuecen la pasta y preparan una salsa de tomate con ajo y albahaca.",
            hard: "Convirtiendo su pequeña cocina en un espacio animado, Ana y Tom pican hierbas frescas y cocinan una salsa aromática mientras comparten lo ocurrido durante el día."
        },
        {
            title: "Las Llaves Perdidas",
            easy: "Ben no encuentra las llaves de casa. Revisa su mochila, su abrigo y la mesa de la entrada.",
            medium: "Ben busca sus llaves antes de salir de casa. Revisa la mochila, los bolsillos de su chaqueta y la mesa hasta encontrarlas bajo un cuaderno.",
            hard: "Con el reloj avanzando hacia una cita importante, Ben revisa la sala, los bolsillos de su abrigo y el escritorio hasta hallar las llaves escondidas bajo unas notas."
        },
        {
            title: "Tarde de Lluvia",
            easy: "Llueve sobre el techo de cristal. Clara lee un buen libro y toma té caliente en el sofá.",
            medium: "Una lluvia constante golpea la ventana toda la tarde. Clara se acomoda en el sofá con una taza de té caliente y lee una novela.",
            hard: "Mientras la lluvia resbala por el cristal, Clara se refugia en el sofá con una infusión caliente y se sumerge en una historia que capta toda su atención."
        },
        {
            title: "Primer Día de Trabajo",
            easy: "David conoce a su nuevo equipo. Todos sonríen y le muestran su escritorio y computadora.",
            medium: "David llega temprano en su primer día en la oficina. Su jefe le presenta al equipo, prepara su lugar de trabajo y explica el proyecto.",
            hard: "Al entrar en la nueva oficina con entusiasmo y atención, David saluda a sus compañeros, organiza su escritorio y planifica sus primeras tareas con confianza."
        },
        {
            title: "Mirando las Estrellas",
            easy: "El cielo nocturno está despejado. Elena mira las estrellas y la luna brillante desde el balcón.",
            medium: "En una noche despejada de otoño, Elena sale al balcón a observar las estrellas mientras la brisa fresca recorre la calle.",
            hard: "Bajo un cielo limpio lejos del ruido de la ciudad, Elena contempla las estrellas desde el balcón y disfruta de la serenidad de la noche."
        },
        {
            title: "La Pequeña Librería",
            easy: "Lucas entra en una librería pequeña. Los estantes están llenos de libros y elige dos historias.",
            medium: "Lucas pasa por una librería acogedora camino a casa. Entre estantes de madera llenos de novelas, elige dos libros para esta semana.",
            hard: "Escondida en una calle tranquila, la pequeña librería huele a papel y madera e invita a Lucas a explorar sus estantes hasta elegir dos lecturas."
        },
        {
            title: "Al Atardecer",
            easy: "El sol baja detrás de las colinas. Colores naranjas y rosas llenan el cielo.",
            medium: "Al final del día, varios amigos suben a la colina para ver el atardecer mientras el cielo se tiñe de naranja y violeta.",
            hard: "Cuando el sol desciende tras las montañas, tonos ámbar, rosa y violeta iluminan el horizonte y convierten el final de la tarde en un instante especial."
        },
        {
            title: "Horneando Pan",
            easy: "Mía mezcla harina y agua tibia. Mete la masa al horno y espera el aroma.",
            medium: "Mía amasa la mezcla sobre la mesa y deja que crezca antes de hornearla. Pronto toda la cocina huele a pan recién hecho.",
            hard: "Espolvoreando harina sobre la mesa de madera, Mía moldea la masa con calma y la lleva al horno hasta lograr una corteza dorada y un aroma acogedor."
        },
        {
            title: "Viaje en Autobús",
            easy: "Noah sube al autobús a las siete. Escucha música y mira por la ventana.",
            medium: "Noah toma el autobús de las siete para cruzar la ciudad. Con auriculares, observa cómo se encienden las luces de las tiendas.",
            hard: "Sentado junto a la ventanilla del primer autobús, Noah deja que la música marque su ritmo mientras ve despertar las calles bajo la luz de la mañana."
        },
        {
            title: "Regando las Plantas",
            easy: "Sofía tiene plantas verdes en el balcón. Usa una regadera pequeña para darles agua.",
            medium: "Sofía riega sus plantas cada dos días. Revisa la tierra, corta hojas secas y acomoda las que necesitan más luz.",
            hard: "Recorriendo el balcón con una regadera ligera, Sofía cuida sus plantas comprobando la humedad de la tierra y equilibrando la sombra con el sol matinal."
        },
        {
            title: "Lista del Mercado",
            easy: "Liam escribe una lista corta. Compra manzanas, leche, arroz y huevos en el mercado.",
            medium: "Liam prepara una lista antes de ir al mercado para no olvidar nada. Compra fruta fresca, lácteos, cereales y verduras.",
            hard: "Guiado por una lista ordenada, Liam recorre los pasillos del mercado eligiendo productos frescos y básicos sin prisas ni compras impulsivas."
        },
        {
            title: "Mesa de Estudio",
            easy: "Emma se sienta en su escritorio. Abre su cuaderno, toma un lápiz y estudia una hora.",
            medium: "Emma ordena su escritorio antes de estudiar para mantener la concentración. Repasa sus apuntes, subraya ideas clave y hace un resumen.",
            hard: "Con la luz suave de la lámpara sobre su mesa, Emma organiza sus notas, conecta ideas nuevas y convierte una hora de estudio en aprendizaje real."
        },
        {
            title: "Vecino Amable",
            easy: "El señor Park saluda desde el patio. Trae naranjas frescas para los vecinos.",
            medium: "El señor Park suele conversar con sus vecinos junto a la cerca. Ayer compartió naranjas maduras de su árbol.",
            hard: "Conocido en todo el barrio por su trato cercano y generoso, el señor Park se acerca con una cesta de naranjas dulces recién cortadas."
        },
        {
            title: "Paseo en Bicicleta",
            easy: "Leo anda en bicicleta por el sendero. El aire es fresco y las farolas se encienden.",
            medium: "Leo pedalea por el sendero del río al caer la tarde. El aire fresco lo acompaña mientras las luces se reflejan en el agua.",
            hard: "Avanzando sin prisa por el camino junto al río al anochecer, Leo siente la brisa fresca mientras las farolas brillan sobre el agua tranquila."
        },
        {
            title: "Preparar la Maleta",
            easy: "Chloe prepara una bolsa pequeña para el viaje. Guarda camisas, zapatos y un cargador.",
            medium: "Chloe hace una lista antes de empacar para el fin de semana. Dobla ropa ligera, guarda lo necesario y revisa sus boletos.",
            hard: "Ordenando todo sobre la cama primero, Chloe arma su equipaje con cuidado para tener ropa, cargadores y documentos listos antes de salir."
        },
        {
            title: "Biblioteca Tranquila",
            easy: "La biblioteca es silenciosa y fresca. Daniel lee un libro de historia en una mesa.",
            medium: "Daniel pasa dos horas tranquilas en la biblioteca después de clase. Busca una mesa apartada y lee historia sin distracciones.",
            hard: "En la sala silenciosa de la biblioteca, Daniel se acomoda en una mesa de madera y avanza en su lectura con calma mientras el ruido queda atrás."
        },
        {
            title: "Preparar un Té",
            easy: "Hannah hierve agua en la tetera. Vierte agua caliente sobre hojas de menta en una taza.",
            medium: "Hannah calienta agua y prepara una infusión de menta por la tarde. La bebida tibia le ayuda a descansar tras un día largo.",
            hard: "Mientras sube el vapor de la tetera, Hannah vierte agua caliente sobre hojas de menta fresca y disfruta de un momento de calma al final del día."
        },
        {
            title: "Mercado de Fin de Semana",
            easy: "El sábado la gente visita el mercado callejero. Hay flores, pan y fruta.",
            medium: "Cada sábado por la mañana el mercado se llena de color. Los visitantes compran flores frescas, pan caliente y fruta de temporada.",
            hard: "Lleno de voces y colores cada sábado, el mercado al aire libre reúne panes crujientes, frutas maduras y flores recién cortadas."
        },
        {
            title: "Arreglar una Silla",
            easy: "Papá saca un destornillador de la caja. Aprieta la pata floja de la silla.",
            medium: "Cuando una silla comienza a moverse, papá revisa los tornillos y los ajusta con cuidado hasta que queda firme de nuevo.",
            hard: "Comprobando el movimiento con atención, papá toma sus herramientas, alinea la pieza y aprieta cada tornillo hasta dejar la silla estable."
        },
        {
            title: "Llamada a Casa",
            easy: "Inés llama a sus padres por la tarde. Hablan veinte minutos y se ríen.",
            medium: "Inés llama a sus padres cada domingo para ponerse al día. Comparten noticias de la semana y recuerdan anécdotas familiares.",
            hard: "Aunque vivan lejos, Inés mantiene la costumbre de llamar a sus padres los domingos para conversar y reír juntos como si estuvieran cerca."
        },
        {
            title: "Cuarto Ordenado",
            easy: "Toby guarda su ropa y limpia su escritorio. Ahora el cuarto se ve limpio y amplio.",
            medium: "Toby dedica quince minutos a ordenar su habitación antes de dormir. Dejar todo en su sitio hace que mañana sea más fácil.",
            hard: "Con un breve repaso de quince minutos antes de acostarse, Toby despeja su escritorio, guarda la ropa y deja el cuarto listo para el día siguiente."
        },
        {
            title: "Balcón Soleado",
            easy: "El sol de la mañana calienta el balcón. Paul toma jugo y lee las noticias.",
            medium: "Paul disfruta un desayuno tranquilo en el balcón soleado. Toma jugo fresco y lee algunas noticias antes de empezar el día.",
            hard: "Con la luz suave de la mañana en el balcón, Paul toma un jugo frío y repasa las noticias antes de comenzar sus actividades."
        },
        {
            title: "Zapatillas Nuevas",
            easy: "Nina prueba zapatillas nuevas para correr. Se sienten ligeras y suaves en sus pies.",
            medium: "Nina camina por la tienda probando unas zapatillas nuevas. Siente buena amortiguación y comodidad para sus caminatas diarias.",
            hard: "Dando unos pasos por el pasillo, Nina comprueba cómo las zapatillas nuevas amortiguan cada pisada y acompañan bien sus caminatas."
        },
        {
            title: "Ensalada de Frutas",
            easy: "Cortan plátano, manzana y mango. Mezclan la fruta en un tazón grande.",
            medium: "Para una merienda fresca, cortan plátano, manzana y mango en trozos y los mezclan en un tazón con un poco de limón.",
            hard: "Reuniendo mango dulce, manzana crujiente y plátano maduro con un toque de limón, preparan una ensalada de frutas fresca para la tarde."
        },
        {
            title: "Código por la Noche",
            easy: "Arthur escribe líneas cortas de código. Prueba la página y sonríe cuando funciona.",
            medium: "Arthur trabaja en un proyecto web por la noche. Corrige un error pequeño, recarga la página y ve que todo funciona bien.",
            hard: "Frente a la luz suave de la pantalla ya entrada la noche, Arthur ajusta un detalle del código y ve cómo la página responde sin fallos."
        },
        {
            title: "Mañana Nublada",
            easy: "Nubes grises cubren el cielo hoy. El viento es suave y el aire se siente fresco.",
            medium: "Nubes grises avanzan despacio en una mañana fresca. Una brisa ligera mueve las ramas mientras la gente camina hacia sus clases.",
            hard: "Bajo un cielo cubierto de nubes suaves, una brisa fresca recorre la calle y da a la mañana un aire limpio y sosegado."
        },
        {
            title: "Clase de Arte",
            easy: "Los alumnos pintan con acuarelas en papel. El azul y el amarillo forman verde.",
            medium: "En clase de arte, los alumnos prueban acuarelas sobre papel grueso. Al mezclar azul y amarillo descubren tonos verdes.",
            hard: "Con el pincel húmedo sobre el papel, los alumnos ven cómo el azul y el amarillo se funden en tonos verdes suaves y luminosos."
        },
        {
            title: "Alimentar a los Peces",
            easy: "Los peces pequeños nadan en agua clara. Lucas les da una pizca de comida.",
            medium: "Lucas revisa el filtro del acuario y da una pizca de alimento a los peces. Ellos suben rápido y comen con calma.",
            hard: "Observando el agua clara del acuario, Lucas deja caer una pequeña pizca de comida y mira a los peces acercarse con viveza."
        },
        {
            title: "Puerta de Embarque",
            easy: "Los pasajeros esperan cerca de la puerta cuatro. Un avión aterriza en la pista.",
            medium: "Los viajeros esperan cerca de la puerta cuatro mientras preparan el vuelo. Afuera, otro avión aterriza con suavidad en la pista.",
            hard: "Junto a los grandes cristales de la terminal, los pasajeros aguardan mientras un avión desciende y toca la pista con precisión."
        },
        {
            title: "Sopa Caliente",
            easy: "La sopa está caliente en el plato. La zanahoria, la papa y el pollo huelen muy bien.",
            medium: "En una tarde fría, un plato de sopa caliente de verduras y pollo reconforta a todos después de estar fuera.",
            hard: "Servida humeante en platos hondos, la sopa de zanahoria, papa y pollo aporta calor y bienestar frente al frío de la tarde."
        },
        {
            title: "Práctica de Piano",
            easy: "Sara toca una canción lenta en el piano. Sus dedos se mueven con cuidado en las teclas.",
            medium: "Sara practica una pieza breve en el piano cada día. Repite los compases difíciles despacio hasta lograr un ritmo fluido.",
            hard: "Con paciencia y atención, Sara ensaya un pasaje exigente en el piano hasta que las notas se encadenan con naturalidad."
        },
        {
            title: "Puente de la Ciudad",
            easy: "Los autos cruzan el puente ancho sobre el río. Los peatones toman fotos de la vista.",
            medium: "Muchos autos y bicicletas cruzan el puente durante el día. Quienes caminan se detienen a mirar el paisaje de la ciudad.",
            hard: "Tendido sobre el río ancho, el puente recibe el paso constante de vehículos mientras los peatones contemplan la vista panorámica."
        },
        {
            title: "Estiramiento Matinal",
            easy: "Evan se pone de pie y estira los brazos. Respira hondo y se siente listo.",
            medium: "Evan empieza la mañana estirándose junto a la ventana abierta. Respirar profundo le ayuda a despejarse y concentrarse.",
            hard: "Junto a la ventana abierta al empezar el día, Evan estira los brazos, respira hondo y deja atrás el cansancio del sueño."
        },
        {
            title: "Paraguas Olvidado",
            easy: "Empieza a llover, pero Julia dejó su paraguas en casa. Corre hacia la tienda.",
            medium: "Una lluvia repentina sorprende a Julia al volver a casa. Sin paraguas, espera bajo el alero de una tienda hasta que baja la lluvia.",
            hard: "Sorprendida por un chaparrón sin su paraguas, Julia se resguarda bajo el techo de una tienda y espera a que pase lo más fuerte."
        },
        {
            title: "Noche de Película",
            easy: "Apagan las luces y empiezan una película. Las palomitas están en un tazón grande.",
            medium: "El viernes por la noche bajan las luces, comparten palomitas y ven una película de aventuras juntos en casa.",
            hard: "Con las luces bajas y un tazón de palomitas a mano, se acomodan para ver una película de aventuras que los mantiene atentos hasta el final."
        },
        {
            title: "Escribir una Carta",
            easy: "El abuelo escribe una nota corta en papel. La guarda en un sobre con estampilla.",
            medium: "El abuelo escribe una carta cariñosa a un viejo amigo. Dobla la hoja con cuidado, cierra el sobre y la envía en su paseo.",
            hard: "Con letra clara sobre papel pautado, el abuelo escribe unas líneas a un amigo de toda la vida y cierra el sobre con afecto."
        },
        {
            title: "Jardín Botánico",
            easy: "Árboles altos y flores coloridas llenan el jardín. Los senderos rodean un estanque pequeño.",
            medium: "Los visitantes pasean por senderos arbolados en el jardín botánico, entre flores de colores y un estanque tranquilo.",
            hard: "Entre árboles frondosos, flores variadas y un estanque sereno, el jardín botánico ofrece un paseo tranquilo lejos del bullicio."
        },
        {
            title: "Desayuno Rápido",
            easy: "Tostadas, mantequilla y un plátano forman un desayuno rápido. Leo come antes de salir.",
            medium: "Leo prepara un desayuno rápido con tostadas, mantequilla y un plátano para tener energía durante la mañana.",
            hard: "Con tostadas doradas, un plátano y una bebida caliente, Leo arma un desayuno sencillo que le da impulso para empezar el día."
        },
        {
            title: "Atardecer en la Playa",
            easy: "Las olas llegan a la arena. El cielo se vuelve naranja cerca del mar.",
            medium: "Varias personas caminan por la orilla al atardecer mientras las olas suaves llegan y el cielo brilla en tonos naranjas.",
            hard: "Mientras las olas suaves alcanzan la orilla húmeda, tonos naranjas y rosados se extienden sobre el mar al caer la tarde."
        },
        {
            title: "Trabajo en Equipo",
            easy: "Cuatro amigos trabajan juntos en un proyecto. Comparten ideas y escriben el plan.",
            medium: "Cuatro compañeros se reúnen para organizar su proyecto. Cada uno asume una tarea clara para avanzar a buen ritmo.",
            hard: "Sentados alrededor de una mesa con sus cuadernos, cuatro compañeros reparten tareas, debaten ideas y ordenan el plan del proyecto."
        },
        {
            title: "Limonada Fría",
            easy: "El día es caluroso y soleado. Mía prepara limonada fría con hielo y azúcar.",
            medium: "En una tarde calurosa, Mía exprime limones frescos, mezcla con agua fría y hielo y sirve un vaso bien refrescante.",
            hard: "Con hielo en un vaso alto, la limonada recién exprimida de Mía combina el frescor cítrico con un toque dulce ideal para el calor."
        },
        {
            title: "Ventana del Tren",
            easy: "Campos verdes pasan tras la ventana del tren. Las vacas comen hierba cerca de una cerca.",
            medium: "Por la ventanilla del tren pasan campos verdes y casas tranquilas. Unas vacas pastan junto a una cerca bajo un cielo amplio.",
            hard: "Más allá de la ventanilla del tren, praderas verdes, caminos rurales y ganado pastando se suceden en un paisaje continuo."
        },
        {
            title: "Primera Nevada",
            easy: "Copos blancos caen suavemente del cielo. El techo y la calle se vuelven blancos.",
            medium: "Copos de nieve caen en silencio al anochecer y cubren techos, autos y ramas con una capa blanca y ligera.",
            hard: "Cayendo sin ruido al caer la noche, los primeros copos cubren tejados y calles con un manto blanco suave y sereno."
        },
        {
            title: "Intercambio de Libros",
            easy: "Los amigos intercambian libros que terminaron. Cada uno recibe una historia nueva para leer.",
            medium: "Un grupo de amigos intercambia libros cada mes para conocer nuevas historias sin gastar de más.",
            hard: "Compartiendo libros ya leídos cada mes, los amigos mantienen un intercambio sencillo que les abre la puerta a nuevas lecturas."
        },
        {
            title: "Alarma de la Mañana",
            easy: "La alarma suena a las seis. Alex la apaga, se levanta y abre las cortinas.",
            medium: "Cuando suena la alarma a las seis, Alex se levanta de inmediato, abre las cortinas y deja entrar la luz del día.",
            hard: "Al sonar la alarma de la mañana, Alex se pone en pie sin demora, abre las cortinas y comienza el día con orden."
        },
        {
            title: "Vitrina de la Panadería",
            easy: "Pasteles dulces y panecillos están tras el cristal. La gente se detiene a mirar.",
            medium: "Quienes pasan frente a la panadería miran las bandejas de bollos dorados, tartas de fruta y pan recién horneado.",
            hard: "Detrás del cristal limpio, las bandejas de panecillos dorados y tartas atraen la mirada de quienes pasan por la calle."
        },
        {
            title: "Fogata Bajo las Estrellas",
            easy: "Los amigos se sientan cerca de un fuego pequeño de noche. Las chispas suben hacia las estrellas.",
            medium: "Junto a una pequeña fogata en el campo, los amigos conversan y ven subir chispas bajo un cielo lleno de estrellas.",
            hard: "Bajo un cielo estrellado en el claro del bosque, la pequeña fogata acompaña las charlas mientras las chispas suben en la noche."
        }
    ],
    fr: [
        {
            title: "Le Café du Matin",
            easy: "Léo se réveille tôt. Il prépare un café chaud et s'assoit près de la fenêtre. Les oiseaux chantent.",
            medium: "Léo se réveille tôt chaque matin avant le travail. Il prépare un café chaud, s'installe près de la fenêtre et organise sa journée.",
            hard: "Chaque matin avant que la ville ne s'anime vraiment, Léo prépare un café fraîchement moulu et s'assoit près de la fenêtre lumineuse pour clarifier ses idées."
        },
        {
            title: "Une Promenade au Parc",
            easy: "Maya promène son chien dans le parc. Ils courent sur l'herbe verte et jouent avec un ballon rouge.",
            medium: "Maya emmène son chien faire un tour au parc chaque après-midi. Ils courent sur le sentier et jouent avec un ballon rouge.",
            hard: "Tandis que la lumière dorée filtre à travers les grands arbres, Maya court sur l'allée du parc avec son chien et s'arrête quand le ballon roule dans l'herbe."
        },
        {
            title: "La Gare",
            easy: "Sam arrive à la gare. Il achète un billet et attend le train bleu. Les gens sont pressés.",
            medium: "Sam arrive dix minutes en avance à la gare. Il regarde les horaires, achète son billet et voit les voyageurs se hâter.",
            hard: "Au milieu des annonces et des pas pressés, Sam vérifie l'affichage des départs et monte dans le train juste avant la fermeture des portes."
        },
        {
            title: "Cuisiner Ensemble",
            easy: "Ana et Tom préparent le dîner à la maison. Ils coupent des légumes frais et font des pâtes.",
            medium: "Ana et Tom cuisinent ensemble après leur journée. Ils coupent des légumes frais, cuisent les pâtes et préparent une sauce tomate.",
            hard: "Transformant leur petite cuisine en atelier convivial, Ana et Tom cisèlent des herbes fraîches et mijotent une sauce parfumée en partageant le récit de leur journée."
        },
        {
            title: "Les Clés Perdues",
            easy: "Ben ne trouve plus ses clés. Il regarde dans son sac, son manteau et sur la petite table.",
            medium: "Ben cherche ses clés avant de partir. Il vérifie son sac, les poches de sa veste et l'entrée avant de les voir sous un cahier.",
            hard: "Alors que l'heure d'un rendez-vous approche, Ben refait le chemin dans le salon, fouille ses poches et retrouve finalement ses clés sous un carnet."
        },
        {
            title: "Après-Midi Pluvieux",
            easy: "La pluie tombe sur la vitre. Clara lit un beau livre et boit un thé chaud sur le canapé.",
            medium: "Une pluie régulière tombe tout l'après-midi. Clara s'installe sur le canapé avec une tasse de thé chaud et lit un roman.",
            hard: "Pendant que la pluie glisse sur la vitre, Clara s'installe confortablement sur le canapé avec un thé fumant et se plonge dans une histoire captivante."
        },
        {
            title: "Premier Jour au Travail",
            easy: "David rencontre sa nouvelle équipe. Tout le monde sourit et lui montre son bureau.",
            medium: "David arrive tôt pour son premier jour au bureau. Son responsable présente l'équipe, installe son poste et explique le projet.",
            hard: "Entrant dans ses nouveaux bureaux avec enthousiasme, David salue ses collègues, règle son espace de travail et définit ses premiers objectifs avec assurance."
        },
        {
            title: "Sous les Étoiles",
            easy: "Le ciel est clair cette nuit. Elena regarde les étoiles et la lune brillante depuis le balcon.",
            medium: "Par une nuit claire d'automne, Elena sort sur le balcon pour observer les étoiles dans l'air frais du soir.",
            hard: "Sous un ciel étoilé loin de l'agitation urbaine, Elena contemple les constellations depuis le balcon et savoure le calme de la nuit."
        },
        {
            title: "La Petite Librairie",
            easy: "Lucas entre dans une petite librairie. Les étagères sont pleines de livres. Il choisit deux histoires.",
            medium: "Lucas s'arrête dans une librairie chaleureuse sur le chemin du retour. Parmi les rayons, il choisit deux livres à lire cette semaine.",
            hard: "Nichée dans une rue calme, la petite librairie sent le papier et attire Lucas vers ses étagères jusqu'à ce qu'il retienne deux ouvrages."
        },
        {
            title: "Le Coucher du Soleil",
            easy: "Le soleil descend derrière les collines. Des couleurs orange et rose remplissent le ciel.",
            medium: "En fin de journée, des amis rejoignent la colline pour regarder le coucher du soleil aux reflets orangés et violets.",
            hard: "Lorsque le soleil disparaît derrière la crête, des nuances ambrées, roses et violettes embrasent l'horizon et rendent la fin de journée inoubliable."
        },
        {
            title: "Cuire du Pain",
            easy: "Mia mélange de la farine et de l'eau tiède. Elle met la pâte au four et attend l'odeur.",
            medium: "Mia pétrit la pâte sur le plan de travail et la laisse lever avant de cuire. Bientôt la cuisine sent bon le pain chaud.",
            hard: "Saupoudrant un peu de farine sur la table, Mia façonne la pâte levée avec soin et l'enfourne jusqu'à obtenir une croûte dorée et parfumée."
        },
        {
            title: "Trajet en Bus",
            easy: "Noah monte dans le bus à sept heures. Il écoute de la musique et regarde par la fenêtre.",
            medium: "Noah prend le bus de sept heures pour traverser la ville. Avec ses écouteurs, il regarde les lumières des boutiques s'allumer.",
            hard: "Installé près de la vitre du bus matinal, Noah laisse la musique rythmer son trajet tandis que les rues s'éveillent doucement."
        },
        {
            title: "Arroser les Plantes",
            easy: "Sofia a des plantes vertes sur le balcon. Elle utilise un petit arrosoir pour leur donner de l'eau.",
            medium: "Sofia arrose ses plantes tous les deux jours. Elle vérifie la terre, coupe les feuilles sèches et place les pots à la lumière.",
            hard: "Passant d'un pot à l'autre avec son arrosoir, Sofia veille sur ses plantes en vérifiant l'humidité et l'exposition au soleil."
        },
        {
            title: "Liste de Courses",
            easy: "Liam écrit une courte liste. Il achète des pommes, du lait, du riz et des œufs au marché.",
            medium: "Liam prépare une liste avant d'aller au marché pour ne rien oublier. Il prend des fruits frais, des légumes et des produits de base.",
            hard: "Guidé par une liste claire, Liam parcourt les étals du marché en choisissant des produits frais et utiles sans se disperser."
        },
        {
            title: "Bureau d'Étude",
            easy: "Emma s'assoit à son bureau. Elle ouvre son cahier, prend un stylo bleu et étudie une heure.",
            medium: "Emma range son bureau avant de réviser pour rester concentrée. Elle relit ses notes, souligne l'essentiel et écrit un résumé.",
            hard: "Sous la lumière douce de sa lampe de bureau, Emma classe ses notes, relie les notions et transforme une heure d'étude en progrès concret."
        },
        {
            title: "Voisin Sympathique",
            easy: "Monsieur Park salue depuis le jardin. Il apporte des oranges fraîches aux voisins.",
            medium: "Monsieur Park aime discuter avec ses voisins près de la haie. Hier, il a partagé des oranges mûres de son jardin.",
            hard: "Apprécié de tous dans le quartier pour sa gentillesse, monsieur Park passe avec un panier d'oranges fraîchement cueillies."
        },
        {
            title: "Balade à Vélo",
            easy: "Léo fait du vélo sur le chemin. L'air est frais et les lampadaires s'allument.",
            medium: "Léo roule à vélo le long de la rivière à la tombée du jour. L'air frais l'accompagne pendant que les lampadaires brillent.",
            hard: "Pédalant tranquillement le long du sentier au crépuscule, Léo sent la brise fraîche tandis que les lumières se reflètent sur l'eau."
        },
        {
            title: "Préparer son Sac",
            easy: "Chloé prépare un petit sac pour le voyage. Elle met des chemises, des chaussures et un chargeur.",
            medium: "Chloé fait une liste avant de préparer son sac pour le week-end. Elle plie des vêtements légers et vérifie ses billets.",
            hard: "Disposant ses affaires sur le lit d'abord, Chloé prépare son sac avec méthode pour que tout soit prêt dès le matin."
        },
        {
            title: "Bibliothèque Calme",
            easy: "La bibliothèque est calme et fraîche. Daniel lit un livre d'histoire à une table en bois.",
            medium: "Daniel passe deux heures calmes à la bibliothèque après les cours. Il choisit une table à l'écart et lit sans distraction.",
            hard: "Dans le calme de la salle de lecture, Daniel s'installe à une grande table et avance dans son livre à un rythme posé."
        },
        {
            title: "Préparer du Thé",
            easy: "Hannah fait bouillir de l'eau dans la bouilloire. Elle verse l'eau chaude sur des feuilles de menthe.",
            medium: "Hannah prépare une infusion de menthe fraîche en fin d'après-midi. La boisson chaude l'aide à se détendre après sa journée.",
            hard: "Tandis que la bouilloire frémit, Hannah verse l'eau chaude sur la menthe fraîche et savoure un instant paisible."
        },
        {
            title: "Marché du Week-End",
            easy: "Le samedi, des gens visitent le marché de rue. Il y a des fleurs, du pain et des fruits.",
            medium: "Chaque samedi matin, le marché s'anime avec des stands colorés. Les visiteurs achètent des fleurs, du pain et des fruits.",
            hard: "Animé et coloré chaque samedi matin, le marché rassemble du pain croustillant, des fruits de saison et des fleurs coupées."
        },
        {
            title: "Réparer une Chaise",
            easy: "Papa prend un tournevis dans la boîte. Il resserre le pied de la chaise.",
            medium: "Quand une chaise devient instable, papa vérifie les vis et les resserre avec soin jusqu'à ce qu'elle tienne bien.",
            hard: "Testant la stabilité d'un geste sûr, papa sort ses outils, aligne l'assemblage et resserre chaque vis avec précision."
        },
        {
            title: "Appel à la Maison",
            easy: "Inès appelle ses parents le soir. Ils parlent vingt minutes et rient ensemble.",
            medium: "Inès appelle ses parents chaque dimanche soir pour donner des nouvelles. Ils partagent leur semaine et se remémorent des souvenirs.",
            hard: "Malgré la distance, Inès garde l'habitude d'appeler ses parents le dimanche pour échanger et rire ensemble comme autrefois."
        },
        {
            title: "Chambre Rangée",
            easy: "Toby range ses vêtements et nettoie son bureau. Maintenant la chambre paraît nette et spacieuse.",
            medium: "Toby consacre quinze minutes à ranger sa chambre avant de dormir. Tout remettre à sa place facilite le lendemain.",
            hard: "En quelques minutes avant de se coucher, Toby libère son bureau, range ses affaires et laisse sa chambre calme pour la nuit."
        },
        {
            title: "Balcon Ensoleillé",
            easy: "Le soleil du matin réchauffe le balcon. Paul boit du jus et lit les actualités.",
            medium: "Paul profite d'un petit-déjeuner calme sur le balcon ensoleillé. Il boit un jus frais et lit quelques articles.",
            hard: "Baigné par la lumière matinale sur le balcon, Paul savoure un jus frais et parcourt les nouvelles avant de commencer."
        },
        {
            title: "Nouvelles Chaussures",
            easy: "Nina essaie de nouvelles chaussures de course. Elles sont légères et douces aux pieds.",
            medium: "Nina marche dans le magasin pour tester de nouvelles chaussures. Elles offrent un bon maintien pour ses promenades.",
            hard: "Faisant quelques pas dans l'allée, Nina apprécie l'amorti souple et le confort des nouvelles chaussures pour marcher."
        },
        {
            title: "Salade de Fruits",
            easy: "Ils coupent une banane, une pomme et une mangue. Ils mélangent les fruits dans un grand bol.",
            medium: "Pour un goûter frais, ils coupent banane, pomme et mangue en dés et les mélangent avec un filet de citron vert.",
            hard: "Associant mangue sucrée, pomme croquante et banane mûre relevées d'un peu de citron vert, ils préparent une salade bien fraîche."
        },
        {
            title: "Code Tardif",
            easy: "Arthur écrit de courtes lignes de code. Il teste la page et sourit quand ça marche.",
            medium: "Arthur avance sur un projet web le soir. Il corrige un petit bug, recharge la page et voit l'affichage fonctionner.",
            hard: "Devant l'écran éclairé tard le soir, Arthur résout un détail de code et observe l'interface réagir sans accroc."
        },
        {
            title: "Matin Nuageux",
            easy: "Des nuages gris couvrent le ciel aujourd'hui. Le vent est doux et l'air semble frais.",
            medium: "Des nuages gris flottent dans le ciel par un matin frais. Une brise légère agite les feuilles pendant que chacun part.",
            hard: "Sous un ciel couvert de nuages légers, une brise fraîche traverse la rue et donne à la matinée une atmosphère calme."
        },
        {
            title: "Cours d'Art",
            easy: "Les élèves peignent à l'aquarelle sur du papier. Le bleu et le jaune forment du vert.",
            medium: "En cours d'art, les élèves explorent l'aquarelle sur du papier épais. Mélanger bleu et jaune fait naître du vert.",
            hard: "Posant le pinceau humide sur le papier, les élèves regardent le bleu et le jaune se mêler en nuances vertes subtiles."
        },
        {
            title: "Nourrir les Poissons",
            easy: "Les petits poissons nagent dans l'eau claire. Lucas leur donne une pincée de nourriture.",
            medium: "Lucas vérifie le filtre de l'aquarium et donne une pincée de nourriture aux poissons. Ils montent vite et mangent calmement.",
            hard: "Regardant l'eau limpide de l'aquarium, Lucas dépose une petite pincée de nourriture et voit les poissons s'approcher."
        },
        {
            title: "Porte d'Embarquement",
            easy: "Les passagers attendent près de la porte quatre. Un avion atterrit sur la piste.",
            medium: "Les voyageurs patientent près de la porte quatre en attendant le départ. Dehors, un autre avion se pose sur la piste.",
            hard: "Près des grandes baies vitrées, les voyageurs observent un avion qui descend doucement et touche la piste."
        },
        {
            title: "Soupe Chaude",
            easy: "La soupe est chaude dans le bol. La carotte, la pomme de terre et le poulet sentent bon.",
            medium: "Par une soirée fraîche, un bol de soupe chaude aux légumes et au poulet réchauffe tout le monde après une longue journée.",
            hard: "Versée fumante dans des bols creux, la soupe aux carottes, pommes de terre et poulet réchauffe agréablement."
        },
        {
            title: "Pratique du Piano",
            easy: "Sara joue un morceau lent au piano. Ses doigts se déplacent avec soin sur les touches.",
            medium: "Sara répète un court morceau au piano chaque jour. Elle travaille les passages délicats lentement pour trouver le rythme.",
            hard: "Avec patience et régularité, Sara reprend un passage exigeant au piano jusqu'à ce que la mélodie devienne fluide."
        },
        {
            title: "Pont de la Ville",
            easy: "Les voitures traversent le large pont au-dessus de la rivière. Des promeneurs prennent des photos.",
            medium: "Beaucoup de voitures et de cyclistes empruntent le pont dans la journée. Des piétons s'arrêtent pour admirer la vue.",
            hard: "Enjambant la large rivière, le pont accueille une circulation régulière tandis que les promeneurs contemplent l'horizon."
        },
        {
            title: "Étirements du Matin",
            easy: "Evan se lève et étire les bras. Il respire profondément et se sent prêt.",
            medium: "Evan commence sa matinée par quelques étirements près de la fenêtre ouverte. Respirer profondément l'aide à se réveiller.",
            hard: "Près de la fenêtre ouverte dès le matin, Evan étire les épaules, inspire profondément et démarre la journée calmement."
        },
        {
            title: "Parapluie Oublié",
            easy: "La pluie commence, mais Julia a laissé son parapluie à la maison. Elle court vers la boutique.",
            medium: "Une averse soudaine surprend Julia sur le chemin du retour. Sans parapluie, elle s'abrite sous un auvent jusqu'à l'accalmie.",
            hard: "Surprise par une pluie soudaine sans parapluie, Julia se met à l'abri sous un auvent et attend que l'averse diminue."
        },
        {
            title: "Soirée Cinéma",
            easy: "Ils éteignent les lumières et lancent un film. Le pop-corn est dans un grand bol.",
            medium: "Le vendredi soir, ils tamisent les lumières, partagent du pop-corn et regardent un film d'aventure ensemble.",
            hard: "À la lumière tamisée avec un bol de pop-corn à portée de main, ils suivent un film d'aventure jusqu'au générique."
        },
        {
            title: "Écrire une Lettre",
            easy: "Grand-père écrit un petit mot sur papier. Il le glisse dans une enveloppe avec un timbre.",
            medium: "Grand-père écrit une lettre attentionnée à un vieil ami. Il plie la feuille, ferme l'enveloppe et la poste en marchant.",
            hard: "Prenant le temps d'une écriture soignée, grand-père rédige quelques mots pour un ami de longue date et poste sa lettre."
        },
        {
            title: "Jardin Botanique",
            easy: "De grands arbres et des fleurs colorées emplissent le jardin. Des allées entourent un petit bassin.",
            medium: "Les visiteurs flânent le long des allées du jardin botanique, entre massifs fleuris et un bassin paisible.",
            hard: "Entre grands arbres, fleurs variées et bassin calme, le jardin botanique offre une promenade reposante en ville."
        },
        {
            title: "Petit-Déjeuner Rapide",
            easy: "Des tartines, du beurre et une banane font un petit-déjeuner rapide. Léo mange avant de partir.",
            medium: "Léo prépare un petit-déjeuner simple avec des tartines, du beurre et une banane pour avoir de l'énergie le matin.",
            hard: "Avec du pain grillé, une banane et une boisson chaude, Léo prend un petit-déjeuner rapide avant de sortir."
        },
        {
            title: "Coucher de Soleil sur la Plage",
            easy: "Les vagues roulent sur le sable. Le ciel devient orange près de l'océan.",
            medium: "Des promeneurs marchent sur le sable humide au coucher du soleil tandis que les vagues douces rejoignent le rivage.",
            hard: "Tandis que les vagues douces effleurent le sable, des teintes orangées et rosées s'étirent au-dessus de l'océan."
        },
        {
            title: "Projet de Groupe",
            easy: "Quatre amis travaillent ensemble sur un projet. Ils partagent des idées et notent le plan.",
            medium: "Quatre camarades se réunissent pour organiser leur projet. Chacun prend une tâche claire pour respecter les délais.",
            hard: "Réunis autour d'une table avec leurs notes, quatre camarades répartissent le travail et précisent les étapes du projet."
        },
        {
            title: "Citronnade Fraîche",
            easy: "La journée est chaude et ensoleillée. Mia prépare une citronnade froide avec des glaçons.",
            medium: "Par un après-midi chaud, Mia presse des citrons frais, ajoute de l'eau froide et des glaçons et sert un grand verre.",
            hard: "Avec des glaçons dans un grand verre, la citronnade fraîchement pressée de Mia rafraîchit agréablement sous la chaleur."
        },
        {
            title: "Fenêtre du Train",
            easy: "Des champs verts défilent derrière la fenêtre du train. Des vaches broutent près d'une clôture.",
            medium: "Par la fenêtre du train, des champs verts et des maisons calmes passent. Des vaches pâturent sous un grand ciel.",
            hard: "Au-delà de la vitre du train, prairies vertes, haies et troupeaux défilent dans un paysage rural paisible."
        },
        {
            title: "Première Neige",
            easy: "Des flocons blancs tombent doucement du ciel. Le toit et la rue deviennent blancs.",
            medium: "Des flocons tombent sans bruit le soir venu, recouvrant toits, voitures et branches d'un fin voile blanc.",
            hard: "Tombant doucement dans le calme du soir, les premiers flocons recouvrent toits et trottoirs d'une couche blanche."
        },
        {
            title: "Échange de Livres",
            easy: "Des amis échangent les livres qu'ils ont finis. Chacun reçoit une nouvelle histoire à lire.",
            medium: "Un groupe d'amis échange des livres chaque mois afin de découvrir de nouvelles lectures facilement.",
            hard: "Partageant leurs lectures terminées chaque mois, les amis entretiennent un échange simple qui renouvelle leurs découvertes."
        },
        {
            title: "Réveil du Matin",
            easy: "Le réveil sonne à six heures. Alex l'éteint, se lève et ouvre les rideaux.",
            medium: "Quand le réveil sonne à six heures, Alex se lève aussitôt, ouvre les rideaux et accueille la lumière du jour.",
            hard: "Dès que le réveil retentit, Alex se lève sans tarder, tire les rideaux et commence la matinée calmement."
        },
        {
            title: "Vitrine de la Boulangerie",
            easy: "Des gâteaux sucrés et des petits pains sont derrière la vitre. Les passants s'arrêtent pour regarder.",
            medium: "Les passants s'arrêtent devant la boulangerie pour admirer les viennoiseries dorées, tartes et pains frais.",
            hard: "Derrière la vitrine propre, les plateaux de brioches et de tartes attirent le regard des passants."
        },
        {
            title: "Feu de Camp Étoilé",
            easy: "Des amis s'assoient près d'un petit feu la nuit. Des étincelles montent vers les étoiles.",
            medium: "Autour d'un petit feu de camp le soir, des amis discutent et regardent les étincelles monter sous les étoiles.",
            hard: "Sous un ciel étoilé dans une clairière calme, un petit feu réchauffe la soirée tandis que les étincelles s'élèvent."
        }
    ],
    ja: [
        {
            title: "朝のコーヒー",
            easy: "レオは早く起きます。熱いコーヒーを作り、窓の近くに座ります。外で鳥が鳴いています。",
            medium: "レオは毎朝仕事の前に早く起きます。熱いコーヒーをいれて窓辺に座り、今日の予定を確認します。",
            hard: "街が本格的に動き出す前の静かな朝、レオは淹れたてのコーヒーを片手に明るい窓辺へ座り、一日の思考を整えます。"
        },
        {
            title: "公園の散歩",
            easy: "マヤは犬と公園を散歩します。緑の芝生の上を走り、赤いボールで遊びます。",
            medium: "マヤは毎晩犬を連れて近くの公園を散歩します。小道を走り、芝生で赤いボールを投げて遊びます。",
            hard: "高い木々の間から午後の柔らかな光が差し込む中、マヤは愛犬と公園の小道を駆け抜け、ボールが落ち葉のそばに転がると足を止めます。"
        },
        {
            title: "駅にて",
            easy: "サムは駅に着きます。切符を買い、青い電車を待ちます。みんな急いでいます。",
            medium: "サムは十分前に駅へ着きます。時刻表を見て切符を買い、急ぐ人たちを眺めます。",
            hard: "案内放送と足音が行き交う駅で、サムは発車案内を確認し、ドアが閉まる直前に急行電車へ乗り込みます。"
        },
        {
            title: "一緒に料理",
            easy: "アナとトムは家で夕食を作ります。新鮮な野菜を切り、トマトソースのパスタを作ります。",
            medium: "アナとトムは仕事の後に一緒に夕食を作ります。野菜を切り、パスタをゆでてソースを作ります。",
            hard: "小さなキッチンを心地よい空間にしながら、アナとトムは新鮮な食材を切り、その日の出来事を話しながらソースを煮込みます。"
        },
        {
            title: "なくした鍵",
            easy: "ベンは家の鍵が見つかりません。かばんやコートのポケット、テーブルを探します。",
            medium: "ベンは出かける前に鍵を探します。リュックやポケット、玄関のテーブルを見て、ノートの陰で見つけます。",
            hard: "約束の時間が近づく中、ベンは部屋やポケットを探し回り、ついにノートの下に隠れていた鍵を見つけます。"
        },
        {
            title: "雨の午後",
            easy: "ガラスに雨が降ります。クララはソファで本を読み、温かいお茶を飲みます。",
            medium: "午後ずっと静かな雨が窓を打ちます。クララはソファで温かいお茶を飲みながら小説を読みます。",
            hard: "窓ガラスを雨が流れ落ちる午後、クララは温かいお茶を手にソファへ腰を下ろし、物語の世界へ深く入り込みます。"
        },
        {
            title: "新しい職場の初日",
            easy: "デビッドは新しいチームに会います。みんな笑顔で机とパソコンを案内します。",
            medium: "デビッドは初日に少し早く出社します。上司がチームを紹介し、席と仕事内容を案内します。",
            hard: "期待と集中を胸に新しいオフィスへ入ったデビッドは、仲間と挨拶を交わし、席を整えて最初の目標に取り組みます。"
        },
        {
            title: "夜空の星",
            easy: "今夜は空がきれいです。エレナはバルコニーから星と明るい月を見ます。",
            medium: "澄んだ秋の夜、エレナはバルコニーに出て涼しい風を感じながら星を見上げます。",
            hard: "街の明かりから離れた澄み切った夜空の下、エレナはバルコニーに立ち、静かな夜に輝く星々を眺めます。"
        },
        {
            title: "小さな本屋",
            easy: "ルーカスは小さな本屋に入ります。棚には本がたくさんあり、二冊を選びます。",
            medium: "ルーカスは帰り道に小さな本屋へ寄ります。木製の棚から今週読む本を二冊選びます。",
            hard: "静かな通り沿いにある小さな本屋には紙の香りが漂い、ルーカスは棚を巡りながら心ひかれる二冊を選びます。"
        },
        {
            title: "夕焼け空",
            easy: "太陽が丘の後ろに沈みます。オレンジ色とピンク色が空に広がります。",
            medium: "夕暮れ時、友人たちと丘へ行き、オレンジや紫に染まる夕焼け空を眺めます。",
            hard: "太陽が稜線の向こうへ沈むと、橙色や桃色、深い藍色が地平線を染め、夕暮れのひとときを彩ります。"
        },
        {
            title: "パンを焼く",
            easy: "ミアは小麦粉とぬるま湯を混ぜます。生地をオーブンに入れ、香りを待ちます。",
            medium: "ミアは台の上で生地をこね、少し休ませてから焼きます。やがて部屋中に焼きたての香りが広がります。",
            hard: "木の台に粉を軽く広げ、ミアはふっくらとした生地を整えてオーブンへ入れ、香ばしい焼き上がりを待ちます。"
        },
        {
            title: "朝のバス",
            easy: "ノアは七時にバスに乗ります。音楽を聴き、窓の外を見ます。",
            medium: "ノアは七時のバスで街を横切ります。イヤホンをつけ、店々の明かりがつく様子を眺めます。",
            hard: "朝のバスの窓際に座り、ノアは音楽を聴きながら少しずつ動き出す街の景色を眺めます。"
        },
        {
            title: "植物の水やり",
            easy: "ソフィアはバルコニーに緑の植物を置いています。小さなじょうろで水をあげます。",
            medium: "ソフィアは二日に一度植物に水をあげます。土の様子を見て、乾いた葉を整えます。",
            hard: "小さなじょうろを持って鉢を回りながら、ソフィアは土の湿り気と日当たりを確かめて植物を世話します。"
        },
        {
            title: "買い物リスト",
            easy: "リアムは短いメモを書きます。市場でりんご、牛乳、米、卵を買います。",
            medium: "リアムは買い忘れがないようにメモを作ります。新鮮な果物や野菜、基本の食材を選びます。",
            hard: "メモを頼りに市場の通路を歩きながら、リアムは必要な食材を落ち着いて選びます。"
        },
        {
            title: "勉強机",
            easy: "エマは机に座ります。ノートを開き、青いペンを持って一時間勉強します。",
            medium: "エマは集中できるように机を整えてから勉強を始めます。ノートを見返し、大事な点をまとめます。",
            hard: "スタンドライトの下で、エマはノートを整理し、学んだ内容を結びつけながら一時間の勉強を進めます。"
        },
        {
            title: "優しい隣人",
            easy: "パークさんは庭から手を振ります。近所の人に新鮮なオレンジを持ってきます。",
            medium: "パークさんは垣根越しによく近所の人と話します。昨日は庭でとれたオレンジを分けてくれました。",
            hard: "気さくな挨拶で親しまれているパークさんは、庭でとれた甘いオレンジをかごに入れて届けてくれます。"
        },
        {
            title: "夕暮れの自転車",
            easy: "レオは小道を自転車で走ります。空気は涼しく、街灯がつきます。",
            medium: "夕方にレオは川沿いの道を自転車で走ります。涼しい風を感じながら街灯の明かりを見ます。",
            hard: "夕暮れの川沿いをゆっくり走りながら、レオは涼しい風と水面に映る街灯の光を感じます。"
        },
        {
            title: "荷造り",
            easy: "クロエは旅行用の小さなバッグに荷物を入れます。シャツと靴と充電器を入れます。",
            medium: "クロエは週末の荷造り前にリストを作ります。軽い服をたたみ、必要なものをそろえます。",
            hard: "ベッドの上に持ち物を並べてから、クロエは忘れ物がないように丁寧にバッグへ詰めます。"
        },
        {
            title: "静かな図書館",
            easy: "図書館は静かで涼しいです。ダニエルは木のテーブルで歴史の本を読みます。",
            medium: "ダニエルは授業の後に図書館で二時間過ごします。奥の席で集中して本を読みます。",
            hard: "静まり返った閲覧室で、ダニエルは木の机につき、落ち着いたペースでページをめくります。"
        },
        {
            title: "お茶を入れる",
            easy: "ハンナはやかんでお湯を沸かします。カップのミントの葉にお湯を注ぎます。",
            medium: "ハンナはお湯を沸かし、夕方にミントティーを入れます。温かい飲み物で一日の疲れをほぐします。",
            hard: "やかんから湯気が立つと、ハンナはミントの葉にお湯を注ぎ、静かなひとときを楽しみます。"
        },
        {
            title: "週末の市場",
            easy: "土曜日に人々が市場を訪れます。花やパンや果物があります。",
            medium: "毎週土曜の朝、市場は色とりどりの店で賑わいます。花や焼きたてのパン、果物を買う人が集まります。",
            hard: "土曜の朝になると市場には活気が生まれ、焼きたてのパンや旬の果物、花が並びます。"
        },
        {
            title: "いすを直す",
            easy: "お父さんは箱からドライバーを出します。いすのゆるんだ足を締めます。",
            medium: "いすが少しぐらつくと、お父さんはねじを確かめてしっかり締め直します。",
            hard: "ぐらつきを確かめたお父さんは、道具を出して部品を合わせ、ねじを丁寧に締め直します。"
        },
        {
            title: "家への電話",
            easy: "イネスは夕方に両親へ電話します。二十分話して笑います。",
            medium: "イネスは毎週日曜の夕方に両親へ電話します。一週間の出来事を話し、思い出を語り合います。",
            hard: "離れて暮らしていても、イネスは日曜の電話で近況を伝え合い、楽しい時間を共有します。"
        },
        {
            title: "きれいな部屋",
            easy: "トビーは服をしまい、机を片付けます。部屋がすっきりしました。",
            medium: "トビーは寝る前に十五分ほど部屋を片付けます。物を戻しておくと次の日が楽になります。",
            hard: "眠る前の短い片付けで、トビーは机の上を整え、心地よい状態で一日を終えます。"
        },
        {
            title: "日当たりのよいバルコニー",
            easy: "朝の光がバルコニーを温めます。ポールはジュースを飲み、ニュースを読みます。",
            medium: "ポールは明るいバルコニーで朝ごはんを楽しみます。ジュースを飲みながら記事を読みます。",
            hard: "朝の光が差し込むバルコニーで、ポールは冷たいジュースを味わいながら一日の流れを整えます。"
        },
        {
            title: "新しい靴",
            easy: "ニーナは新しいランニングシューズを履きます。軽くてやわらかい履き心地です。",
            medium: "ニーナは店内で新しい靴を試します。クッションがよく、散歩にぴったりだと感じます。",
            hard: "通路を少し歩いてみて、ニーナは足裏への当たりや歩きやすさを確かめます。"
        },
        {
            title: "フルーツサラダ",
            easy: "バナナやりんご、マンゴーを切ります。大きなボウルで混ぜます。",
            medium: "おやつ用にバナナやりんご、マンゴーを切り、ライムを少し絞って混ぜます。",
            hard: "甘いマンゴーやシャキッとしたりんご、バナナにライムを添えて、爽やかなサラダを作ります。"
        },
        {
            title: "夜のコード",
            easy: "アーサーは短いコードを書きます。ページを確かめて、動くと微笑みます。",
            medium: "アーサーは夜にウェブ制作を進めます。小さな不具合を直し、表示が整うのを確かめます。",
            hard: "夜の静かな時間に画面へ向かい、アーサーは細かい調整を加えてスムーズな動きを確認します。"
        },
        {
            title: "曇りの朝",
            easy: "今日は灰色の雲が空を覆っています。風がやわらかく、空気が涼しいです。",
            medium: "涼しい朝、灰色の雲がゆっくり流れます。軽い風が吹く中、人々が学校へ向かいます。",
            hard: "淡い雲に包まれた朝、爽やかな風が通りを抜け、静かで落ち着いた空気を作ります。"
        },
        {
            title: "美術の授業",
            easy: "生徒たちは紙に水彩で絵を描きます。青と黄色を混ぜると緑になります。",
            medium: "美術の授業で厚い紙に水彩を広げます。青と黄色を混ぜて緑を作ります。",
            hard: "筆に水と絵の具を含ませ、生徒たちは青と黄色が溶け合う緑の濃淡を楽しみます。"
        },
        {
            title: "魚にごはんをあげる",
            easy: "小さな魚がきれいな水を泳いでいます。ルーカスはえさを少しあげます。",
            medium: "ルーカスは水槽のフィルターを見て、えさを少しあげます。魚たちが集まってきます。",
            hard: "澄んだ水槽を見つめながら、ルーカスはえさを少し落とし、泳ぐ様子を見守ります。"
        },
        {
            title: "搭乗口",
            easy: "乗客が四番ゲート近くで待ちます。飛行機が滑走路に着陸します。",
            medium: "出発を待つ人たちがゲート近くに集まります。外では別の飛行機が着陸します。",
            hard: "大きな窓のそばから、乗客たちは飛行機が滑走路へ下りてくる様子を見つめます。"
        },
        {
            title: "温かいスープ",
            easy: "スープがボウルの中で温かいです。にんじんとじゃがいもと鶏肉がいい香りです。",
            medium: "肌寒い夕方、野菜と鶏肉の温かいスープが体をやさしく温めます。",
            hard: "湯気の立つスープを器に注ぐと、にんじんやじゃがいものやさしい味わいが広がります。"
        },
        {
            title: "ピアノの練習",
            easy: "サラはピアノでゆっくり曲を弾きます。指が鍵盤の上を丁寧に動きます。",
            medium: "サラは毎日短い曲を練習します。むずかしい部分もゆっくり繰り返して慣らします。",
            hard: "焦らず丁寧に向き合いながら、サラはフレーズを滑らかにつなげていきます。"
        },
        {
            title: "街の橋",
            easy: "車が川にかかる広い橋を渡ります。歩く人が景色を撮ります。",
            medium: "昼間は多くの車や自転車が橋を渡ります。歩く人も景色を眺めて立ち止まります。",
            hard: "川を渡る大きな橋の上を車が行き交い、歩く人々が街並みを眺めます。"
        },
        {
            title: "朝のストレッチ",
            easy: "エバンは立ち上がり、腕を伸ばします。深く息を吸い、準備が整います。",
            medium: "エバンは開いた窓のそばで軽く体を伸ばします。深呼吸で気分がすっきりします。",
            hard: "朝の空気が入る窓辺で、エバンは肩や腕を伸ばし、深呼吸して一日を始めます。"
        },
        {
            title: "忘れた傘",
            easy: "雨が降り始めますが、ジュリアは傘を家に忘れました。店へ走ります。",
            medium: "帰り道に急に雨が降ります。傘がないジュリアは軒下で少し雨宿りをします。",
            hard: "突然の雨に気づいたジュリアは、店の軒先に入って雨足が弱まるのを待ちます。"
        },
        {
            title: "映画の夜",
            easy: "明かりを消して映画を始めます。ポップコーンが大きなボウルに入っています。",
            medium: "金曜の夜、明かりを少し落とし、ポップコーンを分け合いながら冒険映画を見ます。",
            hard: "部屋を少し暗くしてポップコーンを用意し、最後まで楽しめる映画を味わいます。"
        },
        {
            title: "手紙を書く",
            easy: "おじいさんは紙に短いメモを書きます。切手を貼った封筒に入れます。",
            medium: "おじいさんは古い友人へ手紙を書きます。丁寧にたたんで封筒に入れ、散歩の途中で出します。",
            hard: "落ち着いた筆致で便せんに向かい、おじいさんは友人への思いを込めて手紙をまとめます。"
        },
        {
            title: "植物園",
            easy: "高い木々と色とりどりの花が庭を彩ります。小道が小さな池の周りを巡ります。",
            medium: "植物園の小道を歩くと、季節の花や木陰、静かな池に出会います。",
            hard: "緑豊かな木々や花壇、静かな池に囲まれた植物園で穏やかな時間を過ごします。"
        },
        {
            title: "さっと朝ごはん",
            easy: "トーストとバターとバナナで簡単な朝ごはんです。レオは出かける前に食べます。",
            medium: "レオはトーストとバナナで手早く朝ごはんを済ませ、元気に家を出ます。",
            hard: "こんがり焼けたトーストとバナナで短い朝ごはんを整え、一日の準備をします。"
        },
        {
            title: "砂浜の夕日",
            easy: "波が砂浜へ打ち寄せます。海の近くで空がオレンジ色になります。",
            medium: "夕暮れの砂浜を歩く人々が、オレンジ色に染まる空と波音を楽しみます。",
            hard: "穏やかな波が岸辺を濡らす頃、橙色と桃色の光が水平線に広がります。"
        },
        {
            title: "グループ制作",
            easy: "四人の友だちが一緒に作業します。アイデアを出し合い、計画を書きます。",
            medium: "四人が集まって役割を決め、期限に間に合うように進めます。",
            hard: "ノートを広げながら四人が意見を出し合い、進め方をわかりやすく整えます。"
        },
        {
            title: "冷たいレモネード",
            easy: "暑くて晴れた日です。ミアは氷と砂糖で冷たいレモネードを作ります。",
            medium: "暑い午後にミアはレモンを絞り、冷たい水と氷を合わせて飲みます。",
            hard: "氷の入ったグラスに搾りたてのレモンを合わせ、爽やかな一杯を作ります。"
        },
        {
            title: "電車の窓",
            easy: "緑の畑が電車の窓の外を流れます。牛が柵の近くで草を食べています。",
            medium: "窓の外には緑の野原や小さな家々が広がり、牛がのんびり草をはんでいます。",
            hard: "車窓の向こうに緑の草原と牧場の風景が続き、穏やかな時間が流れます。"
        },
        {
            title: "初雪",
            easy: "白い雪片が空から静かに降ります。屋根も通りも白くなります。",
            medium: "夕暮れに雪が降り始め、屋根や木々をうっすらと白く染めます。",
            hard: "音もなく舞い降りる初雪が、静かな町並みをやわらかな白で包みます。"
        },
        {
            title: "本の交換",
            easy: "友だち同士で読み終えた本を交換します。新しい物語が手に入ります。",
            medium: "毎月友だちと本を交換し、新しい作家や物語に出会います。",
            hard: "読み終わった本を回し合うことで、自然に新しい読書の世界が広がります。"
        },
        {
            title: "朝の目覚まし",
            easy: "六時に目覚ましが鳴ります。アレックスは止め、起きてカーテンを開けます。",
            medium: "六時のアラームで起き上がり、カーテンを開けて朝の光を迎えます。",
            hard: "アラームが鳴るとすぐに起き出し、カーテンを開けて一日をスタートします。"
        },
        {
            title: "パン屋のショーケース",
            easy: "甘いケーキやパンがガラスの向こうに並んでいます。人が足を止めて見ます。",
            medium: "パン屋の前を通ると、焼きたてのパンやタルトに目が行きます。",
            hard: "きれいに整えられたショーケースのパンや焼き菓子が通りを彩ります。"
        },
        {
            title: "星空のたき火",
            easy: "夜に友だちが小さな火のそばに座ります。火の粉が星へ向かって上がります。",
            medium: "星空の下、小さな火を囲んで話し、揺れる炎と火の粉を眺めます。",
            hard: "静かな夜空の下、小さな火を囲んで語らいながら穏やかな時間を過ごします。"
        }
    ],
    pt: [
        {
            title: "O Café da Manhã",
            easy: "Léo acorda cedo. Ele faz café quente e senta perto da janela. Os pássaros cantam lá fora.",
            medium: "Léo acorda cedo todos os dias antes do trabalho. Ele prepara café quente, senta junto à janela iluminada e organiza suas metas.",
            hard: "Todas as manhãs antes de a cidade ganhar ritmo, Léo passa um café fresco e senta perto da janela para alinhar suas ideias com tranquilidade."
        },
        {
            title: "Passeio no Parque",
            easy: "Maya passeia no parque com seu cachorro. Eles correm na grama verde e brincam com uma bola vermelha.",
            medium: "Maya leva o cachorro ao parque toda tarde. Eles correm pela trilha e brincam com uma bola vermelha no gramado.",
            hard: "Enquanto a luz dourada da tarde atravessa as árvores altas, Maya corre pela trilha com seu cachorro e para quando a bola rola entre as folhas."
        },
        {
            title: "Na Estação de Trem",
            easy: "Sam chega à estação. Ele compra uma passagem e espera o trem azul. As pessoas estão com pressa.",
            medium: "Sam chega dez minutos antes à estação. Ele confere os horários, compra a passagem e observa os passageiros apressados.",
            hard: "Em meio aos avisos sonoros e passos apressados, Sam confere o painel de partidas e embarca no trem expresso antes de as portas fecharem."
        },
        {
            title: "Cozinhando Juntos",
            easy: "Ana e Tom fazem o jantar em casa. Eles cortam legumes frescos e preparam massa com molho.",
            medium: "Ana e Tom cozinham juntos após o expediente. Eles picam legumes frescos, cozinham o macarrão e preparam um molho de tomate.",
            hard: "Transformando a cozinha em um espaço acolhedor, Ana e Tom picam ervas frescas e preparam um molho aromático enquanto conversam sobre o dia."
        },
        {
            title: "As Chaves Perdidas",
            easy: "Ben não encontra as chaves de casa. Ele olha na mochila, no casaco e na mesa da entrada.",
            medium: "Ben procura as chaves antes de sair. Ele olha na mochila, nos bolsos e na mesa até achá-las sob um caderno.",
            hard: "Com o horário de um compromisso se aproximando, Ben refaz o caminho pela sala, confere os bolsos e encontra as chaves sob um caderno."
        },
        {
            title: "Tarde de Chuva",
            easy: "A chuva cai no vidro. Clara lê um bom livro e toma chá quente no sofá.",
            medium: "Uma chuva constante cai durante a tarde. Clara se acomoda no sofá com uma xícara de chá quente e lê um romance.",
            hard: "Enquanto a chuva escorre pela janela, Clara acomoda-se no sofá com um chá quente e mergulha em uma leitura envolvente."
        },
        {
            title: "Primeiro Dia no Trabalho",
            easy: "David conhece sua nova equipe. Todos sorriem e mostram sua mesa e seu computador.",
            medium: "David chega cedo no primeiro dia de trabalho. O gestor apresenta a equipe, organiza sua estação e explica o projeto.",
            hard: "Chegando ao novo escritório com entusiasmo e foco, David cumprimenta os colegas, organiza sua mesa e define as primeiras metas."
        },
        {
            title: "Olhando as Estrelas",
            easy: "O céu está limpo à noite. Elena olha as estrelas e a lua brilhante da varanda.",
            medium: "Em uma noite limpa de outono, Elena vai à varanda observar as estrelas enquanto a brisa fresca sopra.",
            hard: "Sob um céu estrelado longe do barulho da cidade, Elena observa as constelações da varanda e aproveita a calma da noite."
        },
        {
            title: "A Pequena Livraria",
            easy: "Lucas entra em uma livraria pequena. As prateleiras têm vários livros e ele escolhe duas histórias.",
            medium: "Lucas passa por uma livraria aconchegante na volta para casa. Entre as estantes, escolhe dois livros para ler na semana.",
            hard: "Em uma rua tranquila, a pequena livraria tem cheiro de papel e convida Lucas a explorar as prateleiras até escolher dois títulos."
        },
        {
            title: "O Pôr do Sol",
            easy: "O sol desce atrás das colinas. Tons de laranja e rosa tomam conta do céu.",
            medium: "No fim do dia, amigos sobem à colina para ver o pôr do sol em tons de laranja e lilás.",
            hard: "Quando o sol se põe atrás das montanhas, faixas âmbar, rosa e violeta iluminam o horizonte e marcam o fim da tarde."
        },
        {
            title: "Assando Pão",
            easy: "Mia mistura farinha e água morna. Ela põe a massa no forno e espera o cheiro.",
            medium: "Mia sova a massa na bancada e espera crescer antes de assar. Logo a cozinha fica com cheiro de pão quente.",
            hard: "Polvilhando farinha na mesa, Mia modela a massa crescida com calma e leva ao forno até dourar e perfumar a casa."
        },
        {
            title: "Viagem de Ônibus",
            easy: "Noah pega o ônibus às sete. Ele ouve música e olha pela janela.",
            medium: "Noah pega o ônibus das sete para atravessar a cidade. De fones, vê as luzes das lojas acenderem.",
            hard: "Sentado junto à janela do ônibus matinal, Noah acompanha a música enquanto vê as ruas ganharem movimento."
        },
        {
            title: "Regando as Plantas",
            easy: "Sofia tem plantas verdes na varanda. Ela usa um regador pequeno para dar água.",
            medium: "Sofia rega as plantas a cada dois dias. Olha a terra, tira folhas secas e ajusta a posição no sol.",
            hard: "Passando de vaso em vaso com o regador, Sofia cuida das plantas observando a umidade e a luz da manhã."
        },
        {
            title: "Lista do Mercado",
            easy: "Liam escreve uma lista curta. Ele compra maçãs, leite, arroz e ovos no mercado.",
            medium: "Liam faz uma lista antes de ir ao mercado para não esquecer nada. Compra frutas, legumes e itens básicos.",
            hard: "Guiado por uma lista simples, Liam percorre o mercado escolhendo alimentos frescos sem pressa."
        },
        {
            title: "Mesa de Estudo",
            easy: "Emma senta na mesa. Abre o caderno, pega uma caneta azul e estuda por uma hora.",
            medium: "Emma organiza a mesa antes de estudar para manter o foco. Revisa anotações e faz um resumo curto.",
            hard: "Sob a luz suave do abajur, Emma organiza suas anotações, liga ideias e transforma uma hora de estudo em avanço real."
        },
        {
            title: "Vizinho Gentil",
            easy: "Seu Park acena do quintal. Ele traz laranjas frescas para os vizinhos.",
            medium: "Seu Park conversa com os vizinhos perto da cerca. Ontem repartiu laranjas maduras colhidas no quintal.",
            hard: "Conhecido pela gentileza na rua, seu Park passa com uma cesta de laranjas doces colhidas na hora."
        },
        {
            title: "Passeio de Bicicleta",
            easy: "Léo anda de bicicleta na trilha. O ar está fresco e os postes acendem.",
            medium: "Léo pedala pela beira do rio no fim da tarde. Sente a brisa fresca enquanto as luzes refletem na água.",
            hard: "Pedalando sem pressa ao entardecer, Léo sente o ar fresco enquanto os postes iluminam o caminho."
        },
        {
            title: "Arrumando a Mala",
            easy: "Chloe arruma uma bolsa pequena para a viagem. Coloca camisas, sapatos e carregador.",
            medium: "Chloe faz uma lista antes de arrumar a bolsa do fim de semana. Dobra roupas leves e confere as passagens.",
            hard: "Separando tudo sobre a cama primeiro, Chloe organiza a bolsa com calma para sair tranquila de manhã."
        },
        {
            title: "Biblioteca Calma",
            easy: "A biblioteca é silenciosa e fresca. Daniel lê um livro de história em uma mesa de madeira.",
            medium: "Daniel passa duas horas na biblioteca após a aula. Escolhe um canto calmo e lê sem pressa.",
            hard: "Na sala silenciosa da biblioteca, Daniel senta à mesa e avança na leitura em um ritmo constante."
        },
        {
            title: "Fazendo Chá",
            easy: "Hannah ferve água na chaleira. Despeja água quente sobre folhas de hortelã na xícara.",
            medium: "Hannah esquenta água e faz um chá de hortelã à tarde. A bebida morna ajuda a relaxar após o dia.",
            hard: "Com a água quente saindo da chaleira, Hannah prepara um chá de hortelã e aproveita uma pausa tranquila."
        },
        {
            title: "Feira de Fim de Semana",
            easy: "No sábado as pessoas vão à feira. Há flores, pão e frutas.",
            medium: "Todo sábado de manhã a feira fica cheia de cor. As pessoas compram flores, pão fresco e frutas.",
            hard: "Movimentada e colorida aos sábados, a feira reúne pães frescos, frutas maduras e flores."
        },
        {
            title: "Arrumando uma Cadeira",
            easy: "Pai pega uma chave de fenda na caixa. Aperta o pé frouxo da cadeira.",
            medium: "Quando uma cadeira começa a balançar, o pai confere os parafusos e aperta até ficar firme.",
            hard: "Testando a firmeza com cuidado, o pai pega as ferramentas e ajusta cada parafuso com precisão."
        },
        {
            title: "Ligação para Casa",
            easy: "Inês liga para os pais à noite. Conversam vinte minutos e dão risada.",
            medium: "Inês liga para os pais todo domingo para contar novidades. Lembram histórias e conversam com calma.",
            hard: "Mesmo de longe, Inês mantém a conversa de domingo para matar a saudade e rir em família."
        },
        {
            title: "Quarto Organizado",
            easy: "Toby guarda as roupas e limpa a mesa. Agora o quarto parece arrumado e amplo.",
            medium: "Toby separa quinze minutos para arrumar o quarto antes de dormir. Deixar tudo no lugar ajuda amanhã.",
            hard: "Em poucos minutos antes de deitar, Toby libera a mesa, guarda roupas e deixa o quarto pronto para o dia seguinte."
        },
        {
            title: "Varanda Ensolarada",
            easy: "O sol da manhã esquenta a varanda. Paul toma suco e lê as notícias.",
            medium: "Paul aproveita a manhã na varanda ensolarada. Toma um suco fresco e lê algumas notícias.",
            hard: "Com a luz da manhã na varanda, Paul toma um suco gelado e lê as notícias antes de começar."
        },
        {
            title: "Tênis Novos",
            easy: "Nina experimenta tênis novos de corrida. São leves e macios nos pés.",
            medium: "Nina anda pela loja testando um par novo. Sente bom conforto para caminhar no dia a dia.",
            hard: "Dando alguns passos pelo corredor, Nina percebe o conforto e a leveza dos tênis para caminhar."
        },
        {
            title: "Salada de Frutas",
            easy: "Eles cortam banana, maçã e manga. Misturam as frutas em uma tigela grande.",
            medium: "Para um lanche fresco, cortam banana, maçã e manga e misturam com um pouco de limão.",
            hard: "Juntando manga doce, maçã firme e banana com um toque de limão, fazem uma salada bem refrescante."
        },
        {
            title: "Código à Noite",
            easy: "Arthur escreve linhas curtas de código. Testa a página e sorri quando funciona.",
            medium: "Arthur trabalha num projeto web à noite. Corrige um detalhe, recarrega a página e vê tudo funcionando.",
            hard: "Diante da tela iluminada à noite, Arthur ajusta um trecho do código e vê a página responder bem."
        },
        {
            title: "Manhã Nublada",
            easy: "Nuvens cinzas cobrem o céu hoje. O vento é leve e o ar parece fresco.",
            medium: "Nuvens cinzas passam devagar numa manhã fresca. Uma brisa leve move as folhas enquanto todos seguem.",
            hard: "Sob nuvens suaves, uma brisa fresca passa pela rua e deixa a manhã calma e agradável."
        },
        {
            title: "Aula de Arte",
            easy: "Os alunos pintam com aquarela no papel. Azul e amarelo viram verde.",
            medium: "Na aula de arte, testam aquarela em papel firme. Misturar azul e amarelo forma tons de verde.",
            hard: "Com o pincel úmido no papel, os alunos veem o azul e o amarelo se misturarem em tons verdes."
        },
        {
            title: "Alimentando os Peixes",
            easy: "Os peixes pequenos nadam na água limpa. Lucas dá uma pitada de ração.",
            medium: "Lucas confere o filtro do aquário e dá um pouco de ração. Os peixes sobem e comem com calma.",
            hard: "Observando a água limpa do aquário, Lucas coloca uma pitada de ração e vê os peixes se aproximarem."
        },
        {
            title: "Portão de Embarque",
            easy: "Passageiros esperam perto do portão quatro. Um avião pousa na pista.",
            medium: "Viajantes aguardam perto do portão quatro para embarcar. Fora, outro avião pousa na pista.",
            hard: "Perto das janelas amplas, os passageiros acompanham um avião descendo e tocando a pista."
        },
        {
            title: "Sopa Quente",
            easy: "A sopa está quente na tigela. Cenoura, batata e frango têm ótimo cheiro.",
            medium: "Numa noite fria, uma tigela de sopa quente de legumes e frango aquece depois de um dia corrido.",
            hard: "Servida bem quente, a sopa de cenoura, batata e frango traz aconchego nos dias mais frescos."
        },
        {
            title: "Prática no Piano",
            easy: "Sara toca uma música lenta no piano. Os dedos se movem com cuidado nas teclas.",
            medium: "Sara treina um trecho curto no piano todo dia. Repete as partes difíceis devagar até pegar o ritmo.",
            hard: "Com paciência e atenção, Sara repete um trecho mais difícil até a música fluir com naturalidade."
        },
        {
            title: "Ponte da Cidade",
            easy: "Carros cruzam a ponte larga sobre o rio. Quem passa tira fotos da vista.",
            medium: "Muitos carros e bicicletas cruzam a ponte durante o dia. Pedestres param para olhar a paisagem.",
            hard: "Ligando as margens do rio, a ponte recebe movimento constante enquanto pedestres admiram a vista."
        },
        {
            title: "Alongamento Matinal",
            easy: "Evan fica de pé e estica os braços. Respira fundo e se sente pronto.",
            medium: "Evan começa a manhã se alongando perto da janela aberta. Respirar fundo ajuda a despertar.",
            hard: "Junto à janela aberta logo cedo, Evan estica os braços, respira fundo e começa o dia com calma."
        },
        {
            title: "Guarda-Chuva Esquecido",
            easy: "Começa a chover, mas Julia deixou o guarda-chuva em casa. Corre para a loja.",
            medium: "Uma chuva rápida pega Julia na volta. Sem guarda-chuva, ela espera sob a marquise até diminuir.",
            hard: "Surpreendida pela chuva sem guarda-chuva, Julia encosta sob a marquise e espera a chuva acalmar."
        },
        {
            title: "Noite de Filme",
            easy: "Apagam as luzes e começam um filme. A pipoca está numa tigela grande.",
            medium: "Na sexta à noite, diminuem as luzes, dividem pipoca e assistem a um filme de aventura juntos.",
            hard: "Com luz baixa e uma tigela de pipoca por perto, acompanham uma história envolvente até o fim."
        },
        {
            title: "Escrevendo uma Carta",
            easy: "O avô escreve um bilhete curto no papel. Coloca num envelope com selo.",
            medium: "O avô escreve uma carta carinhosa para um velho amigo. Dobra a folha, fecha o envelope e posta.",
            hard: "Com calma e letra caprichada, o avô escreve algumas linhas para um amigo antigo e envia a carta."
        },
        {
            title: "Jardim Botânico",
            easy: "Árvores altas e flores coloridas enchem o jardim. Trilhas contornam um lago pequeno.",
            medium: "Visitantes caminham pelas trilhas do jardim botânico, entre flores variadas e um lago calmo.",
            hard: "Entre árvores grandes, canteiros floridos e um lago tranquilo, o jardim oferece um passeio agradável."
        },
        {
            title: "Café Rápido",
            easy: "Torradas, manteiga e banana formam um café rápido. Léo come antes de sair.",
            medium: "Léo prepara um café simples com torradas, manteiga e banana para ter energia pela manhã.",
            hard: "Com torradas douradas, uma banana e uma bebida quente, Léo faz um lanche rápido antes de sair."
        },
        {
            title: "Pôr do Sol na Praia",
            easy: "Ondas chegam à areia. O céu fica alaranjado perto do mar.",
            medium: "Pessoas caminham pela areia úmida no fim da tarde enquanto as ondas suaves chegam à praia.",
            hard: "Enquanto as ondas leves tocam a areia, tons alaranjados e rosados se espalham pelo horizonte."
        },
        {
            title: "Trabalho em Grupo",
            easy: "Quatro amigos trabalham juntos num projeto. Trocam ideias e escrevem o plano.",
            medium: "Quatro colegas se reúnem para organizar o trabalho. Cada um pega uma parte para cumprir o prazo.",
            hard: "Reunidos com os cadernos abertos, quatro colegas dividem tarefas e alinham os passos do projeto."
        },
        {
            title: "Limonada Gelada",
            easy: "O dia está quente e ensolarado. Mia faz limonada gelada com gelo e açúcar.",
            medium: "Numa tarde quente, Mia espreme limões frescos, mistura com água fria e gelo e serve num copo alto.",
            hard: "Com gelo no copo, a limonada feita na hora refresca bem numa tarde de calor."
        },
        {
            title: "Janela do Trem",
            easy: "Campos verdes passam pela janela do trem. Vacas comem grama perto de uma cerca.",
            medium: "Pela janela do trem passam campos verdes e sítios calmos. Vacas pastam sob um céu amplo.",
            hard: "Além da janela do trem, campos verdes, cercas e pastagens seguem em sequência tranquila."
        },
        {
            title: "Primeira Neve",
            easy: "Flocos brancos caem devagar do céu. O telhado e a rua ficam brancos.",
            medium: "Flocos leves caem no fim da tarde e cobrem telhados, carros e galhos com uma camada branca.",
            hard: "Caindo em silêncio ao anoitecer, os primeiros flocos cobrem telhados e ruas com suavidade."
        },
        {
            title: "Troca de Livros",
            easy: "Amigos trocam livros que terminaram. Cada um ganha uma história nova para ler.",
            medium: "Um grupo de amigos troca livros todo mês para conhecer histórias novas sem gastar mais.",
            hard: "Passando adiante leituras concluídas todo mês, os amigos mantêm uma troca simples e divertida."
        },
        {
            title: "Despertador da Manhã",
            easy: "O despertador toca às seis. Alex desliga, levanta e abre as cortinas.",
            medium: "Quando o despertador toca às seis, Alex levanta logo, abre as cortinas e deixa a luz entrar.",
            hard: "Ao ouvir o despertador, Alex levanta sem enrolar, abre as cortinas e começa a manhã."
        },
        {
            title: "Vitrine da Padaria",
            easy: "Bolos doces e pães ficam atrás do vidro. Quem passa para para olhar.",
            medium: "Quem passa pela padaria olha as bandejas de pães dourados, tortas e doces frescos.",
            hard: "Atrás do vidro limpo, as bandejas de pães e tortas chamam atenção de quem passa na rua."
        },
        {
            title: "Fogueira sob as Estrelas",
            easy: "Amigos sentam perto de um fogo pequeno à noite. Faíscas sobem para as estrelas.",
            medium: "Em volta de uma pequena fogueira à noite, os amigos conversam e olham as estrelas.",
            hard: "Sob o céu estrelado, a pequena fogueira acompanha a conversa enquanto as faíscas sobem na noite."
        }
    ]
};