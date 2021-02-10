import BaseView from "base/view";
import { template } from "common/decorators";
import ErrorPageViewTemplate from "./template.tmpl";

@template(ErrorPageViewTemplate)
export default class ErrorPageView extends BaseView {}
