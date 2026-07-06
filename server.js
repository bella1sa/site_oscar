const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.use(session({
  secret: 'segredo-eshop-pro',
  resave: false,
  saveUninitialized: true
}));

const rotasProdutos = require('./routes/produtos');
const rotasAuth = require('./routes/auth');
const rotasCarrinho = require('./routes/carrinho');

app.use('/api/produtos', rotasProdutos);
app.use('/api/carrinho', rotasCarrinho);
app.use('/api', rotasAuth);


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});