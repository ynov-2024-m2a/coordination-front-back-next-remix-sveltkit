export const actions = {
	default: async (event) => {
		const res = await db.query('SELECT * FROM tasks ORDER BY id DESC');
	}
};