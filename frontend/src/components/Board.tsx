import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {DragDropContext, DragSource, DropTarget} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import {store} from 'store'
import {changeTaskStatus} from 'store/actions'
import {Task, STATUS} from 'store/reducers'

import TaskCard from './TasksCard'


interface BoardProps {
  tasks: Task[]
  statusColumns: STATUS[]
}

type StatusColumns = {[status in STATUS]?: Task[]}

@DragDropContext(HTML5Backend)
class Board extends React.Component<BoardProps> {
  
  mapTasksToCols(tasks: Task[], statusColumns: STATUS[]): StatusColumns {
    const cols: StatusColumns = {}
    statusColumns.forEach(status => cols[status] = [])
    for (let task of tasks) {
      const colArray = cols[task.status]
      colArray && colArray.push(task)
    }
    return cols
  }

  render() {
    const { tasks=[], statusColumns=[]} = this.props
    const statusCards = this.mapTasksToCols(tasks, statusColumns)
    const numRows = Math.max(...Object.values(statusCards).map(s => s ? s.length: 0))
    return (
      <Container>
        {tasks.map((t, i) => {
          const col = statusColumns.indexOf(t.status)
          const column = statusCards[t.status]
          const row =  column && column.indexOf(t)
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

interface ItemProps {
  row: number
  col: number
}

const Item = styled.div<ItemProps>`
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

interface DraggableItemProps {
  connectDragSource?: any
  isDragging?: boolean
  data: Task
}

@DragSource(DRAGGABLE, dragSourceSpec, dragSourceCollect)
class DraggableItem extends React.Component<DraggableItemProps & ItemProps> {
  render () {
    const {connectDragSource, isDragging, children, row, col} = this.props
    return (
      <Item 
        ref={instance => connectDragSource(instance)}
        {...this.props}
      >
        {children}
      </Item>
    )
  }
}


interface OverlayProps {
  dropMode: boolean
  col: number
  numRows: number
}

const Overlay = styled.div<OverlayProps>`
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


interface DroppableOverlayProps {
  connectDropTarget?: any
  isOver?: boolean
  col: number
  numRows: number
  status: STATUS
}

@DropTarget(DRAGGABLE, dropTargetSpec, dropTargetCollect)
class DroppableOverlay extends React.Component<DroppableOverlayProps> {
  render () {
    const {connectDropTarget, isOver, children} = this.props
    return (
      <Overlay 
        ref={instance => connectDropTarget(instance)} 
        dropMode={isOver || false} 
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