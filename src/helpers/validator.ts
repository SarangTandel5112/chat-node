import { Model } from "./model";

export class Validator {
  public validate(arg: Model) {
    const classThis = this;
    return (req, res, next) => {
      Model.getModel(arg, req.body, req.params).then((m2) => {
        req.model = m2;
        next();
      }).catch((err) => {
        const error = err.length > 0 ?
          classThis.getError(err) : err;
        return res.status(400).json({ error, code: 400 });
      });
    };
  }
  private getError(err) {
    if (err[0].constraints) {
      return err[0].constraints[Object.keys(err[0].constraints)[0]];
    } else {
      return this.getError(err[0].children);
    }
  }

}