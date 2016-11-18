import MenuContainer from '../menu/containers/MenuContainer'

/**
 * React component to manage Administration application.
 * This component displays the portail layout
 */
class PortalLayout extends React.Component {
  /**
   * @type {{content: *}}
   */
  static propTypes = {
    children: React.PropTypes.element.isRequired,
  }

  /**
   * @type {{muiTheme: *}}
   */
  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  }

  /**
   * Extract the required keys from the context theme
   * @param context
   * @returns {{app: {classes: (*|string), styles: *}, bodyContainer: {classes: (*|string), styles: *}, contentContainer: {classes: (*|string), styles: *}}}
   */
  extractThemeFromContext = context => ({
    app: {
      classes: context.muiTheme.portalApp.layout.app.classes.join(' '),
      styles: context.muiTheme.portalApp.layout.app.styles,
    },
    bodyContainer: {
      classes: context.muiTheme.portalApp.layout.bodyContainer.classes.join(' '),
      styles: context.muiTheme.portalApp.layout.bodyContainer.styles,
    },
    contentContainer: {
      classes: context.muiTheme.portalApp.layout.contentContainer.classes.join(' '),
      styles: context.muiTheme.portalApp.layout.contentContainer.styles,
    },
  })

  /**
   * @returns {React.Component}
   */
  render() {
    const { children } = this.props
    const style = this.extractThemeFromContext(this.context)
    return (
      <div className={style.app.classes} style={style.app.styles}>
        <MenuContainer />
        <div className={style.bodyContainer.classes} style={style.bodyContainer.styles}>
          <div className={style.contentContainer.classes} style={style.contentContainer.styles}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}
export default PortalLayout
