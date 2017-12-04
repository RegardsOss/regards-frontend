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
import { Field, RenderAutoCompleteField } from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
/**
* Comment Here
* @author Sébastien Binda
*/
class DatasetSelectorComponent extends React.Component {
  static propTypes = {
    fieldName: PropTypes.string.isRequired,
    fullWidth: PropTypes.bool,
    hintText: PropTypes.string.isRequired,
    searchText: PropTypes.string.isRequired,
    floatingLabelText: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    handleUpdateInput: PropTypes.func.isRequired,
    onNewRequest: PropTypes.func.isRequired,
    datasource: PropTypes.arrayOf(PropTypes.object).isRequired,
    validate: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.func), PropTypes.func]),
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  isValideDataset = (dataset) => { }

  render() {
    const { intl: { formatMessage } } = this.context
    const {
      fullWidth, floatingLabelText, hintText, isLoading, fieldName, searchText, datasource, handleUpdateInput, onNewRequest, validate,
    } = this.props
    const dataSourceConfig = {
      text: 'label',
      value: 'ipId',
    }
    const ds = isLoading ? [{ label: formatMessage({ id: 'entities.common.dataset-selector.loading' }), ipId: '' }] : datasource
    return (
      <Field
        name={fieldName}
        fullWidth={fullWidth}
        component={RenderAutoCompleteField}
        hintText={hintText}
        floatingLabelText={floatingLabelText}
        onNewRequest={onNewRequest}
        searchText={searchText}
        onUpdateInput={handleUpdateInput}
        dataSource={ds}
        dataSourceConfig={dataSourceConfig}
        openOnFocus
        enableOnlyDatasourceValues
        validate={validate}
      />
    )
  }
}
export default DatasetSelectorComponent
