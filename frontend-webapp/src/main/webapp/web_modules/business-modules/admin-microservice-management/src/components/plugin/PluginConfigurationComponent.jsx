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
import map from 'lodash/map'
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardText } from 'material-ui/Card'
import Delete from 'material-ui/svg-icons/action/delete'
import IconButton from 'material-ui/IconButton'
import ArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward'
import ArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward'
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Subheader from 'material-ui/Subheader'
import Toggle from 'material-ui/Toggle'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import { withHateoasDisplayControl, HateoasKeys, withResourceDisplayControl } from '@regardsoss/display-control'
import { GenericPluginParameter, PluginUtils } from '@regardsoss/microservice-plugin-configurator'
import { pluginConfigurationByTypeActions } from '../../clients/PluginConfigurationClient'
import moduleStyles from '../../styles/styles'

const HateoasIconAction = withHateoasDisplayControl(IconButton)
const HateoasToggle = withHateoasDisplayControl(Toggle)
const ResourceIconAction = withResourceDisplayControl(IconButton)

/**
 * React component displaying a configurable microservice.
 *
 * @author Xavier-Alexandre Brochard
 */
class PluginConfigurationComponent extends React.Component {

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static propTypes = {
    microserviceName: PropTypes.string.isRequired,
    pluginConfiguration: CommonShapes.PluginConfiguration,
    pluginMetaData: CommonShapes.PluginMetaData,
    onActiveToggle: PropTypes.func.isRequired,
    onCopyClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onDownwardClick: PropTypes.func.isRequired,
    onUpwardClick: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      pluginParameterTypeList: props.pluginMetaData && props.pluginMetaData.content.parameters,
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      pluginParameterTypeList: newProps.pluginMetaData && newProps.pluginMetaData.content.parameters,
    })
  }

  handleExpandChange = (newExpandedState) => {
    this.setState({
      expanded: newExpandedState,
    })
  }

  render() {
    const { microserviceName, pluginConfiguration, pluginMetaData, onActiveToggle, onCopyClick, onDeleteClick, onEditClick, onDownwardClick, onUpwardClick } = this.props

    const styles = moduleStyles(this.context.muiTheme).pluginConfiguration

    const parameters = map(pluginMetaData.content.parameters, (pluginParameterType, index) => (
      <GenericPluginParameter
        key={pluginParameterType.name}
        microserviceName={microserviceName}
        pluginParameterType={pluginParameterType}
        pluginParameter={PluginUtils.mapPluginParameterTypeToPluginParameter(pluginParameterType, pluginConfiguration.content)}
        pluginMetaData={pluginMetaData}
        mode={'view'}
      />))

    return (
      <Card
        onExpandChange={this.handleExpandChange}
        style={this.state.expanded ? styles.cardExpanded : styles.card}
      >
        <CardActions showExpandableButton>
          <div style={styles.lineWrapper}>
            <div>
              <span>{pluginConfiguration.content.label}</span>
              <span style={styles.version}>Version {pluginConfiguration.content.version}</span>
            </div>
            <div style={styles.buttonsGroupWrapper}>
              <span style={styles.version}><FormattedMessage
                id="microservice-management.plugin.configuration.priorityOrder"
              /> {pluginConfiguration.content.priorityOrder}</span>
              <HateoasIconAction
                entityLinks={pluginConfiguration.links}
                hateoasKey={HateoasKeys.UPDATE}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.increment.priorityOrder' })}
                onTouchTap={onUpwardClick}
              >
                <ArrowUpward />
              </HateoasIconAction>
              <HateoasIconAction
                entityLinks={pluginConfiguration.links}
                hateoasKey={HateoasKeys.UPDATE}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.decrement.priorityOrder' })}
                onTouchTap={onDownwardClick}
              >
                <ArrowDownward />
              </HateoasIconAction>
              <HateoasIconAction
                entityLinks={pluginConfiguration.links}
                hateoasKey={HateoasKeys.UPDATE}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.edit' })}
                onTouchTap={onEditClick}
              >
                <ModeEdit />
              </HateoasIconAction>
              <ResourceIconAction
                resourceDependencies={pluginConfigurationByTypeActions.getMsDependency('POST', this.props.microserviceName)}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.copy' })}
                onTouchTap={onCopyClick}
              >
                <ContentCopy />
              </ResourceIconAction>
              <HateoasIconAction
                entityLinks={pluginConfiguration.links}
                hateoasKey={HateoasKeys.DELETE}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.delete' })}
                onTouchTap={onDeleteClick}
              >
                <Delete />
              </HateoasIconAction>
              <HateoasToggle
                entityLinks={pluginConfiguration.links}
                hateoasKey={HateoasKeys.UPDATE}
                onToggle={onActiveToggle}
                defaultToggled={pluginConfiguration.content.active}
                style={styles.toggle}
              />
            </div>
          </div>
        </CardActions>
        <CardText expandable style={styles.cardExpandedText}>
          <Subheader style={styles.subheader}><FormattedMessage id="microservice-management.plugin.configuration.parameters" /></Subheader>
          {parameters}
        </CardText>
      </Card>
    )
  }
}

export default PluginConfigurationComponent
