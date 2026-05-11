const STORAGE_KEY = "task-manager.tasks";

export class TaskStore {
  constructor(storage = globalThis.localStorage) {
    this.storage = storage;
    this.tasks = new Map();
    this.load();
  }

  load() {
    const raw = this.storage?.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const tasks = JSON.parse(raw);
      for (const task of tasks) {
        if (typeof task.id === "number" && typeof task.title === "string") {
          this.tasks.set(task.id, { ...task, completed: Boolean(task.completed) });
        }
      }
    } catch {
      this.tasks.clear();
    }
  }

  save() {
    this.storage?.setItem(STORAGE_KEY, JSON.stringify(this.list()));
  }

  list() {
    return Array.from(this.tasks.values()).sort((a, b) => a.id - b.id);
  }

  add(title) {
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      return null;
    }

    const ids = this.tasks.keys();
    const nextId = this.tasks.size === 0 ? 1 : Math.max(...ids) + 1;
    const task = { id: nextId, title: cleanTitle, completed: false };
    this.tasks.set(nextId, task);
    this.save();
    return task;
  }

  toggle(id) {
    const task = this.tasks.get(id);
    if (!task) {
      return null;
    }

    task.completed = !task.completed;
    this.save();
    return task;
  }

  remove(id) {
    const removed = this.tasks.delete(id);
    if (removed) {
      this.save();
    }
    return removed;
  }

  clearCompleted() {
    let removed = 0;
    for (const [id, task] of this.tasks.entries()) {
      if (task.completed) {
        this.tasks.delete(id);
        removed += 1;
      }
    }

    if (removed > 0) {
      this.save();
    }

    return removed;
  }

  remainingCount() {
    let count = 0;
    for (const task of this.tasks.values()) {
      if (!task.completed) {
        count += 1;
      }
    }
    return count;
  }
}
