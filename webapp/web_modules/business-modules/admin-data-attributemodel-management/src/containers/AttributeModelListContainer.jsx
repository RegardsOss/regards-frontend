/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { attributeModelActions, attributeModelSelectors } from '../clients/AttributeModelClient'
import AttributeModelListComponent from '../components/AttributeModelListComponent'
import messages from '../i18n'

/**
 * React container to manage ManageProjectsComponent.
 *
 * @prop {Array<Project>} projects List of projects to display
 * @prop {Boolean} projectConfigurationIsShown ProjectConfigurationComponent display status
 *
 */
export class AttributeModelListContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    attrModelArray: DataManagementShapes.AttributeModelArray,
    // from mapDispatchToProps
    fetchAttrModelList: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    deleteAttrModel: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  UNSAFE_componentWillMount() {
    this.props.fetchAttrModelList()
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/models/attribute/model/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/models/board`
  }

  handleEdit = (attrModelId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/models/attribute/model/${attrModelId}/edit`
    browserHistory.push(url)
  }

  handleDelete = (attrModelId) => {
    this.props.deleteAttrModel(attrModelId)
  }

  render() {
    const { attrModelArray } = this.props
    return (
      <I18nProvider messages={messages}>
        <AttributeModelListComponent
          attrModelArray={attrModelArray}
          createUrl={this.getCreateUrl()}
          backUrl={this.getBackUrl()}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          isLoading={this.state.isLoading}
        />
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state) => ({
  attrModelArray: attributeModelSelectors.getArrayOrderedUsingFragmentAndAttributeName(state),
})
const mapDispatchToProps = (dispatch) => ({
  fetchAttrModelList: () => dispatch(attributeModelActions.fetchEntityList()),
  deleteAttrModel: (id) => dispatch(attributeModelActions.deleteEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AttributeModelListContainer)
