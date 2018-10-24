import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render () {
    return (
      <Container>
        <BoringLink to="/">
          <h1>Mission Plan <Sup>alpha</Sup></h1>
        </BoringLink>
      </Container>
    )
  }
}

const BoringLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const Container = styled.div`
  width: 100%;
  min-height: 60px;
  max-height: 60px;
  padding: 20px;
  box-shadow: 0px 0px 6px 0px #dadada;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Sup = styled.sup`
  font-size: 10px;
  color: #ce0000;
  vertical-align: super;
`