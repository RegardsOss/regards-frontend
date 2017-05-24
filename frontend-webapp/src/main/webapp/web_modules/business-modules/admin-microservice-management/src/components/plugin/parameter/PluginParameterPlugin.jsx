/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { chain } from 'lodash'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import find from 'lodash/find'
import { FormattedMessage } from 'react-intl'
import RaisedButton from 'material-ui/RaisedButton'
import { ListItem } from 'material-ui/List'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Divider from 'material-ui/Divider'
import Delete from 'material-ui/svg-icons/action/delete'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { connect } from '@regardsoss/redux'
import { PluginParameter, PluginMetaDataList, PluginConfiguration } from '@regardsoss/model'
import { RenderTextField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import PluginMetaDataSelectors from '../../../model/plugin/PluginMetaDataSelectors'
import PluginConfigurationSelectors from '../../../model/plugin/PluginConfigurationSelectors'
import { buildMenuItemPrimaryText } from './utils'
import moduleStyles from '../../../styles/styles'

const { validRequiredString } = ValidationHelpers
const styles = moduleStyles()

/**
 * Component displaying a menu allowing to pick a plugin configuration for the passed plugin paramater.
 * Connected to redux store.
 *
 * @author Xavier-Alexandre Brochard
 */
export class PluginParameterPlugin extends React.Component {

  static propTypes = {
    fieldKey: PropTypes.string,
    pluginParameter: PluginParameter.isRequired,
    mode: PropTypes.oneOf(['view', 'edit', 'create', 'copy']),
    change: PropTypes.func, // Callback provided by redux-form in order to manually change a field value
    // form mapStateToProps
    pluginMetaDataList: PluginMetaDataList,
    pluginConfigurationList: PropTypes.arrayOf(PluginConfiguration),
  }

  static defaultProps = {
    mode: 'view',
  }


  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      mode: 'view',
      openMenu: false,
      value: props.pluginParameter && props.pluginParameter.value,
      selectedPluginConfiguration: find(props.pluginConfigurationList, el => el.content.id === parseInt(props.pluginParameter.value, 10)),
    }
  }

  handleOpenMenu = () => {
    this.setState({
      openMenu: true,
    })
  }

  handleOnRequestChange = (value) => {
    this.setState({
      openMenu: value,
    })
  }

  handleChange = (value) => {
    this.setState({
      value,
      selectedPluginConfiguration: find(this.props.pluginConfigurationList, el => el.content.id === value),
    })
    this.props.change(this.props.fieldKey, value ? value.toString() : null)
  }

  render() {
    const { fieldKey, mode, pluginParameter: { name }, pluginMetaDataList, pluginConfigurationList } = this.props
    const { openMenu, selectedPluginConfiguration } = this.state

    switch (mode) {
      case 'view':
        return <ListItem>{name}: {selectedPluginConfiguration && selectedPluginConfiguration.content.label}</ListItem>
      case 'edit':
      case 'create':
      case 'copy':
        return (
          <div>
            {name}            :
            <RaisedButton
              label={selectedPluginConfiguration ? selectedPluginConfiguration.content.label : <FormattedMessage id="microservice-management.plugin.parameter.plugin.choose" />}
              onTouchTap={this.handleOpenMenu}
              style={styles.pluginParameter.pluginButton}
            />
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
              open={openMenu}
              onRequestChange={this.handleOnRequestChange}
              desktop
              autoWidth
              style={styles.pluginParameter.iconMenu}
            >
              {map(pluginMetaDataList, (pluginMetaData) => {
                const pluginConfigurationListForThisPluginMetaData = filter(pluginConfigurationList, pluginConfiguration => pluginConfiguration.content.pluginId === pluginMetaData.content.pluginId)
                const pluginConfigurationListIsEmpty = isEmpty(pluginConfigurationListForThisPluginMetaData)
                return (
                  <MenuItem
                    key={pluginMetaData.content.pluginId}
                    primaryText={buildMenuItemPrimaryText(pluginMetaData.content.pluginId, pluginMetaData.content.version)}
                    rightIcon={<ArrowDropRight />}
                    disabled={pluginConfigurationListIsEmpty}
                    menuItems={
                      chain(pluginConfigurationListForThisPluginMetaData)
                        .map(pluginConfiguration =>
                          (<MenuItem
                            key={pluginConfiguration.content.id}
                            primaryText={buildMenuItemPrimaryText(pluginConfiguration.content.label, pluginConfiguration.content.version)}
                            onTouchTap={() => this.handleChange(pluginConfiguration.content.id)}
                            checked={pluginConfiguration.content.id === this.state.value}
                          />),
                        )
                        .value()
                    }
                  />
                )
              })}
              <Divider />
              <MenuItem
                key={'none'}
                primaryText={this.context.intl.formatMessage({ id: 'microservice-management.plugin.parameter.plugin.empty.menu.item' })}
                onTouchTap={() => this.handleChange(undefined)}
                rightIcon={<Delete />}
              />
            </IconMenu>
            <Field
              style={styles.pluginParameter.field}
              name={fieldKey}
              component={RenderTextField}
              type={'text'}
              label={name}
              validate={validRequiredString}
            />
          </div>
        )
      default:
        return <ListItem>{name}: {selectedPluginConfiguration && selectedPluginConfiguration.content.label}</ListItem>
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  pluginMetaDataList: PluginMetaDataSelectors.getList(state),
  pluginConfigurationList: PluginConfigurationSelectors.getListActiveAndSorted(state),
})

export default connect(mapStateToProps)(PluginParameterPlugin)
