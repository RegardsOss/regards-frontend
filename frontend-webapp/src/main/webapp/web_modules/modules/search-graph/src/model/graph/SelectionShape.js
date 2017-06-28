/**
* LICENSE_PLACEHOLDER
**/
import { DamDomain } from '@regardsoss/domain'

export const SelectedElement = PropTypes.shape({
  ipId: PropTypes.string.isRequired,
  entityType: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired,
  label: PropTypes.string.isRequired,
})

export const SelectionPath = PropTypes.arrayOf(SelectedElement)
