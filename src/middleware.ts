import { isEmpty } from "lodash";
// import { TABLES } from "./config/tables";
import { Jwt } from "./helpers/jwt";
import { Log } from "./helpers/logger";
import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import { User } from "./entities/User";
import { AppDataSource } from "./db/db.config";

export class Middleware {
    private logger = new Log();


    public authenticateUser = async (req, res, next: () => void) => {
        try {
            const unAuthPayload = {
                error: {
                    message: req.i18n.t("ERR_USER_NOT_VERIFIED"),
                    code: 401,
                    status: false,
                },
            };
            if (!isEmpty(req.headers.authorization)) {
                const token = req.headers.authorization;
                const tokenInfo = Jwt.decodeAuthToken(token).payload;
                const userRepo = AppDataSource.getRepository(User);
                const agent = await userRepo.findOneBy({ id: tokenInfo.agentId });
                if (!agent) {
                    unAuthPayload.error.message = req.i18n.t("USER_NOT_EXIST");
                    unAuthPayload.error.code = 404;
                    return res.status(unAuthPayload.error.code).send(unAuthPayload.error);
                }

                const userObj = {
                    email: agent.email,
                    id: agent.id,
                }
                req.user = userObj;
                next()
            }
            else {
                unAuthPayload.error.message = req.i18n.t("ERR_UNAUTH");
                res.status(401).send(unAuthPayload.error);
                return;
            }
        } catch (error) {


        }
    };
}
