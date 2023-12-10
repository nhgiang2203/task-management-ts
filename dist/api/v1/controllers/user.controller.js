"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.detail = exports.login = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../../../models/user.model"));
const generateHelper = __importStar(require("../../../helpers/generate"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existEmail = yield user_model_1.default.findOne({
            email: req.body.email,
            deleted: false
        });
        if (existEmail) {
            res.json({
                code: 400,
                message: "Email đã tồn tại !"
            });
            return;
        }
        const newUser = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: (0, md5_1.default)(req.body.password),
            token: generateHelper.generateString(30)
        };
        const user = new user_model_1.default(newUser);
        const data = yield user.save();
        const token = data.token;
        res.cookie("token", token);
        res.json({
            code: 200,
            message: "Đăng kí thành công !",
            data: data
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi !"
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({
            email: req.body.email,
            deleted: false
        });
        if (!user) {
            res.json({
                code: 400,
                message: "Lỗi !"
            });
            return;
        }
        if ((0, md5_1.default)(req.body.password) != user.password) {
            res.json({
                code: 400,
                message: "Sai mật khẩu !"
            });
            return;
        }
        const token = user.token;
        res.json({
            code: 200,
            message: "Đăng nhập thành công !",
            token: token
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi !"
        });
        return;
    }
});
exports.login = login;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            code: 200,
            message: "Thành công !",
            user: req["infoUser"]
        });
    }
    catch (error) {
        res.json({
            code: 400,
            message: "Lỗi !"
        });
    }
});
exports.detail = detail;
