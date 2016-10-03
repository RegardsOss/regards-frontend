import * as React from "react"
import { I18nProvider } from "@regardsoss/i18n"
import { Card, CardHeader } from "material-ui/Card"
import { FormattedMessage } from "react-intl"


export const STATES = {
  SELECT_MODELE: "select_modele",
  SELECT_MODELE_DONE: "select_modele_done",
  SELECT_SOURCE: "select_source",
  DONE: "done",
}


interface DatasetCreateProps {
  // From router
  router: any,
  route: any,
  params: any
}
/**
 */
export default class CollectionCreateContainer extends React.Component<DatasetCreateProps, any> {


  render (): JSX.Element {
    const {params} = this.props
    console.log(params)
    return (
      <I18nProvider messageDir='modules/admin-data-management/src/i18n'>
        <Card
          initiallyExpanded={true}>
          <CardHeader
            title={<FormattedMessage id="userlist.header"/>}
            actAsExpander={true}
            showExpandableButton={false}
          />
          <h1>Dataset collection creation</h1>
        </Card>
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

