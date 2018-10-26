import * as React from 'react'
import {ReactNode} from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'

import Board from './Board'

import {State, STATUS} from 'types'
import {loadTasks, changeTaskStatus} from 'store/actions'
import ContainerComponent from './ContainerComponent';
import { withRouter, RouteComponentProps } from 'react-router';


interface BoardOwnProps {
  boardId: number
}

type BoardContainerProps =  BoardOwnProps 
                          & ReturnType<typeof mapStateToProps> 
                          & ReturnType<typeof mapDispatchToProps> 
                          & RouteComponentProps

function mapStateToProps (state: State, props: BoardOwnProps) {
  return { 
    tasks: state.tasks,
    statusColumns: state.statusColumns,
  }
}

function mapDispatchToProps (dispatch: Dispatch, props: BoardOwnProps) {
  return {
    onTaskStatusChanged: (taskId: number, status: STATUS) => dispatch(changeTaskStatus(taskId, status)),
    onLoad: () => dispatch(loadTasks(props.boardId) as any),
  }
}


class BoardContainer extends React.Component<BoardContainerProps> {
  render () {
    const props = this.props
    return (
      <ContainerComponent didMount={props.onLoad}>
        <Board 
          tasks={props.tasks} 
          statusColumns={props.statusColumns} 
          onTaskDropped={props.onTaskStatusChanged}
          onTaskClicked={taskId => props.history.push(`/board/${props.boardId}/task/${taskId}`)}
        /> 
      </ContainerComponent>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BoardContainer))
