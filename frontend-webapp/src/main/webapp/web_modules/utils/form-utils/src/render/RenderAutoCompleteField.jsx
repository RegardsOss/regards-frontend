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
import AutoComplete from 'material-ui/AutoComplete'
import RenderHelper from './RenderHelper'

const renderAutoCompleteField = ({
  input, hintText, meta: { touched, error }, fullWidth, children, dataSource,
  dataSourceConfig, onUpdateInput, onNewRequest, openOnFocus, searchText, intl, ...rest
}) => {
  const errorMessage = RenderHelper.getErrorMessage(touched, error, intl)
  return (
    <AutoComplete
      errorText={errorMessage}
      hintText={hintText}
      {...input}
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
      onUpdateInput={onUpdateInput}
      dataSource={dataSource}
      dataSourceConfig={dataSourceConfig}
      openOnFocus={openOnFocus}
    />
  )
}
renderAutoCompleteField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ]),
    name: PropTypes.string,
  }),
  hintText: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  children: PropTypes.arrayOf(PropTypes.element),
  fullWidth: PropTypes.bool,
  dataSource: PropTypes.array,
  dataSourceConfig: PropTypes.object,
  onUpdateInput: PropTypes.func.isRequired,
  onNewRequest: PropTypes.func.isRequired,
  openOnFocus: PropTypes.bool.isRequired,
  searchText: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
}
export default renderAutoCompleteField
