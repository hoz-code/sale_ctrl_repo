import express from 'express';

import { routersProducts } from './productsRouters.js';
import { salesRouters } from './salesRouters.js';

const indexRouters = express.Router();

indexRouters.use('/product', routersProducts);
indexRouters.use('/sales', salesRouters)


//export default indexRouters;
export { indexRouters };