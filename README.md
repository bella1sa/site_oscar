O que foi feito no site: 
Eu comecei organizando as pastas: criei a pasta data com o arquivo mockDb.js para deixar os nossos dados salvos de mentirinha, tudo bem separado.
Depois, criei a pasta routes e dividi os códigos em três módulos: o produtos.js (com toda a parte de listar, filtrar, cadastrar e avaliar), o auth.js (cuidando do login e logout) 
e o carrinho.js, que faz a contagem dos produtos na sessão e já está baixando o estoque de verdade quando a compra é finalizada.

O server.js ficou super limpo, só puxando as configurações da sessão e as rotas da pasta. Já fiz todos os testes dessas rotas usando o Thunder Client e está tudo respondendo certinho, sem nenhum erro no terminal.

Agora, a última coisa que fiz foi criar o arquivo js/api.js no Front-end para começar a substituir o localStorage pelos comandos de fetch() que vão conversar com o nosso servidor. 
