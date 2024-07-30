import express, { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/httpErrors/httpError';
import logger from '../utils/logger';
import AuthRoutes from "../routes/auth-routes";
// import UserRoutes from "../routes/user-routes"

const router = express.Router();


router.use("/auth", AuthRoutes);
// router.use("/user", UserRoutes);

//404 handling route
router.use((req, res, next) => {
    const error = new HttpError('Not Found', 404);
    next(error);
});

//route error handlind
router.use((error: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(error.message, { stack: error.stack });
    res.status(error.statusCode || 500);
    res.send({
        status: 'error',
        message: error.message,
        data: {
            status: error.statusCode || 500,
        },
    });
});

export default router;
