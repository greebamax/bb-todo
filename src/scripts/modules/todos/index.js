import TaskListsRouter from "./router";
import TaskListsController from "./controller";

export default {
  appRoutes: TaskListsController.appRoutes,
  name: "TodosModule",
  router: TaskListsRouter,
};
