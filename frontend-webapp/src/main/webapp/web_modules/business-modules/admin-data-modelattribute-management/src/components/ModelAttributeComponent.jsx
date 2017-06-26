/**
 * LICENSE_PLACEHOLDER
 **/
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { Table, TableBody, TableRow, TableRowColumn, TableHeader, TableHeaderColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { PluginConfigurationPickerComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import get from 'lodash/get'

class ModelAttributeComponent extends React.Component {

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static propTypes = {
    pluginConfigurationList: CommonShapes.PluginConfigurationList,
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
    modelAttribute: DataManagementShapes.ModelAttribute,
    handleComputationUpdate: PropTypes.func,
    shouldDisplayHeader: PropTypes.bool,
  }

  static defaultProps = {
    shouldDisplayHeader: true,
  }
  /**
   * When the user select a plugin configuration, send the updated value to the server
   * @param value the pluginConfiguration id
   */
  onPluginConfigurationChange= (value) => {
    this.props.handleComputationUpdate(value)
  }


  displayTableHeader = () => {
    if (this.props.shouldDisplayHeader) {
      return (
        <TableHeader
          enableSelectAll={false}
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn><FormattedMessage id="modelattr.edit.table.name" /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id="modelattr.edit.table.type" /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage id="modelattr.edit.table.computationMethod" /></TableHeaderColumn>
          </TableRow>
        </TableHeader>)
    }
    return null
  }

  render() {
    const { modelAttribute, pluginMetaDataList, pluginConfigurationList } = this.props
    return (
      <Table>
        {this.displayTableHeader()}
        <TableBody
          displayRowCheckbox={false}
          preScanRows={false}
        >
          <TableRow>
            <TableRowColumn>{modelAttribute.content.attribute.name}</TableRowColumn>
            <TableRowColumn>{modelAttribute.content.attribute.type}</TableRowColumn>
            <TableRowColumn>
              <PluginConfigurationPickerComponent
                onChange={this.onPluginConfigurationChange}
                pluginMetaDataList={pluginMetaDataList}
                pluginConfigurationList={pluginConfigurationList}
                currentPluginConfiguration={get(modelAttribute, 'content.computationConf', undefined)}
              />
            </TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

export default ModelAttributeComponent
