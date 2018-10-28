import * as React from 'react'
import { Modal } from 'semantic-ui-react';
import {History} from 'history'
import { withRouter, RouteComponentProps } from 'react-router';

import TaskView from './TaskView'


interface NewTaskContainerOwnProps {
  history: History
}

interface NewTaskContainerProps extends NewTaskContainerOwnProps, RouteComponentProps {

}


class NewTaskContainer extends React.Component<NewTaskContainerProps> {
  render () {
    const { history } = this.props
    return (
      <div>
        <Modal 
          open basic
          onClose={() => history.goBack()}
        >
          <Modal.Content>
            <TaskView/>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default withRouter(NewTaskContainer)