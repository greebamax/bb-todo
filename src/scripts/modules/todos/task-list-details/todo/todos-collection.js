// eslint-disable-next-line max-classes-per-file
import extend from "lodash/extend";
import BaseModel from "base/model";
import BaseCollection from "base/collection";

class Todo extends BaseModel {
  constructor(options) {
    super(
      extend(
        {
          defaults: {
            checked: false,
            content: null,
          },
        },
        options
      )
    );
  }
}

export default class TodosCollection extends BaseCollection {
  constructor(options) {
    super(
      extend(
        {
          model: Todo,
        },
        options
      )
    );
  }
}
