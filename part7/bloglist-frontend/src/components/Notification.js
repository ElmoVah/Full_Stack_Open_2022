import { connect } from 'react-redux'
import Alert from 'react-bootstrap/Alert';

const Notification = (props) => {
  const notification = props.notification
  console.log(notification)
  const green = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const red = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (notification === null) {
    return null
  }

  return (
    <div>
      {(notification.message &&
        <Alert variant={notification.error ? 'danger' : 'success'}>
          {notification.message}
        </Alert>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)