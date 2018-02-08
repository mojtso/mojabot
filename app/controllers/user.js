import bcrypt, { hash } from 'bcrypt';
import models from '../models';

exports.create_user = (req, res) => {
    const data = { username: req.body.username, password: req.body. password };
    
    if(data.username && data.password) {
        try {
            bcrypt.hash(data.password, 10, (err, hash) => {
                if(err) {
                    res.status(400).json({ error: err });
                }
                const user = { username: data.username, password: hash };
                models.User.findAll({
                    where: { username: user.username }
                }).then((result) => {
                    if(result.length >= 1) {
                        res.status(400).json({ message: 'Cannot signup with this user: '+user.username+' '});
                    }

                    //try create record of user.
                    models.User.create(user).then((result) => {
                        res.status(201).json({ message: 'Created user ', data: result });
                    });

                });
            });
        } catch (err) {
            res.status(400).json({ error: err });
        }
    } else{
        res.status(400).json({ message: 'Required email and password'});
    }
};

