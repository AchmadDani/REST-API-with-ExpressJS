const { PrismaClient } = require('@prisma/client');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');


const app = express();
const port  = 3000;

//Prisma client
const prisma = new PrismaClient();

//Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

//Test endpoint
app.get('/', async (req, res) => {
    try{
        const users = await prisma.user.findMany();
        res.status(200).json(users);   
    } catch(error) {
        console.error(err);
        res.status(500).json({error: 'Gagal mengambil data'});
    }
})

//Menjalankan server
app.listen(port, () => {
    console.log('Server berjalan di https://Localhost:' + port)
})
 



// const express = require('express');
// const bodyParser = require('body-parser');
// const {Pool} = require('pg'); // import module pg
// require('dotenv').config();

// const app = express();
// const port = 3000;

// //Middleware
// app.use(bodyParser.json());

// const db = new Pool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
// })

// //TEST endpoint
// app.get('/', (req, res) => {
//     res.send('CRUD API with JS')
// })

// //menjalankan server
// app.listen(port, () => {
//     console.log('server berjalan di http://localhost:' + port)
// })

// app.post('/users', async (req, res) => {

//     //seperti DTO di java yaitu membuat struktur request
//     const {name, email, age} = req.body

//     try {
//         const result = await db.query(
//             'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
//             [name, email, age]
//         );
//         res.status(201).json(result.rows[0])
//     }
//     catch(err) {
//         console.error(err);
//         res.status(500).json({error: err.message})
//     }



// })