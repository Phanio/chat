const PostgresStore = require('../utils/PostgresStore.js') 

class Chat {
  /** @type {Number} */
  id;
  /** @type {String} */
  content;  

  /**
   * @param {Number} id
   * @returns {Promise<Chat>}
   */
  static async getById (id) {
    const result = await PostgresStore.client.query({
      text: `SELECT * FROM ${Chat.tableName} WHERE id=$1`,
      values: [id]
    });
    return result.rows[0];
  }

  static async getAll () {
    const result = await PostgresStore.client.query(
      `SELECT * FROM ${Chat.tableName}`
    );
    return result.rows;
  }

  /**
   * @param {Number} userId
   * @returns {Promise<Chat[]>}
   */
  static async getByUserId (userId) {
    const result = await PostgresStore.client.query({
      text: `
      SELECT * FROM ${Chat.tableName}  
      WHERE user_id=$1`,
      values: [userId]
    });
    return result.rows;
  }

  /**
    * @param {{name: String}} params 
    * @returns {Promise<Chat>}
    */
  static async update (id,params,userId) {
    const result = await PostgresStore.client.query({
      text: `UPDATE ${Chat.tableName} SET content = $1
        WHERE id=$2 and user_id=$3 RETURNING *`,
      values: [params.content, id,userId]
    }); 
    if(result){
      return result.rows[0];
    }
    return null;
  }

  /**
   * @param {{name: String}} params
   * @returns {Promise<Chat>}
   */
  static async create (params, userId) {
    const result = await PostgresStore.client.query({
      text: `INSERT INTO ${Chat.tableName} (content, user_id) VALUES ($1, $2)
        RETURNING *`,
      values: [params.content, userId]
    });
    return result.rows[0];
  }

  
  /**
   * @param {Number} userId
   * @param {Number} id
   */
  static async remove (id, userId) {
    const result= await PostgresStore.client.query({
      text: `DELETE FROM ${Chat.tableName} WHERE id=$1 and user_id=$2 RETURNING *`,
      values: [id, userId]
    });
    if(result){
      return result.rows[0];
    }
    return null;
  }
 
} 
/** @type {String} */
Chat.tableName = 'chats';
module.exports = Chat;
