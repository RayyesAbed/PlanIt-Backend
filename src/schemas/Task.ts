import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  list: [
    {
      name: {
        type: String,
        required: true,
      },
      dueDate: String,
      description: String,
      isCompleted: {
        type: Boolean,
        required: true,
      },
      isDue: {
        type: Boolean,
        required: true,
      },
      isReminderSet: {
        type: Boolean,
        required: true,
      },
      parentStory: String, // TODO: change it to match user story ID
      parentProject: String, // TODO: change it to match user project ID
      repeatEveryInterval: Number,
    },
  ],
});

export default mongoose.model("Task", TaskSchema);
