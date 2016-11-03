
import TextInputComponent from '../../input/TextInputComponent'
import { map } from 'lodash'
import { FormattedMessage } from 'react-intl'
import IntegerInputComponent from '../../input/IntegerInputComponent'
import DatasetModelAttributeRadioGroupComponent from './DatasetModelAttributeRadioGroupComponent'
import { JavaTypes } from './../../../../JavaTypes'
/*
interface ModelAttributeProps {
  model: DatasetModel
}*/
/**
 */
class ModelAttributeComponent extends React.Component {


  handleDatasetLabelChange = (event) => {
    const newLabel = event.target.value
    this.setState({
      label: newLabel,
    })
  }

  handleModelTypeChange = (event, index, value) => {
    this.setState({
      modelType: value,
    })
  }

  // When the user define a value in an modal attribute, it defines the default value
  getAttributesDefined = () => {
    const modelAttributes = []
    for (const ref in this.refs) {
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
                throw `Undefined java type ${attribute.type}`
            }
          }
        }
        )}

      </div>
    )
  }
}
export default ModelAttributeComponent
