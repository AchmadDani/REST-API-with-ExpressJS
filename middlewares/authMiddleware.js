const { verifyToken } = require('../utils/jwtUtils');

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Akses ditolak, token tidak ada' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Simpan data pengguna dari token
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token tidak valid' });
  }
};
