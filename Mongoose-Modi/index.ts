import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Card } from './CardSchema.js';

const app = express();
const PORT = 2424;

// El servidor puede recibir y enviar JSON
app.use(bodyParser.json());

// Nos conectamos a la base de datos
mongoose.connect('mongodb://localhost:27017/magic-app');

// Comprobamos que la conexión se ha realizado correctamente
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', function() {
  console.log("Conectado satisfactoriamente a MongoDB");
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

// Creamos una nueva carta
app.post('/cards', async (req, res) => {
    const newCard = new Card(req.body);
    try { // Guardamos la carta en la base de datos
      await newCard.save();
      res.status(201).send(newCard);
    } catch (error) { // Si hay un error, devolvemos un error 400 (Bad Request)
      res.status(400).send(error);
    }
  });
  
  // Obtenemos todas las cartas
  app.get('/cards', async (req, res) => {
    try { // Buscamos todas las cartas en la base de datos
      const cards = await Card.find({});
      res.status(200).send(cards);
    } catch (error) { // Si hay un error, devolvemos un error 500 (Internal Server Error)
      res.status(500).send(error);
    }
  });
  
  // Obtenemos una carta por ID
  app.get('/cards/:id', async (req, res) => {
    try { // Buscamos la carta en la base de datos
      const card = await Card.findOne({ id: req.params.id });
      if (!card) { // Si no se encuentra la carta, devolvemos un error 404 (Not Found)
        return res.status(404).send();
      }
      // Si se encuentra la carta, la devolvemos
      res.send(card);
    } catch (error) { // Si hay un error, devolvemos un error 500 (Internal Server Error)
      res.status(500).send(error);
    }
  });
  
  // Actualizamos una carta
  app.patch('/cards/:id', async (req, res) => {
    try { // Buscamos la carta en la base de datos y la actualizamos
      const card = await Card.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
      if (!card) { // Si no se encuentra la carta, devolvemos un error 404 (Not Found)
        return res.status(404).send();
      }
      // Si se encuentra la carta, la devolvemos
      res.send(card);
    } catch (error) { // Si hay un error, devolvemos un error 400 (Bad Request)
      res.status(400).send(error);
    }
  });
  
  // Eliminamos una carta
  app.delete('/cards/:id', async (req, res) => {
    try { // Buscamos la carta en la base de datos y la eliminamos
      const card = await Card.findOneAndDelete({ id: req.params.id });
      if (!card) { // Si no se encuentra la carta, devolvemos un error 404 (Not Found)
        return res.status(404).send();
      }
      // Si se encuentra la carta, la devolvemos
      res.send(card);
    } catch (error) { // Si hay un error, devolvemos un error 500 (Internal Server Error)
      res.status(500).send(error);
    }
  });
  