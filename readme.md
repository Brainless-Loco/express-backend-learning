## **1. Initialize the Project**

### **Step 1: Create a Project Directory**
- Navigate to your desired location and create a folder for your project:
  ```bash
  mkdir express-server //or anything you want to name
  cd express-server
  ```

### **Step 2: Initialize the Node.js Project**
- Run the following command and follow the prompts:
  ```bash
  npm init -y
  ```

---

## **2. Install Required Packages**

### **Step 3: Install Dependencies**
- Install Express and MySQL and other necessary packages:
  ```bash
  npm install express mysql2 cors morgan
  ```

### **Step 4: Install Development Tools (Optional)**
- Add tools like `nodemon` for automatic server restarts during development:
  ```bash
  npm install --save-dev nodemon
  ```

---

## **3. Set Up Project Structure**

### **Step 5: Create a File Structure**
Organize your files into a scalable structure:
```
express-server
├── /config
│   └── db.js
├── /controllers
│   ├── userController.js
├── /routes
│   ├── users.js
│   └── products.js
├── /models
│   └── userModel.js
├── /middlewares
│   └── errorHandler.js
├── .env
├── app.js
├── package.json

```

---

## **4. Configure the Database**

### **Step 6: Set Up the Database Connection**
- Create a file: **`config/db.js`**
  ```javascript
  const mysql = require('mysql2/promise');

  const pool = mysql.createPool({
      host: 'localhost', // or 127.0.0.1
      user: 'root', // Your MySQL username
      password: '', // Your MySQL password
      database: 'database_name', // Replace with your database
      port: 3306 // Default MySQL port
  });

  module.exports = pool;
  ```

---

## **5. Create Application Logic**

### **Step 7: Write Controller Logic**
- Create a file: **`controllers/userController.js`**
  ```javascript
  const db = require('../config/db');

  exports.getAllUsers = async (req, res, next) => {
      try {
          const [rows] = await db.query('SELECT * FROM users'); // Replace "users" with your table
          res.json(rows);
      } catch (err) {
          next(err); // Pass error to the error-handling middleware
      }
  };
  ```

---

### **Step 8: Set Up Routes**
- Create a file: **`routes/userRoutes.js`**
  ```javascript
  const express = require('express');
  const router = express.Router();
  const userController = require('../controllers/userController');

  // Define routes
  router.get('/', userController.getAllUsers);

  module.exports = router;
  ```

---

### **Step 9: Connect the Routes in `app.js`**
- Main application file: **`app.js`**
  ```javascript
  const express = require('express');
  const userRoutes = require('./routes/userRoutes');
  const app = express();

  // Middleware
  app.use(express.json()); // Parse JSON request bodies

  // Routes
  app.use('/api/users', userRoutes);

  // Error handling middleware
  app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: 'Something went wrong!' });
  });

  // Start the server
  const PORT = 3000;
  app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
  });
  ```

---

## **6. Use Environment Variables**

### **Step 10: Create an `.env` File**
- Use environment variables to secure sensitive information:
  ```env
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=
  DB_NAME=database_name
  PORT=3000
  ```

- Update **`db.js`** to use `dotenv`:
  ```javascript
  require('dotenv').config();
  const mysql = require('mysql2/promise');

  const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306
  });

  module.exports = pool;
  ```

---

## **7. Run the Server**

### **Step 11: Add Scripts for Development**
- In your **`package.json`**, update the `scripts` section:
  ```json
  "scripts": {
      "start": "node app.js",
      "dev": "nodemon app.js"
  }
  ```

---

### **Step 12: Start the Server**
- For development:
  ```bash
  npm run dev
  ```

- For production:
  ```bash
  npm start
  ```

---

## **8. Test the API**

### **Step 13: Test with Postman or cURL**
1. Start your server.
2. Make a **GET request** to:
   ```
   http://localhost:3000/api/users/
   ```
3. Check if the response contains the rows from the `users` table.

---

# Sample **app.js**
```
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
// Way 1
app.use('/api/users',userRoutes);

// Way 2
app.get('/api/test',(req,res)=>{
    console.log(req.query)
    res.status(200).json({ message: 'Hello testing' });
})

// Error Handling: 
// Way 1
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Way 2
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Something went wrong!' });
// });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

```

### Note
> Here in  ***app.js*** I showed multiple ways. You can choose any one as per your preference. 


# Thank you.
# - Brainless Loco

"# express-backend-learning" 
"# express-backend-learning" 
"# express-backend-learning" 
