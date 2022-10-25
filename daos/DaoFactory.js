const keys = require('../config/keys');
const ProductDaoMysql = require('./products/ProductDaoMysql')
const ProductDaoSqlite = require('./products/ProductDaoSqlite')
const ProductDaoFile = require('./products/ProductDaoFile')
const ProductDaoMongoose = require('./products/ProductDaoMongoose')
const ShoppingCartDaoMysql = require('./shoppingCart/ShoppingCartDaoMysql')
const ShoppingCartDaoSqlite = require('./shoppingCart/ShoppingCartDaoSqlite')
const ShoppingCartDaoFile = require('./shoppingCart/ShoppingCartDaoFile')
const ShoppingCartDaoMongoose = require('./shoppingCart/ShoppingCartDaoMongoose')
const UserDaoMongoose = require('./users/UserDaoMongoose')

class DaoFactory {

  static getProduct() {
    switch (keys.driverClassName) {
      case 'mysql':
        return new ProductDaoMysql();
      case 'sqlite':
        return new ProductDaoSqlite();
      case 'file':
        return new ProductDaoFile();
      case 'mongo':
        return new ProductDaoMongoose();
    }
  }

  static getShoppingCart() {
    switch (keys.driverClassName) {
      case 'mysql':
        return new ShoppingCartDaoMysql();
      case 'sqlite':
        return new ShoppingCartDaoSqlite();
      case 'file':
        return new ShoppingCartDaoFile();
      case 'mongo':
        return new ShoppingCartDaoMongoose();
    }
  }

  static getUser() {
    return new UserDaoMongoose();
  }

}

module.exports = DaoFactory