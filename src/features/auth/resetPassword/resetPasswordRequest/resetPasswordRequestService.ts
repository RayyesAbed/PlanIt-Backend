import User from "../../../../schemas/User";

const resetPasswordRequestService = async (confirmedEmail: string) => {
  const user = await User.findOne({ confirmedEmail: confirmedEmail });
};

export default resetPasswordRequestService;
