# MotoDevice Frontend

Frontend do projeto final do **Moto Academy 2.0**, promovido pelo **Instituto de Pesquisas Eldorado**.

Este aplicativo Angular consome a API MotoDevice e oferece uma interface para pesquisa e visualização de informações sobre dispositivos da Motorola, com suporte a inteligência artificial para respostas em linguagem natural, exportação de relatórios, comparação de dispositivos, entre outras funcionalidades.

---

## 🌐 Visão Geral

O frontend foi desenvolvido com **Angular 15+**, incorporando boas práticas aprendidas ao longo do curso, como injeção de dependência, binding, lifecycle hooks, pipes, diretivas, animações e muito mais.

A aplicação consome os dados da API MotoDevice e permite ao usuário:

- Pesquisar modelos de celulares Motorola
- Visualizar detalhes do dispositivo com estilização personalizada
- Consultar informações com IA via Google Gemini
- Exportar relatórios em linguagem natural
- Comparar diferentes dispositivos (versão beta)
- Fazer buscas inteligentes com linguagem natural (versão beta)

---

## 🚀 Tecnologias Utilizadas

- Angular
- TypeScript
- RxJS
- Angular Material
- Google Gemini API (via backend)
- YouTube Data API (via backend)
- Docker (opcional)

---

## ✨ Funcionalidades

### 🔍 Device Page

- Exibição de informações completas do device
- Estilização dinâmica com base nas cores do dispositivo
- Consulta via IA com respostas naturais
- Exportação de relatório formatado

### 🗨️ Ask Intelligence

- Permite ao usuário digitar perguntas sobre o dispositivo
- Integração com API Gemini para respostas personalizadas

### 🎥 Vídeos no YouTube

- Busca automática por reviews relacionados ao modelo pesquisado

### 🔄 Comparação de Devices (Beta)

- Interface para comparar dois modelos simultaneamente

### 🤖 Busca Inteligente (Beta)

- Permite ao usuário digitar em linguagem natural (ex: “Mostrar celulares com 5G”)

---

## 🧠 Conceitos Aplicados

- Two-Way Data Binding
- Event Listeners
- Lifecycle Hooks (`ngOnInit`, `ngOnDestroy`)
- Pipes personalizados
- Diretivas estruturais e de atributos
- Serviço de rotas com `RouterModule`
- HTTP Client para requisições REST
- Injeção de dependência com Services

---

## 📦 Instalação

```bash
npm install
npm start
```

---

## ⚙️ Variáveis de Ambiente

A aplicação não exige configuração de `.env`, mas precisa estar conectada a uma API que esteja com CORS habilitado. No backend, defina:

```env
APP_CLIENT=http://localhost:4200
```

---

## 🚫 Contribuições

Este projeto **não aceita contribuições no momento**, pois se trata de um desafio técnico fechado. No entanto, forks são permitidos!

---

## 📜 Licença

Este projeto foi desenvolvido exclusivamente para fins educacionais e não possui licença de distribuição comercial.
