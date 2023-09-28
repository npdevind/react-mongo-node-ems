const authModal = require("../model/authModal");

exports.login = async (req, res) => {
  try {
    const body = req.body;
    const data = await authModal.login({ body });
    if (data) {
      res.send({
        status: 200,
        message: "Welcome",
        data: data,
        error: false,
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
      error: true,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const body = req.body;
    const data = await authModal.createUser({ body });
    if (data) {
      res.send({
        status: 200,
        message: "User created",
        error: false,
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
      error: true,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const data = await authModal.getUser({ username: req.user?.username });
    if (data) {
      const user = {
        id: data.id,
        username: data.username,
      };
      res.json(user);
    }
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
    });
  }
};
