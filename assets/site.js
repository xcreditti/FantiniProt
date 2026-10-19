/* =========================================================
   FANTINI CONFEITARIA — FUNCIONAMENTO DO SITE
   Os dados (produtos, endereço, banners) ficam em assets/dados.js
   ========================================================= */

/* ---------------- Auxiliares ---------------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const escapar = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const soDigitos = s => String(s || "").replace(/\D/g, "");
const linkWhats = texto => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
const PAGINA = document.body.dataset.pagina || "inicio";
const parametros = new URLSearchParams(location.search);

let produtos = PRODUTOS.slice();

const urlLinha = id => `produtos.html?categoria=${encodeURIComponent(id)}`;
const linhaPorId = id => CATEGORIAS.find(c => c.id === id);
const produtoPorId = id => produtos.find(p => p.id === id);
const produtosDaLinha = id => produtos.filter(p => p.cat === id || (p.tambem || []).includes(id));

function aviso(msg){
  const el = $("#aviso");
  el.textContent = msg;
  el.classList.add("ativo");
  clearTimeout(aviso.t);
  aviso.t = setTimeout(() => el.classList.remove("ativo"), 2600);
}

/* ---------------- Ícones ---------------- */
const ICONE = {
  insta: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.7a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6zm5.3-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg>',
  whats: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.4 14.4 0 0 0 5.5 4.9c2 .9 2.8.9 3.8.8a3.3 3.3 0 0 0 2.1-1.5 2.7 2.7 0 0 0 .2-1.5c-.1-.2-.3-.2-.6-.4z"/></svg>',
  sacola: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M5.5 8h13l-1 12.5h-11L5.5 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>',
  escudo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z"/><path d="M12 8v5M12 16.5v.5" stroke-linecap="round"/></svg>'
};

/* ---------------- Ilustrações em traço fino (até ter fotos) ---------------- */
function ilustracao(cat, cor = "#60250D", acento = "#F4A1B0"){
  const s = `stroke="${cor}" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  const bolinha = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${acento}" stroke="${cor}" stroke-width="1.5"/>`;
  let d = "";
  if (cat === "gourmet"){
    d = `<ellipse cx="100" cy="134" rx="68" ry="9" ${s}/>
      <path d="M50 128 C50 84 72 62 100 62 C128 62 150 84 150 128 Z" ${s}/>
      <path d="M62 116 C68 96 82 82 100 79" ${s} opacity=".45"/>
      <path d="M50 128 L150 128" ${s}/>
      ${bolinha(100, 54, 7)}
      <path d="M107 52 C116 42 128 41 134 44 C128 55 117 57 107 52 Z" ${s}/>
      <circle cx="80" cy="66" r="1.6" fill="${cor}"/><circle cx="122" cy="68" r="1.6" fill="${cor}"/><circle cx="70" cy="80" r="1.6" fill="${cor}"/>`;
  } else if (cat === "tortas"){
    d = `<path d="M38 128 L162 128 L162 100 L54 74 Z" ${s}/>
      <path d="M40 120 L162 120" ${s}/>
      <path d="M48 104 L162 110" ${s} stroke-dasharray="2 5"/>
      <path d="M78 82 q5 -11 10 0 q5 -11 10 0" ${s}/>
      <path d="M112 90 q5 -11 10 0 q5 -11 10 0" ${s}/>
      ${bolinha(150, 90, 5)}`;
  } else if (cat === "doces"){
    d = [62, 100, 138].map((x, i) => `
      <path d="M${x-18} 108 L${x+18} 108 L${x+13} 132 L${x-13} 132 Z" ${s}/>
      <path d="M${x-8} 109 L${x-6} 131 M${x} 109 L${x} 131 M${x+8} 109 L${x+6} 131" ${s} opacity=".45"/>
      <circle cx="${x}" cy="92" r="17" ${s} ${i === 1 ? `fill="${acento}"` : ""}/>
      <circle cx="${x-5}" cy="86" r="1.4" fill="${cor}"/><circle cx="${x+6}" cy="90" r="1.4" fill="${cor}"/><circle cx="${x}" cy="98" r="1.4" fill="${cor}"/>`).join("");
  } else if (cat === "copo"){
    d = `<path d="M62 62 L138 62" ${s}/>
      <path d="M66 62 C66 34 134 34 134 62" ${s}/>
      <path d="M70 62 L80 142 L120 142 L130 62" ${s}/>
      <path d="M72 84 q7 5 14 0 q7 5 14 0 q7 5 14 0 q7 5 14 0" ${s}/>
      <path d="M75 106 L125 106" ${s} stroke-dasharray="2 5"/>
      <path d="M77 124 q6 4 12 0 q6 4 12 0 q6 4 12 0 q6 4 9 0" ${s}/>
      ${bolinha(100, 52, 7)}
      <path d="M148 64 L148 142" ${s}/><ellipse cx="148" cy="56" rx="6" ry="9" ${s}/>`;
  } else if (cat === "brownie"){
    d = `<ellipse cx="100" cy="138" rx="72" ry="9" ${s}/>
      <path d="M50 96 L72 76 L152 76 L130 96 Z" ${s}/>
      <path d="M50 96 L50 128 L130 128 L130 96" ${s}/>
      <path d="M130 128 L152 108 L152 76" ${s}/>
      <path d="M58 96 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0 q6 8 12 0" ${s}/>
      <path d="M50 110 L130 110" ${s} opacity=".4" stroke-dasharray="2 5"/>
      ${bolinha(104, 70, 8)}
      <circle cx="80" cy="86" r="1.6" fill="${cor}"/><circle cx="128" cy="84" r="1.6" fill="${cor}"/><circle cx="92" cy="80" r="1.6" fill="${cor}"/>`;
  } else {
    d = `<path d="M42 128 L158 128" ${s}/><path d="M100 128 L100 146 M80 148 L120 148" ${s}/>
      <rect x="58" y="74" width="84" height="54" rx="2" ${s}/>
      <path d="M58 93 L142 93 M58 111 L142 111" ${s} stroke-dasharray="2 5"/>
      <path d="M58 80 q6 10 12 0 q6 12 12 0 q6 8 12 0 q6 12 12 0 q6 9 12 0 q6 11 12 0 q6 8 12 0" ${s}/>
      ${bolinha(86, 67, 5)}${bolinha(100, 64, 6)}${bolinha(114, 67, 5)}`;
  }
  return `<svg viewBox="0 0 200 170" role="img" aria-hidden="true">${d}</svg>`;
}

/* Fundo e traço de cada linha */
const VISUAL = {
  gourmet:  {fundo:"fundo-terroso", cor:"#FAF6F1", acento:"#F4A1B0"},
  bolos:    {fundo:"fundo-areia",   cor:"#60250D", acento:"#F4A1B0"},
  bento:    {fundo:"fundo-blush",   cor:"#60250D", acento:"#F2EBE2"},
  kits:     {fundo:"fundo-areia",   cor:"#60250D", acento:"#F4A1B0"},
  doces:    {fundo:"fundo-blush",   cor:"#60250D", acento:"#F2EBE2"},
  copos:    {fundo:"fundo-blush",   cor:"#60250D", acento:"#F4A1B0"},
  brownies: {fundo:"fundo-areia",   cor:"#60250D", acento:"#F4A1B0"},
  sobremesas:{fundo:"fundo-blush",  cor:"#60250D", acento:"#F2EBE2"},
  caseiros: {fundo:"fundo-areia",   cor:"#60250D", acento:"#F4A1B0"},
  zero:     {fundo:"fundo-blush",   cor:"#60250D", acento:"#F2EBE2"},
  geleias:  {fundo:"fundo-areia",   cor:"#60250D", acento:"#F4A1B0"}
};
const visual = cat => VISUAL[cat] || VISUAL.bolos;
const ARTE_LINHA = {gourmet:"gourmet", bolos:"bolos", bento:"bolos", kits:"bolos", doces:"doces", copos:"copo", brownies:"brownie", sobremesas:"tortas", caseiros:"bolos", zero:"bolos", geleias:"doces"};
function imagemOuArte(foto, cat, alt){
  if (foto) return `<img src="${escapar(foto)}" alt="${escapar(alt)}" loading="lazy">`;
  const v = visual(cat);
  return ilustracao(ARTE_LINHA[cat] || cat, v.cor, v.acento);
}

/* =========================================================
   CABEÇALHO, BANDEIRINHAS E RODAPÉ (iguais em todas as páginas)
   ========================================================= */
function montarLayout(){
  const cat = parametros.get("categoria");
  const atual = (pag, c) => (PAGINA === pag && (c === undefined || c === cat)) ? 'aria-current="page"' : "";

  $("#topo-site").innerHTML = `
    <div class="barra-topo"><div class="container">
      <span class="status" id="statusLoja" role="status"><span class="bolinha"></span><span id="statusTexto">Carregando horário…</span></span>
      <span class="barra-endereco" id="barraEndereco"></span>
      <a class="barra-whats link-whats" target="_blank" rel="noopener">WhatsApp ${escapar(CONFIG.telefoneExibicao)}</a>
    </div></div>
    <header class="topo"><div class="container">
      <div class="topo-esquerda">
        <button class="btn-menu" id="btnMenu" aria-label="Abrir menu" aria-expanded="false" aria-controls="menuCelular"><span></span><span></span><span></span></button>
        <nav class="menu" aria-label="Menu principal">
          <a href="produtos.html" ${PAGINA === "produtos" && !cat ? 'aria-current="page"' : ""}>Produtos</a>
          <a href="${urlLinha("gourmet")}" ${atual("produtos", "gourmet")}>Linha Gourmet</a>
          <a href="encomendas.html" ${atual("encomendas")}>Encomendas</a>
        </nav>
      </div>
      <a href="index.html" class="marca" aria-label="Fantini Confeitaria, página inicial"><img src="img/logo.png" alt="Fantini Confeitaria" width="64" height="64"></a>
      <div class="topo-direita">
        <nav class="menu" aria-label="Institucional">
          <a href="sobre.html" ${atual("sobre")}>A Fantini</a>
          <a href="index.html#visite">Onde estamos</a>
        </nav>
        <button class="btn-selecao" id="abrirSelecao" aria-label="Abrir sua seleção">${ICONE.sacola}<span class="texto">Seleção</span><span class="contador" id="contador">0</span></button>
      </div>
      <nav class="menu-celular" id="menuCelular" aria-label="Menu">
        <a href="index.html">Início</a>
        <a href="produtos.html">Produtos</a>
        <a href="${urlLinha("gourmet")}">Linha Gourmet</a>
        <a href="encomendas.html">Encomendas</a>
        <a href="sobre.html">A Fantini</a>
        <a href="index.html#visite">Onde estamos</a>
      </nav>
    </div></header>
    <div class="tenda" aria-hidden="true"></div>`;

  $("#rodape-site").innerHTML = `
    <footer class="rodape"><div class="container">
      <div class="rodape-grade">
        <div>
          <a href="index.html" class="marca marca-rodape"><img src="img/logo.png" alt="Fantini Confeitaria" width="96" height="96"></a>
          <p style="margin-top:20px;max-width:32ch">Tudo o que sua festa precisa para ser inesquecível, feito à mão com carinho e cuidado.</p>
          <div class="rodape-social">
            <a class="link-insta" target="_blank" rel="noopener" aria-label="Instagram">${ICONE.insta}</a>
            <a class="link-whats" target="_blank" rel="noopener" aria-label="WhatsApp">${ICONE.whats}</a>
          </div>
        </div>
        <div><h4>Produtos</h4><ul>${CATEGORIAS.map(c => `<li><a href="${urlLinha(c.id)}">${escapar(c.nome)}</a></li>`).join("")}</ul></div>
        <div><h4>A Fantini</h4><ul>
          <li><a href="sobre.html">Nossa história</a></li>
          <li><a href="encomendas.html">Encomendas</a></li>
          <li><a href="encomendas.html#duvidas">Dúvidas frequentes</a></li>
          <li><a href="encomendas.html#duvidas">Formas de pagamento</a></li>
          <li><a href="index.html#visite">Onde estamos</a></li>
        </ul></div>
        <div><h4>Atendimento</h4><ul>
          <li class="info-endereco"></li>
          <li><a class="link-whats" target="_blank" rel="noopener">${escapar(CONFIG.telefoneExibicao)}</a></li>
          <li><a class="link-insta" target="_blank" rel="noopener">@${escapar(CONFIG.instagram)}</a></li>
        </ul></div>
      </div>
      <div class="copy"><span>© ${new Date().getFullYear()} ${escapar(CONFIG.nome)}. Todos os direitos reservados.</span><span>Por serem feitos à mão, nossos produtos podem ter pequenas variações em relação às imagens.</span></div>
    </div></footer>

    <a class="whats-flutuante link-whats" target="_blank" rel="noopener" aria-label="Conversar no WhatsApp">${ICONE.whats}</a>

    <div class="fundo-escuro" id="fundoEscuro"></div>
    <aside class="gaveta" id="gaveta" aria-label="Sua seleção" aria-hidden="true">
      <div class="gaveta-topo"><h2>Sua seleção</h2><button class="fechar" id="fecharSelecao" aria-label="Fechar">×</button></div>
      <div class="gaveta-corpo">
        <div id="itensSelecao"></div>
        <form class="gaveta-form" id="formSelecao" novalidate>
          <div class="campo"><label for="selNome">Seu nome</label><input id="selNome" autocomplete="name"></div>
          <div class="campo"><label for="selTelefone">WhatsApp com DDD</label><input id="selTelefone" type="tel" inputmode="tel" autocomplete="tel" placeholder="(31) 99999-9999"></div>
          <fieldset class="campo"><legend>Como prefere receber?</legend>
            <div class="opcoes">
              <label><input type="radio" name="recebimento" value="retirada" checked> Retirar na loja</label>
              <label><input type="radio" name="recebimento" value="entrega"> Entrega</label>
            </div>
          </fieldset>
          <div class="campo" id="campoEndereco" hidden><label for="selEndereco">Endereço de entrega</label><input id="selEndereco" autocomplete="street-address" placeholder="Rua, número, bairro"></div>
          <fieldset class="campo"><legend>Forma de pagamento</legend>
            <div class="opcoes">
              <label><input type="radio" name="selPagamento" value="Pix" checked> Pix</label>
              <label><input type="radio" name="selPagamento" value="Cartão de crédito"> Cartão de crédito</label>
            </div>
          </fieldset>
          <div class="campo"><label for="selObs">Observações <span class="ajuda">(opcional)</span></label><textarea id="selObs" placeholder="Ex.: 50 brigadeiros e 50 beijinhos, retirar sábado às 10h"></textarea></div>
        </form>
      </div>
      <div class="gaveta-rodape">
        <small>Nossa equipe confirma valores e disponibilidade pelo WhatsApp. O pagamento é feito por Pix ou cartão de crédito.</small>
        <button class="btn btn-escuro" id="enviarSelecao">${ICONE.whats} Enviar pelo WhatsApp</button>
        <p class="erro" id="selErro" role="alert"></p>
      </div>
    </aside>

    <div class="aviso" id="aviso" role="status" aria-live="polite"></div>
`;

  // menu do celular
  $("#btnMenu").addEventListener("click", () => {
    const aberto = $("#menuCelular").classList.toggle("aberto");
    $("#btnMenu").setAttribute("aria-expanded", aberto);
  });
  $("#menuCelular").addEventListener("click", e => {
    if (e.target.tagName === "A"){ $("#menuCelular").classList.remove("aberto"); $("#btnMenu").setAttribute("aria-expanded", false); }
  });
}

/* =========================================================
   LOJA: HORÁRIO, ENDEREÇO, MAPA E CONTATOS
   ========================================================= */
const DIAS = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
const minutos = h => { const [a, b] = h.split(":").map(Number); return a * 60 + b; };
const juntar = partes => partes.filter(Boolean).join(", ");

function statusLoja(){
  const agora = new Date(), dia = agora.getDay(), min = agora.getHours() * 60 + agora.getMinutes();
  const hoje = CONFIG.horarios[dia];
  if (hoje && min >= minutos(hoje[0]) && min < minutos(hoje[1])) return {aberto:true, texto:`Aberto agora, até ${hoje[1]}`};
  if (hoje && min < minutos(hoje[0])) return {aberto:false, texto:`Abrimos hoje às ${hoje[0]}`};
  for (let i = 1; i <= 7; i++){
    const d = (dia + i) % 7;
    if (CONFIG.horarios[d]) return {aberto:false, texto:`Abrimos ${i === 1 ? "amanhã" : DIAS[d].toLowerCase()} às ${CONFIG.horarios[d][0]}`};
  }
  return {aberto:false, texto:"Fechado"};
}
function atualizarStatus(){
  const s = statusLoja();
  $("#statusTexto").textContent = s.texto;
  $("#statusLoja").classList.toggle("aberto", s.aberto);
}

function preencherLoja(){
  atualizarStatus();
  setInterval(atualizarStatus, 60000);
  const cidadeUF = `${CONFIG.cidade} - ${CONFIG.estado}`;
  const enderecoCurto = juntar([CONFIG.endereco, CONFIG.bairro, CONFIG.cidade]);
  const consulta = encodeURIComponent(juntar([CONFIG.endereco, CONFIG.bairro, cidadeUF]));
  const saudacao = linkWhats(`Olá, ${CONFIG.nome}! Gostaria de mais informações.`);

  $("#barraEndereco").textContent = enderecoCurto;
  $$(".info-endereco").forEach(el => el.textContent = juntar([CONFIG.endereco, CONFIG.bairro, cidadeUF, CONFIG.cep]));
  $$(".link-whats").forEach(a => a.href = saudacao);
  $$(".link-insta").forEach(a => a.href = `https://instagram.com/${CONFIG.instagram}`);
  $$(".info-telefone").forEach(a => { a.href = `tel:+${CONFIG.whatsapp}`; a.textContent = CONFIG.telefoneExibicao; });
  $$(".info-whats-numero").forEach(el => el.textContent = CONFIG.telefoneExibicao);
  $$(".link-rota").forEach(a => a.href = `https://www.google.com/maps/dir/?api=1&destination=${consulta}`);

  if ($("#tabelaHorarios")){
    const hoje = new Date().getDay();
    $("#tabelaHorarios").innerHTML = [1,2,3,4,5,6,0].map(d => {
      const h = CONFIG.horarios[d];
      return `<tr class="${d === hoje ? "hoje" : ""}"><td>${DIAS[d]}</td><td>${h ? `${h[0]} às ${h[1]}` : "Fechado"}</td></tr>`;
    }).join("");
  }
  if ($("#mapa")){
    const src = CONFIG.mapaEmbed || `https://maps.google.com/maps?q=${consulta}&z=16&hl=pt-BR&output=embed`;
    $("#mapa").innerHTML = `<iframe title="Mapa da ${escapar(CONFIG.nome)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen src="${escapar(src)}"></iframe>
      <a class="mapa-abrir" href="https://www.google.com/maps/search/?api=1&query=${consulta}" target="_blank" rel="noopener">Abrir no Google Maps</a>`;
  }

  // dados para o Google
  const diasSchema = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context":"https://schema.org", "@type":"Bakery", "name":CONFIG.nome, "telephone":`+${CONFIG.whatsapp}`,
    "address":{"@type":"PostalAddress","streetAddress":CONFIG.endereco,"addressLocality":CONFIG.cidade,"addressRegion":CONFIG.estado,"postalCode":CONFIG.cep,"addressCountry":"BR"},
    "openingHoursSpecification":Object.entries(CONFIG.horarios).filter(([, h]) => h).map(([d, h]) => ({"@type":"OpeningHoursSpecification","dayOfWeek":diasSchema[d],"opens":h[0],"closes":h[1]})),
    "sameAs":[`https://instagram.com/${CONFIG.instagram}`]
  });
  document.head.appendChild(ld);
}

/* =========================================================
   CARTÕES DE LINHA E DE PRODUTO
   ========================================================= */
function cartaoLinha(c){
  const v = visual(c.id);
  return `<a class="linha-card ${c.id === "gourmet" ? "especial" : ""}" href="${urlLinha(c.id)}">
    <div class="linha-imagem ${c.foto ? "" : v.fundo}">${imagemOuArte(c.foto, c.id, c.nome)}</div>
    <h3>${escapar(c.nome)}</h3>
    <span class="link-fino">Descobrir</span>
  </a>`;
}

function cartaoProduto(p){
  // Na Linha Gourmet, ilustrações usam fundo claro para a página ficar mais leve
  const v = p.cat === "gourmet" ? {fundo:"fundo-blush", cor:"#60250D", acento:"#F2EBE2"} : visual(p.cat);
  const arte = p.foto ? `<img src="${escapar(p.foto)}" alt="${escapar(p.nome)}" loading="lazy">` : ilustracao(p.arte || ARTE_LINHA[p.cat] || p.cat, v.cor, v.acento);
  const linha = linhaPorId(p.cat);
  const acao = p.encomenda
    ? `<a class="btn" href="encomendas.html?tipo=${encodeURIComponent(p.encomenda)}">Encomendar</a>`
    : `<button class="btn" data-add="${escapar(p.id)}">Adicionar à seleção</button>`;
  const escolhas = p.escolhas ? `<div class="escolhas">${Object.entries(p.escolhas).map(([rotulo, opcoes]) => `
      <label><span>${escapar(rotulo)}</span><select data-escolha="${escapar(rotulo)}">${opcoes.map(o => `<option>${escapar(o)}</option>`).join("")}</select></label>`).join("")}
    </div>` : "";
  const sabores = (p.sabores || []).length
    ? `<details class="sabores"><summary>Sabores</summary><p>${p.sabores.map(escapar).join(" · ")}</p></details>` : "";
  return `<article class="produto">
    <div class="produto-imagem ${p.foto ? "" : v.fundo}">${arte}</div>
    <h3>${escapar(p.nome)}</h3>
    <p>${escapar(p.desc)}</p>
    ${sabores}
    ${escolhas}
    <div class="produto-acoes">
      ${acao}
      <a class="link-fino" target="_blank" rel="noopener" href="${linkWhats(`Olá, ${CONFIG.nome}! Tenho interesse em: ${p.nome}${linha ? ` (${linha.nome})` : ""}. Poderia me passar valores e disponibilidade?`)}">Pedir pelo WhatsApp</a>
    </div>
  </article>`;
}

/* =========================================================
   PÁGINA INICIAL
   ========================================================= */
let bannerAtual = 0, bannerTimer = null;
function iniciarBanners(){
  const trilho = $("#bannersTrilho");
  if (!trilho) return;
  trilho.innerHTML = BANNERS.map((b, i) => {
    const rotulo = `role="group" aria-roledescription="slide" aria-label="${i + 1} de ${BANNERS.length}"`;
    if (b.imagem){
      return `<a class="banner banner-imagem" href="${escapar(b.link)}" ${rotulo}><picture>
        ${b.imagemMobile ? `<source media="(max-width: 700px)" srcset="${escapar(b.imagemMobile)}">` : ""}
        <img src="${escapar(b.imagem)}" alt="${escapar(b.titulo.replace(/<[^>]+>/g, ""))}"></picture></a>`;
    }
    const escuro = b.tema === "terroso";
    const arte = b.foto ? `<img src="${escapar(b.foto)}" alt="">` : ilustracao(b.arte, escuro ? "#FAF6F1" : "#60250D", "#F4A1B0");
    return `<div class="banner tema-${b.tema}" ${rotulo} data-escuro="${escuro}">
      <div class="container banner-conteudo">
        <div><h2>${b.titulo}</h2><p>${escapar(b.texto)}</p>
          <a class="btn ${escuro ? "btn-claro" : "btn-escuro"}" href="${escapar(b.link)}">${escapar(b.botao)}</a></div>
        <div class="banner-arte"><div class="moldura ${b.foto ? "com-foto" : ""}">${arte}</div></div>
      </div>
    </div>`;
  }).join("");

  $("#bannerPontos").innerHTML = BANNERS.map((b, i) => `<button aria-label="Ver destaque ${i + 1}" data-banner="${i}"></button>`).join("");
  const unico = BANNERS.length < 2;
  $(".banner-controles").hidden = unico;
  mostrarBanner(0);
  if (unico) return;

  $("#bannerAnterior").addEventListener("click", () => { mostrarBanner(bannerAtual - 1); reiniciarBanner(); });
  $("#bannerProximo").addEventListener("click", () => { mostrarBanner(bannerAtual + 1); reiniciarBanner(); });
  $("#bannerPontos").addEventListener("click", e => { const b = e.target.closest("[data-banner]"); if (b){ mostrarBanner(+b.dataset.banner); reiniciarBanner(); } });
  const area = $("#banners");
  area.addEventListener("mouseenter", () => clearInterval(bannerTimer));
  area.addEventListener("mouseleave", reiniciarBanner);
  area.addEventListener("focusin", () => clearInterval(bannerTimer));
  let x0 = null;
  area.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, {passive:true});
  area.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45){ mostrarBanner(bannerAtual + (dx < 0 ? 1 : -1)); reiniciarBanner(); }
    x0 = null;
  });
  reiniciarBanner();
}
function mostrarBanner(i){
  bannerAtual = (i + BANNERS.length) % BANNERS.length;
  $("#bannersTrilho").style.transform = `translateX(-${bannerAtual * 100}%)`;
  $$("#bannersTrilho > .banner").forEach((el, n) => {
    el.setAttribute("aria-hidden", n !== bannerAtual);
    $$("a,button", el).forEach(a => a.tabIndex = n === bannerAtual ? 0 : -1);
    if (el.tagName === "A") el.tabIndex = n === bannerAtual ? 0 : -1;
    if (n === bannerAtual) $("#banners").classList.toggle("escuro", el.dataset.escuro === "true");
  });
  $$("#bannerPontos button").forEach((b, n) => b.setAttribute("aria-current", n === bannerAtual));
}
function reiniciarBanner(){
  clearInterval(bannerTimer);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || BANNERS.length < 2) return;
  bannerTimer = setInterval(() => mostrarBanner(bannerAtual + 1), 7000);
}

function iniciarInicio(){
  iniciarBanners();
  $("#gradeLinhas").classList.add("todas");
  $("#gradeLinhas").innerHTML = CATEGORIAS.map(cartaoLinha).join("");

  const gourmet = linhaPorId("gourmet");
  if (gourmet && $("#gourmetArte")){
    $("#gourmetArte").innerHTML = gourmet.foto ? `<img src="${escapar(gourmet.foto)}" alt="Linha Gourmet">` : ilustracao("gourmet", "#FAF6F1", "#F4A1B0");
    $("#gourmetLista").innerHTML = produtosDaLinha("gourmet").slice(0, 4)
      .map(p => `<li><a href="${urlLinha("gourmet")}">${escapar(p.nome)}</a><span>Ver</span></li>`).join("");
  }
  // depoimentos só aparecem quando houver depoimentos reais em dados.js
  $("#secaoDepoimentos").hidden = !DEPOIMENTOS.length;
  $("#depoimentos").innerHTML = DEPOIMENTOS.map(d =>
    `<figure class="depoimento"><p>“${escapar(d.texto)}”</p><span>${escapar(d.nome)}</span></figure>`).join("");
}

/* =========================================================
   PÁGINA DE PRODUTOS (todas as linhas ou uma linha)
   ========================================================= */
function iniciarProdutos(){
  const linha = linhaPorId(parametros.get("categoria"));
  $("#abasLinhas").innerHTML = `<a href="produtos.html" ${!linha ? 'aria-current="page"' : ""}>Todas</a>` +
    CATEGORIAS.map(c => `<a href="${urlLinha(c.id)}" ${linha && linha.id === c.id ? 'aria-current="page"' : ""}>${escapar(c.nome)}</a>`).join("");

  if (!linha){
    document.title = `Produtos | ${CONFIG.nome}`;
    $("#tituloPagina").textContent = "Nossos produtos";
    $("#descricaoPagina").textContent = "Escolha uma linha para conhecer os produtos.";
    $("#trilhaAtual").textContent = "Produtos";
    $("#trilhaProdutos").hidden = true;
    $("#gradePrincipal").className = "grade-linhas todas";
    $("#gradePrincipal").innerHTML = CATEGORIAS.map(cartaoLinha).join("");
    $("#outrasLinhas").hidden = true;
    return;
  }

  document.title = `${linha.nome} | ${CONFIG.nome}`;
  $("#tituloPagina").innerHTML = linha.id === "gourmet" ? "Linha <em>Gourmet</em>" : escapar(linha.nome);
  $("#descricaoPagina").textContent = linha.descricao;
  $("#trilhaAtual").textContent = linha.nome;
  $("#cabecalhoPagina").classList.toggle("areia", linha.id !== "gourmet" && visual(linha.id).fundo === "fundo-areia");

  const lista = produtosDaLinha(linha.id);
  $("#gradePrincipal").className = "grade-produtos";
  $("#gradePrincipal").innerHTML = lista.length ? lista.map(cartaoProduto).join("")
    : `<p class="vazio">Em breve novidades nesta linha. Fale com a gente pelo WhatsApp para saber o que temos hoje.</p>`;

  $("#gradeOutras").innerHTML = CATEGORIAS.filter(c => c.id !== linha.id).slice(0, 3).map(cartaoLinha).join("");
}

/* =========================================================
   SELEÇÃO (lista de pedido, sem preços)
   ========================================================= */
let selecao = {};
try { selecao = JSON.parse(localStorage.getItem("fantini_selecao") || "{}") || {}; } catch (e) { selecao = {}; }
function salvarSelecao(){ try { localStorage.setItem("fantini_selecao", JSON.stringify(selecao)); } catch (e) {} }

const SEP = "::";
const separarChave = chave => { const [id, variacao = ""] = chave.split(SEP); return {id, variacao}; };
const nomeItem = chave => { const {id, variacao} = separarChave(chave); const p = produtoPorId(id); return p ? p.nome + (variacao ? ` (${variacao})` : "") : ""; };

function adicionar(id, variacao = ""){
  const p = produtoPorId(id);
  if (!p) return;
  const chave = variacao ? id + SEP + variacao : id;
  selecao[chave] = Math.min((selecao[chave] || 0) + 1, 99);
  salvarSelecao(); renderSelecao();
  aviso(`${nomeItem(chave)} foi adicionado à sua seleção`);
}
function alterarQtd(id, delta){
  selecao[id] = Math.min((selecao[id] || 0) + delta, 99);
  if (selecao[id] <= 0) delete selecao[id];
  salvarSelecao(); renderSelecao();
}
const recebimento = () => $('input[name="recebimento"]:checked').value;

function renderSelecao(){
  Object.keys(selecao).forEach(ch => { if (!produtoPorId(separarChave(ch).id)) delete selecao[ch]; });
  const itens = Object.entries(selecao);
  $("#contador").textContent = itens.reduce((s, [, q]) => s + q, 0);
  $("#enviarSelecao").disabled = !itens.length;
  $("#formSelecao").hidden = !itens.length;
  $("#itensSelecao").innerHTML = itens.length ? itens.map(([id, q]) => {
    const p = produtoPorId(separarChave(id).id), l = linhaPorId(p.cat), nome = nomeItem(id);
    return `<div class="item">
      <span class="item-nome">${escapar(nome)}</span>
      <div class="qtd"><button data-menos="${escapar(id)}" aria-label="Diminuir ${escapar(nome)}">−</button><span>${q}</span><button data-mais="${escapar(id)}" aria-label="Aumentar ${escapar(nome)}">+</button></div>
      <span class="item-linha">${escapar(l ? l.nome : "")}</span>
    </div>`;
  }).join("") : `<div class="selecao-vazia"><p>Sua seleção está vazia.</p><a href="produtos.html" class="btn">Conhecer os produtos</a></div>`;
}

function abrirSelecao(){
  $("#gaveta").classList.add("aberta"); $("#gaveta").setAttribute("aria-hidden", "false");
  $("#fundoEscuro").classList.add("ativo"); document.body.style.overflow = "hidden";
  setTimeout(() => $("#fecharSelecao").focus(), 50);
}
function fecharSelecao(){
  $("#gaveta").classList.remove("aberta"); $("#gaveta").setAttribute("aria-hidden", "true");
  $("#fundoEscuro").classList.remove("ativo"); document.body.style.overflow = "";
}

function mensagemSelecao(d){
  const linhas = Object.entries(selecao).map(([ch, q]) => `• ${q}x ${nomeItem(ch)}`);
  let msg = `Olá, ${CONFIG.nome}! Gostaria de fazer um pedido:\n\n${linhas.join("\n")}\n\n`;
  msg += `Nome: ${d.nome}\nTelefone: ${d.telefone}\nRecebimento: ${d.recebimento === "entrega" ? "Entrega" : "Retirar na loja"}`;
  if (d.recebimento === "entrega") msg += `\nEndereço: ${d.endereco}`;
  msg += `\nPagamento: ${d.formaPagamento}`;
  if (d.obs) msg += `\nObservações: ${d.obs}`;
  msg += `\n\nPoderiam confirmar valores e disponibilidade?`;
  return msg;
}

function enviarSelecao(){
  const erro = $("#selErro");
  erro.textContent = "";
  const d = {
    nome: $("#selNome").value.trim(), telefone: $("#selTelefone").value.trim(), recebimento: recebimento(),
    endereco: $("#selEndereco").value.trim(), obs: $("#selObs").value.trim(),
    formaPagamento: $('input[name="selPagamento"]:checked').value
  };
  if (!Object.keys(selecao).length){ erro.textContent = "Adicione pelo menos um produto."; return; }
  if (!d.nome){ erro.textContent = "Informe seu nome."; $("#selNome").focus(); return; }
  if (soDigitos(d.telefone).length < 10){ erro.textContent = "Informe seu WhatsApp com DDD."; $("#selTelefone").focus(); return; }
  if (d.recebimento === "entrega" && d.endereco.length < 6){ erro.textContent = "Informe o endereço de entrega."; $("#selEndereco").focus(); return; }

  // o pedido segue para o WhatsApp da loja, onde o atendente finaliza pedido e pagamento
  window.open(linkWhats(mensagemSelecao(d)), "_blank", "noopener");
}

function iniciarSelecao(){
  document.addEventListener("click", e => {
    const add = e.target.closest("[data-add]");
    if (add){
      const cartao = add.closest(".produto");
      const variacao = cartao ? $$("[data-escolha]", cartao).map(sel => sel.value).join(", ") : "";
      adicionar(add.dataset.add, variacao);
    }
    const mais = e.target.closest("[data-mais]"); if (mais) alterarQtd(mais.dataset.mais, 1);
    const menos = e.target.closest("[data-menos]"); if (menos) alterarQtd(menos.dataset.menos, -1);
  });
  $("#abrirSelecao").addEventListener("click", abrirSelecao);
  $("#fecharSelecao").addEventListener("click", fecharSelecao);
  $("#fundoEscuro").addEventListener("click", fecharSelecao);
  document.addEventListener("keydown", e => { if (e.key === "Escape") fecharSelecao(); });
  $$('input[name="recebimento"]').forEach(r => r.addEventListener("change", () => { $("#campoEndereco").hidden = recebimento() !== "entrega"; }));
  $("#enviarSelecao").addEventListener("click", enviarSelecao);
  renderSelecao();
}

/* =========================================================
   PÁGINA DE ENCOMENDAS (sem valores)
   ========================================================= */
const dataISO = d => { const z = n => String(n).padStart(2, "0"); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; };
const marcados = sel => $$(`${sel} input:checked`).map(i => i.value);
const caixas = (lista, nome) => lista.map(r => `<label><input type="checkbox" name="${nome}" value="${escapar(r)}"> ${escapar(r)}</label>`).join("");

function iniciarEncomendas(){
  const E = ENCOMENDA;
  $("#encTamanho").innerHTML = E.tamanhos.map((t, i) => `<option value="${i}">${escapar(t)}</option>`).join("");
  $("#encKit").innerHTML = E.kits.map(k => `<option value="${k.id}">${escapar(k.nome)}: ${escapar(k.descricao.replace(/^Bolo de /, ""))}</option>`).join("");
  $("#encTopo").innerHTML = E.topos.map(t => `<option>${escapar(t)}</option>`).join("");
  $("#encRecheiosTrad").innerHTML = caixas(SABORES.recheiosTradicionais, "recheio");
  $("#encRecheiosEsp").innerHTML = caixas(SABORES.recheiosEspeciais, "recheio");
  $("#encDoces").innerHTML = caixas(SABORES.docesTradicionais, "doce");

  const minimo = new Date(); minimo.setDate(minimo.getDate() + CONFIG.diasAntecedencia);
  $("#encData").min = dataISO(minimo);
  $("#ajudaData").textContent = `A partir de ${minimo.toLocaleDateString("pt-BR")}`;
  $("#faqPrazo").textContent = `Pedimos pelo menos ${CONFIG.diasAntecedencia} dias de antecedência. Para bolos com decoração temática e Kit Festa, o ideal é encomendar com uma semana.`;

  const tipo = () => $('input[name="encTipo"]:checked').value;
  function atualizarTipo(){
    const t = tipo();
    $("#campoTamanho").hidden = t !== "bolo";
    $("#campoKit").hidden = t !== "kit";
    $("#campoDoces").hidden = t !== "kit";
    $("#grupoEspeciais").hidden = t === "kit";
    $("#notaKit").hidden = t !== "kit";
    $("#campoTopo").hidden = t === "kit";
    if (t === "kit") $$("#encRecheiosEsp input").forEach(i => { i.checked = false; });
    limitarRecheios();
  }
  function limitarRecheios(){
    const n = $$('input[name="recheio"]:checked').length;
    $$('input[name="recheio"]').forEach(i => { i.disabled = !i.checked && n >= 2; });
  }
  $$('input[name="encTipo"]').forEach(r => r.addEventListener("change", atualizarTipo));
  $("#campoRecheios").addEventListener("change", limitarRecheios);

  // chegada pelo botão "Encomendar" de um produto: encomendas.html?tipo=bolo | bento | kit-2
  const pedido = parametros.get("tipo") || "";
  if (pedido.startsWith("kit")){
    $('input[name="encTipo"][value="kit"]').checked = true;
    if (E.kits.some(k => k.id === pedido)) $("#encKit").value = pedido;
  } else if (pedido === "bento"){
    $('input[name="encTipo"][value="bento"]').checked = true;
  }
  atualizarTipo();
  if (pedido) setTimeout(() => $("#formEncomenda").scrollIntoView({behavior:"smooth", block:"start"}), 300);

  $("#formEncomenda").addEventListener("submit", e => {
    e.preventDefault();
    const erro = $("#encErro"); erro.textContent = "";
    const t = tipo();
    const nome = $("#encNome").value.trim(), telefone = $("#encTelefone").value.trim(), data = $("#encData").value;
    const recheios = marcados("#campoRecheios");
    const doces = marcados("#encDoces");
    if (!nome){ erro.textContent = "Informe seu nome."; $("#encNome").focus(); return; }
    if (soDigitos(telefone).length < 10){ erro.textContent = "Informe seu WhatsApp com DDD."; $("#encTelefone").focus(); return; }
    if (!recheios.length){ erro.textContent = "Escolha pelo menos um recheio."; return; }
    if (t === "kit" && !doces.length){ erro.textContent = "Escolha os sabores dos docinhos."; return; }
    if (!data){ erro.textContent = "Escolha a data de retirada."; $("#encData").focus(); return; }
    if (data < $("#encData").min){ erro.textContent = `Encomendas precisam de ${CONFIG.diasAntecedencia} dias de antecedência. ${$("#ajudaData").textContent}.`; return; }

    const [a, m, d] = data.split("-");
    const frase = $("#encFrase").value.trim(), obs = $("#encObs").value.trim();
    const kit = E.kits.find(k => k.id === $("#encKit").value);
    const forma = $('input[name="encPagamento"]:checked').value;
    const montar = () => {
      let msg = `Olá, ${CONFIG.nome}! Gostaria de fazer uma encomenda:\n\n`;
      if (t === "bolo") msg += `Bolo decorado: ${E.tamanhos[$("#encTamanho").value]}\n`;
      if (t === "bento") msg += `Bento cake\n`;
      if (t === "kit") msg += `Kit Festa: ${kit.nome} (${kit.descricao}, topo simples incluso)\n`;
      msg += `Recheio: ${recheios.join(" e ")}\n`;
      if (t === "kit") msg += `Docinhos: ${doces.join(", ")}\n`;
      if (t !== "kit") msg += `Topo de bolo: ${$("#encTopo").value}\n`;
      msg += `Retirada: ${d}/${m}/${a} às ${$("#encHora").value}\n`;
      if (frase) msg += `Escrita no bolo: "${frase}"\n`;
      if (obs) msg += `Observações: ${obs}\n`;
      return msg + `Pagamento: ${forma} (50% de entrada e o restante na entrega)\n\nNome: ${nome}\nTelefone: ${telefone}\n\nPoderiam me enviar o orçamento?`;
    };

    // a encomenda segue para o WhatsApp da loja, onde o atendente envia o orçamento e finaliza
    window.open(linkWhats(montar()), "_blank", "noopener");
  });
}

/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */
(function iniciar(){
  montarLayout();
  preencherLoja();
  iniciarSelecao();
  if (PAGINA === "inicio") iniciarInicio();
  if (PAGINA === "produtos") iniciarProdutos();
  if (PAGINA === "encomendas") iniciarEncomendas();
})();
