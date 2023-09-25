const db = require("../../../config/db");
const bcrypt = require("bcryptjs");

exports.createUser = async (body) => {
  try {
    await db.connectToDatabase();

    const checkExistEmail = await db.prisma.users.findUnique({
      where: { email: body.email },
    });

    if (checkExistEmail) throw Error("This email already exist");

    const hashPassword = bcrypt.hashSync(body.password, 10);

    const createUser = await db.prisma.users.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashPassword,
      },
    });

    if (createUser) return true;
  } catch (error) {
    throw Error(error.message);
  } finally {
    await db.disconnectFromDatabase();
  }
};

exports.getUser = async (email) => {
  try {
    await db.connectToDatabase();

    const user = await db.prisma.users.findUnique({ where: { email: email } });

    if (user) return user;
    else throw Error("User not found!");
  } catch (error) {
    throw Error(error.message);
  } finally {
    await db.disconnectFromDatabase();
  }
};
