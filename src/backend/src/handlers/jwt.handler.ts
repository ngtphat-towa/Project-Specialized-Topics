// sign jwt
import jwt from "jsonwebtoken";
import config from "../configs/config";

export function signJWT(payload: object, expiresIn: string | number) {
  return jwt.sign(payload, config.jwt.privateKey, {
    algorithm: "RS256",
    expiresIn,
  });
}

// verify jwt
export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, config.jwt.publicKey);
    return { payload: decoded, expired: false };
  } catch (error) {
    return {
      payload: null,
      expired: (error as Error).message.includes("jwt expired"),
    };
  }
}
