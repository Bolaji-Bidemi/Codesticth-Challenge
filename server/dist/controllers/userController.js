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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const utility_1 = require("../utils/utility");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, confirmPassword } = req.body;
        const validateInput = utility_1.registerSchema.validate(req.body, utility_1.option);
        if (validateInput.error) {
            return res.status(400).json({
                Error: validateInput.error.details[0].message
            });
        }
        //Generate salt 
        const salt = yield (0, utility_1.GenerateSalt)();
        //Generate password
        const userPassword = yield (0, utility_1.GeneratePassword)(password, salt);
        //check if the user exist
        const userExist = yield userModel_1.default.findOne({ email: email });
        if (!userExist) {
            const user = yield userModel_1.default.create({
                email: email,
                password: userPassword,
                salt: salt
            });
            return res.status(201).json({
                Message: "Created successfully",
                user
            });
        }
        return res.status(400).json({
            Error: "Invalid email or password"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            Error: "Internal Server Error"
        });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const validateInput = utility_1.loginSchema.validate(req.body, utility_1.option);
        if (validateInput.error) {
            return res.status(400).json({
                Error: validateInput.error.details[0].message
            });
        }
        //check if the user exist
        const userExist = yield userModel_1.default.findOne({ email: email });
        if (userExist) {
            const userPassword = yield (0, utility_1.GeneratePassword)(password, userExist.salt);
            if (userPassword === userExist.password) {
                return res.status(200).json({
                    Message: "Logged in successfully",
                    userExist
                });
            }
            return res.status(400).json({
                Error: "Invalid Credentials"
            });
        }
        return res.status(400).json({
            Error: "User does not exist"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            Error: "Internal Server Error"
        });
    }
});
exports.login = login;
