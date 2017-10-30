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
import max from 'lodash/max'
import map from 'lodash/map'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import ClickAwayListener from 'material-ui/internal/ClickAwayListener'
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert'
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
      <div style={styles.actionsMenuCellWrapper}>
        {map(children, (child, index) => (
          <MediaQuery key={index} query={`(min-width: ${breakpoints[index]}px)`}>
            {child}
          </MediaQuery>
        ))}
        <MediaQuery query={`(max-width: ${maxBreakpoint}px)`}>
          <IconMenu
            open={open}
            iconButtonElement={
              <IconButton
                onTouchTap={this.handleOpen}
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
                <MediaQuery key={index} query={`(max-width: ${breakpoints[index] - 1}px)`}>
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

ActionsMenuCell.propTypes = {
  breakpoints: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.node,
}

ActionsMenuCell.defaultProps = {
  breakpoints: [],
  children: [],
}

ActionsMenuCell.contextTypes = {
  ...i18nContextType,
  ...themeContextType,
}

export default withI18n(messages)(ActionsMenuCell)
