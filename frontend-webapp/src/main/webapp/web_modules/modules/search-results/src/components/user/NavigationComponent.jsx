/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
import { FormattedMessage } from 'react-intl'
import LabelIcon from 'material-ui/svg-icons/action/label'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import DatasetLibrary from 'material-ui/svg-icons/image/collections-bookmark'
import DataLibrary from 'material-ui/svg-icons/av/library-books'
import { SearchResultsTargetsEnum, CatalogEntity } from '@regardsoss/model'
import { themeContextType } from '@regardsoss/theme'
import { Card, CardTitle } from 'material-ui/Card'

/**
 * Component to display navigation bar
 *
 * @author Sébastien binda
 */
class NavigationComponent extends React.Component {

  static propTypes = {
    selectedTarget: React.PropTypes.oneOf(values(SearchResultsTargetsEnum)),
    onChangeTarget: React.PropTypes.func.isRequired,
    onUnselectDataset: React.PropTypes.func.isRequired,
    selectedDataset: CatalogEntity,
  }

  static contextTypes = {
    ...themeContextType,
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
    return (
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        <abr title="Datasets">
          <FloatingActionButton
            onTouchTap={this.onClickDatasetTarget}
            style={{ marginBottom: 10, marginRight: 10 }}
            secondary={this.props.selectedTarget === SearchResultsTargetsEnum.DATASET_RESULTS}
          >

            <DatasetLibrary />
          </FloatingActionButton>
        </abr>
        <abr title="Data objects">
          <FloatingActionButton
            onTouchTap={this.onClickDataobjectsTarget}
            style={{ marginBottom: 10 }}
            secondary={this.props.selectedTarget === SearchResultsTargetsEnum.DATAOBJECT_RESULTS}
          >
            <DataLibrary />
          </FloatingActionButton>
        </abr>
      </div>
    )
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Card>
          <CardTitle
            title={this.getTitle()}
          />
        </Card>
        {this.renderButtons()}
      </div>
    )
  }

}

export default NavigationComponent
