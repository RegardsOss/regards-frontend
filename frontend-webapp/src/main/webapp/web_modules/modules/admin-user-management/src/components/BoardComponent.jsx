import { Card, CardText } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { map } from 'lodash'
import CardActions from 'material-ui/Card/CardActions'
import AddIcon from 'material-ui/svg-icons/content/add-circle'
import ViewLinesIcon from 'material-ui/svg-icons/action/view-headline'
import IconButton from 'material-ui/IconButton'
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
/**
 * Show the list of users for the current project
 */
class BoardComponent extends React.Component {
  static propTypes = {
    projectName: React.PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      showAdvanced: false,
    }
  }

  getProjectUserList = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/user/project-user/list`
  }

  getProjectUserCreate = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/user/project-user/create`
  }

  getRoleList = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/user/role/list`
  }

  getRoleCreate = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/user/role/create`
  }

  renderItem = (element, elementStyles, elementClasses, linkStyle) => (
    <div className={elementClasses} key={element.pathList}>
      <Card
        initiallyExpanded
        style={elementStyles}
      >
        <CardText>
          {element.title}
        </CardText>
        <CardText>
          {element.description}
        </CardText>
        <CardActions>
          <Link
            to={element.pathList}
            style={linkStyle}
          >
            <IconButton tooltip={this.context.intl.formatMessage({ id: 'user.board.tooltip.list' })}>
              <ViewLinesIcon />
            </IconButton>
          </Link>

          <Link
            to={element.pathCreate}
            style={linkStyle}
          >
            <IconButton tooltip={this.context.intl.formatMessage({ id: 'user.board.tooltip.add' })}>
              <AddIcon />
            </IconButton>
          </Link>
        </CardActions>
      </Card>
    </div>
  )

  render() {
    const theme = this.context.muiTheme
    const style = {
      section: {
        items: {
          classes: theme.adminApp.datamanagement.home.section1.items.classes.join(' '),
          styles: theme.adminApp.datamanagement.home.section1.items.styles,

        },
        container: {
          classes: theme.adminApp.datamanagement.home.section1.container.classes.join(' '),
          styles: theme.adminApp.datamanagement.home.section1.container.styles,
        },
      },
      action: {
        classes: theme.adminApp.datamanagement.home.action.classes.join(' '),
        styles: theme.adminApp.datamanagement.home.action.styles,
      },
      links: theme.linkWithoutDecoration,
    }
    const elementsCommon = [{
      title: (<FormattedMessage id="user.board.project-user.title" />),
      description: (<FormattedMessage id="user.board.project-user.description" />),
      pathList: this.getProjectUserList(),
      pathCreate: this.getProjectUserCreate(),
    }, {
      title: (<FormattedMessage id="user.board.role.title" />),
      description: (<FormattedMessage id="user.board.role.description" />),
      pathList: this.getRoleList(),
      pathCreate: this.getRoleCreate(),
    }]
    return (
      <div>
        <div
          className={style.section.container.classes}
          style={style.section.container.styles}
        >
          {map(elementsCommon, element => (
            this.renderItem(element, style.section.items.styles, style.section.items.classes, style.links)
          ))}
        </div>
      </div>
    )
  }
}


export default BoardComponent

