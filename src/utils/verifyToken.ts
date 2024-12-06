import { verify, JwtPayload } from "jsonwebtoken";

const verifyToken = (
  token: string
): { email: string; exp?: number } | false => {
  try {
    const secretKey = process.env.SECRET_KEY as string;

    const result = verify(token, secretKey) as JwtPayload;

    if (result && result.email) {
      return { email: result.email, exp: result.exp };
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return false;
    }
  }
  return false;
};

export { verifyToken };
