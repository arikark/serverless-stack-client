import { useContext, createContext, useState } from "react";

export const UserContext = createContext();
export const NotesContext = createContext();
export const NotesDispatchContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export function useNotesDispatchContext() {
  return useContext(NotesDispatchContext);
}

export function AppProvider(props) {
	const [user, setUser] = useState(null);
	const [authState, setAuthState] = useState(false);
	// setNotes(getNotes)

	return (
		/*
		having seperate contexts stops componenets rerendering
		when they call the dispatch function
		(albeit not touching Notes in state at all)
		*/
		<UserContext.Provider value={{ user, setUser, authState, setAuthState }}>
					{props.children}
		</UserContext.Provider>
  );
}