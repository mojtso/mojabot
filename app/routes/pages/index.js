import express from 'express';
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index');
    // res.status(200).json({ message: 'express'});
});

exports.router = router;