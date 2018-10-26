import * as React from  'react'
import {Fragment} from  'react'
import styled from 'styled-components'
import {Provider} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'

import BoardContainer from './BoardContainer'
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
            {console.log('RENDERED MainContainer') as any && null}
            <Header/>
            <Content>
              <Route exact path="/" render={p => <BoardList/>} />
              <Route 
                path="/board/:boardId" 
                render={p => 
                  <Fragment>
                    <BoardContainer boardId={p.match.params.boardId} />
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
