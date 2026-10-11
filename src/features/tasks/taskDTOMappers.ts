import taskDTO from "./taskDTO";

const toTaskDTO = (args: any): taskDTO => {
  return {
    _id: args.input._id,
    name: args.input.name,
    dueDate: args.input.dueDate,
    description: args.input.description,
    isCompleted: args.input.isCompleted,
    isDue: args.input.isDue,
    isReminderSet: args.input.isReminderSet,
    priority: args.input.priority,
    points: args.input.points,
    parentStory: args.input.parentStory,
    parentProject: args.input.parentProject,
    repeatEveryInterval: args.input.repeatEveryInterval,
  };
};

export default toTaskDTO;
