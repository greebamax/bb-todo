import extend from "lodash/extend";
import BaseModel from "base/model";

export default class Task extends BaseModel {
  constructor(options) {
    super(
      extend(
        {
          defaults: {
            done: false,
            content: null,
          },
        },
        options
      )
    );
  }
}
