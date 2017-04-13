/**
* LICENSE_PLACEHOLDER
**/
import { FormattedMessage } from 'react-intl'
import { CardTitle } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import Toggle from 'material-ui/Toggle'
import ExpandedIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import CollapsedIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'

/**
* Search graph header, showing title, collapse and options
*/
class SearchGraphHeader extends React.Component {

  static propTypes = {
    moduleCollapsed: React.PropTypes.bool.isRequired, // is module collapsed?
    datasetAttributesVisible: React.PropTypes.bool.isRequired, // are dataset attributes currently visible
    areDatasetAttributesAvailable: React.PropTypes.bool.isRequired, // are dataset attributes available
    onSetDatasetAttributesVisible: React.PropTypes.func.isRequired, // (bool) => void
    dispatchToggleModuleCollapsed: React.PropTypes.func.isRequired, // void => void
  }

  static contextTypes = {
    ...themeContextType,
  }

  toggleDatasetAttributesVisible = (evt, isChecked) => {
    const { onSetDatasetAttributesVisible } = this.props
    onSetDatasetAttributesVisible(isChecked)
  }

  render() {
    const { moduleCollapsed, datasetAttributesVisible,
      areDatasetAttributesAvailable, dispatchToggleModuleCollapsed } = this.props
    const { moduleTheme: { user: { header } } } = this.context
    return (
      <Toolbar style={header.styles}>
        <ToolbarGroup firstChild style={header.firstToolbarGroup.styles}>
          <CardTitle
            style={header.cardTitle.styles}
            titleStyle={header.cardTitle.titleStyles}
            title={<FormattedMessage id="search.graph.title" />}
            subtitle={<FormattedMessage id="search.graph.subtitle" />}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <ShowableAtRender show={areDatasetAttributesAvailable}>
            <Toggle
              toggled={datasetAttributesVisible}
              label={<FormattedMessage id="search.graph.show.details" />}
              onToggle={this.toggleDatasetAttributesVisible}
            />
          </ShowableAtRender>
        </ToolbarGroup>
        <ToolbarGroup lastChild>
          <ToolbarSeparator />
          <IconButton
            style={header.collapseButton.styles}
            iconStyle={header.collapseButton.iconStyles}
            onTouchTap={dispatchToggleModuleCollapsed}
          >
            { // show module collapsed state on collapsed button icon
              moduleCollapsed ?
                <CollapsedIcon /> :
                <ExpandedIcon />
            }
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
export default SearchGraphHeader

