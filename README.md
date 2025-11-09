⚡ CashTrackr — Database Tools

Utilidades internas para administrar PostgreSQL directamente desde la terminal, sin instalar psql ni TablePlus.

🚀 ¿Por qué existe esto?

En esta PC no se pueden instalar clientes externos (como psql, DBeaver o TablePlus).

Por eso se crearon scripts internos (Node) que permiten:

ejecutar queries SQL

inspeccionar tablas

ver estructura de columnas

limpiar base

abrir un shell SQL interactivo

Todo desde npm, usando tu DATABASE_URL del .env.

🔌 Scripts disponibles
Comando	Lo que hace
npm run db:query "<SQL>"	Ejecuta una sola query SQL y muestra el resultado como tabla.
npm run db:shell	Abre un shell SQL para ejecutar varias queries de forma interactiva.
📦 Consultas frecuentes
▶️ Listar tablas
npm run db:query "SELECT table_name FROM information_schema.tables WHERE table_schema='public';"

🔍 Ver columnas / estructura de una tabla

PowerShell requiere comillas simples ' y duplicadas para strings internos.

Users:

npm run db:query 'SELECT column_name, data_type FROM information_schema.columns WHERE table_schema=''public'' AND table_name=''users'' ORDER BY ordinal_position;'


Budgets:

npm run db:query 'SELECT column_name, data_type FROM information_schema.columns WHERE table_schema=''public'' AND table_name=''budgets'' ORDER BY ordinal_position;'


Expenses:

npm run db:query 'SELECT column_name, data_type FROM information_schema.columns WHERE table_schema=''public'' AND table_name=''expenses'' ORDER BY ordinal_position;'

📊 Ver datos dentro de una tabla
npm run db:query "SELECT * FROM users;"
npm run db:query "SELECT * FROM budgets;"
npm run db:query "SELECT * FROM expenses;"

💬 Shell SQL Interactivo
npm run db:shell


ejemplos dentro del shell:

sql> SELECT COUNT(*) FROM users;
sql> SELECT * FROM budgets LIMIT 10;
sql> \q     # salir

🧨 Limpieza / Mantenimiento
borrar tablas individuales
npm run db:query "DROP TABLE IF EXISTS expenses;"
npm run db:query "DROP TABLE IF EXISTS budgets;"
npm run db:query "DROP TABLE IF EXISTS users;"

resetear DB por completo
npm run db:query "DROP SCHEMA public CASCADE;"
npm run db:query "CREATE SCHEMA public;"


Esto deja la base totalmente limpia como recién creada.

✅ Notas finales

Estas herramientas son exclusivamente para lectura, inspección y mantenimiento interno.

La creación / actualización de datos se hace únicamente a través de las APIs del proyecto (no con SQL manual).