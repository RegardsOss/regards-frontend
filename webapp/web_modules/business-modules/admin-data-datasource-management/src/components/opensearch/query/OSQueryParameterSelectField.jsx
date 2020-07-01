/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import MenuItem from 'material-ui/MenuItem'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RenderSelectField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { DescriptorHelper } from '../../../domain/opensearch/DescriptorHelper'

/**
 *  Select field value for an OpenSearch query parameter
 * @author Raphaël Mechali
 */
class OSQueryParameterSelectField extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    filterParameter: DataManagementShapes.OpenSearchURLParameterDescription.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { name, filterParameter } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: { openSearchCrawler: { queryFilters: { filtersTable } } },
    } = this.context
    return (
      <Field
        name={name}
        component={RenderSelectField}
        label={formatMessage({ id: 'opensearch.crawler.form.query.value' })}
        validate={ValidationHelpers.required}
        style={filtersTable.fieldsStyle}
        fullWidth
      >
        {DescriptorHelper.getParameterOptions(filterParameter).map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            primaryText={option.label || option.value}
          />
        ))}
      </Field>
    )
  }
}
export default OSQueryParameterSelectField
