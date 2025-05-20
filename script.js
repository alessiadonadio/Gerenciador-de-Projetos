let projects = [];

function addProject() {
  const nameInput = document.getElementById("projectName");
  const name = nameInput.value.trim();
  if (name === "") return;

  const newProject = {
    name,
    tasks: []
  };

  projects.push(newProject);
  nameInput.value = "";
  renderProjects();
}

function renderProjects() {
  const list = document.getElementById("projectList");
  list.innerHTML = "";

  projects.forEach((project, projectIndex) => {
    const projectDiv = document.createElement("div");
    projectDiv.className = "project";

    const title = document.createElement("h3");
    title.textContent = project.name;

    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.placeholder = "Nova tarefa";

    const addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "Adicionar Tarefa";
    addTaskBtn.onclick = () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        project.tasks.push({ text: taskText, done: false });
        taskInput.value = "";
        renderProjects();
      }
    };

    const removeProjectBtn = document.createElement("button");
    removeProjectBtn.textContent = "Remover Projeto";
    removeProjectBtn.style.backgroundColor = "#c0392b";
    removeProjectBtn.onclick = () => {
      projects.splice(projectIndex, 1);
      renderProjects();
    };

    const taskList = document.createElement("div");
    taskList.className = "task-list";

    project.tasks.forEach((task, taskIndex) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";
      if (task.done) taskDiv.classList.add("done");

      const taskText = document.createElement("span");
      taskText.textContent = task.text;
      taskText.onclick = () => {
        task.done = !task.done;
        renderProjects();
      };

      const removeTaskBtn = document.createElement("button");
      removeTaskBtn.textContent = "✕";
      removeTaskBtn.style.backgroundColor = "#e74c3c";
      removeTaskBtn.onclick = () => {
        project.tasks.splice(taskIndex, 1);
        renderProjects();
      };

      taskDiv.appendChild(taskText);
      taskDiv.appendChild(removeTaskBtn);
      taskList.appendChild(taskDiv);
    });

    projectDiv.appendChild(title);
    projectDiv.appendChild(taskInput);
    projectDiv.appendChild(addTaskBtn);
    projectDiv.appendChild(removeProjectBtn);
    projectDiv.appendChild(taskList);

    list.appendChild(projectDiv);
  });
}
