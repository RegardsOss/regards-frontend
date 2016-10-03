import * as React from "react"
import {I18nProvider} from "@regardsoss/i18n"
import { Collection } from "@regardsoss/models"
import CollectionListComponent from "../components/list/CollectionListComponent"
// const URL_PROJECTS_USERS = "http://localhost:8080/api/users"


interface DatasetCreateProps {
  // From router
  params: any

  // From mapStateToProps
  collections: Array<Collection>
}

/**
 * Show the list of users for the current project
 */
export default class CollectionListContainer extends React.Component<DatasetCreateProps, any> {


  getBackUrl = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement"
  }

  getCreateUrl = () => {
    const projectName = this.props.params.project
    return "/admin/" + projectName + "/datamanagement/collection/create"
  }

  render (): JSX.Element {
    const {collections} = this.props
    return (
      <I18nProvider messageDir='modules/admin-data-management/src/i18n'>
        <CollectionListComponent
          getBackUrl={this.getBackUrl}
          getCreateUrl={this.getCreateUrl}
          collections={collections}
        />
      </I18nProvider>
    )
  }
}

/*
 const mapStateToProps = (state: any, ownProps: any) => {
 }
 const mapDispatchToProps = (dispatch: any) => ({
 })
 export default connect<{}, {}, DatasetCreateProps>(mapStateToProps, mapDispatchToProps)(DatasetCreateContainer)
 */
