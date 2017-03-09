import React, { Component } from 'react';
import axios from 'axios';
import { config } from './config';
import {Table, Column, Cell} from 'fixed-data-table';
import './fixed-data-table.css';

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data[rowIndex][col]}
  </Cell>
);

const ButtonAdd = () => (
  <button>Add new Pet</button>
);

const ButtonDelete = () => (
  <button>X</button>
);

class Pets extends Component {
  constructor(props) {
    super(props);

    this.state = { pets: [] };
    this.defaultOptions = {
      url: '',
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      },
      body: null
    };
  }

  deletePet (id) {
    console.log(id);
  }

  parseJSON(response) {
    return response.data;
  }

  componentDidMount() {
    let vm = this;

    axios.get('http://localhost:3000/pets')
      .then(this.parseJSON)
      .then(function (data) {
        vm.setState(data);
      })
      .catch(function (error) {
        console.log('request failed', error)
      });
  }

  render() {
    return (
      <Table
        rowHeight={35}
        rowsCount={this.state.pets.length}
        width={1000}
        height={(this.state.pets.length + 1) * 35}
        headerHeight={35}
      >
        <Column
          header={<Cell>Type</Cell>}
          cell={<TextCell data={this.state.pets} col="type" />}
          width={200}
        />
        <Column
          header={<Cell>Name</Cell>}
          cell={<TextCell data={this.state.pets} col="name" />}
          width={200}
        />
        <Column
          header={<Cell>Age</Cell>}
          cell={<TextCell data={this.state.pets} col="age" />}
          width={200}
        />
        <Column
          header={<Cell>Description</Cell>}
          cell={<TextCell data={this.state.pets} col="description" />}
          width={400}
        />
      </Table>
    );
  }
}

export default Pets;
