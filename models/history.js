module.exports = (sequelize, type) => {
    return sequelize.define('history', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING
    })
}