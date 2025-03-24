require('dotenv').config();
const { syncDB } = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const express = require('express');
const cors = require('cors');
const app = express();

// syncDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/accounts', require('./routes/accountRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/support', require('./routes/supportRoutes'));
app.use('/api/saving', require('./routes/savingRoutes'));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
