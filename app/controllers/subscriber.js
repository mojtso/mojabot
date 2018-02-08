import models from '../models';

exports.get_subscriber = (req, res) => {
    const data = { username: req.body.username };

    if(data.username) {
        try {
            models.Subscriber.findAll({ 
                where: { username: data.username }
            }).then(result => {
                if(result.length >= 1) {
                    res.status(400).json({ message: 'Subscriber already exist'});
                } else {
                    //create a record of 
                    models.Subscriber.create(data).then(result => {
                        res.status(201).json({ message: 'Subscriber created' });
                    });
                }
            });
        } catch(err) {
            res.status(400).json({ message: 'Failed to create subscriber ', error: err });
        }
    } else {
        res.status(400).json({ message: 'Required subsriber'});
    }

};