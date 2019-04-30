import omit from 'lodash/omit'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  ListItem,
  Dialog,
  List,
  TextField,
  CardTitle,
  CardText,
  RaisedButton,
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableBody,
  TableRowColumn,
  MenuItem,
  IconButton,
  FlatButton,
} from 'material-ui'
import { CardActionsComponent } from '@regardsoss/components'
import { ActionDelete } from 'material-ui/svg-icons'
import Open from 'material-ui/svg-icons/action/open-in-new'
import {
  RenderSelectField, RenderTextField, Field, ValidationHelpers,
} from '@regardsoss/form-utils'
import { FormattedMessage } from 'react-intl'

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

/**
 * Dialog to add a filter to an opensearch crawler
 * @author Maxime Bouveron
 */

class AddFilterDialogComponent extends React.Component {
  static propTypes = {
    filters: PropTypes.arrayOf(PropTypes.obj),
    handleAddFilter: PropTypes.func,
    open: PropTypes.bool,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    filter: '',
    currentFilter: null,
    dialogOpen: false,
  }

  toggleDialog = () => {
    this.setState({
      dialogOpen: !this.state.dialogOpen,
    })
  }

  handleAddFilter = (filter) => {
    this.toggleDialog()
    this.props.fields.push(omit(filter, 'value'))
  }

  handleFilter = (e) => {
    this.setState({
      filter: e.target.value.toLowerCase(),
    })
  }

  handleSelectFilter = (currentFilter) => {
    this.setState({
      currentFilter,
    })
  }

  renderList = () => {
    const selected = { backgroundColor: this.context.muiTheme.palette.primary1Color }
    const innerDivStyle = {
      innerDivStyle: { fontSize: '0.95em', paddingTop: 7, paddingBottom: 7 },
    }
    return this.props.filters.parameter
      .filter(filter => this.props.fields.getAll()
        ? !this.props.fields.getAll().find(field => field.name === filter.name)
        : true,
      )
      .filter(filter => filter.name.toLowerCase().includes(this.state.filter))
      .map((filter, index) => (
        <ListItem
          {...innerDivStyle}
          style={this.state.currentFilter === filter ? selected : null}
          key={filter.name}
          onClick={() => this.handleSelectFilter(filter)}
        >
          {filter.name}
        </ListItem>
      ))
  }

  renderParameterAttribute = (name, key) => this.state.currentFilter[key] && (
    <div style={{ marginBottom: 5 }}>
      <strong>{`${name} : `}</strong>
      <span>{this.state.currentFilter[key]}</span>
    </div>
  )

  getOptions = (filter) => {
    if (filter.options) return filter.options
    if (filter.option) return filter.option
    return false
  }

  getValidation = (filter) => {
    const {
      number, required, lessThan, moreThan,
    } = ValidationHelpers

    const validation = [required]

    if (filter.maxInclusive || filter.minInclusive) if (filter.maxInclusive) validation.push(number)
    if (filter.maxInclusive) validation.push(lessThan(parseInt(filter.maxInclusive, 10)))
    if (filter.minInclusive) validation.push(moreThan(parseInt(filter.minInclusive, 10)))

    return validation
  }

  getOpenSearchLink = (template, fields) => {
    let url = template.split('?')[0]
    if (fields.getAll()) {
      url += `?${fields.getAll().map(e => `${e.name}=${e.value}`).join('&')}`
    }
    return url
  }

  renderDialog = () => (
    <Dialog bodyStyle={{ padding: 0 }} open={this.state.dialogOpen} modal>
      <div style={{ display: 'flex', maxHeight: 400 }}>
        <div
          style={{
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
          className="col-xs-35 col-lg-30"
        >
          <List>
            <div style={{ padding: '0 25px' }}>
              <TextField
                style={{ width: '100%' }}
                onChange={this.handleFilter}
                placeholder={this.context.intl.formatMessage({ id: 'opensearch.crawler.form.query.filter' })}
              />
            </div>
            {this.renderList()}
          </List>
        </div>
        <div className="col-xs-65 col-lg-70">
          {this.state.currentFilter ? (
            <>
              <CardTitle>{this.state.currentFilter.name}</CardTitle>
              <CardText>
                {this.renderParameterAttribute('Name', 'name')}
                {this.renderParameterAttribute('Title', 'title')}
                {this.renderParameterAttribute('Max Inclusive', 'maxInclusive')}
                {this.renderParameterAttribute('Min Inclusive', 'minInclusive')}
                {this.renderParameterAttribute('Pattern', 'pattern')}
                {this.getOptions(this.state.currentFilter) && (
                  <>
                    <FormattedMessage id="opensearch.crawler.form.query.possibleValues" />
                    <ul>
                      {this.getOptions(this.state.currentFilter).map(option => (
                        <li key={option.value}>{option.value}</li>
                      ))}
                    </ul>
                  </>
                )}
                <div
                  style={{ position: 'absolute', bottom: 10, right: 10 }}
                >
                  <CardActionsComponent
                    mainButtonLabel={this.context.intl.formatMessage({ id: 'opensearch.crawler.form.query.add' })}
                    mainButtonClick={() => {
                      this.handleAddFilter(this.state.currentFilter)
                    }}
                    secondaryButtonLabel={this.context.intl.formatMessage({ id: 'datasource.list.action.cancel' })}
                    secondaryButtonClick={this.toggleDialog}
                  />
                </div>
              </CardText>
            </>
          ) : <RaisedButton
            label={this.context.intl.formatMessage({ id: 'datasource.list.action.cancel' })}
            onClick={this.toggleDialog}
            style={{ position: 'absolute', bottom: 10, right: 10 }}
          />}

        </div>
      </div>
    </Dialog>
  )

  render() {
    const { filters: { template }, fields } = this.props
    const { formatMessage } = this.context.intl
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span><FormattedMessage id="opensearch.crawler.form.query.filters" /></span>
          <RaisedButton label={formatMessage({ id: 'opensearch.crawler.form.query.add' })} onClick={this.toggleDialog} />
          {this.renderDialog()}
        </div>
        {fields.length > 0 && (
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
                    {this.getOptions(fields.get(index)) ? (
                      <Field name={`${filter}.value`} component={RenderSelectField} label={formatMessage({ id: 'opensearch.crawler.form.query.value' })}>
                        {this.getOptions(fields.get(index)).map(option => (
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
          </Table>
        )}

        <FlatButton
          label={formatMessage({ id: 'opensearch.crawler.form.query.testQuery' })}
          href={this.getOpenSearchLink(template, fields)}
          target="_blank"
          icon={<Open />}
        />
      </>
    )
  }
}

export default AddFilterDialogComponent
