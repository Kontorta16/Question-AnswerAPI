const User = require("../models/User");

const register = async (req, res, next) => {
  //POST DATA

  const name = "Ali Dalman";
  const email = "Alidalman28@gmail.com";
  const password = "123";

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  register,
};
