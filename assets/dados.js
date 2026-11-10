/* =========================================================
   FANTINI CONFEITARIA — DADOS DO SITE
   Aqui ficam todos os dados do site: textos, produtos, fotos, horários.
   Para mudar algo no site, edite este arquivo e envie de novo para a hospedagem.
   ========================================================= */

/* ---------------- LOJA ---------------- */
var CONFIG = {
  nome: "Fantini Confeitaria",
  whatsapp: "5531990208652",           // 55 + DDD + número, só dígitos
  telefoneExibicao: "(31) 99020-8652",
  endereco: "Rua Francisco Bicalho, 2250 B",
  bairro: "",                          // ex.: "Padre Eustáquio" (vazio não aparece)
  cidade: "Belo Horizonte",
  estado: "MG",
  cep: "",                             // ex.: "30720-000" (vazio não aparece)
  // Mapa oficial: Google Maps > Compartilhar > Incorporar um mapa > copie só o endereço de src="..."
  mapaEmbed: "",
  instagram: "fantiniconfeitaria",     // sem o @
  diasAntecedencia: 2,                 // prazo mínimo para encomendas de bolo
  // 0 = domingo ... 6 = sábado. null = fechado.
  horarios: {
    0: ["09:00", "12:00"],
    1: ["09:00", "18:00"],
    2: ["09:00", "18:00"],
    3: ["09:00", "18:00"],
    4: ["09:00", "18:00"],
    5: ["09:00", "18:00"],
    6: ["09:00", "18:00"]
  }
};

/* ---------------- LINHAS (categorias) ----------------
   Cada linha tem a sua própria página: produtos.html?categoria=<id>
   foto: capa da linha. Vazio usa a ilustração. */
var CATEGORIAS = [
  {id:"bolos",      nome:"Bolos decorados", foto:"img/bolo-flor.jpg",
   descricao:"O centro das atenções da sua festa, de 10 a 50 fatias, em sabores tradicionais e especiais."},
  {id:"bento",      nome:"Bento cake", foto:"img/bento-cake.jpg",
   descricao:"Pequeno no tamanho e grande na mensagem: o mimo perfeito para surpreender alguém."},
  {id:"kits",       nome:"Kit Festa", foto:"img/kit-festa.jpg",
   descricao:"Bolo e docinhos na medida certa para a sua comemoração, com topo simples incluso."},
  {id:"doces",      nome:"Docinhos de festa", foto:"img/docinhos-especiais.jpg",
   descricao:"Docinhos artesanais que derretem na boca, feitos um a um."},
  {id:"coxinha",    nome:"Coxinha de morango", foto:"img/morango-cravejado.jpg",
   descricao:"Morango fresco envolvido em brigadeiro, no formato de coxinha."},
  {id:"copos",      nome:"Copo da Felicidade", foto:"img/copo-morango.jpg",
   descricao:"Dose de alegria em cada camada: cremes, frutas e chocolate no copo."},
  {id:"brownies",   nome:"Brownies e palhas italianas", foto:"img/brownie-recheio-maracuja.jpg",
   descricao:"Dose de alegria em cada pedaço, nas coleções Brownie e Palhas Italianas."},
  {id:"sobremesas", nome:"Tortas e sobremesas", foto:"img/torta-limao.jpg",
   descricao:"Torta de limão, pudim, mousses, bombons de pote e bolos no pote para adoçar qualquer momento."},
  {id:"caseiros",   nome:"Bolos caseiros", foto:"img/broa-queijo.jpg",
   descricao:"O sabor da sua infância, perfeito para compartilhar. Bolos redondos, nos tamanhos mini e padrão."},
  {id:"zero",       nome:"Bolos zero açúcar", foto:"img/zero-chocolate.jpg",
   descricao:"Bolos retangulares sem açúcar, com todo o sabor. Nos tamanhos mini e padrão."},
  {id:"geleias",    nome:"Geleias e coberturas", foto:"img/geleia-chocolate.jpg",
   descricao:"Geleias e coberturas à parte, em copinhos de 160 ml, para acompanhar o que você quiser."}
];

/* Sabores do cardápio (usados nos produtos e no formulário de encomenda) */
var SABORES = {
  recheiosTradicionais: ["Ninho", "Brigadeiro", "Coco", "Amendoim", "Moranguinho", "Maracujá", "Limão"],
  recheiosEspeciais: ["Ninho com Nutella", "Morangos", "Geleia de morango", "Nozes", "Abacaxi com coco", "Abacaxi com ameixa", "Ferrero Rocher", "Ouro Branco"],
  docesTradicionais: ["Beijinho", "Brigadeiro", "Cajuzinho", "Brigadeiro de Ninho", "Paçoca", "Meio a meio"],
  docesEspeciais: ["Ninho e Ninho com Nutella", "Brigadeiro de M&M's", "Olho de sogra", "Churros", "Oreo", "Ferrero Rocher"],
  caseiros: ["Limão", "Cenoura", "Maçã", "Chocolate", "Fubá", "Banana", "Café", "Laranja", "Mesclado"]
};

/* Enfeites dos bolos decorados (aparecem nos cartões) */
var ENFEITES = ["Chantilly", "Frutas frescas", "Confeitos coloridos", "Laço de cetim", "Escrita personalizada", "Topo de bolo (à parte)"];

/* ---------------- PRODUTOS ----------------
   Os preços NÃO aparecem no site: o atendente informa os valores pelo WhatsApp.
   cat: linha principal | tambem: outras linhas onde o produto também aparece
   sabores: lista de sabores exibida no cartão
   detalhes: grupos exibidos no cartão, ex.: {"Recheios": [...], "Enfeites": [...]}
   encomenda: "bolo" | "bento" | "kit-1" | "kit-2" | "kit-3" -> o botão leva ao formulário de encomenda
   escolhas: opções que o cliente escolhe antes de adicionar (ex.: Sabor, Tamanho)
   Sem "encomenda", o botão adiciona o produto à seleção.
   foto: caminho da foto. Vazio usa a ilustração (arte: bolos, tortas, doces, copo, brownie, pote, coxinha). */
var PRODUTOS = [
  {id:"ge1", nome:"Bolo decorado especial", cat:"bolos", encomenda:"bolo", desc:"Recheios especiais e decoração feita à mão, de 10 a 50 fatias.", detalhes:{"Recheios especiais":SABORES.recheiosEspeciais, "Enfeites":ENFEITES}, foto:"img/bolo-especial.jpg"},
  {id:"ge2", nome:"Bento cake especial", cat:"bento", encomenda:"bento", desc:"Bolo individual com a mensagem que você quiser, em recheios especiais.", detalhes:{"Recheios especiais":SABORES.recheiosEspeciais}, foto:"img/bento-cake.jpg"},
  {id:"ge3", nome:"Docinhos especiais", cat:"doces", desc:"Sabores especiais para deixar a mesa da festa ainda mais bonita.", sabores:SABORES.docesEspeciais, foto:"img/docinhos-especiais.jpg"},

  /* bolos */
  {id:"b1", nome:"Bolo decorado tradicional", cat:"bolos", encomenda:"bolo", desc:"Nossos recheios clássicos e decoração feita à mão, de 10 a 50 fatias.", detalhes:{"Recheios tradicionais":SABORES.recheiosTradicionais, "Enfeites":ENFEITES}, foto:"img/bolo-lacos.jpg"},

  /* bento */
  {id:"bt1", nome:"Bento cake tradicional", cat:"bento", encomenda:"bento", desc:"Bolo individual com a mensagem que você quiser, em recheios clássicos.", detalhes:{"Recheios tradicionais":SABORES.recheiosTradicionais}, foto:"img/bento-cake.jpg"},

  /* kits */
  {id:"k1", nome:"Kit Festa 1", cat:"kits", encomenda:"kit-1", desc:"Bolo de 10 a 15 fatias e 30 docinhos, com topo simples incluso. Sabores especiais sob consulta.", detalhes:{"Recheios do bolo":SABORES.recheiosTradicionais, "Docinhos":SABORES.docesTradicionais}, foto:"img/kit-festa.jpg"},
  {id:"k2", nome:"Kit Festa 2", cat:"kits", encomenda:"kit-2", desc:"Bolo de 20 a 30 fatias e 60 docinhos, com topo simples incluso. Sabores especiais sob consulta.", detalhes:{"Recheios do bolo":SABORES.recheiosTradicionais, "Docinhos":SABORES.docesTradicionais}, foto:"img/kit-festa-2.jpg"},
  {id:"k3", nome:"Kit Festa 3", cat:"kits", encomenda:"kit-3", desc:"Bolo de 35 a 40 fatias e 100 docinhos, com topo simples incluso. Sabores especiais sob consulta.", detalhes:{"Recheios do bolo":SABORES.recheiosTradicionais, "Docinhos":SABORES.docesTradicionais}, foto:"img/kit-festa-3.jpg"},

  /* doces */
  {id:"d1", nome:"Docinhos tradicionais", cat:"doces", desc:"Os clássicos de toda festa, feitos um a um.", sabores:SABORES.docesTradicionais, foto:"img/docinhos-tradicionais.jpg"},

  /* coxinha de morango */
  {id:"mc1", nome:"Morango cravejado do amor", cat:"coxinha", desc:"Morango fresco envolvido em brigadeiro branco e cravejado de pedacinhos vermelhos.", foto:"img/morango-cravejado.jpg"},
  {id:"cx1", nome:"Coxinha de morango", cat:"coxinha", desc:"Morango fresco envolvido em brigadeiro, no formato de coxinha.", foto:"", arte:"coxinha"},

  /* copos */
  {id:"cp2", nome:"Copo Ferrero Rocher", cat:"copos", desc:"Creme de chocolate, pedaços de brownie, castanhas e Ferrero Rocher.", foto:"img/copo-ferrero.jpg"},
  {id:"cp7", nome:"Copo de creme de Ninho com brownie", cat:"copos", desc:"Camadas de creme de Ninho e pedaços de brownie.", foto:"img/copo-ninho-brownie.jpg"},
  {id:"cp1", nome:"Copo de creme de Ninho com uvas", cat:"copos", desc:"Camadas de creme de Ninho e uvas verdes.", foto:"img/copo-uva-verde.jpg"},
  {id:"cp3", nome:"Copo de creme de Ninho com morango", cat:"copos", desc:"Camadas de creme de Ninho e morangos frescos.", foto:"img/copo-morango.jpg"},

  /* brownies */
  {id:"br4", nome:"Brownie recheado de Ninho", cat:"brownies", desc:"Brownie com recheio cremoso de Ninho.", foto:"img/brownie-recheio-ninho.jpg"},
  {id:"br5", nome:"Brownie recheado de chocolate", cat:"brownies", desc:"Brownie com recheio cremoso de chocolate.", foto:"img/brownie-recheio-chocolate.jpg"},
  {id:"br3", nome:"Brownie recheado de maracujá", cat:"brownies", desc:"Brownie com recheio cremoso de maracujá.", foto:"img/brownie-recheio-maracuja.jpg"},
  {id:"pa1", nome:"Palha italiana de Oreo", cat:"brownies", desc:"Palha italiana com pedaços de Oreo.", foto:"img/palha-oreo.jpg"},
  {id:"pa4", nome:"Palha italiana de chocolate", cat:"brownies", desc:"Palha italiana de chocolate, macia e cremosa.", foto:"img/palha-chocolate.jpg"},
  {id:"pa3", nome:"Palha italiana de Ninho", cat:"brownies", desc:"Palha italiana de Ninho, macia e cremosa.", foto:"img/palha-ninho.jpg"},

  /* sobremesas */
  {id:"so1", nome:"Torta de limão", cat:"sobremesas", desc:"Base crocante, recheio cremoso e azedinho na medida certa, coberta com chantilly suave.", foto:"img/torta-limao.jpg", destaque:true},
  {id:"pu1", nome:"Pudim pequeno", cat:"sobremesas", desc:"Ideal para uma pessoa.", foto:"img/pudim-pequeno.jpg"},
  {id:"ms1", nome:"Mousse de limão", cat:"sobremesas", desc:"Mousse cremosa de limão com raspas de limão.", foto:"img/mousse-limao.jpg"},
  {id:"ms2", nome:"Mousse de chocolate", cat:"sobremesas", desc:"Mousse cremosa de chocolate com raspas de chocolate.", foto:"img/mousse-chocolate.jpg"},
  {id:"bp1", nome:"Bombom de uva", cat:"sobremesas", desc:"Pote com creme, uva verde e cobertura de chocolate.", foto:"img/bombom-uva.jpg"},
  {id:"bp2", nome:"Bombom de morango", cat:"sobremesas", desc:"Pote com creme, morangos frescos e cobertura de chocolate.", foto:"img/bombom-morango.jpg"},
  {id:"bp3", nome:"Bolo no pote de Ninho com Nutella", cat:"sobremesas", desc:"Bolo com creme de Ninho e Nutella.", foto:"img/pote-ninho-nutella.jpg"},
  {id:"bp4", nome:"Bolo no pote Chocolatudo", cat:"sobremesas", desc:"Bolo de chocolate com bastante creme de chocolate.", foto:"img/pote-chocolatudo.jpg"},
  {id:"bp5", nome:"Bolo no pote de Ninho com chocolate", cat:"sobremesas", desc:"Bolo com creme de Ninho e pedaços de chocolate.", foto:"img/pote-ninho-chocolate.jpg"},
  {id:"bp6", nome:"Bolo no pote de limão", cat:"sobremesas", desc:"Bolo com creme de limão e raspas de limão.", foto:"img/pote-limao.jpg"},

  /* caseiros */
  {id:"c2", nome:"Broa com queijo", cat:"caseiros", desc:"Broa redonda e macia, com queijo.", foto:"img/broa-queijo.jpg"},
  {id:"c3", nome:"Bolo formigueiro", cat:"caseiros", desc:"Bolo redondo e fofinho, com granulado de chocolate na massa.", foto:"img/bolo-formigueiro.jpg"},
  {id:"c4", nome:"Bolo de cenoura com brigadeiro", cat:"caseiros", desc:"Bolo redondo de cenoura com cobertura de brigadeiro e granulado.", foto:"img/bolo-cenoura-brigadeiro.jpg"},
  {id:"c1", nome:"Bolo caseiro", cat:"caseiros", desc:"Bolo redondo com o sabor da sua infância, perfeito para compartilhar.", escolhas:{"Sabor":SABORES.caseiros, "Tamanho":["Mini", "Padrão"]}, foto:"img/caseiros-redondos.jpg"},

  /* zero */
  {id:"z6", nome:"Bolo zero açúcar de chocolate", cat:"zero", desc:"Bolo retangular de chocolate, sem açúcar. Pode ser com ou sem cobertura.", escolhas:{"Cobertura":["Com cobertura", "Sem cobertura"], "Tamanho":["Mini", "Padrão"]}, foto:"img/zero-chocolate.jpg"},
  {id:"z1", nome:"Bolo zero açúcar de fubá", cat:"zero", desc:"Bolo retangular de fubá, fofinho e sem açúcar.", escolhas:{"Tamanho":["Mini", "Padrão"]}, foto:"img/zero-ret-fuba.jpg"},
  {id:"z2", nome:"Bolo zero açúcar de cenoura", cat:"zero", desc:"Bolo retangular de cenoura com cobertura de chocolate, sem açúcar.", escolhas:{"Tamanho":["Mini", "Padrão"]}, foto:"img/zero-ret-cenoura.jpg"},
  {id:"z3", nome:"Bolo zero açúcar de limão", cat:"zero", desc:"Bolo retangular de limão com cobertura, sem açúcar.", escolhas:{"Tamanho":["Mini", "Padrão"]}, foto:"img/zero-ret-limao.jpg"},
  {id:"z4", nome:"Bolo zero açúcar de laranja", cat:"zero", desc:"Bolo retangular de laranja, sem açúcar.", escolhas:{"Tamanho":["Mini", "Padrão"]}, foto:"img/zero-ret-variedade.jpg"},
  {id:"z5", nome:"Bolo zero açúcar de pamonha", cat:"zero", desc:"Bolo retangular de pamonha, cremoso e sem açúcar, com sabor de milho verde.", escolhas:{"Tamanho":["Mini", "Padrão"]}, foto:"img/zero-ret-pamonha.jpg"},

  /* geleias */
  {id:"gl1", nome:"Geleia de morango", cat:"geleias", desc:"Copinho de 160 ml.", foto:"img/geleia-morango.jpg"},
  {id:"gl2", nome:"Cobertura de chocolate", cat:"geleias", desc:"Copinho de 160 ml.", foto:"img/geleia-chocolate.jpg"},
  {id:"gl3", nome:"Geleia de frutas vermelhas", cat:"geleias", desc:"Copinho de 160 ml.", foto:"img/geleia-frutas-vermelhas.jpg"},
  {id:"gl4", nome:"Geleia de goiabada", cat:"geleias", desc:"Copinho de 160 ml.", foto:"img/geleia-goiabada.jpg"},
  {id:"gl5", nome:"Creme de limão", cat:"geleias", desc:"Copinho de 160 ml.", foto:"img/geleia-limao.jpg"},
  {id:"gl6", nome:"Creme de Ninho", cat:"geleias", desc:"Copinho de 160 ml.", foto:"img/geleia-ninho.jpg"},
  {id:"gl7", nome:"Cobertura de chocolate zero açúcar", cat:"geleias", desc:"Copinho de 160 ml.", foto:"", arte:"pote"},
  {id:"gl8", nome:"Caramelo", cat:"geleias", desc:"Copinho de 160 ml.", foto:"", arte:"pote"},
  {id:"gl9", nome:"Caramelo salgado", cat:"geleias", desc:"Copinho de 160 ml.", foto:"", arte:"pote"}
];

/* ---------------- BANNERS DA PÁGINA INICIAL ----------------
   tema: blush | areia | terroso
   foto: imagem redonda ao lado do texto (vazio usa a ilustração "arte")
   fotos: até 4 imagens lado a lado no lugar da foto redonda (ex.: ["img/a.jpg", "img/b.jpg", ...])
   imagem / imagemMobile: arte pronta ocupando o banner todo (1366x560 e 600x720 px) */
var BANNERS = [
  {tema:"blush", titulo:"Conheça nossas <em class=\"centro\">delícias</em>", texto:"Toda a nossa linha é gourmet: bolos, doces e sobremesas feitos à mão, com o carinho de sempre.", botao:"Veja nossos produtos", link:"produtos.html", foto:"img/bolo-morangos.jpg", fotos:["img/banner-bolo-morango.jpg", "img/banner-docinhos-amendoim.jpg", "img/banner-brigadeiros.jpg", "img/banner-bolo-chocolate.jpg"], arte:"bolos", imagem:"", imagemMobile:""},
  {tema:"terroso", titulo:"Tudo o que sua festa <em>precisa</em>", texto:"Bolo e docinhos na medida certa, com topo simples incluso.", botao:"Ver Kit Festa", link:"produtos.html?categoria=kits", foto:"img/docinhos.jpg", arte:"doces", imagem:"", imagemMobile:""},
  {tema:"areia", titulo:"Bento <em>cake</em>", texto:"Pequeno no tamanho, grande na mensagem.", botao:"Encomendar", link:"encomendas.html?tipo=bento", foto:"img/bento-cake.jpg", arte:"bolos", imagem:"", imagemMobile:""}
];

/* ---------------- ENCOMENDAS ---------------- */
var ENCOMENDA = {
  tamanhos: ["10 a 15 fatias (aprox.)", "20 a 30 fatias (aprox.)", "35 a 40 fatias (aprox.)", "50 fatias (aprox.)"],
  kits: [
    {id:"kit-1", nome:"Kit 1", descricao:"Bolo de 10 a 15 fatias e 30 docinhos"},
    {id:"kit-2", nome:"Kit 2", descricao:"Bolo de 20 a 30 fatias e 60 docinhos"},
    {id:"kit-3", nome:"Kit 3", descricao:"Bolo de 35 a 40 fatias e 100 docinhos"}
  ],
  topos: ["Sem topo", "Topo simples", "Topo personalizado"]
};

/* ---------------- DEPOIMENTOS ----------------
   A seção só aparece no site quando houver depoimentos reais aqui. Exemplo:
   {texto:"O bolo de morangos foi o centro da festa!", nome:"Ana Souza"},
*/
var DEPOIMENTOS = [
];

/* ---------------- GALERIA ----------------
   Fotos e vídeos de trabalhos já feitos, mostrados na página inicial e em Encomendas.
   tipo: "foto" ou "video" | src: arquivo | capa: imagem mostrada antes do vídeo carregar */
var GALERIA = [
  {tipo:"video", src:"video/morango-cravejado.mp4", capa:"img/video-morango-cravejado.jpg", legenda:"Morango cravejado do amor"},
  {tipo:"foto", src:"img/galeria-bolo-noiva.jpg", legenda:"Bolo Noiva"},
  {tipo:"foto", src:"img/galeria-docinhos-personalizados.jpg", legenda:"Docinhos personalizados"},
  {tipo:"foto", src:"img/galeria-bolo-morango.jpg", legenda:"Bolo de morango"},
  {tipo:"video", src:"video/bolo-chocolate.mp4", capa:"img/video-bolo-chocolate.jpg", legenda:"Bolo caseiro de chocolate"},
  {tipo:"foto", src:"img/galeria-bolo-flores.jpg", legenda:"Bolo com flores naturais"},
  {tipo:"foto", src:"img/galeria-brownies-cobertura.jpg", legenda:"Mini brownies com cobertura"},
  {tipo:"foto", src:"img/galeria-beijinhos-limao.jpg", legenda:"Beijinhos e docinhos de limão"},
  {tipo:"video", src:"video/morangos-cravejados-caixa.mp4", capa:"img/video-morangos-cravejados-caixa.jpg", legenda:"Caixa de morangos cravejados do amor"},
  {tipo:"foto", src:"img/galeria-mini-brownies.jpg", legenda:"Mini brownies para festa"},
  {tipo:"video", src:"video/bolo-cenoura-chocolate.mp4", capa:"img/video-bolo-cenoura-chocolate.jpg", legenda:"Bolo de cenoura com chocolate"},
  {tipo:"video", src:"video/bolos-chocolate-recheados.mp4", capa:"img/video-bolos-chocolate-recheados.jpg", legenda:"Bolos de chocolate recheados"}
];

/* ---------------- IMAGENS FIXAS (logo e fotos que não são de produto) ---------------- */
var IMAGENS = {
  logo: "img/logo.png",
  carinho: "img/banner-bolo-chocolate.jpg"
};

/* ---------------- TEXTOS DAS PÁGINAS ----------------
   Cada chave corresponde a um texto do site (marcado com data-texto no HTML).
   Pode usar <em>itálico</em>, <strong>negrito</strong> e <br>.
   {whatsapp} vira o número da loja e {dias} vira o prazo mínimo das encomendas. */
var TEXTOS = {
  "galeria_titulo": "Feito na <em>Fantini</em>",
  "galeria_texto": "Alguns dos bolos e doces que já saíram da nossa cozinha.",
  "inicio_linhas_titulo": "Nossas linhas",
  "inicio_linhas_texto": "Dos bolos decorados aos docinhos artesanais, cada detalhe é feito à mão.",
  "inicio_carinho_titulo": "Carinho e <em>cuidado</em>",
  "inicio_carinho_frase": "“Tudo o que sua festa precisa para ser inesquecível.”",
  "inicio_carinho_texto": "Dos bolos decorados que são o centro das atenções aos docinhos artesanais que derretem na boca: aqui, transformamos açúcar em celebração. Cada detalhe é feito à mão para garantir que o seu momento especial tenha o sabor que ele merece.",
  "inicio_carinho_assinatura": "Deixe a doçura por nossa conta!",
  "inicio_encomenda_titulo": "O bolo da sua <em>celebração</em>",
  "inicio_encomenda_texto": "Bolo decorado, bento cake ou Kit Festa completo. Escolha os sabores e nossa equipe envia o orçamento pelo WhatsApp.",
  "inicio_encomenda_botao": "Encomendar",
  "inicio_citacao": "As maiores conquistas estão do outro lado do medo.",
  "inicio_citacao_autor": "Fantini Confeitaria",
  "inicio_historia_1": "O amor pela confeitaria sempre esteve presente, mas a história da Fantini Confeitaria começou a ganhar forma lá em 2018.",
  "inicio_historia_2": "Hoje, a Fantini Confeitaria não é apenas um negócio. É a realização de um sonho construído com trabalho duro, coragem, lembranças afetivas e, claro, a mesma dose de amor de sempre.",
  "inicio_historia_link": "Conheça nossa história",
  "inicio_depoimentos_titulo": "O que dizem <em>nossos clientes</em>",
  "inicio_visite_titulo": "Visite a <em>Fantini</em>",
  "inicio_aviso": "<strong>Atenção a golpes.</strong> A Fantini atende somente pelo WhatsApp {whatsapp}, pelo Instagram oficial e por este site. Nunca pedimos pagamento por links enviados de outros números.",
  "enc_titulo": "Sua festa, <em>do seu jeito</em>",
  "enc_subtitulo": "Bolo decorado, bento cake ou Kit Festa completo. Escolha os detalhes e nossa equipe envia o orçamento pelo WhatsApp.",
  "enc_como_titulo": "Como <em>funciona</em>",
  "enc_passo1_titulo": "Escolha os detalhes",
  "enc_passo1_texto": "O tipo de encomenda, o tamanho, até dois recheios e o topo.",
  "enc_passo2_titulo": "Receba o orçamento",
  "enc_passo2_texto": "Enviamos o valor e confirmamos a data pelo WhatsApp.",
  "enc_passo3_titulo": "Confirme a encomenda",
  "enc_passo3_texto": "Com 50% de entrada por Pix ou cartão de crédito, sua encomenda entra na agenda. O restante é pago na entrega.",
  "enc_form_nota": "O orçamento é enviado pelo WhatsApp, junto com a confirmação da data.",
  "enc_form_botao": "Solicitar orçamento",
  "enc_faq_titulo": "Dúvidas <em>frequentes</em>",
  "enc_faq1_pergunta": "Com quanto tempo de antecedência devo encomendar?",
  "enc_faq1_resposta": "Pedimos pelo menos {dias} dias de antecedência. Para bolos com decoração temática e Kit Festa, o ideal é encomendar com uma semana.",
  "enc_faq2_pergunta": "Como recebo os valores?",
  "enc_faq2_resposta": "Assim que recebemos seu pedido ou encomenda, nossa equipe envia os valores e a disponibilidade pelo WhatsApp.",
  "enc_faq3_pergunta": "Quais são as formas de pagamento?",
  "enc_faq3_resposta": "Pix ou cartão de crédito. Não há pagamento pelo site: depois do seu pedido, combinamos tudo pelo WhatsApp. Nas encomendas, trabalhamos com 50% do valor de entrada e o restante na entrega.",
  "enc_faq4_pergunta": "O topo de bolo está incluso?",
  "enc_faq4_resposta": "O topo de bolo tem valor à parte. No Kit Festa, o topo simples já está incluso.",
  "enc_faq5_pergunta": "Qual a diferença entre tradicional e especial?",
  "enc_faq5_resposta": "Os tradicionais são os nossos clássicos, como Ninho, Brigadeiro e Moranguinho. Os especiais levam sabores como Ferrero Rocher, Ouro Branco, Nozes e Ninho com Nutella.",
  "enc_faq6_pergunta": "Quantas pessoas cada bolo serve?",
  "enc_faq6_resposta": "Nossos bolos decorados vão de 10 a 15 fatias até cerca de 50 fatias. Na dúvida, conte quantos convidados terá a festa que a gente ajuda a escolher.",
  "sobre_titulo": "Nossa <em>história</em>",
  "sobre_subtitulo": "Da Dose de Amor à Fantini Confeitaria.",
  "sobre_marco1_ano": "2018",
  "sobre_marco1_texto": "Nasce a Dose de Amor",
  "sobre_marco2_ano": "2023",
  "sobre_marco2_texto": "Curso com Paloma Lemes",
  "sobre_marco3_ano": "2026",
  "sobre_marco3_texto": "Nasce a Fantini Confeitaria",
  "sobre_citacao": "As maiores conquistas estão do outro lado do medo.",
  "sobre_paragrafo1": "O amor pela confeitaria sempre esteve presente, mas a história da Fantini Confeitaria começou a ganhar forma lá em 2018.",
  "sobre_paragrafo2": "Naquela época, a marca ainda se chamava Dose de Amor. Comecei de forma humilde, me arriscando com doces simples para garantir uma renda extra. Entre uma fornada e outra, fui percebendo o poder que um doce tem de levar afeto às pessoas. E foi com o fruto desse trabalho dedicado que conquistei meu primeiro grande sonho: meu primeiro carro, um Celtinha preto lindo! Ali eu vi que a confeitaria podia transformar a minha vida.",
  "sobre_paragrafo3": "Em 2023, dei um passo muito importante para amadurecer minha técnica. Fiz um curso transformador com uma professora incrível, a Paloma Lemes. Ela me ensinou muito, me deu dicas valiosas e um conselho em especial: dedique-se 100% à confeitaria. Naquele momento, o medo falou mais alto e continuei conciliando a cozinha nas horas vagas, testando, aprimorando e estudando em casa mesmo.",
  "sobre_paragrafo4": "Mas o tempo de Deus é perfeito.",
  "sobre_paragrafo5": "Em 2026, veio o grande divisor de águas: recebi a oportunidade de realizar o sonho de viver 100% da confeitaria. A coragem não veio sem receio, mas lembrei que as maiores conquistas estão do outro lado do medo. Decidi ir, mesmo com frio na barriga!",
  "sobre_paragrafo6": "Com essa nova fase, sentimos que era hora de dar um novo rosto para a marca. A Dose de Amor deu lugar à Fantini Confeitaria.",
  "sobre_paragrafo7": "Esse nome carrega o meu sobrenome e uma homenagem profundamente especial. É dedicado à minha avó, uma pessoa maravilhosa que nos deixou em 2025. Ela sempre acreditou no meu potencial e era a cliente mais fiel e apaixonada pelos meus bolos e doces. Levar o nome dela na minha fachada e em cada embalagem é a minha forma de manter viva a memória, o orgulho e o carinho que ela sempre teve por mim.",
  "sobre_paragrafo8": "Hoje, a Fantini Confeitaria não é apenas um negócio. É a realização de um sonho construído com trabalho duro, coragem, lembranças afetivas e, claro, a mesma dose de amor de sempre.",
  "sobre_paragrafo9": "Obrigada a cada um de vocês que faz parte dessa jornada e adocica a vida com a gente! 🤍✨",
  "sobre_cta_titulo": "Prove a nossa <em>história</em>",
  "sobre_cta_texto": "Conheça nossas linhas ou venha nos visitar na Rua Francisco Bicalho.",
  "sobre_cta_botao": "Ver produtos",
  "rodape_texto": "Tudo o que sua festa precisa para ser inesquecível, feito à mão com carinho e cuidado.",
  "rodape_nota": "Por serem feitos à mão, nossos produtos podem ter pequenas variações em relação às imagens.",
  "selecao_nota": "Nossa equipe confirma valores e disponibilidade pelo WhatsApp. O pagamento é feito por Pix ou cartão de crédito."
};

/* Onde cada texto aparece (referência para quem for editar) */
var TEXTOS_INFO = {
  "galeria_titulo": ["Galeria", "Título da galeria"],
  "galeria_texto": ["Galeria", "Texto da galeria"],
  "inicio_linhas_titulo": [
    "Página inicial",
    "Nossas linhas: título"
  ],
  "inicio_linhas_texto": [
    "Página inicial",
    "Nossas linhas: texto"
  ],
  "inicio_carinho_titulo": [
    "Página inicial",
    "Carinho e cuidado: título"
  ],
  "inicio_carinho_frase": [
    "Página inicial",
    "Carinho e cuidado: frase"
  ],
  "inicio_carinho_texto": [
    "Página inicial",
    "Carinho e cuidado: texto"
  ],
  "inicio_carinho_assinatura": [
    "Página inicial",
    "Carinho e cuidado: frase final"
  ],
  "inicio_encomenda_titulo": [
    "Página inicial",
    "Faixa de encomendas: título"
  ],
  "inicio_encomenda_texto": [
    "Página inicial",
    "Faixa de encomendas: texto"
  ],
  "inicio_encomenda_botao": [
    "Página inicial",
    "Faixa de encomendas: botão"
  ],
  "inicio_citacao": [
    "Página inicial",
    "Citação"
  ],
  "inicio_citacao_autor": [
    "Página inicial",
    "Citação: assinatura"
  ],
  "inicio_historia_1": [
    "Página inicial",
    "Resumo da história: parágrafo 1"
  ],
  "inicio_historia_2": [
    "Página inicial",
    "Resumo da história: parágrafo 2"
  ],
  "inicio_historia_link": [
    "Página inicial",
    "Resumo da história: link"
  ],
  "inicio_depoimentos_titulo": [
    "Página inicial",
    "Depoimentos: título"
  ],
  "inicio_visite_titulo": [
    "Página inicial",
    "Visite a Fantini: título"
  ],
  "inicio_aviso": [
    "Página inicial",
    "Aviso contra golpes ({whatsapp} vira o número da loja)"
  ],
  "enc_titulo": [
    "Encomendas",
    "Título da página"
  ],
  "enc_subtitulo": [
    "Encomendas",
    "Subtítulo da página"
  ],
  "enc_como_titulo": [
    "Encomendas",
    "Como funciona: título"
  ],
  "enc_passo1_titulo": [
    "Encomendas",
    "Como funciona: passo 1 (título)"
  ],
  "enc_passo1_texto": [
    "Encomendas",
    "Como funciona: passo 1 (texto)"
  ],
  "enc_passo2_titulo": [
    "Encomendas",
    "Como funciona: passo 2 (título)"
  ],
  "enc_passo2_texto": [
    "Encomendas",
    "Como funciona: passo 2 (texto)"
  ],
  "enc_passo3_titulo": [
    "Encomendas",
    "Como funciona: passo 3 (título)"
  ],
  "enc_passo3_texto": [
    "Encomendas",
    "Como funciona: passo 3 (texto)"
  ],
  "enc_form_nota": [
    "Encomendas",
    "Formulário: nota ao lado do botão"
  ],
  "enc_form_botao": [
    "Encomendas",
    "Formulário: botão"
  ],
  "enc_faq_titulo": [
    "Encomendas",
    "Dúvidas: título"
  ],
  "enc_faq1_pergunta": [
    "Encomendas",
    "Dúvida 1: pergunta"
  ],
  "enc_faq1_resposta": [
    "Encomendas",
    "Dúvida 1: resposta ({dias} vira o prazo mínimo)"
  ],
  "enc_faq2_pergunta": [
    "Encomendas",
    "Dúvida 2: pergunta"
  ],
  "enc_faq2_resposta": [
    "Encomendas",
    "Dúvida 2: resposta"
  ],
  "enc_faq3_pergunta": [
    "Encomendas",
    "Dúvida 3: pergunta"
  ],
  "enc_faq3_resposta": [
    "Encomendas",
    "Dúvida 3: resposta"
  ],
  "enc_faq4_pergunta": [
    "Encomendas",
    "Dúvida 4: pergunta"
  ],
  "enc_faq4_resposta": [
    "Encomendas",
    "Dúvida 4: resposta"
  ],
  "enc_faq5_pergunta": [
    "Encomendas",
    "Dúvida 5: pergunta"
  ],
  "enc_faq5_resposta": [
    "Encomendas",
    "Dúvida 5: resposta"
  ],
  "enc_faq6_pergunta": [
    "Encomendas",
    "Dúvida 6: pergunta"
  ],
  "enc_faq6_resposta": [
    "Encomendas",
    "Dúvida 6: resposta"
  ],
  "sobre_titulo": [
    "Nossa história",
    "Título da página"
  ],
  "sobre_subtitulo": [
    "Nossa história",
    "Subtítulo da página"
  ],
  "sobre_marco1_ano": [
    "Nossa história",
    "Linha do tempo: marco 1 (ano)"
  ],
  "sobre_marco1_texto": [
    "Nossa história",
    "Linha do tempo: marco 1 (texto)"
  ],
  "sobre_marco2_ano": [
    "Nossa história",
    "Linha do tempo: marco 2 (ano)"
  ],
  "sobre_marco2_texto": [
    "Nossa história",
    "Linha do tempo: marco 2 (texto)"
  ],
  "sobre_marco3_ano": [
    "Nossa história",
    "Linha do tempo: marco 3 (ano)"
  ],
  "sobre_marco3_texto": [
    "Nossa história",
    "Linha do tempo: marco 3 (texto)"
  ],
  "sobre_citacao": [
    "Nossa história",
    "Citação"
  ],
  "sobre_paragrafo1": [
    "Nossa história",
    "História: parágrafo 1"
  ],
  "sobre_paragrafo2": [
    "Nossa história",
    "História: parágrafo 2"
  ],
  "sobre_paragrafo3": [
    "Nossa história",
    "História: parágrafo 3"
  ],
  "sobre_paragrafo4": [
    "Nossa história",
    "História: parágrafo 4"
  ],
  "sobre_paragrafo5": [
    "Nossa história",
    "História: parágrafo 5"
  ],
  "sobre_paragrafo6": [
    "Nossa história",
    "História: parágrafo 6"
  ],
  "sobre_paragrafo7": [
    "Nossa história",
    "História: parágrafo 7"
  ],
  "sobre_paragrafo8": [
    "Nossa história",
    "História: parágrafo 8"
  ],
  "sobre_paragrafo9": [
    "Nossa história",
    "História: parágrafo 9"
  ],
  "sobre_cta_titulo": [
    "Nossa história",
    "Faixa final: título"
  ],
  "sobre_cta_texto": [
    "Nossa história",
    "Faixa final: texto"
  ],
  "sobre_cta_botao": [
    "Nossa história",
    "Faixa final: botão"
  ],
  "rodape_texto": [
    "Rodapé",
    "Texto abaixo da logo"
  ],
  "rodape_nota": [
    "Rodapé",
    "Nota sobre as imagens"
  ],
  "selecao_nota": [
    "Seleção",
    "Nota acima do botão de enviar"
  ]
};
