const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/auth', authRoutes);

const PORT = 5001;
const HOST = 'localhost';

app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
