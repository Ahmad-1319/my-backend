const express = require('express');
const connectToMongo = require('./database');
const app = express();
const authRoutes = require('./routes/authentication');
const todoRoutes = require('./routes/TodoList');
const cors = require('cors');
connectToMongo()

app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/todo',todoRoutes);


app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

