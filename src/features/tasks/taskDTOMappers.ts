import taskDTO from "./taskDTO";

const toTaskDTO = (args: any): taskDTO => {
  return {
    _id: args.input._id,
    name: args.input.name,
    dueDate: args.input.dueDate,
    description: args.input.description,
    isCompleted: false,
    isDue: false,
    isReminderSet: args.input.isReminderSet,
    parentStory: args.input.parentStory,
    parentProject: args.input.parentProject,
    repeatEveryInterval: args.input.repeatEveryInterval,
  };
};

export default toTaskDTO;
