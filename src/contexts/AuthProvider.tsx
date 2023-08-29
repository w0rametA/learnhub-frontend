import * as React from 'react'
import { host } from '../constant'
import { ChildProps, IAuthContext } from '../types/auth.context'

/* Typescript section, JS guys can ignore for now */
export type AuthProviderProps = ChildProps
type UserInfo = Pick<IAuthContext, 'id' | 'token' | 'name'>

type LoginFunc = IAuthContext['login']
type LogoutFunc = IAuthContext['logout']
type GetAuthHeaderFunc = IAuthContext['getAuthHeader']
type IsOwnPostFunc = IAuthContext['isOwnPost']

/* End Typescript section */

const AuthContext = React.createContext<IAuthContext | null>(null)

const retrieveUserData = (token: string) =>
  fetch(`http://${host}/auth/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json())

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false)
  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    id: null,
    token: null,
    name: null,
  })

  const login: LoginFunc = async (username, password) => {
    try {
      // TODO: write login logic here, once you got token, the rest is to retrieve user info from /auth/me API
      const loginInfo = { username, password }
      const res = await fetch(`http://localhost:8000/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
      })

      const data = await res.json()
      const accessToken = data.accessToken
      const { id, token, name } = await retrieveUserData(accessToken)

      // TODO: update login and ALL RELATED STATES after login succeed

      if (data.statusCode === 400 || data.statusCode === 401) {
        throw new Error(data.message)
      }

      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('user', username)
      setIsLoggedIn(true)
      setUserInfo({
        id: id,
        token: token,
        name: name,
      })
    } catch (error: any) {
      // TODO: define how error is handling here
      throw new Error(error.message)
    }
  }

  const logout: LogoutFunc = async () => {
    // TODO: logout procedures
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUserInfo({
      id: null,
      token: null,
      name: null,
    })
  }

  const getAuthHeader: GetAuthHeaderFunc = () => ({
    // TODO: (Optional) if you're interested in complete this function,
    // it'll help generate Authorization header which can be use in fetch() function

    Authorization: `Bearer ${userInfo.token}`,
  })

  const isOwnPost: IsOwnPostFunc = (post) => {
    // TODO: (Optional) if you're interested in complete this function,
    // it'll enable you to use isOwnPost from useAuth() in order to decided if each post can be edited
    return post.postedBy.id === userInfo.id
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        getAuthHeader,
        isOwnPost,
        ...userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
