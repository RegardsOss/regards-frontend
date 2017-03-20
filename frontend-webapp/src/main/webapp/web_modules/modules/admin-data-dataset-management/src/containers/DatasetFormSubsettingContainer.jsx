/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { Dataset, ModelAttribute } from '@regardsoss/model'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import ModelAttributeActions from '../model/ModelAttributeActions'
import ModelAttributeSelectors from '../model/ModelAttributeSelectors'
import DatasetFormSubsettingComponent from '../components/DatasetFormSubsettingComponent'

/**
 * Show the dataset form
 */
export class DatasetFormSubsettingContainer extends React.Component {

  static propTypes = {
    currentDataset: Dataset,
    handleBack: React.PropTypes.func.isRequired,
    handleSave: React.PropTypes.func.isRequired,
    isEditing: React.PropTypes.bool.isRequired,
    // from mapStateToProps
    modelAttributeList: React.PropTypes.objectOf(ModelAttribute),
    // from mapDispatchToProps
    fetchModelAttributeList: React.PropTypes.func,
  }


  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    // Fetch attributes from the Datasource model
    Promise.resolve(this.props.fetchModelAttributeList(this.props.currentDataset.content.dataModel))
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  handleTestSubsetting = (formValues) => {
    console.log("Let's test subsetting", formValues)
  }

  render() {
    const { currentDataset, handleBack, handleSave, isEditing, modelAttributeList } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (<DatasetFormSubsettingComponent
            currentDataset={currentDataset}
            handleBack={handleBack}
            onSubmit={handleSave}
            handleTestSubsetting={this.handleTestSubsetting}
            modelAttributeList={modelAttributeList}
            isEditing={isEditing}
          />)
          }
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  modelAttributeList: ModelAttributeSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchModelAttributeList: id => dispatch(ModelAttributeActions.fetchEntityList({ id })),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetFormSubsettingContainer)
