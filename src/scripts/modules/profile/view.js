import BaseView from "base/view";
import { template } from "common/decorators";
import ProfileViewTemplate from "./template.tmpl";

@template(ProfileViewTemplate)
export default class ProfileView extends BaseView {}
