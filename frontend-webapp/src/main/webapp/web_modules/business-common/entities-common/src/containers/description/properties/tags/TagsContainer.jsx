/**
* LICENSE_PLACEHOLDER
**/
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { isURNTag } from '@regardsoss/domain/catalog'
import { CatalogShapes } from '@regardsoss/shape'
import { StringComparison } from '@regardsoss/form-utils'
import { actions as searchEntityActions } from '../../../../clients/SearchEntityClient'
import DescriptionLevelActions from '../../../../model/description/DescriptionLevelActions'
import { DescriptionLevelSelectors } from '../../../../model/description/DescriptionLevelSelectors'
import TagsComponent from '../../../../components/description/properties/tags/TagsComponent'

/**
* Tags container: handles entity tag: split simple tags and URN (entity) tag, resolves entities to show label instead of URN
*/
export class TagsContainer extends React.Component {

  static mapDispatchToProps = dispatch => ({
    // entity loading
    dispatchGetEntity: ipId => dispatch(searchEntityActions.getEntity(ipId)),
  })

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    entity: CatalogShapes.Entity,
    // eslint-disable-next-line react/no-unused-prop-types
    onSearchTag: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    levelActions: PropTypes.instanceOf(DescriptionLevelActions).isRequired,
    levelSelectors: PropTypes.instanceOf(DescriptionLevelSelectors).isRequired,
    // from mapDispatchToProps
    dispatchGetEntity: PropTypes.func.isRequired,
  }

  static DEFAULT_STATE = {
    loading: false,
    simpleTags: [], // String array. Simple tags list sorted alphabetically
    entityTags: [], // CatalogShapes.Entity array. Resolved Related entities, sorted alphabetically on their label
  }

  componentWillMount = () => this.onPropertiesChanges({}, this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesChanges(this.props, nextProps)

  onPropertiesChanges = (oldProps, newProps) => {
    const oldState = this.state
    const newState = { ...TagsContainer.DEFAULT_STATE }
    if (!isEqual(oldProps.entity, newProps.entity)) {
      // update tags list
      if (newProps.entity) {
        // 1 - make tags partition
        const tagPartitions = newProps.entity.content.tags.reduce(({ simpleTags, urnTags }, tag) => isURNTag(tag) ?
          { simpleTags, urnTags: [...urnTags, tag] } :
          { simpleTags: [...simpleTags, tag], urnTags }, { simpleTags: [], urnTags: [] })
        // 2 - sort and store simple tags
        tagPartitions.simpleTags.sort(StringComparison.compare)
        newState.simpleTags = tagPartitions.simpleTags
        // 3 - if there are any related entities resolve them
        if (tagPartitions.urnTags.length) {
          newState.loading = true
          this.resolveURNTags(tagPartitions.urnTags)
            .then(entityTags => this.setState({ loading: false, entityTags }))
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
        resolved.sort((e1, e2) => StringComparison.compare(e1.content.label, e2.content.label))
        resolve(resolved)
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
    const { loading, simpleTags, entityTags } = this.state
    const { onSearchTag, levelActions, levelSelectors } = this.props
    return (
      <TagsComponent
        loading={loading}
        simpleTags={simpleTags}
        entityTags={entityTags}
        onSearchTag={onSearchTag}
        levelActions={levelActions}
        levelSelectors={levelSelectors}
      />
    )
  }
}
export default connect(
  null,
  TagsContainer.mapDispatchToProps)(TagsContainer)
