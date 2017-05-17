/** Possible states for AIP in storage process */
export const aipStates = [
  'VALID', // Valid, waiting for storage
  'PENDING', // storage in progress
  'STORED', // stored
  'STORAGE_ERROR', // storage error, waiting for next attempt
  'DELETED', // deleted
]

/** AIP data types */
export const aipDataTypes = ['COLLECTION', 'DATASET', 'DOCUMENT', 'DATA']

/** Shape of an AIP status as defined in JSON provided by the back */
const AIPStatusJSON = PropTypes.shape({
  id: PropTypes.number.isRequired,
  ipId: PropTypes.string.isRequired,
  sipId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(aipDataTypes).isRequired,
  state: PropTypes.oneOf(aipStates).isRequired,
  date: PropTypes.string.isRequired, // last event date
  comment: PropTypes.string, // last even comment
})

/** Normalizr shape for one AIP status */
const AIPStatus = PropTypes.shape({
  content: AIPStatusJSON,
})
export default AIPStatus
