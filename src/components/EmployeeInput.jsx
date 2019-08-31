import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import client from '../utils/AppSyncClient';
import mutations from '../graphql/mutations';


class EmployeeInput extends Component {
    state = {
        value: ""
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value })
    }

    addEmployee = () => {
        const { value: employeeName } = this.state;
        client.mutate({
            mutation: mutations.addEmployee,
            variables: {
                name: employeeName,
                role: "New Employee"
            }
        });
    }

    render() {
        return (
            <div>
                <h3>Add an employee below: </h3>
                <input type="text" value={this.state.value} onChange={this.handleChange}></input>
                <button onClick={this.addEmployee}>Add Employee</button>
            </div>
        );
    }
}

EmployeeInput.defaultProps = {

}

EmployeeInput.propTypes = {

}

export default EmployeeInput;