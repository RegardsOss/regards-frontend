/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from 'react-redux'
import { logout } from '@regardsoss/authentication'
import { themeContextType } from '@regardsoss/theme'

export class UserLayout extends React.Component {

  static contextTypes = {
    ...themeContextType,
  }

  static propTypes = {
    content: React.PropTypes.element,
        // from router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
        // from mapDispatchToProps
    onLogout: React.PropTypes.func,
  }

  constructor() {
    super()
    this.state = { instance: false }
  }

  /**
   * Extract the required keys from the context theme
   * @param context
   * @returns {{app: {classes: (*|string), styles: *}, bodyContainer: {classes: (*|string), styles: *}, contentContainer: {classes: (*|string), styles: *}}}
   */
  extractThemeFromContext = context => ({
    app: {
      classes: context.muiTheme.userApp.layout.app.classes.join(' '),
      styles: context.muiTheme.userApp.layout.app.styles,
    },
    footer: {
      classes: context.muiTheme.userApp.layout.footerContainer.classes.join(' '),
      styles: context.muiTheme.userApp.layout.footerContainer.styles,
    },
    header: {
      classes: context.muiTheme.userApp.layout.headerContainer.classes.join(' '),
      styles: context.muiTheme.userApp.layout.headerContainer.styles,
    },
    body: {
      classes: context.muiTheme.userApp.layout.bodyContainer.classes.join(' '),
      styles: context.muiTheme.userApp.layout.bodyContainer.styles,
    },
  })

  render() {
    const style = this.extractThemeFromContext(this.context)

    // get modules form backend name/container/conf
    // name -> Composent React from ModulesFactory module
    // container -> select container to display module
    // conf -> module internal configuration

    // Loop on context.muiTheme.userApp.layout to retrieve containers

    return (
      <div className={style.app.classes} style={style.app.styles}>
        <div className={style.footer.classes} style={style.footer.styles}><FooterModuke conf={maConf} /></div>
        <div className={style.header.classes} style={style.header.styles}> header module</div>
        <div className={style.body.classes} style={style.body.styles}> conent module</div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(logout()),
})

export default connect(null, mapDispatchToProps)(UserLayout)
