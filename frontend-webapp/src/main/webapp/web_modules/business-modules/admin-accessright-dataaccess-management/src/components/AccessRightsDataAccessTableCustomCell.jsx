import find from 'lodash/find'
import { Dataset, AccessGroup } from '@regardsoss/model'
import AccessRightsEnum from './AccessRightsEnum'

class AccessRightsTableCustomCell extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    attributes: PropTypes.shape({
      label: PropTypes.string,
      id: PropTypes.number,
    }),
    accessGroup: AccessGroup.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    intl: PropTypes.object,
    // eslint-disable-next-line react/no-unused-prop-types
    entity: Dataset,
    // eslint-disable-next-line react/no-unused-prop-types
    lineHeight: PropTypes.number.isRequired,
  }

  render() {
    const accessRight = find(this.props.accessGroup.content.accessRights, ar => ar.dataSet.id === this.props.entity.content.id)
    const metaAccessLevel = accessRight && accessRight.accessLevel ? accessRight.accessLevel : AccessRightsEnum.METADATA_ACCESS_ENUM.NO_ACCESS
    let accessLevel = 'NOT_APPLICABLE'
    if (metaAccessLevel === AccessRightsEnum.METADATA_ACCESS_ENUM.DATASET_AND_OBJECT_ACCESS) {
      accessLevel = accessRight && accessRight.dataAccessRight && accessRight.dataAccessRight.dataAccessLevel ?
        accessRight.dataAccessRight.dataAccessLevel : AccessRightsEnum.DATA_ACCESS_ENUM.NO_ACCESS
    }
    return (
      <span>{this.props.intl.formatMessage({ id: `accessright.form.data.accessLevel.${accessLevel}` })}</span>
    )
  }
}

export default AccessRightsTableCustomCell
