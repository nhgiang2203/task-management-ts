import { Router } from "express";
import * as validate from "../validates/register.validate";
import * as middleware from "../middlewares/auth.middleware";

import * as controller from '../controllers/user.controller';

const router: Router = Router();

router.post('/register', validate.account ,controller.register);
router.post('/login', controller.login);
router.get('/detail', middleware.requireAuth, controller.detail);

export const userRoutes: Router = router;