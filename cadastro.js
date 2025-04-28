const usuarios = [];

function cadastrarUsuario(nome, email) {
  const usuario = {
    id: usuarios.length + 1,
    nome,
    email
  };
  usuarios.push(usuario);
  console.log('Usuário cadastrado:', usuario);
}

// Testes
cadastrarUsuario('João', 'joao@email.com');
cadastrarUsuario('Maria', 'maria@email.com');
console.log('Todos os usuários:', usuarios);