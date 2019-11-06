const express = require('express');
const connectDB = require('./config/db');
const users = require('./routs/api/users');
const auth = require('./routs/api/auth.');
const profile = require('./routs/api/profile');
const posts = require('./routs/api/posts');
const app = express();

connectDB();
//Init Middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('API Running'));
//define routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port${PORT}`));
