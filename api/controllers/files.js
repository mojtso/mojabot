import models from '../models';

exports.get_all_files_with_owners = (req, res) => {
    models.Subscriber.findAll({
        include: [{ model: models.File }]
    }).then(result => {
        res.status(200).json(result);
    });
};

exports.create_file_link = (req, res) => {
    const data = { fileUrl: req.body.fileUrl, subscriber: req.body.subscriber }

    if(data.fileUrl && data.subscriber) {
        try {
            models.Subscriber.findAll({
                where: { username: data.subscriber }
            }).then(result => {
                // res.status(200).json({ response: result[0].id });
                if(result.length >= 1) {
                    const fileData = { link: data.fileUrl, subscriberOwner: result[0].id }
                    models.File.create(fileData).then(result => {
                        res.status(201).json({ message: 'file created', stored: result });
                    });
                } else {
                    res.status(400).json({ message: 'Not a subscriber' });
                }
            });
        } catch(err) {
            res.status(400).json({ message: 'Failed to create a file', error: err });
        }
    } else {
        res.status(400).json({ message: 'Requires a file url and owner'});
    }

};

