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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import FragmentFormComponent from '../components/FragmentFormComponent'
import { fragmentActions, fragmentSelectors } from '../clients/FragmentClient'
import messages from '../i18n'

/**
 * React container to manage the fragment form.
 * @author Léo Mieulet
 */
export class FragmentFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      fragment_id: PropTypes.string,
    }),
    // from mapStateToProps
    fragment: DataManagementShapes.Fragment,
    // from mapDispatchToProps
    createFragment: PropTypes.func,
    createFragmentUsingFile: PropTypes.func,
    fetchFragment: PropTypes.func,
    updateFragment: PropTypes.func,
  }

  state = {
    isEditing: this.props.params.fragment_id !== undefined,
    isLoading: this.props.params.fragment_id !== undefined,
  }

  componentDidMount() {
    if (this.state.isEditing) {
      this.props.fetchFragment(this.props.params.fragment_id)
        .then(() => {
          this.setState({
            isLoading: false,
          })
        })
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/models/fragment/list`
  }

  /**
   * Handle form submission when updating fragment
   * @param values form updated values
   */
  handleUpdate = (values) => {
    const previousFragment = this.props.fragment.content
    const updatedFragment = { ...previousFragment, description: values.description }
    return Promise.resolve(this.props.updateFragment(previousFragment.id, updatedFragment))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  /**
   * Handle form submission when creating fragment
   * @param values form values
   */
  handleCreate = (values) => {
    let task
    if (values.file) {
      task = this.props.createFragmentUsingFile({
        file: values.file,
      })
    } else {
      const newFragment = {
        name: values.name,
        description: values.description,
      }
      task = this.props.createFragment(newFragment)
    }
    return Promise.resolve(task)
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          const url = this.getBackUrl()
          browserHistory.push(url)
        }
      })
  }

  render() {
    const { isLoading, isEditing } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator isLoading={isLoading}>
          {() => (
            <FragmentFormComponent
              onSubmit={isEditing ? this.handleUpdate : this.handleCreate}
              backUrl={this.getBackUrl()}
              isCreating={!isEditing}
              currentFragment={this.props.fragment}
            />
          )}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  fragment: ownProps.params.fragment_id ? fragmentSelectors.getById(state, ownProps.params.fragment_id) : null,
})

const mapDispatchToProps = (dispatch) => ({
  createFragment: (values) => dispatch(fragmentActions.createEntity(values)),
  createFragmentUsingFile: (file) => dispatch(fragmentActions.createEntityUsingMultiPart({}, file)),
  updateFragment: (id, values) => dispatch(fragmentActions.updateEntity(id, values)),
  fetchFragment: (id) => dispatch(fragmentActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FragmentFormContainer)
