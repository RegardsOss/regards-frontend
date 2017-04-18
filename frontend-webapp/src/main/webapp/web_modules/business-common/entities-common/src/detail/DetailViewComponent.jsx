/**
* LICENSE_PLACEHOLDER
**/
import isEmpty from 'lodash/isEmpty'
import { AttributeModel, CatalogEntity } from '@regardsoss/model'

/**
* Shows Component detail view.
* - visible: currently visible ? (avoids the need to unmount the component)
* - entity: entity to show as described by CatalogEntity. Null / undefined allowed when hidden
* - attributeModelList: entity attribute model descriptors, object of AttributeModel, as fetched by AttributeModelActions. Null / undefined allowed when hidden
*/
class DetailViewComponent extends React.Component {

  static propTypes = {
    visible: React.PropTypes.bool.isRequired,
    entity: CatalogEntity, // entity, or undefined / null / empty object if not shown
    attributeModelList: React.PropTypes.objectOf(AttributeModel), // attributes, or undefined / null / empty object if not shown
  }

  componentWillReceiveProps = ({ visible, entity, attributeModelList }) => {
    this.state.shown = visible && !isEmpty(entity) && !isEmpty(attributeModelList)
  }


  render() {
    return (
      <div />
    )
  }
}
export default DetailViewComponent
