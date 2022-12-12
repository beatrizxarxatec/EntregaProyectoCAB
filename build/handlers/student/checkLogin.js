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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLogin = void 0;
const generalServices_js_1 = require("../../model/services/generalServices.js");
function checkLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        (0, generalServices_js_1.checkUserLogin)(user, (err, loginResult) => {
            if (err) {
                return res.status(404).json({ "message": err.message });
            }
            res.status(200).json(loginResult);
        });
    });
}
exports.checkLogin = checkLogin;
