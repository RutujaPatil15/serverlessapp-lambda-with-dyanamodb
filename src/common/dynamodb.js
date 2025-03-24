const { DynamoDBClient, PutItemCommand, GetItemCommand, QueryCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");



// Initialize DynamoDB client
const client = new DynamoDBClient({
    region: 'enter region', // Replace with your AWS region
});

const createUser = async (item, tableName) => {
    try {
        const timestamp = new Date().toISOString();
        const params = {
            TableName: tableName,
            Item: {
                "Email": { S: item.Email },
                "Country": { S: item.Country },
                "FirstName": { S: item.FirstName },
                "createdAt": { S: timestamp },
                "updatedAt": { S: timestamp }
            }
        };
        const command = new PutItemCommand(params);
        const response = await client.send(command);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Error while creating user");
    }
};

const getUser = async (email, tableName) => {
    try {
        const input = {
            "TableName": tableName,
            "Key": {
                Email: { S: email }
            },
            "ProjectionExpression": "Email, Country "
        }
        const command = new GetItemCommand(input);
        const response = await client.send(command);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("error");
    }
}


const getUserbyCountryandCreatedAt = async (item, tableName) => {
    try {
        const input = {
            TableName: tableName,
            IndexName: "createdAtIndex",
            KeyConditionExpression: "Country = :Country and CreatedAt < :CreatedAt",
            FilterExpression: "FirstName = :FirstName",
            ExpressionAttributeValues: {
                ":Country": { S: item.Country },
                ":CreatedAt": { S: item.CreatedAt },
                ":FirstName": { S: item.FirstName }
            },
            ProjectionExpression: "Email, Country, FirstName"
        }
        const command = new QueryCommand(input);
        const response = await client.send(command);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("error");
    }
}

const getUserbyCountryandCreatedAtScan = async (item, tableName) => {
    try {
        const input = {
            "TableName": tableName,
            "IndexName": "createdAtIndex",
            "FilterExpression": "FirstName = :FirstName and Country = :Country and CreatedAt = :CreatedAt",
            "ExpressionAttributeValues": {
                ":Country": { S: item.Country },
                ":CreatedAt": { S: item.CreatedAt },
                ":FirstName": { S: item.FirstName }
            },
            "ProjectionExpression": "Email, Country, FirstName",
            "ReturnConsumedCapacity": "TOTAL"
        }
        const command = new ScanCommand(input);
        const response = await client.send(command);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("error");
    }
}



module.exports = {
    createUser,
    getUser,
    getUserbyCountryandCreatedAt,
    getUserbyCountryandCreatedAtScan
}