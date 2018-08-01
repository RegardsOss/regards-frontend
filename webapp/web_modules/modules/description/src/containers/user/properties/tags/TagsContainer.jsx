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
import isNil from 'lodash/isNil'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { CatalogDomain, DamDomain } from '@regardsoss/domain'
import { CatalogClient } from '@regardsoss/client'
import { CatalogShapes } from '@regardsoss/shape'
import { StringComparison } from '@regardsoss/form-utils'
import { ModuleConfiguration } from '../../../../shapes/ModuleConfiguration'
import TagsComponent from '../../../../components/user/properties/tags/TagsComponent'

// get a local instance of search entity actions (will not be used through reducer)
const searchEntityActions = new CatalogClient.SearchEntityActions('description/search-entity', true)

/**
 * Tags container: handles entity tag: split simple tags and URN (entity) tag, resolves entities to show label instead of URN
 * @author Raphaël Mechali
 */
export class TagsContainer extends React.Component {
  static mapDispatchToProps = dispatch => ({
    // entity loading
    dispatchGetEntity: ipId => dispatch(searchEntityActions.getEntity(ipId)),
  })

  static propTypes = {
    moduleConf: ModuleConfiguration.isRequired, // complete module configuration
    // eslint-disable-next-line react/no-unused-prop-types
    entity: CatalogShapes.Entity, // used only in onPropertiesChanged
    onSearchTag: PropTypes.func,
    // from mapDispatchToProps
    dispatchGetEntity: PropTypes.func.isRequired,
    // should show tags
    showTags: PropTypes.bool.isRequired,
    // should show linked documents?
    showLinkedDocuments: PropTypes.bool.isRequired,
  }

  static DEFAULT_STATE = {
    loading: false,
    simpleTags: [], // String array. Simple tags list sorted alphabetically
    entityTags: [], // CatalogShapes.Entity array. Resolved related entities, sorted alphabetically on their label
    documentTags: [], // CatalogShapes.Entity array. Resolved related documents, sorted alphabetically on their label
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesChanged({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesChanged = (oldProps, newProps) => {
    const oldState = this.state
    const newState = { ...TagsContainer.DEFAULT_STATE }
    if (!isEqual(oldProps.entity, newProps.entity)) {
      // update tags list
      if (newProps.entity) {
        // 1 - make tags partition
        const tagPartitions = newProps.entity.content.tags.reduce(({ simpleTags, urnTags }, tag) =>
          CatalogDomain.isURNTag(tag) ?
            { simpleTags, urnTags: [...urnTags, tag] } :
            { simpleTags: [...simpleTags, tag], urnTags }, { simpleTags: [], urnTags: [] })
        // 2 - sort and store simple tags
        tagPartitions.simpleTags = tagPartitions.simpleTags.filter(t => !isNil(t))
        tagPartitions.simpleTags.sort(StringComparison.compare)
        newState.simpleTags = tagPartitions.simpleTags
        // 3 - if there are any related entities resolve them (as long as tags are shown)
        if (tagPartitions.urnTags.length && (newProps.showTags || newProps.showLinkedDocuments)) {
          newState.loading = true
          this.resolveURNTags(tagPartitions.urnTags)
            .then(({ entityTags, documentTags }) => this.setState({ loading: false, entityTags, documentTags }))
        }
      }
    }

    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  /**
   * Builds a promise to resolve URN tags as parameter.
   * When a tag loading fails, it just continues to the next, ignoring the error (as it may be natural, since all user
   * cannot access all entities)
   * @param tags : URN string array, length >= 1
   * @return resolution promise. When promise resolves, it provides sorted entities (maybe empty)
   */
  resolveURNTags = (tags) => {
    const { dispatchGetEntity } = this.props
    return new Promise((resolve) => {
      // promise resolution
      const resolved = []
      const terminatePromise = () => {
        // 1 - sort alpha the entities resolved
        resolved.sort((e1, e2) => StringComparison.compare(e1.content.label, e2.content.label))
        // 2 - split entities (separate documents), keep previous order
        const { eT: entityTags, dT: documentTags } = resolved.reduce(({ eT, dT }, entity) => {
          if (entity.content.entityType === DamDomain.ENTITY_TYPES_ENUM.DOCUMENT) {
            return { eT, dT: [...dT, entity] }
          }
          return { eT: [...eT, entity], dT }
        }, { eT: [], dT: [] })
        resolve({ entityTags, documentTags })
      }

      // recursive resolver
      const recursiveResolver = ([tag, ...remainingTags]) => {
        // Compute next operation: next tag or exit main promise with resolved list?
        const afterPromise = remainingTags.length ? () => recursiveResolver(remainingTags) : terminatePromise
        // Fetch server entity
        dispatchGetEntity(tag).then(({ payload: currentEntity, error }) => {
          if (!error && currentEntity) { // note: if fetching failed, error is true
            resolved.push(currentEntity)
          }
          afterPromise()
        }).catch(afterPromise) // ignore corresponding tag
      }
      // run promise
      recursiveResolver(tags)
    })
  }


  render() {
    const {
      loading, simpleTags, entityTags, documentTags,
    } = this.state
    const {
      moduleConf, showTags, showLinkedDocuments, onSearchTag,
    } = this.props

    if (!showTags && !showLinkedDocuments) {
      return null
    }

    return (
      <TagsComponent
        moduleConf={moduleConf}
        loading={loading}
        simpleTags={simpleTags}
        entityTags={entityTags}
        documentTags={documentTags}
        showTags={showTags}
        showLinkedDocuments={showLinkedDocuments}
        onSearchTag={onSearchTag}
      />
    )
  }
}
export default connect(
  null,
  TagsContainer.mapDispatchToProps,
)(TagsContainer)