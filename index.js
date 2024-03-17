const express = require('express');
const cors = require('cors');
const { authRouter } = require('./routes/userRoutes');
require("dotenv").config();
const connectDB = require("./config/db")

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use('/users', authRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
