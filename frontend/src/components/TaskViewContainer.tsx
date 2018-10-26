import React from 'react'
import {connect} from 'react-redux'

import ContainerComponent from './ContainerComponent'
import TaskView from './TaskView'

import {Task, State, STATUS} from 'types'
import { Modal } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import {History} from 'history'


const TaskContainer = ({task, history}: {task?: Task, history: History}) =>
  <ContainerComponent>
    <Modal 
      open basic
      onClose={() => history.goBack()}
    >
      <Modal.Content>
        <TaskView name={task && task.name} desc={task && task.desc} />
      </Modal.Content>
    </Modal>
  </ContainerComponent>

function mapStateToProps (state: State, props: {taskId: number}) {
  return {
    task: state.tasks.find(t => t.id == props.taskId)
  }
}

export default connect(mapStateToProps)(withRouter<any>(TaskContainer))