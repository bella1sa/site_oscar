const express = require('express');
const router = express.Router();

const { produtos } = require('../data/mockDb');


router.get('/', (req, res) => {
  let resultado = [...produtos];
  const { busca, categoria, ordem } = req.query;

  if (busca) resultado = resultado.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()));
  if (categoria) resultado = resultado.filter(p => p.categoria === categoria);
  
  if (ordem === 'asc') resultado.sort((a, b) => a.preco - b.preco);
  if (ordem === 'desc') resultado.sort((a, b) => b.preco - a.preco);

  res.json(resultado);
});

router.get('/:id', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
  res.json(produto);
});


router.post('/', (req, res) => {
  const { nome, preco, categoria, estoque, desc } = req.body;
  const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
  const novo = { id: novoId, nome, preco: parseFloat(preco), estoque: parseInt(estoque), categoria, avaliacoes: [], desc };
  produtos.push(novo);
  res.json(novo);
});

router.put('/:id', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });

  if (req.body.nome) produto.nome = req.body.nome;
  if (req.body.preco) produto.preco = parseFloat(req.body.preco);
  if (req.body.categoria) produto.categoria = req.body.categoria;
  if (req.body.estoque) produto.estoque = parseInt(req.body.estoque);
  if (req.body.desc) produto.desc = req.body.desc;

  res.json(produto);
});


router.delete('/:id', (req, res) => {
  const index = produtos.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) produtos.splice(index, 1);
  res.json({ mensagem: "Produto excluído com sucesso!" });
});


router.post('/:id/avaliacoes', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
  produto.avaliacoes.push(parseInt(req.body.nota));
  res.json(produto);
});

module.exports = router;