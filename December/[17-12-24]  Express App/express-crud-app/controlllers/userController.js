const { readUsers, writeUsers } = require('../utils/fileUtils');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await readUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const users = await readUsers();
    const user = users.find((u) => u.id === parseInt(req.params.id));
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const users = await readUsers();
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
      ...req.body,
    };
    
    users.push(newUser);
    await writeUsers(users);
    
    res.status(201).json({ message: 'New User Created!', data: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const users = await readUsers();
    const index = users.findIndex((u) => u.id === parseInt(req.params.id));
    
    if (index !== -1) {
      users[index] = { id: users[index].id, ...req.body };
      await writeUsers(users);
      res.json(users[index]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

exports.partialUpdateUser = async (req, res) => {
  try {
    const users = await readUsers();
    const index = users.findIndex((u) => u.id === parseInt(req.params.id));
    
    if (index !== -1) {
      users[index] = { ...users[index], ...req.body };
      await writeUsers(users);
      res.json(users[index]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const users = await readUsers();
    const filteredUsers = users.filter((u) => u.id !== parseInt(req.params.id));
    
    if (filteredUsers.length < users.length) {
      await writeUsers(filteredUsers);
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};