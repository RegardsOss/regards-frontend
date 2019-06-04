/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { RenderTextField, Field, ValidationHelpers } from '@regardsoss/form-utils'

/**
 * Input field value for an OpenSearch query parameter (handles specific validation based on parameter constraints)
 * @author Raphaël Mechali
 */
class OSQueryParameterInputField extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    filterParameter: DataManagementShapes.OpenSearchURLParameterDescription.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  getValidation = (filter) => {
    // TODO nope: implement validate here!
    const {
      number, required, lessThan, moreThan,
    } = ValidationHelpers

    const validation = [required]

    // TODO REWORK
    if (filter.maxInclusive || filter.minInclusive) if (filter.maxInclusive) validation.push(number)
    if (filter.maxInclusive) validation.push(lessThan(parseInt(filter.maxInclusive, 10)))
    if (filter.minInclusive) validation.push(moreThan(parseInt(filter.minInclusive, 10)))

    return validation
  }

  render() {
    const { name } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <Field
        name={name}
        component={RenderTextField}
        label={formatMessage({ id: 'opensearch.crawler.form.query.value' })}
        // TODO validation
      />
    )
  }
}
export default OSQueryParameterInputField
