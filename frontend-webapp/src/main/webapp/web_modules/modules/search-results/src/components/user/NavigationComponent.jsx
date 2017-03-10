/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import values from 'lodash/values'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import DatasetLibrary from 'material-ui/svg-icons/image/collections-bookmark'
import DataLibrary from 'material-ui/svg-icons/av/library-books'
import {SearchResultsTargetsEnum} from '@regardsoss/model'
import {themeContextType} from '@regardsoss/theme'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

/**
 * Component to display navigation bar
 *
 * @author Sébastien binda
 */
class NavigationComponent extends React.Component {

  static propTypes = {
    navigationContext: React.PropTypes.arrayOf(React.PropTypes.string),
    selectedTarget: React.PropTypes.oneOf(values(SearchResultsTargetsEnum)),
    onChangeTarget: React.PropTypes.func.isRequired,
    selectedDataset: React.PropTypes.object,
  }

  static contextTypes = {
    ...themeContextType
  }

  onClickDatasetTarget = () => {
    this.props.onChangeTarget(SearchResultsTargetsEnum.DATASET_RESULTS)
  }

  onClickDataobjectsTarget = () => {
    this.props.onChangeTarget(SearchResultsTargetsEnum.DATAOBJECT_RESULTS)
  }


  getTitle = () => {
    let homeLabel = "Catalogue"
    if ( SearchResultsTargetsEnum.DATASET_RESULTS === this.props.selectedTarget){
      homeLabel = `${homeLabel} > Jeux de données`
    } else if (this.props.selectedDataset) {
      homeLabel = `${homeLabel} > Jeux de données`
      if (this.props.selectedDataset){
        homeLabel = `${homeLabel} > ${this.props.selectedDataset.label}`
      }
    }

    return (
      <span style={{color: this.context.muiTheme.palette.textColor}}>
        {homeLabel}
      </span>
    )

  }

  renderButtons() {
    return (
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
      }}>
        <abr title="Datasets">
          <FloatingActionButton
            onTouchTap={this.onClickDatasetTarget}
            style={{marginBottom: 10, marginRight: 10}}
            secondary={this.props.selectedTarget === SearchResultsTargetsEnum.DATASET_RESULTS}
          >

            <DatasetLibrary />
          </FloatingActionButton>
        </abr>
        <abr title="Data objects">
          <FloatingActionButton
            onTouchTap={this.onClickDataobjectsTarget}
            style={{marginBottom: 10}}
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
      <div style={{position: 'relative'}}>
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
