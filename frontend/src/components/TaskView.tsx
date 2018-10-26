import * as React from "react";
import styled from "styled-components";
import {Header, Container as Cont} from 'semantic-ui-react'

interface TaskViewProps {
  name?: string
  desc?: string
}

export default class TaskView extends React.Component<TaskViewProps> {
  render () {
    const {name='', desc=''} = this.props
    return (
      <Container>
        <Header as={'h1'}>{name}</Header>
        <Cont>{desc}</Cont>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 300px;
  min-height: 500px;
  padding: 20px;
  border-radius: 2px;
  background: white;
  color: black;
`
