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
    fullWidth: PropTypes.bool,
    hintText: PropTypes.string.isRequired,
    floatingLabelText: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    validate: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.func), PropTypes.func]),
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

  state = {
    inputUpdateTimeout: null,
  }

  componentDidMount() {
    this.searchDatasets()
  }

  onItemSelected = (selected) => {
    this.props.onSelect(selected)
  }

  /**
   * Set the search text into the search field and wait for user ends to enter the full text he wants before sending filter request
   * to server.
   * @param {*} searchText: filter text given by user
   */
  onUpdateInput = (searchText) => {
    this.setState({
      searchText,
    }, () => {
      if (this.state.inputUpdateTimeout) {
        clearTimeout(this.state.inputUpdateTimeout)
      }
      this.setState({
        inputUpdateTimeout: setTimeout(() => this.searchDatasets(searchText), 500),
      })
    })
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

  renderAutocomplete = () => {
    const {
      fullWidth, fieldName, hintText, floatingLabelText, validate,
    } = this.props
    const dsContents = map(this.state.datasets, d => d.content)
    return (
      <DatasetSelectorComponent
        fullWidth={fullWidth}
        fieldName={fieldName}
        hintText={hintText}
        floatingLabelText={floatingLabelText}
        searchText={this.state.searchText}
        onNewRequest={this.onItemSelected}
        handleUpdateInput={this.onUpdateInput}
        datasource={dsContents}
        isLoading={this.state.isLoading}
        validate={validate}
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
