import BaseModel from "base/model";
import EditableItem from "common/mixins/editable-item";
import Reversible from "common/mixins/reversible";

export default class Task extends BaseModel {
  get mixins() {
    return [EditableItem, Reversible];
  }

  get defaults() {
    return {
      done: false,
      content: null,
      dateAdded: null,
    };
  }
}
