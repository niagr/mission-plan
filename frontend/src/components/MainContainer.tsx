import React from  'react'
import styled from 'styled-components'
import {Provider} from 'react-redux'

import Board from './Board'

import {store} from 'store'
import {loadTasks} from 'store/actions'

class MainContainer extends React.Component {

  componentDidMount() {
    store.dispatch(loadTasks())
  }

  render () {
    return (
      <Provider store={store}>
        <Container>
          <Board/>
        </Container>
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
