/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
import { FormattedMessage } from 'react-intl'
import LabelIcon from 'material-ui/svg-icons/action/label'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import DatasetLibrary from 'material-ui/svg-icons/image/collections-bookmark'
import DataLibrary from 'material-ui/svg-icons/av/library-books'
import ShowFacetsSearch from 'material-ui/svg-icons/action/find-in-page'
import { CardTitle } from 'material-ui/Card'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'
import { SearchResultsTargetsEnum, CatalogEntity } from '@regardsoss/model'

/**
 * Component to display navigation bar
 *
 * @author Sébastien binda
 */
class NavigationComponent extends React.Component {

  static propTypes = {
    enableFacettes: React.PropTypes.bool.isRequired,
    selectedTarget: React.PropTypes.oneOf(values(SearchResultsTargetsEnum)),
    onChangeTarget: React.PropTypes.func.isRequired,
    onUnselectDataset: React.PropTypes.func.isRequired,
    showingFacetsSearch: React.PropTypes.bool.isRequired,
    onToggleShowFacetsSearch: React.PropTypes.func.isRequired,
    selectedDataset: CatalogEntity,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  constructor(props) {
    super(props)
    this.state = {
      catalogHover: false,
      datasetsHover: false,
    }
  }

  onClickDatasetTarget = () => {
    this.props.onUnselectDataset()
    this.props.onChangeTarget(SearchResultsTargetsEnum.DATASET_RESULTS)
  }

  onClickDataobjectsTarget = () => {
    this.props.onChangeTarget(SearchResultsTargetsEnum.DATAOBJECT_RESULTS)
  }

  onClickDatasetsView = () => {
    this.onClickDatasetTarget()
  }

  onClickDataobjectsView = () => {
    this.props.onUnselectDataset()
    this.props.onChangeTarget(SearchResultsTargetsEnum.DATAOBJECT_RESULTS)
  }


  getTitle = () => {
    const catalogStyle = {
      cursor: 'pointer',
      color: this.state.catalogHover ? this.context.muiTheme.palette.accent1Color : '',
    }

    const datasetStyle = {
      cursor: 'pointer',
      color: this.state.datasetsHover ? this.context.muiTheme.palette.accent1Color : '',
    }
    const homeLabel = (
      <span
        style={catalogStyle}
        onClick={this.onClickDataobjectsView}
        onMouseOver={() => this.setState({ catalogHover: true })}
        onMouseOut={() => this.setState({ catalogHover: false })}
      >
        <FormattedMessage id="navigation.dataobjects.label" />
      </span>
    )
    let dataSetsLabel = null
    let datasetLabel = null
    if (SearchResultsTargetsEnum.DATASET_RESULTS === this.props.selectedTarget) {
      dataSetsLabel = (
        <span
          style={datasetStyle}
          onClick={this.onClickDatasetsView}
          onMouseOver={() => this.setState({ datasetsHover: true })}
          onMouseOut={() => this.setState({ datasetsHover: false })}
        >
          <FormattedMessage id="navigation.datasets.label" />
        </span>
      )
    } else if (this.props.selectedDataset && this.props.selectedDataset.content) {
      dataSetsLabel = (
        <span
          style={datasetStyle}
          onClick={this.onClickDatasetsView}
          onMouseOver={() => this.setState({ datasetsHover: true })}
          onMouseOut={() => this.setState({ datasetsHover: false })}
        >
          <FormattedMessage id="navigation.datasets.label" />
        </span>
      )
      if (this.props.selectedDataset && this.props.selectedDataset.content) {
        datasetLabel = this.props.selectedDataset.content.label
      }
    }

    datasetLabel = datasetLabel ? <span><LabelIcon style={{ verticalAlign: 'text-bottom' }} /> {datasetLabel}</span> : null
    dataSetsLabel = dataSetsLabel ? <span><LabelIcon style={{ verticalAlign: 'text-bottom' }} /> {dataSetsLabel}</span> : null

    return (
      <span style={{ color: this.context.muiTheme.palette.textColor }}>
        {homeLabel} {dataSetsLabel} {datasetLabel}
      </span>
    )
  }

  renderButtons() {
    const { intl } = this.context
    const { enableFacettes, selectedTarget, onToggleShowFacetsSearch, showingFacetsSearch } = this.props
    return (
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '0',
        }}
      >
        <ShowableAtRender show={enableFacettes && selectedTarget === SearchResultsTargetsEnum.DATAOBJECT_RESULTS}>
          <FloatingActionButton
            title={intl.formatMessage({ id: 'navigation.filter.by.facets' })}
            onTouchTap={onToggleShowFacetsSearch}
            style={{ marginBottom: 10, marginRight: 60 }}
            secondary={showingFacetsSearch}
          >
            <ShowFacetsSearch />
          </FloatingActionButton>
        </ShowableAtRender>
        <FloatingActionButton
          title={intl.formatMessage({ id: 'navigation.datasets.label' })}
          onTouchTap={this.onClickDatasetTarget}
          style={{ marginBottom: 10, marginRight: 10 }}
          secondary={selectedTarget === SearchResultsTargetsEnum.DATASET_RESULTS}
        >
          <DatasetLibrary />
        </FloatingActionButton>
        <FloatingActionButton
          title={intl.formatMessage({ id: 'navigation.dataobjects.label' })}
          onTouchTap={this.onClickDataobjectsTarget}
          style={{ marginBottom: 10, marginRight: 10 }}
          secondary={selectedTarget === SearchResultsTargetsEnum.DATAOBJECT_RESULTS}
        >
          <DataLibrary />
        </FloatingActionButton>
      </div>
    )
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <CardTitle
          title={this.getTitle()}
        >
          {this.renderButtons()}
        </CardTitle>
      </div>
    )
  }

}

export default NavigationComponent
