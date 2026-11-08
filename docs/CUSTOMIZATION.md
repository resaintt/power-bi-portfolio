# Guia de personalização

## Trocar identidade e links

No `index.html`, procure por:

- `RENAÊ ARANTES`;
- `linkedin.com/in/renaearantes`;
- os metadados dentro de `<head>`;
- o texto do rodapé.

## Alterar cores e tipografia

Edite as variáveis no início de `css/styles.css`:

```css
:root {
  --bg: #071824;
  --ink: #eef5f8;
  --gold: #ddb769;
  --font: Inter, system-ui, sans-serif;
}
```

Evite substituir cores isoladas ao longo do arquivo. Trabalhar com tokens mantém consistência e facilita novos temas.

## Atualizar conteúdo

Textos e coleções ficam em `js/content.js`. Faça a mesma alteração em `pt` e `en` para manter os idiomas sincronizados.

Um projeto segue este formato:

```js
{
  id: "meu-projeto",
  category: "analytics",
  label: "PROJETO 05 / ANALYTICS",
  title: "Título",
  summary: "Resumo exibido no card.",
  challenge: "Problema enfrentado.",
  solution: "Como foi resolvido.",
  contribution: "Resultado ou aprendizado.",
  tags: ["Power BI", "DAX"]
}
```

O `id` precisa ser único. A categoria deve ter um filtro correspondente.

## Trocar a fotografia

Substitua `assets/images/renae-arantes.png` por uma imagem PNG com fundo transparente. Para manter o enquadramento, use orientação vertical e deixe espaço ao redor do rosto.

## Adicionar uma tecnologia

1. Coloque o ícone em `assets/icons/`.
2. Adicione um novo `<figure>` dentro de `.tool-list` no `index.html`.
3. Verifique o contraste do SVG no fundo escuro.

## Criar uma seção

1. Adicione um `<section>` semântico com `id` único.
2. Inclua o link no menu, se for uma seção principal.
3. Reutilize `.section`, `.shell`, `.section-heading` e `.reveal`.
4. Se houver conteúdo repetido, modele os dados no `content.js` e crie uma função `render...()` no `app.js`.

## Checklist antes de publicar

- testar teclado, menu e modal;
- verificar português e inglês;
- testar 320 px, 768 px e telas largas;
- comprimir imagens grandes;
- revisar links externos;
- confirmar textos alternativos;
- executar uma auditoria do Lighthouse.
