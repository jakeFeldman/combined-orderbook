import express, { Request, Response } from 'express';
import { ServerError } from 'src/server/utils/errors';

import { router } from './routes';

const server = express();

server.use(express.static('public'));

server.use('/api', router);

server.use((error: Error | ServerError, req: Request, res: Response) => {
    if (error instanceof ServerError) {
        return res.status(error.statusCode).send(error.message);
    }
    return res.sendStatus(500);
});

const port = process.env.PORT || 8080;

server.listen(port, () => console.info(`Server listening on port: ${port}`));
