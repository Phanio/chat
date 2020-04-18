const PostgresStore = require('../utils/PostgresStore.js')
const bcrypt = require('bcrypt')

class User {
  /** @type {Number} */
  id;  
  /** @type {String} */
  username 
  /** @type {String} */
  password;
  

  /**
   * @param {String} username
   * @param {String} password
   * @returns {Promise<User>}
   */
  static async verifyUser (username, password) {
    const result = await PostgresStore.client.query({
      text: `SELECT * FROM ${User.tableName} WHERE username=$1`,
      values: [username]
    })
   console.log('bbb=', result.rows)
    if (result.rows.length) {
      const currentPassword = result.rows[0].password
      const isSame = await bcrypt.compare(password, currentPassword)
      if (isSame) {
          const user = result.rows[0]
          delete user.password // on ne doit jamais renvoyer le mot de passe de l'utilisateur
          return user
        }
    }
    return null
  }

  /**
   * @param {String} username
   * @param {String[]} scope
   * @returns {Promise<User>}
   */
  static async getByUsername (username, scope) {
   const fields = scope.join(', ')
    const result = await PostgresStore.client.query({
      text: `SELECT ${fields} FROM ${User.tableName} WHERE username=$1`,
      values: [username]
    })
    return result.rows[0]
  }

  /**
   * @param {String} id
   * @param {String[]} scope
   * @returns {Promise<User>}
   */
  static async getById (id, scope) {
    const fields = scope.join(', ')
    const result = await PostgresStore.client.query({
      text: `SELECT ${fields} FROM ${User.tableName} WHERE id=$1`,
      values: [id]
    })
    return result.rows[0]
  }

  /**
   * @param {{username: String, firstname: String, lastname: String, password: String}} user
   * @return {Promise<User>}
   */
  static async create (user) {
   const hashedPassword = await bcrypt.hash(user.password, 10)
    const result = await PostgresStore.client.query({
      text: `INSERT INTO ${User.tableName} (username, password)
        VALUES ($1, $2) RETURNING *`,
      values: [user.username,  hashedPassword]
    })

    const userResult = result.rows[0]
    delete userResult.password // on ne renvoie jamais le mot de passe de l'utilisateur
    return userResult
  }
}

/** @type {String} */
User.tableName = 'users'

module.exports = User
