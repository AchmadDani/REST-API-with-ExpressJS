const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

//Membuat token JWT
exports.generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
};

//Verifikasi token JWT
exports.verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
}