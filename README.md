# ⚡ CashTrackr — Database Tools

Utilidades internas para administrar la base de datos **PostgreSQL (Render)** directamente desde la terminal, sin instalar psql ni TablePlus.

---

## 🧠 ¿Por qué existe esto?

En esta máquina no hay permisos para instalar herramientas externas.

Por eso se crearon **scripts internos de Node** que permiten ejecutar SQL desde npm.

---

## 🚀 Scripts disponibles

| Comando | Función |
|--------|---------|
| `npm run db:query "<SQL>"` | Ejecuta una query SQL única y muestra el resultado en consola. |
| `npm run db:shell` | Abre un shell SQL interactivo dentro de la terminal. |

> Ambos scripts leen automáticamente `DATABASE_URL` desde `.env`.

---

## 📦 Consultas comunes

### Listar todas las tablas

```bash
npm run db:query "SELECT table_name FROM information_schema.tables WHERE table_schema='public';"
```

## Ver columnas / estructura de una tabla

### PowerShell requiere ' y duplicar ' internas.

```bash
npm run db:query 'SELECT column_name, data_type FROM information_schema.columns WHERE table_schema=''public'' AND table_name=''users'' ORDER BY ordinal_position;'
npm run db:query 'SELECT column_name, data_type FROM information_schema.columns WHERE table_schema=''public'' AND table_name=''budgets'' ORDER BY ordinal_position;'
npm run db:query 'SELECT column_name, data_type FROM information_schema.columns WHERE table_schema=''public'' AND table_name=''expenses'' ORDER BY ordinal_position;'
```

---

### Ver datos dentro de las tablas

```bash
npm run db:query "SELECT * FROM users;"
npm run db:query "SELECT * FROM budgets;"
npm run db:query "SELECT * FROM expenses;"
```

### 💬 Shell SQL interactivo - Dentro de Shell

```bash
npm run db:shell
sql> SELECT COUNT(*) FROM users;
sql> SELECT * FROM budgets LIMIT 10;
sql> \q   # salir
```
---

## 📦 Limpieza y mantenimiento

### Borrar tablas específicas

```bash
npm run db:query "DROP TABLE IF EXISTS expenses;"
npm run db:query "DROP TABLE IF EXISTS budgets;"
npm run db:query "DROP TABLE IF EXISTS users;"
```

## Resetear toda la base (schema completo)

```bash
npm run db:query "DROP SCHEMA public CASCADE;"
npm run db:query "CREATE SCHEMA public;"
```

---

## ✅ Nota final
Estas herramientas son solo para inspección y mantenimiento interno.
La creación o modificación de datos se hace a través de las APIs del backend, no por SQL manual.