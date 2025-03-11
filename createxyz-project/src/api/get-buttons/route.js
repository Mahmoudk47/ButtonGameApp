async function handler() {
  const buttons = await sql`SELECT * FROM buttons ORDER BY id ASC`;
  return { buttons };
}