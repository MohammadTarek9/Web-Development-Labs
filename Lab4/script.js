// Get DOM elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const totalTasks = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');
const pendingTasks = document.getElementById('pending-tasks');
const emptyState = document.getElementById('empty-state');
const editModal = document.getElementById('edit-modal');
const editInput = document.getElementById('edit-input');
const saveEditBtn = document.getElementById('save-edit');
const cancelEditBtn = document.getElementById('cancel-edit');

// Global variables
let tasks = [];
let currentEditIndex = null;

// Update task statistics
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    
    totalTasks.textContent = `Total: ${total}`;
    completedTasks.textContent = `Completed: ${completed}`;
    pendingTasks.textContent = `Pending: ${pending}`;
    
    emptyState.style.display = total === 0 ? 'block' : 'none';
}

// Render tasks to the DOM
function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }
        
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
            <span class="task-desc">${task.description}</span>
            <button class="btn btn-edit" data-index="${index}">Edit</button>
            <button class="btn btn-delete" data-index="${index}">Delete</button>
        `;
        
        taskList.appendChild(li);
    });
    
    updateStats();
}

// Add task event listener
addBtn.addEventListener('click', () => {
    const description = taskInput.value.trim();
    if (description) {
        tasks.push({
            description,
            completed: false,
            createdAt: new Date()
        });
        taskInput.value = '';
        renderTasks();
    }
});

// Allow Enter key to add task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

// Task list event delegation
taskList.addEventListener('click', (e) => {
    const index = parseInt(e.target.getAttribute('data-index'));
    
    if (e.target.classList.contains('task-checkbox')) {
        tasks[index].completed = e.target.checked;
        renderTasks();
    } else if (e.target.classList.contains('btn-edit')) {
        currentEditIndex = index;
        editInput.value = tasks[index].description;
        editModal.style.display = 'flex';
        editInput.focus();
    } else if (e.target.classList.contains('btn-delete')) {
        tasks.splice(index, 1);
        renderTasks();
    }
});

// Save edit
saveEditBtn.addEventListener('click', () => {
    const newDescription = editInput.value.trim();
    if (newDescription && currentEditIndex !== null) {
        tasks[currentEditIndex].description = newDescription;
        currentEditIndex = null;
        editModal.style.display = 'none';
        renderTasks();
    }
});

// Cancel edit
cancelEditBtn.addEventListener('click', () => {
    currentEditIndex = null;
    editModal.style.display = 'none';
});

// Allow Enter key to save edit
editInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveEditBtn.click();
    }
});

// Close modal on background click
window.addEventListener('click', (e) => {
    if (e.target === editModal) {
        currentEditIndex = null;
        editModal.style.display = 'none';
    }
});

// Initialize
renderTasks();
