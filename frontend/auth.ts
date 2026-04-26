// import NextAuth from "next-auth";
// import KeycloakProvider from "next-auth/providers/keycloak";
// import type {DefaultJWT} from "@auth/core/jwt";
//
// export const { handlers, auth } = NextAuth({
//   providers: [
//     KeycloakProvider({
//       clientId: process.env.KEYCLOAK_CLIENT_ID!,
//       clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
//       issuer: process.env.KEYCLOAK_ISSUER_URL,
//       authorization: {
//         params: { scope: "openid profile email offline_access" },
//       },
//     }),
//   ],
//
//   session: {
//     strategy: "jwt",
//     maxAge: 60 * 60,
//   },
//
//   callbacks: {
//     async jwt({ token, account }) {
//       const now = Math.floor(Date.now() / 1000);
//
//       if (account) {
//         return {
//           ...token,
//           access_token: account.access_token,
//           refresh_token: account.refresh_token,
//           expires_at: account.expires_at ?? now + 3600,
//         };
//       }
//
//       if (token.exp && now < token.exp) {
//         return token;
//       }
//
//       if (!token.refresh_token) {
//         throw new Error("Missing refresh_token");
//       }
//
//       const response = await fetch(
//           `${process.env.KEYCLOAK_ISSUER_URL}/protocol/openid-connect/token`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: new URLSearchParams({
//               grant_type: "refresh_token",
//               client_id: process.env.KEYCLOAK_CLIENT_ID!,
//               client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
//               refresh_token: String(token.refresh_token),
//             }),
//           }
//       );
//
//       if (!response.ok) {
//        console.error("Failed to refresh token");
//
//         return {
//           ...token,
//           error: "RefreshTokenError",
//         };
//       }
//
//       const refreshed = await response.json();
//
//       return {
//         ...token,
//         access_token: refreshed.access_token,
//         expires_at: now + refreshed.expires_in,
//         refresh_token: refreshed.refresh_token ?? token.refresh_token,
//       };
//     },
//
//     async session({ session, token }) {
//       const jwt = token as ExtendedJWT;
//       session.accessToken = jwt.access_token;
//       session.error = jwt.error;
//
//       return session;
//     },
//   },
// });
//
// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//     error?: "RefreshTokenError";
//   }
// }
//
// interface ExtendedJWT extends DefaultJWT {
//   access_token: string;
//   refresh_token?: string;
//   expires_at: number;
//   error?: "RefreshTokenError";
// }