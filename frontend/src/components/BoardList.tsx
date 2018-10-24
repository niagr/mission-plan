import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { loadTasks, loadBoards } from 'store/actions';
import { State, Board } from 'types';
import { Dispatch } from 'redux';

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
    {console.log('RENDERED BoardList') as any && null}
    return (
      <div>
        <ul>
          {boards.map(b => <li><Link to={`/board/${b.id}`}>{b.name}</Link></li>)}
        </ul>
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