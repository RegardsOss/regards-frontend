/**
 * LICENSE_PLACEHOLDER
 **/
import { DataManagementShapes } from '@regardsoss/shape'
import { ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType, I18nProvider } from '@regardsoss/i18n'
import EntitiesAttributesFormComponent from '../components/EntitiesAttributesFormComponent'

/**
 * Form component to edit datasets/collection attributes that the admin has to define.
 */
export class EntitiesAttributesFormContainer extends React.Component {

  static propTypes = {
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    isDisplayAttributeValue: PropTypes.bool.isRequired,
    isEditing: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { modelAttributeList, isDisplayAttributeValue, isEditing } = this.props
    return (
      <ShowableAtRender show={isDisplayAttributeValue}>
        <I18nProvider messageDir="business-common/admin-data-entities-attributes-management/src/i18n">
          <EntitiesAttributesFormComponent
            modelAttributeList={modelAttributeList}
            isEditing={isEditing}
          />
        </I18nProvider>
      </ShowableAtRender>
    )
  }
}


export default EntitiesAttributesFormContainer
