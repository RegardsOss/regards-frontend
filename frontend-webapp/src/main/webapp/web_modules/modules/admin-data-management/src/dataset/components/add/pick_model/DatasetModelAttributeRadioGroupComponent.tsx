import * as React from "react"
import { FormattedMessage, intlShape } from "react-intl"
import { ModelAttribute } from "@regardsoss/models"
import { find } from "lodash"
import { JavaTypes } from "./../../../../JavaTypes"

interface ModelAttributeRadioGroupProps {
  attribute: ModelAttribute
  id: string
  staticInput: JSX.Element
}
class DatasetModelAttributeRadioGroupComponent extends React.Component<ModelAttributeRadioGroupProps, any> {
  static contextTypes: Object = {
    intl: intlShape,
    muiTheme: React.PropTypes.object.isRequired
  }
  context: {
    intl: any,
    muiTheme: any
  }

  state: any = {
    radioValue: "static"
  }

  handleRadioChange = (event: React.FormEvent, value: string): void => {
    this.setState({
      radioValue: value
    })
  }

  render (): JSX.Element {
    const {attribute} = this.props
    const {radioValue} = this.state
    const staticField = radioValue === "static" ? this.props.staticInput : null
    const javaType: any = find(JavaTypes, {"value": attribute.type})
    const typeAsString = this.context.intl.formatMessage({id: javaType.i18n})

    return (
      <div>
        <FormattedMessage
          id="datamanagement.dataset.add.1.attribute"
          values={{
                name: <i>{attribute.name}</i>,
                type: <i>{typeAsString}</i>
              }}
        />
        {staticField}
      </div>
    )
  }
}
export default DatasetModelAttributeRadioGroupComponent
