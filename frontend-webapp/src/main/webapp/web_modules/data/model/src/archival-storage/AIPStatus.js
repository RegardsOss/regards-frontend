/** Possible states for AIP in storage process */
export const possibleAIPStates = [
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
  state: React.PropTypes.oneOf(possibleAIPStates).isRequired, // last event date
  date: React.PropTypes.date.isRequired, // last even comment
  comment: React.PropTypes.string,
})

/** Normalizr shape for one AIP status */
const AIPStatusShape = React.PropTypes.shape({
  content: AIPStatusJSON,
})
export default AIPStatusShape
