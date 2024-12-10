const { PrismaClient } = require('@prisma/client');
const { verifyPassword } = require('../utils/hashUtils');
const { generateToken } = require('../utils/jwtUtils');

const prisma = new PrismaClient();

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Email tidak ditemukan' });
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Password salah' });
    }

    const token = generateToken({ userId: user.id });
    res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal melakukan login' });
  }
};
