const drive = require('../config/configs')

async function deleteFile(req, res) {
  try {
    const fileId = req.body.fileId;
    if (!fileId) {
      return res.status(400).json({ status: 'error', message: 'fileId is required' });
    }

    await drive.files.delete({
      fileId: fileId,
    });

    res.status(200).json({ status: 'success', message: 'ลบไฟล์สำเร็จ' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'เกิดข้อผิดพลาดในการลบไฟล์' });
  }
}

module.exports = {
  deleteFile
};