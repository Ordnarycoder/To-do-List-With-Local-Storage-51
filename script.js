const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleTodo(${index})">${todo.text}</span>
      <button onclick="deleteTodo(${index})">✕</button>
    `;
    list.appendChild(li);
  });
}

function addTodo(text) {
  todos.push({ text, completed: false });
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
  }
});

renderTodos();
