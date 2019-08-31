import { Router } from 'express';
import UploadController from '../controllers/ImageUploadController';
import Auth from '../middlewares/Auth';
import asyncHandler from '../middlewares/asyncHandler';
import multerUploads from '../middlewares/multerUploads';
import slugExist from '../middlewares/slugExists';

const { verifyToken } = Auth;

const upload = Router();
upload.post('/upload',
  verifyToken,
  multerUploads.array('image', 1),
  asyncHandler(UploadController.save));
upload.get('/gallery', verifyToken, asyncHandler(UploadController.get));
upload.post('/articles/:slug/cover',
  verifyToken,
  slugExist,
  asyncHandler(UploadController.setCover));

export default upload;
