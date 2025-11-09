import 'dotenv/config';
import pg from 'pg';
import readline from 'node:readline';

const { Client } = pg;
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: 'sql> ' });

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

await client.connect();
console.log('Conectado. Escribe SQL y Enter. Escribe \\q para salir.');
rl.prompt();

rl.on('line', async (line) => {
    const q = line.trim();
    if (!q) return rl.prompt();
    if (q === '\\q') {
        await client.end();
        rl.close();
        return;
    }
    try {
        const res = await client.query(q);
        if (res.rows?.length) console.table(res.rows);
        else console.log(`OK (${res.rowCount ?? 0} filas)`);
    } catch (e) {
        console.error('Error:', e.message);
    }
    rl.prompt();
});
