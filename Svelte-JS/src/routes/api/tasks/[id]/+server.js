import db from '$lib/db';

export async function PUT({ params, request }) {
    try {
        const { id } = params;
        const { description, completed } = await request.json();
        const res = await db.query(
            'UPDATE tasks SET description = $1, completed = $2 WHERE id = $3 RETURNING *',
            [description, completed, id]
        );
        return new Response(JSON.stringify(res.rows[0]), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

export async function DELETE({ params }) {
    try {
        const { id } = params;
        await db.query('DELETE FROM tasks WHERE id = $1', [id]);
        return new Response(JSON.stringify({ message: 'Tâche supprimée avec succès' }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
