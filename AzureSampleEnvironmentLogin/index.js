const server = require('./controller.js');
const port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
