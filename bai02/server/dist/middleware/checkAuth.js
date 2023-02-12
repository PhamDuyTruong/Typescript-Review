"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAuth = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const CheckAuth = ({ context: { req } }, next) => {
    if (!req.session.userId) {
        throw new apollo_server_express_1.AuthenticationError("Not authenticated");
    }
    return next();
};
exports.CheckAuth = CheckAuth;
//# sourceMappingURL=checkAuth.js.map