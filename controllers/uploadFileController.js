const drive = require('../config/configs')
const fs = require('fs');


async function uploadFiles(req, res) {
    try {
        const file = req.file;
        const fileName = req.body.fileName || file.originalname;
        const filePath = file.path;
    
        const response = await drive.files.create({
          requestBody: {
            name: fileName,
            mimeType: file.mimetype
          },
          media: {
            mimeType: file.mimetype,
            body: fs.createReadStream(filePath)
          },
        });
     
        fs.unlinkSync(filePath);
    
        res.status(200).json({ status: 'success', data: {fileId: response.data.id,fileName:response.data.name,fileType:response.data.mimeType},message: "อัพโหลดไฟล์สำเร็จ" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'เกิดข้อผิดพลาดในการอัปโหลดไฟล์' });
      }
}

module.exports = {
  uploadFiles
};