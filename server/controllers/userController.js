const User = require('../models/User');

const createOrUpdateUser = async (req, res) => {
  try {
    const { uid, name, email, photoURL } = req.body;

    if (!uid || !name || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let user = await User.findOne({ uid });

    if (user) {
      user.name = name;
      user.email = email;
      user.photoURL = photoURL;
      user.updatedAt = Date.now();
      await user.save();
      return res.status(200).json({ 
        message: 'User updated successfully', 
        user,
        isNew: false 
      });
    }

    user = new User({
      uid,
      name,
      email,
      photoURL,
    });

    await user.save();
    res.status(201).json({ 
      message: 'User created successfully', 
      user,
      isNew: true 
    });
  } catch (error) {
    console.error('Error creating/updating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUserByUid = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createOrUpdateUser,
  getUserByUid,
};
