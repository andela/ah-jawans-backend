
const asyncHandler = controller => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

export default asyncHandler;
