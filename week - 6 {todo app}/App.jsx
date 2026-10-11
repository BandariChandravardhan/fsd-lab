import { useState,useEffect} from 'react';
import './App.css';

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );

  useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
  },[tasks]);

  function addTask(){
    if(task.trim()){
      setTasks([...tasks,task])
      setTask("");
    }
  }

  return (
    <div className="container">
      <h2>ToDo App</h2>
      <input value={task} onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTask}>Add</button>

      {tasks.map((t, i) => (
        <p key={i}>
          {" "}
          {t}{" "}
          <button onClick={() => setTasks(tasks.filter((_, j) => j !== i))}>
            Delete
          </button>{" "}
        </p>
      ))}
    </div>
  );
}

 
