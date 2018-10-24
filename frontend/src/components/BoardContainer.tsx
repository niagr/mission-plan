import React, { ReactNode } from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'

import Board, {BoardProps} from './Board'

import {State, STATUS, Task, anyobject} from 'types'
import {loadTasks, changeTaskStatus} from 'store/actions'
import ContainerComponent from './ContainerComponent';
import { withRouter } from 'react-router';
import {History} from 'history'


interface BoardStateProps {
  tasks: Task[]
  statusColumns: STATUS[]
}

interface BoardDispatchProps {
  onTaskStatusChanged: (taskId: number, status: STATUS) => void
  onLoad: () => void
}

interface BoardOwnProps {
  boardId: number
}

interface RouterProps {
  history: History
}

type BoardContainerProps = BoardOwnProps & BoardStateProps & BoardDispatchProps & RouterProps

function mapStateToProps (state: State, props: BoardOwnProps): BoardStateProps {
  return { 
    tasks: state.tasks,
    statusColumns: state.statusColumns,
  }
}

function mapDispatchToProps (dispatch: Dispatch, props: BoardOwnProps): BoardDispatchProps {
  return {
    onTaskStatusChanged: (taskId: number, status: STATUS) => dispatch(changeTaskStatus(taskId, status)),
    onLoad: () => dispatch(loadTasks(props.boardId) as any),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class _BoardContainer extends React.Component<BoardOwnProps> {
  render () {
    const props = this.props as BoardContainerProps
    return (
      <ContainerComponent didMount={props.onLoad}>
        <Board 
          tasks={props.tasks} 
          statusColumns={props.statusColumns} 
          onTaskDropped={props.onTaskStatusChanged}
          onTaskClicked={taskId => props.history.push(`/board/${props.boardId}/task/${taskId}`)}
        /> 
      </ContainerComponent>
    ) as ReactNode
  }
}

const BoardContainer = withRouter<any>(_BoardContainer)

export default BoardContainer