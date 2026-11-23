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

https://pedrocota.github.io/todo-pwa/
