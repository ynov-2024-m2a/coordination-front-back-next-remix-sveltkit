"use client"; // Indique que ce composant est un composant client
import { useEffect, useState } from 'react';

export default function CSRExample() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos') // Remplacez par votre endpoint API
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Données chargées côté client</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}