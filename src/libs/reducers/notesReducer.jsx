const reducer = (state, action) => {
	switch (action.type) {
		case "INIT":
			return [ ...action.notesFromDB ];
		case "ADD":
			return [...state, {...action.newNote }];
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
export default reducer;