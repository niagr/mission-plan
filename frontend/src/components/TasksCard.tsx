import React from 'react'
import styled from 'styled-components'

interface TaskCardProps {
    name: string
    desc: string
}

const TaskCard = ({name, desc}: TaskCardProps) =>
    <Container>
        <div>Name: {name}</div>
        <div>Description: {desc}</div>
    </Container>

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-shadow: #bfbfbf 0px 0px 1px 1px;
`

export default TaskCard