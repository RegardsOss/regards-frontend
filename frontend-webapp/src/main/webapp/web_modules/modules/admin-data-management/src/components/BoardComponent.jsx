import { Card, CardText } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { map } from 'lodash'
import CardActions from 'material-ui/Card/CardActions'
import AddIcon from 'material-ui/svg-icons/content/add-circle'
import ViewLinesIcon from 'material-ui/svg-icons/action/view-headline'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up'
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import RaisedButton from 'material-ui/RaisedButton'

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

  getCollectionCreate = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/datamanagement/collection/create`
  }
  getCollectionList = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/datamanagement/collection`
  }
  getDatasetCreate = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/datamanagement/dataset/create`
  }
  getDatasetList = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/datamanagement/dataset`
  }
  getDatasetModelList = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/datamanagement/datasetmodel`
  }
  getDatasetModelCreate = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/datamanagement/datasetmodel/create`
  }
  getModelList = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/data/model/list`
  }
  getModelCreate = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/data/model/create`
  }
  getAttributeModelList = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/data/attribute/model/list`
  }
  getAttributeModelCreate = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/data/attribute/model/create`
  }
  getDatasourceList = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/datamanagement/datasource`
  }
  getDatasourceCreate = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/datamanagement/datasource/create`
  }
  getConnectionList = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/datamanagement/connection`
  }
  getConnectionCreate = () => {
    const { projectName } = this.props
    return `/admin/${projectName}/datamanagement/connection/create`
  }

  handleToggleAdvanced = () => {
    const { showAdvanced } = this.state
    this.setState({
      showAdvanced: !showAdvanced,
    })
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
            <IconButton tooltip={this.context.intl.formatMessage({ id: 'datamanagement.action.list.tooltip' })}>
              <ViewLinesIcon />
            </IconButton>
          </Link>

          <Link
            to={element.pathCreate}
            style={linkStyle}
          >
            <IconButton tooltip={this.context.intl.formatMessage({ id: 'datamanagement.action.add.tooltip' })}>
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
    const elementsCommon = [
    ]
    elementsCommon.push({
      title: (<FormattedMessage id="data.board.model.title" />),
      description: (<FormattedMessage id="data.board.model.description" />),
      pathList: this.getModelList(),
      pathCreate: this.getModelCreate(),
    })
    elementsCommon.push({
      title: (<FormattedMessage id="data.board.attributemodel.title" />),
      description: (<FormattedMessage id="data.board.attributemodel.description" />),
      pathList: this.getAttributeModelList(),
      pathCreate: this.getAttributeModelCreate(),
    })
    if (this.state.showAdvanced) {
      elementsCommon.push({
        title: (<FormattedMessage id="datamanagement.collection" />),
        description: (<FormattedMessage id="datamanagement.collection.info" />),
        pathList: this.getCollectionList(),
        pathCreate: this.getCollectionCreate(),
      })
      elementsCommon.push({
        title: (<FormattedMessage id="datamanagement.dataset" />),
        description: (<FormattedMessage id="datamanagement.dataset.info" />),
        pathList: this.getDatasetList(),
        pathCreate: this.getDatasetCreate(),
      })
      elementsCommon.push({
        title: (<FormattedMessage id="data.board.datasource.title" />),
        description: (<FormattedMessage id="data.board.datasource.description" />),
        pathList: this.getConnectionList(),
        pathCreate: this.getConnectionCreate(),
      })
    }
    const labelToggleAdvanced = this.state.showAdvanced ?
      <FormattedMessage id="datamanagement.action.hideAdvanced" /> :
      <FormattedMessage id="datamanagement.action.showAdvanced" />
    const iconToggleAdvanced = this.state.showAdvanced ?
      <KeyboardArrowUp /> :
      <KeyboardArrowDown />
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
        <div
          className={style.action.classes}
          style={style.action.styles}
        >
          <RaisedButton
            label={labelToggleAdvanced}
            primary
            icon={iconToggleAdvanced}
            onTouchTap={this.handleToggleAdvanced}
          />
        </div>
      </div>
    )
  }
}


export default BoardComponent
