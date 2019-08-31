import gql from 'graphql-tag';

const newEmployee = gql`
    subscription {
        newEmployee {
            name
            id
            role
        }
    }
`;

const subscriptions = {
    newEmployee
}

export default subscriptions