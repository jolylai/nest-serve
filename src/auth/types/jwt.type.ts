export type JwtPayloadType = {
  id: string;
  sessionId: string;
  iat: number;
  exp: number;
};

export type JwtRefreshPayloadType = {
  sessionId: string;
  hash: string;
  iat: number;
  exp: number;
};
