/* Lume — protótipo front-end para apresentação.
   Dados e interações ficam somente no navegador atual (localStorage). Não há backend. */
const STORAGE_KEY = "lume-demo-state-v3";
const ACCESSIBILITY_KEY = "lume-demo-accessibility-v3";
const LEGACY_ACCESSIBILITY_KEY = "lume-demo-accessibility-v2";
const DEFAULT_NAME = "Visitante";

const seedPosts = [
  {
    id: "p1", user: "Christian", initials: "CH", time: "há 18 min", category: "Saúde mental",
    title: "O que ajuda vocês quando a rotina fica muito estressante?",
    text: "Estou tentando organizar melhor minha rotina e queria conhecer estratégias que outras pessoas usam para desacelerar e cuidar da cabeça.",
    tags: ["estresse", "rotina"], likes: 42, comments: 13, liked: false, anonymous: false, mine: false,
    sampleComments: [
      {user:"Eduarda", initials:"ED", text:"Gosto de separar alguns minutos para respirar e organizar as prioridades do dia."},
      {user:"Matheus", initials:"MA", text:"Conversar com alguém de confiança também pode ajudar bastante."}
    ]
  },
  {
    id: "p2", user: "Usuário anônimo", initials: "?", time: "há 43 min", category: "Saúde íntima",
    title: "Queria entender melhor como conversar sobre saúde íntima com alguém de confiança",
    text: "Tenho dificuldade de tocar no assunto e gostaria de ouvir histórias e sugestões de outras pessoas sobre como iniciar essa conversa de forma respeitosa.",
    tags: ["saúde íntima", "conversa"], likes: 27, comments: 9, liked: false, anonymous: true, mine: false,
    sampleComments: [
      {user:"Isabella", initials:"IS", text:"Pode ser mais fácil começar dizendo que você tem uma dúvida e gostaria de conversar sem julgamentos."}
    ]
  },
  {
    id: "p3", user: "Alexandre", initials: "AL", time: "há 1 h", category: "Sono",
    title: "Vocês têm alguma rotina para desacelerar antes de dormir?",
    text: "Estou tentando diminuir o uso de telas à noite e queria trocar experiências sobre hábitos que tornam a hora de dormir mais tranquila.",
    tags: ["sono", "hábitos"], likes: 51, comments: 17, liked: false, anonymous: false, mine: false,
    sampleComments: [
      {user:"Isabella", initials:"IS", text:"Deixar o quarto mais tranquilo e manter horários consistentes é algo que tento fazer."},
      {user:"Christian", initials:"CH", text:"Também gosto de ler um pouco antes de dormir."}
    ]
  },
  {
    id: "p4", user: "Eduarda", initials: "ED", time: "há 2 h", category: "Alimentação",
    title: "Como vocês tornam a alimentação do dia a dia mais prática?",
    text: "Quero aprender ideias simples para planejar refeições e não depender sempre de improvisos durante a semana.",
    tags: ["alimentação", "rotina"], likes: 33, comments: 12, liked: false, anonymous: false, mine: false,
    sampleComments: [{user:"Matheus", initials:"MA", text:"Planejar algumas opções para a semana me ajuda a ganhar tempo."}]
  },
  {
    id: "p5", user: "Isabella", initials: "IS", time: "há 3 h", category: "Atividade física",
    title: "Como encontrar uma atividade física que combine com a rotina?",
    text: "Queria começar a me movimentar mais, mas tenho dúvidas sobre como escolher algo que seja agradável e possível de manter.",
    tags: ["movimento", "bem-estar"], likes: 19, comments: 6, liked: false, anonymous: false, mine: false,
    sampleComments: [{user:"Alexandre", initials:"AL", text:"Experimentar atividades diferentes, sem pressa, pode ajudar a descobrir o que você gosta."}]
  },
  {
    id: "p6", user: "Matheus", initials: "MA", time: "há 4 h", category: "Outros",
    title: "Onde vocês costumam buscar informações confiáveis sobre saúde?",
    text: "Tenho visto muitos conteúdos diferentes nas redes sociais. Queria conhecer fontes confiáveis para aprender mais e compartilhar informações com responsabilidade.",
    tags: ["informação", "fontes confiáveis"], likes: 24, comments: 8, liked: false, anonymous: false, mine: false,
    sampleComments: [{user:"Eduarda", initials:"ED", text:"Procuro priorizar canais oficiais de saúde e materiais que indiquem suas fontes."}]
  }
];

const communities = [
  {name:"Saúde Mental", initials:"SM", theme:"mint", members:"8,4 mil", category:"Saúde mental", description:"Um espaço para conversar sobre bem-estar emocional, rotina, estresse e autocuidado com respeito e empatia."},
  {name:"Vida Saudável", initials:"VS", theme:"blue", members:"5,1 mil", category:"Alimentação", description:"Troca de ideias sobre hábitos, alimentação, movimento e pequenas mudanças no dia a dia."},
  {name:"Saúde Íntima", initials:"SI", theme:"sand", members:"3,8 mil", category:"Saúde íntima", description:"Um ambiente respeitoso para dúvidas e conversas sobre saúde íntima e educação em saúde."},
  {name:"Sono e Descanso", initials:"SD", theme:"lilac", members:"2,6 mil", category:"Sono", description:"Experiências e informações sobre descanso, rotina noturna e qualidade do sono."},
  {name:"Movimento", initials:"MO", theme:"mint", members:"2,2 mil", category:"Atividade física", description:"Conversa sobre atividade física, movimento possível e hábitos saudáveis."},
  {name:"Dúvidas Gerais", initials:"DG", theme:"blue", members:"1,9 mil", category:"Outros", description:"Perguntas gerais sobre saúde, prevenção e acesso a informações confiáveis."}
];

const contentItems = [
  {id:"c1",type:"Podcast",title:"Conversas que acolhem: saúde emocional no cotidiano",description:"Uma conversa introdutória sobre escuta, autocuidado e a importância de procurar apoio quando necessário.",duration:"18 min",host:"Lume + convidada",status:"Episódio demonstrativo"},
  {id:"c2",type:"Live",title:"Perguntas sobre saúde íntima sem tabu",description:"Encontro educativo proposto para responder dúvidas gerais com linguagem acessível e participação de profissional convidado.",duration:"Próxima edição · 19h",host:"Encontro com especialista",status:"Agenda demonstrativa"},
  {id:"c3",type:"Podcast",title:"Pequenos hábitos, mais bem-estar",description:"Ideias realistas para observar a rotina, cuidar do descanso e construir hábitos possíveis.",duration:"12 min",host:"Equipe Lume",status:"Episódio demonstrativo"},
  {id:"c4",type:"Live",title:"Como encontrar informações confiáveis sobre saúde",description:"Uma conversa sobre fontes de informação, dúvidas comuns e a importância da orientação profissional.",duration:"Sábado · 10h",host:"Convidado da área da saúde",status:"Agenda demonstrativa"}
];

let state = loadState();
let currentView = "home";
let currentCategory = "Todos";
let currentCommentPostId = null;
let currentContentId = null;
let toastTimer = null;
let accessibilitySettings = loadAccessibilitySettings();
let activeSpeechUtterance = null;

function getDefaultZoom() {
  // A versão de apresentação abre um pouco mais próxima em telas grandes.
  return window.innerWidth >= 1200 ? 110 : 100;
}
function loadAccessibilitySettings() {
  const defaultZoom = getDefaultZoom();
  try {
    // Migra a preferência anterior de contraste para o novo modo escuro.
    const savedValue = localStorage.getItem(ACCESSIBILITY_KEY)
      || localStorage.getItem(LEGACY_ACCESSIBILITY_KEY)
      || "{}";
    const saved = JSON.parse(savedValue);
    const zoom = Number(saved.zoom);
    return {
      darkMode: saved.darkMode === true || saved.highContrast === true,
      zoom: Number.isFinite(zoom) ? Math.min(150, Math.max(80, Math.round(zoom / 10) * 10)) : defaultZoom
    };
  } catch (error) {
    return {darkMode:false, zoom:defaultZoom};
  }
}
function saveAccessibilitySettings() {
  try { localStorage.setItem(ACCESSIBILITY_KEY, JSON.stringify(accessibilitySettings)); }
  catch (error) { /* Preferências continuam ativas durante a sessão. */ }
}
function applyAccessibilitySettings() {
  document.body.classList.toggle("dark-mode", accessibilitySettings.darkMode);
  document.documentElement.style.zoom = `${accessibilitySettings.zoom}%`;
  const darkModeButton = document.getElementById("darkModeToggle");
  const zoomValue = document.getElementById("zoomValue");
  const zoomOut = document.getElementById("zoomOut");
  const zoomIn = document.getElementById("zoomIn");
  if (darkModeButton) {
    darkModeButton.textContent = accessibilitySettings.darkMode ? "Desativar" : "Ativar";
    darkModeButton.setAttribute("aria-pressed", String(accessibilitySettings.darkMode));
  }
  if (zoomValue) zoomValue.textContent = `${accessibilitySettings.zoom}%`;
  if (zoomOut) zoomOut.disabled = accessibilitySettings.zoom <= 80;
  if (zoomIn) zoomIn.disabled = accessibilitySettings.zoom >= 150;
}
function changeZoom(amount) {
  accessibilitySettings.zoom = Math.min(150, Math.max(80, accessibilitySettings.zoom + amount));
  saveAccessibilitySettings();
  applyAccessibilitySettings();
  showToast(`Zoom ajustado para ${accessibilitySettings.zoom}%.`);
}
function resetAccessibility() {
  accessibilitySettings = {darkMode:false, zoom:getDefaultZoom()};
  saveAccessibilitySettings();
  applyAccessibilitySettings();
  stopReadAloud();
  showToast("Acessibilidade restaurada ao padrão.");
}
function toggleAccessibilityPanel(forceOpen) {
  const panel = document.getElementById("accessibilityPanel");
  const button = document.getElementById("accessibilityButton");
  const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : panel.hidden;
  panel.hidden = !shouldOpen;
  button.setAttribute("aria-expanded", String(shouldOpen));
  if (shouldOpen) document.getElementById("darkModeToggle").focus();
}
function stopReadAloud() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  activeSpeechUtterance = null;
  const button = document.getElementById("readAloudToggle");
  if (button) {
    button.textContent = "Ler conteúdo";
    button.setAttribute("aria-pressed", "false");
  }
}
function toggleReadAloud() {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    showToast("A leitura em voz alta não é compatível com este navegador.");
    return;
  }
  if (window.speechSynthesis.speaking || activeSpeechUtterance) {
    stopReadAloud();
    showToast("Leitura interrompida.");
    return;
  }
  const content = document.getElementById("mainContent");
  const text = content ? content.innerText.trim() : "";
  if (!text) {
    showToast("Não há conteúdo disponível para leitura nesta seção.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.onend = stopReadAloud;
  utterance.onerror = stopReadAloud;
  activeSpeechUtterance = utterance;
  const button = document.getElementById("readAloudToggle");
  if (button) {
    button.textContent = "Parar leitura";
    button.setAttribute("aria-pressed", "true");
  }
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    // Mantém os posts de demonstração mesmo quando o navegador guardou uma
    // versão antiga/incompleta do estado. Publicações criadas pelo visitante
    // continuam no início da lista e não são sobrescritas.
    const storedPosts = Array.isArray(stored.posts) ? stored.posts.filter(post => post && post.id) : [];
    const normalizedStoredPosts = storedPosts.map(post => {
      const seed = seedPosts.find(item => item.id === post.id);
      return seed
        ? {...structuredCloneSafe(seed), ...post, sampleComments:Array.isArray(post.sampleComments) ? post.sampleComments : structuredCloneSafe(seed.sampleComments || [])}
        : post;
    });
    const storedIds = new Set(normalizedStoredPosts.map(post => post.id));
    const missingSeedPosts = seedPosts.filter(post => !storedIds.has(post.id)).map(structuredCloneSafe);
    return {
      posts: [...normalizedStoredPosts, ...missingSeedPosts],
      saved: Array.isArray(stored.saved) ? stored.saved : [],
      joined: Array.isArray(stored.joined) ? stored.joined : ["Saúde Mental"],
      name: typeof stored.name === "string" && stored.name.trim() ? stored.name.trim() : DEFAULT_NAME,
      followedContent: Array.isArray(stored.followedContent) ? stored.followedContent : [],
      comments: stored.comments && typeof stored.comments === "object" ? stored.comments : {}
    };
  } catch (error) {
    return {posts:structuredCloneSafe(seedPosts),saved:[],joined:["Saúde Mental"],name:DEFAULT_NAME,followedContent:[],comments:{}};
  }
}
function structuredCloneSafe(value) { return JSON.parse(JSON.stringify(value)); }
function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch (error) { showToast("Não foi possível salvar neste navegador. A demonstração continua ativa."); }
}
function escapeHtml(value="") {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
}
function initialsFor(name) {
  const parts = String(name || DEFAULT_NAME).trim().split(/\s+/).filter(Boolean);
  if (!parts.length || name === DEFAULT_NAME) return "V";
  return (parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0].slice(0,2)).toUpperCase();
}
function setProfileUi() {
  const initials = initialsFor(state.name);
  document.getElementById("headerName").textContent = state.name;
  document.getElementById("headerAvatar").textContent = initials;
  document.getElementById("profileAvatarPreview").textContent = initials;
  document.getElementById("profilePreviewName").textContent = state.name;
  document.getElementById("displayName").value = state.name;
  document.getElementById("savedCount").textContent = state.saved.length;
}
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}
function openModal(id) { document.getElementById(id).classList.add("open"); }
function closeModal(id) { document.getElementById(id).classList.remove("open"); }
function setActiveNav() {
  document.querySelectorAll("[data-nav]").forEach(button => {
    const active = button.dataset.nav === currentView;
    button.classList.toggle("active", active);
  });
}
function setView(view) {
  stopReadAloud();
  currentView = view;
  currentCategory = "Todos";
  // Evita que um termo de busca antigo esconda as publicações ao voltar ao feed.
  const searchInput = document.getElementById("globalSearch");
  if (searchInput) searchInput.value = "";
  document.getElementById("sidebar").classList.remove("open");
  setActiveNav();
  renderMain();
  window.scrollTo({top:0,behavior:"smooth"});
}
function setCategory(category) {
  stopReadAloud();
  currentCategory = category;
  currentView = "home";
  const searchInput = document.getElementById("globalSearch");
  if (searchInput) searchInput.value = "";
  setActiveNav();
  renderMain();
  window.scrollTo({top:0,behavior:"smooth"});
}
function getFilteredPosts({onlyMine=false,onlySaved=false}={}) {
  const query = document.getElementById("globalSearch").value.trim().toLocaleLowerCase("pt-BR");
  let result = state.posts.filter(post => {
    if (onlyMine && !post.mine) return false;
    if (onlySaved && !state.saved.includes(post.id)) return false;
    if (currentCategory !== "Todos" && post.category !== currentCategory) return false;
    const terms = [post.user,post.title,post.text,post.category,...(post.tags || [])].join(" ").toLocaleLowerCase("pt-BR");
    return !query || terms.includes(query);
  });
  const sort = document.getElementById("sortPosts")?.value || "recent";
  if (sort === "popular") result.sort((a,b) => b.likes - a.likes);
  return result;
}
function postCard(post) {
  const saved = state.saved.includes(post.id);
  const liked = !!post.liked;
  const comments = state.comments[post.id] || post.sampleComments || [];
  const badge = post.anonymous ? "Publicação anônima" : "Comunidade";
  const tags = (post.tags || []).map(tag => `<span class="tag">#${escapeHtml(tag.replace(/^#/,""))}</span>`).join("");
  const preview = comments.length ? `<div class="comment-preview"><strong>${escapeHtml(comments[comments.length-1].user)}:</strong> ${escapeHtml(comments[comments.length-1].text)}</div>` : "";
  return `<article class="post-card" data-post="${escapeHtml(post.id)}">
    <div class="post-top"><span class="avatar">${escapeHtml(post.anonymous ? "?" : post.initials || initialsFor(post.user))}</span><div class="post-author"><strong>${escapeHtml(post.user)}</strong><span class="post-meta">${escapeHtml(post.time)} · ${escapeHtml(post.category)}</span></div><span class="post-badge ${post.anonymous ? "anonymous" : ""}">${badge}</span></div>
    <h3 class="post-title">${escapeHtml(post.title)}</h3><p class="post-body">${escapeHtml(post.text)}</p>
    ${tags ? `<div class="post-tags">${tags}</div>` : ""}
    <div class="post-divider"></div>
    <div class="post-actions">
      <button class="post-action ${liked ? "liked" : ""}" data-action="like" data-id="${escapeHtml(post.id)}" aria-label="Curtir publicação"><svg viewBox="0 0 24 24"><path d="M20.8 8.8c0 5-8.8 10-8.8 10s-8.8-5-8.8-10A4.7 4.7 0 0 1 12 6.3a4.7 4.7 0 0 1 8.8 2.5Z"/></svg>${post.likes}</button>
      <button class="post-action" data-action="comments" data-id="${escapeHtml(post.id)}"><svg viewBox="0 0 24 24"><path d="M20 11.5a8 8 0 0 1-8.5 8 8.5 8.5 0 0 1-4-.9L3 20l1.7-4A7.6 7.6 0 1 1 20 11.5Z"/></svg>${post.comments ?? comments.length}</button>
      <button class="post-action ${saved ? "saved" : ""}" data-action="save" data-id="${escapeHtml(post.id)}"><svg viewBox="0 0 24 24"><path d="M6 4h12v17l-6-4-6 4z"/></svg>${saved ? "Salvo" : "Salvar"}</button>
      <button class="post-action" data-action="share" data-id="${escapeHtml(post.id)}"><svg viewBox="0 0 24 24"><path d="M12 16V3m-5 5 5-5 5 5M5 13v7h14v-7"/></svg>Compartilhar</button>
      <button class="post-action post-menu" data-action="report" data-id="${escapeHtml(post.id)}" aria-label="Denunciar publicação"><svg viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M10.3 4.8 2.9 18a2 2 0 0 0 1.8 3h14.6a2 2 0 0 0 1.8-3l-7.4-13.2a2 2 0 0 0-3.4 0Z"/></svg></button>
    </div>${preview}
  </article>`;
}
function renderFeed(targetId, posts, emptyTitle, emptyText, options={}) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = posts.length ? posts.map(postCard).join("") : `<div class="empty-state"><span class="empty-symbol">○</span><strong>${emptyTitle}</strong><p>${emptyText}</p>${options.cta ? `<button class="button-primary" data-action="new-post">${options.cta}</button>` : ""}</div>`;
}
function renderHome() {
  const main = document.getElementById("mainContent");
  main.innerHTML = `
    <section class="hero"><div class="hero-content"><div class="eyebrow">BEM-VINDO AO LUME</div><h1>Cuidado e luz para sua mente.</h1><p>Um espaço de conversa sobre saúde, onde dúvidas encontram experiências, informação e acolhimento — com privacidade e respeito.</p><div class="hero-actions"><button class="gold-button" data-action="new-post">Fazer uma pergunta</button><button class="light-button" data-action="go-communities">Explorar a comunidade</button></div></div></section>
    <section class="composer"><span class="avatar">${escapeHtml(initialsFor(state.name))}</span><button class="composer-trigger" data-action="new-post">O que está passando pela sua cabeça hoje?</button><button class="button-primary" data-action="new-post">Publicar</button></section>
    <div class="filters" id="categoryFilters">${["Todos","Saúde mental","Saúde íntima","Alimentação","Sono","Atividade física","Outros"].map(cat=>`<button class="chip ${currentCategory===cat?"active":""}" data-filter="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`).join("")}</div>
    <div class="section-heading"><div><h2>Conversas da comunidade</h2><p>${currentCategory === "Todos" ? "Perguntas e experiências compartilhadas" : `Publicações sobre ${escapeHtml(currentCategory.toLowerCase())}`}</p></div><div class="section-tools"><span>Ordenar</span><select class="sort-select" id="sortPosts"><option value="recent">Mais recentes</option><option value="popular">Mais curtidas</option></select></div></div>
    <div id="feedList"></div>`;
  renderFeed("feedList",getFilteredPosts(),"Ainda não há publicações por aqui.","Seja a primeira pessoa a iniciar uma conversa.",{cta:"Criar publicação"});
}
function renderMyPosts() {
  document.getElementById("mainContent").innerHTML = `<div class="page-header page-header-row"><div><div class="page-kicker">SEU ESPAÇO</div><h1>Minhas perguntas</h1><p>Acompanhe as publicações criadas nesta demonstração.</p></div><button class="button-primary" data-action="new-post">＋ Nova publicação</button></div><div id="feedList"></div>`;
  renderFeed("feedList",getFilteredPosts({onlyMine:true}),"Você ainda não publicou nada.","Crie uma pergunta para começar a participar da comunidade.",{cta:"Criar publicação"});
}
function renderSaved() {
  document.getElementById("mainContent").innerHTML = `<div class="page-header"><div class="page-kicker">SUAS REFERÊNCIAS</div><h1>Publicações salvas</h1><p>Conteúdos que você guardou para consultar novamente.</p></div><div id="feedList"></div>`;
  renderFeed("feedList",getFilteredPosts({onlySaved:true}),"Nenhuma publicação salva.","Use o botão “Salvar” nas conversas que deseja guardar.");
}
function renderCommunities() {
  document.getElementById("mainContent").innerHTML = `<div class="page-header"><div class="page-kicker">ENCONTRE SEU ESPAÇO</div><h1>Comunidades</h1><p>Participe de conversas organizadas por temas. Cada comunidade é um espaço de troca respeitosa e informação.</p></div><div class="content-grid">${communities.map(c=>{const joined=state.joined.includes(c.name);return `<article class="community-card"><div class="community-card-top"><span class="community-mark ${c.theme}">${c.initials}</span><div><h3>${c.name}</h3><small>${c.members} membros · ${c.category}</small></div></div><p>${c.description}</p><div class="card-bottom"><span class="member-count">${joined?"Você participa":"Comunidade aberta"}</span><button class="button-outline" data-action="join-community" data-name="${escapeHtml(c.name)}">${joined?"Participando ✓":"Participar"}</button></div></article>`;}).join("")}</div>`;
}
function renderContent() {
  document.getElementById("mainContent").innerHTML = `<div class="page-header"><div class="page-kicker">INFORMAÇÃO E CONVERSA</div><h1>Podcasts e lives</h1><p>Conteúdos demonstrativos que representam os formatos planejados pelo Lume para aproximar a comunidade de conversas educativas e profissionais convidados.</p></div><div class="content-grid">${contentItems.map(item=>{const followed=state.followedContent.includes(item.id);return `<article class="content-card"><span class="content-type ${item.type==="Live"?"live":""}">${item.type}</span><h3>${item.title}</h3><small>${item.host}</small><p>${item.description}</p><div class="content-meta"><span>${item.duration}</span><span>·</span><span>${item.status}</span></div><div class="card-bottom"><small>${followed?"Adicionado à sua lista":"Conteúdo de apresentação"}</small><button class="button-outline" data-action="content-details" data-id="${item.id}">${item.type==="Live"?"Ver detalhes":"Conhecer episódio"}</button></div></article>`;}).join("")}</div><div class="content-note">Os títulos, convidados e horários exibidos são exemplos fictícios para a apresentação do protótipo. Nenhuma transmissão está acontecendo nesta versão.</div>`;
}
function renderSupport() {
  document.getElementById("mainContent").innerHTML = `<div class="page-header"><div class="page-kicker">ESCUTA E ACOLHIMENTO</div><h1>Espaço de apoio</h1><p>Uma demonstração visual de como o Lume poderia apresentar orientações iniciais e caminhos para buscar apoio.</p></div><section class="support-intro"><h2>Você não precisa conversar sobre tudo de uma vez.</h2><p>Compartilhar uma dúvida pode ser um primeiro passo. No Lume, a proposta é oferecer um espaço respeitoso, sem julgamentos e com atenção à privacidade.</p></section><section class="support-demo"><div class="support-demo-head"><span class="avatar">L</span><div><strong>Espaço de acolhimento Lume</strong><small>Demonstração de interface · não monitorado</small></div></div><div class="demo-message">Olá! Este é um exemplo de como poderia funcionar o espaço de apoio do Lume. Esta conversa não é acompanhada por uma pessoa ou profissional.</div><div class="demo-message user">Gostaria de saber onde posso encontrar informações confiáveis sobre saúde emocional.</div><div class="demo-message">Você pode começar por fontes oficiais de saúde e, quando necessário, conversar com um profissional qualificado. As conversas da comunidade servem para troca de experiências, não para diagnóstico.</div><form class="support-input-row" id="supportDemoForm"><input id="supportDemoInput" placeholder="Escreva uma mensagem de demonstração..." maxlength="180"><button type="submit">Enviar</button></form><p class="support-warning">Importante: esta área é apenas ilustrativa. A mensagem não é enviada, armazenada nem lida por uma equipe. O protótipo não oferece atendimento de emergência.</p></section>`;
}
function renderMain() {
  setActiveNav();
  if (currentView === "home") renderHome();
  else if (currentView === "mine") renderMyPosts();
  else if (currentView === "saved") renderSaved();
  else if (currentView === "communities") renderCommunities();
  else if (currentView === "content") renderContent();
  else if (currentView === "support") renderSupport();
  bindDynamicControls();
}
function bindDynamicControls() {
  const sort = document.getElementById("sortPosts");
  if (sort) sort.addEventListener("change", () => renderFeed("feedList",getFilteredPosts({onlyMine:currentView==="mine",onlySaved:currentView==="saved"}),"Nenhuma publicação encontrada.","Ajuste os filtros ou crie uma nova publicação."));
}
function startPost(anonymous=false) {
  document.getElementById("postForm").reset();
  document.getElementById("anonymousCheck").checked = anonymous;
  document.getElementById("postCharCount").textContent = "0/900";
  openModal("postModal");
  setTimeout(()=>document.getElementById("postTitle").focus(),60);
}
function submitPost(event) {
  event.preventDefault();
  const title=document.getElementById("postTitle").value.trim();
  const text=document.getElementById("postText").value.trim();
  const category=document.getElementById("postCategory").value;
  const tags=document.getElementById("postTags").value.split(",").map(t=>t.trim().replace(/^#/ ,"")).filter(Boolean).slice(0,4);
  const anonymous=document.getElementById("anonymousCheck").checked;
  if(!title||!text){showToast("Preencha o título e a mensagem.");return;}
  const post={id:`user-${Date.now()}`,user:anonymous?"Usuário anônimo":state.name,initials:anonymous?"?":initialsFor(state.name),time:"agora",category,title,text,tags,likes:0,comments:0,liked:false,anonymous,mine:true,sampleComments:[]};
  state.posts.unshift(post);persist();closeModal("postModal");currentView="home";currentCategory="Todos";document.getElementById("globalSearch").value="";renderMain();showToast(anonymous?"Publicação anônima adicionada ao feed.":"Sua publicação foi adicionada ao feed.");
}
function toggleLike(id) {
  const post=state.posts.find(p=>p.id===id);if(!post)return;
  post.liked=!post.liked;post.likes+=post.liked?1:-1;persist();renderMain();
}
function toggleSave(id) {
  const index=state.saved.indexOf(id);
  if(index>=0){state.saved.splice(index,1);showToast("Publicação removida dos salvos.");}
  else{state.saved.push(id);showToast("Publicação salva neste navegador.");}
  persist();renderMain();
}
function getComments(post) { return state.comments[post.id] || post.sampleComments || []; }
function openComments(id) {
  const post=state.posts.find(p=>p.id===id);if(!post)return;
  currentCommentPostId=id;
  document.getElementById("commentsTitle").textContent="Comentários";
  document.getElementById("commentsPostSummary").innerHTML=`<strong>${escapeHtml(post.title)}</strong><p>${escapeHtml(post.text)}</p>`;
  renderComments(post);openModal("commentsModal");
}
function renderComments(post) {
  const comments=getComments(post);
  document.getElementById("commentsList").innerHTML=comments.length?comments.map(c=>`<div class="comment-row"><span class="avatar">${escapeHtml(c.initials||initialsFor(c.user))}</span><div class="comment-copy"><strong>${escapeHtml(c.user)}</strong><p>${escapeHtml(c.text)}</p></div></div>`).join(""):`<div class="empty-state"><strong>Seja a primeira pessoa a comentar.</strong><p>Contribua com respeito e empatia.</p></div>`;
}
function submitComment(event) {
  event.preventDefault();
  const post=state.posts.find(p=>p.id===currentCommentPostId);const input=document.getElementById("commentInput");const text=input.value.trim();
  if(!post||!text)return;
  if(!state.comments[post.id])state.comments[post.id]=[...(post.sampleComments||[])];
  state.comments[post.id].push({user:state.name,initials:initialsFor(state.name),text});
  post.comments=(post.comments||0)+1;input.value="";persist();renderComments(post);renderMain();showToast("Comentário adicionado à demonstração.");
}
async function sharePost(id) {
  const post=state.posts.find(p=>p.id===id);if(!post)return;
  const text=`Lume — ${post.title}\n${post.text}`;
  try { await navigator.clipboard.writeText(text);showToast("Texto da publicação copiado."); }
  catch(error){showToast("Compartilhamento demonstrativo: copie o título da publicação.");}
}
function reportPost() { showToast("Obrigado pelo cuidado. A denúncia é apenas simulada neste protótipo."); }
function toggleCommunity(name) {
  const index=state.joined.indexOf(name);
  if(index>=0){state.joined.splice(index,1);showToast(`Você saiu da comunidade ${name}.`);}
  else{state.joined.push(name);showToast(`Você entrou na comunidade ${name}.`);}
  persist();renderMain();
}
function openContentDetails(id) {
  const item=contentItems.find(c=>c.id===id);if(!item)return;
  currentContentId=id;
  const followed=state.followedContent.includes(id);
  document.getElementById("contentModalTitle").textContent=item.title;
  document.getElementById("contentModalBody").innerHTML=`<span class="content-type ${item.type==="Live"?"live":""}">${item.type}</span><p style="font-size:10px;line-height:1.65;color:#71858e">${escapeHtml(item.description)}</p><p style="font-size:9px;color:#81929a"><strong>Apresentação:</strong> ${escapeHtml(item.host)}<br><strong>Formato:</strong> ${escapeHtml(item.duration)}<br><strong>Status:</strong> ${escapeHtml(item.status)}</p><button class="button-outline button-full" id="followContentButton">${followed?"Remover da minha lista":"Acompanhar conteúdo"}</button><p class="fine-print">Conteúdo ilustrativo. Não há áudio ou transmissão ao vivo nesta versão de demonstração.</p>`;
  openModal("contentModal");
  document.getElementById("followContentButton").addEventListener("click",()=>{
    const i=state.followedContent.indexOf(id);if(i>=0)state.followedContent.splice(i,1);else state.followedContent.push(id);persist();closeModal("contentModal");renderMain();showToast(i>=0?"Conteúdo removido da sua lista.":"Conteúdo adicionado à sua lista.");
  });
}
function saveProfile(event) {
  event.preventDefault();
  const value=document.getElementById("displayName").value.trim().slice(0,24)||DEFAULT_NAME;
  state.name=value;persist();setProfileUi();closeModal("profileModal");renderMain();showToast("Preferência de nome atualizada neste navegador.");
}
function handleGlobalSearch() { stopReadAloud(); if(currentView!=="home"){currentView="home";currentCategory="Todos";}renderMain(); }
function renderSupportDemo(event) {
  event.preventDefault();
  const input=document.getElementById("supportDemoInput");if(!input.value.trim())return;
  const container=document.querySelector(".support-demo");
  const bubble=document.createElement("div");bubble.className="demo-message user";bubble.textContent=input.value.trim();container.insertBefore(bubble,document.getElementById("supportDemoForm"));input.value="";
  const notice=document.createElement("div");notice.className="demo-message";notice.textContent="Esta é somente uma simulação de interface. Em uma versão real, o espaço precisaria de equipe preparada, regras de segurança e encaminhamento para serviços adequados.";container.insertBefore(notice,document.getElementById("supportDemoForm"));
}

// Navegação e ações delegadas.
document.addEventListener("click",event=>{
  const nav=event.target.closest("[data-nav]");
  if(nav){event.preventDefault();setView(nav.dataset.nav);return;}
  const categoryNav=event.target.closest("[data-category]");
  if(categoryNav){setCategory(categoryNav.dataset.category);return;}
  const filter=event.target.closest("[data-filter]");
  if(filter){currentCategory=filter.dataset.filter;document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("active",b===filter));renderHome();return;}
  const action=event.target.closest("[data-action]");
  if(action){const id=action.dataset.id;switch(action.dataset.action){case"new-post":startPost(false);break;case"like":toggleLike(id);break;case"save":toggleSave(id);break;case"comments":openComments(id);break;case"share":sharePost(id);break;case"report":reportPost(id);break;case"go-communities":setView("communities");break;case"join-community":toggleCommunity(action.dataset.name);break;case"content-details":openContentDetails(id);break;}}
  const close=event.target.closest("[data-close]");if(close)closeModal(close.dataset.close);
  const trend=event.target.closest("[data-search]");if(trend){document.getElementById("globalSearch").value=trend.dataset.search;handleGlobalSearch();}
  const mini=event.target.closest("[data-community]");if(mini){setView("communities");}
});

document.getElementById("postForm").addEventListener("submit",submitPost);
document.getElementById("commentForm").addEventListener("submit",submitComment);
document.getElementById("profileForm").addEventListener("submit",saveProfile);
document.getElementById("globalSearch").addEventListener("input",handleGlobalSearch);
document.getElementById("postText").addEventListener("input",event=>document.getElementById("postCharCount").textContent=`${event.target.value.length}/900`);
document.getElementById("profileButton").addEventListener("click",()=>openModal("profileModal"));
document.getElementById("notificationsButton").addEventListener("click",()=>openModal("notificationsModal"));
document.getElementById("anonymousQuickButton").addEventListener("click",()=>startPost(true));
document.getElementById("mobileCreateButton").addEventListener("click",()=>startPost(false));
document.getElementById("mobileMenuButton").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
document.getElementById("accessibilityButton").addEventListener("click",()=>toggleAccessibilityPanel());
document.getElementById("darkModeToggle").addEventListener("click",()=>{
  accessibilitySettings.darkMode=!accessibilitySettings.darkMode;
  saveAccessibilitySettings();
  applyAccessibilitySettings();
  showToast(accessibilitySettings.darkMode?"Modo escuro ativado.":"Modo claro ativado.");
});
document.getElementById("readAloudToggle").addEventListener("click",toggleReadAloud);
document.getElementById("zoomOut").addEventListener("click",()=>changeZoom(-10));
document.getElementById("zoomIn").addEventListener("click",()=>changeZoom(10));
document.getElementById("accessibilityReset").addEventListener("click",resetAccessibility);
document.addEventListener("click",event=>{
  if(!event.target.closest(".accessibility-wrap")) toggleAccessibilityPanel(false);
});
document.addEventListener("keydown",event=>{
  if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="k"){event.preventDefault();document.getElementById("globalSearch").focus();}
  if(event.key==="Escape"){document.querySelectorAll(".modal.open").forEach(m=>m.classList.remove("open"));document.getElementById("sidebar").classList.remove("open");toggleAccessibilityPanel(false);}
});
document.querySelectorAll(".modal").forEach(modal=>modal.addEventListener("click",event=>{if(event.target===modal)closeModal(modal.id);}));

document.addEventListener("submit",event=>{if(event.target.id==="supportDemoForm")renderSupportDemo(event);});

applyAccessibilitySettings();
setProfileUi();
renderMain();
