<script>
	import { onMount } from 'svelte';
    import '../app.css';

	let tasks = [];
	let newTask = '';

	const fetchTasks = async () => {
		try {
			const res = await fetch('/api/tasks');
			tasks = await res.json();
		} catch (error) {
			console.error('Erreur lors de la récupération des tâches :', error);
		}
	};

	const addTask = async () => {
		if (newTask.trim()) {
			try {
				await fetch('/api/tasks', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ description: newTask })
				});
				newTask = '';
				fetchTasks();
			} catch (error) {
				console.error("Erreur lors de l'ajout de la tâche :", error);
			}
		}
	};

	const toggleTask = async (task) => {
		try {
			await fetch(`/api/tasks/${task.id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					description: task.description,
					completed: !task.completed
				})
			});
			fetchTasks();
		} catch (error) {
			console.error('Erreur lors de la mise à jour de la tâche :', error);
		}
	};

	const deleteTask = async (task) => {
		try {
			await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
			fetchTasks();
		} catch (error) {
			console.error('Erreur lors de la suppression de la tâche :', error);
		}
	};

	onMount(() => {
		fetchTasks();
	});
</script>

<main class="mx-auto mt-10 w-full max-w-md rounded bg-white p-5 shadow">
	<h1 class="mb-5 text-center text-2xl font-bold">Ma Todo List</h1>

	<div class="mb-5 flex">
		<input
			type="text"
			bind:value={newTask}
			placeholder="Nouvelle tâche"
			class="flex-grow rounded-l border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
		<button
			on:click={addTask}
			class="rounded-r bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
		>
			Ajouter
		</button>
	</div>

	<ul>
		{#each tasks as task}
			<li class="mb-2 flex items-center justify-between rounded bg-gray-100 p-2">
				<div class="flex items-center">
					<input
						type="checkbox"
						checked={task.completed}
						on:change={() => toggleTask(task)}
						class="mr-2"
					/>
					<span class:line-through={task.completed}>{task.description}</span>
				</div>
				<button
					on:click={() => deleteTask(task)}
					class="text-red-500 hover:text-red-700 focus:outline-none"
				>
					Supprimer
				</button>
			</li>
		{/each}
	</ul>
</main>
