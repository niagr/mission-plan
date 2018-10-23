import React from  'react'
import styled from 'styled-components'
import {Provider} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'

import Board from './Board'
import BoardList from './BoardList'

import {store} from 'store'

class MainContainer extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Container>
            <Route exact path="/" render={p => <BoardList/>} />
            <Route path="/board/:boardId" render={p => <Board boardId={p.match.params.boardId} />}/>
          </Container>
        </BrowserRouter>
      </Provider>
    )
  }
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`

export default MainContainer
