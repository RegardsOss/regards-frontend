/**
* LICENSE_PLACEHOLDER
**/
import { CatalogShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { Breadcrumb } from '@regardsoss/components'

/**
* Description breadcrumb view component
*/
class NavigationComponent extends React.Component {

  static propTypes = {
    // all entities in current description path
    descriptionPath: PropTypes.arrayOf(CatalogShapes.Entity),
    onEntitySelected: PropTypes.func.isRequired, // on breadcrumb entity selected (entity, index) => void
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Entity label generator for breadcrumb
   * @param entity entity
   * @param level entity level in breadcrumb
   */
  getEntityLabel = (entity, level) => {
    const { intl: { formatMessage } } = this.context
    const entityLabel = entity.content.label
    return level ? entityLabel : formatMessage({ id: 'description.breadcrumb.root' }, { entityLabel })
  }


  render() {
    const { descriptionPath, onEntitySelected } = this.props
    return (

      <Breadcrumb elements={descriptionPath} labelGenerator={this.getEntityLabel} onAction={onEntitySelected} />
    )
  }
}
export default NavigationComponent
