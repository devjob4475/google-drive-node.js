const express = require('express');
const router = express.Router();
const uploadFileController = require('../controllers/uploadFileController.js');
const getAllFiles = require('../controllers/getAllFileController.js');
const deleteFileController = require('../controllers/deleteFileController');
const assignPermissionController = require('../controllers/permissionController.js');
const createFolderController = require('../controllers/createFolderController.js');
const middleware = require('../middlewares/middleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.use('/', middleware);


router.post('/upload',upload.array('file'), uploadFileController.uploadFiles);
router.get('/getAllFiles', getAllFiles.getFiles);
router.delete('/deleteFile', deleteFileController.deleteFile);
router.post('/assignPermission', assignPermissionController.assignPermission);
router.post('/createFolder', createFolderController.createFile);

module.exports = router;
