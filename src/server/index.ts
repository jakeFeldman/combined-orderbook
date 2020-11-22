import express from 'express';

import { router } from './routes';

const server = express();

server.use(express.static('public'));

server.use('/api', router);

const port = process.env.PORT || 8080;

server.listen(port, () => console.info(`Server listening on port: ${port}`));
