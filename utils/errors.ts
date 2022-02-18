import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {};

export const handleError =(err: Error, req: Request, res: Response,next: NextFunction): void => {
    console.error(err);

    res
        .status(err instanceof ValidationError ? 400 : 500)
        .render('error', {
            message: err instanceof ValidationError ? err.message : 'Przerpaszamy, spróbuj ponownie.',
        });
}

export const handleFourOhFourError = (req: Request, res: Response, next: NextFunction): void => {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('error', {
            message: 'Odwołujesz się do złej strony.',
        });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }
}