import * as express from 'express';

const router = express.Router();

router.get('/hello', (req, res) => {
    res.json('World');
});

export { router };
