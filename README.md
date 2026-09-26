# MOVA Digital

**Site institucional responsivo desenvolvido com HTML, CSS e JavaScript.**

<img src="assets/logo-mova.png" alt="Logo da MOVA Digital" width="160">

## Sobre o projeto

O site apresenta a MOVA Digital, seu método de trabalho, planos de acompanhamento e serviços avulsos. Os botões de contato direcionam o visitante ao WhatsApp com mensagens específicas para cada plano ou contexto.

A proposta é organizar a apresentação comercial da agência em uma página de navegação simples, com identidade visual própria e adaptação para diferentes tamanhos de tela.

## Funcionalidades

- Apresentação do método MOVA: Mapear, Organizar, Valorizar e Alcançar.
- Cards dos planos Essencial, Crescimento e Performance.
- Seção de serviços e chamadas para solicitar propostas.
- Links para WhatsApp e Instagram.
- Menu mobile com estado acessível, fechamento por `Esc` e navegação por teclado.
- Cabeçalho que muda de aparência durante a rolagem.
- Animações de entrada com `IntersectionObserver`, respeitando a preferência por movimento reduzido.
- Conteúdo e navegação disponíveis mesmo sem JavaScript.
- Atualização automática do ano no rodapé.

## Tecnologias e decisões

| Tecnologia | Aplicação |
| --- | --- |
| HTML | Estrutura semântica, navegação interna e conteúdo |
| CSS | Layout com Grid e Flexbox, variáveis visuais e media queries |
| JavaScript | Menu, gerenciamento de foco, rolagem e animações |
| Google Fonts | Fontes DM Sans e Manrope, com alternativas locais |
| Node.js | Testes opcionais da lógica de interação, sem dependências externas |

O site é estático: não exige instalação de pacotes nem etapa de compilação para funcionar. Os contatos abrem serviços externos; o projeto não contém backend, banco de dados, checkout ou integração com a API do WhatsApp.

## Como executar

1. Baixe ou clone o repositório.
2. Abra `index.html` no navegador.

Para usar um servidor local, com Python instalado, execute na pasta do projeto:

```bash
python -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

As fontes externas e os destinos de contato precisam de internet. O conteúdo local continua disponível com fontes alternativas quando o Google Fonts não carrega.

## Estrutura

| Caminho | Conteúdo |
| --- | --- |
| `index.html` | Página principal |
| `style.css` | Estilos e regras responsivas |
| `script.js` | Interações da interface |
| `assets/logo-mova.png` | Identidade visual |
| `tests/navigation.test.cjs` | Testes de comportamento com DOM simulado |

## Verificações

Com uma versão do Node.js que suporte o executor `node:test`:

```bash
npm run check
npm test
```

Os testes cobrem abertura e fechamento do menu, tecla `Esc`, foco, redimensionamento e alternativas às animações. Eles usam um DOM simulado e não substituem testes em navegadores reais.

Antes de divulgar uma versão, confira também:

- Layout em celular, tablet e desktop.
- Navegação com `Tab`, `Shift+Tab` e `Esc`.
- Conteúdo com JavaScript desativado e movimento reduzido.
- Logo, fontes, links internos e destinos de WhatsApp e Instagram.

## Personalização

- Conteúdo e links comerciais: `index.html`.
- Cores, fontes e espaçamentos: `style.css`.
- Regras de interação: `script.js`.

A folha de estilos mantém a ordem da cascata original, incluindo os ajustes de direção editorial. Os contatos, planos e identidade pertencem à MOVA Digital; revise esses dados ao adaptar o projeto.

## Autor

**Pedro Araujo** — Analista de Sistemas Júnior e estudante de Ciência da Computação.

Projeto da MOVA Digital apresentado como parte do portfólio de desenvolvimento web.
