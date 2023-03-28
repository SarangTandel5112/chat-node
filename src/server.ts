import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import { Routes } from './route';
import morgan from 'morgan';
import cookieParser from "cookie-parser"
import i18Backend from "i18next-fs-backend";
import i18next from 'i18next';
import i18middleware from "i18next-http-middleware";

dotenv.config();

class App {

    app: express.Application;

    constructor() {
        const NODE_ENV = process.env.NODE_ENV;
        this.app = express();
        this.app.use(cookieParser());
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.json(), (error, req, res, next) => {
            if (error) {
                return res.status(400).json({ message: req.t("ERR_GENRIC_SYNTAX") });
            }
            next();
        });
        const i18nObject = i18next
            .use(i18Backend)
            .use(i18middleware.LanguageDetector)
            .init({
                initImmediate: false,
                preload: ["en"],
                fallbackLng: "en",
                debug: false,
                backend: {
                    loadPath: "src/locales/{{lng}}/translation.json",
                },
            });

        this.app.use(i18middleware.handle(i18next));
        this.app.use(bodyParser.json({ type: "application/vnd.api+json" }));
        this.app.use(morgan("dev"))
        const routes = new Routes(NODE_ENV);

        this.app.all("/*", (req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Request-Headers", "*");

            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Accept-Language, Authorization"
            );
            res.header("Access-Control-Allow-Methods", "GET, POST ,PUT ,DELETE ,PATCH");
            if (req.method === "OPTIONS") {
                // res.writeHead(constant.RES_CODE.success);
                res.end();
            } else {
                next();
            }
        });
        this.app.use("/api", routes.path());

        this.app.use(async (err, req, res, next) => {
            if (err) {
                // logger.error(err);
                return res
                    .status(err.code)
                    .send({
                        // status: constant.RES_STATUS.FAIL, error: err.error
                    });
            } else {
                next();
            }
        });


    }
}

export default new App().app;
