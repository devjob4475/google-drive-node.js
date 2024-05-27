const express = require('express');
const router = express.Router();
const uploadFileController = require('../controllers/uploadFileController.js');
const getAllFiles = require('../controllers/getAllFileController.js');
const deleteFileController = require('../controllers/deleteFileController');
const middleware = require('../middlewares/middleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.use('/', middleware);


router.post('/upload',upload.single('file'), uploadFileController.uploadFiles);
router.get('/getAllFiles', getAllFiles.getFiles);
router.delete('/deleteFile', deleteFileController.deleteFile);

module.exports = router;
