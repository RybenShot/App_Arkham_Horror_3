import { Lang } from './language.service';

/** Diccionario clave-primero: cada key agrupa sus 3 traducciones juntas,
 *  para poder revisarlas/editarlas de un vistazo. */
export const TRANSLATIONS: Record<string, Record<Lang, string>> = {
  // ---------- nav ----------
  'nav.about': { es: 'Sobre mi', en: 'About', pt: 'Sobre mim' },
  'nav.path': { es: 'Trayectoria', en: 'Journey', pt: 'Trajetória' },
  'nav.contact': { es: 'Contacto', en: 'Contact', pt: 'Contato' },

  // ---------- hero ----------
  'hero.thesis.logic': { es: '</Programador>', en: '</Developer>', pt: '</Programador>' },
  'hero.thesis.and': { es: ' Y', en: ' AND', pt: ' E' },
  'hero.thesis.creative': { es: ' creativo.', en: ' creative.', pt: ' criativo.' },
  'hero.bio': {
    es: 'Soy Sebastián, desarrollador especializado en crear experiencias y herramientas digitales para juegos de mesa, combinando mi pasión por la programación y el diseño de juegos. Mi proyecto principal es una aplicación para el juego de mesa <strong>Arkham Horror 3ª Edición</strong>, donde he desarrollado sistemas para gestionar investigadores, mapas, estado de partida, ayudas de juego, guardado de partida, reacciones automáticas e interacción entre jugadores mediante un modo online, siempre buscando complementar la experiencia física sin interrumpirla. <br/> Mi experiencia con JavaScript, Vue.js, Node.js, Express, APIs REST, programación orientada a objetos y gestión de bases de datos NoSQL me ha llevado a trabajar especialmente con lógica de estado, sistemas interactivos y experiencias centradas en el usuario. <br/> Actualmente sigo evolucionando hacia el desarrollo de herramientas digitales capaces de potenciar y expandir la experiencia de juego, profundizando en TypeScript para crear aplicaciones más robustas y desarrollar nuevos sistemas de seguimiento y gestión de partidas. Mi objetivo es transformar reglas y mecánicas de juego en experiencias digitales interactivas, claras, innovadoras y, sobre todo, divertidas.',
    en: "I'm Sebastián, a developer specialized in building digital experiences and tools for board games, combining my passion for programming with game design. My main project is an app for the board game <strong>Arkham Horror 3rd Edition</strong>, where I've built systems to manage investigators, maps, game state, in-game help, save games, automatic reactions, and player interaction through an online mode — always aiming to complement the physical experience without interrupting it. <br/> My experience with JavaScript, Vue.js, Node.js, Express, REST APIs, object-oriented programming, and NoSQL databases has led me to focus especially on state logic, interactive systems, and user-centered experiences. <br/> I'm currently evolving toward building digital tools that enhance and expand the gameplay experience, going deeper into TypeScript to build more robust apps and develop new systems for tracking and managing game sessions. My goal is to turn game rules and mechanics into interactive digital experiences that are clear, innovative, and above all, fun.",
    pt: 'Sou o Sebastián, desenvolvedor especializado em criar experiências e ferramentas digitais para jogos de tabuleiro, combinando minha paixão por programação com o design de jogos. Meu projeto principal é um aplicativo para o jogo de tabuleiro <strong>Arkham Horror 3ª Edição</strong>, no qual desenvolvi sistemas para gerenciar investigadores, mapas, estado da partida, ajudas de jogo, salvamento de partida, reações automáticas e interação entre jogadores através de um modo online, sempre buscando complementar a experiência física sem interrompê-la. <br/> Minha experiência com JavaScript, Vue.js, Node.js, Express, APIs REST, programação orientada a objetos e gestão de bancos de dados NoSQL me levou a trabalhar especialmente com lógica de estado, sistemas interativos e experiências centradas no usuário. <br/> Atualmente continuo evoluindo para o desenvolvimento de ferramentas digitais capazes de potencializar e expandir a experiência de jogo, aprofundando em TypeScript para criar aplicações mais robustas e desenvolver novos sistemas de acompanhamento e gestão de partidas. Meu objetivo é transformar regras e mecânicas de jogo em experiências digitais interativas, claras, inovadoras e, sobretudo, divertidas.',
  },

  // ---------- callout (candidatura Devir Play) ----------
  'callout.tag': { es: 'Aplicando ahora mismo a', en: 'Currently applying to', pt: 'Atualmente me candidatando para' },
  'callout.intro': {
    es: 'Esta candidatura nace de una combinación muy concreta de intereses: desarrollo de software, sistemas de juego y juegos de mesa. Mi proyecto principal, una aplicación digital para <b>Arkham Horror 3ª Edición</b>, me ha permitido convertir reglas y mecánicas de un juego físico en sistemas interactivos capaces de gestionar el estado de una partida y reaccionar automáticamente a las acciones de los jugadores.',
    en: 'This application comes from a very specific combination of interests: software development, game systems, and board games. My main project, a digital companion app for <b>Arkham Horror 3rd Edition</b>, has let me turn the rules and mechanics of a physical game into interactive systems capable of managing a game\'s state and reacting automatically to player actions.',
    pt: 'Esta candidatura nasce de uma combinação muito específica de interesses: desenvolvimento de software, sistemas de jogo e jogos de tabuleiro. Meu projeto principal, um aplicativo digital para <b>Arkham Horror 3ª Edição</b>, me permitiu transformar regras e mecânicas de um jogo físico em sistemas interativos capazes de gerenciar o estado de uma partida e reagir automaticamente às ações dos jogadores.',
  },
  'callout.li1': {
    es: '<b>Gestión del estado de partida</b>: investigadores, mapas, eventos, estados y seguimiento de diferentes elementos del juego.',
    en: '<b>Game state management</b>: investigators, maps, events, statuses, and tracking of different game elements.',
    pt: '<b>Gestão do estado da partida</b>: investigadores, mapas, eventos, estados e acompanhamento de diferentes elementos do jogo.',
  },
  'callout.li2': {
    es: '<b>Sistemas y automatización</b>: recordatorios, reacciones automáticas, efectos de bendición/maldición y resolución de diferentes situaciones de juego.',
    en: '<b>Systems and automation</b>: reminders, automatic reactions, blessing/curse effects, and resolution of different in-game situations.',
    pt: '<b>Sistemas e automação</b>: lembretes, reações automáticas, efeitos de bênção/maldição e resolução de diferentes situações de jogo.',
  },
  'callout.li3': {
    es: '<b>“Unir mesas” — interacción online</b>: un sistema pensado para conectar a jugadores de distintas partidas durante momentos concretos del juego. En lugar de limitar la experiencia a los jugadores sentados en la misma mesa, permite encontrarse e interactuar brevemente con otros jugadores reales, creando la sensación de que no estás simplemente jugando <i>Arkham Horror</i> con tus amigos, sino que realmente estás dentro de la ciudad de Arkham y puedes encontrarte con otras personas durante tu investigación.',
    en: '<b>“Merging tables” — online interaction</b>: a system designed to connect players from different game sessions during specific moments of play. Instead of limiting the experience to the players sitting at the same table, it lets you briefly meet and interact with other real players, creating the feeling that you\'re not just playing <i>Arkham Horror</i> with your friends, but that you\'re actually inside the city of Arkham and might run into other people during your investigation.',
    pt: '<b>“Unir mesas” — interação online</b>: um sistema pensado para conectar jogadores de partidas diferentes durante momentos específicos do jogo. Em vez de limitar a experiência aos jogadores sentados na mesma mesa, permite encontrar e interagir brevemente com outros jogadores reais, criando a sensação de que você não está apenas jogando <i>Arkham Horror</i> com os amigos, mas que realmente está dentro da cidade de Arkham e pode encontrar outras pessoas durante sua investigação.',
  },
  'callout.li4': {
    es: '<b>Arquitectura y lógica</b>: separación de responsabilidades, programación orientada a objetos y desarrollo de APIs para conectar los diferentes sistemas.',
    en: '<b>Architecture and logic</b>: separation of concerns, object-oriented programming, and building APIs to connect the different systems.',
    pt: '<b>Arquitetura e lógica</b>: separação de responsabilidades, programação orientada a objetos e desenvolvimento de APIs para conectar os diferentes sistemas.',
  },
  'callout.li5': {
    es: '<b>Experiencia de jugador</b>: interfaz diseñada para aportar información y automatizar tareas sin convertirse en el centro de la partida.',
    en: '<b>Player experience</b>: an interface designed to provide information and automate tasks without becoming the center of attention during the game.',
    pt: '<b>Experiência do jogador</b>: interface projetada para fornecer informações e automatizar tarefas sem se tornar o centro da partida.',
  },
  'callout.why': {
    es: '<b>¿Por qué este puesto?</b> Porque Devir no es para mí simplemente una empresa que publica juegos: es una parte importante de la cultura del juego de mesa que me ha acompañado durante años. Soy un apasionado de los juegos de mesa y siempre me ha fascinado todo lo que ocurre alrededor de una mesa: las historias que se crean, las decisiones que se toman y, sobre todo, la sensación de compartir una experiencia con otras personas. Precisamente de esa pasión nació mi proyecto de <i>Arkham Horror</i>. Poder unir ahora esa afición con mi profesión y ayudar a llevar esas experiencias al mundo digital sería para mí una oportunidad especialmente emocionante.',
    en: '<b>Why this role?</b> Because to me, Devir isn\'t just a company that publishes games: it\'s an important part of the board game culture that has been with me for years. I\'m passionate about board games, and I\'ve always been fascinated by everything that happens around a table: the stories that get created, the decisions that get made, and above all, the feeling of sharing an experience with other people. My <i>Arkham Horror</i> project was born from exactly that passion. Being able to combine that passion with my profession now, and helping bring those experiences into the digital world, would be an especially exciting opportunity for me.',
    pt: '<b>Por que esta vaga?</b> Porque para mim a Devir não é simplesmente uma empresa que publica jogos: é uma parte importante da cultura dos jogos de tabuleiro que me acompanha há anos. Sou um apaixonado por jogos de tabuleiro e sempre me fascinou tudo o que acontece em torno de uma mesa: as histórias que se criam, as decisões que se tomam e, acima de tudo, a sensação de compartilhar uma experiência com outras pessoas. Foi justamente dessa paixão que nasceu meu projeto de <i>Arkham Horror</i>. Poder unir agora essa paixão com minha profissão e ajudar a levar essas experiências para o mundo digital seria, para mim, uma oportunidade especialmente emocionante.',
  },
  'callout.link': {
    es: 'Puedes ver el proyecto en mi GitHub →',
    en: 'You can check out the project on my GitHub →',
    pt: 'Você pode ver o projeto no meu GitHub →',
  },

  // ---------- experience: columna lógica ----------
  'exp.logic.kicker': { es: '// Zona de lógica', en: '// Logic zone', pt: '// Zona de lógica' },
  'exp.logic.title': { es: 'Desarrollo', en: 'Development', pt: 'Desenvolvimento' },
  'exp.logic.intro': {
    es: 'Aquí puedes ver mis proyectos y experiencia a nivel técnico.',
    en: 'Here you can see my projects and technical experience.',
    pt: 'Aqui você pode ver meus projetos e experiência a nível técnico.',
  },
  'exp.section.experience': { es: 'Experiencia', en: 'Experience', pt: 'Experiência' },

  'exp.card1.meta': { es: '2021 — en curso · Málaga', en: '2021 — ongoing · Málaga', pt: '2021 — em andamento · Málaga' },
  'exp.card1.body': {
    es: '¿Por qué este proyecto? Porque quise enfrentarme al mayor reto posible, uno que ni siquiera sabía cómo afrontar al principio, pero tenía algo claro: si podía con este, podría con cualquiera. Y después de constantes evoluciones, mejoras, investigaciones, invenciones, refactorizaciones y cambios de diseño, podéis ver el resultado con vuestros propios ojos, con un tutorial de inicio interactivo para dar un paseo por la aplicación, pero sin destripar sorpresas narrativas que solo se descubrirán jugando.',
    en: "Why this project? Because I wanted to take on the biggest challenge I could find, one I didn't even know how to approach at first — but I had one thing clear: if I could pull this off, I could pull off anything. And after constant iterations, improvements, research, inventions, refactors, and design changes, you can see the result for yourselves, with an interactive onboarding tour to walk you through the app, without spoiling narrative surprises that you can only discover by playing.",
    pt: 'Por que este projeto? Porque eu quis enfrentar o maior desafio possível, um que eu nem sabia como abordar a princípio, mas tinha uma coisa clara: se eu conseguisse com esse, conseguiria com qualquer um. E depois de constantes evoluções, melhorias, pesquisas, invenções, refatorações e mudanças de design, vocês podem ver o resultado com os próprios olhos, com um tutorial inicial interativo para passear pela aplicação, mas sem revelar surpresas narrativas que só se descobrem jogando.',
  },
  'exp.card1.linkTry': { es: 'Probar la app →', en: 'Try the app →', pt: 'Testar o app →' },
  'exp.card1.linkCode': { es: 'Ver el código →', en: 'View the code →', pt: 'Ver o código →' },
  'exp.card1.figcaption': {
    es: 'Todo lo de la izquierda y más cabe en el móvil de la derecha.',
    en: 'Everything on the left — and more — fits in the phone on the right.',
    pt: 'Tudo o que está à esquerda e mais ainda cabe no celular à direita.',
  },
  'exp.card1.imgAlt': {
    es: 'Toda la mesa de juego de Arkham Horror con mazos, tablero, fichas y dados, junto a un móvil mostrando la misma información en la app',
    en: 'The full Arkham Horror game table with decks, board, tokens and dice, next to a phone showing the same information in the app',
    pt: 'Toda a mesa de jogo de Arkham Horror com decks, tabuleiro, fichas e dados, ao lado de um celular mostrando a mesma informação no aplicativo',
  },

  'exp.card2.meta': { es: 'Mar 2024 — Ene 2025 · Pamplona', en: 'Mar 2024 — Jan 2025 · Pamplona', pt: 'Mar 2024 — Jan 2025 · Pamplona' },
  'exp.card2.before': { es: 'Consultora. Trabajé sobre la web de ', en: 'Consulting firm. I worked on the website for ', pt: 'Consultoria. Trabalhei no site da ' },
  'exp.card2.after': {
    es: ': nuevas páginas integradas con Magnolia y base de datos, gestión de incidencias, testing de funcionalidades. Aprendí Java y Magnolia desde cero en 2 meses; sostuve el servidor en solitario un mes entero; integré Cookiebot con Google Tag Manager.',
    en: ': new pages integrated with Magnolia and a database, issue management, and feature testing. I learned Java and Magnolia from scratch in 2 months, single-handedly kept the server running for a whole month, and integrated Cookiebot with Google Tag Manager.',
    pt: ': novas páginas integradas com Magnolia e banco de dados, gestão de incidências, testes de funcionalidades. Aprendi Java e Magnolia do zero em 2 meses; sustentei o servidor sozinho por um mês inteiro; integrei o Cookiebot com o Google Tag Manager.',
  },

  'exp.card3.meta': { es: 'Ene — Nov 2023 · Málaga', en: 'Jan — Nov 2023 · Málaga', pt: 'Jan — Nov 2023 · Málaga' },
  'exp.card3.body': {
    es: 'Análisis y desarrollo de procesos de datos. Aprendí Python en un mes y ya estaba produciendo con él.',
    en: 'Data analysis and development of data processes. I learned Python in a month and was already shipping with it.',
    pt: 'Análise e desenvolvimento de processos de dados. Aprendi Python em um mês e já estava produzindo com ele.',
  },

  'exp.section.tools': { es: 'Herramientas', en: 'Tools', pt: 'Ferramentas' },
  'exp.tools.languages': { es: 'Lenguajes', en: 'Languages', pt: 'Linguagens' },
  'exp.tools.frameworks': { es: 'Frameworks', en: 'Frameworks', pt: 'Frameworks' },
  'exp.tools.infra': { es: 'Infra & datos', en: 'Infra & data', pt: 'Infra & dados' },

  'exp.section.education': { es: 'Formación', en: 'Education', pt: 'Formação' },
  'exp.edu1.title': { es: 'Desarrollador Web', en: 'Web Developer', pt: 'Desenvolvedor Web' },
  'exp.edu1.detail': {
    es: '2023 — 2024 · Málaga · aprendizaje por pares: aprender de los demás, y saber explicárselo a alguien más',
    en: '2023 — 2024 · Málaga · peer learning: learning from others, and being able to explain it to someone else',
    pt: '2023 — 2024 · Málaga · aprendizagem entre pares: aprender com os outros, e saber explicar para outra pessoa',
  },
  'exp.edu2.title': { es: 'Técnico Desarrollador APP WEB', en: 'Web App Developer Technician', pt: 'Técnico Desenvolvedor de APP WEB' },

  // ---------- experience: columna creativa ----------
  'exp.creative.kicker': { es: '✎ Enfoque creativo', en: '✎ Creative side', pt: '✎ Enfoque criativo' },
  'exp.creative.title': { es: 'Innovador', en: 'Innovator', pt: 'Inovador' },
  'exp.creative.intro': {
    es: 'Incluso cuando no hay teclado de por medio, sigo creando — solo que con un libro de rol de Guardián (La Llamada de Cthulhu), un par de dados y unos pobres jugadores esperando ver qué se les viene encima.',
    en: "Even when there's no keyboard involved, I'm still creating — just with a Keeper's rulebook (Call of Cthulhu), a couple of dice, and a few unlucky players waiting to see what's coming for them.",
    pt: 'Mesmo quando não há teclado envolvido, eu continuo criando — só que com um livro de regras de Guardião (Chamado de Cthulhu), um par de dados e alguns jogadores desafortunados esperando para ver o que vem por aí.',
  },
  'exp.section.hobbies': { es: 'Aficiones', en: 'Hobbies', pt: 'Hobbies' },

  'exp.cardA.title': { es: 'Guardián de La Llamada de Cthulhu', en: 'Keeper of Call of Cthulhu', pt: 'Guardião de Chamado de Cthulhu' },
  'exp.cardA.meta': { es: 'y de todos los demás juegos', en: 'and of every other game too', pt: 'e de todos os outros jogos também' },
  'exp.cardA.body': {
    es: 'Suelo dirigir partidas como Guardián: construyo campañas, interpreto a media docena de PNJs a la vez y disfruto viendo a mis investigadores tomar la decisión exactamente equivocada, incluso he masterizado partidas de 12h. Y fuera de esa mesa, cuando estrenamos cualquier juego nuevo con el grupo, suelo ser quien acaba explicando las reglas.',
    en: "I usually run games as the Keeper: I build campaigns, voice half a dozen NPCs at once, and love watching my investigators make exactly the wrong call — I've even run 12-hour sessions. And outside that table, whenever we try out a new game with the group, I'm usually the one who ends up explaining the rules.",
    pt: 'Costumo mestrar partidas como Guardião: construo campanhas, interpreto meia dúzia de NPCs ao mesmo tempo e adoro ver meus investigadores tomarem exatamente a decisão errada — já mestrei sessões de 12h. E fora dessa mesa, quando estreamos qualquer jogo novo com o grupo, geralmente sou eu quem acaba explicando as regras.',
  },

  'exp.cardB.title': { es: 'Reinvento juegos.', en: 'I reinvent games.', pt: 'Reinvento jogos.' },
  'exp.cardB.body': {
    es: 'Rara vez dejo un juego de mesa tal cual viene en la caja. En cuanto noto que uno empieza a repetirse, le añado variantes o reglas caseras o incluso busco reglas de su comunidad de BGG — básicamente lo reinvento antes de que se vuelva aburrido, para bien o para mal de quien juega conmigo.',
    en: "I rarely leave a board game exactly as it comes in the box. As soon as one starts feeling repetitive, I add variants or house rules, or even dig up rules from its BGG community — basically I reinvent it before it gets boring, for better or worse for whoever plays with me.",
    pt: 'Raramente deixo um jogo de tabuleiro exatamente como vem na caixa. Assim que percebo que um jogo começa a ficar repetitivo, adiciono variantes ou regras da casa, ou até busco regras da comunidade no BGG — basicamente eu o reinvento antes que fique chato, para o bem ou para o mal de quem joga comigo.',
  },

  'exp.story1': {
    es: 'Me alegra ver que últimamente, desde el covid, los juegos de mesa están volviendo a crecer, pero salen tantos y a un precio que no puedo permitirme comprarlos; así que suelo visitar algunas ludotecas con mis amigos cuando hay un juego que queremos probar, o directamente lo jugamos en Tabletop.',
    en: "I'm glad to see that lately, since covid, board games have been growing again, but so many come out, and at such a price, that I can't afford to buy them all; so I usually visit a few board game cafés with my friends whenever there's a game we want to try, or we just play it on Tabletop instead.",
    pt: 'Fico feliz em ver que, desde a covid, os jogos de tabuleiro vêm crescendo de novo, mas saem tantos e a um preço que não consigo pagar por todos; então costumo visitar algumas ludotecas com meus amigos quando há um jogo que queremos experimentar, ou simplesmente jogamos no Tabletop.',
  },
  'exp.story2': {
    es: 'Tengo la plena confianza de que si unimos el formato físico y el formato digital podremos lograr el cambio que los juegos de mesa necesitan, y no me refiero solo a hacer una app para llevar el seguimiento de fichas. Creo que el concepto de "unir mesas" se puede llevar mucho más lejos, y me atrevería a decir que podría adaptarse a TODO tipo de juego de mesa; solo hay que darle unas vueltas y pensar del lado del usuario, no solo para llamar la atención, sino también para retener: DLCs digitales, la opción de que la propia comunidad pueda crear contenido, eventos digitales, actualizaciones para fechas señaladas, y un largo etcétera.',
    en: 'I firmly believe that if we combine the physical format with the digital one, we could achieve the change that board games need — and I don\'t mean just building an app to keep track of tokens. I think the concept of "merging tables" can be taken much further, and I\'d dare say it could be adapted to ANY kind of board game; it just takes some thought and looking at it from the player\'s side — not only to grab attention, but also to retain it: digital DLCs, letting the community itself create content, digital events, updates for special dates, and a long etcetera.',
    pt: 'Tenho plena confiança de que, se unirmos o formato físico e o formato digital, poderemos alcançar a mudança que os jogos de tabuleiro precisam, e não me refiro apenas a criar um app para acompanhar fichas. Acredito que o conceito de "unir mesas" pode ir muito mais longe, e eu me atreveria a dizer que poderia se adaptar a TODO tipo de jogo de tabuleiro; só é preciso pensar um pouco e olhar pelo lado do usuário, não só para chamar a atenção, mas também para reter: DLCs digitais, a opção de a própria comunidade poder criar conteúdo, eventos digitais, atualizações para datas especiais, e um longo etcetera.',
  },

  // ---------- footer / contacto ----------
  'footer.headline': { es: '¿Que tal si hablamos un rato?', en: 'How about we talk for a bit?', pt: 'Que tal conversarmos um pouco?' },
  'footer.field.name': { es: 'Nombre', en: 'Name', pt: 'Nome' },
  'footer.field.email': { es: 'Tu correo', en: 'Your email', pt: 'Seu e-mail' },
  'footer.field.message': { es: 'Mensaje', en: 'Message', pt: 'Mensagem' },
  'footer.field.messagePlaceholder': { es: 'Escribe tu mensaje…', en: 'Write your message…', pt: 'Escreva sua mensagem…' },
  'footer.button.send': { es: 'Enviar correo →', en: 'Send email →', pt: 'Enviar e-mail →' },
  'footer.button.sending': { es: 'Enviando…', en: 'Sending…', pt: 'Enviando…' },
  'footer.note.sent': { es: '¡Mensaje enviado! Te responderé pronto.', en: "Message sent! I'll get back to you soon.", pt: 'Mensagem enviada! Vou te responder em breve.' },
  'footer.note.errorBefore': { es: 'Algo falló al enviar. Probá de nuevo o escribime directo a ', en: 'Something went wrong sending it. Try again or email me directly at ', pt: 'Algo deu errado ao enviar. Tente novamente ou me escreva diretamente em ' },

  // ---------- dado flotante ----------
  'dice.hit.singular': { es: 'acierto', en: 'hit', pt: 'acerto' },
  'dice.hit.plural': { es: 'aciertos', en: 'hits', pt: 'acertos' },
  'dice.die.singular': { es: 'dado', en: 'die', pt: 'dado' },
  'dice.die.plural': { es: 'dados', en: 'dice', pt: 'dados' },
  'dice.of': { es: 'de', en: 'out of', pt: 'de' },
  'dice.aria.roll': { es: 'Tirar dados', en: 'Roll dice', pt: 'Rolar dados' },
  'dice.aria.close': { es: 'Cerrar tirada', en: 'Close roll', pt: 'Fechar rolagem' },
  'dice.status.summoning': { es: 'Invocando los dados…', en: 'Summoning the dice…', pt: 'Invocando os dados…' },
  'dice.status.rolling': { es: 'Rodando…', en: 'Rolling…', pt: 'Rolando…' },

  // ---------- whatsapp fab ----------
  'whatsapp.aria': { es: 'Escribirme por WhatsApp', en: 'Message me on WhatsApp', pt: 'Me escreva no WhatsApp' },
};
