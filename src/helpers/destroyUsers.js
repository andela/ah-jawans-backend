import models from '../models';

models.user.destroy({
  where: {},
  truncate: false
});
