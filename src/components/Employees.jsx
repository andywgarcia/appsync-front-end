import React, { Component } from 'react';
import gql from 'graphql-tag';
import queries from "../graphql/queries"
import subscriptions from '../graphql/subscriptions';
import EmployeeOverview from './EmployeeOverview';
import EmployeeInput from './EmployeeInput'
import client from '../utils/AppSyncClient';

class Employees extends Component {
    state = {
        employees: []
    }

    componentDidMount() {
        client.query({
            query: queries.listEmployees
        }).then(({ data: { listEmployees } }) => {
            console.log(listEmployees);
            this.setState({ employees: listEmployees.items }, this.subscribeToNewEmployees)
        }).catch((err) => {
            console.error(err);
            this.setState({ result: err })
        })
    }

    subscribeToNewEmployees = async () => {
        // return;
        const result = await client.subscribe({
            query: subscriptions.newEmployee
        }).subscribe({
            next: data => {
                console.log(data)
            },
            error: error => {
                console.error(error);
            }
        })
        console.log("subscription reuslt", result);
    }

    getSortedEmployees = () => {
        return this.state.employees.sort(({ name: a }, { name: b }) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        })
    }
    render() {
        const employees = this.getSortedEmployees();
        return (
            <React.Fragment>
                <h1>All Employees (Live Updates)</h1>
                <EmployeeInput />
                {employees.length > 0 ?
                    employees.map(({ id, name, role }) =>
                        (<EmployeeOverview key={id} id={id} name={name} role={role} />))
                    : "Loading..."
                }

            </React.Fragment>

        );
    }
}

export default Employees;