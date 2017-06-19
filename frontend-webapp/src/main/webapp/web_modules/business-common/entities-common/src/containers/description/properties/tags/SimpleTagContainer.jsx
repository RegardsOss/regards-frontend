/**
* LICENSE_PLACEHOLDER
**/
import TagComponent from '../../../../components/description/properties/tags/TagComponent'

/**
* A simple tag container
*/
class SimpleTagContainer extends React.Component {

  static propTypes = {
    tag: PropTypes.string.isRequired,
    // callback: on search tag (or null)
    onSearchTag: PropTypes.func,
    onShowDescription: PropTypes.func, // passthrough, allows this container to be used for entities too
    isEntity: PropTypes.bool,
  }

  static defaultProps = {
    isEntity: false,
  }

  onSearchTag = () => {
    const { onSearchTag, tag } = this.props
    onSearchTag(tag)
  }

  render() {
    const { onSearchTag, onShowDescription, tag, isEntity } = this.props
    return (
      <TagComponent
        tagLabel={tag}
        onSearchTag={onSearchTag ? this.onSearchTag : null}
        onShowDescription={onShowDescription || null}
        isEntity={isEntity}
      />
    )
  }
}
export default SimpleTagContainer
