import gql from 'graphql-tag';

const listEmployees = gql`
    query {
        listEmployees {
            items {
                name
                id
                role
            }
        }
    }
`;

const queries = {
    listEmployees
}

export default queries