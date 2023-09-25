const db = require("../../../config/db");

exports.createUser = async (body) => {
  try {
    await db.connectToDatabase();

    const checkExistEmail = await db.prisma.users.findUnique({
      where: { email: body.email },
    });

    if (checkExistEmail) throw Error("This email already exist");

    const createUser = await db.prisma.users.create({
      data: {
        name: body.name,
        email: body.email,
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
