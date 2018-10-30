import * as React from 'react'
import { TextArea, Form } from 'semantic-ui-react';

export interface EditableTextProps {
  value?: string
  onChange?: (newText?: EditableTextProps['value']) => void
  onSubmit?: (value: EditableTextProps['value']) => void
}

interface EditableTextState {
  editable: boolean
  value?: EditableTextProps['value']
  ctrlPressed: boolean
  enterPressed: boolean
}

function editable() {
  return class extends React.Component<EditableTextProps, EditableTextState> {

    constructor (props: any) {
      super(props)
      this.state = {
        editable: false,
        value: props.value,
        ctrlPressed: false,
        enterPressed: false,
      }
    }

    defaultOnChange(value: EditableTextProps['value']) {
      this.setState({value})
    }

    handleChange = (event: any, {value}: {value?: string|number}) => 
      this.props.onChange ? 
        this.props.onChange(value ? value.toString() : '')
      : 
        this.defaultOnChange(value ? value.toString() : '')

    handleBlur = () => {
      this.setState({editable: false})
      this.props.onSubmit && this.props.onSubmit(this.getValue())
    }

    handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Control': this.setState({ctrlPressed: true}); break;
        case 'Enter': this.setState({enterPressed: true}); break;        
      }
    }

    handleKeyUp = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Control': this.setState({ctrlPressed: false}); break;
        case 'Enter': this.setState({enterPressed: false}); break;        
      }
    }

    getValue (): EditableTextProps['value'] {
      return this.props.onChange != undefined ? this.props.value : this.state.value
    }

    componentDidUpdate () {
      const {ctrlPressed, enterPressed} = this.state
      if (ctrlPressed && enterPressed) {
        this.setState({ctrlPressed: false, enterPressed: false})
        this.handleBlur()
      }
    }
  
    render () {
      const { editable } = this.state
      const { children } = this.props
      const value = this.getValue()
      return (
        <div 
          onClick={() => this.setState({editable: true})} 
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
        >
            {editable ?
              <Form style={{margin: 0}}>
                <TextArea
                  value={value} 
                  onChange={this.handleChange} 
                  rows={1}
                  autoFocus
                  autoHeight
                />
              </Form>
            :
              children}
        </div>
      )
    }

  }
}

const EditableText = editable()

export default EditableText
