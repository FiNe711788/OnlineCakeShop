const dbConnection = require("../config/mongoConnection");
const api = require("../api.js");

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();

    await api.CreateUser("admin","admin");

    console.log("Done seeding database");
    await db.close();
}

main();