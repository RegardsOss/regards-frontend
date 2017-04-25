/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage } from 'react-intl'
import LabelIcon from 'material-ui/svg-icons/action/label'
import { CardTitle } from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'
import { SearchResultsTargetsEnum, CatalogEntity } from '@regardsoss/model'

/**
 * Component to display navigation bar
 *
 * @author Sébastien binda
 */
class NavigationComponent extends React.Component {

  static propTypes = {
    onUnselectDataset: React.PropTypes.func.isRequired,
    onUnselectAll: React.PropTypes.func.isRequired,
    selectedDataset: CatalogEntity,
    selectedTag: React.PropTypes.string,
    breadcrumbInitialContextLabel: React.PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      catalogHover: false,
      datasetsHover: false,
      tagHover: false,
    }
  }

  onClickCatalog = () => {
    this.props.onUnselectAll()
  }

  onClickTag = () => {
    this.props.onUnselectDataset(SearchResultsTargetsEnum.DATAOBJECT_RESULTS)
  }

  getInitialBreadcrumb = () => {
    const { breadcrumbInitialContextLabel } = this.props
    const { path, pathHover } = this.context.moduleTheme.user.breadcrumb
    const initialBreadcrumb = breadcrumbInitialContextLabel || <FormattedMessage id="navigation.home.label" />

    if (this.props.selectedDataset) {
      return (
        <button
          style={this.state.catalogHover ? pathHover : path}
          onClick={this.onClickCatalog}
          onMouseOver={() => this.setState({ catalogHover: true })}
          onMouseOut={() => this.setState({ catalogHover: false })}
        >
          {initialBreadcrumb}
        </button>
      )
    }
    return (
      <button
        style={path}
        onMouseOver={() => this.setState({ catalogHover: true })}
        onMouseOut={() => this.setState({ catalogHover: false })}
      >
        {initialBreadcrumb}
      </button>
    )
  }


  getTitle = () => {
    const { path, pathHover, separator } = this.context.moduleTheme.user.breadcrumb
    const tagStyle = this.state.tagHover ? pathHover : path

    const initialBreadcrumb = this.getInitialBreadcrumb()
    let datasetLabel = null

    if (this.props.selectedDataset && this.props.selectedDataset.content) {
      if (this.props.selectedDataset && this.props.selectedDataset.content) {
        datasetLabel = this.props.selectedDataset.content.label
      }
    }

    let tagLabel = this.props.selectedTag ? (<button
      style={tagStyle}
      onClick={this.onClickTag}
      onMouseOver={() => this.setState({ tagHover: true })}
      onMouseOut={() => this.setState({ tagHover: false })}
    >
      {this.props.selectedTag}
    </button>) : null

    tagLabel = tagLabel ? <span><LabelIcon style={separator} />{tagLabel}</span> : null
    datasetLabel = datasetLabel ? <span><LabelIcon style={separator} />{datasetLabel}</span> : null

    return (
      <span>
        {initialBreadcrumb}{tagLabel}{datasetLabel}
      </span>
    )
  }

  render() {
    return <CardTitle title={this.getTitle()} />
  }

}

export default NavigationComponent
