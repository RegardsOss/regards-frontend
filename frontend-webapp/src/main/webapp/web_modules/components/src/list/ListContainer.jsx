/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import merge from 'lodash/merge'
import some from 'lodash/some'
import isString from 'lodash/isString'
import { connect } from '@regardsoss/redux'
import { BasicListSelectors, BasicListActions } from '@regardsoss/store-utils'
import TextField from 'material-ui/TextField'
import LineComponent from './LineComponent'
import ListHeaderComponent from './ListHeaderComponent'
import ShowableAtRender from '../cards/ShowableAtRender'

/**
 * React component to handle list of elements.
 * Each element is rendered with a custom given React component.
 * Properties
 * lineComponent : React component to render a entity line. The entity to display is passed as a prop.
 * nbEntityByPage : Number used to load a page of entities.
 * entitiesActions : Store Actions class derived from BasicPageableActions
 * entitiesSelector : Store Selectors class derived from BasicPageableSelector
 * @author Sébastien Binda
 * @author Léo Mieulet
 */
class ListContainer extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    entityIdentifier: PropTypes.string.isRequired,
    lineComponent: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    entitiesActions: PropTypes.instanceOf(BasicListActions).isRequired,
    queryParams: PropTypes.objectOf(PropTypes.string),
    // eslint-disable-next-line react/no-unused-prop-types
    entitiesSelector: PropTypes.instanceOf(BasicListSelectors).isRequired,
    selectedEntities: PropTypes.arrayOf(PropTypes.object),
    searchIdentifier: PropTypes.string,
    searchText: PropTypes.node,
    displayCheckbox: PropTypes.bool,
    disableActions: PropTypes.bool,
    onEntityCheck: PropTypes.func,
    onUnselectAll: PropTypes.func,
    onReset: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    additionalPropToLineComponent: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
    // Set by redux store connection
    // eslint-disable-next-line react/forbid-prop-types
    // eslint-disable-next-line react/no-unused-prop-types
    entities: PropTypes.objectOf(PropTypes.object),
    fetchEntities: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    entitiesFetching: PropTypes.bool,
  }

  static defaultProps = {
    selectedEntities: [],
    displayCheckbox: true,
    disableActions: false,
    style: {},
  }

  state = {
    searchValue: '',
  }

  componentDidMount() {
    this.handleFetch('')
  }

  onSearchUpdate = (event, value) => {
    this.setState({
      searchValue: value,
    })
    this.props.onReset()
  }

  onReset = () => {
    this.setState({
      searchValue: '',
    })
    this.handleFetch('')
    this.props.onReset()
  }

  /**
   * Fetch new list of result
   * @param index
   * @param searchValue
   */
  handleFetch = (searchValue) => {
    const idQueryParam = this.props.searchIdentifier && searchValue.length > 0 ? { [this.props.searchIdentifier]: searchValue } : {}
    this.props.fetchEntities({}, { ...idQueryParam, ...this.props.queryParams })
  }

  render() {
    const { searchValue } = this.state

    return (
      <div style={merge({}, this.props.style)}>
        <ListHeaderComponent
          title={this.props.title}
          onUnselecteddAll={this.props.onUnselectAll}
          onReset={this.onReset}
        />
        <ShowableAtRender show={isString(this.props.searchIdentifier)}>
          <TextField
            name="searchfield"
            onChange={this.onSearchUpdate}
            floatingLabelText={this.props.searchText}
            value={searchValue}
            fullWidth
          />
        </ShowableAtRender>
        <div>
          {map(this.props.entities, (entity) => {
            const selected = some(this.props.selectedEntities, selectedEntity => selectedEntity[this.props.entityIdentifier] === entity.content[this.props.entityIdentifier])
            return (
              <LineComponent
                key={entity.content[this.props.entityIdentifier]}
                entity={entity}
                displayCheckbox={this.props.displayCheckbox}
                disabled={this.props.disableActions}
                lineComponent={this.props.lineComponent}
                onEntityCheck={this.props.onEntityCheck}
                isSelected={selected}
                additionalPropToLineComponent={this.props.additionalPropToLineComponent}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

ListContainer.defaultProps = {
  displayCheckbox: false,
  selectedEntities: [],
  additionalPropToLineComponent: {},
  queryParams: {},
}

const mapStateToProps = (state, ownProps) => ({
  entities: ownProps.entitiesSelector.getList(state),
  entitiesFetching: ownProps.entitiesSelector.isFetching(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchEntities: (pathParams, queryParams) => dispatch(ownProps.entitiesActions.fetchEntityList(pathParams, queryParams)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
