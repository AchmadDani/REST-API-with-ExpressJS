const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashPassword } = require('../utils/hashUtils');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Gagal mengambil data'});
    }
}

exports.getUserById = async (req, res) => {
    try {
        const users = await prisma.user.findUnique({where: {id: parseInt(Id)} });
        if(!users) {
            return res.status(404).json({error: 'Data tidak ditemukan'});
        }
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Gagal mengambil data'});
    }
}

exports.createUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {name, email, password: hashedPassword}
        })
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Gagal mengambil data'});
    }
}

exports.updateUser = async (req, res) => {
    const {id} = req.params;
    const {name, email, password} = req.body;
    try {
        const updateUser = await prisma.user.update({
            where: {id: parseInt(id)},
            data: {name, email, password},
        });
        res.status(200).json(updateUser);
    } catch (error) {
        
    }
}

exports.deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        await prisma.user.delete({ where: {id: parseInt(id)}});
        res.status(200).json({message: 'Data berhasil dihapus'});
    } catch (error) {
        res.status(500).json({error: 'Gagal menghapus data'});
    }
}