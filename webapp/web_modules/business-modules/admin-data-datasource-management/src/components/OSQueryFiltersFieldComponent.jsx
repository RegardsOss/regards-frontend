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
import omit from 'lodash/omit'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import RaisedButton from 'material-ui/RaisedButton'
import Table from 'material-ui/Table/Table'
import TableHeader from 'material-ui/Table/TableHeader'
import TableRow from 'material-ui/Table/TableRow'
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn'
import TableBody from 'material-ui/Table/TableBody'
import TableRowColumn from 'material-ui/Table/TableRowColumn'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import { FormattedMessage } from 'react-intl'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  RenderSelectField, RenderTextField, Field, ValidationHelpers,
} from '@regardsoss/form-utils'
import { Subheader } from 'material-ui'
import AddFilterIcon from 'mdi-material-ui/Filter'
import RemoveFilterIcon from 'mdi-material-ui/FilterRemove'
import TestRequestIcon from 'material-ui/svg-icons/action/open-in-new'
import OSQueryAddFilterDialogComponent from './OSQueryAddFilterDialogComponent'
import { DescriptorHelper } from '../domain/DescriptorHelper'

/**
 * Dialog to add a filter to an opensearch crawler
 * @author Maxime Bouveron
 */

class OSQueryFiltersFieldComponent extends React.Component {
  static propTypes = {
    filters: DataManagementShapes.OpenSearchURLDescription.isRequired,
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
   * @param {*} filter TODO (check the real shape!)
   */
  onConfirmAddFilter = (filter) => {
    console.error('The added filter:', filter)
    this.onCloseDialog()
    this.props.fields.push(omit(filter, 'value'))
  }


  // TODO from here
  getValidation = (filter) => {
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

  getOpenSearchLink = (template, fields) => {
    let url = template.split('?')[0]
    const allFields = fields.getAll()
    if (allFields && allFields.length) {
      url += `?${allFields.map(e => `${e.name}=${e.value}`).join('&')}`
    }
    return url
  }


  // TODO externaliser les styles!

  render() {
    const { filters, fields } = this.props
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
            href={this.getOpenSearchLink(filters.template, fields)}
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
                  <TableHeaderColumn>{formatMessage({ id: 'opensearch.crawler.form.query.name' })}</TableHeaderColumn>
                  <TableHeaderColumn>{formatMessage({ id: 'opensearch.crawler.form.query.description' })}</TableHeaderColumn>
                  <TableHeaderColumn>{formatMessage({ id: 'opensearch.crawler.form.query.value' })}</TableHeaderColumn>
                  <TableHeaderColumn>{formatMessage({ id: 'opensearch.crawler.form.query.actions' })}</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {fields.map((filter, index) => (
                  <TableRow key={filter.name}>
                    <TableRowColumn>{fields.get(index).name}</TableRowColumn>
                    <TableRowColumn>{fields.get(index).title}</TableRowColumn>
                    <TableRowColumn>
                      {DescriptorHelper.hasParameterOptions(fields.get(index)).length ? (
                        <Field name={`${filter}.value`} component={RenderSelectField} label={formatMessage({ id: 'opensearch.crawler.form.query.value' })}>
                          {DescriptorHelper.getParameterOptions(fields.get(index)).map(option => (
                            <MenuItem
                              key={option.value}
                              value={option.value}
                              primaryText={option.value}
                            />
                          ))}
                        </Field>
                      ) : (
                        <Field
                          name={`${filter}.value`}
                          component={RenderTextField}
                          label={formatMessage({ id: 'opensearch.crawler.form.query.value' })}
                        />
                      )}
                    </TableRowColumn>
                    <TableRowColumn>
                      <IconButton tooltip={formatMessage({ id: 'opensearch.crawler.form.query.removeFilter' })} onClick={() => fields.remove(index)}>
                        <ActionDelete />
                      </IconButton>
                    </TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>)
            : (<div style={queryFilters.emptyMessage}>
              COUCOU
            </div>)
        }
        {/* 3. Add dialog renderer (no graphics in this container) */}
        <OSQueryAddFilterDialogComponent
          selectedFilters={fields.getAll()}
          filters={filters}
          open={dialogOpen}
          onClose={this.onCloseDialog}
          onConfirmAddFilter={this.onConfirmAddFilter}
        />
      </div>)
  }
}

export default OSQueryFiltersFieldComponent
