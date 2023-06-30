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
import values from 'lodash/values'
import Dialog from 'material-ui/Dialog'
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { IngestDomain } from '@regardsoss/domain'
import { TableSelectionModes } from '@regardsoss/components'
import RadioButton, { RadioButtonGroup } from 'material-ui/RadioButton'
import FlatButton from 'material-ui/FlatButton'

/** Possible version options for products */
const AVAILABLE_VERSION_OPTIONS = [
  IngestDomain.VERSIONING_MODES_ENUM.IGNORE,
  IngestDomain.VERSIONING_MODES_ENUM.INC_VERSION,
  IngestDomain.VERSIONING_MODES_ENUM.REPLACE,
]

/**
 * Version option selection dialog: allows user selection a version option for a selection of waiting requests
 *
 * @author Raphaël Mechali
 */
export default function VersionOptionSelectionDialog(
  {
    selection, onClose, onConfirm, severalEntitiesSelected,
  },
  {
    intl: { formatMessage },
    moduleTheme: { requests: { selectionDialog: { headerMessage, asyncInfo } } },
  }) {
  if (!selection.open) { // avoid computing anything while closed
    return null
  }
  const [selectedOption, setSelectedOption] = React.useState(IngestDomain.VERSIONING_MODES_ENUM.INC_VERSION)
  // As we do not have the entity when TableSelectionModes.excludeSelected, here is special case
  let nbProviderIdKnown
  if (severalEntitiesSelected) {
    nbProviderIdKnown = 2
  } else if (selection.mode === TableSelectionModes.includeSelected) {
    nbProviderIdKnown = 1
  } else {
    nbProviderIdKnown = 0
  }
  /** Callback: new radio selected */
  function onOptionSelected(evt, option) {
    setSelectedOption(option)
  }

  /** Callback: on confirm */
  function onDialogConfirm() {
    onConfirm(selectedOption)
  }

  return (
    <Dialog
      open
      title={formatMessage({ id: 'oais.requests.selection.version.option.title' }, { severalEntitiesSelected })}
      actions={
        <>
          <FlatButton
            primary
            label={formatMessage({ id: 'oais.requests.selection.version.option.cancel' })}
            onClick={onClose}
          />
          <FlatButton
            label={formatMessage({ id: 'oais.requests.selection.version.option.confirm' })}
            onClick={onDialogConfirm}
          />
        </>
      }
    >
      <div style={headerMessage}>
        { /* Top message */
          formatMessage({
            id: 'oais.requests.selection.version.option.message',
          }, {
            nbProviderIdKnown,
            providerId: nbProviderIdKnown === 1 ? selection.entities[0].content.providerId : null,
          })
        }
        <br />
        <i style={asyncInfo}>
          { /* Async note*/
            formatMessage({
              id: 'oais.requests.selection.version.option.async.info',
            })
          }
        </i>
      </div>
      <div>
        <RadioButtonGroup name="options.group" valueSelected={selectedOption} onChange={onOptionSelected}>
          { /** Options */
            AVAILABLE_VERSION_OPTIONS.map((opt) => (
              <RadioButton
                key={opt}
                value={opt}
                label={formatMessage({ id: `oais.requests.selection.version.option.${opt}` }, { severalEntitiesSelected })}
              />
            ))
          }
        </RadioButtonGroup>
      </div>
    </Dialog>
  )
}

VersionOptionSelectionDialog.propTypes = {
  selection: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    mode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    entities: PropTypes.arrayOf(IngestShapes.RequestEntity).isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  severalEntitiesSelected: PropTypes.bool.isRequired,
}

VersionOptionSelectionDialog.contextTypes = {
  ...i18nContextType,
  ...themeContextType,
}
