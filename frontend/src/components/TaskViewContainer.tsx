import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';

import ContainerComponent from './ContainerComponent'
import TaskView, { FieldName } from './TaskView'

import { Task, State } from 'types'
import { changeTaskData } from 'store/actions';
import { Dispatch } from 'redux';


const FieldNameToTaskProperty = {
  [FieldName.NAME]: 'name',
  [FieldName.DESC]: 'desc',
}

interface TaskViewContainerOwnProps {
  taskId: number
  boardId: number
}

interface TaskContainerProps extends RouteComponentProps, 
                                     ReturnType<typeof mapStateToProps>, 
                                     ReturnType<typeof mapDispatchToProps>,
                                     TaskViewContainerOwnProps
{}

const TaskViewContainer = ({task, history, changeTaskData}: TaskContainerProps) =>
  task ?
    <ContainerComponent>
      <Modal 
        open basic
        onClose={() => history.goBack()}
      >
        <Modal.Content>
          <TaskView 
            name={task.name} 
            desc={task.desc} 
            onFieldChanged={(fieldName, value) => {
              if (value) {
                changeTaskData({[FieldNameToTaskProperty[fieldName]]: value})
              }
            }
            } 
          />
        </Modal.Content>
      </Modal>
    </ContainerComponent>
  : null

function mapStateToProps (state: State, props: TaskViewContainerOwnProps) {
  return {
    task: state.tasks.find(t => t.id == props.taskId)
  }
}

function mapDispatchToProps (dispatch: Dispatch, props: TaskViewContainerOwnProps) {
  return {
    changeTaskData: (taskData: Partial<Task>) => dispatch(changeTaskData(props.boardId, props.taskId, taskData) as any)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskViewContainer))