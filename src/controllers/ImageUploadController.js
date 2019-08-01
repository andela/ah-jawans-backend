import dotenv from 'dotenv';
import Gallery from './helpers';

dotenv.config();
const { IMAGE_BASE_URL, NODE_ENV } = process.env;
/**
 * A class to upload image
 */
export default class UploadController {
  /**
   * Upload image, and save it to gallery table
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
  static async save(req, res) {
    const image = req.files && req.files[0];
    return typeof image === 'object' && typeof image !== 'boolean' && NODE_ENV !== 'test'
      ? (await Gallery.save({ image: `${image.version}/${image.public_id}.${image.format}`,
        userId: req.user.id }))
          && res.status(201).json({ status: 201,
            message: { original: `v${image.version}/${image.public_id}.${image.format}`,
              thumbnail: `${IMAGE_BASE_URL}/w_600/v${image.version}/${image.public_id}.${
                image.format
              }`,
              square: `${IMAGE_BASE_URL}/w_320,ar_1:1,c_fill,g_auto,e_art:hokusai/v${
                image.version
              }/${image.public_id}.${image.format}`,
              circle: `${IMAGE_BASE_URL}/w_120,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v${
                image.version
              }/${image.public_id}.${image.format}` } })
      : res
        .status(400)
        .json({ status: 400, message: { image: 'sorry, you did not provide image to be uploaded' } });
  }
}
