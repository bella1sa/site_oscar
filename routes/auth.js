const express = require('express');
const router = express.Router();
const { usuarios } = require('../data/mockDb');

// Login
router.post('/login', (req, res) => {
  const { user, pass } = req.body;
  const conta = usuarios.find(u => u.user === user && u.pass === pass);

  if (!conta) return res.status(401).json({ erro: "Credenciais inválidas!" });

  req.session.usuarioLogado = conta.user;
  res.json({ user: conta.user });
});

// Ver usuário logado
router.get('/me', (req, res) => {
  res.json(req.session.usuarioLogado || null);
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ mensagem: "Sessão encerrada" });
});

module.exports = router;