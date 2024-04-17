export default () => ({
  //server port
  port: process.env.PORT,
  //variables for db connection
  db_port: process.env.DB_PORT,
  db_owner: process.env.DB_OWNER,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  db_host: process.env.DB_HOST,
  //secretKey
  secretKey: process.env.SECRET_KEY,
});
