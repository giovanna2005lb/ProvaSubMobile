# 🎬 MovieHub Mobile

Aplicativo mobile desenvolvido em **React Native com Expo** como projeto prático da disciplina
**Mobile Application Development** (Avaliação Substitutiva).

## 📱 Sobre o app

O MovieHub é um catálogo de filmes que permite ao usuário:

- Fazer login informando seu nome (fluxo de boas-vindas).
- Visualizar uma lista de filmes populares.
- Buscar filmes por nome.
- Ver detalhes completos de um filme (sinopse, nota, gêneros, data de lançamento).
- Adicionar e remover filmes da lista de favoritos (persistência local offline).
- Acessar uma tela de perfil, tirar uma foto com a câmera do dispositivo e usá-la como avatar.
- Alternar entre tema claro e escuro (Context API + AsyncStorage).

## 🌐 API Pública utilizada

Este projeto consome a API do **[The Movie Database (TMDB)](https://www.themoviedb.org/)**.

- `GET /movie/popular` — lista de filmes populares.
- `GET /search/movie` — busca de filmes por nome.
- `GET /movie/{id}` — detalhes de um filme específico.

> ⚠️ É necessário criar uma conta gratuita no TMDB e gerar uma **API Key** em
> `https://www.themoviedb.org/settings/api`. Após gerar, substitua o valor de `API_KEY` no
> arquivo `src/services/api.js`.

## 🗂️ Estrutura de pastas

```
src/
├── assets/        # Imagens locais, ícones e logos
├── components/    # Componentes reutilizáveis (MovieCard, PrimaryButton, CustomInput)
├── contexts/       # Context API (AuthContext, ThemeContext)
├── routes/        # Navegação (Stack + Bottom Tabs)
├── services/       # Chamadas à API e persistência (AsyncStorage)
└── screens/        # Telas do aplicativo
    ├── Login.js
    ├── Home.js
    ├── Detalhes.js
    ├── Favoritos.js
    └── Perfil.js
```

## 🧩 Requisitos técnicos atendidos

| Módulo | Implementação |
|---|---|
| **M1** | `SafeAreaView`, `View`, `Text`, `Image`, `useState` em formulários e modais, 5 telas no total |
| **M2** | Navegação em Pilha (Login → App, Home → Detalhes) + Bottom Tabs (Filmes, Favoritos, Perfil) + Context API (`AuthContext` e `ThemeContext`) |
| **M3** | `AsyncStorage` para salvar sessão do usuário, tema e lista de favoritos (Create, Read, Update, Delete) |
| **M4** | `useEffect` para buscar dados da API TMDB; CRUD com GET (lista), GET (detalhes), e operações locais de favoritos |
| **M5** | `expo-camera` para capturar foto e definir como avatar do usuário no perfil |

## 🚀 Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão LTS recomendada)
- Aplicativo **Expo Go** instalado no smartphone (Android ou iOS), ou um emulador configurado

### Passo a passo

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd MovieHub

# 2. Instale as dependências
npm install

# 3. Configure sua API Key do TMDB
# Abra o arquivo src/services/api.js e substitua:
# export const API_KEY = 'SUA_API_KEY_AQUI';

# 4. Inicie o projeto
npx expo start
```

Após iniciar, escaneie o QR Code com o app **Expo Go** (Android/iOS) ou pressione `a` para abrir
no emulador Android / `i` para o simulador iOS.

## 🎥 Demonstração

O vídeo de demonstração (até 2 minutos) mostra:

1. Tela de login e navegação para a Home.
2. Listagem e busca de filmes (consumo da API).
3. Acesso aos detalhes de um filme.
4. Adição/remoção de favoritos (persistência local).
5. Tela de perfil com captura de foto via câmera e troca de tema.

## 👨‍💻 Autor
Giovanna Bueno RM - 556242
Projeto desenvolvido para a disciplina de Mobile Application Development — Prof. Fernando Pinéo.
