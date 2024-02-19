import GitHubProvider from "next-auth/providers/github";

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
            if (session?.user) session.user.role = token.role;

            return session;
        }
    }
};