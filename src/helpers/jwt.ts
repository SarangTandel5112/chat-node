import * as dotenv from "dotenv";
import * as l10n from "jm-ez-l10n";
import * as JWT from "jsonwebtoken";
// import { ResponseBuilder } from "./responseBuilder";
// import * as Constant from "../shared/constants/app.const"
dotenv.config();
import * as fs from "fs";
import { ResponseBuilder } from "./responseBuilder";
export class Jwt {
    /*
    * getAuthToken
    */
    public static getAuthToken(payload) {
        return JWT.sign({ payload }, process.env.JWT_SECRET, { expiresIn: process.env.JwtExpireTime });
    }

    /*
    * decodeAuthToken
    */
    public static decodeAuthToken(token) {
        const decodedToken = JWT.verify(token,process.env.JWT_SECRET);
        if (decodedToken) {
            return decodedToken;
        } else {
            throw ResponseBuilder.badRequest(l10n.t("NOT_VERIFIED_TOKEN"));
        }
    }

    public static encodeString(text: string, secret?: string) {
        return JWT.sign({ text }, secret ? secret : process.env.JWT_SECRET);
    }

    public static decodeString(text: string) {
        return JWT.decode(text);
    }
}
