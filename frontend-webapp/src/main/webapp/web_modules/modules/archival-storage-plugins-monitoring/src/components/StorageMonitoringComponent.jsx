/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage } from 'react-intl'
import isUndefined from 'lodash/isUndefined'
import Paper from 'material-ui/Paper'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import LinearScale from 'material-ui/svg-icons/editor/linear-scale'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { StoragePluginShape } from '@regardsoss/model'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import StoragePluginCapacityComponent from './StoragePluginCapacityComponent'
import StorageUnitScale, { StorageUnitScaleShape } from '../helper/StorageUnit'
import StorageCapacity from '../helper/StorageCapacity'

class StorageMonitoringComponent extends React.Component {

  static propTypes = {
    initScale: StorageUnitScaleShape,
    storagePlugins: PropTypes.arrayOf(StoragePluginShape).isRequired,
    isFetching: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    initScale: StorageUnitScale.bytesScale,
    isFetching: false,
    hasError: false,
    storagePlugins: [],
  }

  /** I18N injection & themes */
  static contextTypes = { ...themeContextType, ...i18nContextType }

  componentWillMount = () => {
    // set up the default state with unit scale
    const { initScale, storagePlugins } = this.props
    this.updateState(initScale, this.parsePluginsInput(storagePlugins), false)
  }

  componentWillReceiveProps(nextProps) {
    // check if next plugins data changed
    const { storagePlugins } = nextProps
    if (storagePlugins.length) {
      this.updateState(this.state.currentScale, this.parsePluginsInput(storagePlugins))
    }
  }

  onUnitScaleSelected = newScale => this.updateState(newScale, this.state.plugins)

  updateState = (currentScale, plugins) => {
    this.setState({
      currentScale,
      plugins,
    })
  }

  parsePluginsInput = pluginsInput => pluginsInput.map(({ id, label, description, totalSize, usedSize }) => ({
    id,
    label,
    description,
    totalSize: StorageCapacity.fromValue(totalSize),
    usedSize: StorageCapacity.fromValue(usedSize),
  }))

  /**
   * Converts known plugins sizes using a new scale
   * @param plugins plugins
   * @param newScale new storage capacity scale
   */
  toNewScale = (plugins, newScale) => plugins.map(({ id, label, description, totalSize, usedSize }) => ({
    id,
    label,
    description,
    totalSize: totalSize ? totalSize.scaleAndConvert(newScale) : null,
    usedSize: usedSize ? usedSize.scaleAndConvert(newScale) : null,
  }))

  render() {
    const { intl } = this.context
    const { currentScale, plugins } = this.state
    const { isFetching, hasError, storagePlugins } = this.props
  /*  // */
    return (
      <Paper >

        <Toolbar>
          <ToolbarGroup firstChild>
            <ToolbarTitle text={intl.formatMessage({ id: 'archival.storage.capacity.monitoring.title' })} />
          </ToolbarGroup>
          <ToolbarGroup>
            <FormattedMessage id={currentScale.messageKey} />
            <IconMenu
              iconButtonElement={<IconButton><LinearScale /></IconButton>}
              value={currentScale}
              onChange={(evt, value) => this.onUnitScaleSelected(value)}
            >
              {StorageUnitScale.all.map(scale => (
                <MenuItem
                  key={scale.id}
                  value={scale}
                  primaryText={
                    <FormattedMessage id={scale.messageKey} />
                  }
                />
              ))}
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>

        <LoadableContentDisplayDecorator
          isLoading={isFetching}
          isEmpty={isUndefined(storagePlugins) || !storagePlugins.length}
          isContentError={hasError}
        >
          <div className="row">
            {
              // map all plugins to cards
              plugins.map(pluginModel => (
                <StoragePluginCapacityComponent key={pluginModel.id} scale={currentScale} {...pluginModel} />
                ))
            }
          </div>
        </LoadableContentDisplayDecorator>

      </Paper>
    )
  }

}

export default StorageMonitoringComponent
