const pg = require('pg')
const config = require('../server.config') 
const pgtools = require('pgtools');

class PostgresStore {
  /** @type { import('pg').Pool } */
  pool
  /** @type { import('pg').PoolClient } */
  client
  
  async init () {
    this.pool = new pg.Pool({ ...config.postgres })
    this.client = await this.pool.connect()
  }

  async reset () {
    const conf = {
      user: config.postgres.user,
      host: config.postgres.host,
      password: config.postgres.password
    };
    try {
      await pgtools.dropdb(conf, config.postgres.database);
    } catch (err) {
      console.log("error but don't care", err);
    }
    await pgtools.createdb(conf, config.postgres.database);

    await this.init();
    await this.buildTables();

    console.log('success!');
  }

  
  async buildTables () { 
    const queries = [     
       {
      name: 'users',
      query: `CREATE TABLE users (
        id SERIAL PRIMARY KEY, 
        username TEXT UNIQUE NOT NULL,
        password TEXT  NULL
      )`
    },{
      name: 'chats',
      query: `CREATE TABLE chats (
        id SERIAL PRIMARY KEY, 
        content TEXT  NOT NULL, 
        creation_date TIMESTAMPTZ NOT NULL, 
        user_id INTEGER REFERENCES users(id)
      )`
    }];

    for (const q of queries) { 
      console.log(q);
      await this.client.query(q.query);
    }
  }

  close () {
    if (this.client) this.client.release()
    this.client = null
  }
}

module.exports = new PostgresStore()
