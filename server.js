var cfg = require("./server.cfg");
var server = require("./src/backend/routes")();

const port = process.env.PORT ? process.env.PORT : cfg.port;

server.listen(port, cfg.address, function () {
    console.log('Server listening on: ' + cfg.address + ":" + port + "!");
});
