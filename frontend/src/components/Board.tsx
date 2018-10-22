import React from 'react'
import { connect } from 'react-redux'
import {Dispatch} from 'redux'
import styled from 'styled-components'
import {DragDropContext, DragSource, DropTarget, DragSourceCollector, ConnectDragSource, DragSourceSpec, DropTargetSpec, DropTargetCollector, ConnectDropTarget} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import {Task, STATUS, State, anyobject} from 'types'
import {changeTaskStatus} from 'store/actions'

import TaskCard from './TasksCard'


const COLUMN_TITLES: {[status in STATUS]: string} = {
  [STATUS.PENDING]: 'Pending',
  [STATUS.IN_PROGRESS]: 'In Progress',
  [STATUS.REVIEW]: 'Review',
  [STATUS.DONE]: 'Done',
}

interface BoardProps {
  tasks?: Task[]
  statusColumns?: STATUS[]
  onTaskDropped?: (taskId: number, status: STATUS) => void
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
    const { tasks=[], statusColumns=[], onTaskDropped=()=>null} = this.props
    const statusCards = this.mapTasksToCols(tasks, statusColumns)
    const numRows = Math.max(...Object.values(statusCards).map(s => s ? s.length: 0))
    return (
      <Container numCols={statusColumns.length} numRows={numRows}>
        {statusColumns.map((status, i) => 
          <ColumnHeader col={i}>{COLUMN_TITLES[status]}</ColumnHeader>
        )}
        {tasks.map((t, i) => {
          const col = statusColumns.indexOf(t.status)
          const column = statusCards[t.status]
          // offset of one for the header bar
          const row =  column && column.indexOf(t) + 1
          if (row == undefined  || col == -1) return null
          return (
            <DraggableItem key={t.name + i} col={col} row={row} data={t}>
              <TaskCard name={t.name} desc={t.desc} />
            </DraggableItem>
          )
        })}
        {statusColumns.map((status, i) => 
          <DroppableOverlay 
            key={'overlay' + i} 
            col={i} 
            status={status}
            onDropped={onTaskDropped}
          /> 
        )}
      </Container>
    )
  }
  
}

const Container = styled.div<{numCols: number, numRows: number}>`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(${p => p.numCols}, 1fr);
  grid-template-rows: [header] 100px repeat(${p => (p.numRows < 3 ? 3: p.numRows)}, 100px) [last-line];
  grid-column-gap: 10px;
`

const ColumnHeader = styled.div<{col: number}>`
  padding: 20px;
  grid-column: ${p => p.col + 1} / span 1;
  grid-row: 1 / span 1;
  z-index: 40;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
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
    z-index: 20;
`

const dragSourceSpec: DragSourceSpec<DraggableItemProps, {taskId: number}> = {
  beginDrag: (props) => {
    return {
      taskId: props.data.id
    }
  },
}

const dragSourceCollect: DragSourceCollector<{}> = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

interface DraggableItemProps extends ItemProps {
  data: Task
  connectDragSource?: ConnectDragSource
  isDragging?: boolean
}

@DragSource<DraggableItemProps>(DRAGGABLE, dragSourceSpec, dragSourceCollect)
class DraggableItem extends React.Component<DraggableItemProps> {
  render () {
    const {connectDragSource, isDragging, children, row, col} = this.props
    return (
      <Item 
        ref={(instance: any) => connectDragSource && connectDragSource(instance)}
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
}

const Overlay = styled.div.attrs<OverlayProps>({
  className: (p: OverlayProps) => p.dropMode && 'drop-mode'
})`
  z-index: 10;
  grid-column: ${p => p.col+1} / span 1;
  grid-row: 1 / span last-line;

  &.drop-mode {
    background: rgba(148, 225, 255, 0.16);
    z-index: 100;
  }
`

const dropTargetSpec: DropTargetSpec<DroppableOverlayProps> = {
  drop (props, monitor) {
    const sourceItem = monitor.getItem()
    props.onDropped(sourceItem.taskId, props.status)
    return {
      status: props.status,
    }
  }
}

const dropTargetCollect: DropTargetCollector<any> = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
})


interface DroppableOverlayProps {
  col: number
  status: STATUS
  onDropped(taskId: number, status: STATUS): void
  connectDropTarget?: ConnectDropTarget
  isOver?: boolean
}

@DropTarget<DroppableOverlayProps>(DRAGGABLE, dropTargetSpec, dropTargetCollect)
class DroppableOverlay extends React.Component<DroppableOverlayProps> {
  render () {
    const {connectDropTarget, isOver, children} = this.props
    return (
      <Overlay 
        ref={(instance: any) => connectDropTarget && connectDropTarget(instance)} 
        dropMode={isOver || false} 
        {...this.props}
      >
        {children}
      </Overlay>
    )
  }
}

function mapStateToProps (state: State, props: BoardProps) {
  return { 
    tasks: state.tasks,
    statusColumns: state.statusColumns,
    ...props
  }
}

function mapDispatchToProps (dispatch: Dispatch, props: BoardProps) {
  return {
    onTaskDropped: (taskId: number, status: STATUS) => dispatch(changeTaskStatus(taskId, status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)