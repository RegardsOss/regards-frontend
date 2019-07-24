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
import get from 'lodash/get'
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
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { reduxForm } from '@regardsoss/form-utils'
import { CommonShapes } from '@regardsoss/shape'
import { withHateoasDisplayControl, HateoasKeys, withResourceDisplayControl } from '@regardsoss/display-control'
import { RenderPluginConfField, PluginFormUtils } from '@regardsoss/microservice-plugin-configurator'
import { pluginConfigurationByPluginIdActions } from '../../clients/PluginConfigurationClient'
import PluginView from './PluginView'
import styles from '../../styles'


const HateoasIconAction = withHateoasDisplayControl(IconButton)
const HateoasToggle = withHateoasDisplayControl(Toggle)
const ResourceIconAction = withResourceDisplayControl(IconButton)

/**
 * React component displaying a configurable microservice.
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginConfigurationComponent extends React.Component {
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
    }
  }

  handleExpandChange = (newExpandedState) => {
    this.setState({
      expanded: newExpandedState,
    })
  }

  render() {
    const {
      microserviceName, pluginConfiguration, pluginMetaData, onActiveToggle, onCopyClick, onDeleteClick, onEditClick, onDownwardClick, onUpwardClick,
    } = this.props
    const { moduleTheme } = this.context
    const metaData = get(pluginMetaData, 'content', {})
    // Like the real form, we need to transform the current pluginConf into an object lightly different
    const initValues = PluginFormUtils.formatPluginConfForReduxFormInit(pluginConfiguration.content, metaData)
    const ConfForm = reduxForm({
      form: `view-plugin-conf-${pluginConfiguration.content.id}`,
      initialValues: { pluginConfiguration: initValues },
    })(PluginView)

    // Simulate a redux form to use the same component RenderPluginConfField to display a non editable form of plugin configuration.
    const conf = (
      <ConfForm
        microserviceName={microserviceName}
        pluginMetaData={metaData}
        name="pluginConfiguration"
        component={RenderPluginConfField}
      />)


    return (
      <Card
        onExpandChange={this.handleExpandChange}
        style={this.state.expanded ? moduleTheme.pluginConfiguration.cardExpanded : moduleTheme.pluginConfiguration.card}
      >
        <CardActions showExpandableButton>
          <div style={moduleTheme.pluginConfiguration.lineWrapper}>
            <div>
              <span>{pluginConfiguration.content.label}</span>
              <span style={moduleTheme.pluginConfiguration.version}>
Version
                {pluginConfiguration.content.version}
              </span>
              <span> -</span>
              <span style={moduleTheme.pluginConfiguration.version}>
ID
                {pluginConfiguration.content.id}
              </span>
            </div>
            <div style={moduleTheme.pluginConfiguration.buttonsGroupWrapper}>
              <span style={moduleTheme.pluginConfiguration.version}>
                <FormattedMessage
                  id="microservice-management.plugin.configuration.priorityOrder"
                />
                {' '}
                {pluginConfiguration.content.priorityOrder}
              </span>
              <HateoasIconAction
                entityLinks={pluginConfiguration.links}
                hateoasKey={HateoasKeys.UPDATE}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.increment.priorityOrder' })}
                onClick={onUpwardClick}
              >
                <ArrowUpward />
              </HateoasIconAction>
              <HateoasIconAction
                entityLinks={pluginConfiguration.links}
                hateoasKey={HateoasKeys.UPDATE}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.decrement.priorityOrder' })}
                onClick={onDownwardClick}
              >
                <ArrowDownward />
              </HateoasIconAction>
              <HateoasIconAction
                entityLinks={pluginConfiguration.links}
                hateoasKey={HateoasKeys.UPDATE}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.edit' })}
                onClick={onEditClick}
              >
                <ModeEdit />
              </HateoasIconAction>
              <ResourceIconAction
                resourceDependencies={pluginConfigurationByPluginIdActions.getMsDependency('POST', this.props.microserviceName)}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.copy' })}
                onClick={onCopyClick}
              >
                <ContentCopy />
              </ResourceIconAction>
              <HateoasIconAction
                entityLinks={pluginConfiguration.links}
                hateoasKey={HateoasKeys.DELETE}
                tooltip={this.context.intl.formatMessage({ id: 'microservice-management.plugin.configuration.delete' })}
                onClick={onDeleteClick}
              >
                <Delete />
              </HateoasIconAction>
              <HateoasToggle
                entityLinks={pluginConfiguration.links}
                hateoasKey={HateoasKeys.UPDATE}
                onToggle={onActiveToggle}
                defaultToggled={pluginConfiguration.content.active}
                style={moduleTheme.pluginConfiguration.toggle}
              />
            </div>
          </div>
        </CardActions>
        <CardText expandable style={moduleTheme.pluginConfiguration.cardExpandedText}>
          <Subheader style={moduleTheme.pluginConfiguration.subheader}><FormattedMessage id="microservice-management.plugin.configuration.parameters" /></Subheader>
          {conf}
        </CardText>
      </Card>
    )
  }
}

export default withModuleStyle(styles)(PluginConfigurationComponent)
