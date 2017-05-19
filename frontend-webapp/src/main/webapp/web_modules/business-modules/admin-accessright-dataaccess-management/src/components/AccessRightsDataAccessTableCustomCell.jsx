import find from 'lodash/find'
import { Dataset, AccessRight, AccessGroup } from '@regardsoss/model'
import AccessRightsEnum from './AccessRightsEnum'

class AccessRightsDataAccessTableCustomCell extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    attributes: PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.number,
    }),
    accessRights: PropTypes.objectOf(AccessRight),
    // eslint-disable-next-line react/forbid-prop-types
    intl: PropTypes.object,
    // eslint-disable-next-line react/no-unused-prop-types
    entity: Dataset,
    // eslint-disable-next-line react/no-unused-prop-types
    lineHeight: PropTypes.number.isRequired,
  }

  static NOT_APPLICABLE = 'NOT_APPLICABLE'

  render() {
    const accessRight = find(this.props.accessRights, ar => ar.content.dataset.id === this.props.entity.content.id)
    const metaAccessLevel = accessRight && accessRight.content && accessRight.content.accessLevel ? accessRight.content.accessLevel : AccessRightsEnum.METADATA_ACCESS_ENUM.NO_ACCESS
    let accessLevel = AccessRightsDataAccessTableCustomCell.NOT_APPLICABLE
    if (metaAccessLevel === AccessRightsEnum.METADATA_ACCESS_ENUM.DATASET_AND_OBJECT_ACCESS) {
      accessLevel = accessRight && accessRight.content && accessRight.content.dataAccessRight && accessRight.content.dataAccessRight.dataAccessLevel ?
        accessRight.content.dataAccessRight.dataAccessLevel : AccessRightsEnum.DATA_ACCESS_ENUM.NO_ACCESS
    }
    return (
      <span>{this.props.intl.formatMessage({ id: `accessright.form.data.accessLevel.${accessLevel}` })}</span>
    )
  }
}

export default AccessRightsDataAccessTableCustomCell
