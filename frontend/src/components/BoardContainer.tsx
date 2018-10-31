import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router';
import { Loader, Button } from 'semantic-ui-react';

import Board from './Board'
import ContainerComponent from './ContainerComponent';
import { withMainContext, MainContext } from './context';


interface BoardContainerProps extends RouteComponentProps {
  boardId: number
  mainContext: MainContext
}

class BoardContainer extends React.Component<BoardContainerProps> {
  render () {
    const {boardId, history, mainContext} = this.props
    const {tasks, statusColumns, changeTaskStatus, loadTasks} = mainContext
    return (
      <ContainerComponent didMount={() => loadTasks(boardId)}>
        <NewTaskButton onClick={() => history.push(`/board/${boardId}/task/new`)}/>
        {!tasks.length ?
          <Loader active />
        : 
          <Board 
            tasks={tasks} 
            statusColumns={statusColumns} 
            onTaskDropped={changeTaskStatus}
            onTaskClicked={taskId => history.push(`/board/${boardId}/task/${taskId}`)}
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


export default withMainContext(withRouter(BoardContainer))
