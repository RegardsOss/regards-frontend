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
import flow from 'lodash/flow'
import fpmap from 'lodash/fp/map'
import fpsortBy from 'lodash/fp/sortBy'

import { List, ListItem } from 'material-ui/List'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import KeyIcon from 'mdi-material-ui/Key'
import CheckIcon from 'mdi-material-ui/Check'
import { CardTitle } from 'material-ui/Card'

/*
* React component to list tables and attributes from a piece of connection.
*/
export class ConnectionViewerComponent extends React.Component {
  static propTypes = {
    tableList: PropTypes.shape({
      name: PropTypes.string,
    }),
    tableAttributeList: PropTypes.shape({
      name: PropTypes.string,
      javaSqlType: PropTypes.string,
      isPrimaryKey: PropTypes.bool,
    }),
    // Both are only provided in FromTable
    onTableSelected: PropTypes.func.isRequired,
    displayTableAsSelected: PropTypes.bool,
    // The parent component can force to mark a table as selected from the beginning
    initialTableOpen: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    tableOpen: this.props.initialTableOpen || '',
  }

  /**
   * Trigggered when the user click on a table
   * Save the table name selected and send that value into the parent component
   * @param table
   */
  handleToggleTable = (table) => {
    let { tableOpen } = this.state
    if (tableOpen === table) {
      tableOpen = ''
    } else {
      tableOpen = table
    }
    this.props.onTableSelected(tableOpen)
    this.setState({
      tableOpen,
    })
  }

  /**
   * Show a foreign key icon if the table attribute is a FK, otherwise nothing
   * @param tableAttribute
   * @returns {*}
   */
  showFK = (tableAttribute) => {
    if (tableAttribute.isPrimaryKey) {
      return (<KeyIcon />)
    }
    return null
  }

  /**
   * Replace the default icon "^" by a mark if the user wants to map attributes to a table
   * @param isOpen
   * @returns {*}
   */
  showSelectedIcon = (isOpen) => {
    const { displayTableAsSelected } = this.props
    if (isOpen && displayTableAsSelected) {
      return (<CheckIcon />)
    }
    return null
  }

  /**
   * Render table attributes sublines
   * @returns {*}
   */
  renderResource() {
    const { tableAttributeList } = this.props
    const styleTableAttribute = {
      paddingTop: 18,
      paddingBottom: 0,
    }

    return flow(
      fpsortBy('name'),
      fpmap((tableAttribute) => (
        <ListItem
          key={tableAttribute.name}
          secondaryText={tableAttribute.javaSqlType}
          rightIcon={this.showFK(tableAttribute)}
          disabled
          style={styleTableAttribute}
        >
          {tableAttribute.name}
        </ListItem>
      )),
    )(tableAttributeList)
  }

  render() {
    const { tableList, displayTableAsSelected } = this.props
    const { tableOpen } = this.state
    const { intl: { formatMessage } } = this.context
    const subtitle = displayTableAsSelected ? 'datasource.form.mapping.connectionViewerFromTable.subtitle'
      : 'datasource.form.mapping.connectionViewerCustom.subtitle'
    const style = {
      maxHeight: '600px',
      overflowY: 'scroll',
    }

    const elements = flow(
      fpsortBy('name'),
      fpmap((table) => {
        const hasChild = tableOpen === table.name
        const items = hasChild ? this.renderResource() : [<ListItem key={1} primaryText="Waiting..." />]
        return (
          <ListItem
            key={table.name}
            primaryText={table.name}
            className={`selenium-pickSingleTable-${table.name}`}
            initiallyOpen={false}
            open={hasChild}
            primaryTogglesNestedList
            onNestedListToggle={() => this.handleToggleTable(table.name)}
            rightIcon={this.showSelectedIcon(hasChild)}
            nestedItems={items}
          />
        )
      }),
    )(tableList)
    return (
      <div style={style}>
        <CardTitle
          title={formatMessage({ id: 'datasource.form.mapping.connectionViewer.title' })}
          subtitle={formatMessage({ id: subtitle })}
        />
        <List>
          {elements}
        </List>
      </div>
    )
  }
}

export default ConnectionViewerComponent
