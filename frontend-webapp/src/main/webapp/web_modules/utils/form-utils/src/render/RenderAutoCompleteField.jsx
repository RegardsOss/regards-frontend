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
import find from 'lodash/find'
import AutoComplete from 'material-ui/AutoComplete'
import RenderHelper from './RenderHelper'

export default class renderAutoCompleteField extends React.Component {
  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
      ]),
      name: PropTypes.string,
    }),
    hintText: PropTypes.string.isRequired,
    floatingLabelText: PropTypes.string,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
    fullWidth: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    dataSource: PropTypes.array,
    // eslint-disable-next-line react/forbid-prop-types
    dataSourceConfig: PropTypes.object,
    onUpdateInput: PropTypes.func.isRequired,
    onNewRequest: PropTypes.func.isRequired,
    openOnFocus: PropTypes.bool.isRequired,
    searchText: PropTypes.string.isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
    enableOnlyDatasourceValues: PropTypes.bool, // Does the search text is a valid value if it does not match one from the datasource ?
  }

  static defaultProps = {
    enableOnlyDatasourceValues: false,
  }

  static valueIsInDataSource(value, datasource, datasourceConfig) {
    if (datasourceConfig) {
      return !!find(datasource, ds => ds[datasourceConfig.value] === value)
    }
    return !!find(datasource, ds => ds === value)
  }

  render() {
    const {
      enableOnlyDatasourceValues, floatingLabelText, input, hintText, meta: { touched, error }, fullWidth, dataSource,
      dataSourceConfig, onUpdateInput, onNewRequest, openOnFocus, searchText, intl,
    } = this.props
    const errorMessage = RenderHelper.getErrorMessage(touched, error, intl)
    return (
      <div>
        <AutoComplete
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
          filter={AutoComplete.noFilter}
          searchText={searchText}
          onUpdateInput={(pSearchText, pDatasource, params) => {
            if (enableOnlyDatasourceValues && !renderAutoCompleteField.valueIsInDataSource(pSearchText, pDatasource, dataSourceConfig)) {
              input.onChange(null)
            } else if (!enableOnlyDatasourceValues) {
              input.onChange(pSearchText)
            }
            onUpdateInput(pSearchText, pDatasource, params)
          }}
          onClick={() => input.onBlur()}
          dataSource={dataSource}
          dataSourceConfig={dataSourceConfig}
          openOnFocus={openOnFocus}
        />
      </div>
    )
  }
}
