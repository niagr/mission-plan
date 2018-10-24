import React from 'react'
import styled from 'styled-components'
import {Card} from 'semantic-ui-react'

interface TaskCardProps {
    name: string
    desc: string
    onClick?: () => void
}

const TaskCard = ({name, desc, onClick}: TaskCardProps) =>
    <Card 
        style={{width: 'auto'}} 
        header={name} 
        description={desc} 
        onClick={() => onClick && onClick()} 
    />

export default TaskCard