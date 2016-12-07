
import { I18nProvider } from '@regardsoss/i18n'
import CollectionListComponent from '../components/list/CollectionListComponent'
// const URL_PROJECTS_USERS = "http://localhost:8080/api/users"

/**
 * Show the list of users for the current project
 */
export default class CollectionListContainer extends React.Component {


  getBackUrl = () => {
    const projectName = this.props.params.project
    return `/admin/${projectName}/datamanagement`
  }

  getCreateUrl = () => {
    const projectName = this.props.params.project
    return `/admin/${projectName}/datamanagement/collection/create`
  }

  render() {
    const { collections } = this.props
    return (
      <I18nProvider messageDir="modules/admin-data-management/src/i18n">
        <CollectionListComponent
          getBackUrl={this.getBackUrl}
          getCreateUrl={this.getCreateUrl}
          collections={collections}
        />
      </I18nProvider>
    )
  }
}
CollectionListContainer.propTypes = {
  params: React.PropTypes.objectOf(React.PropTypes.string),
  collections: React.PropTypes.arrayOf(React.PropTypes.string),
}

/*
 const mapStateToProps = (state: any, ownProps: any) => {
 }
 const mapDispatchToProps = (dispatch: any) => ({
 })
 export default connect<{}, {}, DatasetCreateProps>(mapStateToProps, mapDispatchToProps)(DatasetCreateContainer)
 */
