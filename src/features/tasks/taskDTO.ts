type taskDTO = {
  _id?: String;
  name: String;
  dueDate?: String;
  description?: String;
  isCompleted: Boolean;
  isDue: Boolean;
  isReminderSet: Boolean;
  priority: String;
  points: Number;
  parentStory?: String;
  parentProject?: String;
  repeatEveryInterval?: Number;
};

export default taskDTO;
