const fs = require('fs');

const private = fs.readFileSync('./private.pem','utf-8');

console.log(private);