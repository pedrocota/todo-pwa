# Leve — Gerenciador de Tarefas (PWA)

Aplicativo React responsivo com estilo neumórfico, filtros de tarefas, persistência local e suporte a Progressive Web App.

## Requisitos PWA implementados

- Instalável em navegadores/dispositivos compatíveis, com ícones personalizados via `public/manifest.webmanifest`.
- Indicador Online/Offline que acompanha os eventos de conexão do navegador.
- Service Worker que pré-armazena o shell do app, mantém os recursos estáticos em cache e serve a página inicial quando não há conexão após o primeiro acesso online.
- Tarefas persistidas no `localStorage`, que é uma API do navegador e continua funcionando offline. O Service Worker mantém o app carregável offline; não é ele que armazena os dados das tarefas.

## Executar em desenvolvimento

```bash
npm install
npm run dev
```

Abra o endereço mostrado pelo Vite (geralmente `http://localhost:5173`). O registro do Service Worker fica habilitado na versão de produção para evitar cache durante desenvolvimento.

## Testar a PWA e o modo offline

```bash
npm run build
npm run preview
```

Abra o endereço local apresentado pelo Vite Preview, aguarde o app carregar online uma vez e recarregue. Depois, no DevTools do navegador, use Network → Offline ou desligue a conexão. O app deverá continuar abrindo e permitindo adicionar, concluir, desmarcar e excluir tarefas; as alterações ficam no `localStorage` do mesmo navegador/dispositivo.

Para distribuir pela internet, hospede em HTTPS. `localhost` é considerado contexto seguro para testes locais. Em alguns navegadores, a instalação pode aparecer no menu em vez de ser oferecida automaticamente.

## Publicar no GitHub Pages

O projeto já traz um fluxo automático em `.github/workflows/deploy.yml`: a cada envio para a branch `main`, o GitHub instala as dependências, gera a versão de produção e publica o app.

1. Crie um repositório no GitHub e envie os arquivos do projeto (sem `node_modules` e sem `dist`; o `.gitignore` já cuida disso).
2. No repositório, abra **Settings → Pages** e, em **Build and deployment → Source**, escolha **GitHub Actions**.
3. Acompanhe a publicação na aba **Actions**. Quando terminar, o app estará em `https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/`.

O GitHub Pages usa HTTPS, então o app pode ser instalado como PWA a partir desse endereço, inclusive no celular.
