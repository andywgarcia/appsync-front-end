import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';


export default new AWSAppSyncClient({
    url: "http://localhost:3002/graphql",
    region: 'us-west-2',
    auth: {
        type: AUTH_TYPE.API_KEY, // or type: awsconfig.aws_appsync_authenticationType,
        apiKey: "ecd7uvj7k5fnpk3pq5pr6mdubi",
    }
});