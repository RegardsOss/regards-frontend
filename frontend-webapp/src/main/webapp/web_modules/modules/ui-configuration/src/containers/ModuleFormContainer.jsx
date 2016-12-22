/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardText } from 'material-ui/Card'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import connect from '@regardsoss/redux'
import { ModuleShape } from '@regardsoss/modules'
import ModulesActions from '../model/modules/ModulesActions'
import ModulesSelector from '../model/modules/ModulesSelector'

/**
 * React component to display a edition form for Module entity
 */
class ModuleContainer extends React.Component {

  static propTypes = {
    // From react router
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      application_id: React.PropTypes.string,
      module_id: React.PropTypes.string,
    }),
    fetchModule: React.PropTypes.func,
    isFetching: React.PropTypes.bool,
    module: ModuleShape,
  }

  componentWillMount() {
    if (this.props.params.module_id) {
      this.props.fetchModule(this.props.params.application_id, this.props.params.module_id)
    }
  }

  render() {
    if (this.props.params.module_id && !this.props.module && this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    if (this.props.params.module_id && !this.props.module) {
      return (<FormEntityNotFoundComponent />)
    }

    return (
      <Card>
        <CardText>Edition du module {this.props.module ? this.props.module.id : 'nouveau'}</CardText>
      </Card>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  module: ownProps.params.module_id ? ModulesSelector.getContentById(state, ownProps.params.module_id) : null,
  isFetching: ModulesSelector.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchModule: (applicationId, moduleId) => dispatch(ModulesActions.fetchEntity(moduleId, dispatch, [applicationId])),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)
