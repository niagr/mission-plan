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

import bgTextureImg from 'assets/img/dust_scratches.png'

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
                render={({match: {path, params: {boardId}}}) => 
                  <Fragment>
                    <BoardContainer boardId={boardId} />
                    <Route 
                      path={path + '/task'} 
                      render={({match: {path}}) => 
                        <Switch>
                          <Route
                            path={path + '/new'}
                            render={p => <NewTaskContainer/>}
                          />
                          <Route 
                            path={path + '/:taskId'} 
                            render={({match: {params: {taskId}}}) => <TaskViewContainer taskId={taskId} boardId={boardId} />} 
                          />
                        </Switch>
                      }
                    />
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
  flex: 1;
  padding: 20px;
  background-image: url(${bgTextureImg})
`

export default MainContainer
