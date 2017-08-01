/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { i18nContextType } from '@regardsoss/i18n'
import { Parameter } from '../../../definitions/parameters/Parameter'
import BooleanParameterField from './BooleanParameterField'
import ChoiceParameterField from './ChoiceParameterField'
import TextParameterField from './TextParameterField'


/**
 * Shows all plugin service parameters and allows editing them
 * @author Raphaël Mechali
 */
class ParametersConfigurationComponent extends React.Component {

  static propTypes = {
    parameters: PropTypes.arrayOf(PropTypes.instanceOf(Parameter)).isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillMount() {
    // initialize parameters default values
    const values = this.props.parameters.reduce((acc, parameter) => ({
      ...acc,
      [parameter.name]: parameter.defaultValue,
    }), {})
    this.props.initialize(values)
  }

  render() {
    const { parameters } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <div>
        {
          parameters.map(({ editorType, name: parameterName, required, choices, valueValidator }) => {
            // prepare field label
            const fieldLabel = required ?
              formatMessage({ id: 'entities.common.services.parameter.required' }, { parameterName }) : parameterName
            switch (editorType) {
              case Parameter.EditorTypes.CHECKBOX:
                return <BooleanParameterField key={parameterName} name={parameterName} label={fieldLabel} />
              case Parameter.EditorTypes.CHOICE:
                return <ChoiceParameterField key={parameterName} name={parameterName} label={fieldLabel} choices={choices} />
              case Parameter.EditorTypes.TEXTFIELD:
                return (
                  <TextParameterField
                    key={parameterName}
                    name={parameterName}
                    label={fieldLabel}
                    validator={valueValidator}
                    required={required}
                  />)
              default: // should never happen at runtime, only for dev.
                throw new Error(`Unknown parameter editor type  ${editorType}`)
            }
          })
        }
      </div>
    )
  }
}
export default ParametersConfigurationComponent
