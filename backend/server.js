require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');

require('./config/passport');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Connect MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
