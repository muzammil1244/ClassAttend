import pool from "../connections/db_connent.js";

let drop_hod_db = `
CREATE TABLE IF NOT EXISTS hod_db (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  name VARCHAR(255),
  pass VARCHAR(255),
  department_name VARCHAR(255)
);


`;

export const hod_db = async () => {
  try {
    await pool.query(drop_hod_db);
    console.log("✅ hod_db table created or already existed)");
  } catch (err) {
    console.log("❌ Error:", err.message);
  }
};
