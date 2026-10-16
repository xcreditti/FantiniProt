/**
 * =========================================================
 *  FANTINI CONFEITARIA — BACKEND (Google Apps Script)
 *  Guarda pedidos numa planilha Google, cria pagamentos no
 *  Mercado Pago e alimenta o painel de pedidos (admin.html).
 *
 *  Este script deve ser criado DENTRO da planilha:
 *  Planilha > Extensões > Apps Script.
 *
 *  Segredos ficam em Configurações do projeto > Propriedades do script:
 *    ADMIN_SENHA      senha do painel (use uma senha forte)
 *    MP_ACCESS_TOKEN  Access Token de PRODUÇÃO do Mercado Pago
 *    SITE_URL         endereço do site, ex.: https://fantiniconfeitaria.com.br
 *    WEBAPP_URL       URL do app da web publicado (termina em /exec)
 * =========================================================
 */

/* ---------------- CONFIGURAÇÃO DA LOJA ---------------- */
const LOJA = {
  nome: 'Fantini Confeitaria',
  fuso: 'America/Sao_Paulo',
  pagamentoOnline: false,  // o site não mostra preços; deixe false
  entregaAtiva: true,      // false aceita só retirada
  taxaEntrega: 12,         // taxa fixa de entrega em R$ (0 para grátis)
  diasAntecedencia: 2,     // prazo mínimo para encomendas de bolo
  descricaoFatura: 'FANTINI' // aparece na fatura do cartão (até 13 letras)
};

/* Encomendas — mesmas opções de assets/dados.js do site.
   Os valores ficam só aqui e aparecem apenas no painel (estimativa). */
const ENCOMENDA = {
  tamanhos: [
    { nome: '10 a 15 fatias (aprox.)', tradicional: 155, especial: 190 },
    { nome: '20 a 30 fatias (aprox.)', tradicional: 190, especial: 220 },
    { nome: '35 a 40 fatias (aprox.)', tradicional: 275, especial: 310 },
    { nome: '50 fatias (aprox.)',      tradicional: 375, especial: 410 }
  ],
  bento: { tradicional: 45, especial: 0 }, // 0 = valor sob consulta
  kits: [
    { id: 'kit-1', nome: 'Kit 1', descricao: 'Bolo de 10 a 15 fatias e 30 docinhos', preco: 195 },
    { id: 'kit-2', nome: 'Kit 2', descricao: 'Bolo de 20 a 30 fatias e 60 docinhos', preco: 285 },
    { id: 'kit-3', nome: 'Kit 3', descricao: 'Bolo de 35 a 40 fatias e 100 docinhos', preco: 435 }
  ],
  topos: ['Sem topo', 'Topo simples', 'Topo personalizado'],
  recheiosTradicionais: ['Ninho', 'Brigadeiro', 'Coco', 'Amendoim', 'Moranguinho', 'Maracujá', 'Limão'],
  recheiosEspeciais: ['Ninho com Nutella', 'Morangos', 'Geleia de morango', 'Nozes', 'Abacaxi com coco', 'Abacaxi com ameixa', 'Ferrero Rocher', 'Ouro Branco'],
  docesTradicionais: ['Beijinho', 'Brigadeiro', 'Cajuzinho', 'Brigadeiro de Ninho', 'Paçoca', 'Meio a meio']
};

/* ---------------- ESTRUTURA DA PLANILHA ---------------- */
const ABA_PEDIDOS = 'Pedidos';
const ABA_PRODUTOS = 'Produtos';
const COLUNAS = ['id', 'criadoEm', 'tipo', 'canal', 'nome', 'telefone', 'recebimento', 'endereco',
  'retirada', 'itens', 'detalhes', 'taxaEntrega', 'total', 'pagamento', 'pagamentoStatus',
  'mpPagamentoId', 'status', 'obs', 'atualizadoEm'];
const COLUNAS_PRODUTOS = ['id', 'nome', 'categoria', 'descricao', 'preco', 'unidade', 'arte', 'destaque', 'ativo', 'foto', 'sabores', 'tambem', 'encomenda', 'escolhas'];

const STATUS_PEDIDO = ['Aguardando pagamento', 'Novo', 'Em preparo', 'Pronto', 'Concluído', 'Cancelado'];
const STATUS_PAGAMENTO = ['A combinar', 'Aguardando', 'Pago', 'Recusado', 'Estornado'];

/**
 * RODE ESTA FUNÇÃO UMA VEZ (botão ▶ Executar) para criar as abas
 * e preencher os produtos de exemplo.
 */
function configurar() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone(LOJA.fuso);

  let ped = ss.getSheetByName(ABA_PEDIDOS) || ss.insertSheet(ABA_PEDIDOS);
  ped.getRange(1, 1, ped.getMaxRows(), COLUNAS.length).setNumberFormat('@');
  ped.getRange(1, 1, 1, COLUNAS.length).setValues([COLUNAS]).setFontWeight('bold').setBackground('#5E1A2B').setFontColor('#ffffff');
  ped.setFrozenRows(1);

  let prod = ss.getSheetByName(ABA_PRODUTOS);
  if (!prod) {
    prod = ss.insertSheet(ABA_PRODUTOS);
    prod.getRange(1, 1, 1, COLUNAS_PRODUTOS.length).setValues([COLUNAS_PRODUTOS]).setFontWeight('bold').setBackground('#5E1A2B').setFontColor('#ffffff');
    prod.setFrozenRows(1);
    // preco 0 = preencher na planilha (o site nunca mostra os valores)
    const exemplos = [
      ["ge1", "Bolo decorado especial", "gourmet", "Recheios especiais e decoração feita à mão, de 10 a 50 fatias.", 190, "a partir de", "", true, true, "img/bolo-morangos.jpg", "Ninho com Nutella, Morangos, Geleia de morango, Nozes, Abacaxi com coco, Abacaxi com ameixa, Ferrero Rocher, Ouro Branco", "bolos", "bolo", ""],
      ["ge2", "Bento cake especial", "gourmet", "O mimo individual com os nossos recheios especiais.", 0, "sob consulta", "", true, true, "img/bento-cake.jpg", "Ninho com Nutella, Morangos, Geleia de morango, Nozes, Abacaxi com coco, Abacaxi com ameixa, Ferrero Rocher, Ouro Branco", "bento", "bento", ""],
      ["ge3", "Docinhos especiais", "gourmet", "Sabores especiais para deixar a mesa da festa ainda mais bonita.", 220, "", "", true, true, "img/docinhos.jpg", "Ninho e Ninho com Nutella, Brigadeiro de M&M's, Olho de sogra, Churros, Oreo, Ferrero Rocher", "doces", "", ""],
      ["b1", "Bolo decorado tradicional", "bolos", "Nossos recheios clássicos e decoração feita à mão, de 10 a 50 fatias.", 155, "a partir de", "", false, true, "img/bolo-confeitos.jpg", "Ninho, Brigadeiro, Coco, Amendoim, Moranguinho, Maracujá, Limão", "", "bolo", ""],
      ["bt1", "Bento cake tradicional", "bento", "Bolo individual com a mensagem que você quiser, em recheios clássicos.", 45, "unid.", "", false, true, "img/bento-cake.jpg", "Ninho, Brigadeiro, Coco, Amendoim, Moranguinho, Maracujá, Limão", "", "bento", ""],
      ["k1", "Kit Festa 1", "kits", "Bolo de 10 a 15 fatias e 30 docinhos, com topo simples incluso.", 195, "kit", "", false, true, "img/bolo-morangos.jpg", "", "", "kit-1", ""],
      ["k2", "Kit Festa 2", "kits", "Bolo de 20 a 30 fatias e 60 docinhos, com topo simples incluso.", 285, "kit", "", false, true, "img/docinhos.jpg", "", "", "kit-2", ""],
      ["k3", "Kit Festa 3", "kits", "Bolo de 35 a 40 fatias e 100 docinhos, com topo simples incluso.", 435, "kit", "", false, true, "img/bolo-confeitos.jpg", "", "", "kit-3", ""],
      ["d1", "Docinhos tradicionais", "doces", "Os clássicos de toda festa, feitos um a um.", 190, "", "", false, true, "img/docinhos.jpg", "Beijinho, Brigadeiro, Cajuzinho, Brigadeiro de Ninho, Paçoca, Meio a meio", "", "", ""],
      ["cp6", "Copo de morango com brownie", "copos", "Creme branco, brownie, morangos frescos e ganache de chocolate.", 0, "unid.", "", true, true, "img/copo-morango-brownie.jpg", "", "", "", ""],
      ["cp1", "Copo bombom de uva verde", "copos", "Camadas de creme e uva verde, finalizado com chocolate.", 0, "unid.", "copo", false, true, "", "", "", "", ""],
      ["cp2", "Copo Ferrero Rocher", "copos", "Camadas de cremes, crocante e Ferrero Rocher.", 0, "unid.", "copo", false, true, "", "", "gourmet", "", ""],
      ["cp3", "Copo bombom de morango", "copos", "Camadas de creme e morangos frescos, finalizado com chocolate.", 0, "unid.", "copo", false, true, "", "", "", "", ""],
      ["cp4", "Copo de maracujá com creme de chocolate", "copos", "Creme de maracujá intercalado com creme de chocolate.", 0, "unid.", "copo", false, true, "", "", "", "", ""],
      ["cp5", "Copo Ninho com Nutella", "copos", "Creme de Ninho com camadas de Nutella.", 0, "unid.", "copo", false, true, "", "", "gourmet", "", ""],
      ["br1", "Brownie de brigadeiro", "brownies", "Brownie coberto com brigadeiro e granulado.", 0, "unid.", "brownie", false, true, "", "", "", "", ""],
      ["br2", "Brownie Ferrero Rocher", "brownies", "Brownie com castanhas e Ferrero Rocher.", 0, "unid.", "brownie", false, true, "", "", "gourmet", "", ""],
      ["br3", "Brownie de maracujá com creme de chocolate", "brownies", "Brownie com creme de maracujá e creme de chocolate.", 0, "unid.", "brownie", false, true, "", "", "", "", ""],
      ["br4", "Brownie de Ninho", "brownies", "Brownie com cobertura cremosa de Ninho.", 0, "unid.", "brownie", false, true, "", "", "", "", ""],
      ["pa1", "Palha italiana de Oreo", "brownies", "Palha italiana com pedaços de Oreo.", 0, "unid.", "brownie", false, true, "", "", "", "", ""],
      ["pa2", "Palha italiana de Ninho com Nutella", "brownies", "Palha italiana de Ninho com cobertura de Nutella.", 0, "unid.", "brownie", false, true, "", "", "gourmet", "", ""],
      ["pa3", "Palha italiana de Ninho", "brownies", "Palha italiana de Ninho, macia e cremosa.", 0, "unid.", "brownie", false, true, "", "", "", "", ""],
      ["pa4", "Palha italiana de chocolate", "brownies", "Palha italiana de chocolate com granulado.", 0, "unid.", "brownie", false, true, "", "", "", "", ""],
      ["so1", "Torta de limão", "sobremesas", "Base crocante, recheio cremoso e azedinho na medida certa, coberta com chantilly suave.", 0, "fatia", "", true, true, "img/torta-limao.jpg", "", "", "", ""],
      ["pu1", "Pudim pequeno", "sobremesas", "Ideal para uma pessoa.", 0, "unid.", "", false, true, "img/pudim-pequeno.jpg", "", "", "", ""],
      ["pu2", "Pudim médio", "sobremesas", "Perfeito para o casal.", 0, "unid.", "", false, true, "img/pudim-medio.jpg", "", "", "", ""],
      ["pu3", "Pudim grande", "sobremesas", "Para toda a família.", 0, "unid.", "", false, true, "img/pudim-grande.jpg", "", "", "", ""],
      ["bp1", "Bombom de uva", "sobremesas", "Pote com creme, uva verde e cobertura de chocolate.", 0, "unid.", "", false, true, "img/bombom-uva.jpg", "", "", "", ""],
      ["bp2", "Bombom de morango", "sobremesas", "Pote com creme, morangos frescos e cobertura de chocolate.", 0, "unid.", "", false, true, "img/bombom-morango.jpg", "", "", "", ""],
      ["c1", "Bolo caseiro", "caseiros", "O sabor da sua infância, perfeito para compartilhar.", 40, "unid.", "", false, true, "img/caseiros-variedade.jpg", "", "", "", "Sabor: Limão, Cenoura, Maçã, Chocolate, Fubá, Banana, Café, Laranja, Mesclado; Tamanho: Mini, Padrão"],
      ["z1", "Bolo zero açúcar de fubá", "zero", "Fofinho e sem açúcar, com gostinho de fazenda.", 0, "unid.", "", false, true, "img/zero-fuba.jpg", "", "", "", "Tamanho: Mini, Padrão"],
      ["z2", "Bolo zero açúcar de cenoura", "zero", "Com cobertura de chocolate, sem açúcar.", 0, "unid.", "", false, true, "img/zero-cenoura.jpg", "", "", "", "Tamanho: Mini, Padrão"],
      ["z3", "Bolo zero açúcar de limão", "zero", "Com cobertura de limão, sem açúcar.", 0, "unid.", "", false, true, "img/zero-limao.jpg", "", "", "", "Tamanho: Mini, Padrão"],
      ["z4", "Bolo zero açúcar de laranja", "zero", "Com calda de laranja, sem açúcar.", 0, "unid.", "", false, true, "img/zero-laranja.jpg", "", "", "", "Tamanho: Mini, Padrão"],
      ["z5", "Bolo zero açúcar de pamonha", "zero", "Cremoso e sem açúcar, com sabor de milho verde.", 0, "unid.", "", false, true, "img/zero-pamonha.jpg", "", "", "", "Tamanho: Mini, Padrão"],
      ["gl1", "Geleia de morango", "geleias", "Copinho de 160 ml.", 0, "160 ml", "", false, true, "img/geleia-morango.jpg", "", "", "", ""],
      ["gl2", "Cobertura de chocolate", "geleias", "Copinho de 160 ml.", 0, "160 ml", "", false, true, "img/geleia-chocolate.jpg", "", "", "", ""],
      ["gl3", "Geleia de frutas vermelhas", "geleias", "Copinho de 160 ml.", 0, "160 ml", "", false, true, "img/geleia-frutas-vermelhas.jpg", "", "", "", ""],
      ["gl4", "Geleia de goiabada", "geleias", "Copinho de 160 ml.", 0, "160 ml", "", false, true, "img/geleia-goiabada.jpg", "", "", "", ""],
      ["gl5", "Creme de limão", "geleias", "Copinho de 160 ml.", 0, "160 ml", "", false, true, "img/geleia-limao.jpg", "", "", "", ""],
      ["gl6", "Creme de Ninho", "geleias", "Copinho de 160 ml.", 0, "160 ml", "", false, true, "img/geleia-ninho.jpg", "", "", "", ""]
    ];
    prod.getRange(2, 1, exemplos.length, COLUNAS_PRODUTOS.length).setValues(exemplos);
    prod.getRange(2, 8, 500, 2).insertCheckboxes();
    prod.getRange(1, 5).setNote('Valores só para o painel. O site não mostra preços.');
    prod.getRange(2, 5, 500, 1).setNumberFormat('0.00');
    prod.autoResizeColumns(1, COLUNAS_PRODUTOS.length);
  }
  Logger.log('Planilha configurada. Agora publique como app da web.');
}

/* ---------------- ENTRADAS DO APP DA WEB ---------------- */
function doGet(e) {
  const acao = (e && e.parameter && e.parameter.acao) || 'catalogo';
  try {
    if (acao === 'catalogo') return json(catalogo());
    if (acao === 'ping') return json({ ok: true });
    return json({ ok: false, erro: 'Ação desconhecida.' });
  } catch (err) {
    return json({ ok: false, erro: String(err.message || err) });
  }
}

function doPost(e) {
  try {
    const params = (e && e.parameter) || {};
    let corpo = {};
    if (e && e.postData && e.postData.contents) {
      try { corpo = JSON.parse(e.postData.contents); } catch (x) { corpo = {}; }
    }

    // Avisos automáticos do Mercado Pago
    if (params.origem === 'mp' || params.topic || params.type || corpo.type || corpo.topic || corpo.action) {
      if (!corpo.acao) return json(receberAvisoMercadoPago(params, corpo));
    }

    switch (corpo.acao) {
      case 'criarPedido':      return json(criarPedido(corpo));
      case 'statusPedido':     return json(statusPedidoPublico(corpo.id));
      case 'listarPedidos':    exigirSenha(corpo); return json(listarPedidos(corpo));
      case 'atualizarPedido':  exigirSenha(corpo); return json(atualizarPedido(corpo));
      case 'sincronizar':      exigirSenha(corpo); return json({ ok: true, pedido: sincronizarPagamento(corpo.id) });
      case 'login':            exigirSenha(corpo); return json({ ok: true, loja: LOJA.nome });
      default:                 return json({ ok: false, erro: 'Ação desconhecida.' });
    }
  } catch (err) {
    return json({ ok: false, erro: String(err.message || err) });
  }
}

/* ---------------- CATÁLOGO ---------------- */
function catalogo() {
  return {
    ok: true,
    // o site não mostra preços, então eles não saem da planilha
    produtos: lerProdutos().filter(p => p.ativo).map(p => { const c = Object.assign({}, p); delete c.preco; return c; }),
    loja: {
      pagamentoOnline: LOJA.pagamentoOnline && !!prop('MP_ACCESS_TOKEN'),
      entregaAtiva: LOJA.entregaAtiva,
      taxaEntrega: LOJA.taxaEntrega,
      diasAntecedencia: LOJA.diasAntecedencia
    }
  };
}

function lerProdutos() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ABA_PRODUTOS);
  if (!sh || sh.getLastRow() < 2) return [];
  const linhas = sh.getRange(2, 1, sh.getLastRow() - 1, COLUNAS_PRODUTOS.length).getValues();
  const sim = v => v === true || String(v).toLowerCase() === 'sim' || String(v).toUpperCase() === 'TRUE';
  return linhas
    .filter(l => String(l[0]).trim() && String(l[1]).trim())
    .map(l => ({
      id: String(l[0]).trim(),
      nome: String(l[1]).trim(),
      cat: String(l[2]).trim().toLowerCase(),
      desc: String(l[3]).trim(),
      preco: Number(l[4]) || 0,
      unidade: String(l[5]).trim() || 'unid.',
      arte: String(l[6]).trim(),
      destaque: sim(l[7]),
      ativo: sim(l[8]),
      foto: String(l[9]).trim(),
      sabores: String(l[10] || '').split(',').map(x => x.trim()).filter(String),
      tambem: String(l[11] || '').split(',').map(x => x.trim().toLowerCase()).filter(String),
      encomenda: String(l[12] || '').trim(),
      escolhas: lerEscolhas(l[13])
    }));
}

// "Sabor: Limão, Cenoura; Tamanho: Mini, Padrão" -> {Sabor:[...], Tamanho:[...]}
function lerEscolhas(texto) {
  const r = {};
  String(texto || '').split(';').forEach(parte => {
    const [rotulo, lista] = parte.split(':');
    if (rotulo && lista) r[rotulo.trim()] = lista.split(',').map(x => x.trim()).filter(String);
  });
  return Object.keys(r).length ? r : undefined;
}

/* ---------------- CRIAR PEDIDO ---------------- */
function criarPedido(b) {
  const nome = limpar(b.nome, 80);
  const telefone = String(b.telefone || '').replace(/\D/g, '').slice(0, 13);
  if (!nome) throw new Error('Informe seu nome.');
  if (telefone.length < 10) throw new Error('Informe um telefone com DDD.');

  const tipo = b.tipo === 'encomenda' ? 'encomenda' : 'vitrine';
  const pedido = {
    id: '', criadoEm: agora(), tipo, canal: 'site', nome, telefone,
    recebimento: 'Retirar na loja', endereco: '', retirada: '', itens: '[]', detalhes: '',
    taxaEntrega: 0, total: 0, pagamento: 'A combinar', pagamentoStatus: 'A combinar',
    mpPagamentoId: '', status: 'Novo', obs: limpar(b.obs, 400), atualizadoEm: agora()
  };
  let linhasItens = [];

  if (tipo === 'vitrine') {
    const produtos = {};
    lerProdutos().filter(p => p.ativo).forEach(p => { produtos[p.id] = p; });
    const itens = Array.isArray(b.itens) ? b.itens.slice(0, 60) : [];
    itens.forEach(i => {
      const p = produtos[String(i.id)];
      const qtd = Math.floor(Number(i.qtd));
      if (!p || !(qtd >= 1 && qtd <= 99)) return;
      const variacao = limpar(i.variacao, 60);
      const nome = p.nome + (variacao ? ` (${variacao})` : '');
      linhasItens.push({ id: p.id, nome, qtd, preco: p.preco, unidade: p.unidade, subtotal: arred(p.preco * qtd) });
    });
    if (!linhasItens.length) throw new Error('A sacola está vazia ou algum item não está mais disponível. Atualize a página.');

    if (b.recebimento === 'entrega') {
      if (!LOJA.entregaAtiva) throw new Error('No momento fazemos apenas retirada na loja.');
      const end = limpar(b.endereco, 200);
      if (end.length < 6) throw new Error('Informe o endereço de entrega.');
      pedido.recebimento = 'Entrega';
      pedido.endereco = end;
      pedido.taxaEntrega = LOJA.taxaEntrega;
    }
    pedido.itens = JSON.stringify(linhasItens);
    pedido.total = arred(linhasItens.reduce((s, l) => s + l.subtotal, 0) + pedido.taxaEntrega);
    pedido.detalhes = linhasItens.map(l => `${l.qtd}x ${l.nome}`).join(', ');

    if (b.pagamento === 'online') {
      if (!LOJA.pagamentoOnline || !prop('MP_ACCESS_TOKEN')) throw new Error('Pagamento pelo site indisponível no momento. Escolha pagar na retirada.');
      pedido.pagamento = 'Online (Mercado Pago)';
      pedido.pagamentoStatus = 'Aguardando';
      pedido.status = 'Aguardando pagamento';
    } else {
      const formas = ['Pix', 'Cartão de crédito', 'Cartão de débito', 'Dinheiro'];
      pedido.pagamento = formas.indexOf(b.formaPagamento) >= 0 ? b.formaPagamento + ' na retirada/entrega' : 'A combinar';
      pedido.canal = 'whatsapp';
    }
  } else {
    // Encomenda (bolo decorado, bento cake ou Kit Festa): valor estimado, só para o painel
    const e = b.encomenda || {};
    const tipoEnc = ['bolo', 'bento', 'kit'].indexOf(e.tipo) >= 0 ? e.tipo : null;
    if (!tipoEnc) throw new Error('Escolha o tipo de encomenda.');
    const todos = ENCOMENDA.recheiosTradicionais.concat(tipoEnc === 'kit' ? [] : ENCOMENDA.recheiosEspeciais);
    const recheios = (Array.isArray(e.recheios) ? e.recheios : []).filter(r => todos.indexOf(r) >= 0).slice(0, 2);
    if (!recheios.length) throw new Error('Escolha pelo menos um recheio.');
    const especial = recheios.some(r => ENCOMENDA.recheiosEspeciais.indexOf(r) >= 0);
    const topo = ENCOMENDA.topos.indexOf(e.topo) >= 0 ? e.topo : 'Sem topo';

    const data = String(e.data || '');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) throw new Error('Escolha a data de retirada.');
    const minimo = new Date(); minimo.setDate(minimo.getDate() + LOJA.diasAntecedencia);
    if (data < Utilities.formatDate(minimo, LOJA.fuso, 'yyyy-MM-dd')) throw new Error(`Encomendas precisam de ${LOJA.diasAntecedencia} dias de antecedência.`);
    const hora = /^\d{2}:\d{2}$/.test(String(e.hora)) ? e.hora : '10:00';
    const [a, m, d] = data.split('-');

    let titulo = '', valor = 0, partes = [];
    if (tipoEnc === 'bolo') {
      const tam = ENCOMENDA.tamanhos[Number(e.tamanho)];
      if (!tam) throw new Error('Escolha o tamanho do bolo.');
      titulo = `Bolo decorado ${especial ? 'especial' : 'tradicional'}, ${tam.nome}`;
      valor = especial ? tam.especial : tam.tradicional;
    } else if (tipoEnc === 'bento') {
      titulo = `Bento cake ${especial ? 'especial' : 'tradicional'}`;
      valor = especial ? ENCOMENDA.bento.especial : ENCOMENDA.bento.tradicional;
    } else {
      const kit = ENCOMENDA.kits.filter(k => k.id === e.kit)[0];
      if (!kit) throw new Error('Escolha o kit.');
      const doces = (Array.isArray(e.doces) ? e.doces : []).filter(x => ENCOMENDA.docesTradicionais.indexOf(x) >= 0);
      if (!doces.length) throw new Error('Escolha os sabores dos docinhos.');
      titulo = `Kit Festa ${kit.nome.replace('Kit ', '')} (${kit.descricao})`;
      valor = kit.preco;
      partes.push('docinhos ' + doces.join(', '));
    }
    partes.unshift('recheio ' + recheios.join(' e '));
    if (tipoEnc === 'kit') partes.push('topo simples incluso');
    else partes.push(topo === 'Sem topo' ? 'sem topo' : topo.toLowerCase() + ' (valor à parte)');
    if (e.frase) partes.push(`escrita: "${limpar(e.frase, 40)}"`);

    pedido.retirada = `${d}/${m}/${a} ${hora}`;
    pedido.itens = JSON.stringify([{ id: 'encomenda', nome: titulo, qtd: 1, preco: valor, unidade: 'unid.', subtotal: valor }]);
    pedido.detalhes = titulo + '; ' + partes.join('; ') + (valor ? '' : '; valor sob consulta');
    pedido.total = valor;
    pedido.canal = 'whatsapp';
    pedido.pagamento = '50% de entrada e restante na entrega';
  }

  // Grava com trava para não repetir número de pedido
  const trava = LockService.getScriptLock();
  trava.waitLock(15000);
  try {
    const props = PropertiesService.getScriptProperties();
    const n = Number(props.getProperty('CONTADOR') || '0') + 1;
    props.setProperty('CONTADOR', String(n));
    pedido.id = 'F' + String(n).padStart(4, '0');
    abaPedidos().appendRow(COLUNAS.map(c => String(pedido[c] === undefined ? '' : pedido[c])));
  } finally {
    trava.releaseLock();
  }

  const resposta = { ok: true, id: pedido.id, total: pedido.total, taxaEntrega: pedido.taxaEntrega, itens: linhasItens };

  if (pedido.status === 'Aguardando pagamento') {
    const pref = criarPreferenciaMercadoPago(pedido, linhasItens);
    if (!pref.ok) {
      atualizarLinha(pedido.id, { pagamentoStatus: 'Recusado', status: 'Cancelado', obs: (pedido.obs + ' [erro ao gerar pagamento]').trim() });
      throw new Error('Não foi possível abrir o pagamento agora. Tente novamente ou escolha pagar na retirada.');
    }
    resposta.checkoutUrl = pref.url;
  }
  return resposta;
}

/* ---------------- MERCADO PAGO ---------------- */
function criarPreferenciaMercadoPago(pedido, linhasItens) {
  const token = prop('MP_ACCESS_TOKEN');
  const site = (prop('SITE_URL') || '').replace(/\/+$/, '');
  const webapp = prop('WEBAPP_URL') || ScriptApp.getService().getUrl();

  const items = linhasItens.map(l => ({
    id: l.id, title: l.nome, quantity: l.qtd, unit_price: arred(l.preco), currency_id: 'BRL'
  }));
  if (pedido.taxaEntrega > 0) items.push({ id: 'entrega', title: 'Taxa de entrega', quantity: 1, unit_price: arred(pedido.taxaEntrega), currency_id: 'BRL' });

  const voltar = st => `${site}/?pedido=${pedido.id}&retorno=${st}`;
  const corpo = {
    items,
    external_reference: pedido.id,
    payer: { name: pedido.nome },
    statement_descriptor: LOJA.descricaoFatura,
    notification_url: webapp + '?origem=mp',
    metadata: { pedido: pedido.id }
  };
  if (/^https:\/\//.test(site)) {
    corpo.back_urls = { success: voltar('aprovado'), pending: voltar('pendente'), failure: voltar('recusado') };
    corpo.auto_return = 'approved';
  }

  const r = UrlFetchApp.fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true,
    headers: { Authorization: 'Bearer ' + token },
    payload: JSON.stringify(corpo)
  });
  const cod = r.getResponseCode();
  if (cod < 200 || cod >= 300) {
    Logger.log('Erro Mercado Pago %s: %s', cod, r.getContentText());
    return { ok: false };
  }
  const dados = JSON.parse(r.getContentText());
  return { ok: true, url: dados.init_point };
}

function receberAvisoMercadoPago(params, corpo) {
  const tipo = corpo.type || params.type || params.topic || '';
  if (tipo && tipo !== 'payment') return { ok: true };
  const pagamentoId = (corpo.data && corpo.data.id) || params['data.id'] || params.id;
  if (!pagamentoId) return { ok: true };
  const pg = buscarPagamento(pagamentoId); // conferido direto na API, não confia no aviso
  if (pg && pg.external_reference) aplicarPagamento(pg.external_reference, pg);
  return { ok: true };
}

function buscarPagamento(id) {
  const r = UrlFetchApp.fetch('https://api.mercadopago.com/v1/payments/' + encodeURIComponent(id), {
    headers: { Authorization: 'Bearer ' + prop('MP_ACCESS_TOKEN') }, muteHttpExceptions: true
  });
  return r.getResponseCode() === 200 ? JSON.parse(r.getContentText()) : null;
}

function sincronizarPagamento(pedidoId) {
  const atual = lerPedido(pedidoId);
  if (!atual) throw new Error('Pedido não encontrado.');
  if (atual.pagamento.indexOf('Online') !== 0 || !prop('MP_ACCESS_TOKEN')) return atual;
  const url = 'https://api.mercadopago.com/v1/payments/search?sort=date_created&criteria=desc&external_reference=' + encodeURIComponent(pedidoId);
  const r = UrlFetchApp.fetch(url, { headers: { Authorization: 'Bearer ' + prop('MP_ACCESS_TOKEN') }, muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) return atual;
  const lista = (JSON.parse(r.getContentText()).results) || [];
  if (!lista.length) return atual;
  const pg = lista.filter(p => p.status === 'approved')[0] || lista[0];
  aplicarPagamento(pedidoId, pg);
  return lerPedido(pedidoId);
}

function aplicarPagamento(pedidoId, pg) {
  const atual = lerPedido(pedidoId);
  if (!atual) return;
  // Não troca um pagamento aprovado por uma tentativa recusada posterior
  if (atual.pagamentoStatus === 'Pago' && pg.status !== 'approved' && pg.status !== 'refunded' && pg.status !== 'charged_back') return;

  const mapa = {
    approved: 'Pago', authorized: 'Aguardando', pending: 'Aguardando', in_process: 'Aguardando', in_mediation: 'Aguardando',
    rejected: 'Recusado', cancelled: 'Recusado', refunded: 'Estornado', charged_back: 'Estornado'
  };
  const novo = { pagamentoStatus: mapa[pg.status] || 'Aguardando', mpPagamentoId: String(pg.id) };

  // confere o valor pago com o total do pedido
  if (novo.pagamentoStatus === 'Pago' && Math.abs(Number(pg.transaction_amount) - Number(atual.total)) > 0.05) {
    novo.obs = (atual.obs + ' [ATENÇÃO: valor pago diferente do total]').trim();
  }
  if (novo.pagamentoStatus === 'Pago' && atual.status === 'Aguardando pagamento') novo.status = 'Novo';
  if (novo.pagamentoStatus === 'Estornado') novo.status = 'Cancelado';
  atualizarLinha(pedidoId, novo);
}

function statusPedidoPublico(id) {
  if (!/^F\d{4,}$/.test(String(id))) throw new Error('Pedido inválido.');
  const p = sincronizarPagamento(String(id));
  // devolve só o necessário para o cliente
  return { ok: true, id: p.id, status: p.status, pagamentoStatus: p.pagamentoStatus, total: Number(p.total) };
}

/* ---------------- PAINEL ---------------- */
function exigirSenha(b) {
  const senha = prop('ADMIN_SENHA');
  if (!senha) throw new Error('Defina ADMIN_SENHA nas propriedades do script.');
  if (String(b.senha || '') !== senha) {
    Utilities.sleep(1200); // dificulta tentativas em sequência
    throw new Error('Senha incorreta.');
  }
}

function listarPedidos(b) {
  const sh = abaPedidos();
  const total = sh.getLastRow() - 1;
  if (total < 1) return { ok: true, pedidos: [], agora: agora() };
  const limite = Math.min(total, Number(b.limite) || 400);
  const valores = sh.getRange(sh.getLastRow() - limite + 1, 1, limite, COLUNAS.length).getValues();
  const pedidos = valores.map(paraObjeto).reverse();
  return { ok: true, pedidos, agora: agora(), statusPedido: STATUS_PEDIDO, statusPagamento: STATUS_PAGAMENTO };
}

function atualizarPedido(b) {
  const mudanca = {};
  if (b.status !== undefined) {
    if (STATUS_PEDIDO.indexOf(b.status) < 0) throw new Error('Status inválido.');
    mudanca.status = b.status;
  }
  if (b.pagamentoStatus !== undefined) {
    if (STATUS_PAGAMENTO.indexOf(b.pagamentoStatus) < 0) throw new Error('Status de pagamento inválido.');
    mudanca.pagamentoStatus = b.pagamentoStatus;
  }
  if (!atualizarLinha(String(b.id), mudanca)) throw new Error('Pedido não encontrado.');
  return { ok: true, pedido: lerPedido(String(b.id)) };
}

/* ---------------- PLANILHA ---------------- */
function abaPedidos() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ABA_PEDIDOS);
  if (!sh) throw new Error('Rode a função configurar() primeiro.');
  return sh;
}

function linhaDoPedido(id) {
  const sh = abaPedidos();
  if (sh.getLastRow() < 2) return -1;
  const ids = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues();
  for (let i = ids.length - 1; i >= 0; i--) if (String(ids[i][0]) === id) return i + 2;
  return -1;
}

function lerPedido(id) {
  const linha = linhaDoPedido(id);
  if (linha < 0) return null;
  return paraObjeto(abaPedidos().getRange(linha, 1, 1, COLUNAS.length).getValues()[0]);
}

function atualizarLinha(id, mudanca) {
  const trava = LockService.getScriptLock();
  trava.waitLock(15000);
  try {
    const linha = linhaDoPedido(id);
    if (linha < 0) return false;
    const sh = abaPedidos();
    mudanca.atualizadoEm = agora();
    Object.keys(mudanca).forEach(c => {
      const col = COLUNAS.indexOf(c);
      if (col >= 0) sh.getRange(linha, col + 1).setValue(String(mudanca[c]));
    });
    return true;
  } finally {
    trava.releaseLock();
  }
}

function paraObjeto(linha) {
  const o = {};
  COLUNAS.forEach((c, i) => { o[c] = linha[i] instanceof Date ? Utilities.formatDate(linha[i], LOJA.fuso, 'yyyy-MM-dd HH:mm') : String(linha[i]); });
  try { o.itens = JSON.parse(o.itens || '[]'); } catch (e) { o.itens = []; }
  o.total = Number(o.total) || 0;
  o.taxaEntrega = Number(o.taxaEntrega) || 0;
  return o;
}

/* ---------------- AUXILIARES ---------------- */
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
function prop(nome) { return PropertiesService.getScriptProperties().getProperty(nome); }
function agora() { return Utilities.formatDate(new Date(), LOJA.fuso, 'yyyy-MM-dd HH:mm'); }
function arred(v) { return Math.round(Number(v) * 100) / 100; }
function limpar(v, max) {
  // remove quebras e o "=" inicial (evita fórmulas na planilha)
  return String(v || '').replace(/[\r\n\t]+/g, ' ').replace(/^[=+\-@]+/, '').trim().slice(0, max);
}
