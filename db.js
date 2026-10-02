/* ============================================================================
   S.A.R.A — db.js
   "Banco de dados" 100% front-end, usando localStorage como armazenamento.
   Nenhuma chamada de rede é feita: tudo roda no navegador.
   ============================================================================ */

const SARA_DB_KEY      = 'sara_db_v1';
const SARA_SESSION_KEY = 'sara_session_v1';

/* ---------------------------------------------------------------------------
   Catálogo de produtos-base (simula os "tipos de produto" que saem de fábrica)
   --------------------------------------------------------------------------- */
const CATALOGO_PRODUTOS = [
  { nome: 'Perfume Essência Noir 100ml', marca: 'Marca Premium',  categoria: 'Perfumes',     origem: 'Fábrica SP' },
  { nome: 'Analgésico Pharma 500mg',     marca: 'Pharma Brasil',  categoria: 'Medicamentos', origem: 'Laboratório RJ' },
  { nome: 'Bolsa Couro Edição Limitada', marca: 'LuxBrand',       categoria: 'Luxo',         origem: 'Importado — Itália' },
  { nome: 'Smartphone X1 128GB',         marca: 'TechBrand',      categoria: 'Eletrônicos',  origem: 'Manaus AM' },
  { nome: 'Vinho Reserva 750ml',         marca: 'Vinícola Sul',   categoria: 'Bebidas',       origem: 'Vinícola RS' },
  { nome: 'Creme Facial Anti-idade',     marca: 'Cosméticos Bela', categoria: 'Cosméticos',   origem: 'Fábrica MG' },
  { nome: 'Pastilha de Freio Original',  marca: 'AutoPeças Pro',  categoria: 'Autopeças',     origem: 'Fábrica PR' },
];

/* ---------------------------------------------------------------------------
   Estrutura do "banco":
   {
     usuarios:  [{ usuario, senha }],
     produtos:  [{ id, qrcode, nome, marca, categoria, origem, lote,
                   dataFabricacao, vendido, dataVenda, localVenda }],
     logs:      [{ qrcode, resultado, dataHora }]
   }
   --------------------------------------------------------------------------- */

function dbPadrao() {
  return {
    usuarios: [
      { usuario: 'admin', senha: 'admin123' }
    ],
    produtos: [],
    logs: [],
  };
}

function dbLer() {
  const raw = localStorage.getItem(SARA_DB_KEY);
  if (!raw) {
    const inicial = dbPadrao();
    localStorage.setItem(SARA_DB_KEY, JSON.stringify(inicial));
    return inicial;
  }
  try {
    return JSON.parse(raw);
  } catch {
    const inicial = dbPadrao();
    localStorage.setItem(SARA_DB_KEY, JSON.stringify(inicial));
    return inicial;
  }
}

function dbSalvar(db) {
  localStorage.setItem(SARA_DB_KEY, JSON.stringify(db));
}

function dbResetar() {
  localStorage.removeItem(SARA_DB_KEY);
  return dbLer();
}

/* ---------------------------------------------------------------------------
   Autenticação (simples, local — sem criptografia real, é só para a demo)
   --------------------------------------------------------------------------- */

function autenticar(usuario, senha) {
  const db = dbLer();
  const encontrado = db.usuarios.find(
    u => u.usuario.toLowerCase() === usuario.trim().toLowerCase() && u.senha === senha
  );
  if (!encontrado) return false;
  sessionStorage.setItem(SARA_SESSION_KEY, JSON.stringify({ usuario: encontrado.usuario, login: new Date().toISOString() }));
  return true;
}

function sessaoAtual() {
  const raw = sessionStorage.getItem(SARA_SESSION_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function logout() {
  sessionStorage.removeItem(SARA_SESSION_KEY);
}

function exigirLogin() {
  if (!sessaoAtual()) {
    window.location.href = 'login.html';
  }
}

/* ---------------------------------------------------------------------------
   Geração de código QR único (o "registro de fabricação")
   --------------------------------------------------------------------------- */

function gerarCodigoAleatorio() {
  const ano = new Date().getFullYear();
  const numero = Math.floor(1000 + Math.random() * 9000);
  const sufixo = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SARA-${ano}-${numero}-${sufixo}`;
}

function gerarLote() {
  const mes = String(new Date().getMonth() + 1).padStart(2, '0');
  const ano = new Date().getFullYear();
  const seq = Math.floor(1 + Math.random() * 999);
  return `LT-${ano}${mes}-${String(seq).padStart(3, '0')}`;
}

/* Cria um novo "produto de fábrica" com QR Code único e o grava no banco.
   Por padrão nasce como NÃO vendido (replica o Status: Registrado do PDF). */
function registrarNovoProduto() {
  const db = dbLer();
  const base = CATALOGO_PRODUTOS[Math.floor(Math.random() * CATALOGO_PRODUTOS.length)];
  const codigo = gerarCodigoAleatorio();

  const produto = {
    id: codigo,
    qrcode: codigo,
    nome: base.nome,
    marca: base.marca,
    categoria: base.categoria,
    origem: base.origem,
    lote: gerarLote(),
    dataFabricacao: new Date().toISOString(),
    vendido: false,
    dataVenda: null,
    localVenda: null,
  };

  db.produtos.push(produto);
  dbSalvar(db);
  return produto;
}

/* Simula a passagem do produto pelo caixa do lojista (Status: Vendido) */
function registrarVenda(codigo, localVenda) {
  const db = dbLer();
  const produto = db.produtos.find(p => p.qrcode === codigo);
  if (!produto) return null;
  produto.vendido = true;
  produto.dataVenda = new Date().toISOString();
  produto.localVenda = localVenda || 'Loja Demonstração — PDV 01';
  dbSalvar(db);
  return produto;
}

/* ---------------------------------------------------------------------------
   Verificação de autenticidade — o núcleo do S.A.R.A
   Replica a lógica do slide "O gatilho que torna a falsificação inútil":
   se o mesmo QR (já vendido) for escaneado mais de uma vez, é fraude.
   --------------------------------------------------------------------------- */

function verificarCodigo(codigoBruto) {
  const codigo = (codigoBruto || '').trim().toUpperCase();
  const db = dbLer();

  if (!codigo) {
    return { resultado: 'erro', mensagem: 'Informe um código para verificar.' };
  }

  const produto = db.produtos.find(p => p.qrcode === codigo);

  if (!produto) {
    registrarLog(codigo, 'nao_encontrado');
    return {
      resultado: 'nao_encontrado',
      codigo,
      mensagem: 'Este QR Code não está cadastrado no sistema S.A.R.A.',
    };
  }

  const totalScansAnteriores = db.logs.filter(l => l.qrcode === codigo).length;

  // Produto registrado na fábrica mas ainda não vendido em loja
  if (!produto.vendido) {
    registrarLog(codigo, 'nao_vendido');
    return {
      resultado: 'nao_vendido',
      codigo,
      produto,
      mensagem: 'Produto registrado na fábrica, mas ainda sem registro de venda em loja.',
    };
  }

  // Produto vendido e essa é a primeira verificação pós-venda → autêntico
  if (produto.vendido && totalScansAnteriores === 0) {
    registrarLog(codigo, 'original');
    return {
      resultado: 'original',
      codigo,
      produto,
      mensagem: 'Origem verificada — produto registrado e vendido legitimamente.',
    };
  }

  // Produto vendido e já havia sido verificado antes → conflito / possível fraude
  registrarLog(codigo, 'fraude');
  return {
    resultado: 'fraude',
    codigo,
    produto,
    totalVerificacoes: totalScansAnteriores + 1,
    mensagem: 'ALERTA: este código já foi verificado anteriormente após a venda. Possível clonagem do QR Code ou reutilização da embalagem.',
  };
}

function registrarLog(codigo, resultado) {
  const db = dbLer();
  db.logs.push({ qrcode: codigo, resultado, dataHora: new Date().toISOString() });
  dbSalvar(db);
}

/* ---------------------------------------------------------------------------
   Helpers de listagem (para o painel / histórico)
   --------------------------------------------------------------------------- */

function listarProdutos() {
  return dbLer().produtos.slice().sort((a, b) => new Date(b.dataFabricacao) - new Date(a.dataFabricacao));
}

function listarLogs() {
  return dbLer().logs.slice().sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora));
}

function estatisticas() {
  const db = dbLer();
  return {
    totalProdutos: db.produtos.length,
    totalVendidos: db.produtos.filter(p => p.vendido).length,
    totalFraudes: db.logs.filter(l => l.resultado === 'fraude').length,
    totalVerificacoes: db.logs.length,
  };
}
