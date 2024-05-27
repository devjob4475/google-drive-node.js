const drive = require('../config/configs')

async function createFile(req, res) {
  try {
    const { folderName, parentFolderId } = req.body;
    if (!folderName) {
      return res.status(400).json({ status: 'error', message: 'folderName is required' });
    }

    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    };

    if (parentFolderId) {
      fileMetadata.parents = [parentFolderId];
    }

    const response = await drive.files.create({
      requestBody: fileMetadata,
      fields: 'id, name'
    });

    res.status(200).json({ status: 'success', data: { folderId: response.data.id, folderName: response.data.name }, message: 'สร้างโฟลเดอร์สำเร็จ' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'เกิดข้อผิดพลาดในการสร้างโฟลเดอร์' });
  }
}

module.exports = {
  createFile
};