import React from 'react'

const TaskCard = ({name, desc}) =>
    <div>
        <ul>
            <li>Name: {name}</li>
            <li>Description: {desc}</li>
        </ul>
    </div>

export default TaskCard