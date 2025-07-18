import mysql from 'mysql2';

export const db = mysql.createConnection({
  host: "mysql",           // docker service name
  user: "root",            // from docker-compose
  password: "root",        // must match MYSQL_ROOT_PASSWORD
  database: "social"       // must match MYSQL_DATABASE
});
