const DEFAULT_SITE_DATA = {
  texts: {
    siteTitle: "CSRFotos | Ensaios e Fotografia de Estúdio",
    brandHighlight: "CSR",
    brandRest: "Fotos",
    navAbout: "Sobre",
    navPortfolio: "Portfólio",
    navPackages: "Pacotes",
    navTestimonials: "Avaliações",
    navContact: "Contato",
    heroEyebrow: "Fotografia de estúdio • Retratos • Ensaios",
    heroTitle: "Imagens sofisticadas para eternizar momentos únicos.",
    heroText: "Ensaios fotográficos com direção leve, estética moderna e um olhar sensível para valorizar sua história, sua marca ou sua família.",
    heroPrimaryButton: "Ver pacotes",
    heroSecondaryButton: "Conhecer portfólio",
    heroImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    heroImageAlt: "Retrato fotográfico em estúdio",
    heroImageFit: { x: 50, y: 50, zoom: 1 },
    heroBadgeLine1: "+ criatividade",
    heroBadgeLine2: "+ emoção",
    aboutEyebrow: "Sobre mim",
    aboutTitle: "Fotografia com cuidado, direção e personalidade e humanidade.",
    aboutText: "Sou fotógrafo especializado em criar experiências leves e memoráveis. Meu objetivo é fazer você se sentir confortável durante o ensaio e entregar imagens com acabamento profissional, emoção e identidade visual.",
    portfolioEyebrow: "Portfólio",
    portfolioTitle: "Trabalhos recentes",
    portfolioText: "Clique em um trabalho para visualizar todas as fotos do ensaio em tela cheia.",
    packagesEyebrow: "Pacotes",
    packagesTitle: "Planos para diferentes momentos",
    packagesText: "Escolha a opção que mais combina com o seu momento.",
    packageButton: "Quero este pacote",
    testimonialsEyebrow: "Avaliações",
    testimonialsTitle: "O que os clientes dizem",
    contactEyebrow: "Contato",
    contactTitle: "Vamos conversar sobre seu ensaio?",
    contactText: "Escolha a melhor forma de contato abaixo.",
    footerText: "CSRFotos. Todos os direitos reservados.",
    adminLink: "Área administrativa",
    galleryCloseLabel: "Fechar galeria",
    galleryPreviousLabel: "Foto anterior",
    galleryNextLabel: "Próxima foto",
    galleryCounterLabel: "Foto"
  },
  contacts: [
    { type: "WhatsApp", value: "(47) 99999-9999", link: "https://wa.me/5547999999999" },
    { type: "Instagram", value: "@csrfotos", link: "https://instagram.com/" },
    { type: "E-mail", value: "cesarnietupski@gmail.com", link: "mailto:cesarnietupski@gmail.com" }
  ],
  packages: [
    { name: "Ensaio Essencial", price: "R$ 250", description: "Ideal para retratos individuais, fotos profissionais ou registros rápidos em estúdio.", items: ["30 minutos de sessão", "10 fotos editadas", "Galeria online"] },
    { name: "Ensaio Premium", price: "R$ 450", description: "Uma experiência completa para quem deseja variedade de poses, cenários e imagens.", items: ["1 hora de sessão", "25 fotos editadas", "Direção de poses", "Galeria online"] },
    { name: "Família & Momentos", price: "R$ 650", description: "Pensado para famílias, casais e registros afetivos com mais tempo e cuidado.", items: ["Até 2 horas de sessão", "40 fotos editadas", "Consultoria de figurino", "Galeria online"] }
  ],
  testimonials: [
    { name: "Mariana S.", text: "Amei o resultado! Me senti muito confortável e as fotos ficaram lindas." },
    { name: "Lucas R.", text: "Profissional excelente, entrega rápida e qualidade impecável." },
    { name: "Fernanda M.", text: "Foi uma experiência leve, divertida e com fotos maravilhosas." }
  ],
  portfolio: [
    { title: "Retrato Profissional", category: "Estúdio", cover: "https://drive.google.com/thumbnail?id=1htGmjD5ntygCfsaXyzsnwICK2ihHgoIM&sz=w1600", images: ["https://drive.google.com/thumbnail?id=1NwABP7Puii1Cyebiw-0SGd0M5lzjKuF6&sz=w1600","https://drive.google.com/thumbnail?id=1M8xooHuYlZKDPZcrJptvhB6YT50y4qI7&sz=w1600","https://drive.google.com/thumbnail?id=1ztuLJdf0nByk9D47iqXp6aEygce0EUQt&sz=w1600","https://drive.google.com/thumbnail?id=1vmwUm-1cTVL3htYYww9jSiNVDjZ26r82&sz=w1600","https://drive.google.com/thumbnail?id=1kAHEMSWayYQOAlrRHJ9WMEl9b84O0p6A&sz=w1600","https://drive.google.com/thumbnail?id=1jvPv9KkqdBf76nV3U6p7g41A_0Fm2vcN&sz=w1600"] },
    { title: "Ensaio feminino", category: "Estúdio", cover: "https://drive.google.com/thumbnail?id=14Ws2gwTCQBXc2V9osuXlKhtsqr_UKiNb&sz=w1600", images: ["https://drive.google.com/thumbnail?id=1iZVLK8wug1bTMKxxxTNxs3syMdswuy0i&sz=w1600","https://drive.google.com/thumbnail?id=1XProsFM7IBNwCsf3VjIscpiYlk-v2ezJ&sz=w1600","https://drive.google.com/thumbnail?id=1_8D1eMt7w1ZcD93f8q6KzXBZQdhDzS4u&sz=w1600","https://drive.google.com/thumbnail?id=1uFWbmwz3y9nqeCBb9nqpdEwCn-c-ssdl&sz=w1600","https://drive.google.com/thumbnail?id=1Z_hL5RU7Bw1A8GeKYU5k7zJ-Gba8TVOQ&sz=w1600","https://drive.google.com/thumbnail?id=1trMNkGzBsPbF1jwuUrW9rJcb7IDxW_AO&sz=w1600"] },
    { title: "Família", category: "Família", cover: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80", images: ["https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=85", "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1600&q=85", "https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=1600&q=85"] },
    { title: "Ensaio de casal", category: "Casal", cover: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80", images: ["https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1600&q=85", "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1600&q=85", "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85"] }
  ]
};

function normalizeSiteData(rawData) {
  const source = rawData && typeof rawData === "object" ? rawData : {};
  const normalized = {
    ...structuredClone(DEFAULT_SITE_DATA),
    ...source,
    texts: { ...DEFAULT_SITE_DATA.texts, ...(source.texts || {}) }
  };
  normalized.contacts = Array.isArray(source.contacts) ? source.contacts : structuredClone(DEFAULT_SITE_DATA.contacts);
  normalized.packages = Array.isArray(source.packages) ? source.packages : structuredClone(DEFAULT_SITE_DATA.packages);
  normalized.testimonials = Array.isArray(source.testimonials) ? source.testimonials : structuredClone(DEFAULT_SITE_DATA.testimonials);
  normalized.texts.heroImageFit = normalizeImageFit(source.texts?.heroImageFit || source.heroImageFit || DEFAULT_SITE_DATA.texts.heroImageFit);
  normalized.portfolio = (Array.isArray(source.portfolio) ? source.portfolio : structuredClone(DEFAULT_SITE_DATA.portfolio)).map(item => {
    const cover = item.cover || item.image || "";
    const images = Array.isArray(item.images) && item.images.length ? item.images.filter(Boolean) : [cover].filter(Boolean);
    return {
      title: item.title || "Ensaio",
      category: item.category || "Portfólio",
      cover: cover || images[0] || "",
      coverFit: normalizeImageFit(item.coverFit || item.fit || { x: 50, y: 50, zoom: 1 }),
      images
    };
  });
  return normalized;
}

function normalizeImageFit(fit) {
  const source = fit && typeof fit === "object" ? fit : {};
  const clamp = (value, min, max, fallback) => {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    return Math.min(max, Math.max(min, number));
  };
  return {
    x: clamp(source.x, 0, 100, 50),
    y: clamp(source.y, 0, 100, 50),
    zoom: clamp(source.zoom, 1, 2.5, 1)
  };
}
