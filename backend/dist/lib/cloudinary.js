import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
// Configure Cloudinary with proper type assertion
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Validate Cloudinary configuration on startup
const validateCloudinaryConfig = async () => {
    try {
        await cloudinary.api.ping();
        console.log('✅ Cloudinary connection successful');
    }
    catch (error) {
        console.error('❌ Cloudinary connection failed:', error);
        throw new Error('Cloudinary configuration is invalid');
    }
};
// Call validation function
validateCloudinaryConfig();
// Configure multer storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ecomgearsey/products',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [
            { width: 800, height: 600, crop: 'fill' },
            { quality: 'auto' }
        ],
    },
});
// Create multer upload middleware
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Check file type
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image files are allowed!'));
        }
    },
});
// Helper function to delete image from Cloudinary
export const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    }
    catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        throw error;
    }
};
export default cloudinary;
//# sourceMappingURL=cloudinary.js.map