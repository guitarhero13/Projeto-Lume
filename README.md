# Lume — Protótipo ampliado para apresentação

## Estrutura

```text
lume_projeto/
├── index.html
├── style.css
├── script.js
└── assets/
    └── logo-lume.png
```

## Como abrir
1. Extraia o ZIP mantendo a pasta `assets` junto dos arquivos.
2. Abra `index.html` em um navegador moderno.
3. Não é necessário instalar servidor, banco de dados ou criar uma conta.

## O que o protótipo demonstra
- Feed com publicações de exemplo e filtros por assunto.
- Busca de publicações.
- Criação de perguntas e escolha de publicação anônima.
- Curtidas, comentários, salvar e compartilhamento demonstrativo.
- Seções para minhas perguntas, salvos e comunidades.
- Participação simulada em comunidades.
- Área de podcasts e lives com conteúdos fictícios para apresentação.
- Demonstração visual do espaço de apoio.
- Perfil demonstrativo sem e-mail, telefone ou cadastro real.
- Layout responsivo para computador e celular.

## Dados e privacidade
Este é um protótipo front-end. Não há servidor, autenticação ou banco de dados. As publicações criadas, preferências, curtidas, comentários e itens salvos são armazenados somente no `localStorage` do navegador usado na demonstração. Eles não são enviados para uma equipe nem ficam disponíveis em outros dispositivos. É possível limpar os dados do site nas configurações do navegador.

Os nomes, publicações, contagens, comunidades, eventos e conteúdos são fictícios para demonstração. O espaço de apoio é explicitamente identificado como não monitorado. O protótipo não oferece atendimento de saúde, diagnóstico ou orientação profissional.

## Observação sobre imagens
A interface mantém a logo oficial fornecida pela equipe e utiliza ícones vetoriais simples. Não usa fotografias geradas por inteligência artificial nem depende de serviços externos de imagens.


## Atualização de acessibilidade e perfis demonstrativos
- Modo escuro completo, com fundos, cartões, campos e textos adaptados; preserva a identidade visual azul-marinho, verde e dourada do Lume.
- Controles para diminuir, aumentar e restaurar o zoom (80% a 150%); em telas grandes, o site abre em 110% para facilitar a leitura.
- Leitura em voz alta do conteúdo da seção atual, usando a voz em português disponível no navegador.
- Preferências de acessibilidade salvas localmente neste navegador.
- Publicações de exemplo atribuídas aos integrantes Christian, Eduarda, Isabella, Alexandre e Matheus; o post anônimo continua sem identificação.

As publicações atribuídas aos integrantes são exemplos para a apresentação, não registros de conversas reais.

## Persistência do feed
O carregamento combina as publicações-base de demonstração com as publicações criadas localmente. Isso evita que uma versão antiga/incompleta do armazenamento local esconda publicações de exemplo. Ao trocar de seção, a busca antiga é limpa para não deixar o feed aparentemente vazio.


## Acessibilidade
O botão de acessibilidade permite alternar entre modo claro e modo escuro completo, ajustar o zoom e iniciar/interromper a leitura em voz alta do conteúdo principal. A leitura utiliza a funcionalidade de síntese de voz do navegador e depende do suporte de voz em português no dispositivo.
