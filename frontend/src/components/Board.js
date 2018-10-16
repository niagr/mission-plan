import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import TaskCard from './TasksCard'

const Board = ({tasks}) =>
    <Container>
        {tasks.map((t, i) => 
            <Item key={t.name+i} col={i} row={i}>
                <TaskCard name={t.name} desc={t.desc} />
            </Item>
        )}
    </Container>


const Container = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
`

const Item = styled.div`
    grid-column: ${p => p.col+1} / span 1;
    grid-row: ${p => p.row+1} / span 1;
`

export default connect((state, p) => ({tasks: state.tasks, ...p}))(Board)