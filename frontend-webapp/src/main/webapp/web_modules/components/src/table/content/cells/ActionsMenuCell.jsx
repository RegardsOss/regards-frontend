import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert'
import MediaQuery from 'react-responsive'
import omit from 'lodash/omit'
import { HateoasMenuAction, HateoasIconAction } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'

const ActionsMenuCell = (props, context) => {
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
            <IconButton className="selenium-moreButton">
              <NavigationMoreVert />
            </IconButton>
          }
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          title={intl.formatMessage({ id: 'table.actions.more' })}
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

ActionsMenuCell.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.shape({
    title: React.PropTypes.string.required,
    breakpoint: React.PropTypes.number.required,
    children: React.PropTypes.element.required,
  })),
}

ActionsMenuCell.contextTypes = {
  ...i18nContextType,
}

export default ActionsMenuCell
