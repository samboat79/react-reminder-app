import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addReminder, deleteReminder, clearReminders} from '../actions';
import '../index.css';
import moment from 'moment';


class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      text: '',
      dueDate: ''
    }
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);
    this.refs.text.value='';
    this.refs.dueDate.value='';
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminders(){
    const {reminders} = this.props;
      return (
        <ul className="list-group col-sm-4">
          {
            reminders.map(reminder => {
              return (
              <li key={reminder.id} className="list-group-item">
                <div className="list-item row">
                  <div>{reminder.text}</div>
                  <div><em>
                  {moment(new Date(reminder.dueDate)).fromNow()}
                  </em></div>
                </div>
                <div
                className="list-item delete-button"
                onClick={() => this.deleteReminder(reminder.id)}
                >
                  &#x2715;
                </div>
              </li>
            )})
          }
        </ul>
      )
  }

  render() {
        return (
      <div className="App">
        <div className="title">
          Reminder Pro
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
            ref="text"
            placeholder="Got to..."
            className="form-control"
            onChange={event => this.setState({text: event.target.value})}
            />
            <input
            ref="dueDate"
            type="datetime-local"
            className="form-control"
            onChange={event => this.setState({dueDate: event.target.value})}
            />
          </div>
          <button
          className="btn btn-success"
          onClick={() => this.addReminder()}
          >
          Add Reminder
          </button>
        </div>
        {this.renderReminders()}
        <div
        className="btn btn-danger clear"
        onClick={() => this.props.clearReminders()}
        >
        Clear Reminders
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}

export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminders})(App);