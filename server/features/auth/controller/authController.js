const authModal = require("../model/authModal");

exports.createUser = async (req, res) => {
  try {
    const body = req.body;
    const data = await authModal.createUser(body);
    if (data) {
      res.send({
        status: 200,
        message: "User created",
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const email = req.query.email;
    const data = await authModal.getUser(email);
    if (data) {
      res.send({
        status: 200,
        data: data,
      });
    }
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
    });
  }
};
