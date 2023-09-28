const db = require("../../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const utils = require("../../../utils");

exports.login = async ({ body }) => {
  try {
    const checkUsername = await db.prisma.users.findUnique({
      where: { username: body.username },
    });
    if (checkUsername) {
      if (bcrypt.compareSync(body.password, checkUsername.password)) {
        const token = jwt.sign({ uid: checkUsername.id, username: checkUsername.username }, utils.JWT_TOKEN_SECRET, {
          expiresIn: "24h",
        });
        const userData = {
          id: checkUsername.id,
          username: checkUsername.username,
        };
        return { userData, token };
      } else {
        throw Error("Invalid password");
      }
    } else {
      throw Error("Invalid username");
    }
  } catch (error) {
    throw Error(error.message);
  } finally {
    await db.disconnectFromDatabase();
  }
};

exports.createUser = async ({ body }) => {
  try {
    await db.connectToDatabase();

    const checkExistEmail = await db.prisma.users.findUnique({
      where: { email: body.email },
    });
    if (checkExistEmail) throw Error("This email already exist");

    const checkExistUsername = await db.prisma.users.findUnique({
      where: { username: body.username },
    });
    if (checkExistUsername) throw Error("This username already exist");

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

exports.getUser = async ({ username }) => {
  try {
    await db.connectToDatabase();
    const user = await db.prisma.users.findUnique({ where: { username: username } });
    if (!user) throw Error("User not found!");
    return user;
  } catch (error) {
    throw Error(error.message);
  } finally {
    await db.disconnectFromDatabase();
  }
};
