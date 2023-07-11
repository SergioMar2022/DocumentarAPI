const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// Configurar Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Ejemplo',
      version: '1.0.0',
      description: 'Documentación de la API de Ejemplo',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtiene todos los productos
 *     description: Obtén una lista de todos los productos disponibles.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */
app.get('/productos', (req, res) => {
  // Lógica para obtener todos los productos
  res.json([{ id: 1, nombre: 'Producto 1' }, { id: 2, nombre: 'Producto 2' }]);
});

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     description: Obtén un producto específico utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a obtener.
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado.
 */
app.get('/productos/:id', (req, res) => {
  const id = req.params.id;
  // Lógica para obtener un producto por ID
  if (id === '1') {
    res.json({ id: 1, nombre: 'Producto 1' });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

/**
 * @swagger
 * /carrito:
 *   post:
 *     summary: Agrega un producto al carrito
 *     description: Agrega un producto al carrito de compras.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Solicitud incorrecta.
 */
app.post('/carrito', (req, res) => {
  const producto = req.body;
  // Lógica para agregar un producto al carrito
  if (producto) {
    res.json({ message: 'Producto agregado al carrito' });
  } else {
    res.status(400).json({ error: 'Solicitud incorrecta' });
  }
});

// Definir esquemas
/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           example: 1
 *         nombre:
 *           type: string
 *           example: Producto 1
 */

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
