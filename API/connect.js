import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "xLoy",
  password: "12345678",
  database: "mydevify_social"
});
