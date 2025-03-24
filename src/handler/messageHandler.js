const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda"); // CommonJS import
const config = require('../config/constant');
const client = new LambdaClient({
    region: 'your region'
});

module.exports.messageHandler = async (params) => {
    try {
        const input = {
            FunctionName: config.SENDMESSAGEFUNCTION,
            InvocationType: "Event",
            Payload: JSON.stringify(params),
        };
        const command = new InvokeCommand(input);
        const response = await client.send(command);
    } catch (error) {
        console.log(error);
    }
}