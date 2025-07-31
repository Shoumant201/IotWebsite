import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { Request } from 'express';

// Configure Cloudinary
const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

// Only configure if all credentials are present
if (cloudinaryConfig.cloud_name && cloudinaryConfig.api_key && cloudinaryConfig.api_secret) {
  cloudinary.config(cloudinaryConfig);
  console.log('✅ Cloudinary configured successfully');
} else {
  console.warn('⚠️  Cloudinary credentials not found. Image upload will not work.');
  console.warn('Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file');
}

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Create multer upload middleware
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // Increased to 10MB limit
    fieldSize: 10 * 1024 * 1024, // 10MB field size limit
  },
});

// Check if Cloudinary is configured
export const isCloudinaryConfigured = (): boolean => {
  return !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);
};

// Upload image to Cloudinary with retry logic
export const uploadToCloudinary = async (
  buffer: Buffer,
  folder: string = 'iot-hub',
  filename?: string,
  retries: number = 3
): Promise<string> => {
  // Check if Cloudinary is configured
  if (!isCloudinaryConfigured()) {
    throw new Error('Cloudinary is not configured. Please set up your Cloudinary credentials in the .env file.');
  }

  const attemptUpload = (attempt: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const uploadOptions: any = {
        folder: folder,
        resource_type: 'image',
        quality: 'auto',
        fetch_format: 'auto',
        timeout: 60000, // 60 seconds timeout
        chunk_size: 6000000, // 6MB chunks for large files
      };

      if (filename) {
        uploadOptions.public_id = filename;
      }

      console.log(`🔄 Cloudinary upload attempt ${attempt}/${retries + 1} for folder: ${folder}`);

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error(`❌ Cloudinary upload error (attempt ${attempt}):`, error);
            
            // Check if it's a timeout error and we have retries left
            if ((error.message?.includes('Timeout') || error.http_code === 499) && attempt <= retries) {
              console.log(`⏳ Retrying upload in 2 seconds... (attempt ${attempt + 1}/${retries + 1})`);
              setTimeout(() => {
                attemptUpload(attempt + 1).then(resolve).catch(reject);
              }, 2000);
            } else {
              reject(new Error(`Failed to upload image to Cloudinary: ${error.message || 'Unknown error'}`));
            }
          } else if (result) {
            console.log(`✅ Cloudinary upload successful: ${result.secure_url}`);
            resolve(result.secure_url);
          } else {
            reject(new Error('No result from Cloudinary upload'));
          }
        }
      );

      uploadStream.end(buffer);
    });
  };

  try {
    return await attemptUpload(1);
  } catch (error) {
    console.error('Error uploading to Cloudinary after all retries:', error);
    throw error;
  }
};

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<boolean> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return false;
  }
};

// Extract public ID from Cloudinary URL
export const extractPublicId = (url: string): string | null => {
  try {
    const matches = url.match(/\/v\d+\/(.+)\./);
    return matches ? matches[1] : null;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
};

export default cloudinary;