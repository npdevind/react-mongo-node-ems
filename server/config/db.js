const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function connectToDatabase() {
  try {
    await prisma.$connect();
    //console.log("Database connection established.");
  } catch (error) {
    console.log("Error connecting to the database: " + error);
  }
}

async function disconnectFromDatabase() {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.log(error);
  }
}

// Export the functions
module.exports = {
  connectToDatabase,
  disconnectFromDatabase,
  prisma,
};
