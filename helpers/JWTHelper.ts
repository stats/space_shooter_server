import * as jwt from 'jsonwebtoken';

const AUTH_SECRET = process.env.AUTH_SECRET || 'change_me_make_me_secret';

export class JWTHelper {
  public static createJWToken(details) {
    if (typeof details !== 'object') details = {};

    if(!details.maxAge || typeof details.maxAge !== 'number') details.maxAge = 3600;

    let token = jwt.sign({
      data: details.sessionData
    }, AUTH_SECRET, {
      expiresIn: details.maxAge,
      algorithm: 'HS256'
    });

    return token
  }

  public static verifyToken(token): boolean {
    try {
      jwt.verify(token, AUTH_SECRET, { algorithms: ['HS256']});
      return true;
    } catch (e) {
      return false;
    }
  }

  public static extractUsernameFromToken(token): string {
    const decodedToken = jwt.decode(token);
    return decodedToken.data
  }
}
