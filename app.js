const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Configurar conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost', // Cambia esto si tu base de datos está en otro servidor
  user: 'root',
  password: 'password',
  database: 'gohelp'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Nos hemos conectado correctamente a la base de datos, colega ;)');
});

// Middleware para permitir solicitudes de otros dominios (CORS)
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

//Test
// Ruta para obtener todos los datos del formulario desde la base de datos
app.get('/userform', (req, res) => {
    const sql = 'SELECT * FROM user_data';
    connection.query(sql, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });  

app.get('/doctorform', (req, res) => {
    const sql = 'SELECT * FROM doctor_data';
    connection.query(sql, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });  

  app.get('/selectform', (req, res) => {
    const sql = 'SELECT * FROM select_data';
    connection.query(sql, (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });  

// Ruta para guardar los datos del formulario en la base de datos
app.post('/userform', (req, res) => {
  const { name, surname, id, age, number } = req.body;
  const sql = 'INSERT INTO user_data (name, surname, id, age, number) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [name, surname, id, age, number], (error, results) => {
    if (error) throw error;
    res.json({ message: 'Se guardaron correctamente los datos del paciente' });
  });
});

app.post('/doctorform', (req, res) => {
    const { name, surname, site, email, think } = req.body;
    const sql = 'INSERT INTO doctor_data (name, surname, site, email, think) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [name, surname, site, email, think], (error, results) => {
      if (error) throw error;
      res.json({ message: 'Se guardaron correctamente los datos del paciente' });
    });
  });
  
app.post('/selectform', (req, res) => {
    const { id, think } = req.body;
    const sql = 'INSERT INTO select_data (id, think) VALUES (?, ?)';
    connection.query(sql, [id, think], (error, results) => {
      if (error) throw error;
      res.json({ message: 'Se guardaron correctamente los datos del paciente' });
    });
  });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express activo en puerto ${port}.`);
});
