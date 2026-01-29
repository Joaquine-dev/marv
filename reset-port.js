const { Sequelize } = require('sequelize');
const path = require('path');

const dbPath = path.join(process.env.LOCALAPPDATA, 'marv-nodejs', 'Data', 'database', 'marv.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
});

async function resetPort() {
  try {
    await sequelize.query("UPDATE Settings SET value = '4242' WHERE key = 'server.port'");
    console.log('Port reset to 4242');
    await sequelize.close();
  } catch (error) {
    console.error('Error:', error.message);
  }
}

resetPort();
