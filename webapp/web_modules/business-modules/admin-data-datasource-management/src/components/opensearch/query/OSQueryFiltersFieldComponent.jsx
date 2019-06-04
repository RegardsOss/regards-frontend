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
import ActionDelete from 'material-ui/svg-icons/action/delete'
import Table from 'material-ui/Table/Table'
import TableHeader from 'material-ui/Table/TableHeader'
import TableRow from 'material-ui/Table/TableRow'
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn'
import TableBody from 'material-ui/Table/TableBody'
import TableRowColumn from 'material-ui/Table/TableRowColumn'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import AddFilterIcon from 'mdi-material-ui/Filter'
import TestRequestIcon from 'material-ui/svg-icons/action/open-in-new'
import OSQueryAddFilterDialogComponent from './OSQueryAddFilterDialogComponent'
import { DescriptorHelper } from '../../../domain/opensearch/DescriptorHelper'
import OSQueryParameterSelectField from './OSQueryParameterSelectField'
import OSQueryParameterInputField from './OSQueryParameterInputField'

/**
 * Dialog to add a filter to an opensearch crawler
 * @author Maxime Bouveron
 */

class OSQueryFiltersFieldComponent extends React.Component {
  static propTypes = {
    // Available parameters on OpenSearch API
    availableParameters: PropTypes.arrayOf(DataManagementShapes.OpenSearchURLParameterDescription).isRequired,
    openSearchTemplateURL: PropTypes.string.isRequired,
    // From redux form
    fields: PropTypes.shape({
      getAll: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
    }),
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }


  state = {
    dialogOpen: false,
  }

  /**
   * User requested or closed dialog
   */
  onShowDialog = () => this.setState({ dialogOpen: true })

  /**
   * User requested dialog to hide (might be confirm)
   */
  onCloseDialog = () => this.setState({ dialogOpen: false })

  /**
   * User added a filter: store it and close dialog
   * @param {*} filter added filter (from descriptor filters)
   */
  onConfirmAddFilter = (filter) => {
    this.onCloseDialog()
    this.props.fields.push({
      ...filter,
      queryValue: '',
    })
  }

  /**
   * Builds OpenSearch test link for current query filters fields.
   * @param {string} template URL from OpenSearch descriptor (something like domain:port/path?a=b&c=d)
   * @param [{*}] fields as currently defined
   * @return {string} built URL
   */
  getOpenSearchLink = (templateURL, fields) => {
    const baseURL = templateURL.split('?')[0]
    const query = (fields.getAll() || []).filter(e => !!e.queryValue).map(e => `${e.name}=${e.queryValue}`).join('&')
    return `${baseURL}?${query}`
  }

  render() {
    const { availableParameters, fields, openSearchTemplateURL } = this.props
    const { dialogOpen } = this.state
    const { intl: { formatMessage }, moduleTheme: { openSearchCrawler: { queryFilters } } } = this.context
    return (
      <div style={queryFilters.mainContainer}>
        {/* 1. Table Options */}
        <div style={queryFilters.buttonsContainer}>
          {/* 1.a - add filter */}
          <FlatButton
            label={formatMessage({ id: 'opensearch.crawler.form.query.add.label' })}
            title={formatMessage({ id: 'opensearch.crawler.form.query.add.tooltip' })}
            onClick={this.onShowDialog}
            icon={<AddFilterIcon />}
          />
          {/* 1.b - test request */}
          <FlatButton
            label={formatMessage({ id: 'opensearch.crawler.form.query.testQuery.label' })}
            title={formatMessage({ id: 'opensearch.crawler.form.query.testQuery.tooltip' })}
            href={this.getOpenSearchLink(openSearchTemplateURL, fields)}
            target="_blank"
            icon={<TestRequestIcon />}
          />

        </div>
        {/* 2. Filters list table or none */}
        { // Show selected filters if any, message otherwise
          fields.length > 0 ? (
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn width={queryFilters.filtersTable.nameColumnWidth}>
                    {formatMessage({ id: 'opensearch.crawler.form.query.name' })}
                  </TableHeaderColumn>
                  <TableHeaderColumn width={queryFilters.filtersTable.descriptionColumnWidth}>
                    {formatMessage({ id: 'opensearch.crawler.form.query.description' })}
                  </TableHeaderColumn>
                  <TableHeaderColumn width={queryFilters.filtersTable.valueColumnWidth}>
                    {formatMessage({ id: 'opensearch.crawler.form.query.value' })}
                  </TableHeaderColumn>
                  <TableHeaderColumn width={queryFilters.filtersTable.actionsColumnWidth}>
                    {formatMessage({ id: 'opensearch.crawler.form.query.actions' })}
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {fields.map((filter, index) => {
                  const filterParameter = fields.get(index)
                  return (
                    <TableRow height="120px" key={filter.value}>
                      <TableRowColumn title={filterParameter.name} width={queryFilters.filtersTable.nameColumnWidth}>
                        {filterParameter.name}
                      </TableRowColumn>
                      <TableRowColumn title={filterParameter.title} width={queryFilters.filtersTable.descriptionColumnWidth}>
                        {filterParameter.title}
                      </TableRowColumn>
                      <TableRowColumn width={queryFilters.filtersTable.valueColumnWidth}>
                        {DescriptorHelper.hasParameterOptions(filterParameter) ? (
                          <OSQueryParameterSelectField name={`${filter}.queryValue`} filterParameter={filterParameter} />
                        ) : (
                          <OSQueryParameterInputField name={`${filter}.queryValue`} filterParameter={filterParameter} />
                        )}
                      </TableRowColumn>
                      <TableRowColumn width={queryFilters.filtersTable.actionsColumnWidth}>
                        <IconButton tooltip={formatMessage({ id: 'opensearch.crawler.form.query.removeFilter' })} onClick={() => fields.remove(index)}>
                          <ActionDelete />
                        </IconButton>
                      </TableRowColumn>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>)
            : (<div style={queryFilters.emptyMessage}>
              {formatMessage({ id: 'opensearch.crawler.form.query.no.opensearch.crawler.form.query.filter.message' })}
            </div>)
        }
        {/* 3. Add dialog renderer (no graphics in this container) */}
        <OSQueryAddFilterDialogComponent
          selectedFilters={fields.getAll()}
          availableParameters={availableParameters}
          open={dialogOpen}
          onClose={this.onCloseDialog}
          onConfirmAddFilter={this.onConfirmAddFilter}
        />
      </div>)
  }
}

export default OSQueryFiltersFieldComponent
