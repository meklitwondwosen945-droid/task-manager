import { TaskStore } from "./taskStore.js";

const store = new TaskStore();
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const remainingCount = document.querySelector("#remaining-count");
const clearCompletedButton = document.querySelector("#clear-completed");

function taskMarkup(task) {
  const item = document.createElement("li");
  item.className = `task-item${task.completed ? " completed" : ""}`;
  item.dataset.taskId = String(task.id);

  const left = document.createElement("div");
  left.className = "task-item__left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `Mark ${task.title} complete`);

  const text = document.createElement("span");
  text.className = "task-item__text";
  text.textContent = task.title;

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "task-item__remove";
  remove.textContent = "Delete";

  left.append(checkbox, text);
  item.append(left, remove);

  checkbox.addEventListener("change", () => {
    const updated = store.toggle(task.id);
    if (!updated) {
      return;
    }

    checkbox.checked = updated.completed;
    item.classList.toggle("completed", updated.completed);
    updateRemainingCount();
  });

  remove.addEventListener("click", () => {
    if (store.remove(task.id)) {
      item.remove();
      updateRemainingCount();
    }
  });

  return item;
}

function updateRemainingCount() {
  const count = store.remainingCount();
  remainingCount.textContent = `${count} ${count === 1 ? "task" : "tasks"} left`;
}

function renderInitialTasks() {
  const fragment = document.createDocumentFragment();
  for (const task of store.list()) {
    fragment.append(taskMarkup(task));
  }
  list.append(fragment);
  updateRemainingCount();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const task = store.add(input.value);
  if (!task) {
    return;
  }

  list.append(taskMarkup(task));
  input.value = "";
  updateRemainingCount();
});

clearCompletedButton.addEventListener("click", () => {
  const completedIds = store
    .list()
    .filter((task) => task.completed)
    .map((task) => task.id);

  const removed = store.clearCompleted();
  if (removed === 0) {
    return;
  }

  for (const id of completedIds) {
    const node = list.querySelector(`[data-task-id="${id}"]`);
    node?.remove();
  }

  updateRemainingCount();
});

renderInitialTasks();
