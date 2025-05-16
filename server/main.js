"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var dotenv_1 = require("dotenv");
var fastify_1 = require("fastify");
var cors_1 = require("@fastify/cors");
var static_1 = require("@fastify/static");
var path_1 = require("path");
// loading the .env file to ensure, you can get key
dotenv_1.default.config({ path: '../.env' });
var mongoDbKey = process.env.MONGO_DB_KEY;
var uri = "mongodb+srv://randomacc12411:".concat(mongoDbKey, "@cluster0.y0nio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
var sponsorFormDataSchema = new mongoose_1.Schema({
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    supportType: { type: String, required: true },
    amount: { type: String, required: true },
    companyName: { type: String, required: true },
});
var FormDataModel = (0, mongoose_1.model)('SponsorFormData', sponsorFormDataSchema);
run().catch(function (err) { return console.error('MongoDB connection error:', err); });
function run() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Connecting to the database...');
                    return [4 /*yield*/, (0, mongoose_1.connect)(uri)];
                case 1:
                    _a.sent();
                    console.log('Successfully connected to the database!');
                    return [2 /*return*/];
            }
        });
    });
}
var fastify = (0, fastify_1.default)({
    logger: true
});
fastify.register(static_1.default, {
    root: path_1.default.join(__dirname, "dist"),
    prefix: "/dist/",
});
//cors very important else, we wouldn't be able to make a request
await fastify.register(cors_1.default, {
    origin: function (origin, cb) {
        var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
        if (!origin || allowedOrigins.includes(origin)) {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});
fastify.post('/sendInformation', function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var data, newSponsor, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = request.body;
                newSponsor = new FormDataModel(data);
                return [4 /*yield*/, newSponsor.save()];
            case 1:
                _a.sent();
                reply.code(201).send({ success: true, message: 'Sponsor data saved successfully.' });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Failed to save sponsor data:', error_1);
                reply.code(500).send({ success: false, message: 'Failed to save sponsor data.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
fastify.get('/getInformation', function (_request, reply) { return __awaiter(void 0, void 0, void 0, function () {
    var sponsors, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, FormDataModel.find()];
            case 1:
                sponsors = _a.sent();
                reply.code(200).send(sponsors);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Failed to retrieve sponsor data:', error_2);
                reply.code(500).send({ success: false, message: 'Failed to retrieve sponsor data.' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Listen on port 3001 for development purposes since vite has 3000 very important.
fastify.listen({ port: 3001 }, function (err) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
