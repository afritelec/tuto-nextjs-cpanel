"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTask, removeTask, renameTask, switchTask } from "@/lib/db";

export async function addTask(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim().slice(0, 200);
  if (title) await createTask(title);
  revalidatePath("/");
}

export async function editTask(id: number, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim().slice(0, 200);
  if (title) await renameTask(id, title);
  revalidatePath("/");
  redirect("/");
}

export async function toggleTask(id: number) {
  await switchTask(id);
  revalidatePath("/");
}

export async function deleteTask(id: number) {
  await removeTask(id);
  revalidatePath("/");
}
