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
exports.changePassword = void 0;
const generalServices_js_1 = require("../../model/services/generalServices.js");
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const changePassData = req.body;
        const oldUserData = {
            email: changePassData.email,
            password: changePassData.oldPassword,
            id: 0,
            role: "",
        };
        (0, generalServices_js_1.getUser)(oldUserData, (err, user) => {
            if (err) {
                return res.status(500).json({ "message": err.message });
            }
            else {
                const newUserData = {
                    email: changePassData.email,
                    password: changePassData.newPassword,
                    id: user.id,
                    role: user.role,
                };
                (0, generalServices_js_1.changeUserPassword)(newUserData, (err, isOk) => {
                    const result = {
                        isOk: isOk,
                    };
                    if (err) {
                        return res.status(500).json({ "message": err.message });
                    }
                    res.status(200).json(result);
                });
            }
        });
    });
}
exports.changePassword = changePassword;
;
