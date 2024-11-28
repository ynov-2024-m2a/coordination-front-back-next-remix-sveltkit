export default async function SSGExample() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos"); // Comportement de cache par défaut
  const data = await res.json();

  return (
    <div>
      <h1>Données générées statiquement</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
