const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/users.json');

async function readUsers() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

async function writeUsers(users) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users file:', error);
    throw error;
  }
}

module.exports = {
  readUsers,
  writeUsers
};