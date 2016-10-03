import * as React from "react"
import TextInputComponent from "../../input/TextInputComponent"
import { map } from "lodash"
import { ModelAttribute, DatasetModel, DatasetDefaultModelAttribute } from "@regardsoss/models"
import { FormattedMessage } from "react-intl"
import IntegerInputComponent from "../../input/IntegerInputComponent"
import DatasetModelAttributeRadioGroupComponent from "./DatasetModelAttributeRadioGroupComponent"
import { JavaTypes } from "./../../../../JavaTypes"

interface ModelAttributeProps {
  model: DatasetModel
}
/**
 */
class ModelAttributeComponent extends React.Component<ModelAttributeProps, any> {

  state: any = {}
  refs: any

  handleDatasetLabelChange = (event: React.FormEvent): any => {
    const newLabel = (event.target as any).value
    this.setState({
      label: newLabel
    })
  }

  handleModelTypeChange = (event: React.FormEvent, index: number, value: any) => {
    this.setState({
      modelType: value
    })
  }

  // When the user define a value in an modal attribute, it defines the default value
  getAttributesDefined = () => {
    let modelAttributes: Array<DatasetDefaultModelAttribute> = []
    for (const ref in this.refs) {
      const value = this.refs[ref].getValue()
      if (!this.refs[ref].isDefaultValue()) {
        modelAttributes.push({
          name: ref,
          value: value
        })
      }
    }
    return modelAttributes
  }

  render (): JSX.Element {
    const {model} = this.props
    const attributes = model.attributes
    return (
      <div>
        <p><FormattedMessage id="datamanagement.dataset.add.1.infoDefaultModelAttributes"/></p>
        {map(attributes, (attribute: ModelAttribute, id: string) => {
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
                  throw 'Undefined java type ' + attribute.type
              }
            }
          }
        )}

      </div>
    )
  }
}
export default ModelAttributeComponent
