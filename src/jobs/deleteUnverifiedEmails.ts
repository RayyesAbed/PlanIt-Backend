import cron from "node-cron";
import User from "../schemas/User";

const deleteUnverifiedEmails = cron.schedule("0 * * * *", async () => {
  try {
    const cutoff = new Date(Date.now() - 60 * 60 * 1000);

    await User.deleteMany({
      confirmedEmail: { $exists: false },
      createdAt: { $lt: cutoff },
    });
  } catch (error) {
    console.error("[Cron] error while deleting unverified users: ", error);
  }
});

export default deleteUnverifiedEmails;
