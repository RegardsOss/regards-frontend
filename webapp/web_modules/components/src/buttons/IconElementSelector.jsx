/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import DropDownButton from './DropDownButton'
import messages from './i18n'

/**
 * Icon element selector. It displays as an icon menu, where icon is the currently selected element.
 *
 * @author Raphaël Mechali
 */
export class IconElementSelector extends React.Component {
  static propTypes = {
    // current value
    value: PropTypes.string.isRequired,
    // current choice list (holding value). Each choice must be unique
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
    // maps of choice, as key, and corresponding graphical data as value. It must hold at least each choice
    choiceGraphics: PropTypes.objectOf(PropTypes.shape({
      IconConstructor: PropTypes.func.isRequired, // Icon for choice
      labelKey: PropTypes.string, // Label for choice (used in menu)
      tooltipKey: PropTypes.string, // used on root button
    })).isRequired,
    disabled: PropTypes.bool,
    // selection callback: (choice:string) => ()
    onChange: PropTypes.func.isRequired,
    // Style to apply to root button (IconButton)
    style: PropTypes.objectOf(PropTypes.any),
    // Style to apply to root icon
    iconStyle: PropTypes.objectOf(PropTypes.any),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Returns choice definition or raises an error
   * @param {string} choice choice
   * @return {{IconConstructor: function, labelKey: string, tooltipKey: string}}
   */
  getChoiceDefinition = (choice) => {
    const { choiceGraphics } = this.props
    const choiceDef = choiceGraphics[choice]
    if (!choiceDef) {
      throw new Error(`IconElementSelector - fail to retrieve ${choice} in provided choiceGraphics value`)
    }
    return choiceDef
  }

  /**
   * Renders icon button
   * @param {*} props button props, as provided in render method
   */
  renderIconButton = ({ onClick }) => {
    const {
      value, disabled, style, iconStyle,
    } = this.props
    const { IconConstructor, tooltipKey } = this.getChoiceDefinition(value)
    const { intl: { formatMessage } } = this.context
    return (
      <IconButton
        title={tooltipKey && formatMessage({ id: tooltipKey })}
        disabled={disabled}
        style={style}
        iconStyle={iconStyle}
        onClick={onClick}
      >
        <IconConstructor />
      </IconButton>)
  }

  render() {
    const { value, choices, onChange } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <DropDownButton
        ButtonConstructor={this.renderIconButton}
        value={value}
        onChange={onChange}
      >
        { choices.map((c) => {
          const { IconConstructor, labelKey } = this.getChoiceDefinition(c)
          return (
            <MenuItem
              key={c}
              value={c}
              leftIcon={<IconConstructor />}
              primaryText={labelKey && formatMessage({ id: labelKey })}
            />)
        })}
      </DropDownButton>)
  }
}

export default withI18n(messages, true)(IconElementSelector)
