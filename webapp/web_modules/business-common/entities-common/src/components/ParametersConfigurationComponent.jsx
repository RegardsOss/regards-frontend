/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isUndefined from 'lodash/isUndefined'
import { i18nContextType } from '@regardsoss/i18n'
import { Parameter } from '../definitions/parameters/Parameter'
import BooleanParameterField from '../common/BooleanParameterField'
import ChoiceParameterField from '../common/ChoiceParameterField'
import DateParameterField from '../common/DateParameterField'
import TextParameterField from '../common/TextParameterField'
import ParameterPresentation from '../common/ParameterPresentation'

/**
 * Shows all plugin service parameters and allows editing them
 * @author Raphaël Mechali
 */
class ParametersConfigurationComponent extends React.Component {
  static propTypes = {
    parameters: PropTypes.arrayOf(PropTypes.instanceOf(Parameter)).isRequired,
    // previously entered values if any (used for 'previous step')
    parametersValues: PropTypes.objectOf(PropTypes.any).isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  UNSAFE_componentWillMount() {
    const { parameters, parametersValues } = this.props
    // initialize parameters default values
    const values = parameters.reduce((acc, parameter) => ({
      ...acc,
      // get parameter value: first consider the previous entered value if any, otherwise consider using default parameter value
      [parameter.name]: isUndefined(parametersValues[parameter.name]) ? parameter.defaultValue : parametersValues[parameter.name],
    }), {})
    this.props.initialize(values)
  }

  render() {
    const { parameters } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <div>
        {
          parameters.map(({
            editorType, name, required, choices, valueValidator, label, description,
          }) => {
            // prepare field label
            const fieldLabel = required
              ? formatMessage({ id: 'entities.common.services.parameter.required' }, { label }) : label
            switch (editorType) {
              case Parameter.EditorTypes.CHECKBOX:
                return (
                  <ParameterPresentation key={name} label={label} description={description}>
                    <BooleanParameterField name={name} label={fieldLabel} />
                  </ParameterPresentation>)
              case Parameter.EditorTypes.CHOICE:
                return (
                  <ParameterPresentation key={name} label={label} description={description}>
                    <ChoiceParameterField name={name} label={fieldLabel} choices={choices} />
                  </ParameterPresentation>)
              case Parameter.EditorTypes.DATE_SELECTOR:
                return (
                  <ParameterPresentation key={name} label={label} description={description}>
                    <DateParameterField name={name} label={fieldLabel} required={required} />
                  </ParameterPresentation>)
              case Parameter.EditorTypes.TEXTFIELD:
                return (
                  <ParameterPresentation key={name} label={label} description={description}>
                    <TextParameterField
                      name={name}
                      label={fieldLabel}
                      description={description}
                      validator={valueValidator}
                      required={required}
                    />
                  </ParameterPresentation>)
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
