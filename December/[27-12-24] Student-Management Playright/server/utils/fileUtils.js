const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/students.json');

async function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dataDir, { recursive: true });
    } else {
      throw error;
    }
  }
}

function validateData(data) {
  if (!Array.isArray(data)) {
    throw new Error('Data must be an array');
  }
  
  data.forEach((student, index) => {
    if (!student || typeof student !== 'object') {
      throw new Error(`Invalid student data at index ${index}`);
    }
    
    if (!student.id || typeof student.id !== 'number') {
      throw new Error(`Invalid or missing ID for student at index ${index}`);
    }
  });
  
  return data;
}

async function readItem() {
  try {
    await ensureDataDirectory();

    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      
      if (!data.trim()) {
        return [];
      }

      const parsedData = JSON.parse(data);
      return validateData(parsedData);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await writeItem([]);
        return [];
      }
      
      if (error instanceof SyntaxError) {
        console.error('Invalid JSON format in file:', error);
        // Backup corrupted file and create new empty one
        const backupFile = `${DATA_FILE}.backup.${Date.now()}`;
        await fs.copyFile(DATA_FILE, backupFile);
        await writeItem([]);
        return [];
      }
      
      throw error;
    }
  } catch (error) {
    console.error('Error reading file:', error);
    throw new Error(`Failed to read student data: ${error.message}`);
  }
}

async function writeItem(data) {
  try {
    validateData(data);
    
    await ensureDataDirectory();
    
    const jsonString = JSON.stringify(data, null, 2);
    
    const tempFile = `${DATA_FILE}.temp`;
    await fs.writeFile(tempFile, jsonString, 'utf8');
    
    await fs.rename(tempFile, DATA_FILE);
  } catch (error) {
    console.error('Error writing file:', error);
    throw new Error(`Failed to write student data: ${error.message}`);
  }
}

async function fileExists() {
  try {
    await fs.access(DATA_FILE);
    return true;
  } catch {
    return false;
  }
}

async function getFileSize() {
  try {
    const stats = await fs.stat(DATA_FILE);
    return stats.size;
  } catch {
    return 0;
  }
}

module.exports = {
  readItem,
  writeItem,
  fileExists,
  getFileSize,
  DATA_FILE
};