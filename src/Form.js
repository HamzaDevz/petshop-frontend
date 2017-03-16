import React, { Component } from 'react';
import axios from 'axios';
import config from './config';
import _ from 'lodash';
import './Form.css';

const ToggleBtn = (props) => <button className="btn btn-primary" onClick={props.onClick}>{props.formState ? 'Close form' : 'Add a Pet'}</button>;
const Message = (props) => !props.message ? null : <p className="bg-danger">{props.message}</p>;

const Forms = (props) =>
  (props.showForm && props.onSubmit) ?
    (<form className="form-inline" onSubmit={props.onSubmit}>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input type="text" className="form-control" name="type" placeholder="Mammal" />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" name="name" placeholder="Horse" />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input type="text" name="age" className="form-control" placeholder="17" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" name="description" placeholder="Horse's description" rows="3" />
        </div>
        <button type="submit" className="btn btn-default">Add me</button>
      </form>)
    : null;

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMessage: false,
      showForm: false,
      message: ''
    };

    this.config = new config;
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.launchApi = this.launchApi.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({showForm: !prevState.showForm, message: ''}));
  }

  launchApi = (e) => {
    e.preventDefault();

    let rules = {type: 'required', name: 'required', age: 'optional', description: 'optional'};
    let values = {};
    let isValid = true;

    _.forEach(rules, (v, k) => (v === 'required' && _.isEmpty(e.target[k].value)) ? isValid = false : values[k] = e.target[k].value);

    if (!isValid) {
      this.setState({message: 'You need to fill all required fields'});
    }

    if (isValid) {
      axios.post(this.config.myHost() + this.config.myEndpoint('pets'), values)
        .then(function (data) {
          // OK !
          this.setState({message: 'Pet registrered', pets: data});
        }.bind(this))
        .catch(function (error) {
          // ERROR !
          this.setState({message: error});
        }.bind(this));
    }
  };

  render() {
    return (
      <div className="container-form">
        <ToggleBtn class="btn" formState={this.state.showForm} onClick={this.handleToggleClick} />
        <Forms showForm={this.state.showForm} pets={this.state.pets} onSubmit={this.launchApi} />
        <Message message={this.state.message} />
      </div>
    );
  }
}

export default Form;
