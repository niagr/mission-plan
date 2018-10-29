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
}

function editable() {
  return class extends React.Component<EditableTextProps, EditableTextState> {

    constructor (props: any) {
      super(props)
      this.state = {
        editable: false,
        value: props.value
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

    getValue (): EditableTextProps['value'] {
      return this.props.onChange != undefined ? this.props.value : this.state.value
    }
  
    render () {
      const { editable } = this.state
      const { children } = this.props
      const value = this.getValue()
      return (
        <div 
          onClick={() => this.setState({editable: true})} 
          onBlur={this.handleBlur} 
        >
            {editable ?
              <Form>
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
