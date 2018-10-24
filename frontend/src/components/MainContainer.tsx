import React, {Fragment} from  'react'
import styled from 'styled-components'
import {Provider} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'

import Board from './Board'
import BoardList from './BoardList'
import Header from './Header'

import {store} from 'store'
import TaskViewContainer from './TaskViewContainer';

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
                    <Board boardId={p.match.params.boardId} />
                    <Route 
                      path={p.match.path + '/task/:taskId'} 
                      render={p => <TaskViewContainer taskId={p.match.params.taskId} />} 
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
  padding: 20px;
`

export default MainContainer
