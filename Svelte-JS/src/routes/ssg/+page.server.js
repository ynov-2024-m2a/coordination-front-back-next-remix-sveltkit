// src/routes/ssg-example/+page.server.js
export async function load({ fetch }) {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos'); // Remplacez par votre endpoint API
    const data = await res.json();

    return {
        data,
    };
}

export const prerender = true; // Active la pré-génération statique pour cette page
