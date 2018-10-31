import * as React from 'react'
import {Link} from 'react-router-dom'
import { Dispatch } from 'redux';
import { Loader } from 'semantic-ui-react';

import { withMainContext, MainContext } from 'components/context'

import { State, Board } from 'types';

interface BoardListProps {
  boards?: Board[]
  mainContext: MainContext
}

class BoardList extends React.Component<BoardListProps> {

  componentDidMount () {
    this.props.mainContext.loadBoards()
  }

  render () {
    const {boards=[]} = this.props.mainContext
    return (
      <div>
        {boards.length ?
          <ul>
            {boards.map(b => <li><Link to={`/board/${b.id}`}>{b.name}</Link></li>)}
          </ul>
        :
          <Loader active/>
        }
      </div>
    )
  }
}

export default withMainContext(BoardList)
