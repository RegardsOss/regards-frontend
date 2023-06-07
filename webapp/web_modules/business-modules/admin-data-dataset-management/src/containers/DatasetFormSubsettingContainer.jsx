/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import reduce from 'lodash/reduce'
import { connect } from '@regardsoss/redux'
import { DataManagementShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { SubsettingEditionDataset } from '../shapes/SubsettingsShapes'
import { modelAttributesActions, modelAttributesSelectors } from '../clients/ModelAttributesClient'
import DatasetFormSubsettingComponent from '../components/DatasetFormSubsettingComponent'
import { datasetValidSubsettingTestActions } from '../clients/DatasetValidSubsettingTest'
import messages from '../i18n'

/**
 * Show the dataset form
 */
export class DatasetFormSubsettingContainer extends React.Component {
  static propTypes = {
    currentDataset: SubsettingEditionDataset.isRequired,
    handleBack: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    // from mapDispatchToProps
    fetchModelAttributeList: PropTypes.func,
    testSubsetting: PropTypes.func,
  }

  state = {
    isLoading: true,
    modelAttributeList: {},
  }

  componentDidMount() {
    // Fetch attributes from the Datasource model
    Promise.resolve(this.props.fetchModelAttributeList(this.props.currentDataset.content.dataModel))
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { modelAttributeList } = newProps
    // when available values change, rebuild attribute list
    if (!isEqual(oldProps.modelAttributeList, modelAttributeList)) {
      const allAttributes = reduce(modelAttributeList, (acc, modelAttribute) => {
        // filter searchable attribute
        if (get(modelAttribute, 'content.attribute.indexed') !== false) {
          return {
            ...acc,
            [modelAttribute.content.id]: modelAttribute,
          }
        }
        return acc
      }, {})
      this.setState({
        modelAttributeList: allAttributes,
      })
    }
  }

  getForm = () => {
    const {
      currentDataset, handleBack, handleSave, isEditing,
    } = this.props
    const { modelAttributeList } = this.state
    return (<DatasetFormSubsettingComponent
      currentDataset={currentDataset}
      handleBack={handleBack}
      onSubmit={handleSave}
      handleTestSubsetting={this.handleTestSubsetting}
      modelAttributeList={modelAttributeList}
      isEditing={isEditing}
    />)
  }

  handleTestSubsetting = (subsetting) => this.props.testSubsetting(encodeURIComponent(subsetting))

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getForm}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  modelAttributeList: modelAttributesSelectors.getList(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchModelAttributeList: (modelName) => dispatch(modelAttributesActions.fetchEntityList({ modelName })),
  testSubsetting: (subsetting) => dispatch(datasetValidSubsettingTestActions.sendSignal('POST', { query: subsetting })),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetFormSubsettingContainer)
