import * as React from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router';
import { Loader, Button } from 'semantic-ui-react';

import Board from './Board'

import {State, STATUS} from 'types'
import {loadTasks, changeTaskStatus} from 'store/actions'
import ContainerComponent from './ContainerComponent';


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
        <NewTaskButton onClick={() => props.history.push(`/board/${props.boardId}/task/new`)}/>
        {!props.tasks.length ?
          <Loader active />
        : 
          <Board 
            tasks={props.tasks} 
            statusColumns={props.statusColumns} 
            onTaskDropped={props.onTaskStatusChanged}
            onTaskClicked={taskId => props.history.push(`/board/${props.boardId}/task/${taskId}`)}
          /> 
        }
      </ContainerComponent>
    )
  }
}

const NewTaskButton = ({children, onClick}: {children?: React.ReactChild, onClick: () => void}) =>
  <Button 
    primary 
    onClick={onClick}
  >
    {children || 'New Task'}
  </Button>



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BoardContainer))
