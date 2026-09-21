/* ==============================
   REDE ACOLHE MIRANDIBA
   Edite os dados abaixo para publicar informações confirmadas.
   ============================== */

const CONFIG = {
  // Troque pelo número oficial da equipe: país + DDD + número, sem espaços ou símbolos.
  whatsapp: '5587999999999',
  cidade: 'Mirandiba, Pernambuco'
};

// Cadastre aqui somente endereços e horários confirmados pela equipe local.
const locations = [
  { icon: '🍲', title: 'Ponto do Sopão', detail: 'Ver local e rota no Google Maps', query: 'sopão Mirandiba Pernambuco' },
  { icon: '⛪', title: 'Igreja / ponto de entrega', detail: 'Ver local e rota no Google Maps', query: 'igrejas Mirandiba Pernambuco' },
  { icon: '🏛️', title: 'CRAS', detail: 'Assistência social e orientação', query: 'CRAS Mirandiba Pernambuco' },
  { icon: '🩺', title: 'Posto de saúde', detail: 'Atendimento de saúde mais próximo', query: 'posto de saúde Mirandiba Pernambuco' },
  { icon: '🛟', title: 'Conselho Tutelar', detail: 'Proteção de crianças e adolescentes', query: 'Conselho Tutelar Mirandiba Pernambuco' },
  { icon: '🚿', title: 'Ponto de banho', detail: 'Local de acolhimento e higiene', query: 'banho público Mirandiba Pernambuco' }
];

// Datas de exemplo: substitua pelas datas reais antes de publicar.
const events = [
  { day: '05', month: 'OUT', title: 'Sopão solidário', place: 'Praça central • 18h', type: 'Alimentação' },
  { day: '12', month: 'OUT', title: 'Entrega de roupas e kits', place: 'Igreja parceira • 9h', type: 'Doação' },
  { day: '19', month: 'OUT', title: 'Dia do banho e cuidado', place: 'Ponto de acolhimento • 8h', type: 'Acolhimento' }
];

function mapsSearchUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function renderLocations() {
  const list = document.querySelector('#locationList');
  list.innerHTML = locations.map(location => `
    <div class="location-item">
      <span class="loc-icon">${location.icon}</span>
      <div><span>${location.title}</span><small>${location.detail}</small></div>
      <a href="${mapsSearchUrl(location.query)}" target="_blank" rel="noopener" aria-label="Abrir ${location.title} no Google Maps">↗</a>
    </div>
  `).join('');
}

function renderEvents() {
  const list = document.querySelector('#eventList');
  list.innerHTML = events.map(event => `
    <article class="event-card">
      <div class="event-date"><strong>${event.day}</strong><small>${event.month}</small></div>
      <div><h3>${event.title}</h3><p>${event.place}</p><span class="event-tag">${event.type}</span></div>
    </article>
  `).join('');
}

function setupWhatsApp() {
  document.querySelectorAll('.whatsapp-link').forEach(link => {
    const message = link.dataset.message || 'Olá! Quero falar com a Rede Acolhe Mirandiba.';
    link.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener';
  });
}

function setupMenu() {
  const toggle = document.querySelector('#menuToggle');
  const nav = document.querySelector('#mainNav');
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

function setupMap() {
  const map = document.querySelector('#googleMap');
  map.title = `Mapa de ${CONFIG.cidade}`;
}

renderLocations();
renderEvents();
setupWhatsApp();
setupMenu();
setupMap();
document.querySelector('#currentYear').textContent = new Date().getFullYear();
