
import { I18nProvider } from '@regardsoss/i18n'
import ConnectionListComponent from '../components/list/ConnectionListComponent'
import { connect } from 'react-redux'
/*
interface ConnectionListProps {
  // From router
  params: any

  // From mapStateToProps
  connections?: Array<Connection>
}*/


/**
 */
class ConnectionListContainer extends React.Component {

  getBackUrl = () => {
    const projectName = this.props.params.project
    return `/admin/${projectName}/datamanagement`
  }

  getCreateUrl = () => {
    const projectName = this.props.params.project
    return `/admin/${projectName}/datamanagement/connection/create`
  }

  render() {
    const { connections } = this.props
    return (
      <div>
        <I18nProvider messageDir="modules/admin-data-management/src/i18n">
          <ConnectionListComponent
            getBackUrl={this.getBackUrl}
            getCreateUrl={this.getCreateUrl}
            connections={connections}
          />
        </I18nProvider>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  // const connections = ConnectionSelectors.getConnections(state)
  // return {
  //   connections
  // }
  return {}
}
export default connect(mapStateToProps, null)(ConnectionListContainer)
