const express = require('express')
const mongoose = require('mongoose')
const app = express()

const port = 3000;

// Import routes
const productRoutes = require('./routes/product'); 



app.use('/api', productRoutes); 



const dbURI = 'mongodb://localhost:27017/task2'; // 
mongoose.connect(dbURI, {
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

// Example route handler for the root URL
app.get('/', (req, res) => {
  res.send('Hello, world!'); // Replace with your desired response
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
