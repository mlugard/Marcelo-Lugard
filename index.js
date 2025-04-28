const http = require('http');
const url = require('url');

const users = [];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const parts = parsedUrl.pathname.split('/').filter(Boolean);

  if (parts[0] === 'users') {
    if (req.method === 'GET') {
      if (parts.length === 1) {
        // GET /users -> Lista todos
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
      } else if (parts.length === 2) {
        // GET /users/:id
        const user = users.find(u => u.id === parseInt(parts[1]));
        if (user) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(user));
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Usuário não encontrado');
        }
      } else if (parts.length === 3 && parts[1] === 'email') {
        // GET /users/email/:email
        const user = users.find(u => u.email === parts[2]);
        if (user) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(user));
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Usuário não encontrado');
        }
      }
    } else if (req.method === 'POST' && parts.length === 1) {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const user = JSON.parse(body);
        user.id = users.length + 1;
        users.push(user);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      });
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});