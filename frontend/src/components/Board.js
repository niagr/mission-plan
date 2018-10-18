import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {DragDropContext, DragSource, DropTarget} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import {store} from 'store'
import {changeTaskStatus} from 'store/actions'

import TaskCard from './TasksCard'

const DEFAULT_STATUS_COLS = ['PENDING', 'IN_PROGRESS', 'REVIEW', 'DONE']

class Board extends React.Component {
  mapTasksToCols(tasks, statusColumns) {
    const cols = {}
    statusColumns.forEach(status => cols[status] = [])
    for (let task of tasks) {
      cols[task.status].push(task)
    }
    return cols
  }

  render() {
    const { tasks, statusColumns = DEFAULT_STATUS_COLS } = this.props
    const statusCards = this.mapTasksToCols(tasks, statusColumns)
    const numRows = Math.max(...Object.values(statusCards).map(s => s.length))
    return (
      <Container>
        {tasks.map((t, i) => {
          const col = statusColumns.indexOf(t.status)
          const row = statusCards[t.status].indexOf(t)
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
Board = DragDropContext(HTML5Backend)(Board)

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto [last-line];
  grid-gap: 20px;
  background: pink;
`


const DRAGGABLE = 'DRAGGABLE'


const Item = styled.div`
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

class DraggableItem extends React.Component {
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
DraggableItem = DragSource(DRAGGABLE, dragSourceSpec, dragSourceCollect)(DraggableItem)


const Overlay = styled.div`
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

class DroppableOverlay extends React.Component {
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
DroppableOverlay = DropTarget(DRAGGABLE, dropTargetSpec, dropTargetCollect)(DroppableOverlay)

export default connect((state, p) => ({ tasks: state.tasks, ...p })) (Board)
