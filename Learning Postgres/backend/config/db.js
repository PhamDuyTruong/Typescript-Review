module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: process.env.PASSWORD_DB,
    DB: process.env.DATABASE,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
}