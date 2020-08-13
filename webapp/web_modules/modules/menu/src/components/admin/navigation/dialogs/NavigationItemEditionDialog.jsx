/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import last from 'lodash/last'
import map from 'lodash/map'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import RadioButton from 'material-ui/RadioButton'
import { formValueSelector } from 'redux-form'
import { AccessDomain } from '@regardsoss/domain'
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { AdminShapes } from '@regardsoss/shape'
import {
  reduxForm, RenderTextField, RenderRadio, RenderSelectField, Field, ValidationHelpers,
} from '@regardsoss/form-utils'
import { ModuleTitleText } from '@regardsoss/components'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../../domain/NavigationItemTypes'
import { NavigationEditionItem, EditionSection, EditionLink } from '../../../../shapes/ModuleConfiguration'
import {
  findAll, getItemPathIn, getParentByPath, isSection, isChildOrSelf,
} from '../../../../domain/NavigationTreeHelper'
import { VISIBILITY_MODES, VISIBILITY_MODES_ENUM } from '../../../../domain/VisibilityModes'

/** Fields ID constants (exported for tests only) */
export const COMMON_ICON_FIELD = 'icon'
export const ICON_TYPE_FIELD = `${COMMON_ICON_FIELD}.type`
export const ICON_URL_FIELD = `${COMMON_ICON_FIELD}.url`

export const COMMON_TITLE_FIELD = 'title'
export const TITLE_EN_FIELD = `${COMMON_TITLE_FIELD}.en`
export const TITLE_FR_FIELD = `${COMMON_TITLE_FIELD}.fr`

export const VISIBILITY_MODE_FIELD = 'visibilityMode'
export const VISIBLE_FOR_ROLE_FIELD = 'visibleForRole'

export const PARENT_SECTION_FIELD = 'parentSection'
export const AFTER_ELEMENT_FIELD = 'afterElement'

export const URL_LINK_FIELD = 'urlLink'

/**
 * Dialog form for navigation item creation / edition. Note: it requires enriched EditionModule elements to access their title and description
 * @author Raphaël Mechali
 */
export class NavigationItemEditionDialog extends React.Component {
  /** Main bar value for corresponding field selector */
  static MAIN_BAR = { ITEM_ID: 'MAIN_BAR' }

  /** First position value value for corresponding field selector */
  static FIRST_POSITION = { ITEM_ID: 'FIRST_POSITION' }

  /**
   * Returns possible items inafter field
   * @param {NavigationEditionItem} editedItem current item
   * @param {NavigationEditionItem} parentSection current item parent or null
   * @param {[NavigationEditionItem]} navigationItems root items
   * @return {[NavigationEditionItem|NavigationItemEditionDialog.FIRST_POSITION]} after field choices
   */
  static getAfterElementChoices(editedItem, parentSection, navigationItems, hasHome) {
    // remove any editedItem here
    const hasParentSection = parentSection && parentSection !== NavigationItemEditionDialog.MAIN_BAR
    const sameLevelItems = (hasParentSection ? parentSection.children : navigationItems)
      .filter((child) => child.id !== editedItem.id || child.type !== editedItem.type)
    // possible positions: sibling and first position, except on root level (cannot be before home item if there is home item)
    return hasParentSection || !hasHome ? [NavigationItemEditionDialog.FIRST_POSITION, ...sameLevelItems] : sameLevelItems
  }

  /**
   * Returns possible sections for item as parameter (exlude edited item itself and children, adds main bar option)
   * @param {NavigationEditionItem} itemPath current item path
   * @param {[NavigationEditionItem]} navigationItems root items
   * @return {[NavigationEditionItem|NavigationItemEditionDialog.MAIN_BAR]} after field choices
   */
  static getParentSectionChoices(item, navigationItems) {
    // search all sections of the current tree that are not this edited item nor part of its children
    // note: we keep the reference, otherwise selector field equal method cannot work
    const allSelectableSections = findAll(navigationItems, (currentItem) => isSection(currentItem) && !isChildOrSelf(item, currentItem))
    return [
      NavigationItemEditionDialog.MAIN_BAR,
      ...allSelectableSections,
    ]
  }

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    // provided edition data, null / undefined when not editing
    editionData: PropTypes.shape({
      onDone: PropTypes.func.isRequired,
      dialogTitleKey: PropTypes.string.isRequired,
      item: NavigationEditionItem.isRequired,
      itemPath: PropTypes.arrayOf(PropTypes.number).isRequired,
      // NOTE: module items here MUST HOLD TITLE AND DESCRIPTION (required for i18n in this view)
      navigationItems: PropTypes.arrayOf(NavigationEditionItem).isRequired,
      // is there currently a home?
      hasHome: PropTypes.bool.isRequired,
    }),
    roleList: AdminShapes.RoleList.isRequired,
    // from redux selector, in current form values
    selectedIconType: PropTypes.oneOf(AccessDomain.PAGE_MODULE_ICON_TYPES),
    // eslint-disable-next-line react/no-unused-prop-types
    selectedParentSection: PropTypes.oneOfType([EditionSection, PropTypes.oneOf([NavigationItemEditionDialog.MAIN_BAR]), EditionLink]), // used in onPropertiesUpdated
    selectedVisibilityMode: PropTypes.oneOf(VISIBILITY_MODES),
    // from redux form
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    initialize: PropTypes.func.isRequired, // used in onPropertiesUpdated
    // eslint-disable-next-line react/no-unused-prop-types
    change: PropTypes.func.isRequired, // used in onPropertiesUpdated

  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** default state */
  state = {
    parentSectionChoices: [],
    afterElementChoices: [],
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
    const {
      editionData, selectedParentSection, initialize, change,
    } = newProps
    // 0 - ignore properties change when this component edition data is not set up (no need to handle those events)
    if (editionData) {
      const {
        item, itemPath, navigationItems, hasHome,
      } = editionData
      if (!isEqual(oldProps.editionData, editionData)) {
        // 1 - initialize form values when getting an edition model
        const initialFormValues = {
          [VISIBILITY_MODE_FIELD]: item.visibilityMode,
          [VISIBLE_FOR_ROLE_FIELD]: item.visibleForRole,
        }

        if (item.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION || item.type === NAVIGATION_ITEM_TYPES_ENUM.LINK) {
          // initialize title and icon
          initialFormValues[COMMON_ICON_FIELD] = item.icon
          initialFormValues[COMMON_TITLE_FIELD] = item.title
          if (item.type === NAVIGATION_ITEM_TYPES_ENUM.LINK) {
            initialFormValues[URL_LINK_FIELD] = item.url
          }
        }
        // initialize parent section and index
        const parentSection = getParentByPath(navigationItems, itemPath)
        initialFormValues[PARENT_SECTION_FIELD] = parentSection || NavigationItemEditionDialog.MAIN_BAR
        const afterElementChoices = NavigationItemEditionDialog.getAfterElementChoices(item, parentSection, navigationItems, hasHome)
        // retrieve corresponding choice: in 'normal' level, it is last path index, but in main bar
        // it is index - 1 when there is home
        const indexInLevel = parentSection || !hasHome ? last(itemPath) : last(itemPath) - 1
        initialFormValues[AFTER_ELEMENT_FIELD] = afterElementChoices[indexInLevel]

        // set available positions in this state
        this.setState({
          parentSectionChoices: NavigationItemEditionDialog.getParentSectionChoices(item, navigationItems),
          afterElementChoices,
        })

        // dispatch initialize
        initialize(initialFormValues)
      } else if (!isEqual(oldProps.selectedParentSection, selectedParentSection)
        && oldProps.selectedParentSection) { // check that previous properties was provided to avoid initial update
        // 1 - update possible choices in state
        const afterElementChoices = NavigationItemEditionDialog.getAfterElementChoices(item, selectedParentSection, navigationItems, hasHome)
        this.setState({ afterElementChoices })
        // 2 - change field value to move this element at end
        change(AFTER_ELEMENT_FIELD, last(afterElementChoices))
      }
    }
  }

  /**
   * On confirm edition callback
   * @param {*} values form values, provided by redux handleSubmit method
   */
  onConfirm = (values) => {
    const {
      editionData: {
        item, navigationItems, onDone,
      },
    } = this.props

    // provide an after element path (more convenient for calling component as it points out both the parent and the previous sibling)
    let insertAtPath
    const afterElement = values[AFTER_ELEMENT_FIELD]
    const parentSection = values[PARENT_SECTION_FIELD]
    if (afterElement === NavigationItemEditionDialog.FIRST_POSITION) {
      // first position in section or main bar (we don't have the sibling path here to help)
      const parentSectionPath = !parentSection || parentSection === NavigationItemEditionDialog.MAIN_BAR
        ? [] : getItemPathIn(navigationItems, parentSection)
      insertAtPath = [...parentSectionPath, 0]
    } else {
      // just after its selected sibling
      const siblingPath = getItemPathIn(navigationItems, afterElement)
      insertAtPath = [...siblingPath.slice(0, -1), last(siblingPath) + 1]
    }
    // build new item
    const newItem = {
      ...item,
      visibilityMode: values[VISIBILITY_MODE_FIELD],
      visibleForRole: values[VISIBLE_FOR_ROLE_FIELD],
    }
    if (item.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION || item.type === NAVIGATION_ITEM_TYPES_ENUM.LINK) {
      newItem.icon = values[COMMON_ICON_FIELD]
      newItem.title = values[COMMON_TITLE_FIELD]
    }

    if (item.type === NAVIGATION_ITEM_TYPES_ENUM.LINK) {
      newItem.url = values[URL_LINK_FIELD]
    }

    onDone(newItem, insertAtPath)
  }

  /**
   * Validates custom icon URL
   * @param textURL user entered text
   * @param values the rest of form values
   * @return error intl key if any error, undefined otherwise
   */
  validateCustomIcon = (textURL, values) => {
    if (get(values, ICON_TYPE_FIELD) === AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM) {
      // when in custom icon type, that field is required
      return ValidationHelpers.required(textURL) || ValidationHelpers.url(textURL)
    }
    return undefined // no error in any other case
  }

  /**
   * Validate role field
   * @param role selected user role
   * @param values the reset of form values
   * @return error intl key if any error, undefined otherwise
   */
  validateRoleField = (role, values) => {
    if (values[VISIBILITY_MODE_FIELD] === VISIBILITY_MODES_ENUM.FOR_ROLE) {
      return ValidationHelpers.required(role)
    }
    return undefined // no error in other cases
  }

  render() {
    const {
      onClose, editionData, selectedIconType, selectedVisibilityMode,
      roleList, submitting, invalid, handleSubmit,
    } = this.props
    const { intl: { formatMessage, locale } } = this.context
    const { parentSectionChoices, afterElementChoices } = this.state

    // extract edition data if available
    const titleKey = get(editionData, 'dialogTitleKey')

    // create dialog actions
    return (
      <Dialog
        open={!!editionData}
        title={titleKey ? formatMessage({ id: titleKey }) : null}
        actions={<>
          <FlatButton
            key="cancel"
            label={formatMessage({ id: 'menu.form.navigation.edit.item.dialog.cancel' })}
            onClick={onClose}
          />
          <FlatButton
            key="confirm"
            disabled={submitting || invalid}
            label={formatMessage({ id: 'menu.form.navigation.edit.item.dialog.confirm' })}
            onClick={handleSubmit(this.onConfirm)}
            primary
          />
        </>}
        onRequestClose={onClose}
        autoDetectWindowHeight
        autoScrollBodyContent
      >
        { /* Edition form */
          editionData ? ( // show form when edited item is available
            <div>
              {/* A - Section and link edition fields if section or link*/
                editionData.item.type === NAVIGATION_ITEM_TYPES_ENUM.SECTION || editionData.item.type === NAVIGATION_ITEM_TYPES_ENUM.LINK ? [
                  // A.1 - section icon type
                  <Field
                    key="icon.type"
                    name={ICON_TYPE_FIELD}
                    component={RenderRadio}
                    defaultSelected={AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT}
                  >
                    <RadioButton
                      value={AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.NONE}
                      label={this.context.intl.formatMessage({ id: 'menu.form.navigation.edit.item.dialog.icon.none' })}
                    />
                    <RadioButton
                      value={AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT}
                      label={this.context.intl.formatMessage({ id: 'menu.form.navigation.edit.item.dialog.icon.default' })}
                    />
                    <RadioButton
                      value={AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM}
                      label={this.context.intl.formatMessage({ id: 'menu.form.navigation.edit.item.dialog.icon.custom' })}
                    />
                  </Field>,
                  // A.2 - section custom icon  URL,
                  <Field
                    key="icon.url"
                    name={ICON_URL_FIELD}
                    component={RenderTextField}
                    fullWidth
                    type="text"
                    label={this.context.intl.formatMessage({ id: 'menu.form.navigation.edit.item.dialog.custom.icon.url' })}
                    validate={this.validateCustomIcon}
                    disabled={selectedIconType !== AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.CUSTOM}
                  />,
                  // A.3 - section EN title
                  <Field
                    key="title.en"
                    name={TITLE_EN_FIELD}
                    type="text"
                    component={RenderTextField}
                    label={formatMessage({ id: 'menu.form.navigation.edit.item.dialog.title.en' })}
                    validate={ValidationHelpers.required}
                    fullWidth
                  />,
                  // A.4 - section FR title
                  <Field
                    key="title.fr"
                    name={TITLE_FR_FIELD}
                    type="text"
                    component={RenderTextField}
                    label={formatMessage({ id: 'menu.form.navigation.edit.item.dialog.title.fr' })}
                    validate={ValidationHelpers.required}
                    fullWidth
                  />,
                ] : null
              }
              {
                editionData.item.type === NAVIGATION_ITEM_TYPES_ENUM.LINK
                  ? <Field
                    key="urlLink"
                    name={URL_LINK_FIELD}
                    type="text"
                    component={RenderTextField}
                    label={formatMessage({ id: 'menu.form.navigation.edit.item.dialog.urlLink' })}
                    validate={[ValidationHelpers.required, ValidationHelpers.url]}
                    fullWidth
                  />
                  : null // a link model
              }
              {/* B - move and visibility fields (for both section and module) */}
              <Field
                name={PARENT_SECTION_FIELD}
                component={RenderSelectField}
                label={formatMessage({ id: 'menu.form.navigation.edit.item.dialog.parent.section.field' })}
                fullWidth
              >
                {
                  /* possible parent sections, from state */
                  parentSectionChoices.map((value) => (
                    <MenuItem
                      key={value.ITEM_ID || `${value.type}-${value.id}`}
                      value={value}
                      primaryText={
                        value.ITEM_ID
                          // the MAIN_BAR placeholder
                          ? formatMessage({ id: 'menu.form.navigation.edit.item.dialog.parent.section.none' })
                          // a section
                          : ModuleTitleText.selectTitle(value.title, null, locale)
                      }
                    />))
                }
              </Field>
              <Field
                name={AFTER_ELEMENT_FIELD}
                component={RenderSelectField}
                label={formatMessage({ id: 'menu.form.navigation.edit.item.dialog.insert.at.field' })}
                fullWidth
              >
                { /* possible positions, from state */
                  afterElementChoices.map((value) => (<MenuItem
                    key={value.ITEM_ID || `${value.type}-${value.id}`}
                    value={value}
                    primaryText={
                        value.ITEM_ID
                          // the FIRST_POSITION placeholder
                          ? formatMessage({ id: 'menu.form.navigation.edit.item.dialog.insert.at.first.position' })
                          // After a section or module WITH TITLE (see props comments)
                          : formatMessage(
                            { id: 'menu.form.navigation.edit.item.dialog.insert.after' },
                            { itemTitle: ModuleTitleText.selectTitle(value.title, value.description, locale) })
                      }
                  />))
                }
              </Field>
              {/* Visibility mode */}
              <Field
                name={VISIBILITY_MODE_FIELD}
                component={RenderSelectField}
                label={formatMessage({ id: 'menu.form.navigation.edit.item.dialog.visibility.mode.field' })}
                fullWidth
              >
                { /** possible visibility modes */
                  VISIBILITY_MODES.map((value) => (
                    <MenuItem
                      key={value}
                      value={value}
                      primaryText={formatMessage({ id: `menu.form.navigation.edit.item.dialog.visibility.mode.${value}` })}
                    />))
                }
              </Field>
              <Field
                name={VISIBLE_FOR_ROLE_FIELD}
                component={RenderSelectField}
                label={formatMessage({ id: 'menu.form.navigation.edit.item.dialog.visibility.visible.for.role.field' })}
                disabled={selectedVisibilityMode !== VISIBILITY_MODES_ENUM.FOR_ROLE}
                validate={this.validateRoleField}
                fullWidth
              >
                { /** Possible roles */
                  map(roleList, ({ content: { name } }) => (
                    <MenuItem
                      key={name}
                      value={name}
                      primaryText={name}
                    />
                  ))
                }
              </Field>
            </div>) : null// no edition model
        }
      </Dialog>
    )
  }
}

// create form
const form = 'edit-navigation-item-form'
const connectedReduxForm = reduxForm({ form })(NavigationItemEditionDialog)

// form values selector
const selector = formValueSelector(form)

export default connect((state) => ({
  selectedIconType: selector(state, ICON_TYPE_FIELD),
  selectedParentSection: selector(state, PARENT_SECTION_FIELD),
  selectedVisibilityMode: selector(state, VISIBILITY_MODE_FIELD),
}))(connectedReduxForm)
