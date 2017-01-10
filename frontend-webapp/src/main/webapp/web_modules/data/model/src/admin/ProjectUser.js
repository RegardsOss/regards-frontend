export default React.PropTypes.shape({
  content: React.PropTypes.shape({
    id: React.PropTypes.number,
    role: React.PropTypes.shape({
      id: React.PropTypes.number,
      name: React.PropTypes.string,
    }),
    email: React.PropTypes.string,
    lastconnection: React.PropTypes.string,
    status: React.PropTypes.string,
    lastUpdate: React.PropTypes.shape({
      date: React.PropTypes.shape({
        year: React.PropTypes.string,
        month: React.PropTypes.string,
        day: React.PropTypes.string,
      }),
      time: React.PropTypes.shape({
        hour: React.PropTypes.string,
        minute: React.PropTypes.string,
        second: React.PropTypes.string,
        nano: React.PropTypes.string,
      }),
    }),
  }),
})
