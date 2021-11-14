// Charge le module HTTP
const http = require("http");

const hostname = "192.168.1.6";
const port = 8000;

// Crée un serveur HTTP
const server = http.createServer((req, res) => {

  // Configure l'en-tête de la réponse HTTP
  // avec le code du statut et le type de contenu
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // Envoie le corps de la réponse « Salut tout le monde »
   res.end('Salut tout le monde\n');
})

// Démarre le serveur à l'adresse 127.0.0.1 sur le port 8000
// Affiche un message dès que le serveur commence à écouter les requêtes
server.listen(port, hostname, () => {
  console.log(`Le serveur tourne à l'adresse https://${hostname}:${port}/`);
})
