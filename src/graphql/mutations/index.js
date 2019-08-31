import gql from 'graphql-tag';

const addEmployee = gql`
    mutation putEmployee($name: String!, $role: String!) {
        putEmployee(input:
        {
            name: $name, 
            role: $role
        }) {
            id
            name
        }
    }
`;

const mutations = {
    addEmployee
}

export default mutations