import React from "react";

interface TaskViewProps {
  name?: string
  desc?: string
}

export default class TaskView extends React.Component<TaskViewProps> {
  render () {
    const {name='', desc=''} = this.props
    return (
      <div>
        <label>Name:</label> <span>{name}</span>
        <br/>
        <label>Description:</label> <span>{desc}</span>
      </div>
    )
  }
}