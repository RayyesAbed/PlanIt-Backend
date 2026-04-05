type taskDTO = {
  name: String;
  dueDate?: String;
  description?: String;
  isCompleted: Boolean;
  isDue: Boolean;
  isReminderSet: Boolean;
  parentStory?: String;
  parentProject?: String;
  repeatEveryInterval?: Number;
};

export default taskDTO;
