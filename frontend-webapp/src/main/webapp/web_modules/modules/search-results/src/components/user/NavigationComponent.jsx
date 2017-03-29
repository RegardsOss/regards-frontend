/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
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
    selectedTarget: React.PropTypes.oneOf(values(SearchResultsTargetsEnum)),
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


  onClickDatasetsView = () => {
    this.props.onUnselectDataset(SearchResultsTargetsEnum.DATASET_RESULTS)
  }

  onClickDataobjectsView = () => {
    this.props.onUnselectDataset(SearchResultsTargetsEnum.DATAOBJECT_RESULTS)
  }


  getTitle = () => {
    const catalogStyle = {
      cursor: 'pointer',
      color: this.state.catalogHover ? this.context.muiTheme.palette.accent1Color : this.context.muiTheme.palette.textColor,
      backgroundColor: 'transparent',
      border: 'none',
      padding: '0!important',
      font: 'inherit',
    }

    const datasetStyle = {
      cursor: 'pointer',
      color: this.state.datasetsHover ? this.context.muiTheme.palette.accent1Color : this.context.muiTheme.palette.textColor,
      backgroundColor: 'transparent',
      border: 'none',
      padding: '0!important',
      font: 'inherit',
    }
    const homeLabel = (
      <button
        style={catalogStyle}
        onClick={this.onClickDataobjectsView}
        onMouseOver={() => this.setState({ catalogHover: true })}
        onMouseOut={() => this.setState({ catalogHover: false })}
      >
        <FormattedMessage id="navigation.dataobjects.label" />
      </button>
    )
    let dataSetsLabel = null
    let datasetLabel = null
    if (SearchResultsTargetsEnum.DATASET_RESULTS === this.props.selectedTarget) {
      dataSetsLabel = (
        <button
          style={datasetStyle}
          onClick={this.onClickDatasetsView}
          onMouseOver={() => this.setState({ datasetsHover: true })}
          onMouseOut={() => this.setState({ datasetsHover: false })}
        >
          <FormattedMessage id="navigation.datasets.label" />
        </button>
      )
    } else if (this.props.selectedDataset && this.props.selectedDataset.content) {
      dataSetsLabel = (
        <button
          style={datasetStyle}
          onClick={this.onClickDatasetsView}
          onMouseOver={() => this.setState({ datasetsHover: true })}
          onMouseOut={() => this.setState({ datasetsHover: false })}
        >
          <FormattedMessage id="navigation.datasets.label" />
        </button>
      )
      if (this.props.selectedDataset && this.props.selectedDataset.content) {
        datasetLabel = this.props.selectedDataset.content.label
      }
    }

    datasetLabel = datasetLabel ? <span><LabelIcon style={{ verticalAlign: 'text-bottom' }} /> {datasetLabel}</span> : null
    dataSetsLabel = dataSetsLabel ?
      <span><LabelIcon style={{ verticalAlign: 'text-bottom' }} /> {dataSetsLabel}</span> : null

    return (
      <span style={{ color: this.context.muiTheme.palette.textColor }}>
        {homeLabel} {dataSetsLabel} {datasetLabel}
      </span>
    )
  }

  render() {
    return <CardTitle title={this.getTitle()} />
  }

}

export default NavigationComponent
