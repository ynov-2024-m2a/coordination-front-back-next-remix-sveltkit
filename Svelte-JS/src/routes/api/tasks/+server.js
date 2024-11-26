import db from '$lib/db';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
    try {
        const res = await db.query('SELECT * FROM tasks ORDER BY id DESC');
        return new Response(JSON.stringify(res.rows), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

export async function POST({ request }) {
    try {
        const { description } = await request.json();
        const res = await db.query(
            'INSERT INTO tasks (description) VALUES ($1) RETURNING *',
            [description]
        );
        return new Response(JSON.stringify(res.rows[0]), { status: 201 });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
