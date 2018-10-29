import * as React from 'react'
import {connect} from 'react-redux'

import ContainerComponent from './ContainerComponent'
import TaskView from './TaskView'

import {Task, State, STATUS} from 'types'
import { Modal } from 'semantic-ui-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';


interface TaskContainerProps extends RouteComponentProps {
  task?: Task
}

const TaskContainer = ({task, history}: TaskContainerProps) =>
  task ?
    <ContainerComponent>
      <Modal 
        open basic
        onClose={() => history.goBack()}
      >
        <Modal.Content>
          <TaskView name={task.name} desc={task.desc} />
        </Modal.Content>
      </Modal>
    </ContainerComponent>
  : null

function mapStateToProps (state: State, props: {taskId: number}) {
  return {
    task: state.tasks.find(t => t.id == props.taskId)
  }
}

export default connect(mapStateToProps)(withRouter(TaskContainer))