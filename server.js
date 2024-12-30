const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

const port = 6001;
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'miskas'
});


// con.connect((err) => {
//     if (err) {
//         console.log('Klaida prisijungiant prie DB');
//         return;
//     }
//     console.log('Prisijungėme prie DB');
// });

// app.post('/form-test', (req, res) => {
//     const titles = req.body.title;
//     const prices = req.body.price;
//     console.log(titles);
//     console.log(prices);
//     res.send('OK');
// });


app.get('/read', (req, res) => {

    const sql = `
        SELECT id, name, height, type
        FROM trees
        -- WHERE height > 10 AND type = 'Spygliuotis'
        -- ORDER BY name, height DESC
        -- LIMIT 3, 3
    `;

    con.query(sql, (err, data) => {
        if (err) {
            res.send('Klaida gaunant duomenis');
            return;
        }
        res.json(data);
    });


});

app.post('/create', (req, res) => {
 
    // INSERT INTO table_name (column1, column2, column3, ...)
    // VALUES (value1, value2, value3, ...);
 
    const sql = `
        INSERT INTO trees (name, height, type)
        VALUES ('${req.body.name}', ${req.body.height}, '${req.body.type}')
    `;
 
    con.query(sql, (err, data) => {
        if (err) {
            res.send('Klaida įrašant duomenis');
            return;
        }
        res.send('OK');
    });
 
 
});



app.listen(port, () => {
    console.log(`Duonbazynas darbui pasiruošęs ant ${port} porto!`);
});