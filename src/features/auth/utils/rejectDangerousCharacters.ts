const rejectDangerousCharacters = (value: string) => {
  if (
    typeof value !== "string" ||
    /[\$]/.test(value) || // $ is dangerous
    /\\u0024/i.test(value) // encoded $
  ) {
    throw new Error("Invalid input!");
  }
  return true;
};

export default rejectDangerousCharacters;
