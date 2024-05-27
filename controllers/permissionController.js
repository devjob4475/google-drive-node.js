const drive = require('../config/configs');

async function assignPermission(req, res) {
  try {
    const { fileId, email, role, action } = req.body;

    if (!fileId || !action) {
      return res.status(400).json({ status: 'error', message: 'fileId and action are required' });
    }

    if (action === 'add' && (!role || (!email && role !== 'anyone'))) {
      return res.status(400).json({ status: 'error', message: 'For adding permissions, role and email (if role is not "anyone") are required' });
    }

    let permissionRequestBody;

    if (action === 'add') {
      permissionRequestBody = {
        role: role, // 'reader', 'writer', 'commenter', etc.
        type: email ? 'user' : 'anyone',
      };

      if (email) {
        permissionRequestBody.emailAddress = email;
      }
    } else if (action === 'remove') {
      const { permissionId } = req.body;
      if (!permissionId) {
        return res.status(400).json({ status: 'error', message: 'permissionId is required for removing a permission' });
      }

      await drive.permissions.delete({
        fileId: fileId,
        permissionId: permissionId,
      });

      return res.status(200).json({ status: 'success', message: 'Permission removed successfully' });
    } else if (action === 'makePublic') {
      permissionRequestBody = {
        role: 'reader',
        type: 'anyone',
      };
    } else if (action === 'revokePublic') {
      const permissionsResponse = await drive.permissions.list({
        fileId: fileId,
        fields: 'permissions(id, type)',
      });

      const publicPermission = permissionsResponse.data.permissions.find(
        (permission) => permission.type === 'anyone'
      );

      if (publicPermission) {
        await drive.permissions.delete({
          fileId: fileId,
          permissionId: publicPermission.id,
        });

        return res.status(200).json({ status: 'success', message: 'Public access revoked successfully' });
      } else {
        return res.status(400).json({ status: 'error', message: 'No public access found to revoke' });
      }
    } else {
      return res.status(400).json({ status: 'error', message: 'Invalid action specified' });
    }

    const response = await drive.permissions.create({
      fileId: fileId,
      requestBody: permissionRequestBody,
    });

    res.status(200).json({ status: 'success', data: response.data, message: 'Permission assigned successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'An error occurred while assigning permission' });
  }
}

module.exports = {
  assignPermission,
};
