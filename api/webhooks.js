const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Implement the webook in this route..'
    });
});

module.exports = router;
