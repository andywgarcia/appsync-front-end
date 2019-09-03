import React, { Component } from 'react';
import gql from 'graphql-tag';
import queries from "../graphql/queries"
import subscriptions from '../graphql/subscriptions';
import EmployeeOverview from './EmployeeOverview';
import EmployeeInput from './EmployeeInput'
import client from '../utils/AppSyncClient';
import { API, graphqlOperation } from 'aws-amplify';


class Employees extends Component {
    employeeSubscription = null;

    state = {
        employees: [],
        employeesWaiting: []
    }

    componentDidMount() {
        // client.query({
        //     query: queries.listEmployees
        // }).then(({ data: { listEmployees } }) => {
        //     console.log(listEmployees);
        //     this.setState({ employees: listEmployees.items }, this.subscribeToNewEmployees)
        // }).catch((err) => {
        //     console.error(err);
        //     this.setState({ result: err })
        // })
        API.graphql(graphqlOperation(queries.listEmployees))
            .then(({ data: { listEmployees: { items: employees } } }) => {
                this.setState({ employees: employees }, this.subscribeToNewEmployees)
            })

    }

    componentWillUnmount() {
        this.employeeSubscription && this.employeeSubscription.unsubscribe();
    }

    subscribeToNewEmployees = async () => {
        // return;
        // const result = await client.subscribe({
        //     query: subscriptions.newEmployee
        // }).subscribe({
        //     next: data => {
        //         console.log("Retrieving data", data)
        //     },
        //     error: error => {
        //         console.error("Error in subscription", error);
        //     }
        // })
        // console.log("subscription reuslt", result);
        this.employeeSubscription = await API.graphql(
            graphqlOperation(subscriptions.newEmployee)
        ).subscribe({
            next: (data) => {
                console.log("Incoming data", data)
                const addedEmployee = data.value.data.newEmployee;
                console.log("Waiting employee", addedEmployee);
                this.setState({
                    employees: [...this.state.employees, addedEmployee],
                })
            }
        });
    }

    loadNewEmployees = async () => {
        this.setState({
            employees: [
                ...this.state.employees,
                ...this.state.employeesWaiting
            ]
        })
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
                {
                    this.state.employeesWaiting.length > 0 && <button onClick={this.loadNewEmployees}>New Employees Available... Load Now</button>
                }
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