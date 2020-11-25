import express, { Request, Response } from 'express';
import { ServerError } from 'src/server/utils/errors';

import { markets } from './routes/markets';
import { orderbook } from './routes/orderbook';

const server = express();

server.use(express.static('dist'));

server.use('/api/orderbook', orderbook);
server.use('/api/markets', markets);

server.use((error: Error | ServerError, req: Request, res: Response) => {
    if (error instanceof ServerError) {
        return res.status(error.statusCode).send(error.message);
    }
    return res.sendStatus(500);
});

const port = process.env.PORT || 8080;

server.listen(port, () => console.info(`Server listening on port: ${port}`));
