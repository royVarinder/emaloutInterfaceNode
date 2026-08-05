const ApiLog = require("../mongoModels/apiLog");

// Common request handler: logs every request/response to the console and
// persists an API log document to Mongo without blocking the response.
const requestLogger = (req, res, next) => {
    const startTime = Date.now();

    console.log("\n===== Incoming Request =====");
    console.log("Method :>> ", req.method);
    console.log("URL :>> ", req.originalUrl);
    console.log("Headers :>> ", req.headers);
    console.log("Query :>> ", req.query);
    console.log("Params :>> ", req.params);
    console.log("Body :>> ", req.body);
    console.log("=============================\n");

    const originalJson = res.json.bind(res);
    const originalSend = res.send.bind(res);
    let responseBody;

    res.json = (data) => {
        responseBody = data;
        return originalJson(data);
    };

    res.send = (data) => {
        if (responseBody === undefined) {
            responseBody = data;
        }
        return originalSend(data);
    };

    res.on("finish", () => {
        const responseTimeMs = Date.now() - startTime;

        console.log("\n===== Outgoing Response =====");
        console.log("Method :>> ", req.method);
        console.log("URL :>> ", req.originalUrl);
        console.log("Status :>> ", res.statusCode);
        console.log("Response Time :>> ", `${responseTimeMs}ms`);
        console.log("Response Body :>> ", responseBody);
        console.log("==============================\n");

        ApiLog.create({
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            query: req.query,
            params: req.params,
            requestBody: req.body,
            responseBody,
            statusCode: res.statusCode,
            responseTimeMs,
            ip: req.ip,
        }).catch((error) => {
            console.error("Failed to save API log:", error?.message);
        });
    });

    next();
};

module.exports = requestLogger;
