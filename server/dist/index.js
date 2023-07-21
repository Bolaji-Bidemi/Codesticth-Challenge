"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default.connect(`${process.env.MONGO_URI}`).then(() => {
    console.log(`Database Connected Successfully`);
}).catch(err => {
    console.log('Error', err);
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
app.use('/users', userRouter_1.default);
const port = process.env.PORT || 3005;
app.listen(3005, () => {
    console.log('Server listening on port 3000');
});
