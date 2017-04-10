/**
* LICENSE_PLACEHOLDER
**/
import DatasetIcon from 'material-ui/svg-icons/device/widgets'
import { themeContextType } from '@regardsoss/theme'
import { CatalogEntity } from '@regardsoss/model'
import ItemLink from './ItemLink'

/**
* Displays a dataset
*/
class DatasetItem extends React.Component {

  static propTypes = {
    locked: React.PropTypes.bool.isRequired,
    dataset: CatalogEntity.isRequired,
    selected: React.PropTypes.bool.isRequired,
    onSelect: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { dataset: { content: { label } }, locked, selected, onSelect } = this.props
    const { moduleTheme: { user } } = this.context
    return (
      <div style={user.datasetItem.styles}>
        <ItemLink
          text={label}
          selected={selected}
          locked={locked}
          Icon={DatasetIcon}
          onSelect={onSelect}
        />
      </div>
    )
  }
}
export default DatasetItem
