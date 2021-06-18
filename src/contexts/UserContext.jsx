import { useContext, createContext, useState } from "react";

export const UserContext = createContext();

// context consumption imported by consumption component
export function useUserContext() {
  return useContext(UserContext);
}

// context provider (wraps context consumers)
export function UserContextProvider({ children }) {
	const [user, setUser] = useState(null);
	const [authState, setAuthState] = useState(false);

	return (
		<UserContext.Provider value={{ user, setUser, authState, setAuthState }}>
			{ children }
		</UserContext.Provider>
  );
}