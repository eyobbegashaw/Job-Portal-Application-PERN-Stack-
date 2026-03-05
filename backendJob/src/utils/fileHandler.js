const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

// Base upload directory
const UPLOAD_DIR = path.join(__dirname, '../../uploads');

// Ensure upload directory exists
const ensureUploadDir = async () => {
  try {
    await fs.access(UPLOAD_DIR);
  } catch (error) {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
};

// Generate unique filename
const generateUniqueFilename = (originalname) => {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString('hex');
  const ext = path.extname(originalname);
  return `${timestamp}-${randomString}${ext}`;
};

// Save file
const saveFile = async (file, subdirectory = '') => {
  await ensureUploadDir();
  
  const targetDir = path.join(UPLOAD_DIR, subdirectory);
  try {
    await fs.access(targetDir);
  } catch (error) {
    await fs.mkdir(targetDir, { recursive: true });
  }

  const filename = generateUniqueFilename(file.originalname);
  const filepath = path.join(targetDir, filename);
  
  // If file is buffer
  if (file.buffer) {
    await fs.writeFile(filepath, file.buffer);
  } 
  // If file is from multer with path
  else if (file.path) {
    await fs.rename(file.path, filepath);
  }

  return path.join('/uploads', subdirectory, filename).replace(/\\/g, '/');
};

// Delete file
const deleteFile = async (filepath) => {
  if (!filepath) return;
  
  const fullPath = path.join(__dirname, '../..', filepath);
  try {
    await fs.unlink(fullPath);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};

// Get file info
const getFileInfo = async (filepath) => {
  if (!filepath) return null;
  
  const fullPath = path.join(__dirname, '../..', filepath);
  try {
    const stats = await fs.stat(fullPath);
    return {
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
      exists: true
    };
  } catch (error) {
    return { exists: false };
  }
};

// Clean up old files
const cleanupOldFiles = async (daysOld = 30) => {
  const cutoff = Date.now() - (daysOld * 24 * 60 * 60 * 1000);
  
  const cleanupDir = async (dir) => {
    try {
      const files = await fs.readdir(dir);
      for (const file of files) {
        const filepath = path.join(dir, file);
        const stats = await fs.stat(filepath);
        
        if (stats.isFile() && stats.mtimeMs < cutoff) {
          await fs.unlink(filepath);
          console.log(`Deleted old file: ${filepath}`);
        }
      }
    } catch (error) {
      console.error(`Error cleaning directory ${dir}:`, error);
    }
  };

  const subdirs = ['profiles', 'logos', 'misc'];
  for (const subdir of subdirs) {
    const dirPath = path.join(UPLOAD_DIR, subdir);
    try {
      await fs.access(dirPath);
      await cleanupDir(dirPath);
    } catch (error) {
      // Directory doesn't exist, skip
    }
  }
};

module.exports = {
  saveFile,
  deleteFile,
  getFileInfo,
  cleanupOldFiles,
  generateUniqueFilename
};