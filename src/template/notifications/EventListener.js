import eventEmitter from './EventEmitter';
import publishArticle from './publishArticle';
import commentArticle from './commentArticle';

eventEmitter.on('publishArticle', publishArticle);
eventEmitter.on('commentArticle', commentArticle);
eventEmitter.on('error', err => process.stdout.write('Oops! an event error occurred') && err);
