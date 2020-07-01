/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import max from 'lodash/max'
import map from 'lodash/map'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import ClickAwayListener from 'material-ui/internal/ClickAwayListener'
import NavigationMoreVert from 'mdi-material-ui/DotsVertical'
import MediaQuery from 'react-responsive'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import moduleStyles from '../../styles/styles'
import messages from '../../i18n'

const iconAnchor = { horizontal: 'right', vertical: 'top' }

/**
 * Create a more action button if the screen size does not allow to display all children.
 *
 * @param props
 * @param context
 * @returns {XML}
 * @constructor
 * @author Maxime Bouveron
 * @author Xavier-Alexandre Brochard
 */
class ActionsMenuCell extends React.Component {
  static propTypes = {
    breakpoints: PropTypes.arrayOf(PropTypes.number),
    children: PropTypes.node,
  }

  static defaultProps = {
    breakpoints: [],
    children: [],
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    open: false,
  }

  handleClickAway = () => this.setState({ open: false })

  handleOpen = () => this.setState({ open: true })

  render() {
    const { intl, muiTheme } = this.context
    const { breakpoints, children } = this.props
    const { open } = this.state
    const maxBreakpoint = max(breakpoints)
    const styles = moduleStyles(muiTheme)

    return (
      <div id="plop-menu" style={styles.actionsMenuCellWrapper}>
        {map(children, (child, index) => (
          <MediaQuery key={index} minWidth={breakpoints[index]}>
            {child}
          </MediaQuery>
        ))}
        <MediaQuery maxWidth={maxBreakpoint}>
          <IconMenu
            open={open}
            iconButtonElement={
              <IconButton
                onClick={this.handleOpen}
                className="selenium-moreButton"
                title={intl.formatMessage({ id: 'table.actions.more' })}
              >
                <ClickAwayListener onClickAway={this.handleClickAway}>
                  <NavigationMoreVert
                    hoverColor={muiTheme.palette.accent1Color}
                  />
                </ClickAwayListener>
              </IconButton>
            }
            anchorOrigin={iconAnchor}
            targetOrigin={iconAnchor}
          >
            <div style={styles.actionsMenuCellPopupWrapper}>
              {map(children, (child, index) => (
                <MediaQuery key={index} maxWidth={breakpoints[index] - 1}>
                  {child}
                </MediaQuery>
              ))}
            </div>
          </IconMenu>
        </MediaQuery>
      </div>
    )
  }
}

export default withI18n(messages, true)(ActionsMenuCell)
