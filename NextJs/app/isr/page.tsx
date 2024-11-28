interface Todo {
  userId: number;
  id: number;
  title: String;
  completed: boolean;
}

interface Props {
  todos: Todo[];
}

export default async function Page({ todos }: Props) {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    next: { revalidate: 60 }, // Régénère la page toutes les 60 secondes
  });
  const data = await res.json();
  return (
    <div>
      <h1>Données avec régénération incrémentale</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
