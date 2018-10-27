import * as React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { Dispatch } from 'redux';
import { Loader } from 'semantic-ui-react';

import { loadTasks, loadBoards } from 'store/actions';
import { State, Board } from 'types';

interface BoardListProps {
  boards?: Board[]
  onMount?: () => void 
}

class BoardList extends React.Component<BoardListProps> {

  componentDidMount () {
    console.log('AAAAAA', this.props)
    this.props.onMount && this.props.onMount()
  }

  render () {
    const {boards=[]} = this.props
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

function mapStateToProps (state: State, props: BoardListProps) {
  return {
    boards: state.boards
  }
}

function mapDispatchToProps (dispatch: Dispatch, props: BoardListProps) {
  return {
    onMount: () => dispatch(loadBoards() as any)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BoardList)