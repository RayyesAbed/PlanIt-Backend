const createFakeUser = (existingUser: FakeUser) => {
  return {
    _id: existingUser._id,
    name: existingUser.name,
    toBeConfirmedEmail: existingUser.toBeConfirmedEmail,
    preferredLanguage: existingUser.preferredLanguage,
    isShadow: true,
  };
};

export default createFakeUser;
