/**
 * LICENSE_PLACEHOLDER
 **/
import AppBar from 'material-ui/AppBar'
import { Card, CardActions, CardTitle } from 'material-ui/Card'
import IconList from 'material-ui/svg-icons/action/list'
import Back from 'material-ui/svg-icons/navigation/arrow-back'
import map from 'lodash/map'
import { i18nContextType } from '@regardsoss/i18n'
import { ResourceIconAction } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { themeContextType } from '@regardsoss/theme'
import { PluginDefinition as UIPluginDefinition } from '@regardsoss/model'
import IconButton from 'material-ui/IconButton'
import moduleStyles from '../styles/styles'
import { uiPluginConfigurationActions } from '../clients/UIPluginConfigurationClient'

const styles = moduleStyles().plugins

/**
 * Displays the list of PluginDefinition having the type service
 *
 * @author Léo Mieulet
 */
class ServiceListComponent extends React.Component {

  static propTypes = {
    uiPluginDefinitionList: PropTypes.objectOf(UIPluginDefinition).isRequired,
    handleOpen: PropTypes.func.isRequired,
    handleBack: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Returns a tile displaying the passed plugin.
   *
   * @param plugin
   */
  renderPlugin = (uiPluginDefinition) => {
    const { handleOpen } = this.props
    return (
      <div className={styles.tile.classes} key={uiPluginDefinition.content.id}>
        <Card style={styles.tile.styles}>
          <CardTitle
            title={uiPluginDefinition.content.name}
          />
          <CardActions>
            <ResourceIconAction
              resourceDependency={uiPluginConfigurationActions.getDependency(RequestVerbEnum.GET_LIST)}
              tooltip={this.context.intl.formatMessage({ id: 'service.list.open.tooltip' })}
              onTouchTap={() => handleOpen(uiPluginDefinition.content.id)}
            >
              <IconList />
            </ResourceIconAction>
          </CardActions>
        </Card>
      </div>
    )
  }


  render() {
    const { uiPluginDefinitionList, handleBack } = this.props
    console.log(uiPluginConfigurationActions.getDependency(RequestVerbEnum.GET_LIST))
    return (
      <div>
        <AppBar
          title={this.context.intl.formatMessage({ id: 'service.list.title' })}
          iconElementLeft={<IconButton onTouchTap={handleBack}><Back /></IconButton>}
        />
        <div style={styles.root}>
          <div style={styles.grid}>
            {map(uiPluginDefinitionList, uiPluginDefinition => (
              this.renderPlugin(uiPluginDefinition)
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default ServiceListComponent
