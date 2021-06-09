/*
reducer creates a new version of the state
state equates to the todos object
Data being passed via 'action':
{type: "ADD",task: "walk the dog"}
{type: "REMOVE",id: 1234}
*/
import { useReducer, useEffect } from "react";
import { get, post } from "./apiLib";
import { onError } from "./errorLib";

/* useLocalStorageReducer adds an extra layer to useReducer.
It makes no additions to the dispatch method (just receives it as an input), but it does alter the state.
Either it sets it to the defaultVal or to whatever is stored in local storage upon page load/refresh*/
export function useApiReducer() {
	/* Lazy init: the initial state 'val' will be set by the function
	(3rd arg), using the 2nd arg ie. (defaultVal)=>...) */
	const notesApiReducer = (state, action) => {
		switch (action.type) {
			case "ADD":
				return [...state, { id: action.username, content: action.content, attachment: action.attachment, completed: false }];
			case "REMOVE":
				return state.filter(todo => todo.id !== action.id);
			case "TOGGLE":
				return state.map(todo =>
					todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
				);
			case "EDIT":
				return state.map(todo =>
					todo.id === action.id ? { ...todo, task: action.newTask } : todo
				);
			default:
				return state;
		}
	};

  const [state, dispatch] = useReducer(notesApiReducer, () => {
		let values;
    try {
      values = get("notes","/notes")
    } catch (e) {
      onError(e)
		}
		console.log(values)
    return values;
	});
	// This is run whenever a change to state is generated
	// useEffect(() => {
	// 	console.log("in use effect")
  //   window.localStorage.setItem(key, JSON.stringify(state));
  // }, [state]);

  return [state, dispatch];
}

