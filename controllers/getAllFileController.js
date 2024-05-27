const drive = require('../config/configs');

async function getFiles(req, res) {
  try {
    const response = await drive.files.list({
      pageSize: 10,
      fields: 'files(id, name, mimeType, webViewLink, createdTime)'
    });

    const files = response.data.files;
    if (files.length) {
      const filesWithPermissions = await Promise.all(files.map(async file => {
        try {
          const permissionsResponse = await drive.permissions.list({
            fileId: file.id,
            fields: 'permissions(id, type, role, emailAddress)'
          });
          file.permissions = permissionsResponse.data.permissions;
          return file;
        } catch (permissionError) {
          // Handle permission error for individual files
          console.error(`Permission error for file ${file.id}: ${permissionError.message}`);
          file.permissions = []; // Set empty permissions array
          return file;
        }
      }));

      res.status(200).json({ status: 'success', data: filesWithPermissions, message: "ไฟล์ทั้งหมด" });
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
