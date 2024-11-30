const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const db = require('../config/db');

router.get('/',
    async (req, res, next) => {
        // console.log(req.query)
        try {
            const [rows] = await db.query('SELECT * FROM users');
            res.json(rows);
        } catch (err) {
            next(err);
        }
});
// router.get('/users',userController.getAllUsers);
router.post('/', userController.createUser);


module.exports = router;
