import type { AuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { users } from '../test_data/users';

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        
        const currentUser = users.find(user => user.email === credentials.email)
        if (currentUser && currentUser.password === credentials.password) {
          const { password, ...userWithoutPass } = currentUser;
          console.log(currentUser);
          return userWithoutPass as User;
        }

        return null
      }
    })
    
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: '/'
  }
}