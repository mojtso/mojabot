import bcrypt from 'bcrypt';
import models from '../models';

exports.create_user = (req, res) => {
    const user = { username: req.body.username, password: req.body. password };
    
    res.status(200).json({
        message: 'Get user endpoint',
        user: user
    });
};