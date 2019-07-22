import express from 'express';
import bookmarks from '../controllers/bookmarksController';
import auth from '../middlewares/Auth';

const bookmarksRoute = express.Router();

bookmarksRoute.post('/bookmarks/:articleId', auth.verifyToken, bookmarks.bookmarkArticle);
bookmarksRoute.get('/bookmarks/:bookmarkId', auth.verifyToken, bookmarks.getOneBookmarkArticle);
bookmarksRoute.delete('/bookmarks/:bookmarkId', auth.verifyToken, bookmarks.deleteBookmark);
bookmarksRoute.get('/bookmarks', auth.verifyToken, bookmarks.getAllBookmarks);
export default bookmarksRoute;
