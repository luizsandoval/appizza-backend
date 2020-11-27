import { Router } from 'express';

import multer from 'multer';

import multerConfig from '../../config/multer';

import { PizzasController } from '../../controllers';

import { 
    getPizzaValidator,
    createPizzaValidator,
    updatePizzaValidator,
    destroyPizzaValidator,
} from './validators';

const routes = Router();
const upload = multer(multerConfig);

const { create, update, destroy, index, show } = new PizzasController();

routes
    .post(
        '/pizzas',
        upload.single('image'),
        createPizzaValidator,
        create,
    )
    .put(
        '/pizzas',
        upload.single('image'),
        updatePizzaValidator,
        update,
    )
    .get(
        '/pizzas',
        index,
    )
    .get(
        '/pizzas/:id',
        getPizzaValidator,
        show,
    )
    .delete(
        '/pizzas/:id',
        destroyPizzaValidator,
        destroy,
    );

export default routes;
