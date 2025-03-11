async function handler({ word, number }) {
  const [newButton] = await sql`
    INSERT INTO buttons (word, number)
    VALUES (${word}, ${number})
    RETURNING *
  `;

  return newButton || null;
}