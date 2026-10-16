import { Types } from "mongoose";
import User from "../../../schemas/User";
import Task from "../../../schemas/Task";

const markLateTasks = async (userId: Types.ObjectId | undefined) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("No user found");

  const userTasks = await Task.findOne({ userId: userId });

  if (!userTasks) throw new Error("No user tasks found");

  const now = new Date();

  for (const task of userTasks.list) {
    if (
      task.dueDate &&
      now >= new Date(task.dueDate) &&
      !task.isDue &&
      !task.isCompleted
    ) {
      task.isDue = true;
      user.points -= task.points ?? 0;
    }
  }

  await userTasks.save();
  await user.save();
};

export default markLateTasks;
