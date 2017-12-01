/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import get from 'lodash/get'
import map from 'lodash/map'
import { connect } from '@regardsoss/redux'
import DatasetSelectorComponent from '../../components/dataset/DatasetSelectorComponent'
import { datasetActions } from '../../clients/DatasetClient'
import { withI18n } from '../../../../../utils/i18n/src/main'
import { withModuleStyle } from '../../../../../utils/theme/src/main'
import styles from '../../styles'
import messages from '../../i18n'

/**
* A selector auto fill with all available datasets from the catalog
* @author Sébastien Binda
*/
export class DatasetSelector extends React.Component {
  static PAGE_SIZE = 100
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {}
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchDatasets: queryParams => dispatch(datasetActions.fetchPagedEntityList(0, DatasetSelector.PAGE_SIZE, {}, queryParams)),
    }
  }

  static propTypes = {
    fieldName: PropTypes.string.isRequired,
    hintText: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    // from mapDispatchToProps
    fetchDatasets: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      isLoading: false,
      datasets: [],
    }
  }

  componentDidMount() {
    this.searchDatasets()
  }

  onItemSelected = (selected) => {
    this.props.onSelect(selected)
  }

  searchDatasets = (label) => {
    this.setState({
      isLoading: true,
    }, () => {
      this.props.fetchDatasets(label ? { label } : {}).then((actionResults) => {
        const datasets = values(get(actionResults, 'payload.entities.datasets', {})) || []
        this.setState({
          datasets,
          isLoading: false,
        })
      })
    })
  }

  handleUpdateInput = (searchText) => {
    this.setState({
      searchText,
    }, () => {
      this.searchDatasets(searchText)
    })
  }

  renderAutocomplete = () => {
    const dsContents = map(this.state.datasets, d => d.content)
    return (
      <DatasetSelectorComponent
        fieldName={this.props.fieldName}
        hintText={this.props.hintText}
        searchText={this.state.searchText}
        onNewRequest={this.onItemSelected}
        handleUpdateInput={this.handleUpdateInput}
        datasource={dsContents}
        isLoading={this.state.isLoading}
      />
    )
  }

  render() {
    return this.renderAutocomplete()
  }
}
const connected = connect(
  DatasetSelector.mapStateToProps,
  DatasetSelector.mapDispatchToProps,
)(DatasetSelector)

export default withI18n(messages)(withModuleStyle(styles)(connected))
