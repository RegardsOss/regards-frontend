

function Time({ time }) {
  return (
    <div>
      {time}
    </div>
  )
}
Time.propTypes = {
  time: React.PropTypes.number.isRequired,
}
export default Time
