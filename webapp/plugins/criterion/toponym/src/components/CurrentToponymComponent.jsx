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
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import CloseIcon from 'mdi-material-ui/Close'
import IconButton from 'material-ui/IconButton'

/**
 * Display help message when toponym upload autorised
 * @author Léo Mieulet
 */
class TrickToponymComponent extends React.Component {
  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static propTypes = {
    // current toponym dragndroped
    toponymBusinessId: PropTypes.string.isRequired,
    // handle user remove toponym
    onRemoveToponym: PropTypes.func.isRequired,
  }

  render() {
    console.log(this.context)
    const {
      intl: { formatMessage },
      moduleTheme: {
        close: {
          closeIconButton, closeIcon, wrapper,
        },
      },
    } = this.context
    const { toponymBusinessId, onRemoveToponym } = this.props
    return (
      <div style={wrapper}>
        <IconButton
          onClick={onRemoveToponym}
          style={closeIconButton}
          iconStyle={closeIcon}
          title={formatMessage({ id: 'criterion.toponym.remove.tooltip' })}
        >
          <CloseIcon />
        </IconButton>
        <div>{toponymBusinessId}</div>
      </div>
    )
  }
}

export default withResourceDisplayControl(TrickToponymComponent)
