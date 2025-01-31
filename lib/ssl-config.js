const fs = require('fs');
const path = require('path');

module.exports = {
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.join(__dirname, '../pscale_CA.pem'), 'utf8')
  }
}; 