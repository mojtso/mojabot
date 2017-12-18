const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Implement the webook in this route..'
    });
});

module.exports = router;
