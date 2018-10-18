import React from 'react'

const TaskCard = ({name, desc, style={}}) =>
    <div style={{...(styles.container as any), ...style}}>
        <div>Name: {name}</div>
        <div>Description: {desc}</div>
    </div>

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        boxShadow: '#bfbfbf 0px 0px 1px 1px'
    }
}

export default TaskCard