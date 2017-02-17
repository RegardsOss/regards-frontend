
import { FormattedMessage, intlShape } from 'react-intl'
import { find } from 'lodash'
import JavaTypes from './../../../../JavaTypes'
/*
interface ModelAttributeRadioGroupProps {
  attribute: ModelAttribute
  id: string
  staticInput: JSX.Element
}*/
class DatasetModelAttributeRadioGroupComponent extends React.Component {
  static contextTypes = {
    intl: intlShape,
  }

  state = {
    radioValue: 'static',
  }

  handleRadioChange = (event, value) => {
    this.setState({
      radioValue: value,
    })
  }

  render() {
    const { attribute } = this.props
    const { radioValue } = this.state
    const staticField = radioValue === 'static' ? this.props.staticInput : null
    const javaType = find(JavaTypes, { value: attribute.type })
    const typeAsString = this.context.intl.formatMessage({ id: javaType.i18n })

    return (
      <div>
        <FormattedMessage
          id="datamanagement.dataset.add.1.attribute"
          values={{
            name: <i>{attribute.name}</i>,
            type: <i>{typeAsString}</i>,
          }}
        />
        {staticField}
      </div>
    )
  }
}

DatasetModelAttributeRadioGroupComponent.propTypes = {
  attribute: React.PropTypes.objectOf(React.PropTypes.string),
  staticInput: React.PropTypes.element,
}
export default DatasetModelAttributeRadioGroupComponent
