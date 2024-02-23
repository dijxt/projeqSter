import React from "react";

const Task = ({ task }) => (
    <div className="task">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
    </div>
);

export default function TaskColumn ({ status, tasks }) {
    return(
    <div className="task-column">
        <h2>{status}</h2>
        {tasks.filter(task => task.status === status).map(task => (
            <Task key={task.id} task={task}/>
        ))}
    </div>);
}