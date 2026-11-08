# Arquitetura do projeto

## 1. Objetivo técnico

Este projeto demonstra como construir um portfólio rico sem framework. A aplicação usa apenas recursos nativos do navegador, o que reduz a barreira de entrada e deixa cada decisão visível para quem está estudando.

## 2. Camadas

### Estrutura — `index.html`

Contém apenas elementos permanentes da página. Listas que mudam por idioma — competências, projetos, processo e recomendações — possuem contêineres vazios com atributos `data-*` e são renderizadas pelo JavaScript.

### Apresentação — `css/styles.css`

O arquivo começa com os *design tokens* em `:root`: cores, tipografia, largura máxima e raio. Depois vêm componentes reutilizáveis e, ao final, breakpoints e preferências de movimento.

Uma ordem útil para estudar o CSS:

1. tokens e reset;
2. introdução e cabeçalho;
3. hero e estatísticas;
4. grids de conteúdo;
5. modal;
6. responsividade;
7. movimento reduzido.

### Conteúdo — `js/content.js`

`window.PORTFOLIO_CONTENT` possui duas versões paralelas: `pt` e `en`. Cada idioma contém:

- `ui`: textos associados aos atributos `data-i18n`;
- `filters`: rótulos dos filtros;
- `expertise`, `projects`, `process` e `quotes`: coleções renderizadas.

Manter o conteúdo fora do controlador facilita tradução, revisão e futura migração para um CMS.

### Comportamento — `js/app.js`

O controlador mantém somente dois estados:

```js
const state = { lang: "pt", filter: "all" };
```

As principais funções são:

| Função | Responsabilidade |
| --- | --- |
| `translatePage()` | Atualiza os textos estáticos e renderiza as coleções |
| `renderProjects()` | Cria cards conforme idioma e filtro |
| `setLanguage()` | Troca idioma e atualiza a URL |
| `openProject()` | Preenche e abre o estudo de caso |
| `observeReveals()` | Ativa animações quando elementos entram na tela |
| `animateCounters()` | Anima os indicadores do hero uma única vez |

## 3. Fluxo de eventos

```text
carregamento
   ↓
init()
   ├─ conecta eventos
   ├─ escolhe idioma pela URL
   ├─ renderiza conteúdo
   └─ observa animações e contadores

clique em idioma ─→ atualiza estado ─→ renderiza novamente
clique em filtro  ─→ atualiza estado ─→ renderiza projetos
clique em projeto ─→ encontra dados  ─→ abre <dialog>
```

## 4. Decisões importantes

- **Sem build:** reduz dependências e facilita GitHub Pages.
- **Progressive enhancement:** o conteúdo principal permanece no HTML; JavaScript aprimora listas, idiomas e interações.
- **`data-*` como contrato:** o HTML informa a intenção sem acoplar estilos às funções.
- **Modal nativo:** `<dialog>` oferece semântica e comportamento de foco superiores a uma `<div>` improvisada.
- **URL com idioma:** `?lang=en` permite compartilhar uma versão específica.
- **Dados pessoais separados do código:** simplifica a adaptação para outro portfólio.

## 5. Melhorias possíveis

- testes automatizados com Playwright;
- conteúdo em arquivos JSON ou Markdown;
- geração estática de páginas individuais para projetos;
- formulário com serviço de e-mail e proteção contra spam;
- auditoria contínua de acessibilidade com Lighthouse ou axe;
- pipeline do GitHub Actions para validação e publicação.
