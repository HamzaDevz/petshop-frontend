import React, { Component } from 'react';
import axios from 'axios';
import config from './config';
import _ from 'lodash';
import './Form.css';

// MyElems
const ButtonDelete = (props) => !props.show ? null : <button className="btn" onClick={props.onDelete}>Close Form</button>;
const ButtonAdd = (props) => <button className="btn" onClick={props.onAdd}>Add new pets</button>;
const ErrorForm = () => <p>mon message d'erreur</p>;
const Error = (props) => !props.show ? null : <ErrorForm />;

const Forms = (props) =>
  (props.showForm && props.onSubmit) ?
    (<form onSubmit={props.onSubmit}>
      <label>
        Type:
        <input type="text" name="type" />
      </label>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <label>
        Age:
        <input type="text" name="age" />
      </label>
      <label>
        Description:
        <input type="text" name="description" />
      </label>
      <input type="submit" value="Add me" />
    </form>) :
    null;

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showError: false,
      displayForm: false,
      showForm: false
    };

    this.config = new config;
    this.addForm = this.addForm.bind(this);
    this.removeForm = this.removeForm.bind(this);
    this.launchApi = this.launchApi.bind(this);
  }

  clearAll() {
    return {showForm: false, showError: false};
  }

  addForm() {
    this.setState({showForm: true, showError: false});
  }

  removeForm() {
    this.setState(this.clearAll());
  }

  launchApi = (e) => {
    e.preventDefault();

    let array = {type: 'required', name: 'required', age: 'optional', description: 'optional'};
    let values = {};
    let isValid = true;

    _.forEach(array, (v, k) => (v === 'required' && _.isEmpty(e.target[k].value)) ? isValid = false : values[k] = e.target[k].value);

    this.setState({showError: !isValid});

    if (isValid) {
      axios.post(this.config.myHost() + this.config.myEndpoint('pets'), values)
        .then(function (data) {
          // OK ! reload table pets
        })
        .catch(function (error) {
          // ERROR display !
          console.log('request failed', error);
        });
    }
  };

  render() {
    return (
      <div>
        <ButtonAdd class="btn" onAdd={this.addForm} />
        <Forms showForm={this.state.showForm} onSubmit={this.launchApi} />
        <ButtonDelete show={this.state.showForm} class="btn" onDelete={this.removeForm} />
        <Error show={this.state.showError} />
      </div>
    );
  }
}

export default Form;
