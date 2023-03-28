import * as l10n from "jm-ez-l10n";
import { RES_STATUS } from "../config/constants";
import { Failure } from "./error";

export class ResponseBuilder {

  public static successMessage(msg: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = 200;
    rb.msg = msg;
    rb.status = RES_STATUS.SUCCESS;
    return rb;
  }

  public static errorMessage(msg?: any): ResponseBuilder {
    console.log("msg",msg)
    const rb: ResponseBuilder = new ResponseBuilder();
    
    rb.code = 500;
    rb.status = RES_STATUS.FAIL;
    rb.error = msg != null ? msg : l10n.t("ERR_INTERNAL_SERVER");
    // rb.error = msg.message ? msg.message : l10n.t("ERR_INTERNAL_SERVER");
    console.log("rb",rb)
    return rb;
  }

  public static badRequest(msg: any, code ?: number, extraPayload ?: any ): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = code || 400;
    rb.error = { message: msg, code: code || 400, status: false, ...extraPayload} ;
    // rb.status = RES_STATUS.FAIL;
    return rb;
  }

  public static data(result, msg?: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = 200;
    result.code = 200;
    result.data = msg ? { message:  msg,  ...result.data} : {  ...result.data };
    rb.result = result;
    return rb;
  }

  public static passArray(result, msg?: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    rb.code = 200;
    result.status = true;
    result.code = 200;
    rb.result = result;
    return rb;
  }

  public static error(err: Failure, msg?: string): ResponseBuilder {
    const rb: ResponseBuilder = new ResponseBuilder();
    if (err instanceof ResponseBuilder) {
      return err;
    }
    rb.code = 500;
    rb.error = err || l10n.t("ERR_INTERNAL_SERVER");
    rb.status = RES_STATUS.FAIL;
    rb.msg = msg || null;
    rb.description = err.description;
    rb.result = err ? l10n.t("ERR_THROW_BY_CODE") : l10n.t("ERR_INTERNAL_SERVER") ;
    return rb;
  }
  public code: number;
  public msg: string;
  public error: any;
  public status: string;
  public result: any;
  public description: string;
}
