/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { CatalogEntity } from '@regardsoss/model'
import DescriptionLevelActions from '../../../model/description/DescriptionLevelActions'
import { DescriptionLevelSelectors } from '../../../model/description/DescriptionLevelSelectors'
import DescriptionBreadcrumbComponent from '../../../components/description/breadcrumb/DescriptionBreadcrumbComponent'

/**
* Description breadcrumb container
*/
export class DescriptionBreadcrumbContainer extends React.Component {

  static mapStateToProps(state, { levelSelectors }) {
    return {
      descriptionPath: levelSelectors.getCurrentDescriptionPath(state),
    }
  }

  static mapDispatchToProps(dispatch, { levelActions }) {
    return {
      dispatchEntitySelected: levelIndex => dispatch(levelActions.jumpToLevel(levelIndex)),
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    levelActions: PropTypes.instanceOf(DescriptionLevelActions).isRequired, // used by mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    levelSelectors: PropTypes.instanceOf(DescriptionLevelSelectors).isRequired, // used by mapStateToProps
    // from mapStateToProps
    descriptionPath: PropTypes.arrayOf(CatalogEntity),
    // from map dispatch to props
    dispatchEntitySelected: PropTypes.func.isRequired,
  }

  onEntitySelected = (entity, index) => this.props.dispatchEntitySelected(index)

  render() {
    const { descriptionPath } = this.props
    return (
      <DescriptionBreadcrumbComponent descriptionPath={descriptionPath} onEntitySelected={this.onEntitySelected} />
    )
  }
}
export default connect(
  DescriptionBreadcrumbContainer.mapStateToProps,
  DescriptionBreadcrumbContainer.mapDispatchToProps)(DescriptionBreadcrumbContainer)
