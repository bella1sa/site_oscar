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






///////////////////////////////////////////////////////////////////////////////////////////////////

// ==========================================
// 4. ROTA PARA DELETAR (EXCLUIR)
// ==========================================
app.delete('/api/itens/:id', (req, res) => {
  const lista = lerArquivo();
  const idProcurado = parseInt(req.params.id);

  let posicao = -1;

  // Procura em qual posição do Array o ID está
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === idProcurado) {
      posicao = i; // Guarda a posição (ex: 0, 1, 2...)
      break;
    }
  }

  if (posicao === -1) {
    return res.json({ erro: "Item não encontrado!" });
  }

  // O comando .splice() remove o item usando a posição dele
  lista.splice(posicao, 1);
  
  salvarArquivo(lista); // Salva a lista sem o item removido
  res.json({ mensagem: "Excluído com sucesso!" });
});

// LIGA O SERVIDOR
app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});