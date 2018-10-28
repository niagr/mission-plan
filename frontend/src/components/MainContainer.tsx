import * as React from  'react'
import {Fragment} from  'react'
import styled from 'styled-components'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import BoardContainer from './BoardContainer'
import BoardList from './BoardList'
import Header from './Header'

import {store} from 'store'
import TaskViewContainer from './TaskViewContainer';
import NewTaskContainer from './NewTaskContainer';

class MainContainer extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Container>
            <Header/>
            <Content>
              <Route exact path="/" render={p => <BoardList/>} />
              <Route 
                path="/board/:boardId"
                render={p => 
                  <Fragment>
                    <BoardContainer boardId={p.match.params.boardId} />
                    <Route path={p.match.path + '/task'}>
                      <Switch>
                        <Route
                          path={p.match.path + '/new'}
                          render={p => <NewTaskContainer/>}
                        />
                        <Route 
                          path={p.match.path + '/:taskId'} 
                          render={p => <TaskViewContainer taskId={p.match.params.taskId} />} 
                        />
                      </Switch>
                    </Route>
                  </Fragment>
                }
              />
            </Content>
          </Container>
        </BrowserRouter>
      </Provider>
    )
  }
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`

const Content = styled.div`
  padding: 20px;
`

export default MainContainer
