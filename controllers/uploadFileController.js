const drive = require('../config/configs')
const fs = require('fs');


async function uploadFiles(req, res) {
  try {
    const files = req.files;
    const responses = [];

    for (const file of files) {
      const fileName = file.originalname;
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

      // Remove the file from the local server after uploading
      fs.unlinkSync(filePath);

      responses.push({
        fileId: response.data.id,
        fileName: response.data.name,
        fileType: response.data.mimeType
      });
    }

    res.status(200).json({ status: 'success', data: responses, message: "อัพโหลดไฟล์สำเร็จ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'เกิดข้อผิดพลาดในการอัปโหลดไฟล์' });
  }
}

module.exports = {
  uploadFiles
};