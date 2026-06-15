
/* ============================================================================
   LAURA CRAVIOTO — PORTAFOLIO WEB (v3.3)
   Escultura e investigación en vidrio
   
   v3.3 Cambios:
   - Redes sociales actualizadas: Instagram, Facebook, TikTok (nuevo ícono)
   - Formulario integrado con Formspree (envía a atmanwolf@gmail.com)
   - El correo de Laura NO se expone en el código visible al usuario
   - Botón "Inscribirse" ahora lleva al formulario de contacto
   
   CONFIGURACIÓN FORMSPREE (PASO ÚNICO):
   1. Ve a https://formspree.io y crea una cuenta gratuita
   2. Crea un nuevo formulario y usa el email: atmanwolf@gmail.com
   3. Formspree te dará un ID (ejemplo: "xyzabcde")
   4. Reemplaza "TU_ID_AQUI" en la constante FORMSPREE_ID de abajo
   5. ¡Listo! Los formularios llegarán al correo sin exponerlo
   ============================================================================ */

import React, { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================================
   BLOQUE 0: CONFIGURACIÓN CENTRAL
   ============================================================================ */

/* --- Formspree: reemplaza TU_ID_AQUI con tu ID real --- */
const FORMSPREE_ID = "xaqzvwnq";
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

/* --- Imágenes --- */
const IMAGENES = {
  portada: { archivo: "/Galeria/1_Portada/hero-bg.jpg", alt: "Escultura de vidrio" },
  taller: { archivo: "/Galeria/2_Filosofia/1 Laura - Taller.jpg", alt: "Laura Cravioto trabajando vidrio a la flama en su taller" },
  obras: [
    { archivo: "/Galeria/3_Obra/Laura - Arte 4.jpeg", alt: "Instalación escultórica de múltiples piezas orgánicas de vidrio" },
    { archivo: "/Galeria/3_Obra/Laura - Arte 2.jpeg", alt: "Escultura orgánica de vidrio en tonos ámbar y verde" },
    { archivo: "/Galeria/3_Obra/Laura - Arte 3.jpeg", alt: "Escultura de vidrio multicolor con formas orgánicas fluidas" },
    { archivo: "/Galeria/3_Obra/Laura - Arte 1.jpeg", alt: "Escultura geométrica de tubos de vidrio transparente" },
    { archivo: "/Galeria/3_Obra/Laura - Arte 5.jpeg", alt: "Forma ovoide minimalista de vidrio soplado" },
    { archivo: "/Galeria/3_Obra/Laura - Arte 1 - gargantilla 1.jpg", alt: "Gargantilla escultórica de vidrio azul cobalto" },
    { archivo: "/Galeria/3_Obra/Laura - Arte - Aretes 1.jpg", alt: "Aretes de vidrio verde translúcido" },
  ],
  talleres: [
    { archivo: "/Galeria/4_Talleres/taller-1.jpg", alt: "Momento en el taller" },
    { archivo: "/Galeria/4_Talleres/taller-2.jpg", alt: "Estudiantes trabajando" },
    { archivo: "/Galeria/4_Talleres/taller-3.jpg", alt: "Herramientas del taller" },
    { archivo: "/Galeria/4_Talleres/taller-4.jpg", alt: "Resultados de alumnos" },
  ],
};

/* --- Galería completa para lightbox --- */
const GALERIA_COMPLETA = [
  { archivo: IMAGENES.taller.archivo, alt: IMAGENES.taller.alt, titulo: "En el taller", categoria: "Proceso" },
  ...IMAGENES.obras.map((img, i) => ({
    archivo: img.archivo, alt: img.alt,
    titulo: ["Ecosistema", "Simbiosis I", "Simbiosis II", "Tensiones Estructurales", "Memoria del Humo", "Coral Azul", "Círculos de Luz"][i],
    categoria: ["Instalación", "Escultura", "Escultura", "Vidrio y metal", "Vidrio soplado", "Joyería", "Joyería"][i],
  })),
];

/* --- Redes Sociales: links actualizados con TikTok --- */
const REDES_SOCIALES = [
  { tipo: "instagram", url: "https://www.instagram.com/laura_cravioto_ep?igsh=dm1rdWRmNHJzaGxm&utm_source=qr" },
  { tipo: "facebook", url: "https://www.facebook.com/share/1Dr79r5XuS/?mibextid=wwXIfr" },
  { tipo: "tiktok", url: "https://www.tiktok.com/@laura.cravioto.jo?_r=1&_t=ZS-97BCMu3t3w4" },
];

/* ============================================================================
   BLOQUE 0.1: INTERNACIONALIZACIÓN (i18n)
   ============================================================================ */
const translations = {
  es: {
    nav: { inicio: "Inicio", storytelling: "Historia", filosofia: "Filosofía", obra: "Obra", galeria: "Galería", talleres: "Talleres", contacto: "Contacto" },
    hero: { titulo: "Laura Cravioto", subtitulo: "Escultura e investigación en vidrio", descripcion: "El vidrio como territorio de exploración donde la materia se transforma, muta y respira con la luz.", btnObra: "Explorar Obra", btnTalleres: "Talleres a la Flama" },
    storytelling: { etiqueta: "Storytelling", titulo: "El instante líquido", epigrafe: "Hay un instante —apenas un segundo— en que el vidrio deja de ser sólido y aún no es líquido.", epigrafe2: "Un instante donde la materia suspende sus propias reglas.", epigrafe3: "Laura Cravioto trabaja exactamente ahí.", parrafo1: "En un taller del barrio mágico de Jalatlaco, en la ciudad de Oaxaca, donde el silencio solo lo rompe el rugido de la flama, una varilla de vidrio gira entre sus dedos. El calor la envuelve. El material responde: se estira, se curva, burbujea, respira. No hay boceto que sobreviva intacto a ese diálogo. Porque el vidrio no obedece — negocia.", parrafo2: "Y Laura aprendió a escucharlo.", parrafo3: "Su camino no comenzó en una academia ni en un horno. Comenzó con una pregunta que todavía no termina de responder: ¿qué ocurre cuando dejamos de imponer forma a la materia y empezamos a conversar con ella?", parrafo4: "Esa pregunta la llevó del dibujo a la pintura, de la pintura a la escultura, de la escultura a la instalación. Cada disciplina fue un idioma nuevo para formular la misma obsesión: entender cómo crece, muta y se transforma lo vivo.", parrafo5: "Hasta que encontró el vidrio.", parrafo6: "Un material que guarda la luz dentro de sí. Que recuerda cada gesto del fuego. Que puede parecer frágil y ser inquebrantable." },
    statement: { etiqueta: "Filosofía", titulo: "La materia como organismo vivo", parrafo1: "Mi trabajo se desarrolla principalmente a través del vidrio, material que utilizo como un medio de investigación formal, técnica y conceptual.", parrafo2: "A través de la escultura, la instalación y la intervención espacial, construyo formas orgánicas y abstractas que evocan procesos de crecimiento, mutación, adaptación y permanencia.", parrafo3: "Gran parte de mi trabajo surge de cruces entre las artes, las ciencias y los procesos naturales. El vidrio se ha convertido en el vehículo principal de esta búsqueda.", caption: "En el taller, trabajando a la flama" },
    proyectos: { etiqueta: "Obra", titulo: "Proyectos Destacados", subtitulo: "Escultura, instalación, joyería escultórica e intervención espacial.", obras: [{ titulo: "Ecosistema", año: "2024", categoria: "Instalación escultórica" }, { titulo: "Simbiosis I", año: "2024", categoria: "Escultura en vidrio a la flama" }, { titulo: "Simbiosis II", año: "2024", categoria: "Escultura en vidrio a la flama" }, { titulo: "Tensiones Estructurales", año: "2023", categoria: "Escultura en vidrio y metal" }, { titulo: "Memoria del Humo", año: "2023", categoria: "Vidrio soplado" }, { titulo: "Coral Azul", año: "2024", categoria: "Joyería escultórica" }, { titulo: "Círculos de Luz", año: "2024", categoria: "Joyería en vidrio lampwork" }] },
    galeria: { etiqueta: "Galería", titulo: "Universo Visual", subtitulo: "Un recorrido por el proceso, la materia y las piezas terminadas. Haz clic en cualquier imagen para ampliarla.", cerrar: "Cerrar", de: "de" },
    talleres: { etiqueta: "Talleres", titulo: "El Laboratorio de Vidrio", subtitulo: "La pedagogía como extensión fundamental de la labor artística.", descripcion: "Los talleres de vidrio a la flama son un espacio de experimentación guiada donde cada participante descubre su propio diálogo con la materia.", items: [{ titulo: "Iniciación a la Flama", desc: "Técnicas fundamentales de vidrio lampwork. Sin experiencia previa.", duracion: "8 sesiones" }, { titulo: "Escultura Experimental", desc: "Exploración formal avanzada.", duracion: "12 sesiones" }, { titulo: "Taller Intensivo", desc: "Inmersión completa de fin de semana.", duracion: "2 días" }], btnInscribirse: "Inscribirse", btnFechas: "Ver próximas fechas", galeriaTitulo: "Momentos en el taller" },
    contacto: { etiqueta: "Contacto", tituloBio: "Biografía", bio1: "Laura Cravioto es una artista mexicana cuya práctica se centra en el vidrio como medio de investigación y expresión. Su formación ha sido autodidacta, construida a partir de la experimentación constante.", bio2: "Actualmente combina la producción artística con la impartición de talleres de vidrio a la flama, considerando la pedagogía una extensión fundamental de su labor.", tituloForm: "Colaboraciones y Consultas", formDesc: "¿Interesado en adquirir obra, inscribirte a un taller o conocer más? Escríbeme.", nombre: "Nombre", email: "Correo electrónico", asunto: "Asunto", asuntoOpciones: ["Adquisición de obra", "Colaboración artística", "Inscripción a taller", "Información de talleres", "Joyería artística", "Otro"], mensaje: "Mensaje", btnEnviar: "Enviar mensaje", enviando: "Enviando...", enviado: "¡Mensaje enviado!", errorEnvio: "Error al enviar. Intenta de nuevo.", derechos: "Todos los derechos reservados." },
  },
  en: {
    nav: { inicio: "Home", storytelling: "Story", filosofia: "Philosophy", obra: "Work", galeria: "Gallery", talleres: "Workshops", contacto: "Contact" },
    hero: { titulo: "Laura Cravioto", subtitulo: "Glass sculpture & research", descripcion: "Glass as a territory of exploration where matter transforms, mutates, and breathes with light.", btnObra: "Explore Work", btnTalleres: "Flamework Workshops" },
    storytelling: { etiqueta: "Storytelling", titulo: "The Liquid Instant", epigrafe: "There is an instant —barely a second— when glass ceases to be solid and is not yet liquid.", epigrafe2: "An instant where matter suspends its own rules.", epigrafe3: "Laura Cravioto works exactly there.", parrafo1: "In a studio in Jalatlaco, Oaxaca, where silence is only broken by the roar of the flame, a glass rod spins between her fingers. The material responds: it stretches, curves, bubbles, breathes. Because glass does not obey — it negotiates.", parrafo2: "And Laura learned to listen.", parrafo3: "Her path began with a question she still hasn't finished answering: what happens when we stop imposing form on matter and begin to converse with it?", parrafo4: "That question led her from drawing to painting, from painting to sculpture, from sculpture to installation.", parrafo5: "Until she found glass.", parrafo6: "A material that holds light within itself. That remembers every gesture of fire. That can appear fragile and be unbreakable." },
    statement: { etiqueta: "Philosophy", titulo: "Matter as a living organism", parrafo1: "My work unfolds primarily through glass, a material I use as a medium for formal, technical, and conceptual research.", parrafo2: "Through sculpture, installation, and spatial intervention, I construct organic and abstract forms that evoke processes of growth, mutation, adaptation, and permanence.", parrafo3: "Much of my work arises from intersections between the arts, sciences, and natural processes.", caption: "In the studio, working at the flame" },
    proyectos: { etiqueta: "Work", titulo: "Featured Projects", subtitulo: "Sculpture, installation, sculptural jewelry, and spatial intervention.", obras: [{ titulo: "Ecosystem", año: "2024", categoria: "Sculptural installation" }, { titulo: "Symbiosis I", año: "2024", categoria: "Flamework glass sculpture" }, { titulo: "Symbiosis II", año: "2024", categoria: "Flamework glass sculpture" }, { titulo: "Structural Tensions", año: "2023", categoria: "Glass & metal sculpture" }, { titulo: "Memory of Smoke", año: "2023", categoria: "Blown glass" }, { titulo: "Blue Coral", año: "2024", categoria: "Sculptural jewelry" }, { titulo: "Circles of Light", año: "2024", categoria: "Lampwork glass jewelry" }] },
    galeria: { etiqueta: "Gallery", titulo: "Visual Universe", subtitulo: "A journey through process, material, and finished pieces. Click any image to enlarge.", cerrar: "Close", de: "of" },
    talleres: { etiqueta: "Workshops", titulo: "The Glass Laboratory", subtitulo: "Pedagogy as a fundamental extension of artistic practice.", descripcion: "Flamework workshops are a space for guided experimentation.", items: [{ titulo: "Flame Introduction", desc: "Fundamental lampwork techniques.", duracion: "8 sessions" }, { titulo: "Experimental Sculpture", desc: "Advanced formal exploration.", duracion: "12 sessions" }, { titulo: "Intensive Workshop", desc: "Full weekend immersion.", duracion: "2 days" }], btnInscribirse: "Enroll", btnFechas: "See upcoming dates", galeriaTitulo: "Workshop moments" },
    contacto: { etiqueta: "Contact", tituloBio: "Biography", bio1: "Laura Cravioto is a Mexican artist whose practice centers on glass as a medium for research and expression.", bio2: "She currently combines artistic production with teaching flamework workshops.", tituloForm: "Collaborations & Inquiries", formDesc: "Interested in acquiring a piece, enrolling in a workshop, or learning more? Write to me.", nombre: "Name", email: "Email", asunto: "Subject", asuntoOpciones: ["Artwork acquisition", "Artistic collaboration", "Workshop enrollment", "Workshop information", "Artistic jewelry", "Other"], mensaje: "Message", btnEnviar: "Send message", enviando: "Sending...", enviado: "Message sent!", errorEnvio: "Error sending. Try again.", derechos: "All rights reserved." },
  },
  it: {
    nav: { inicio: "Home", storytelling: "Storia", filosofia: "Filosofia", obra: "Opera", galeria: "Galleria", talleres: "Laboratori", contacto: "Contatto" },
    hero: { titulo: "Laura Cravioto", subtitulo: "Scultura e ricerca nel vetro", descripcion: "Il vetro come territorio di esplorazione.", btnObra: "Esplorare l'Opera", btnTalleres: "Laboratori alla Fiamma" },
    storytelling: { etiqueta: "Storytelling", titulo: "L'istante liquido", epigrafe: "C'è un istante in cui il vetro smette di essere solido e non è ancora liquido.", epigrafe2: "Un istante in cui la materia sospende le proprie regole.", epigrafe3: "Laura Cravioto lavora esattamente lì.", parrafo1: "In un laboratorio a Jalatlaco, Oaxaca, una bacchetta di vetro gira tra le sue dita. Il materiale risponde.", parrafo2: "E Laura ha imparato ad ascoltarlo.", parrafo3: "Il suo percorso è iniziato con una domanda: cosa succede quando iniziamo a conversare con la materia?", parrafo4: "Quella domanda l'ha portata dal disegno alla scultura, dalla scultura all'installazione.", parrafo5: "Fino a quando ha trovato il vetro.", parrafo6: "Un materiale che custodisce la luce dentro di sé." },
    statement: { etiqueta: "Filosofia", titulo: "La materia come organismo vivente", parrafo1: "Il mio lavoro si sviluppa attraverso il vetro come mezzo di ricerca.", parrafo2: "Costruisco forme organiche che evocano processi di crescita e mutazione.", parrafo3: "Il vetro è diventato il veicolo principale di questa ricerca.", caption: "Nel laboratorio, alla fiamma" },
    proyectos: { etiqueta: "Opera", titulo: "Progetti in Evidenza", subtitulo: "Scultura, installazione e gioielleria scultorea.", obras: [{ titulo: "Ecosistema", año: "2024", categoria: "Installazione" }, { titulo: "Simbiosi I", año: "2024", categoria: "Scultura in vetro" }, { titulo: "Simbiosi II", año: "2024", categoria: "Scultura in vetro" }, { titulo: "Tensioni Strutturali", año: "2023", categoria: "Vetro e metallo" }, { titulo: "Memoria del Fumo", año: "2023", categoria: "Vetro soffiato" }, { titulo: "Corallo Blu", año: "2024", categoria: "Gioielleria" }, { titulo: "Cerchi di Luce", año: "2024", categoria: "Gioielli lampwork" }] },
    galeria: { etiqueta: "Galleria", titulo: "Universo Visivo", subtitulo: "Clicca per ingrandire.", cerrar: "Chiudi", de: "di" },
    talleres: { etiqueta: "Laboratori", titulo: "Il Laboratorio del Vetro", subtitulo: "La pedagogia come estensione della pratica artistica.", descripcion: "Laboratori di sperimentazione guidata.", items: [{ titulo: "Iniziazione alla Fiamma", desc: "Tecniche fondamentali.", duracion: "8 sessioni" }, { titulo: "Scultura Sperimentale", desc: "Esplorazione avanzata.", duracion: "12 sessioni" }, { titulo: "Laboratorio Intensivo", desc: "Immersione nel fine settimana.", duracion: "2 giorni" }], btnInscribirse: "Iscriversi", btnFechas: "Vedi date", galeriaTitulo: "Momenti nel laboratorio" },
    contacto: { etiqueta: "Contatto", tituloBio: "Biografia", bio1: "Laura Cravioto è un'artista messicana specializzata nel vetro.", bio2: "Combina produzione artistica con laboratori alla fiamma.", tituloForm: "Collaborazioni", formDesc: "Interessato? Scrivimi.", nombre: "Nome", email: "Email", asunto: "Oggetto", asuntoOpciones: ["Acquisizione", "Collaborazione", "Iscrizione laboratorio", "Info laboratori", "Gioielleria", "Altro"], mensaje: "Messaggio", btnEnviar: "Invia", enviando: "Invio...", enviado: "Inviato!", errorEnvio: "Errore. Riprova.", derechos: "Tutti i diritti riservati." },
  },
  fr: {
    nav: { inicio: "Accueil", storytelling: "Histoire", filosofia: "Philosophie", obra: "Œuvres", galeria: "Galerie", talleres: "Ateliers", contacto: "Contact" },
    hero: { titulo: "Laura Cravioto", subtitulo: "Sculpture et recherche en verre", descripcion: "Le verre comme territoire d'exploration.", btnObra: "Explorer l'Œuvre", btnTalleres: "Ateliers à la Flamme" },
    storytelling: { etiqueta: "Storytelling", titulo: "L'instant liquide", epigrafe: "Il y a un instant où le verre cesse d'être solide et n'est pas encore liquide.", epigrafe2: "Un instant où la matière suspend ses propres règles.", epigrafe3: "Laura Cravioto travaille exactement là.", parrafo1: "Dans un atelier à Jalatlaco, Oaxaca, une baguette de verre tourne entre ses doigts. Le matériau répond.", parrafo2: "Et Laura a appris à l'écouter.", parrafo3: "Son chemin a commencé par une question : que se passe-t-il quand on commence à converser avec la matière ?", parrafo4: "Cette question l'a menée du dessin à la sculpture, de la sculpture à l'installation.", parrafo5: "Jusqu'à ce qu'elle trouve le verre.", parrafo6: "Un matériau qui garde la lumière en lui." },
    statement: { etiqueta: "Philosophie", titulo: "La matière comme organisme vivant", parrafo1: "Mon travail se développe à travers le verre comme moyen de recherche.", parrafo2: "Je construis des formes organiques évoquant croissance et mutation.", parrafo3: "Le verre est devenu le véhicule principal de cette quête.", caption: "Dans l'atelier, à la flamme" },
    proyectos: { etiqueta: "Œuvres", titulo: "Projets en Vedette", subtitulo: "Sculpture, installation et bijoux sculpturaux.", obras: [{ titulo: "Écosystème", año: "2024", categoria: "Installation" }, { titulo: "Symbiose I", año: "2024", categoria: "Sculpture en verre" }, { titulo: "Symbiose II", año: "2024", categoria: "Sculpture en verre" }, { titulo: "Tensions Structurelles", año: "2023", categoria: "Verre et métal" }, { titulo: "Mémoire de Fumée", año: "2023", categoria: "Verre soufflé" }, { titulo: "Corail Bleu", año: "2024", categoria: "Bijou sculptural" }, { titulo: "Cercles de Lumière", año: "2024", categoria: "Bijoux lampwork" }] },
    galeria: { etiqueta: "Galerie", titulo: "Univers Visuel", subtitulo: "Cliquez pour agrandir.", cerrar: "Fermer", de: "de" },
    talleres: { etiqueta: "Ateliers", titulo: "Le Laboratoire de Verre", subtitulo: "La pédagogie comme extension de la pratique artistique.", descripcion: "Ateliers d'expérimentation guidée.", items: [{ titulo: "Initiation à la Flamme", desc: "Techniques fondamentales.", duracion: "8 séances" }, { titulo: "Sculpture Expérimentale", desc: "Exploration avancée.", duracion: "12 séances" }, { titulo: "Atelier Intensif", desc: "Immersion le week-end.", duracion: "2 jours" }], btnInscribirse: "S'inscrire", btnFechas: "Voir dates", galeriaTitulo: "Moments dans l'atelier" },
    contacto: { etiqueta: "Contact", tituloBio: "Biographie", bio1: "Laura Cravioto est une artiste mexicaine spécialisée dans le verre.", bio2: "Elle combine production artistique et enseignement.", tituloForm: "Collaborations", formDesc: "Intéressé ? Écrivez-moi.", nombre: "Nom", email: "Email", asunto: "Sujet", asuntoOpciones: ["Acquisition", "Collaboration", "Inscription atelier", "Info ateliers", "Bijoux", "Autre"], mensaje: "Message", btnEnviar: "Envoyer", enviando: "Envoi...", enviado: "Envoyé !", errorEnvio: "Erreur. Réessayez.", derechos: "Tous droits réservés." },
  },
};

/* ============================================================================
   BLOQUE 0.2: PALETA DE COLORES
   ============================================================================ */
const C = { bh: "#F6F6F4", gc: "#E3E4E6", gmc: "#C7C9CC", gm: "#8E9096", co: "#2F3033" };

/* ============================================================================
   BLOQUE 0.3: COMPONENTE DE ÍCONO SVG
   Incluye nuevo ícono de TikTok
   ============================================================================ */
const Icono = ({ tipo, size = 20 }) => {
  const i = {
    instagram: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>,
    facebook: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    /* --- NUEVO: Ícono de TikTok --- */
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
  };
  return i[tipo] || null;
};

/* ============================================================================
   BLOQUE 0.4: IMAGEN CON FALLBACK
   ============================================================================ */
const Img = ({ src, alt, grad, children }) => {
  const [err, setErr] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: grad }}>
      {!err && <img src={src} alt={alt} onError={() => setErr(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }} />}
      {(err || !src) && children}
    </div>
  );
};

/* ============================================================================
   BLOQUE 0.5: COMPONENTE LIGHTBOX
   ============================================================================ */
const Lightbox = ({ imagenes, indice, onCerrar, onAnterior, onSiguiente, textosDe }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onCerrar(); if (e.key === "ArrowLeft") onAnterior(); if (e.key === "ArrowRight") onSiguiente(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handleKey); };
  }, [onCerrar, onAnterior, onSiguiente]);
  const img = imagenes[indice];
  return (
    <div onClick={onCerrar} style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeIn 0.3s" }}>
      <button onClick={onCerrar} style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: C.gmc, cursor: "pointer", zIndex: 10, padding: "8px" }}><Icono tipo="close" size={28} /></button>
      <button onClick={(e) => { e.stopPropagation(); onAnterior(); }} style={{ position: "absolute", left: "clamp(0.5rem,2vw,2rem)", background: "rgba(255,255,255,0.08)", border: "none", color: C.bh, cursor: "pointer", borderRadius: "50%", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}><Icono tipo="chevronL" size={24} /></button>
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "85vw", maxHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <img src={img.archivo} alt={img.alt} style={{ maxWidth: "85vw", maxHeight: "72vh", objectFit: "contain", borderRadius: "4px", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }} />
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 400, color: C.bh, marginBottom: "4px" }}>{img.titulo}</p>
          <p style={{ fontSize: "0.75rem", color: C.gm, letterSpacing: "0.1em", textTransform: "uppercase" }}>{img.categoria} — {indice + 1} {textosDe} {imagenes.length}</p>
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onSiguiente(); }} style={{ position: "absolute", right: "clamp(0.5rem,2vw,2rem)", background: "rgba(255,255,255,0.08)", border: "none", color: C.bh, cursor: "pointer", borderRadius: "50%", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}><Icono tipo="chevronR" size={24} /></button>
    </div>
  );
};

/* ============================================================================
   COMPONENTE PRINCIPAL: App
   ============================================================================ */
export default function App() {
  const [idioma, setIdioma] = useState("es");
  const t = translations[idioma];
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [idiomaAbierto, setIdiomaAbierto] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState("inicio");
  const [formData, setFormData] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  /* --- Estados del formulario con Formspree --- */
  const [formEstado, setFormEstado] = useState("idle"); // idle | enviando | enviado | error

  const [lightboxAbierto, setLightboxAbierto] = useState(false);
  const [lightboxIndice, setLightboxIndice] = useState(0);
  const abrirLightbox = (i) => { setLightboxIndice(i); setLightboxAbierto(true); };
  const cerrarLightbox = useCallback(() => setLightboxAbierto(false), []);
  const anteriorImg = useCallback(() => setLightboxIndice((p) => (p - 1 + GALERIA_COMPLETA.length) % GALERIA_COMPLETA.length), []);
  const siguienteImg = useCallback(() => setLightboxIndice((p) => (p + 1) % GALERIA_COMPLETA.length), []);

  const seccionesRef = { inicio: useRef(null), storytelling: useRef(null), filosofia: useRef(null), obra: useRef(null), galeria: useRef(null), talleres: useRef(null), contacto: useRef(null) };

  useEffect(() => {
    const h = () => { const s = window.scrollY + 120; const secs = ["inicio", "storytelling", "filosofia", "obra", "galeria", "talleres", "contacto"]; for (let i = secs.length - 1; i >= 0; i--) { const r = seccionesRef[secs[i]]; if (r.current && r.current.offsetTop <= s) { setSeccionActiva(secs[i]); break; } } };
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollHacia = (s) => { setMenuAbierto(false); seccionesRef[s]?.current?.scrollIntoView({ behavior: "smooth" }); };

  /* --- Función: Envío de formulario vía Formspree --- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormEstado("enviando");
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          asunto: formData.asunto,
          mensaje: formData.mensaje,
          _subject: `[Web Laura Cravioto] ${formData.asunto}`,
        }),
      });
      if (response.ok) {
        setFormEstado("enviado");
        setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
        setTimeout(() => setFormEstado("idle"), 4000);
      } else { setFormEstado("error"); setTimeout(() => setFormEstado("idle"), 4000); }
    } catch { setFormEstado("error"); setTimeout(() => setFormEstado("idle"), 4000); }
  };

  const idiomas = [{ c: "es", e: "ES" }, { c: "en", e: "EN" }, { c: "it", e: "IT" }, { c: "fr", e: "FR" }];
  const ep = { textAlign: "justify", textJustify: "inter-word" };
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');
    *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
    html{scroll-behavior:smooth;font-size:16px}
    body{font-family:'Inter',-apple-system,sans-serif;color:${C.co};background:${C.bh};-webkit-font-smoothing:antialiased;overflow-x:hidden}
    @keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
    ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:${C.bh}}::-webkit-scrollbar-thumb{background:${C.gmc};border-radius:3px}
    @media(max-width:768px){html{font-size:14px}}
  `;
  const go = ["linear-gradient(135deg,#3a3d42,#55585e)", `linear-gradient(135deg,${C.gmc},${C.gm})`, "linear-gradient(135deg,#4a4d52,#6a6d72)", `linear-gradient(145deg,${C.gc},${C.gmc})`, "linear-gradient(135deg,#5a5d62,#3a3d42)", "linear-gradient(160deg,#2F3033,#4a4d52)", `linear-gradient(135deg,${C.gc},#ddd)`];
  const si = { width: "100%", padding: "12px 16px", background: C.bh, border: `1px solid ${C.gmc}`, borderRadius: "3px", fontSize: "0.95rem", color: C.co, fontFamily: "'Inter',sans-serif", outline: "none", transition: "border-color 0.3s" };
  const sl = { display: "block", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: C.gm, marginBottom: "6px" };

  /* --- Color y texto del botón según estado --- */
  const btnFormConfig = {
    idle: { bg: C.co, texto: t.contacto.btnEnviar, icono: "arrow" },
    enviando: { bg: C.gm, texto: t.contacto.enviando, icono: null },
    enviado: { bg: "#4a7c59", texto: t.contacto.enviado, icono: "check" },
    error: { bg: "#8c3a3a", texto: t.contacto.errorEnvio, icono: null },
  }[formEstado];

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

      {/* ====== OBRA ====== */}
      <section ref={seccionesRef.obra} style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", background: C.bh }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gm, marginBottom: "1rem" }}>{t.proyectos.etiqueta}</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: C.co, lineHeight: 1.15, marginBottom: "0.8rem" }}>{t.proyectos.titulo}</h2>
          <p style={{ fontSize: "1rem", fontWeight: 300, color: C.gm, marginBottom: "3rem", maxWidth: "650px", ...ep }}>{t.proyectos.subtitulo}</p>
          <div className="gm7" style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gridAutoRows: "minmax(160px,auto)", gap: "1rem" }}>
            <style>{`.gm7>.o0{grid-column:1/8;grid-row:1/3}.gm7>.o1{grid-column:8/13;grid-row:1/2}.gm7>.o2{grid-column:8/13;grid-row:2/3}.gm7>.o3{grid-column:1/5;grid-row:3/4}.gm7>.o4{grid-column:5/9;grid-row:3/4}.gm7>.o5{grid-column:9/13;grid-row:3/4}.gm7>.o6{grid-column:1/13;grid-row:4/5;min-height:200px}@media(max-width:768px){.gm7>div[class^="o"]{grid-column:1/-1!important;grid-row:auto!important;min-height:260px!important}}.oc:hover .go{opacity:1!important}.oc:hover .gcc{transform:translateY(0)!important;opacity:1!important}`}</style>
            {t.proyectos.obras.map((obra, index) => (
              <div key={index} className={`oc o${index}`} onClick={() => abrirLightbox(index + 1)} style={{ position: "relative", borderRadius: "4px", overflow: "hidden", cursor: "pointer", background: go[index] }}>
                <Img src={IMAGENES.obras[index]?.archivo} alt={IMAGENES.obras[index]?.alt || obra.titulo} grad={go[index]}><div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", color: "rgba(246,246,244,0.2)" }}>◈</div></Img>
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

      {/* ====== GALERÍA ====== */}
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

      {/* ====== TALLERES ====== */}
      <section ref={seccionesRef.talleres} style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", background: C.bh, borderTop: `1px solid ${C.gc}` }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gm, marginBottom: "1rem" }}>{t.talleres.etiqueta}</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: C.co, lineHeight: 1.15, marginBottom: "0.8rem", maxWidth: "700px" }}>{t.talleres.titulo}</h2>
          <p style={{ fontSize: "1rem", fontWeight: 300, color: C.gm, marginBottom: "1.5rem", maxWidth: "650px", lineHeight: 1.7, ...ep }}>{t.talleres.subtitulo}</p>
          <p style={{ fontSize: "0.95rem", fontWeight: 300, color: C.co, marginBottom: "3rem", maxWidth: "650px", lineHeight: 1.8, ...ep }}>{t.talleres.descripcion}</p>
          <div className="gtl" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
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
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {/* --- Inscribirse ahora lleva al formulario de contacto --- */}
            <button onClick={() => scrollHacia("contacto")} style={{ padding: "14px 32px", background: C.co, color: C.bh, border: "none", borderRadius: "2px", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>{t.talleres.btnInscribirse} <Icono tipo="arrow" size={16} /></button>
            <button onClick={() => scrollHacia("contacto")} style={{ padding: "14px 32px", background: "transparent", color: C.co, border: `1px solid ${C.gmc}`, borderRadius: "2px", fontSize: "0.8rem", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>{t.talleres.btnFechas}</button>
          </div>
        </div>
      </section>

      {/* ====== CONTACTO — Formulario con Formspree ====== */}
      <section ref={seccionesRef.contacto} style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,5vw,4rem)", background: C.gc }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gm, marginBottom: "3rem" }}>{t.contacto.etiqueta}</p>
          <div className="gcn" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem,5vw,5rem)" }}>
            <style>{`@media(max-width:768px){.gcn{grid-template-columns:1fr!important}}`}</style>
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 300, color: C.co, lineHeight: 1.15, marginBottom: "2rem" }}>{t.contacto.tituloBio}</h2>
              <p style={{ fontSize: "0.95rem", fontWeight: 300, color: C.co, lineHeight: 1.8, marginBottom: "1.5rem", ...ep }}>{t.contacto.bio1}</p>
              <p style={{ fontSize: "0.95rem", fontWeight: 300, color: C.gm, lineHeight: 1.8, marginBottom: "2.5rem", ...ep }}>{t.contacto.bio2}</p>
              {/* --- Redes Sociales: Instagram, Facebook, TikTok --- */}
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
              {/* --- Formulario: envía a atmanwolf@gmail.com vía Formspree --- */}
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1.2rem" }}><label style={sl}>{t.contacto.nombre}</label><input type="text" required value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} style={si} onFocus={e => e.target.style.borderColor = C.gm} onBlur={e => e.target.style.borderColor = C.gmc} disabled={formEstado === "enviando"} /></div>
                <div style={{ marginBottom: "1.2rem" }}><label style={sl}>{t.contacto.email}</label><input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={si} onFocus={e => e.target.style.borderColor = C.gm} onBlur={e => e.target.style.borderColor = C.gmc} disabled={formEstado === "enviando"} /></div>
                <div style={{ marginBottom: "1.2rem" }}><label style={sl}>{t.contacto.asunto}</label><select required value={formData.asunto} onChange={e => setFormData({ ...formData, asunto: e.target.value })} style={{ ...si, cursor: "pointer", appearance: "none" }} onFocus={e => e.target.style.borderColor = C.gm} onBlur={e => e.target.style.borderColor = C.gmc} disabled={formEstado === "enviando"}><option value="">—</option>{t.contacto.asuntoOpciones.map((o, i) => <option key={i} value={o}>{o}</option>)}</select></div>
                <div style={{ marginBottom: "1.5rem" }}><label style={sl}>{t.contacto.mensaje}</label><textarea required rows={5} value={formData.mensaje} onChange={e => setFormData({ ...formData, mensaje: e.target.value })} style={{ ...si, resize: "vertical" }} onFocus={e => e.target.style.borderColor = C.gm} onBlur={e => e.target.style.borderColor = C.gmc} disabled={formEstado === "enviando"} /></div>
                <button type="submit" disabled={formEstado === "enviando"} style={{
                  width: "100%", padding: "14px 32px", background: btnFormConfig.bg,
                  color: C.bh, border: "none", borderRadius: "3px", fontSize: "0.8rem", fontWeight: 500,
                  letterSpacing: "0.15em", textTransform: "uppercase", cursor: formEstado === "enviando" ? "wait" : "pointer",
                  transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  animation: formEstado === "enviando" ? "pulse 1.5s infinite" : "none",
                }}>
                  {btnFormConfig.texto}
                  {btnFormConfig.icono && <Icono tipo={btnFormConfig.icono} size={16} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer style={{ padding: "2rem clamp(1.5rem,5vw,4rem)", background: C.co, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontWeight: 400, color: C.gmc }}>Laura Cravioto</p>
        <p style={{ fontSize: "0.75rem", fontWeight: 300, color: C.gm }}>© {new Date().getFullYear()} — {t.contacto.derechos}</p>
      </footer>
    </>
  );
}
