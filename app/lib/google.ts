import { OAuth2Client } from "google-auth-library";

const GOOGLE_CLIENT_ID = "";
const GOOGLE_CLIENT_SECRET = "";
const GOOGLE_REDIRECT_URI = "http://localhost:5173/auth/google/callback";

const oauthClient = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUri: GOOGLE_REDIRECT_URI,
});

export const generateAuthUrl = (state: string) => {
  return oauthClient.generateAuthUrl({
    access_type: "online",
    scope: ["openid email profile"],
    state,
  });
};

export const getTokenFromCode = async (code: string) => {
  const { tokens } = await oauthClient.getToken(code);
  if (!tokens.id_token) {
    throw new Error("Something went wrong. Please try again.");
  }

  const payload = await oauthClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: GOOGLE_CLIENT_ID,
  });

  const idTokenBody = payload.getPayload();

  if (!idTokenBody) {
    throw new Error("Something went wrong. Please try again.");
  }

  return idTokenBody;
};
