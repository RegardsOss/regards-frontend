import { map } from 'lodash'
import { FormattedMessage } from 'react-intl'
import TextInputComponent from '../../input/TextInputComponent'
import IntegerInputComponent from '../../input/IntegerInputComponent'
import DatasetModelAttributeRadioGroupComponent from './DatasetModelAttributeRadioGroupComponent'
import JavaTypes from './../../../../JavaTypes'
/**
 */
class ModelAttributeComponent extends React.Component {

  // When the user define a value in an modal attribute, it defines the default value
  getAttributesDefined = () => {
    const modelAttributes = []
    for (const ref of this.refs) {
      const value = this.refs[ref].getValue()
      if (!this.refs[ref].isDefaultValue()) {
        modelAttributes.push({
          name: ref,
          value,
        })
      }
    }
    return modelAttributes
  }

  handleModelTypeChange = (event, index, value) => {
    this.setState({
      modelType: value,
    })
  }

  handleDatasetLabelChange = (event) => {
    const newLabel = event.target.value
    this.setState({
      label: newLabel,
    })
  }


  render() {
    const { model } = this.props
    const attributes = model.attributes
    return (
      <div>
        <p><FormattedMessage id="datamanagement.dataset.add.1.infoDefaultModelAttributes" /></p>
        {map(attributes, (attribute, id) => {
          if (attribute.computed === false) {
            switch (attribute.type) {
              case JavaTypes.STRING.value:
                return (
                  <DatasetModelAttributeRadioGroupComponent
                    key={id}
                    id={id}
                    attribute={attribute}
                    staticInput={
                      <TextInputComponent
                        ref={attribute.name}
                        label={attribute.name}
                      />
                    }
                  />
                  )
              case JavaTypes.INTEGER.value:
                return (

                  <DatasetModelAttributeRadioGroupComponent
                    key={id}
                    id={id}
                    attribute={attribute}
                    staticInput={
                      <IntegerInputComponent
                        key={id}
                        ref={attribute.name}
                        label={attribute.name}
                      />
                    }
                  />
                  )
              default:
                throw new Error(`Undefined java type ${attribute.type}`)
            }
          }
          return null
        }
        )}

      </div>
    )
  }
}

ModelAttributeComponent.propTypes = {
  model: React.PropTypes.objectOf(React.PropTypes.string),
}
export default ModelAttributeComponent
