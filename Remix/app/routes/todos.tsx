import React from "react";
import { useLoaderData } from "@remix-run/react";
import { db } from "../db.server";
import styles from "./todos.module.css"; 
import { FaCheck, FaTrash } from "react-icons/fa"; 
import type { ActionFunction } from "@remix-run/node"; 

export const loader = async () => {
  const todos = await db.todo.findMany();
  return { todos };
};
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  const id = formData.get("id") as string;
  if (actionType === "delete" && id !== null) {
    await db.todo.delete({ where: { id: parseInt(id as string) } });
  }
  if (actionType === "validate") {
    await db.todo.update({
      where: { id: parseInt(id) },
      data: { done: true },
    });
  }
  if (actionType === "add") {
    const task = formData.get("task");
    if (typeof task !== "string" || task.trim() === "") {
      return { error: "Task cannot be empty!" };
    }
    await db.todo.create({
      data: { task, dueDate: new Date() },
    });
  }
  return null;
};
export const links = () => [{ rel: "stylesheet", href: styles }];

type LoaderData = {
  todos: Array<{
    id: number;
    task: string;
    done: boolean;
    dueDate: string;
  }>;
};
export default function Todos() {
  const { todos } = useLoaderData<LoaderData>();
  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Todo App</h1>
        <form method="post" className={styles.form}>
          <input type="hidden" name="actionType" value="add" />
          <input
            type="text"
            name="task"
            placeholder="Enter a new task"
            className={styles.input}
            required
          />
          <button type="submit" className={styles.addButton}>Add</button>
        </form>
        <ul className={styles.list}>
          {todos.map((todo) => (
            <li key={todo.id} className={styles.listItem}>
              <div className={styles.taskInfo}>
                <span className={`${styles.task} ${todo.done ? styles.done : ""}`}>
                  {todo.task}
                </span>
                <span className={styles.date}>
                  ({new Date(todo.dueDate).toLocaleString()})
                </span>
              </div>
              <div className={styles.actions}>
                {!todo.done && (
                  <form method="post" className={styles.actionForm}>
                    <input type="hidden" name="actionType" value="validate" />
                    <input type="hidden" name="id" value={todo.id} />
                    <button type="submit" className={styles.iconButton}>
                      <FaCheck className={styles.validateIcon} />
                    </button>
                  </form>
                )}
                <form method="post" className={styles.actionForm}>
                  <input type="hidden" name="actionType" value="delete" />
                  <input type="hidden" name="id" value={todo.id} />
                  <button type="submit" className={styles.iconButton}>
                    <FaTrash className={styles.deleteIcon} />
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
  );
}