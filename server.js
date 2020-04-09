const express = require('express');
const connectDB = require('./config/db');
const app = express();

app.use(express.json({ extended: false }));

//Connect Database
connectDB();

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', ['*']);
  next();
});

//Testing..
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/story', require('./routes/api/story'));

PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
