// 1. ADICIONAR PRODUTO AO CARRINHO (FETCH)
function adicionarAoCarrinho(idDoProduto) {
  fetch('/api/carrinho', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ produtoId: idDoProduto, quantidade: 1 })
  })
  .then(() => {
    alert("Produto adicionado com sucesso!");
    window.location.reload(); 
  });
}

// 2. FINALIZAR COMPRA (FETCH)
function finalizarCompra() {
  fetch('/api/carrinho/finalizar', { method: 'POST' })
  .then(resposta => resposta.json())
  .then(dados => {
    if (dados.erro) {
      alert(dados.erro); 
    } else {
      alert("Compra finalizada! O estoque foi atualizado.");
      window.location.reload();
    }
  });
}

// 3. FAZER LOGIN (FETCH)
function fazerLogin(usuario, senha) {
  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: usuario, pass: senha })
  })
  .then(resposta => {
    if (resposta.ok) {
      alert("Logado com sucesso!");
      window.location.href = 'index.html'; 
    } else {
      alert("Usuário ou senha errados!");
    }
  });
}