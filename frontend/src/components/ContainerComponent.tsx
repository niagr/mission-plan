import React from 'react'

export interface ContainerComponentProps {
  didMount?: () => void
  willUnmount?: () => void
}

export default class ContainerComponent extends React.Component<ContainerComponentProps> {
  
  componentDidMount () {
    this.props.didMount && this.props.didMount()
  }

  componentWillUnmount () {
    this.props.willUnmount && this.props.willUnmount()
  }

  render () {
    return this.props.children
  }

}