async function handler({ id }) {
  const [updatedButton] = await sql`
    UPDATE buttons 
    SET number = number - 1
    WHERE id = ${id} AND number > 0
    RETURNING *
  `;

  return updatedButton || null;
}