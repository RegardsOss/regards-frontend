/**
* LICENSE_PLACEHOLDER
**/
import { TagTypes } from '@regardsoss/domain/catalog'
import TagComponent from '../../../../components/description/properties/tags/TagComponent'

/**
* A simple tag container
*/
class SimpleTagContainer extends React.Component {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    // callback: on search tag (or null)
    onSearchTag: PropTypes.func,
  }

  onSearchTag = () => {
    const { onSearchTag, tag } = this.props
    if (onSearchTag) {
      onSearchTag({
        type: TagTypes.WORD,
        data: tag,
      })
    }
  }

  render() {
    const { onSearchTag, tag } = this.props
    return (
      <TagComponent
        tagLabel={tag}
        onSearchTag={onSearchTag ? this.onSearchTag : null}
        onShowDescription={null}
        isEntity={false}
      />
    )
  }
}
export default SimpleTagContainer
