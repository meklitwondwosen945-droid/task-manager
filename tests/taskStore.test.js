import test from "node:test";
import assert from "node:assert/strict";
import { TaskStore } from "../src/taskStore.js";

function createMemoryStorage() {
  const data = new Map();
  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, String(value));
    },
  };
}

test("adds, toggles, removes and counts tasks", () => {
  const store = new TaskStore(createMemoryStorage());
  const first = store.add("Write docs");
  const second = store.add("Ship app");

  assert.equal(store.remainingCount(), 2);
  assert.equal(first?.title, "Write docs");
  assert.equal(second?.id, 2);

  const toggled = store.toggle(1);
  assert.equal(toggled?.completed, true);
  assert.equal(store.remainingCount(), 1);

  const removed = store.remove(2);
  assert.equal(removed, true);
  assert.deepEqual(store.list().map((task) => task.id), [1]);
});

test("clears completed tasks", () => {
  const store = new TaskStore(createMemoryStorage());
  store.add("A");
  store.add("B");
  store.toggle(1);

  const removed = store.clearCompleted();
  assert.equal(removed, 1);
  assert.deepEqual(store.list().map((task) => task.title), ["B"]);
});
