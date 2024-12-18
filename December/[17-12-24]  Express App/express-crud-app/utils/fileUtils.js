const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/students.json');

async function readItem() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
}

async function writeItem(users) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing file:', error);
    throw error;
  }
}

module.exports = {
  readItem,
  writeItem
};