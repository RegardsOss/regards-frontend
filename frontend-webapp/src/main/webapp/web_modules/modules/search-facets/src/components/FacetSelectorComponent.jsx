/**
* LICENSE_PLACEHOLDER
**/
import FlatButton from 'material-ui/FlatButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import DrowDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { Facet } from '../model/FacetShape'


/**
* Range facet selector
*/
class FacetSelectorComponent extends React.Component {

  static propTypes = {
    label: React.PropTypes.string,
    facet: Facet.isRequired,
    // formats the facet value for menu
    facetValueFormatterForMenu: React.PropTypes.func.isRequired,
    // formats the facet value for filter display
    facetValueFormatterForFilter: React.PropTypes.func.isRequired,
    // applies a facet filter (key:string, label:string, searchQuery: string)
    applyFilter: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentWillMount() {
    this.setMenuVisibleOn()
  }

  onOpenMenu = (event) => {
    event.preventDefault()
    this.setMenuVisibleOn(event.currentTarget)
  }

  onCloseMenu = () => this.setMenuVisibleOn()

  onMenuItemSelected = (event, facetValue) => {
    // hide menu
    this.setMenuVisibleOn()

    // apply filter (compute the label value for it)
    const { applyFilter, facetValueFormatterForFilter, facet: { attributeName: filterKey }, label } = this.props
    applyFilter(filterKey, facetValueFormatterForFilter(label || filterKey, facetValue), facetValue.openSearchQuery)
  }

  setMenuVisibleOn(menuVisibleOn = null) {
    if (!this.state || this.state.menuVisibleOn !== menuVisibleOn) {
      this.setState({ menuVisibleOn })
    }
  }

  render() {
    const { label, facet: { attributeName, values }, facetValueFormatterForMenu } = this.props
    const { menuVisibleOn } = this.state
    const { moduleTheme: { filterSelectors: { selector } } } = this.context

    return (
      <div style={selector.styles}>
        <FlatButton
          open
          label={label || attributeName}
          value={null}
          onTouchTap={this.onOpenMenu}
          labelPosition="before"
          icon={<DrowDownIcon />}
        />
        <Popover
          open={!!menuVisibleOn}
          anchorEl={this.state.menuVisibleOn}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.onCloseMenu}
        >
          <Menu onChange={this.onMenuItemSelected}>
            {
              values.map((facetValue) => {
                const menuLabel = facetValueFormatterForMenu(label, facetValue)
                return (
                  <MenuItem key={menuLabel} value={facetValue} primaryText={menuLabel} />
                )
              })
            }
          </Menu>
        </Popover>
      </div>
    )
  }
}

export default FacetSelectorComponent
