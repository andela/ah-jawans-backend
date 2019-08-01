import model from '../../models';

const { Follow, User } = model;

const getFollower = async (userId) => {
  const followers = await Follow.findAll({ where: { followed: userId },
    include: [{ model: User,
      as: 'follower',
      attributes: ['id', 'username', 'email',
        'image', 'bio', 'following'] }] });

  return followers;
};

export default getFollower;
