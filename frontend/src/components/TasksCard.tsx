import React from 'react'
import styled from 'styled-components'
import {Card} from 'semantic-ui-react'

interface TaskCardProps {
    name: string
    desc: string
}

const TaskCard = ({name, desc}: TaskCardProps) =>
    <Card style={{width: 'auto'}} header={name} description={desc} />

export default TaskCard