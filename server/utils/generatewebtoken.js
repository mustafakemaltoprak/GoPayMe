const jwt = require('jsonwebtoken');

function generateToken (id) {
  console.log('id', id);
  return jwt.sign(id, 'gopay', { expiresIn: '10d' });
};

module.exports = {
  generateToken
}