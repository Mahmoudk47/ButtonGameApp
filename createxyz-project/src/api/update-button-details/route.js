async function handler({ id, word, number }) {
  const [updatedButton] = await sql`
    UPDATE buttons 
    SET word = ${word}, 
        number = ${number}
    WHERE id = ${id}
    RETURNING *
  `;

  return updatedButton || null;
}