const rejectEmailInjection = (value: string) => {
  if (
    typeof value !== "string" ||
    /\$/.test(value) || // only block $
    /\\u0024/i.test(value) // encoded $
  ) {
    throw new Error("Invalid input!");
  }
  return true;
};

export default rejectEmailInjection;
