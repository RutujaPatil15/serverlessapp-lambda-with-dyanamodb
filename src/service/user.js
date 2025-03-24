const response = require('../../utils/responseHandling')
const { USERS_TABLE } = process.env;
const { createUser, getUser, getUserbyCountryandCreatedAt, getUserbyCountryandCreatedAtScan } = require("../common/dynamodb");
const { messageHandler } = require('../handler/messageHandler');

module.exports.createUser = async (event, context) => {
    try {
        const body = JSON.parse(event.body);
        const res = await createUser(body, USERS_TABLE);
        await messageHandler(body);
        return { ...response.success, body: JSON.stringify(res) }
    } catch (error) {
        return { ...response.error, body: JSON.stringify(error) }
    }
}


module.exports.getUser = async (event, context) => {
    try {
        const email = event?.queryStringParameters?.Email;
        const res = await getUser(email, USERS_TABLE);
        return { ...response.success, body: JSON.stringify(res) }
    } catch (error) {
        return { ...response.error, body: JSON.stringify(error) }
    }
}

module.exports.getUserbyCountryandCreatedAt = async (event, context) => {
    try {
        const body = JSON.parse(event.body);
        const res = await getUserbyCountryandCreatedAt(body, USERS_TABLE);
        return { ...response.success, body: JSON.stringify(res) }
    } catch (error) {
        return { ...response.error, body: JSON.stringify(error) }
    }
}

module.exports.getUserbyCountryandCreatedAtScan = async (event, context) => {
    try {
        const body = JSON.parse(event.body);
        const res = await getUserbyCountryandCreatedAtScan(body, USERS_TABLE);
        return { ...response.success, body: JSON.stringify(res) }
    } catch (error) {
        return { ...response.error, body: JSON.stringify(error) }
    }
}
