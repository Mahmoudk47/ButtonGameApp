async function handler({ id }) {
  const [deletedButton] = await sql`
    DELETE FROM buttons 
    WHERE id = ${id}
    RETURNING *
  `;

  return deletedButton || null;
}