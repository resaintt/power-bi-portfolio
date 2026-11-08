# Portfólio — Renaê Arantes

Portfólio **Power BI & Data Analytics** desenvolvido em HTML, CSS e JavaScript puro. O projeto apresenta o trabalho de Renaê Arantes e também serve como estudo de caso de um site de portfólio acessível, responsivo, bilíngue e sem dependências.

## O que você pode estudar aqui

- HTML semântico e navegação por seções;
- design responsivo com Grid, Flexbox e variáveis CSS;
- sistema visual escuro com detalhes em dourado;
- conteúdo bilíngue centralizado em um único arquivo;
- renderização de listas e cards a partir de dados;
- filtros de projetos e modal acessível com `<dialog>`;
- animações progressivas com `IntersectionObserver`;
- respeito a `prefers-reduced-motion`;
- publicação de um site estático no GitHub Pages.

## Executar localmente

Não é necessário instalar pacotes.

1. Clone ou baixe o repositório.
2. Na pasta do projeto, inicie um servidor estático:

```bash
python -m http.server 8000
```

3. Abra `http://localhost:8000` no navegador.

Também é possível abrir `index.html` diretamente, mas um servidor local reproduz melhor o ambiente de publicação.

## Estrutura

```text
portfolio/
├── index.html              # Estrutura semântica e seções da página
├── css/
│   └── styles.css          # Sistema visual, layout e responsividade
├── js/
│   ├── content.js          # Conteúdo em português e inglês
│   └── app.js              # Estado, renderização e interações
├── assets/
│   ├── icons/              # Ícones das tecnologias
│   ├── images/             # Retrato usado no hero
│   └── README.md           # Origem e regras dos recursos visuais
├── docs/
│   ├── ARCHITECTURE.md     # Decisões técnicas e fluxo da aplicação
│   └── CUSTOMIZATION.md    # Guia para adaptar o projeto
├── CONTRIBUTING.md
└── LICENSE
```

## Como o projeto funciona

O HTML contém a estrutura estável: introdução, cabeçalho, hero, seções e modal. O arquivo `content.js` funciona como uma pequena camada de dados. O `app.js` escolhe o idioma, renderiza os componentes repetidos e conecta os eventos de interface. O CSS concentra tokens, componentes e breakpoints.

Leia [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) para entender o fluxo completo e [docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md) para criar sua própria versão.

## Publicar no GitHub Pages

1. Abra **Settings → Pages** no repositório.
2. Em **Build and deployment**, escolha **Deploy from a branch**.
3. Selecione a branch `main` e a pasta `/ (root)`.
4. Salve e aguarde o endereço público ser gerado.

Como todos os caminhos são relativos, nenhuma alteração é necessária para o Pages.

## Acessibilidade

- link para pular diretamente ao conteúdo;
- navegação com rótulos e estados ARIA;
- modal nativo com gerenciamento de foco pelo navegador;
- contraste alto e foco visível;
- animações reduzidas quando o sistema solicita;
- textos alternativos para imagens relevantes.

## Licença

O **código-fonte** está disponível sob a licença MIT. O retrato, o conteúdo pessoal, as recomendações e elementos de marca não fazem parte dessa licença; consulte [assets/README.md](assets/README.md).

## Créditos

Projeto e conteúdo: **Renaê Arantes**.

