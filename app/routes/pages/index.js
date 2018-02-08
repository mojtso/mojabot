import express from 'express';
const router = express.Router();


router.get('/', (req, res) => {
    res.render('src/layouts/main');
});

exports.router = router;