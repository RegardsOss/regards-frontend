/**
 * LICENSE_PLACEHOLDER
 **/
import { map, forEach, keys } from 'lodash'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { Datasource, Model, ModelAttribute } from '@regardsoss/model'
import { RenderTextField, RenderSelectField, Field, ErrorTypes } from '@regardsoss/form-utils'
import { ReduxConnectedForm } from '@regardsoss/redux'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import DatasourceStepperComponent from './DatasourceStepperComponent'

export class DatasourceFormMappingComponent extends React.Component {

  static propTypes = {
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }


  render() {
    return (
      <div>
        Allloooo
      </div>
    )
  }
}


export default DatasourceFormMappingComponent

