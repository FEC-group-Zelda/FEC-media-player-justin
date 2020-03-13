const express = require('express');
const mysql = require('mysql');
const config = require('./config');

const app = express();

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'media'
  });

  connection.connect(err => {
    if (err) {
      console.log(err)
    }
  });

app.use(express.static('../client/dist'))

app.get('/', (req, res) => {
  res.send('this works')
});

app.get('/songs', (req, res) => {
  connection.query(`SELECT * FROM songs`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

app.listen(3306, () => {
  console.log('media server listening on 3306');
})