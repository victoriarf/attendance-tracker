const UserModel = require('../models/user.model');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { name }  = req.body;

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found', name });
    }

    user.name = name;
    user.classes = user.classes || [];
    await user.save()

    return res.status(200).json({ message: 'User updated successfully', user });

  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};
