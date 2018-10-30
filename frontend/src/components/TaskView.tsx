import * as React from "react";
import styled from "styled-components";
import EditableText, {EditableTextProps} from "./EditableText";

interface TaskViewProps {
  name?: string
  desc?: string
  onFieldChanged?: <F extends FieldName>(fieldName: F, value?: FieldValueTypes[F]) => void
}

export enum FieldName {
  NAME,
  DESC,
}

interface FieldValueTypes {
  [FieldName.NAME]: string
  [FieldName.DESC]: string
}

interface TaskViewState {
  fieldEdits: {[F in FieldName]?: FieldValueTypes[F]}
}

export default class TaskView extends React.Component<TaskViewProps, TaskViewState> {

  constructor (props: TaskViewProps) {
    super(props)
    const {name, desc} = this.props
    this.state = {
      fieldEdits: {}
    }
  }

  handleFieldValueSubmit = <T extends FieldName>(fieldName: T, value?: FieldValueTypes[T]) => {
    this.props.onFieldChanged && this.props.onFieldChanged(fieldName, value)
    this.setState({
      ...this.state,
      fieldEdits: {
        ...this.state.fieldEdits,
        [fieldName]: value,
      }
    })
  }

  render () {
    const {name='', desc=''} = this.props
    const {
      fieldEdits: {
        [FieldName.NAME]: newName, 
        [FieldName.DESC]: newDesc
      }
    } = this.state
    return (
      <Container>
        <NameField
          value={newName || name} 
          onSubmit={value => this.handleFieldValueSubmit(FieldName.NAME, value)} 
        />
        <DescriptionField 
          value={newDesc || desc} 
          onSubmit={value => this.handleFieldValueSubmit(FieldName.DESC, value)} 
        />
      </Container>
    )
  }
}

const Field = (props: EditableTextProps) =>
  <EditableText {...props}>
    <FieldWrapper>
      <pre style={{margin: 0}}>{props.value}</pre>
    </FieldWrapper>
  </EditableText>

const NameField = (props: EditableTextProps) =>
  <EditableText {...props}>
    <FieldWrapper>
      <h3>{props.value}</h3>
    </FieldWrapper>
  </EditableText>

const FieldWrapper = styled.div`
  /* padding: 5px; */
  border-radius: 2px;
  &:hover {
    background: #f5f2f2;
  }
`

const DescriptionField = Field

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
