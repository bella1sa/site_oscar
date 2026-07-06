const express = require('express');
const router = express.Router();
const { produtos } = require('../data/mockDb');

router.use((req, res, next) => {
  if (!req.session.carrinho) {
    req.session.carrinho = [];
  }
  next();
});

router.get('/', (req, res) => {
  const itens = req.session.carrinho;
  const total = itens.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
  res.json({ itens, total });
});

router.post('/', (req, res) => {
  const { produtoId, quantidade } = req.body;
  const produtoOriginal = produtos.find(p => p.id === parseInt(produtoId));

  if (!produtoOriginal) return res.status(404).json({ erro: "Produto não encontrado" });

  const itemNoCarrinho = req.session.carrinho.find(item => item.id === produtoOriginal.id);
  const qtdAAdicionar = parseInt(quantidade) || 1;

  if (itemNoCarrinho) {
    itemNoCarrinho.quantidade += qtdAAdicionar;
  } else {
    req.session.carrinho.push({
      id: produtoOriginal.id,
      nome: produtoOriginal.nome,
      preco: produtoOriginal.preco,
      quantidade: qtdAAdicionar
    });
  }

  res.json(req.session.carrinho);
});

router.post('/finalizar', (req, res) => {
  const carrinho = req.session.carrinho;

  if (!carrinho || carrinho.length === 0) {
    return res.status(400).json({ erro: "Carrinho vazio" });
  }


  for (const item of carrinho) {
    const pOriginal = produtos.find(p => p.id === item.id);
    if (!pOriginal || pOriginal.estoque < item.quantidade) {
      return res.status(400).json({ erro: `Estoque insuficiente para: ${item.nome}` });
    }
  }

  
  for (const item of carrinho) {
    const pOriginal = produtos.find(p => p.id === item.id);
    pOriginal.estoque -= item.quantidade;
  }

  req.session.carrinho = []; 
  res.json({ mensagem: "Compra finalizada com sucesso!" });
});

module.exports = router;