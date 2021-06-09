import { useContext, createContext, useState, useEffect } from "react";
import { getNotes } from "./apiLib";

export const UserContext = createContext();
export const NotesContext = createContext();
export const NotesDispatchContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}
export function useNotesContext() {
  return useContext(NotesContext);
}
export function useNotesDispatchContext() {
  return useContext(NotesDispatchContext);
}

export function AppProvider(props) {
	const [notes, setNotes] = useState(null)
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
			<NotesContext.Provider value={{ notes, setNotes }}>
					{props.children}
			</NotesContext.Provider>
		</UserContext.Provider>
  );
}