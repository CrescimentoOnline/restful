import Sequelize from 'sequelize'

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
})

const sequelize = new Sequelize(process.env['DB_URI'])
export default sequelize
