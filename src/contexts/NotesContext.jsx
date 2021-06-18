import { useContext, createContext, useReducer } from "react";

export const NotesContext = createContext();
export const DispatchContext = createContext();

// context consumption imported by consumption component
export function useNotesContext() {
	return useContext(NotesContext);
}

/* seperate dispatch consumer so components that don't consume notes
are not re-rendered each time they use dispatch*/
export function useNotesDispatchContext() {
	return useContext(DispatchContext);
}

const reducer = (state, action) => {
	switch (action.type) {
		case "INIT":
			return action.notesFromDB;
		case "ADD":
			return [...state, { ...action.newNote }];
		case "DELETE":
			return state.filter(note => note.noteId !== action.noteId);
		case "EDIT":
			return state.map(note =>
				note.noteId === action.noteId ? { ...note, content: action.formContent } : note
			);
		case "TOGGLE":
			return state.map(note =>
				note.noteId === action.noteId ? { ...note, completed: !note.completed } : note
			);
		default:
			return state;
	}
};


// context provider (wraps context consumers)
export function NotesContextProvider(props) {
	const [notes, dispatch] = useReducer(reducer);

	return (
		<NotesContext.Provider value={notes}>
			<DispatchContext.Provider value={dispatch}>
				{props.children}
			</DispatchContext.Provider>
		</NotesContext.Provider>
	);
}