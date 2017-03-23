/**
* LICENSE_PLACEHOLDER
**/
import FlatButton from 'material-ui/FlatButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import DrowDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down'
import { themeContextType } from '@regardsoss/theme'
import { Facet } from '../model/FacetShape'
import { formatFacetName } from '../utils/FacetPresentationTools'


/**
* Range facet selector
*/
class FacetSelectorComponent extends React.Component {

  static propTypes = {
    facet: Facet.isRequired,
    facetValueFormatter: React.PropTypes.func.isRequired,
    // applies a facet filter (key:string, label:string, searchQuery: string)
    applyFilter: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  componentWillMount() {
    this.setMenuVisibleOn()
  }

  onOpenMenu = (event) => {
    event.preventDefault()
    this.setMenuVisibleOn(event.currentTarget)
  }

  onCloseMenu = () => this.setMenuVisibleOn()

  onMenuItemSelected = (event, { openSearchQuery }) => {
    // hide menu
    this.setMenuVisibleOn()
    // apply filter
    const { applyFilter, facet: { attributeName: filterKey } } = this.props
    applyFilter(filterKey, filterKey, openSearchQuery)
  }

  setMenuVisibleOn(menuVisibleOn = null) {
    if (!this.state || this.state.menuVisibleOn !== menuVisibleOn) {
      this.setState({ menuVisibleOn })
    }
  }

  render() {
    const { facet: { attributeName, values }, facetValueFormatter } = this.props
    const { menuVisibleOn } = this.state
    const { moduleTheme: { filterSelectors: { selector } } } = this.context

    return (
      <div style={selector.styles}>
        <FlatButton
          open
          label={formatFacetName(attributeName)}
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
                const label = facetValueFormatter(facetValue)
                return (
                  <MenuItem key={label} value={facetValue} primaryText={label} />
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
