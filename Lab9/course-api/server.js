const express = require('express');
const mongoose = require('mongoose');
const courseRouter = require('./routes/courseRouter');
require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING + 'course-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('Could not connect to MongoDB', err);
  process.exit(1);
});


app.use('/courses', courseRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});