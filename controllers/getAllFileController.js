const drive = require('../config/configs')

async function getFiles(req, res) {
    try {
        const response = await drive.files.list({
          pageSize: 10, // You can adjust the number of files to list
          fields: 'files(id, name, mimeType, webViewLink, createdTime)'
        });
    
        const files = response.data.files;
        if (files.length) {
          res.status(200).json({ status: 'success', data: files, message: "ไฟล์ทั้งหมด" });
        } else {
          res.status(200).json({ status: 'success', data: [], message: "ไม่พบไฟล์" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'เกิดข้อผิดพลาดในการดึงข้อมูลไฟล์' });
      }
}

module.exports = {
  getFiles
};