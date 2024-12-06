import bcrypt from "bcryptjs";

const hashPassword = async (pass: string): Promise<string> => {
  const saltRound: number = 12;

  const hashedPassword = await bcrypt.hash(pass, saltRound);
  return hashedPassword;
};

const comparePassword = async (
  userPass: string,
  hashPass: string
): Promise<boolean | { error: string }> => {
  try {
    const result: boolean = await bcrypt.compare(userPass, hashPass);
    return result;
  } catch (error) {
    console.log("error in compare password\n", error);
    return { error: "can not compare password" };
  }
};

export { hashPassword, comparePassword };
