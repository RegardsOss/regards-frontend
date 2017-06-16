/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import has from 'lodash/has'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { DataManagementShapes } from '@regardsoss/shape'
import { RenderTextField, RenderSelectField, RenderFileField, Field, ErrorTypes } from '@regardsoss/form-utils'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { I18nProvider } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { getFullQualifiedAttributeName } from '@regardsoss/domain/dam'
import EntitiesAttributesFormComponent from '../components/EntitiesAttributesFormComponent'

/**
 * Form component to edit datasets/collection attributes that the admin has to define.
 */
export class EntitiesAttributesFormContainer extends React.Component {

  static propTypes = {
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    isDisplayAttributeValue: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { modelAttributeList, isDisplayAttributeValue } = this.props
    return (
      <ShowableAtRender show={isDisplayAttributeValue}>
        <I18nProvider messageDir="business-common/admin-data-entities-attributes-management/src/i18n">
          <EntitiesAttributesFormComponent
            modelAttributeList={modelAttributeList}
          />
        </I18nProvider>
      </ShowableAtRender>
    )
  }
}


export default EntitiesAttributesFormContainer
