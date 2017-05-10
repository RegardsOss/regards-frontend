/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { FormattedMessage } from 'react-intl'
import { List, ListItem } from 'material-ui/List'
import KeyIcon from 'material-ui/svg-icons/communication/vpn-key'
import CheckIcon from 'material-ui/svg-icons/navigation/check'
import { CardTitle } from 'material-ui/Card'

/*
* React component to list tables and attributes from a piece of connection.
*/
export class ConnectionViewerComponent extends React.Component {

  static propTypes = {
    tableList: React.PropTypes.shape({
      name: React.PropTypes.string,
    }),
    tableAttributeList: React.PropTypes.shape({
      name: React.PropTypes.string,
      javaSqlType: React.PropTypes.string,
      isPrimaryKey: React.PropTypes.bool,
    }),
    // Both are only provided in FromTable
    onTableSelected: React.PropTypes.func.isRequired,
    displayTableAsSelected: React.PropTypes.bool,
    // The parent component can force to mark a table as selected from the beginning
    initialTableOpen: React.PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      tableOpen: props.initialTableOpen || '',
    }
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
    return map(tableAttributeList, (tableAttribute, id) => (
      <ListItem
        key={id}
        secondaryText={tableAttribute.javaSqlType}
        rightIcon={this.showFK(tableAttribute)}
        disabled
        style={styleTableAttribute}
      >
        {tableAttribute.name}
      </ListItem>
    ))
  }

  render() {
    const { tableList, displayTableAsSelected } = this.props
    const { tableOpen } = this.state
    const subtitle = displayTableAsSelected ? 'datasource.form.mapping.connectionViewerFromTable.subtitle' :
      'datasource.form.mapping.connectionViewerCustom.subtitle'
    const style = {
      maxHeight: '600px',
      overflowY: 'scroll',
    }
    return (
      <div style={style}>
        <CardTitle
          title={<FormattedMessage id="datasource.form.mapping.connectionViewer.title" />}
          subtitle={<FormattedMessage id={subtitle} />}
        />
        <List>
          {map(tableList, (table, id) => {
            const hasChild = tableOpen === table.name
            return (
              <ListItem
                key={id}
                primaryText={table.name}
                initiallyOpen={false}
                open={hasChild}
                primaryTogglesNestedList
                onNestedListToggle={() => this.handleToggleTable(table.name)}
                rightIcon={this.showSelectedIcon(hasChild)}
                nestedItems={
                  hasChild ? this.renderResource() : [<ListItem key={1} primaryText="Waiting..." />]
                }
              />
            )
          })}
        </List>
      </div>
    )
  }
}

export default ConnectionViewerComponent
