
/* ============================================================================
   LAURA CRAVIOTO — PORTAFOLIO WEB (v3.6)
   
   v3.6 Cambios:
   - Detalle de cursos debajo de las 3 tarjetas de talleres (4 idiomas)
   - Storytelling parrafo1: "se curvea" + eliminación de frase inicial
   - Proyectos subtitulo: "Escultura, instalación, escultura portable"
   - Removidas 2 imágenes de joyería (Aretes y Gargantilla)
   - Grid masonry ajustado a 5 obras principales
   - 14 obras en galería + 7 talleres
   ============================================================================ */

import React, { useState, useEffect, useRef, useCallback } from "react";

const BASE = import.meta.env.BASE_URL || '/';
const FORMSPREE_ID = "xaqzvwnq";
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

/* ============================================================================
   BLOQUE 0: IMÁGENES — 14 obras (sin joyería) + 7 talleres
   ============================================================================ */
const IMAGENES = {
  portada: { archivo: "Galeria/1_Portada/hero-bg.jpg", alt: "Escultura de vidrio" },
  taller: { archivo: "Galeria/2_Filosofia/1 Laura - Taller.jpg", alt: "Laura Cravioto trabajando vidrio a la flama en su taller" },
  obras: [
    { archivo: "Galeria/3_Obra/Laura - Arte 4.jpeg", alt: "Instalación escultórica de múltiples piezas orgánicas de vidrio" },
    { archivo: "Galeria/3_Obra/Laura - Arte 2.jpeg", alt: "Escultura orgánica de vidrio en tonos ámbar y verde" },
    { archivo: "Galeria/3_Obra/Laura - Arte 3.jpeg", alt: "Escultura de vidrio multicolor con formas orgánicas fluidas" },
    { archivo: "Galeria/3_Obra/Laura - Arte 1.jpeg", alt: "Escultura geométrica de tubos de vidrio transparente" },
    { archivo: "Galeria/3_Obra/Laura - Arte 5.jpeg", alt: "Forma ovoide minimalista de vidrio soplado" },
    { archivo: "Galeria/3_Obra/Laura - Arte 6.jpeg", alt: "Escultura orgánica de vidrio con formas vegetales translúcidas" },
    { archivo: "Galeria/3_Obra/Laura - Arte 7.jpeg", alt: "Pieza de vidrio con extensiones delicadas en verde y ámbar" },
    { archivo: "Galeria/3_Obra/Laura - Arte 8.jpeg", alt: "Composición escultórica de vidrio en tonos cálidos" },
    { archivo: "Galeria/3_Obra/Laura - Arte 9.jpeg", alt: "Forma ovoide oscura de vidrio soplado con reflejos metálicos" },
    { archivo: "Galeria/3_Obra/Laura - Arte 10.jpeg", alt: "Escultura translúcida de vidrio con forma orgánica etérea" },
    { archivo: "Galeria/3_Obra/Laura - Arte 11.jpeg", alt: "Pieza experimental de vidrio con texturas punteadas" },
    { archivo: "Galeria/3_Obra/Laura - Arte 12.jpeg", alt: "Forma orgánica de vidrio evocando crecimiento natural" },
    { archivo: "Galeria/3_Obra/Laura - Arte 13.jpeg", alt: "Pequeña escultura de vidrio en tonos ámbar y dorado" },
    { archivo: "Galeria/3_Obra/Laura - Arte 14.jpeg", alt: "Esfera de vidrio oscuro con superficie reflectante" },
  ],
  talleres: [
    { archivo: "Galeria/4_Talleres/Taller_1.jpeg", alt: "Taller de vidrio a la flama — espacio de trabajo" },
    { archivo: "Galeria/4_Talleres/Taller_2.jpeg", alt: "Alumnas concentradas trabajando con vidrio lampwork" },
    { archivo: "Galeria/4_Talleres/Taller_3.jpeg", alt: "Proceso de experimentación guiada en el taller" },
    { archivo: "Galeria/4_Talleres/Taller_4.jpeg", alt: "Vista del espacio del taller rodeado de naturaleza" },
    { archivo: "Galeria/4_Talleres/Taller_5.jpeg", alt: "Pieza de vidrio multicolor creada en taller" },
    { archivo: "Galeria/4_Talleres/Taller_6.jpeg", alt: "Alumnas aprendiendo técnicas de vidrio a la flama" },
    { archivo: "Galeria/4_Talleres/Taller_7.jpeg", alt: "Detalle de trabajo manual con vidrio fundido" },
  ],
};

const TITULOS_OBRAS = ["Ecosistema", "Simbiosis I", "Simbiosis II", "Tensiones Estructurales", "Memoria del Humo", "Brote", "Raíces Aéreas", "Fusión Cálida", "Eclipse", "Suspensión", "Constelación Orgánica", "Germinación", "Ámbar Vivo", "Esfera Nocturna"];
const CATEGORIAS_OBRAS = ["Instalación", "Escultura", "Escultura", "Vidrio y metal", "Vidrio soplado", "Escultura", "Escultura", "Escultura", "Vidrio soplado", "Escultura", "Experimental", "Escultura", "Escultura", "Vidrio soplado"];

const GALERIA_COMPLETA = [
  { archivo: IMAGENES.taller.archivo, alt: IMAGENES.taller.alt, titulo: "En el taller", categoria: "Proceso" },
  ...IMAGENES.obras.map((img, i) => ({ archivo: img.archivo, alt: img.alt, titulo: TITULOS_OBRAS[i] || `Obra ${i + 1}`, categoria: CATEGORIAS_OBRAS[i] || "Escultura" })),
];

const REDES_SOCIALES = [
  { tipo: "instagram", url: "https://www.instagram.com/laura_cravioto_ep?igsh=dm1rdWRmNHJzaGxm&utm_source=qr" },
  { tipo: "facebook", url: "https://www.facebook.com/share/1Dr79r5XuS/?mibextid=wwXIfr" },
  { tipo: "tiktok", url: "https://www.tiktok.com/@laura.cravioto.jo?_r=1&_t=ZS-97BCMu3t3w4" },
];

/* ============================================================================
   BLOQUE 0.1: i18n — v3.6
   Cambios: parrafo1 editado, subtitulo obras, detalle de cursos, sin joyería
   ============================================================================ */
const translations = {
  es: {
    nav: { inicio: "Inicio", storytelling: "Historia", filosofia: "Filosofía", obra: "Obra", galeria: "Galería", talleres: "Talleres", contacto: "Contacto" },
    hero: { titulo: "Laura Cravioto", subtitulo: "Escultura e investigación en vidrio", descripcion: "El vidrio como territorio de exploración donde la materia se transforma, muta y respira con la luz.", btnObra: "Explorar Obra", btnTalleres: "Talleres a la Flama" },
    storytelling: { etiqueta: "Storytelling", titulo: "El instante líquido", epigrafe: "Hay un instante —apenas un segundo— en que el vidrio deja de ser sólido y aún no es líquido.", epigrafe2: "Un instante donde la materia suspende sus propias reglas.", epigrafe3: "Trabajo exactamente ahí.", parrafo1: "El calor me envuelve. El material responde: se estira, se curvea, burbujea, respira. No hay boceto que sobreviva intacto a ese diálogo. Porque el vidrio no obedece — negocia.", parrafo2: "Y aprendí a escucharlo.", parrafo3: "Mi camino no comenzó en una academia ni en un horno. Comenzó con una pregunta que todavía no termino de responder: ¿qué ocurre cuando dejamos de imponer forma a la materia y empezamos a conversar con ella?", parrafo4: "Esa pregunta me llevó del dibujo a la pintura, de la pintura a la escultura, de la escultura a la instalación. Cada disciplina fue un idioma nuevo para formular la misma obsesión: entender cómo crece, muta y se transforma lo vivo.", parrafo5: "Hasta que encontré el vidrio.", parrafo6: "Un material que guarda la luz dentro de sí. Que recuerda cada gesto del fuego. Que puede parecer frágil y ser inquebrantable." },
    statement: { etiqueta: "Filosofía", titulo: "La materia como organismo vivo", parrafo1: "Mi trabajo se desarrolla principalmente a través del vidrio, material que utilizo como un medio de investigación formal, técnica y conceptual.", parrafo2: "A través de la escultura, la instalación y la intervención espacial, construyo formas orgánicas y abstractas que evocan procesos de crecimiento, mutación, adaptación y permanencia.", parrafo3: "Gran parte de mi trabajo surge de cruces entre las artes, las ciencias y los procesos naturales. El vidrio se ha convertido en el vehículo principal de esta búsqueda.", caption: "En el taller, trabajando a la flama" },
    proyectos: { etiqueta: "Obra", titulo: "Proyectos Destacados", subtitulo: "Escultura, instalación, escultura portable.", obras: [{ titulo: "Ecosistema", año: "2024", categoria: "Instalación escultórica" }, { titulo: "Simbiosis I", año: "2024", categoria: "Escultura en vidrio a la flama" }, { titulo: "Simbiosis II", año: "2024", categoria: "Escultura en vidrio a la flama" }, { titulo: "Tensiones Estructurales", año: "2023", categoria: "Escultura en vidrio y metal" }, { titulo: "Memoria del Humo", año: "2023", categoria: "Vidrio soplado" }] },
    galeria: { etiqueta: "Galería", titulo: "Universo Visual", subtitulo: "Un recorrido por el proceso, la materia y las piezas terminadas. Haz clic en cualquier imagen para ampliarla.", cerrar: "Cerrar", de: "de" },
    talleres: {
      etiqueta: "Talleres", titulo: "El Laboratorio de Vidrio", subtitulo: "La pedagogía como extensión fundamental de la labor artística.", descripcion: "Los talleres de vidrio a la flama son un espacio de experimentación guiada donde cada participante descubre su propio diálogo con la materia.",
      items: [{ titulo: "Iniciación a la Flama", desc: "Técnicas fundamentales de vidrio lampwork. Sin experiencia previa.", duracion: "8 sesiones" }, { titulo: "Escultura Experimental", desc: "Exploración formal avanzada.", duracion: "12 sesiones" }, { titulo: "Taller Intensivo", desc: "Inmersión completa de fin de semana.", duracion: "2 días" }],
      detalleTitulo: "Talleres de vidrio a la flama",
      detalleItems: [
        { titulo: "Metodología Personalizada", desc: "Sesiones individuales donde la teoría y la práctica se fusionan para acompañar el desarrollo de tu proyecto personal." },
        { titulo: "Dominio Técnico", desc: "Instrucción integral en técnicas básicas y avanzadas con herramientas profesionales y vidrio de alta calidad." },
        { titulo: "Flexibilidad Horaria", desc: "El programa consta de 9 horas totales, las cuales puedes distribuir en bloques (2, 3 o 4 horas) de lunes a sábado, entre las 10:00 y las 20:00 h." },
        { titulo: "Proceso Integral", desc: "Incluye todos los materiales y el ciclo de templado en horno (7 horas) para garantizar la durabilidad y calidad de cada pieza. Todas las creaciones son propiedad del alumno." },
        { titulo: "Ubicación", desc: "Barrio de Jalatlaco, Oaxaca, México." },
        { titulo: "Inversión", desc: "$2,800 MXN (Reserva con el 50% de anticipo)." },
      ],
      btnInscribirse: "Inscribirse", btnFechas: "Ver próximas fechas", galeriaTitulo: "Momentos en el taller",
    },
    contacto: { etiqueta: "Contacto", tituloBio: "Biografía", bio1: "Soy una artista mexicana cuya práctica se centra en el vidrio como medio de investigación y expresión. Mi formación ha sido autodidacta, construida a partir de la experimentación constante y el aprendizaje continuo.", bio2: "Actualmente combino la producción artística con la impartición de talleres de vidrio a la flama. Considero la pedagogía una extensión fundamental de mi labor, encontrando en la enseñanza una forma de compartir conocimientos, fomentar la curiosidad y contribuir a la formación de nuevas generaciones de creadores.", tituloForm: "Colaboraciones y Consultas", formDesc: "¿Interesado en adquirir obra, inscribirte a un taller o conocer más? Escríbeme.", nombre: "Nombre", email: "Correo electrónico", asunto: "Asunto", asuntoOpciones: ["Adquisición de obra", "Colaboración artística", "Inscripción a taller", "Información de talleres", "Otro"], mensaje: "Mensaje", btnEnviar: "Enviar mensaje", enviando: "Enviando...", enviado: "¡Mensaje enviado!", errorEnvio: "Error al enviar. Intenta de nuevo.", derechos: "Todos los derechos reservados." },
  },
  en: {
    nav: { inicio: "Home", storytelling: "Story", filosofia: "Philosophy", obra: "Work", galeria: "Gallery", talleres: "Workshops", contacto: "Contact" },
    hero: { titulo: "Laura Cravioto", subtitulo: "Glass sculpture & research", descripcion: "Glass as a territory of exploration where matter transforms, mutates, and breathes with light.", btnObra: "Explore Work", btnTalleres: "Flamework Workshops" },
    storytelling: { etiqueta: "Storytelling", titulo: "The Liquid Instant", epigrafe: "There is an instant —barely a second— when glass ceases to be solid and is not yet liquid.", epigrafe2: "An instant where matter suspends its own rules.", epigrafe3: "I work exactly there.", parrafo1: "Heat envelops me. The material responds: it stretches, curves, bubbles, breathes. No sketch survives that dialogue intact. Because glass does not obey — it negotiates.", parrafo2: "And I learned to listen.", parrafo3: "My path did not begin in an academy or a furnace. It began with a question I still haven't finished answering: what happens when we stop imposing form on matter and begin to converse with it?", parrafo4: "That question led me from drawing to painting, from painting to sculpture, from sculpture to installation. Each discipline was a new language to formulate the same obsession: understanding how living things grow, mutate, and transform.", parrafo5: "Until I found glass.", parrafo6: "A material that holds light within itself. That remembers every gesture of fire. That can appear fragile and be unbreakable." },
    statement: { etiqueta: "Philosophy", titulo: "Matter as a living organism", parrafo1: "My work unfolds primarily through glass, a material I use as a medium for formal, technical, and conceptual research.", parrafo2: "Through sculpture, installation, and spatial intervention, I construct organic and abstract forms that evoke processes of growth, mutation, adaptation, and permanence.", parrafo3: "Much of my work arises from intersections between the arts, sciences, and natural processes.", caption: "In the studio, working at the flame" },
    proyectos: { etiqueta: "Work", titulo: "Featured Projects", subtitulo: "Sculpture, installation, portable sculpture.", obras: [{ titulo: "Ecosystem", año: "2024", categoria: "Sculptural installation" }, { titulo: "Symbiosis I", año: "2024", categoria: "Flamework glass sculpture" }, { titulo: "Symbiosis II", año: "2024", categoria: "Flamework glass sculpture" }, { titulo: "Structural Tensions", año: "2023", categoria: "Glass & metal sculpture" }, { titulo: "Memory of Smoke", año: "2023", categoria: "Blown glass" }] },
    galeria: { etiqueta: "Gallery", titulo: "Visual Universe", subtitulo: "A journey through process, material, and finished pieces. Click any image to enlarge.", cerrar: "Close", de: "of" },
    talleres: {
      etiqueta: "Workshops", titulo: "The Glass Laboratory", subtitulo: "Pedagogy as a fundamental extension of artistic practice.", descripcion: "Flamework glass workshops are a space for guided experimentation where each participant discovers their own dialogue with the material.",
      items: [{ titulo: "Flame Introduction", desc: "Fundamental lampwork techniques.", duracion: "8 sessions" }, { titulo: "Experimental Sculpture", desc: "Advanced formal exploration.", duracion: "12 sessions" }, { titulo: "Intensive Workshop", desc: "Full weekend immersion.", duracion: "2 days" }],
      detalleTitulo: "Flamework Glass Workshops",
      detalleItems: [
        { titulo: "Personalized Methodology", desc: "Individual sessions where theory and practice merge to support the development of your personal project." },
        { titulo: "Technical Mastery", desc: "Comprehensive instruction in basic and advanced techniques with professional tools and high-quality glass." },
        { titulo: "Flexible Schedule", desc: "The program consists of 9 total hours, which you can distribute in blocks (2, 3, or 4 hours) Monday through Saturday, between 10:00 AM and 8:00 PM." },
        { titulo: "Integral Process", desc: "Includes all materials and the kiln annealing cycle (7 hours) to ensure the durability and quality of each piece. All creations are the property of the student." },
        { titulo: "Location", desc: "Barrio de Jalatlaco, Oaxaca, Mexico." },
        { titulo: "Investment", desc: "$2,800 MXN (Reserve with 50% deposit)." },
      ],
      btnInscribirse: "Enroll", btnFechas: "See upcoming dates", galeriaTitulo: "Workshop moments",
    },
    contacto: { etiqueta: "Contact", tituloBio: "Biography", bio1: "I am a Mexican artist whose practice centers on glass as a medium for research and expression. My training has been largely self-taught, built from constant experimentation and continuous learning.", bio2: "I currently combine artistic production with teaching flamework glass workshops. I consider pedagogy a fundamental extension of my work, finding in teaching a way to share knowledge, foster curiosity, and contribute to the formation of new generations of creators.", tituloForm: "Collaborations & Inquiries", formDesc: "Interested in acquiring a piece, enrolling in a workshop, or learning more? Write to me.", nombre: "Name", email: "Email", asunto: "Subject", asuntoOpciones: ["Artwork acquisition", "Artistic collaboration", "Workshop enrollment", "Workshop information", "Other"], mensaje: "Message", btnEnviar: "Send message", enviando: "Sending...", enviado: "Message sent!", errorEnvio: "Error sending. Try again.", derechos: "All rights reserved." },
  },
  it: {
    nav: { inicio: "Home", storytelling: "Storia", filosofia: "Filosofia", obra: "Opera", galeria: "Galleria", talleres: "Laboratori", contacto: "Contatto" },
    hero: { titulo: "Laura Cravioto", subtitulo: "Scultura e ricerca nel vetro", descripcion: "Il vetro come territorio di esplorazione dove la materia si trasforma, muta e respira con la luce.", btnObra: "Esplorare l'Opera", btnTalleres: "Laboratori alla Fiamma" },
    storytelling: { etiqueta: "Storytelling", titulo: "L'istante liquido", epigrafe: "C'è un istante —appena un secondo— in cui il vetro smette di essere solido e non è ancora liquido.", epigrafe2: "Un istante in cui la materia sospende le proprie regole.", epigrafe3: "Lavoro esattamente lì.", parrafo1: "Il calore mi avvolge. Il materiale risponde: si allunga, si curva, fa bolle, respira. Nessun bozzetto sopravvive intatto a quel dialogo. Perché il vetro non obbedisce — negozia.", parrafo2: "E ho imparato ad ascoltarlo.", parrafo3: "Il mio percorso non è iniziato in un'accademia né in un forno. È iniziato con una domanda a cui non ho ancora finito di rispondere: cosa succede quando smettiamo di imporre la forma alla materia e iniziamo a conversare con essa?", parrafo4: "Quella domanda mi ha portato dal disegno alla pittura, dalla pittura alla scultura, dalla scultura all'installazione. Ogni disciplina è stata un nuovo linguaggio per formulare la stessa ossessione: capire come cresce, muta e si trasforma il vivente.", parrafo5: "Fino a quando ho trovato il vetro.", parrafo6: "Un materiale che custodisce la luce dentro di sé. Che ricorda ogni gesto del fuoco. Che può sembrare fragile ed essere infrangibile." },
    statement: { etiqueta: "Filosofia", titulo: "La materia come organismo vivente", parrafo1: "Il mio lavoro si sviluppa principalmente attraverso il vetro, materiale che utilizzo come mezzo di ricerca formale, tecnica e concettuale.", parrafo2: "Attraverso la scultura, l'installazione e l'intervento spaziale, costruisco forme organiche e astratte che evocano processi di crescita, mutazione, adattamento e permanenza.", parrafo3: "Gran parte del mio lavoro nasce dall'incrocio tra le arti, le scienze e i processi naturali. Il vetro è diventato il veicolo principale di questa ricerca.", caption: "Nel laboratorio, lavorando alla fiamma" },
    proyectos: { etiqueta: "Opera", titulo: "Progetti in Evidenza", subtitulo: "Scultura, installazione, scultura portatile.", obras: [{ titulo: "Ecosistema", año: "2024", categoria: "Installazione scultorea" }, { titulo: "Simbiosi I", año: "2024", categoria: "Scultura in vetro alla fiamma" }, { titulo: "Simbiosi II", año: "2024", categoria: "Scultura in vetro alla fiamma" }, { titulo: "Tensioni Strutturali", año: "2023", categoria: "Scultura in vetro e metallo" }, { titulo: "Memoria del Fumo", año: "2023", categoria: "Vetro soffiato" }] },
    galeria: { etiqueta: "Galleria", titulo: "Universo Visivo", subtitulo: "Un percorso attraverso il processo, la materia e le opere finite. Clicca su un'immagine per ingrandirla.", cerrar: "Chiudi", de: "di" },
    talleres: {
      etiqueta: "Laboratori", titulo: "Il Laboratorio del Vetro", subtitulo: "La pedagogia come estensione fondamentale della pratica artistica.", descripcion: "I laboratori di vetro alla fiamma sono uno spazio di sperimentazione guidata dove ogni partecipante scopre il proprio dialogo con la materia.",
      items: [{ titulo: "Iniziazione alla Fiamma", desc: "Tecniche fondamentali di vetro lampwork.", duracion: "8 sessioni" }, { titulo: "Scultura Sperimentale", desc: "Esplorazione formale avanzata.", duracion: "12 sessioni" }, { titulo: "Laboratorio Intensivo", desc: "Immersione completa nel fine settimana.", duracion: "2 giorni" }],
      detalleTitulo: "Laboratori di vetro alla fiamma",
      detalleItems: [
        { titulo: "Metodologia Personalizzata", desc: "Sessioni individuali dove teoria e pratica si fondono per accompagnare lo sviluppo del tuo progetto personale." },
        { titulo: "Padronanza Tecnica", desc: "Istruzione completa in tecniche base e avanzate con strumenti professionali e vetro di alta qualità." },
        { titulo: "Flessibilità Oraria", desc: "Il programma prevede 9 ore totali, distribuibili in blocchi (2, 3 o 4 ore) dal lunedì al sabato, dalle 10:00 alle 20:00." },
        { titulo: "Processo Integrale", desc: "Include tutti i materiali e il ciclo di ricottura in forno (7 ore) per garantire la durabilità e la qualità di ogni pezzo. Tutte le creazioni sono di proprietà dell'allievo." },
        { titulo: "Sede", desc: "Barrio de Jalatlaco, Oaxaca, Messico." },
        { titulo: "Investimento", desc: "$2.800 MXN (Riserva con il 50% di anticipo)." },
      ],
      btnInscribirse: "Iscriversi", btnFechas: "Vedi prossime date", galeriaTitulo: "Momenti nel laboratorio",
    },
    contacto: { etiqueta: "Contatto", tituloBio: "Biografia", bio1: "Sono un'artista messicana la cui pratica si concentra sul vetro come mezzo di ricerca e espressione. La mia formazione è stata in gran parte autodidatta, costruita dalla sperimentazione costante e dall'apprendimento continuo.", bio2: "Attualmente combino la produzione artistica con l'insegnamento di laboratori di vetro alla fiamma. Considero la pedagogia un'estensione fondamentale del mio lavoro, trovando nell'insegnamento un modo per condividere conoscenze, stimolare la curiosità e contribuire alla formazione di nuove generazioni di creatori.", tituloForm: "Collaborazioni e Richieste", formDesc: "Interessato ad acquisire un'opera, iscriverti a un laboratorio o saperne di più? Scrivimi.", nombre: "Nome", email: "Email", asunto: "Oggetto", asuntoOpciones: ["Acquisizione opera", "Collaborazione artistica", "Iscrizione laboratorio", "Info laboratori", "Altro"], mensaje: "Messaggio", btnEnviar: "Invia messaggio", enviando: "Invio in corso...", enviado: "Messaggio inviato!", errorEnvio: "Errore nell'invio. Riprova.", derechos: "Tutti i diritti riservati." },
  },
  fr: {
    nav: { inicio: "Accueil", storytelling: "Histoire", filosofia: "Philosophie", obra: "Œuvres", galeria: "Galerie", talleres: "Ateliers", contacto: "Contact" },
    hero: { titulo: "Laura Cravioto", subtitulo: "Sculpture et recherche en verre", descripcion: "Le verre comme territoire d'exploration où la matière se transforme, mute et respire avec la lumière.", btnObra: "Explorer l'Œuvre", btnTalleres: "Ateliers à la Flamme" },
    storytelling: { etiqueta: "Storytelling", titulo: "L'instant liquide", epigrafe: "Il y a un instant —à peine une seconde— où le verre cesse d'être solide et n'est pas encore liquide.", epigrafe2: "Un instant où la matière suspend ses propres règles.", epigrafe3: "Je travaille exactement là.", parrafo1: "La chaleur m'enveloppe. Le matériau répond : il s'étire, se courbe, bouillonne, respire. Aucun croquis ne survit intact à ce dialogue. Car le verre n'obéit pas — il négocie.", parrafo2: "Et j'ai appris à l'écouter.", parrafo3: "Mon chemin n'a pas commencé dans une académie ni dans un four. Il a commencé par une question à laquelle je n'ai toujours pas fini de répondre : que se passe-t-il quand on arrête d'imposer la forme à la matière et qu'on commence à converser avec elle ?", parrafo4: "Cette question m'a menée du dessin à la peinture, de la peinture à la sculpture, de la sculpture à l'installation. Chaque discipline a été un nouveau langage pour formuler la même obsession : comprendre comment le vivant croît, mute et se transforme.", parrafo5: "Jusqu'à ce que je trouve le verre.", parrafo6: "Un matériau qui garde la lumière en lui. Qui se souvient de chaque geste du feu. Qui peut paraître fragile et être incassable." },
    statement: { etiqueta: "Philosophie", titulo: "La matière comme organisme vivant", parrafo1: "Mon travail se développe principalement à travers le verre, matériau que j'utilise comme moyen de recherche formelle, technique et conceptuelle.", parrafo2: "À travers la sculpture, l'installation et l'intervention spatiale, je construis des formes organiques et abstraites qui évoquent des processus de croissance, de mutation, d'adaptation et de permanence.", parrafo3: "Le verre, par sa capacité à transformer la lumière, à contenir la mémoire et à défier les notions de fragilité et de résistance, est devenu le véhicule principal de cette quête.", caption: "Dans l'atelier, travaillant à la flamme" },
    proyectos: { etiqueta: "Œuvres", titulo: "Projets en Vedette", subtitulo: "Sculpture, installation, sculpture portable.", obras: [{ titulo: "Écosystème", año: "2024", categoria: "Installation sculpturale" }, { titulo: "Symbiose I", año: "2024", categoria: "Sculpture en verre à la flamme" }, { titulo: "Symbiose II", año: "2024", categoria: "Sculpture en verre à la flamme" }, { titulo: "Tensions Structurelles", año: "2023", categoria: "Sculpture en verre et métal" }, { titulo: "Mémoire de Fumée", año: "2023", categoria: "Verre soufflé" }] },
    galeria: { etiqueta: "Galerie", titulo: "Univers Visuel", subtitulo: "Un parcours à travers le processus, la matière et les œuvres achevées. Cliquez sur une image pour l'agrandir.", cerrar: "Fermer", de: "de" },
    talleres: {
      etiqueta: "Ateliers", titulo: "Le Laboratoire de Verre", subtitulo: "La pédagogie comme extension fondamentale de la pratique artistique.", descripcion: "Les ateliers de verre à la flamme sont un espace d'expérimentation guidée où chaque participant découvre son propre dialogue avec la matière.",
      items: [{ titulo: "Initiation à la Flamme", desc: "Techniques fondamentales de verre lampwork.", duracion: "8 séances" }, { titulo: "Sculpture Expérimentale", desc: "Exploration formelle avancée.", duracion: "12 séances" }, { titulo: "Atelier Intensif", desc: "Immersion complète le week-end.", duracion: "2 jours" }],
      detalleTitulo: "Ateliers de verre à la flamme",
      detalleItems: [
        { titulo: "Méthodologie Personnalisée", desc: "Séances individuelles où théorie et pratique se fusionnent pour accompagner le développement de votre projet personnel." },
        { titulo: "Maîtrise Technique", desc: "Instruction complète en techniques de base et avancées avec des outils professionnels et du verre de haute qualité." },
        { titulo: "Flexibilité Horaire", desc: "Le programme comprend 9 heures au total, que vous pouvez répartir en blocs (2, 3 ou 4 heures) du lundi au samedi, entre 10h00 et 20h00." },
        { titulo: "Processus Intégral", desc: "Comprend tous les matériaux et le cycle de recuisson au four (7 heures) pour garantir la durabilité et la qualité de chaque pièce. Toutes les créations sont la propriété de l'élève." },
        { titulo: "Lieu", desc: "Barrio de Jalatlaco, Oaxaca, Mexique." },
        { titulo: "Investissement", desc: "2 800 MXN (Réservation avec 50% d'acompte)." },
      ],
      btnInscribirse: "S'inscrire", btnFechas: "Voir prochaines dates", galeriaTitulo: "Moments dans l'atelier",
    },
    contacto: { etiqueta: "Contact", tituloBio: "Biographie", bio1: "Je suis une artiste mexicaine dont la pratique se concentre sur le verre comme moyen de recherche et d'expression. Ma formation a été en grande partie autodidacte, construite à partir de l'expérimentation constante et de l'apprentissage continu.", bio2: "Je combine actuellement la production artistique avec l'enseignement d'ateliers de verre à la flamme. Je considère la pédagogie comme une extension fondamentale de mon travail, trouvant dans l'enseignement une façon de partager les connaissances, de stimuler la curiosité et de contribuer à la formation de nouvelles générations de créateurs.", tituloForm: "Collaborations et Demandes", formDesc: "Intéressé par l'acquisition d'une œuvre, l'inscription à un atelier ou en savoir plus ? Écrivez-moi.", nombre: "Nom", email: "Email", asunto: "Sujet", asuntoOpciones: ["Acquisition d'œuvre", "Collaboration artistique", "Inscription atelier", "Info ateliers", "Autre"], mensaje: "Message", btnEnviar: "Envoyer le message", enviando: "Envoi en cours...", enviado: "Message envoyé !", errorEnvio: "Erreur d'envoi. Réessayez.", derechos: "Tous droits réservés." },
  },
};

const C = { bh: "#F6F6F4", gc: "#E3E4E6", gmc: "#C7C9CC", gm: "#8E9096", co: "#2F3033" };

const Icono = ({ tipo, size = 20 }) => {
  const i = {
    instagram: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>,
    facebook: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    tiktok: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>,
    email: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    clock: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    chevronL: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
    chevronR: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>,
    expand: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    bullet: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>,
  };
  return i[tipo] || null;
};

const Img = ({ src, alt, grad, children }) => {
  const [err, setErr] = useState(false);
  const fullSrc = src ? BASE + src : '';
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: grad }}>
      {!err && fullSrc && (
        <img src={fullSrc} alt={alt} onError={() => setErr(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }} />
      )}
      {(err || !fullSrc) && children}
    </div>
  );
};

const Lightbox = ({ imagenes, indice, onCerrar, onAnterior, onSiguiente, textosDe }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onCerrar(); if (e.key === "ArrowLeft") onAnterior(); if (e.key === "ArrowRight") onSiguiente(); };
    document.body.style.overflow = "hidden"; window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handleKey); };
  }, [onCerrar, onAnterior, onSiguiente]);
  const img = imagenes[indice];
  return (
    <div onClick={onCerrar} style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.3s" }}>
      <button onClick={onCerrar} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: C.gmc, cursor: "pointer", zIndex: 10, padding: "8px" }}><Icono tipo="close" size={28} /></button>
      <button onClick={(e) => { e.stopPropagation(); onAnterior(); }} style={{ position: "absolute", left: "clamp(0.5rem,2vw,2rem)", background: "rgba(255,255,255,0.08)", border: "none", color: C.bh, cursor: "pointer", borderRadius: "50%", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}><Icono tipo="chevronL" size={24} /></button>
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "85vw", maxHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <img src={BASE + img.archivo} alt={img.alt} style={{ maxWidth: "85vw", maxHeight: "72vh", objectFit: "contain", borderRadius: "4px", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }} />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 400, color: C.bh, marginBottom: "4px" }}>{img.titulo}</p>
          <p style={{ fontSize: "0.75rem", color: C.gm, letterSpacing: "0.1em", textTransform: "uppercase" }}>{img.categoria} — {indice + 1} {textosDe} {imagenes.length}</p>
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onSiguiente(); }} style={{ position: "absolute", right: "clamp(0.5rem,2vw,2rem)", background: "rgba(255,255,255,0.08)", border: "none", color: C.bh, cursor: "pointer", borderRadius: "50%", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}><Icono tipo="chevronR" size={24} /></button>
    </div>
  );
};

export default function App() {
  const [idioma, setIdioma] = useState("es");
  const t = translations[idioma];
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [idiomaAbierto, setIdiomaAbierto] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState("inicio");
  const [formData, setFormData] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [formEstado, setFormEstado] = useState("idle");
  const [lightboxAbierto, setLightboxAbierto] = useState(false);
  const [lightboxIndice, setLightboxIndice] = useState(0);
  const abrirLightbox = (i) => { setLightboxIndice(i); setLightboxAbierto(true); };
  const cerrarLightbox = useCallback(() => setLightboxAbierto(false), []);
  const anteriorImg = useCallback(() => setLightboxIndice((p) => (p - 1 + GALERIA_COMPLETA.length) % GALERIA_COMPLETA.length), []);
  const siguienteImg = useCallback(() => setLightboxIndice((p) => (p + 1) % GALERIA_COMPLETA.length), []);
  const seccionesRef = { inicio: useRef(null), storytelling: useRef(null), filosofia: useRef(null), obra: useRef(null), galeria: useRef(null), talleres: useRef(null), contacto: useRef(null) };

  useEffect(() => { const h = () => { const s = window.scrollY + 120; const secs = ["inicio", "storytelling", "filosofia", "obra", "galeria", "talleres", "contacto"]; for (let i = secs.length - 1; i >= 0; i--) { const r = seccionesRef[secs[i]]; if (r.current && r.current.offsetTop <= s) { setSeccionActiva(secs[i]); break; } } }; window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const scrollHacia = (s) => { setMenuAbierto(false); seccionesRef[s]?.current?.scrollIntoView({ behavior: "smooth" }); };
  const handleSubmit = async (e) => { e.preventDefault(); setFormEstado("enviando"); try { const response = await fetch(FORMSPREE_URL, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify({ nombre: formData.nombre, email: formData.email, asunto: formData.asunto, mensaje: formData.mensaje, _subject: `[Web Laura Cravioto] ${formData.asunto}` }) }); if (response.ok) { setFormEstado("enviado"); setFormData({ nombre: "", email: "", asunto: "", mensaje: "" }); setTimeout(() => setFormEstado("idle"), 4000); } else { setFormEstado("error"); setTimeout(() => setFormEstado("idle"), 4000); } } catch { setFormEstado("error"); setTimeout(() => setFormEstado("idle"), 4000); } };

  const idiomas = [{ c: "es", e: "ES" }, { c: "en", e: "EN" }, { c: "it", e: "IT" }, { c: "fr", e: "FR" }];
  const ep = { textAlign: "justify", textJustify: "inter-word" };
  const css = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth;font-size:16px}body{font-family:'Inter',-apple-system,sans-serif;color:${C.co};background:${C.bh};-webkit-font-smoothing:antialiased;overflow-x:hidden}@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:${C.bh}}::-webkit-scrollbar-thumb{background:${C.gmc};border-radius:3px}@media(max-width:768px){html{font-size:14px}}`;
  const go = ["linear-gradient(135deg,#3a3d42,#55585e)", `linear-gradient(135deg,${C.gmc},${C.gm})`, "linear-gradient(135deg,#4a4d52,#6a6d72)", `linear-gradient(145deg,${C.gc},${C.gmc})`, "linear-gradient(135deg,#5a5d62,#3a3d42)", "linear-gradient(160deg,#2F3033,#4a4d52)", `linear-gradient(135deg,${C.gc},#ddd)`];
  const si = { width: "100%", padding: "12px 16px", background: C.bh, border: `1px solid ${C.gmc}`, borderRadius: "3px", fontSize: "0.95rem", color: C.co, fontFamily: "'Inter',sans-serif", outline: "none", transition: "border-color 0.3s" };
  const sl = { display: "block", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: C.gm, marginBottom: "6px" };
  const btnFormConfig = { idle: { bg: C.co, texto: t.contacto.btnEnviar, icono: "arrow" }, enviando: { bg: C.gm, texto: t.contacto.enviando, icono: null }, enviado: { bg: "#4a7c59", texto: t.contacto.enviado, icono: "check" }, error: { bg: "#8c3a3a", texto: t.contacto.errorEnvio, icono: null } }[formEstado];

  return (
    <>
      <style>{css}</style>
      {lightboxAbierto && <Lightbox imagenes={GALERIA_COMPLETA} indice={lightboxIndice} onCerrar={cerrarLightbox} onAnterior={anteriorImg} onSiguiente={siguienteImg} textosDe={t.galeria.de} />}

      {/* ====== NAVEGACIÓN ====== */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "0 clamp(1.5rem,4vw,3rem)", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(246,246,244,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `1px solid ${C.gc}` }}>
        <div onClick={() => scrollHacia("inicio")} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 500, letterSpacing: "0.05em", color: C.co, cursor: "pointer" }}>Laura Cravioto</div>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <ul style={{ display: "flex", listStyle: "none", gap: "1.5rem", alignItems: "center" }} className="nd"><style>{`@media(max-width:960px){.nd{display:none!important}}`}</style>
            {Object.entries(t.nav).map(([k, l]) => <li key={k}><button onClick={() => scrollHacia(k)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", color: seccionActiva === k ? C.co : C.gm, borderBottom: seccionActiva === k ? `1.5px solid ${C.co}` : "1.5px solid transparent", paddingBottom: "4px", transition: "all 0.3s" }}>{l}</button></li>)}
          </ul>
          <div style={{ position: "relative" }}>
            <button onClick={() => setIdiomaAbierto(!idiomaAbierto)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: `1px solid ${C.gmc}`, borderRadius: "20px", padding: "6px 12px", cursor: "pointer", color: C.co, fontSize: "0.75rem", fontWeight: 500 }}><Icono tipo="globe" size={14} />{idioma.toUpperCase()}</button>
            {idiomaAbierto && <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "rgba(246,246,244,0.95)", backdropFilter: "blur(20px)", border: `1px solid ${C.gc}`, borderRadius: "12px", padding: "6px", minWidth: "80px", boxShadow: "0 8px 30px rgba(0,0,0,0.08)", animation: "fadeIn 0.2s" }}>{idiomas.map(l => <button key={l.c} onClick={() => { setIdioma(l.c); setIdiomaAbierto(false); }} style={{ display: "block", width: "100%", padding: "8px 14px", background: idioma === l.c ? C.gc : "transparent", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "0.8rem", fontWeight: idioma === l.c ? 500 : 400, color: C.co, textAlign: "left" }}>{l.e}</button>)}</div>}
          </div>
          <button onClick={() => setMenuAbierto(!menuAbierto)} className="bh" style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: C.co, padding: "4px" }}><style>{`@media(max-width:960px){.bh{display:block!important}}`}</style><Icono tipo={menuAbierto ? "close" : "menu"} size={24} /></button>
        </div>
      </nav>
      {menuAbierto && <div style={{ position: "fixed", top: "70px", left: 0, right: 0, bottom: 0, zIndex: 999, background: "rgba(246,246,244,0.97)", backdropFilter: "blur(30px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem", animation: "fadeIn 0.3s" }}>{Object.entries(t.nav).map(([k, l]) => <button key={k} onClick={() => scrollHacia(k)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 300, color: seccionActiva === k ? C.co : C.gm }}>{l}</button>)}</div>}

      {/* ====== HERO ====== */}
      <section ref={seccionesRef.inicio} style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: `linear-gradient(135deg,${C.co} 0%,#3a3d42 40%,#4a4d52 100%)` }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.15, background: "radial-gradient(ellipse at 20% 50%,rgba(199,201,204,0.4) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(227,228,230,0.3) 0%,transparent 40%)" }} />
        <div style={{ position: "absolute", width: "clamp(300px,50vw,600px)", height: "clamp(300px,50vw,600px)", borderRadius: "50%", border: "1px solid rgba(199,201,204,0.15)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", animation: "float 8s ease-in-out infinite" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 clamp(1.5rem,5vw,4rem)", maxWidth: "900px", animation: "fadeInUp 1.2s" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 300, color: C.bh, lineHeight: 1.05, marginBottom: "0.5rem" }}>{t.hero.titulo}</h1>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.1rem,2.5vw,1.6rem)", fontWeight: 300, fontStyle: "italic", color: C.gmc, marginBottom: "2rem" }}>{t.hero.subtitulo}</p>
          <div style={{ width: "60px", height: "1px", background: C.gmc, margin: "0 auto 2rem", opacity: 0.5 }} />
          <p style={{ fontSize: "clamp(0.9rem,1.2vw,1.05rem)", fontWeight: 300, color: C.gm, lineHeight: 1.7, maxWidth: "580px", margin: "0 auto 2.5rem", ...ep }}>{t.hero.descripcion}</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => scrollHacia("obra")} style={{ padding: "14px 32px", background: C.bh, color: C.co, border: "none", borderRadius: "2px", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>{t.hero.btnObra}</button>
            <button onClick={() => scrollHacia("talleres")} style={{ padding: "14px 32px", background: "transparent", color: C.bh, border: "1px solid rgba(246,246,244,0.3)", borderRadius: "2px", fontSize: "0.8rem", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>{t.hero.btnTalleres}</button>
          </div>
        </div>
      </section>

      {/* ====== STORYTELLING ====== */}
      <section ref={seccionesRef.storytelling} style={{ padding: "clamp(5rem,12vw,10rem) clamp(1.5rem,5vw,4rem)", background: `linear-gradient(180deg,${C.co} 0%,#3a3d42 100%)` }}>
        <div style={{ width: "1px", height: "60px", background: `linear-gradient(to bottom,transparent,${C.gmc})`, margin: "0 auto 3rem", opacity: 0.3 }} />
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: C.gm, marginBottom: "2rem", textAlign: "center" }}>{t.storytelling.etiqueta}</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 300, fontStyle: "italic", color: C.bh, lineHeight: 1.15, textAlign: "center", marginBottom: "3rem" }}>{t.storytelling.titulo}</h2>
          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.15rem,2vw,1.4rem)", fontWeight: 300, fontStyle: "italic", color: C.gmc, lineHeight: 1.8, marginBottom: "0.5rem" }}>{t.storytelling.epigrafe}</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.15rem,2vw,1.4rem)", fontWeight: 300, fontStyle: "italic", color: C.gmc, lineHeight: 1.8, marginBottom: "0.5rem" }}>{t.storytelling.epigrafe2}</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.15rem,2vw,1.4rem)", fontWeight: 400, color: C.bh, lineHeight: 1.8 }}>{t.storytelling.epigrafe3}</p>
          </div>
          <div style={{ width: "80px", height: "1px", background: C.gm, margin: "0 auto 3rem", opacity: 0.4 }} />
          <p style={{ fontSize: "1rem", fontWeight: 300, color: C.gmc, lineHeight: 1.9, marginBottom: "1.8rem", ...ep }}>{t.storytelling.parrafo1}</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 400, fontStyle: "italic", color: C.bh, lineHeight: 1.6, marginBottom: "1.8rem", textAlign: "center" }}>{t.storytelling.parrafo2}</p>
          <p style={{ fontSize: "1rem", fontWeight: 300, color: C.gmc, lineHeight: 1.9, marginBottom: "1.8rem", ...ep }}>{t.storytelling.parrafo3}</p>
          <p style={{ fontSize: "1rem", fontWeight: 300, color: C.gmc, lineHeight: 1.9, marginBottom: "1.8rem", ...ep }}>{t.storytelling.parrafo4}</p>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 400, fontStyle: "italic", color: C.bh, lineHeight: 1.6, marginBottom: "1.8rem", textAlign: "center" }}>{t.storytelling.parrafo5}</p>
          <p style={{ fontSize: "1rem", fontWeight: 300, color: C.gmc, lineHeight: 1.9, ...ep }}>{t.storytelling.parrafo6}</p>
        </div>
      </section>

      {/* ====== FILOSOFÍA ====== */}
      <section ref={seccionesRef.filosofia} style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", background: C.bh, maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gm, marginBottom: "1rem" }}>{t.statement.etiqueta}</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,4rem)", alignItems: "center" }} className="gf"><style>{`@media(max-width:768px){.gf{grid-template-columns:1fr!important}}`}</style>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: C.co, lineHeight: 1.15, marginBottom: "2rem" }}>{t.statement.titulo}</h2>
            <p style={{ fontSize: "1rem", fontWeight: 300, color: C.co, lineHeight: 1.8, marginBottom: "1.5rem", ...ep }}>{t.statement.parrafo1}</p>
            <p style={{ fontSize: "1rem", fontWeight: 300, color: C.gm, lineHeight: 1.8, marginBottom: "1.5rem", ...ep }}>{t.statement.parrafo2}</p>
            <p style={{ fontSize: "1rem", fontWeight: 300, color: C.co, lineHeight: 1.8, fontStyle: "italic", ...ep }}>{t.statement.parrafo3}</p>
          </div>
          <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: "4px", overflow: "hidden", background: `linear-gradient(145deg,${C.gc},${C.gmc})`, cursor: "pointer" }} onClick={() => abrirLightbox(0)}>
            <Img src={IMAGENES.taller.archivo} alt={IMAGENES.taller.alt} grad={`linear-gradient(145deg,${C.gc},${C.gmc})`}>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", color: C.gm }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", border: `2px solid ${C.gmc}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>◐</div>
                <p style={{ fontSize: "0.75rem", fontStyle: "italic" }}>{t.statement.caption}</p>
              </div>
            </Img>
            <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(47,48,51,0.5)", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", color: C.bh, zIndex: 2, opacity: 0.7 }}><Icono tipo="expand" size={16} /></div>
          </div>
        </div>
      </section>

      {/* ====== OBRA — 5 piezas principales (sin joyería) ====== */}
      <section ref={seccionesRef.obra} style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", background: C.bh }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gm, marginBottom: "1rem" }}>{t.proyectos.etiqueta}</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: C.co, lineHeight: 1.15, marginBottom: "0.8rem" }}>{t.proyectos.titulo}</h2>
          <p style={{ fontSize: "1rem", fontWeight: 300, color: C.gm, marginBottom: "3rem", maxWidth: "650px", ...ep }}>{t.proyectos.subtitulo}</p>
          {/* --- Grid masonry ajustado para 5 obras --- */}
          <div className="gm5" style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gridAutoRows: "minmax(160px,auto)", gap: "1rem" }}>
            <style>{`
              .gm5>.o0{grid-column:1/8;grid-row:1/3}.gm5>.o1{grid-column:8/13;grid-row:1/2}.gm5>.o2{grid-column:8/13;grid-row:2/3}
              .gm5>.o3{grid-column:1/7;grid-row:3/4}.gm5>.o4{grid-column:7/13;grid-row:3/4}
              @media(max-width:768px){.gm5>div[class^="o"]{grid-column:1/-1!important;grid-row:auto!important;min-height:260px!important}}
              .oc:hover .go{opacity:1!important}.oc:hover .gcc{transform:translateY(0)!important;opacity:1!important}
            `}</style>
            {t.proyectos.obras.map((obra, index) => (
              <div key={index} className={`oc o${index}`} onClick={() => abrirLightbox(index + 1)} style={{ position: "relative", borderRadius: "4px", overflow: "hidden", cursor: "pointer", background: go[index % go.length] }}>
                <Img src={IMAGENES.obras[index]?.archivo} alt={IMAGENES.obras[index]?.alt || obra.titulo} grad={go[index % go.length]}><div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", color: "rgba(246,246,244,0.2)" }}>◈</div></Img>
                <div className="go" style={{ position: "absolute", inset: 0, background: "rgba(47,48,51,0.55)", backdropFilter: "blur(12px)", opacity: 0, transition: "opacity 0.5s", zIndex: 2, display: "flex", alignItems: "flex-end", padding: "clamp(1.2rem,3vw,2rem)" }}>
                  <div className="gcc" style={{ transform: "translateY(10px)", opacity: 0, transition: "all 0.5s 0.1s" }}>
                    <p style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gmc, marginBottom: "6px" }}>{obra.categoria}</p>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.3rem,2.5vw,1.8rem)", fontWeight: 400, color: C.bh, marginBottom: "4px" }}>{obra.titulo}</h3>
                    <p style={{ fontSize: "0.85rem", color: C.gmc, fontWeight: 300 }}>{obra.año}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== GALERÍA — 15 imágenes (taller + 14 obras) ====== */}
      <section ref={seccionesRef.galeria} style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", background: C.gc }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gm, marginBottom: "1rem" }}>{t.galeria.etiqueta}</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: C.co, lineHeight: 1.15, marginBottom: "0.8rem" }}>{t.galeria.titulo}</h2>
          <p style={{ fontSize: "1rem", fontWeight: 300, color: C.gm, marginBottom: "3rem", maxWidth: "600px", ...ep }}>{t.galeria.subtitulo}</p>
          <div className="gg" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.8rem" }}>
            <style>{`@media(max-width:768px){.gg{grid-template-columns:repeat(2,1fr)!important}}.gt{position:relative;aspect-ratio:1;border-radius:6px;overflow:hidden;cursor:pointer;transition:transform 0.3s,box-shadow 0.3s}.gt:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,0,0,0.1)}.gt:first-child{grid-column:span 2;grid-row:span 2;aspect-ratio:auto}@media(max-width:768px){.gt:first-child{grid-column:span 2;grid-row:span 1;aspect-ratio:16/10}}.gt .gt-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(47,48,51,0.6) 0%,transparent 50%);opacity:0;transition:opacity 0.3s;z-index:2;display:flex;align-items:flex-end;padding:1rem}.gt:hover .gt-overlay{opacity:1}`}</style>
            {GALERIA_COMPLETA.map((img, i) => (
              <div key={i} className="gt" onClick={() => abrirLightbox(i)}>
                <Img src={img.archivo} alt={img.alt} grad={go[i % go.length]}><div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: C.gm, fontSize: "1.5rem" }}>◈</div></Img>
                <div className="gt-overlay"><div><p style={{ fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: C.gmc, marginBottom: "4px" }}>{img.categoria}</p><p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 400, color: C.bh }}>{img.titulo}</p></div></div>
                <div style={{ position: "absolute", top: "8px", right: "8px", background: "rgba(47,48,51,0.4)", borderRadius: "50%", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", color: C.bh, zIndex: 3, opacity: 0.6 }}><Icono tipo="expand" size={14} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          TALLERES — Con detalle de cursos debajo de las tarjetas
          ==================================================================== */}
      <section ref={seccionesRef.talleres} style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", background: C.bh, borderTop: `1px solid ${C.gc}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gm, marginBottom: "1rem" }}>{t.talleres.etiqueta}</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: C.co, lineHeight: 1.15, marginBottom: "0.8rem", maxWidth: "700px" }}>{t.talleres.titulo}</h2>
          <p style={{ fontSize: "1rem", fontWeight: 300, color: C.gm, marginBottom: "1.5rem", maxWidth: "650px", lineHeight: 1.7, ...ep }}>{t.talleres.subtitulo}</p>
          <p style={{ fontSize: "0.95rem", fontWeight: 300, color: C.co, marginBottom: "3rem", maxWidth: "650px", lineHeight: 1.8, ...ep }}>{t.talleres.descripcion}</p>

          {/* --- 3 Tarjetas de talleres --- */}
          <div className="gtl" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", marginBottom: "2.5rem" }}>
            <style>{`@media(max-width:900px){.gtl{grid-template-columns:1fr!important}}`}</style>
            {t.talleres.items.map((tl, i) => (
              <div key={i} style={{ padding: "2rem", background: C.gc, borderRadius: "6px", border: `1px solid rgba(199,201,204,0.3)`, transition: "all 0.3s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "1rem", color: C.gm }}><Icono tipo="clock" size={14} /><span style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>{tl.duracion}</span></div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 500, color: C.co, marginBottom: "0.8rem" }}>{tl.titulo}</h3>
                <p style={{ fontSize: "0.9rem", fontWeight: 300, color: C.gm, lineHeight: 1.6, ...ep }}>{tl.desc}</p>
              </div>
            ))}
          </div>

          {/* ====== NUEVO: Detalle de cursos — Panel informativo ====== */}
          <div style={{ background: C.gc, borderRadius: "8px", padding: "clamp(1.5rem,4vw,2.5rem)", marginBottom: "3rem", border: `1px solid ${C.gmc}` }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.4rem,3vw,1.8rem)", fontWeight: 400, color: C.co, marginBottom: "1.5rem", borderBottom: `1px solid ${C.gmc}`, paddingBottom: "1rem" }}>{t.talleres.detalleTitulo}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }} className="gdt">
              <style>{`@media(max-width:768px){.gdt{grid-template-columns:1fr!important}}`}</style>
              {t.talleres.detalleItems.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                  <div style={{ minWidth: "6px", width: "6px", height: "6px", borderRadius: "50%", background: C.gm, marginTop: "8px" }} />
                  <div>
                    <p style={{ fontSize: "0.85rem", fontWeight: 500, color: C.co, marginBottom: "4px" }}>{item.titulo}</p>
                    <p style={{ fontSize: "0.85rem", fontWeight: 300, color: C.gm, lineHeight: 1.6, ...ep }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- Galería de talleres: 7 fotos reales --- */}
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gm, marginBottom: "1rem" }}>{t.talleres.galeriaTitulo}</p>
          <div className="ggt" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.8rem", marginBottom: "3rem" }}>
            <style>{`@media(max-width:600px){.ggt{grid-template-columns:repeat(2,1fr)!important}}`}</style>
            {IMAGENES.talleres.map((img, i) => (
              <div key={i} style={{ aspectRatio: "1", borderRadius: "4px", overflow: "hidden", background: `linear-gradient(${45 + i * 30}deg,${C.gc},${C.gmc})` }}>
                <Img src={img.archivo} alt={img.alt} grad={`linear-gradient(${45 + i * 30}deg,${C.gc},${C.gmc})`}>
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: C.gm, fontSize: "1.5rem", opacity: 0.7 }}>◌</div>
                </Img>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button onClick={() => scrollHacia("contacto")} style={{ padding: "14px 32px", background: C.co, color: C.bh, border: "none", borderRadius: "2px", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>{t.talleres.btnInscribirse} <Icono tipo="arrow" size={16} /></button>
            <button onClick={() => scrollHacia("contacto")} style={{ padding: "14px 32px", background: "transparent", color: C.co, border: `1px solid ${C.gmc}`, borderRadius: "2px", fontSize: "0.8rem", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>{t.talleres.btnFechas}</button>
          </div>
        </div>
      </section>

      {/* ====== CONTACTO ====== */}
      <section ref={seccionesRef.contacto} style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", background: C.gc }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gm, marginBottom: "3rem" }}>{t.contacto.etiqueta}</p>
          <div className="gcn" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,5rem)" }}>
            <style>{`@media(max-width:768px){.gcn{grid-template-columns:1fr!important}}`}</style>
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 300, color: C.co, lineHeight: 1.15, marginBottom: "2rem" }}>{t.contacto.tituloBio}</h2>
              <p style={{ fontSize: "0.95rem", fontWeight: 300, color: C.co, lineHeight: 1.8, marginBottom: "1.5rem", ...ep }}>{t.contacto.bio1}</p>
              <p style={{ fontSize: "0.95rem", fontWeight: 300, color: C.gm, lineHeight: 1.8, marginBottom: "2.5rem", ...ep }}>{t.contacto.bio2}</p>
              <div>
                <p style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: C.gm, marginBottom: "1rem" }}>Social</p>
                <div style={{ display: "flex", gap: "1rem" }}>
                  {REDES_SOCIALES.map(r => <a key={r.tipo} href={r.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "50%", border: `1px solid ${C.gmc}`, color: C.co, textDecoration: "none", transition: "all 0.3s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = C.co; e.currentTarget.style.color = C.bh; e.currentTarget.style.borderColor = C.co; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.co; e.currentTarget.style.borderColor = C.gmc; }}><Icono tipo={r.tipo} size={18} /></a>)}
                </div>
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 400, color: C.co, marginBottom: "0.5rem" }}>{t.contacto.tituloForm}</h3>
              <p style={{ fontSize: "0.9rem", fontWeight: 300, color: C.gm, lineHeight: 1.6, marginBottom: "2rem", ...ep }}>{t.contacto.formDesc}</p>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1.2rem" }}><label style={sl}>{t.contacto.nombre}</label><input type="text" required value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} style={si} onFocus={e => e.target.style.borderColor = C.gm} onBlur={e => e.target.style.borderColor = C.gmc} disabled={formEstado === "enviando"} /></div>
                <div style={{ marginBottom: "1.2rem" }}><label style={sl}>{t.contacto.email}</label><input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={si} onFocus={e => e.target.style.borderColor = C.gm} onBlur={e => e.target.style.borderColor = C.gmc} disabled={formEstado === "enviando"} /></div>
                <div style={{ marginBottom: "1.2rem" }}><label style={sl}>{t.contacto.asunto}</label><select required value={formData.asunto} onChange={e => setFormData({ ...formData, asunto: e.target.value })} style={{ ...si, cursor: "pointer", appearance: "none" }} onFocus={e => e.target.style.borderColor = C.gm} onBlur={e => e.target.style.borderColor = C.gmc} disabled={formEstado === "enviando"}><option value="">—</option>{t.contacto.asuntoOpciones.map((o, i) => <option key={i} value={o}>{o}</option>)}</select></div>
                <div style={{ marginBottom: "1.5rem" }}><label style={sl}>{t.contacto.mensaje}</label><textarea required rows={5} value={formData.mensaje} onChange={e => setFormData({ ...formData, mensaje: e.target.value })} style={{ ...si, resize: "vertical" }} onFocus={e => e.target.style.borderColor = C.gm} onBlur={e => e.target.style.borderColor = C.gmc} disabled={formEstado === "enviando"} /></div>
                <button type="submit" disabled={formEstado === "enviando"} style={{ width: "100%", padding: "14px 32px", background: btnFormConfig.bg, color: C.bh, border: "none", borderRadius: "3px", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", cursor: formEstado === "enviando" ? "wait" : "pointer", transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", animation: formEstado === "enviando" ? "pulse 1.5s infinite" : "none" }}>
                  {btnFormConfig.texto}{btnFormConfig.icono && <Icono tipo={btnFormConfig.icono} size={16} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ padding: "2rem clamp(1.5rem,5vw,4rem)", background: C.co, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 400, color: C.gmc }}>Laura Cravioto</p>
        <p style={{ fontSize: "0.75rem", fontWeight: 300, color: C.gm }}>© {new Date().getFullYear()} — {t.contacto.derechos}</p>
      </footer>
    </>
  );
}
