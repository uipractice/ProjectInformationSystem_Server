const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port: ${port}`))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log("MongoDB Connection is successful"))

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

