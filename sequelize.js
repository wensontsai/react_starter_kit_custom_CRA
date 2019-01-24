// Bootstrap our ORM and define our relationships.
const Sequelize = require('sequelize')
const UserModel = require('./models/user')
const HistoryModel = require('./models/history')

const sequelize = new Sequelize('friendtree_breams', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

const User = UserModel(sequelize, Sequelize)
const History = HistoryModel(sequelize, Sequelize)
History.belongsTo(User); // Creates foreign key on History model - userId.

// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
// const BlogTag = sequelize.define('blog_tag', {})

// Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
// Tag.belongsToMany(Blog, { through: BlogTag, unique: false })


// NOTE: { force: true } removes tables on every startup and creates new ones..
sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  History
}