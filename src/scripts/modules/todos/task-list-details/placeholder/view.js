import BaseView from "base/view";
import { template } from "common/decorators";
import ListPlaceholderTemplate from "./template.tmpl";

@template(ListPlaceholderTemplate)
export default class ListPlaceholderView extends BaseView {}
