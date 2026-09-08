# jamille-paysano

Site pessoal de Jamille Paysano Hissa. Designer de moda pela UNAMA e administradora
pelo CESUPA, em Belém do Pará.

O site existe por um motivo prático: o currículo dela tem uma seção de projetos que
manda o recrutador para cá. Sem site, aquele link fica quebrado.

## Estrutura

```
index.html            Hero, sobre, grade de expertise, eixos de atuação
pages/experiencia.html
pages/formacao.html
pages/projetos.html   Casos de trabalho, com espaço para imagem
pages/contato.html
css/styles.css        Tokens de cor e tipografia num arquivo só
js/script.js          Header, menu mobile, reveal
```

## Identidade

Fundo osso, tinta quase preta, argila como acento. Bodoni Moda no display e
DM Sans no corpo, que é o par que dá o registro editorial de moda sem perder
a legibilidade de um documento profissional.

Tokens em `:root` no topo de `css/styles.css`. Trocar o acento é trocar
`--clay` em um lugar só.

## O que falta

- Imagens dos projetos em `assets/images/`. Os placeholders em `pages/projetos.html`
  estão marcados e devem ser substituídos por foto real de coleção, estampa e desfile.
- Foto de perfil, se ela quiser uma.
- Números no texto: quantos clientes, quantas coleções. Hoje o site diz "sete anos"
  e nada mais.

## Rodar local

```bash
python3 -m http.server 8000
```

## Publicar

O workflow em `.github/workflows/static.yml` publica no GitHub Pages a cada push
na `main`. Ative em Settings, Pages, Source: GitHub Actions.
