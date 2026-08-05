// models/ApiLog.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const apiLogSchema = new Schema({
    method: String,
    url: String,
    headers: Schema.Types.Mixed,
    query: Schema.Types.Mixed,
    params: Schema.Types.Mixed,
    requestBody: Schema.Types.Mixed,
    responseBody: Schema.Types.Mixed,
    statusCode: Number,
    responseTimeMs: Number,
    ip: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ApiLog", apiLogSchema);
