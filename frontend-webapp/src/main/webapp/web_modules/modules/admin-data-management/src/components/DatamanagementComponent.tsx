import * as React from "react"
import { Card, CardText } from "material-ui/Card"
import { FormattedMessage } from "react-intl"
import { Link } from "react-router"
import { map } from "lodash"
import CardActions from "material-ui/Card/CardActions"
import AddIcon from "material-ui/svg-icons/content/add-circle"
import ViewLinesIcon from "material-ui/svg-icons/action/view-headline"
import IconButton from "material-ui/IconButton"
import KeyboardArrowUp from "material-ui/svg-icons/hardware/keyboard-arrow-up"
import KeyboardArrowDown from "material-ui/svg-icons/hardware/keyboard-arrow-down"
import RaisedButton from "material-ui/RaisedButton"

interface DatamanagementProps {
  params: any,
  theme: any,
  intl: any
}

/**
 * Show the list of users for the current project
 */
class DatamanagementComponent extends React.Component<DatamanagementProps, any> {

  constructor (props: any) {
    super(props)
    this.state = {
      showAdvanced: false
    }
  }

  handleToggleAdvanced = () => {
    const {showAdvanced} = this.state
    this.setState({
      showAdvanced: !showAdvanced
    })
  }

  getCollectionCreate = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/collection/create"
  }
  getCollectionList = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/collection"
  }
  getDatasetCreate = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/dataset/create"
  }
  getDatasetList = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/dataset"
  }
  getDatasetModelList = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/datasetmodel"
  }
  getDatasetModelCreate = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/datasetmodel/create"
  }
  getDatasourceModelList = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/datasourcemodel"
  }
  getDatasourceModelCreate = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/datasourcemodel/create"
  }
  getDatasourceList = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/datasource"
  }
  getDatasourceCreate = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/datasource/create"
  }
  getConnectionList = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/connection"
  }
  getConnectionCreate = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/connection/create"
  }
  renderItem = (element: any, elementStyles: any, elementClasses: string, linkStyle: any) => {
    return (
      <div className={elementClasses} key={element.pathList}>
        <Card
          initiallyExpanded={true}
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
              <IconButton tooltip={this.props.intl.formatMessage({id: "datamanagement.action.list.tooltip"})}>
                <ViewLinesIcon />
              </IconButton>
            </Link>

            <Link
              to={element.pathCreate}
              style={linkStyle}
            >
              <IconButton tooltip={this.props.intl.formatMessage({id: "datamanagement.action.add.tooltip"})}>
                <AddIcon />
              </IconButton>
            </Link>
          </CardActions>
        </Card>
      </div>
    )
  }


  render (): JSX.Element {
    const theme = this.props.theme
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
      links: theme.linkWithoutDecoration
    }
    const elementsCommon = [
      {
        title: (<FormattedMessage id="datamanagement.collection"/>),
        description: (<FormattedMessage id="datamanagement.collection.info"/>),
        pathList: this.getCollectionList(),
        pathCreate: this.getCollectionCreate()
      },
      {
        title: (<FormattedMessage id="datamanagement.dataset"/>),
        description: (<FormattedMessage id="datamanagement.dataset.info"/>),
        pathList: this.getDatasetList(),
        pathCreate: this.getDatasetCreate()
      }
    ]
    if (this.state.showAdvanced) {
      elementsCommon.push({
        title: (<FormattedMessage id="datamanagement.datasourcemodel"/>),
        description: (<FormattedMessage id="datamanagement.model.info"/>),
        pathList: this.getDatasourceModelList(),
        pathCreate: this.getDatasourceModelCreate()
      })
      elementsCommon.push({
        title: (<FormattedMessage id="datamanagement.datasource"/>),
        description: (<FormattedMessage id="datamanagement.datasource.info"/>),
        pathList: this.getDatasourceList(),
        pathCreate: this.getDatasourceCreate()
      })
      elementsCommon.push({
        title: (<FormattedMessage id="datamanagement.connection"/>),
        description: (<FormattedMessage id="datamanagement.connection.info"/>),
        pathList: this.getConnectionList(),
        pathCreate: this.getConnectionCreate()
      })
    }
    const labelToggleAdvanced = this.state.showAdvanced ?
      <FormattedMessage id="datamanagement.action.hideAdvanced"/> :
      <FormattedMessage id="datamanagement.action.showAdvanced"/>
    const iconToggleAdvanced = this.state.showAdvanced ?
      <KeyboardArrowUp /> :
      <KeyboardArrowDown />
    return (
      <div>
        <div
          className={style.section.container.classes}
          style={style.section.container.styles}
        >
          {map(elementsCommon, (element: any, id: string) => {
            return this.renderItem(element, style.section.items.styles, style.section.items.classes, style.links)
          })}
        </div>
        <div
          className={style.action.classes}
          style={style.action.styles}
        >
          <RaisedButton
            label={labelToggleAdvanced}
            primary={true}
            icon={iconToggleAdvanced}
            onTouchTap={this.handleToggleAdvanced}
          />
        </div>
      </div>
    )
  }
}

export default DatamanagementComponent

