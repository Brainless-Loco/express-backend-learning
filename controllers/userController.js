const db = require('../config/db');

// Get all users
exports.getAllUsers = async (req, res, next) => {
    console.log(req.query)
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        next(err);
    }
};

// Create a new user
exports.createUser = async (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    try {
        const [result] = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json({ id: result.insertId, name, email });
    } catch (err) {
        next(err);
    }
};
