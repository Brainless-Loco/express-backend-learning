require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users',userRoutes);

app.get('/api/test',(req,res)=>{
    console.log(req.query)
    res.status(200).json({ message: 'Hello testing' });
})

app.use('/',
    (req, res) => {
        res.status(200).json({ message: 'Yee!! My Backend Worked!!' });
    }
);

// Error Handling
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Something went wrong!' });
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
