# Remove Background Frontend - React

Projeto React para remover o fundo de imagens utilizando sua API de backend.

## Pré-requisitos

* Node.js (versão 18 ou superior recomendada)
* npm (vem junto com Node.js) ou yarn
* API de backend rodando (FastAPI) e acessível publicamente

## Estrutura do projeto

```
remove-bg-frontend/
├─ public/
│  └─ index.html
├─ src/
│  ├─ App.js
│  ├─ index.js
│  └─ styles.css
├─ package.json
└─ README.md
```

## Passo a passo para executar localmente

1. **Clone ou descompacte o projeto**

```bash
unzip remove-bg-frontend.zip
cd remove-bg-frontend
```

2. **Instale as dependências**

```bash
npm install
# ou, se preferir yarn:
yarn install
```

3. **Configure o endpoint da API**

No arquivo `src/App.js`, altere a URL do fetch para o endpoint público da sua API FastAPI:

```javascript
const response = await fetch("https://sua-api-publica.com/remove-background/", {
  method: "POST",
  body: formData,
});
```

4. **Rodar o projeto em modo desenvolvimento**

```bash
npm start
# ou yarn start
```

* O projeto abrirá automaticamente no navegador em `http://localhost:3000`.
* Você poderá selecionar uma imagem, visualizar a prévia, remover o fundo e baixar o resultado.

5. **Gerar build para produção**

```bash
npm run build
# ou yarn build
```

* O build será gerado na pasta `build/` e poderá ser deployado em Vercel ou outro serviço de hospedagem.

## Funcionalidades

* Upload de imagem com pré-visualização
* Envio da imagem para a API de remoção de fundo
* Download da imagem resultante
* Botão de limpar seleção
* Mensagens de erro amigáveis
* Interface responsiva

## Observações

* Certifique-se de que a sua API backend permite requisições do frontend (CORS habilitado).
* Se utilizar Vercel para deploy, troque a URL do fetch para a URL pública do backend.
* Imagens muito grandes podem demorar mais para processar, dependendo do desempenho da API.
