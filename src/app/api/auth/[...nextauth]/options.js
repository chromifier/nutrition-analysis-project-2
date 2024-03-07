import GitHubProvider from "next-auth/providers/github";
import upsertUser from '@/src/app/api/users/upsertUser'

export const options = {
    providers: [
        GitHubProvider({
            profile(profile) {
                console.log("Profile GitHub", profile);

                let userRole = "GitHub User";
                if (profile?.email === "jmulkinj@gmail.com") {
                    userRole = "admin";
                }

                return {
                    ...profile,
                    userId: this.id,
                    role: userRole
                }
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) token.role = user.role;

            return token;
        },

        async session({session, token}) {
            if (session?.user) {
                session.user.role = token.role;
            }

            return session;
        }
    },
    events: {
        async signIn({ user }) {
            const data = {
                email: user.email,
                name: user.name,
                userID: user.id,
                username: user.login,
                profileImg: user.avatar_url
            }
            console.log("Data passed to upsertUser:", data);
            await upsertUser(data);
        },
    }
};