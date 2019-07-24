/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import AutoComplete from 'material-ui/AutoComplete'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import RenderHelper from './RenderHelper'
import styles from '../styles'
import messages from '../i18n/Locales'
/**
 * Redux form component to display a material-ui AutoComplete widget.
 * @author Sébastien Binda
 */
export class RenderAutoCompleteField extends React.Component {
  static propTypes = {
    hintText: PropTypes.string.isRequired,
    floatingLabelText: PropTypes.string,
    fullWidth: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    dataSource: PropTypes.array, // Elements availables for selection
    // eslint-disable-next-line react/forbid-prop-types
    dataSourceConfig: PropTypes.shape({
      text: PropTypes.string.isRequired, // Field use for display from the items of the datasource
      value: PropTypes.string.isRequired, // Field use for selection from the items of the datasource
    }), // Elements configuration
    onUpdateInput: PropTypes.func, // Callback when a filter text is given
    onNewRequest: PropTypes.func, // Callback when an item from the datasource is selected
    openOnFocus: PropTypes.bool, // Open the datasource items list when focus
    searchText: PropTypes.string, // search or filter text
    filter: PropTypes.func, // see material-ui AutoComplete
    enableOnlyDatasourceValues: PropTypes.bool, // Does the search text is a valid value if it does not match one from the datasource ?
    // From redux form field
    input: PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
      ]),
      name: PropTypes.string,
    }),

    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
  }

  static defaultProps = {
    enableOnlyDatasourceValues: false,
    openOnFocus: true,
    filter: AutoComplete.noFilter,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static valueIsInDataSource(value, datasource, datasourceConfig) {
    if (datasourceConfig) {
      return !!find(datasource, ds => ds[datasourceConfig.value] === value)
    }
    return !!find(datasource, ds => ds === value)
  }

  render() {
    const {
      enableOnlyDatasourceValues, filter, floatingLabelText, input, hintText, meta: { touched, error }, fullWidth, dataSource,
      dataSourceConfig, onUpdateInput, onNewRequest, openOnFocus, searchText,
    } = this.props
    const { moduleTheme: { autoCompleteFields: { listStyle } }, intl } = this.context
    const errorMessage = RenderHelper.getErrorMessage(touched, error, intl)
    return (
      <div>
        <AutoComplete
          listStyle={listStyle}
          errorText={errorMessage}
          floatingLabelText={floatingLabelText}
          hintText={hintText}
          fullWidth={fullWidth}
          onNewRequest={(selected, key) => {
            if (onNewRequest) {
              onNewRequest(selected)
            }
            if (dataSourceConfig && dataSourceConfig.value) {
              return input.onChange(selected[dataSourceConfig.value])
            }
            return input.onChange(selected)
          }}
          searchText={input.value ? input.value : searchText || ''}
          onUpdateInput={(pSearchText, pDatasource, params) => {
            const isValueMatching = RenderAutoCompleteField.valueIsInDataSource(pSearchText, pDatasource, dataSourceConfig)
            if (enableOnlyDatasourceValues && !isValueMatching) {
              input.onChange(null)
            } else if (!enableOnlyDatasourceValues || isValueMatching) {
              input.onChange(pSearchText)
            }
            if (onUpdateInput) {
              onUpdateInput(pSearchText, pDatasource, params)
            }
          }}
          onClick={() => input.onBlur()}
          dataSource={dataSource}
          dataSourceConfig={dataSourceConfig}
          openOnFocus={openOnFocus}
          filter={filter}
          name={input.name}
        />
      </div>
    )
  }
}

export default withI18n(messages)(withModuleStyle(styles)(RenderAutoCompleteField))
