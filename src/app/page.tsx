import Link from "next/link";
import { listTasks } from "@/lib/db";
import { addTask, deleteTask, editTask, toggleTask } from "./actions";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ edit?: string }> };

export default async function Home({ searchParams }: Props) {
  const { edit } = await searchParams;
  const editedId = Number(edit);
  const tasks = await listTasks();

  return (
    <main>
      <h1>Mes tâches</h1>
      <p className="sub">Mise à jour déployée avec Git et cPanel</p>

      <form action={addTask} className="add">
        <input name="title" placeholder="Nouvelle tâche" maxLength={200} required />
        <button type="submit">Ajouter</button>
      </form>

      {tasks.length === 0 && <p className="empty">Aucune tâche pour le moment.</p>}

      <ul>
        {tasks.map((task) =>
          task.id === editedId ? (
            <li key={task.id}>
              <form action={editTask.bind(null, task.id)} className="edit">
                <input
                  name="title"
                  aria-label="Titre de la tâche"
                  defaultValue={task.title}
                  maxLength={200}
                  required
                  autoFocus
                />
                <button type="submit">Enregistrer</button>
                <Link href="/">Annuler</Link>
              </form>
            </li>
          ) : (
            <li key={task.id} className={task.done ? "done" : ""}>
              <form action={toggleTask.bind(null, task.id)}>
                <button type="submit" className="check" aria-label="Changer l’état">
                  {task.done ? "✓" : ""}
                </button>
              </form>
              <span>{task.title}</span>
              <Link href={`/?edit=${task.id}`} className="mod">Modifier</Link>
              <form action={deleteTask.bind(null, task.id)}>
                <button type="submit" className="del">Supprimer</button>
              </form>
            </li>
          ),
        )}
      </ul>
    </main>
  );
}
