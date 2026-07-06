
let produtos = [
  { id: 1, nome: "Notebook Gamer", preco: 4500, estoque: 8, categoria: "Eletrônicos", avaliacoes: [5, 5, 4], desc: "RTX 3060, 16GB RAM" },
  { id: 2, nome: "Mouse Wireless", preco: 150, estoque: 20, categoria: "Acessórios", avaliacoes: [4, 3], desc: "Sensor óptico 1600dpi" },
  { id: 3, nome: "Luminária LED", preco: 80, estoque: 15, categoria: "Casa", avaliacoes: [5], desc: "Luz branca fria" }
];

let usuarios = [
  { user: "admin", pass: "123" }
];

module.exports = { produtos, usuarios };