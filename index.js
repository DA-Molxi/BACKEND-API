const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, DELETE');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

const PORT = process.env.PORT || 3000;
const routes = require('./routes/routes');
app.use('/api', routes);

// Conectar ao MongoDB com tratamento de erros
(async () => {
  try {
    const userArgs = process.argv.slice(2);
    const mongoURL = userArgs[0] || process.env.MONGO_URL;

    if (!mongoURL) {
      throw new Error('MongoDB URL não fornecida. Defina via argumento ou variável de ambiente MONGO_URL.');
    }

    await mongoose.connect(mongoURL);
    console.log('Database Connected');
  } catch (err) {
    console.error('Erro ao conectar no MongoDB:', err);
    process.exit(1); // encerra o processo em caso de erro
  }
})();

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});
