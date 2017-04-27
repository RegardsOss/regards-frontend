/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import Chip from 'material-ui/Chip'
import Card from 'material-ui/Card'
import LabelIcon from 'material-ui/svg-icons/action/label'
import { FormattedMessage } from 'react-intl'

/**
 * React component to display tags of a given entity
 */
class TagsViewComponent extends React.Component {

  static propTypes = {
    // Tags to display
    tags: React.PropTypes.arrayOf(React.PropTypes.string),
    // Callaback after tag selection
    onSearchTag: React.PropTypes.func,
  }

  render() {
    return (
      <Card
        style={{
          marginTop: 20,
        }}
      >
        <h1
          style={{
            margin: 5,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LabelIcon
            style={{
              marginRight: 5,
            }}
          />
          <FormattedMessage
            id="entities.tags.title"
          />
        </h1>
        <div style={{ display: 'flex' }}>
          {this.props.tags && this.props.tags.length > 0 ? map(this.props.tags, tag =>
            <Chip
              key={tag}
              onTouchTap={() => this.props.onSearchTag(tag)}
              style={{ margin: 5 }}
            >
              {tag}
            </Chip>) : <FormattedMessage id="entities.no.tags.found" />}
        </div>
      </Card>
    )
  }

}

export default TagsViewComponent
