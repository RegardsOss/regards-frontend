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
const AIPStatusJSON = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  ipId: React.PropTypes.string.isRequired,
  sipId: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf(aipDataTypes).isRequired,
  state: React.PropTypes.oneOf(aipStates).isRequired,
  date: React.PropTypes.string.isRequired, // last event date
  comment: React.PropTypes.string, // last even comment
})

/** Normalizr shape for one AIP status */
const AIPStatus = React.PropTypes.shape({
  content: AIPStatusJSON,
})
export default AIPStatus
