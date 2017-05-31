/**
 * LICENSE_PLACEHOLDER
 **/
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert'
import MediaQuery from 'react-responsive'
import omit from 'lodash/omit'
import { HateoasMenuAction, HateoasIconAction } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Create a more action button if the screen size do not allow to display all IconButton from this component children.
 *
 * @param props
 * @param context
 * @returns {XML}
 * @constructor
 */
const ActionsMenuCellComponent = (props, context) => {
  const { intl } = context
  const maxBreakpoint = props.children.reduce((biggest, action) => Math.max(action.props.breakpoint, biggest), 0)
  return (
    <div style={{ display: 'flex' }}>
      {React.Children.map(props.children, ((action) => {
        const { breakpoint, ...rest } = action.props
        return (
          <MediaQuery key={action.props.title} query={`(min-width: ${breakpoint}px)`}>
            {React.createElement(
              action.type,
              action.type === HateoasIconAction ? rest : { ...omit(rest, ['isInstance', 'theme', 'i18n', 'dispatch']) },
            )}
          </MediaQuery>
        )
      }))}
      <MediaQuery query={`(max-width: ${maxBreakpoint}px)`}>
        <IconMenu
          iconButtonElement={
            <IconButton
              className="selenium-moreButton"
              title={intl.formatMessage({ id: 'table.actions.more' })}
            >
              <NavigationMoreVert
                hoverColor={context.muiTheme.palette.accent1Color}
              />
            </IconButton>
          }
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          {React.Children.map(props.children, ((action) => {
            const { children, breakpoint, ...rest } = action.props
            return (
              <MediaQuery key={rest.title} query={`(max-width: ${breakpoint - 1}px)`}>
                {React.createElement(
                  action.type === HateoasIconAction ? HateoasMenuAction : MenuItem,
                  {
                    primaryText: rest.title,
                    leftIcon: children,
                    ...omit(rest, ['iconStyle', 'tooltipPosition', 'touch']),
                  },
                )}
              </MediaQuery>
            )
          }))}
        </IconMenu>
      </MediaQuery>
    </div>
  )
}

ActionsMenuCellComponent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.required,
    breakpoint: PropTypes.number.required,
    children: PropTypes.element.required,
  })),
}

ActionsMenuCellComponent.contextTypes = {
  ...i18nContextType,
  ...themeContextType,
}

export default ActionsMenuCellComponent
