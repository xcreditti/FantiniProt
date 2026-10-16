/* =========================================================
   FANTINI CONFEITARIA — DADOS DO SITE
   Este é o único arquivo que você precisa editar no dia a dia.
   ========================================================= */

/* ---------------- LOJA ---------------- */
const CONFIG = {
  nome: "Fantini Confeitaria",
  // URL do backend (Google Apps Script, termina em /exec). Vazio = pedidos só pelo WhatsApp.
  apiUrl: "",
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
    0: ["09:00", "14:00"],
    1: ["08:00", "20:00"],
    2: ["08:00", "20:00"],
    3: ["08:00", "20:00"],
    4: ["08:00", "20:00"],
    5: ["08:00", "20:00"],
    6: ["08:00", "19:00"]
  }
};

/* ---------------- LINHAS (categorias) ----------------
   Cada linha tem a sua própria página: produtos.html?categoria=<id>
   foto: capa da linha. Vazio usa a ilustração. */
const CATEGORIAS = [
  {id:"gourmet",    nome:"Linha Gourmet", foto:"",
   descricao:"Nossos sabores especiais: recheios nobres e acabamento feito à mão, para quem aprecia cada detalhe."},
  {id:"bolos",      nome:"Bolos decorados", foto:"img/bolo-confeitos.jpg",
   descricao:"O centro das atenções da sua festa, de 10 a 50 fatias, em sabores tradicionais e especiais."},
  {id:"bento",      nome:"Bento cake", foto:"img/bento-cake.jpg",
   descricao:"Pequeno no tamanho e grande na mensagem: o mimo perfeito para surpreender alguém."},
  {id:"kits",       nome:"Kit Festa", foto:"img/bolo-morangos.jpg",
   descricao:"Bolo e docinhos na medida certa para a sua comemoração, com topo simples incluso."},
  {id:"doces",      nome:"Docinhos de festa", foto:"img/docinhos.jpg",
   descricao:"Docinhos artesanais que derretem na boca, feitos um a um."},
  {id:"copos",      nome:"Copo da Felicidade", foto:"img/copo-morango-brownie.jpg",
   descricao:"Dose de alegria em cada camada: cremes, frutas e chocolate no copo."},
  {id:"brownies",   nome:"Brownies e palhas italianas", foto:"",
   descricao:"Dose de alegria em cada pedaço, nas coleções Brownie e Palhas Italianas."},
  {id:"sobremesas", nome:"Tortas e sobremesas", foto:"img/torta-limao.jpg",
   descricao:"Torta de limão, pudins e bombons de pote para adoçar qualquer momento."},
  {id:"caseiros",   nome:"Bolos caseiros", foto:"img/caseiros-variedade.jpg",
   descricao:"O sabor da sua infância, perfeito para compartilhar. Nos tamanhos mini e padrão."},
  {id:"zero",       nome:"Bolos zero açúcar", foto:"img/zero-limao.jpg",
   descricao:"Bolos caseiros sem açúcar, com todo o sabor. Nos tamanhos mini e padrão."},
  {id:"geleias",    nome:"Geleias e coberturas", foto:"img/geleia-chocolate.jpg",
   descricao:"Geleias e coberturas à parte, em copinhos de 160 ml, para acompanhar o que você quiser."}
];

/* Sabores do cardápio (usados nos produtos e no formulário de encomenda) */
const SABORES = {
  recheiosTradicionais: ["Ninho", "Brigadeiro", "Coco", "Amendoim", "Moranguinho", "Maracujá", "Limão"],
  recheiosEspeciais: ["Ninho com Nutella", "Morangos", "Geleia de morango", "Nozes", "Abacaxi com coco", "Abacaxi com ameixa", "Ferrero Rocher", "Ouro Branco"],
  docesTradicionais: ["Beijinho", "Brigadeiro", "Cajuzinho", "Brigadeiro de Ninho", "Paçoca", "Meio a meio"],
  docesEspeciais: ["Ninho e Ninho com Nutella", "Brigadeiro de M&M's", "Olho de sogra", "Churros", "Oreo", "Ferrero Rocher"],
  caseiros: ["Limão", "Cenoura", "Maçã", "Chocolate", "Fubá", "Banana", "Café", "Laranja", "Mesclado"]
};

/* ---------------- PRODUTOS ----------------
   Os preços NÃO aparecem no site e não ficam neste arquivo. Se usar o painel de pedidos,
   os valores ficam só na planilha (aba Produtos), que o cliente não vê.
   cat: linha principal | tambem: outras linhas onde o produto também aparece
   sabores: lista exibida no cartão
   encomenda: "bolo" | "bento" | "kit-1" | "kit-2" | "kit-3" -> o botão leva ao formulário de encomenda
   escolhas: opções que o cliente escolhe antes de adicionar (ex.: Sabor, Tamanho)
   Sem "encomenda", o botão adiciona o produto à seleção.
   foto: caminho da foto. Vazio usa a ilustração (arte: gourmet, bolos, tortas, doces, copo, brownie). */
const PRODUTOS = [
  /* gourmet */
  {id:"ge1", nome:"Bolo decorado especial", cat:"gourmet", tambem:["bolos"], encomenda:"bolo", desc:"Recheios especiais e decoração feita à mão, de 10 a 50 fatias.", sabores:SABORES.recheiosEspeciais, foto:"img/bolo-morangos.jpg", destaque:true},
  {id:"ge2", nome:"Bento cake especial", cat:"gourmet", tambem:["bento"], encomenda:"bento", desc:"O mimo individual com os nossos recheios especiais.", sabores:SABORES.recheiosEspeciais, foto:"img/bento-cake.jpg", destaque:true},
  {id:"ge3", nome:"Docinhos especiais", cat:"gourmet", tambem:["doces"], desc:"Sabores especiais para deixar a mesa da festa ainda mais bonita.", sabores:SABORES.docesEspeciais, foto:"img/docinhos.jpg", destaque:true},

  /* bolos */
  {id:"b1", nome:"Bolo decorado tradicional", cat:"bolos", encomenda:"bolo", desc:"Nossos recheios clássicos e decoração feita à mão, de 10 a 50 fatias.", sabores:SABORES.recheiosTradicionais, foto:"img/bolo-confeitos.jpg"},

  /* bento */
  {id:"bt1", nome:"Bento cake tradicional", cat:"bento", encomenda:"bento", desc:"Bolo individual com a mensagem que você quiser, em recheios clássicos.", sabores:SABORES.recheiosTradicionais, foto:"img/bento-cake.jpg"},

  /* kits */
  {id:"k1", nome:"Kit Festa 1", cat:"kits", encomenda:"kit-1", desc:"Bolo de 10 a 15 fatias e 30 docinhos, com topo simples incluso.", foto:"img/bolo-morangos.jpg"},
  {id:"k2", nome:"Kit Festa 2", cat:"kits", encomenda:"kit-2", desc:"Bolo de 20 a 30 fatias e 60 docinhos, com topo simples incluso.", foto:"img/docinhos.jpg"},
  {id:"k3", nome:"Kit Festa 3", cat:"kits", encomenda:"kit-3", desc:"Bolo de 35 a 40 fatias e 100 docinhos, com topo simples incluso.", foto:"img/bolo-confeitos.jpg"},

  /* doces */
  {id:"d1", nome:"Docinhos tradicionais", cat:"doces", desc:"Os clássicos de toda festa, feitos um a um.", sabores:SABORES.docesTradicionais, foto:"img/docinhos.jpg"},

  /* copos */
  {id:"cp6", nome:"Copo de morango com brownie", cat:"copos", desc:"Creme branco, brownie, morangos frescos e ganache de chocolate.", foto:"img/copo-morango-brownie.jpg", destaque:true},
  {id:"cp1", nome:"Copo bombom de uva verde", cat:"copos", desc:"Camadas de creme e uva verde, finalizado com chocolate.", foto:"", arte:"copo"},
  {id:"cp2", nome:"Copo Ferrero Rocher", cat:"copos", tambem:["gourmet"], desc:"Camadas de cremes, crocante e Ferrero Rocher.", foto:"", arte:"copo"},
  {id:"cp3", nome:"Copo bombom de morango", cat:"copos", desc:"Camadas de creme e morangos frescos, finalizado com chocolate.", foto:"", arte:"copo"},
  {id:"cp4", nome:"Copo de maracujá com creme de chocolate", cat:"copos", desc:"Creme de maracujá intercalado com creme de chocolate.", foto:"", arte:"copo"},
  {id:"cp5", nome:"Copo Ninho com Nutella", cat:"copos", tambem:["gourmet"], desc:"Creme de Ninho com camadas de Nutella.", foto:"", arte:"copo"},

  /* brownies */
  {id:"br1", nome:"Brownie de brigadeiro", cat:"brownies", desc:"Brownie coberto com brigadeiro e granulado.", foto:"", arte:"brownie"},
  {id:"br2", nome:"Brownie Ferrero Rocher", cat:"brownies", tambem:["gourmet"], desc:"Brownie com castanhas e Ferrero Rocher.", foto:"", arte:"brownie"},
  {id:"br3", nome:"Brownie de maracujá com creme de chocolate", cat:"brownies", desc:"Brownie com creme de maracujá e creme de chocolate.", foto:"", arte:"brownie"},
  {id:"br4", nome:"Brownie de Ninho", cat:"brownies", desc:"Brownie com cobertura cremosa de Ninho.", foto:"", arte:"brownie"},
  {id:"pa1", nome:"Palha italiana de Oreo", cat:"brownies", desc:"Palha italiana com pedaços de Oreo.", foto:"", arte:"brownie"},
  {id:"pa2", nome:"Palha italiana de Ninho com Nutella", cat:"brownies", tambem:["gourmet"], desc:"Palha italiana de Ninho com cobertura de Nutella.", foto:"", arte:"brownie"},
  {id:"pa3", nome:"Palha italiana de Ninho", cat:"brownies", desc:"Palha italiana de Ninho, macia e cremosa.", foto:"", arte:"brownie"},
  {id:"pa4", nome:"Palha italiana de chocolate", cat:"brownies", desc:"Palha italiana de chocolate com granulado.", foto:"", arte:"brownie"},

  /* sobremesas */
  {id:"so1", nome:"Torta de limão", cat:"sobremesas", desc:"Base crocante, recheio cremoso e azedinho na medida certa, coberta com chantilly suave.", foto:"img/torta-limao.jpg", destaque:true},
  {id:"pu1", nome:"Pudim pequeno", cat:"sobremesas", desc:"Ideal para uma pessoa.", foto:"img/pudim-pequeno.jpg"},
  {id:"pu2", nome:"Pudim médio", cat:"sobremesas", desc:"Perfeito para o casal.", foto:"img/pudim-medio.jpg"},
  {id:"pu3", nome:"Pudim grande", cat:"sobremesas", desc:"Para toda a família.", foto:"img/pudim-grande.jpg"},
  {id:"bp1", nome:"Bombom de uva", cat:"sobremesas", desc:"Pote com creme, uva verde e cobertura de chocolate.", foto:"img/bombom-uva.jpg"},
  {id:"bp2", nome:"Bombom de morango", cat:"sobremesas", desc:"Pote com creme, morangos frescos e cobertura de chocolate.", foto:"img/bombom-morango.jpg"},

  /* caseiros */
  {id:"c1", nome:"Bolo caseiro", cat:"caseiros", desc:"O sabor da sua infância, perfeito para compartilhar.", escolhas:{"Sabor":SABORES.caseiros, "Tamanho":["Mini", "Padrão"]}, foto:"img/caseiros-variedade.jpg"},

  /* zero */
  {id:"z1", nome:"Bolo zero açúcar de fubá", cat:"zero", desc:"Fofinho e sem açúcar, com gostinho de fazenda.", escolhas:{"Tamanho":["Mini", "Padrão"]}, foto:"img/zero-fuba.jpg"},
  {id:"z2", nome:"Bolo zero açúcar de cenoura", cat:"zero", desc:"Com cobertura de chocolate, sem açúcar.", escolhas:{"Tamanho":["Mini", "Padrão"]}, foto:"img/zero-cenoura.jpg"},
  {id:"z3", nome:"Bolo zero açúcar de limão", cat:"zero", desc:"Com cobertura de limão, sem açúcar.", escolhas:{"Tamanho":["Mini", "Padrão"]}, foto:"img/zero-limao.jpg"},
  {id:"z4", nome:"Bolo zero açúcar de laranja", cat:"zero", desc:"Com calda de laranja, sem açúcar.", escolhas:{"Tamanho":["Mini", "Padrão"]}, foto:"img/zero-laranja.jpg"},
  {id:"z5", nome:"Bolo zero açúcar de pamonha", cat:"zero", desc:"Cremoso e sem açúcar, com sabor de milho verde.", escolhas:{"Tamanho":["Mini", "Padrão"]}, foto:"img/zero-pamonha.jpg"},

  /* geleias */
  {id:"gl1", nome:"Geleia de morango", cat:"geleias", desc:"Copinho de 160 ml.", foto:"img/geleia-morango.jpg"},
  {id:"gl2", nome:"Cobertura de chocolate", cat:"geleias", desc:"Copinho de 160 ml.", foto:"img/geleia-chocolate.jpg"},
  {id:"gl3", nome:"Geleia de frutas vermelhas", cat:"geleias", desc:"Copinho de 160 ml.", foto:"img/geleia-frutas-vermelhas.jpg"},
  {id:"gl4", nome:"Geleia de goiabada", cat:"geleias", desc:"Copinho de 160 ml.", foto:"img/geleia-goiabada.jpg"},
  {id:"gl5", nome:"Creme de limão", cat:"geleias", desc:"Copinho de 160 ml.", foto:"img/geleia-limao.jpg"},
  {id:"gl6", nome:"Creme de Ninho", cat:"geleias", desc:"Copinho de 160 ml.", foto:"img/geleia-ninho.jpg"}
];

/* ---------------- BANNERS DA PÁGINA INICIAL ----------------
   tema: blush | areia | terroso
   foto: imagem redonda ao lado do texto (vazio usa a ilustração "arte")
   imagem / imagemMobile: arte pronta ocupando o banner todo (1366x560 e 600x720 px) */
const BANNERS = [
  {tema:"blush", titulo:"Linha <em>Gourmet</em>", texto:"Nossos sabores especiais, com recheios nobres e acabamento feito à mão.", botao:"Conhecer a linha", link:"produtos.html?categoria=gourmet", foto:"img/bolo-morangos.jpg", arte:"gourmet", imagem:"", imagemMobile:""},
  {tema:"terroso", titulo:"Tudo o que sua festa <em>precisa</em>", texto:"Bolo e docinhos na medida certa, com topo simples incluso.", botao:"Ver Kit Festa", link:"produtos.html?categoria=kits", foto:"img/docinhos.jpg", arte:"doces", imagem:"", imagemMobile:""},
  {tema:"areia", titulo:"Bento <em>cake</em>", texto:"Pequeno no tamanho, grande na mensagem.", botao:"Encomendar", link:"encomendas.html?tipo=bento", foto:"img/bento-cake.jpg", arte:"bolos", imagem:"", imagemMobile:""}
];

/* ---------------- ENCOMENDAS ---------------- */
const ENCOMENDA = {
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
const DEPOIMENTOS = [
];
