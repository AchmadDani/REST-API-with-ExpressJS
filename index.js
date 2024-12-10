const express = require('express');
const bodyParser = require('body-parser');
const {Pool} = require('pg'); // import module pg
require('dotenv').config();

const app = express();
const port = 3000;

//Middleware
app.use(bodyParser.json());

const db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
})

//TEST endpoint
app.get('/', (req, res) => {
    res.send('CRUD API with JS')
})

//menjalankan server
app.listen(port, () => {
    console.log('server berjalan di http://localhost:' + port)
})

app.post('/users', async (req, res) => {

    //seperti DTO di java yaitu membuat struktur request
    const {name, email, age} = req.body

    try {
        const result = await db.query(
            'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
            [name, email, age]
        );
        res.status(201).json(result.rows[0])
    }
    catch(err) {
        console.error(err);
        res.status(500).json({error: err.message})
    }



})