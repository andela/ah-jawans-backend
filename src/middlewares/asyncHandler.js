
const asyncHandler = controller => async (req, res, next) => {
  try {
    console.log(res, 'oooooooerror');
    await controller(req, res, next);
  } catch (err) {
    console.log(err, 'error');
    return res.status(500).json({ status: 500, message: err.message });
  }
};

export default asyncHandler;
