/**
 * Shares level partition key for level index as parameter
 * @param {*} levelIndex level index
 */
export default function getLevelPartitionKey(levelIndex) {
  return `level-${levelIndex}`
}
