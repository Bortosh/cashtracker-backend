import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error('Falta DATABASE_URL en .env');
    process.exit(1);
}

const sql = process.argv.slice(2).join(' ');
if (!sql) {
    console.error('Uso: node scripts/db-query.mjs "<SQL>"');
    process.exit(1);
}

const client = new Client({
    connectionString,
    // Para Render: si tu URL no tiene sslmode=require, dejamos esto activo.
    ssl: { rejectUnauthorized: false },
});

(async () => {
    try {
        await client.connect();
        const res = await client.query(sql);
        // Imprime de forma legible
        if (res.rows && res.rows.length) {
            console.table(res.rows);
        } else {
            console.log(`OK (${res.rowCount ?? 0} filas)`);
        }
    } catch (err) {
        console.error('Error ejecutando query:\n', err.message);
    } finally {
        await client.end();
    }
})();
