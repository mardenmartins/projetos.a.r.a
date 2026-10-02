# 🔐 S.A.R.A.

## Sistema Automático de Reconhecimento de Autenticidade

> **O padrão universal contra a falsificação. Da fábrica para as mãos do consumidor.**

O **S.A.R.A. — Sistema Automático de Reconhecimento de Autenticidade** é uma solução tecnológica desenvolvida para combater a **falsificação de produtos**, utilizando uma identidade digital única para cada unidade produzida.

A proposta é conectar o produto físico ao ambiente digital por meio de um **QR Code exclusivo**, permitindo registrar sua origem, acompanhar sua jornada e verificar sua autenticidade no momento da compra.

---

## 🎯 O problema

A produção e circulação de produtos falsificados provocam impactos significativos para consumidores, empresas e para o mercado.

Entre os principais problemas estão:

- 💰 **Prejuízos financeiros** para empresas e consumidores;
- 🩺 **Riscos à saúde**, especialmente em produtos como medicamentos, cosméticos, alimentos e bebidas;
- 🏷️ **Danos à reputação das marcas**;
- 📦 **Reutilização não autorizada de embalagens originais**;
- 🔎 Dificuldade de verificar a procedência e autenticidade de determinados produtos.

A necessidade identificada é desenvolver uma solução tecnológica capaz de proporcionar **maior segurança e rastreabilidade** durante a circulação dos produtos.

---

## 💡 A solução

O S.A.R.A. propõe uma mudança na forma de identificação dos produtos.

Enquanto o código de barras tradicional identifica genericamente um lote ou modelo e pode ser reproduzido, o S.A.R.A. trabalha com uma **identidade exclusiva para cada unidade do produto**.

Cada produto recebe um **QR Code único**, associado a um registro digital que contém informações sobre sua fabricação e acompanha sua jornada até a venda.

### 🔐 Identidade digital do produto

Cada unidade passa a possuir um registro próprio, funcionando como uma espécie de **“impressão digital” digital do produto**.

O sistema registra informações como:

- Nome do produto;
- Marca responsável;
- Lote de fabricação;
- Código de barras;
- Data de fabricação;
- Local de origem/distribuição;
- Data da venda;
- Horário da transação;
- Local da venda;
- Status do produto;
- Histórico de rastreabilidade.



---

## 🔄 Como funciona

O funcionamento do S.A.R.A. é baseado em uma jornada de rastreabilidade composta por quatro momentos principais:

```text
🏭 FABRICAÇÃO
      │
      ▼
📋 REGISTRO DO PRODUTO
      │
      ▼
🔐 QR CODE ÚNICO
      │
      ▼
🚛 DISTRIBUIÇÃO
      │
      ▼
🏪 VENDA NO PDV
      │
      ▼
📍 REGISTRO DA VENDA
      │
      ▼
📱 VERIFICAÇÃO PELO CONSUMIDOR
      │
      ▼
✅ AUTÊNTICO
      │
      └──────────────► ⚠️ CONFLITO DETECTADO
```

### 1. 🏭 Registro de fabricação

Durante a fabricação, o produto recebe seu **QR Code único** e suas informações são registradas no sistema.

O produto passa a possuir uma identidade digital individual.

### 2. 🚛 Distribuição

O produto segue pela cadeia logística até chegar ao estabelecimento comercial.

### 3. 🏪 Registro da venda

No ponto de venda, o código de barras é utilizado para registrar a comercialização.

O S.A.R.A. associa a identidade do produto à:

- Data da venda;
- Horário;
- Local da transação;
- Situação do produto.

O status passa a ser **“Vendido”**.

### 4. 📱 Verificação

Após a compra, o consumidor pode escanear o QR Code utilizando a câmera do celular.

O sistema consulta a identidade digital e verifica as informações registradas para confirmar a autenticidade do produto.

---

## ⚠️ Detecção de falsificações

Um dos principais diferenciais do S.A.R.A. é a possibilidade de identificar conflitos relacionados à reutilização ou clonagem de identificadores.

Imagine que um falsificador copie fisicamente uma embalagem original e reproduza o QR Code de um produto legítimo.

Se aquele produto original já tiver sido vendido por uma loja oficial, o sistema terá registrado sua venda.

Quando o QR Code copiado for posteriormente consultado, o S.A.R.A. poderá identificar uma inconsistência no histórico ou na localização do produto.

```text
PRODUTO ORIGINAL
      │
      ├── QR Code: #A12345
      │
      └── Venda registrada
              │
              ▼
          STATUS: VENDIDO


PRODUTO FALSIFICADO
      │
      ├── QR Code copiado: #A12345
      │
      └── Nova tentativa de verificação
              │
              ▼
       ⚠️ CONFLITO DETECTADO
```

Assim, a simples clonagem do código deixa de ser suficiente para conferir legitimidade ao produto.

---

## 🏗️ Arquitetura da solução

A arquitetura conceitual do S.A.R.A. é composta por três camadas:

```text
┌──────────────────────────────────────────┐
│              LAYER 1                     │
│          CLIENTE / ACESSO                │
│                                          │
│  🏪 PDV                  📱 Consumidor   │
│  Código de barras        QR Code         │
└───────────────────┬──────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────┐
│              LAYER 2                     │
│          SERVIDOR / API S.A.R.A.         │
│                                          │
│  • Processamento                         │
│  • Validação                             │
│  • Cruzamento de históricos              │
│  • Verificação de duplicidades           │
│  • Detecção de inconsistências            │
└───────────────────┬──────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────┐
│              LAYER 3                     │
│      BANCO DE DADOS / NUVEM              │
│                                          │
│  Identidade digital dos produtos         │
│  Histórico de rastreabilidade            │
└──────────────────────────────────────────┘
```

A apresentação do projeto estrutura a solução justamente nessas três camadas: cliente, servidor/API e banco de dados central em nuvem.

---

## 🌎 Aplicações

A solução foi concebida para ser adaptável a diferentes segmentos que sofrem com falsificação.

Entre eles:

- 💊 Medicamentos;
- 🧴 Cosméticos;
- 🥤 Bebidas;
- 🍔 Alimentos;
- 📱 Eletrônicos;
- 💎 Produtos de luxo;
- 👕 Roupas e acessórios;
- 🚗 Peças automotivas.

A proposta apresentada é utilizar o mesmo conceito de identidade e rastreabilidade em diferentes superfícies e setores.

---

## 👥 Quem se beneficia?

### 👤 Consumidor

- Verificação da autenticidade;
- Maior segurança na compra;
- Redução do risco de adquirir produtos falsificados;
- Facilidade de consulta por meio do QR Code.

### 🏭 Empresas e marcas

- Combate à falsificação;
- Rastreabilidade dos produtos;
- Proteção da marca;
- Maior controle sobre a distribuição.

### 🏪 Estabelecimentos

- Registro das vendas;
- Associação do produto ao local da comercialização;
- Contribuição para a rastreabilidade.

### 🏛️ Mercado e órgãos reguladores

- Maior transparência;
- Dados auditáveis;
- Apoio ao combate à circulação de mercadorias adulteradas;
- Fortalecimento do mercado formal.



---

## 🛠️ Tecnologias

O projeto utiliza tecnologias de desenvolvimento Web para construção do MVP:

| Tecnologia | Utilização |
|---|---|
| **HTML5** | Estrutura da aplicação |
| **CSS3** | Interface e estilização |
| **JavaScript** | Lógica e interações |
| **Git** | Controle de versão |
| **GitHub** | Hospedagem do código e colaboração |
| **GitHub Pages** | Publicação do MVP |

---

## 📁 Estrutura do projeto

```text
projetos.a.r.a/
│
├── index.html       # Página principal
├── login.html       # Interface de acesso
├── style.css        # Estilos da aplicação
├── db.js            # Estrutura relacionada aos dados
└── README.md        # Documentação
```

---

## 🚀 Como executar

### Pré-requisitos

- Git;
- Navegador Web atualizado;
- Visual Studio Code ou outro editor de código.

### Clone o repositório

```bash
git clone https://github.com/mardenmartins/projetos.a.r.a.git
```

### Acesse o diretório

```bash
cd projetos.a.r.a
```

### Execute

Abra o arquivo:

```text
index.html
```

Para desenvolvimento local, recomenda-se utilizar o **Live Server** no Visual Studio Code.

---

## 📌 MVP

O MVP do S.A.R.A. concentra-se na validação do conceito central da solução:

> **Um produto físico → uma identidade digital → um QR Code único → registro da venda → verificação da autenticidade.**

A primeira versão busca demonstrar que é possível conectar o produto físico ao ambiente digital e utilizar seu histórico para auxiliar na identificação de possíveis falsificações.

Funcionalidades mais avançadas, como integração com Blockchain, inteligência de mercado e programas de fidelidade, fazem parte da visão de evolução do produto e não constituem o núcleo inicial do MVP.

---

## 🔮 Visão de futuro

O S.A.R.A. foi concebido para evoluir além da simples verificação de autenticidade.

A arquitetura pode futuramente permitir:

### 📊 Inteligência de mercado

Utilização dos dados de rastreabilidade para compreender padrões de distribuição e consumo.

### 🎯 Engajamento e marketing

A página de verificação pode futuramente ser integrada a programas de fidelidade e estratégias de relacionamento com consumidores.

### ⛓️ Blockchain

A arquitetura foi projetada com possibilidade de integração futura com tecnologias Blockchain para aumentar o nível de imutabilidade e descentralização dos registros.

---

## 🎓 Projeto acadêmico

O S.A.R.A. foi desenvolvido no contexto do **5º SENAC INNOVADAY**, pela **Faculdade de Tecnologia e Inovação Senac-DF**, em Brasília, no ano de 2026.

O projeto busca demonstrar como tecnologias de desenvolvimento de software podem ser aplicadas a um problema real: **a falsificação e a dificuldade de verificar a autenticidade de produtos**.

---

## 👨‍💻 Equipe

O S.A.R.A. é desenvolvido por:

- **Marden Martins**
- **Raiane Reis**
- **Lucas Cavalcante**
- **Henrique Paixão**
- **Walisson Araújo**

---

## 📊 Impacto esperado

O S.A.R.A. busca contribuir para:

**🔐 Mais segurança**  
Produtos com identidade digital verificável.

**🏭 Mais proteção para as marcas**  
Maior controle e rastreabilidade da cadeia.

**👤 Mais confiança para o consumidor**  
Possibilidade de verificar a autenticidade antes ou após a compra.

**📦 Mais rastreabilidade**  
Registro da jornada do produto desde sua fabricação até sua venda.

**⚠️ Menos espaço para falsificações**  
Detecção de conflitos relacionados à reutilização ou clonagem de identificadores.

---

## 🔗 Links

### 💻 Repositório

https://github.com/mardenmartins/projetos.a.r.a

### 🌐 Aplicação

https://mardenmartins.github.io/projetos.a.r.a/

---

<div align="center">

# 🔐 S.A.R.A.

### Sistema Automático de Reconhecimento de Autenticidade

**Uma identidade digital para cada produto.**

**Da fábrica para as mãos do consumidor.**

---

Desenvolvido por  
**Marden Martins · Raiane Reis · Lucas Cavalcante · Henrique Paixão · Walisson Araújo**

**5º SENAC INNOVADAY · 2026**

</div>
