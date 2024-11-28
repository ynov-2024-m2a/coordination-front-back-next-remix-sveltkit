export default async function Page() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <div>
      <h1>Données rendues côté serveur</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
