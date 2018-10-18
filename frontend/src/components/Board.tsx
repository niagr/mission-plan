import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {DragDropContext, DragSource, DropTarget} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import {store} from 'store'
import {changeTaskStatus} from 'store/actions'

import TaskCard from './TasksCard'

@DragDropContext(HTML5Backend)
class Board extends React.Component<any> {
  
  mapTasksToCols(tasks, statusColumns) {
    const cols: {[status: string]: any[]} = {}
    statusColumns.forEach(status => cols[status] = [])
    for (let task of tasks) {
      if (task.status in cols) {
        cols[task.status].push(task)
      }
    }
    return cols
  }

  render() {
    const { tasks=[], statusColumns=[]} = this.props
    const statusCards = this.mapTasksToCols(tasks, statusColumns)
    const numRows = Math.max(...Object.values(statusCards).map(s => s.length))
    return (
      <Container>
        {tasks.map((t, i) => {
          const col = statusColumns.indexOf(t.status)
          const row = statusCards[t.status] && statusCards[t.status].indexOf(t)
          if (row == undefined  || col == -1) return null
          return (
            <DraggableItem key={t.name + i} col={col} row={row} data={t}>
              <TaskCard name={t.name} desc={t.desc} />
            </DraggableItem>
          )
        }
        )}
        {statusColumns.map((status, i) => 
          <DroppableOverlay key={'overlay' + i} col={i} status={status} numRows={numRows} /> )
        }
      </Container>
    )
  }
  
}

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto [last-line];
  grid-gap: 20px;
  background: pink;
`


const DRAGGABLE = 'DRAGGABLE'


const Item = styled.div<any>`
    margin: 10px;
    grid-column: ${p => p.col + 1} / span 1;
    grid-row: ${p => p.row + 1} / span 1;
    background: yellow;
    z-index: 20;
`

const dragSourceSpec = {
  beginDrag: props => {
    return {
      taskId: props.data.id
    }
  },
}

const dragSourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

@DragSource(DRAGGABLE, dragSourceSpec, dragSourceCollect)
class DraggableItem extends React.Component<any> {
  render () {
    const {connectDragSource, isDragging, children} = this.props
    return (
      <Item 
        ref={instance => connectDragSource(instance)} 
        isDragging={isDragging} 
        {...this.props}
      >
        {children}
      </Item>
    )
  }
}


const Overlay = styled.div<any>`
  background: ${p => p.dropMode ? 'blue' : 'green'};
  z-index: 10;
  grid-column: ${p => p.col+1} / span 1;
  grid-row: 1 / span ${p => p.numRows};
`

const dropTargetSpec = {
  drop (props, monitor) {
    const sourceItem = monitor.getItem()
    store.dispatch(changeTaskStatus(sourceItem.taskId, props.status))
    return {
      status: props.status,
    }
  }
}

const dropTargetCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
})

@DropTarget(DRAGGABLE, dropTargetSpec, dropTargetCollect)
class DroppableOverlay extends React.Component<any> {
  render () {
    const {connectDropTarget, isOver, children} = this.props
    return (
      <Overlay 
        ref={instance => connectDropTarget(instance)} 
        dropMode={isOver} 
        {...this.props}
      >
        {children}
      </Overlay>
    )
  }
}

function mapStateToProps (state, props) {
  return { 
    tasks: state.tasks,
    statusColumns: state.statusColumns,
    ...props
  }
}

export default connect(mapStateToProps)(Board)