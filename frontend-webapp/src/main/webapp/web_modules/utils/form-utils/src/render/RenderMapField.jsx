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
import keys from 'lodash/keys'
import map from 'lodash/map'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia } from 'material-ui/Card'
import { ListItem } from 'material-ui/List'
import { fieldInputPropTypes } from 'redux-form'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import { SelectableList } from '@regardsoss/components'
import Field from '../Field'
import styles from '../styles'
import messages from '../i18n/Locales'

/**
* Display a form to configure a map parameter.
* The map parameter is configured as a new Field for each key of the map. The values are configured with parametrable field.
* @author Sébastien Binda
*/
class RenderArrayObjectField extends React.Component {
  static propTypes = {
    mapValueFieldComponent: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    mapValueFieldProps: PropTypes.object,
    getNewMapValue: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    input: PropTypes.shape(fieldInputPropTypes).isRequired, // fields given by FieldArray from redux-form
  }

  static defaultProps = {
    getNewMapValue: () => ({}),
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    displayedKey: null,
  }

  /**
   * Callback to add a new object to the existing ones.
   */
  onAddNewObject = () => {
    const newKey = Date.now()
    const initValue = this.props.getNewMapValue()
    this.props.input.onChange({
      ...this.props.input.value,
      [newKey]: initValue,
    })
    this.displayObject(newKey)
  }

  getMapKeys = () => keys(this.props.input.value)

  /**
   * Callback to display selected object form
   * @param {*} index : Index of the object from the fields props to display
   */
  displayObject = (key) => {
    this.setState({
      displayedKey: key,
    })
  }

  /**
   * Render a ListItem for the given objects
   * @param {*} index : Index of the object from the fields props to render
   */
  renderListItem = key => (
    <ListItem
      key={`${key}`}
      value={key}
      primaryText={key}
    />
  )

  render() {
    const {
      intl: { formatMessage },
      moduleTheme: {
        arrayObject: {
          layoutStyle, leftColumnStyle, rightColumnStyle, typeListStyle, titleStyle, contentStyle,
        },
      },
    } = this.context

    const { displayedKey } = this.state
    const { mapValueFieldComponent, input, mapValueFieldProps } = this.props

    const fieldForm = displayedKey !== null ? (
      <Field
        name={`${input.name}.${displayedKey}`}
        component={mapValueFieldComponent}
        {...mapValueFieldProps}
      />) : null
    return (
      <Card>
        <CardMedia>
          <div style={layoutStyle}>
            <div style={titleStyle} />
            <div style={contentStyle}>
              <div style={leftColumnStyle}>
                <SelectableList
                  style={typeListStyle}
                  defaultValue={displayedKey}
                  onSelect={this.displayObject}
                >
                  {map(this.getMapKeys(), (key, idx) => this.renderListItem(key))}
                </SelectableList>
                <RaisedButton
                  label={formatMessage({ id: 'render.array-object.add.button' })}
                  fullWidth
                  primary
                  onClick={this.onAddNewObject}
                />
              </div>
              <div style={rightColumnStyle}>
                {fieldForm}
              </div>
            </div>
          </div>
        </CardMedia>
      </Card>
    )
  }
}
export default withI18n(messages)(withModuleStyle(styles)(RenderArrayObjectField))
