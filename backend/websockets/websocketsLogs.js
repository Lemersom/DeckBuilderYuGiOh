// const WebSocket = require('ws');
// const userDAO = require('../DAO/user-dao'); // Substitua o caminho conforme necessário

// function createWebSocketServer() {
//   const wss = new WebSocket.Server({ noServer: true }); // Não fornecemos um servidor na criação

//   const messagesToNotify = new Set();

//   wss.on('connection', (ws) => {
//     console.log('Nova conexão');

//     // Adicione o novo cliente ao conjunto de clientes
//     messagesToNotify.add(ws);

//     ws.on('message', (message) => {
//       console.log(`Mensagem recebida: ${message}`);
//     });

//     ws.on('close', () => {
//       messagesToNotify.delete(ws);
//     });
//   });

//   async function getUserIdFromWebSocket(ws) {
//     return parseInt(ws.upgradeReq.headers['user-id'], 10);
//   }

//   async function getUserIdsToNotify() {
//     const relevantUsers = await userDAO.list();
//     return relevantUsers.map((user) => user.id);
//   }

//   function notifyUsers() {
//     const message = "Nova carta inserida!";

//     messagesToNotify.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   }

//   return {
//     wss,
//     notifyUsers,
//   };
// }

// module.exports = createWebSocketServer;
