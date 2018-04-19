/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import find from 'lodash/find'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { CatalogShapes } from '@regardsoss/shape'
import DescriptionLevelActions from '../../../../model/description/DescriptionLevelActions'
import { DescriptionLevelSelectors } from '../../../../model/description/DescriptionLevelSelectors'
import TagComponent from '../../../../components/description/properties/tags/TagComponent'
/**
* Entity tag container
*/
export class EntityTagContainer extends React.Component {
  static mapStateToProps = (state, { levelSelectors }) => ({
    descriptionPath: levelSelectors.getCurrentDescriptionPath(state),
  })

  static mapDispatchToProps = (dispatch, { entity, levelActions }) => ({
    dispatchShowDetail: () => dispatch(levelActions.showRelatedEntity(entity)),
  })


  static propTypes = {
    entity: CatalogShapes.Entity.isRequired,
    onSearchTag: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    levelActions: PropTypes.instanceOf(DescriptionLevelActions).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    levelSelectors: PropTypes.instanceOf(DescriptionLevelSelectors).isRequired,
    // from map state to props
    // eslint-disable-next-line react/no-unused-prop-types
    descriptionPath: PropTypes.arrayOf(CatalogShapes.Entity),
    // from mapDispatchToProps
    dispatchShowDetail: PropTypes.func.isRequired,
  }

  componentWillMount = () => this.onPropertiesChange({}, this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesChange(this.props, nextProps)

  onPropertiesChange = ({ descriptionPath: oldPath }, { entity, descriptionPath: newPath }) => {
    const oldState = this.state
    // verify if entity is already in description path (to avoid loops in path)
    const newState = {
      alreadyInPath: !!(newPath || []).find(({ content: { ipId } }) => ipId === entity.content.ipId),
    }
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  onSearchTag = () => {
    const { entity, onSearchTag } = this.props
    if (onSearchTag) {
      onSearchTag({
        type: entity.content.entityType,
        data: entity,
      })
    }
  }

  isDisplayable = () => {
    const modelName = get(this.props.entity, 'content.model.name', null)
    if (modelName) {
      return !find(get(STATIC_CONF, 'ENTITY_DESCRIPTION.TAGS.MODEL_NAME_FILTERS', []), regexp => modelName.match(regexp))
    }
    return true
  }

  render() {
    const { entity, dispatchShowDetail, onSearchTag } = this.props
    const { alreadyInPath } = this.state
    if (!this.isDisplayable()) {
      return null
    }
    return (
      <TagComponent
        tagLabel={entity.content.label}
        onSearchTag={onSearchTag ? this.onSearchTag : null}
        onShowDescription={alreadyInPath ? null : dispatchShowDetail}
        isEntity
      />
    )
  }
}


export default connect(
  EntityTagContainer.mapStateToProps,
  EntityTagContainer.mapDispatchToProps,
)(EntityTagContainer)