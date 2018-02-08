import express from 'express';
const router = express.Router();

import FileController from '../../controllers/files';


router.get('/', FileController.get_all_files_with_owners);
router.post('/', FileController.create_file_link);


module.exports = router;