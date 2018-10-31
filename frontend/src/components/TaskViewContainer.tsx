import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Modal } from 'semantic-ui-react';

import ContainerComponent from './ContainerComponent'
import TaskView, { FieldName } from './TaskView'

import { withMainContext, MainContext } from './context';


const FieldNameToTaskProperty = {
  [FieldName.NAME]: 'name',
  [FieldName.DESC]: 'desc',
}

interface TaskViewContainerProps extends RouteComponentProps {
  taskId: number
  boardId: number,
  mainContext: MainContext
}

const TaskViewContainer = (props: TaskViewContainerProps) => {
  const {mainContext, history, taskId, boardId} = props
  const { tasks, changeTaskData } = mainContext
  const task = tasks.find(t => t.id == taskId)
  return (
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
                  changeTaskData(boardId, taskId, {[FieldNameToTaskProperty[fieldName]]: value})
                }
              }} 
            />
          </Modal.Content>
        </Modal>
      </ContainerComponent>
    : null
  )
}

export default withMainContext(withRouter(TaskViewContainer))
