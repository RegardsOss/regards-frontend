import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert'
import MediaQuery from 'react-responsive'

const ActionsMenuCell = (props) => {
  const maxBreakpoint = props.children.reduce((biggest, action) => Math.max(action.props.breakpoint, biggest), 0)
  return (
    <div style={{ display: 'flex' }}>
      {React.Children.map(props.children, ((action) => {
        const { breakpoint, ...rest } = action.props
        return (
          <MediaQuery key={action.props.title} query={`(min-width: ${breakpoint}px)`}>
            {React.createElement(action.type, rest)}
          </MediaQuery>
        )
      }))}
      <MediaQuery query={`(max-width: ${maxBreakpoint}px)`}>
        <IconMenu
          iconButtonElement={
            <IconButton>
              <NavigationMoreVert />
            </IconButton>
          }
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          {React.Children.map(props.children, ((action) => {
            const { children, breakpoint, ...rest } = action.props
            delete rest.iconStyle
            delete rest.tooltipPosition
            delete rest.touch
            const icon = children
            return (
              <MediaQuery key={rest.title} query={`(max-width: ${breakpoint - 1}px)`}>
                <MenuItem
                  primaryText={rest.title}
                  {...rest}
                  leftIcon={icon}
                />
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
export default ActionsMenuCell
