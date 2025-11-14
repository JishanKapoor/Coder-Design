import mysql from 'mysql2/promise';

// Ensures the MySQL database and Blog table exist so uploads don't fail on first run
export async function ensureDatabase() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.warn("DATABASE_URL not set, skipping database initialization.");
    return; // Nothing we can do without a URL
  }

  // Parse mysql://user:pass@host:port/dbname?...
  const match = url.match(/^mysql:\/\/(?<user>[^:]+):(?<password>[^@]+)@(?<host>[^:\/]+)(?::(?<port>\d+))?\/(?<database>[^?]+).*$/i);
  if (!match || !match.groups) {
    console.warn("Could not parse DATABASE_URL, skipping database initialization.");
    return;
  }

  const { user, password, host, port, database } = match.groups as Record<string, string>;

  try {
    // First connect without a database, create DB if needed
    const rootConn = await mysql.createConnection({
      host,
      user,
      password,
      port: port ? Number(port) : undefined,
      multipleStatements: true,
    });

    await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    await rootConn.end();

    // Connect to the target DB and ensure Blog table exists
    const dbConn = await mysql.createConnection({
      host,
      user,
      password,
      port: port ? Number(port) : undefined,
      database,
    });

    await dbConn.query(`
      CREATE TABLE IF NOT EXISTS Blog (
        id INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(191) NOT NULL,
        author VARCHAR(191) NOT NULL,
        category VARCHAR(191) NOT NULL,
        description TEXT NOT NULL,
        short_description TEXT NOT NULL,
        image VARCHAR(191) NULL,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    `);

    await dbConn.end();
  } catch (error) {
    console.error("Database initialization failed:", error);
    // We can choose to re-throw or just log the error and continue
    // For now, we'll just log it, so the app can run without a DB
  }
}
