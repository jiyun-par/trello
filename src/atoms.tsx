import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
export interface IToDoState {
	[key: string]: string[];
}
const { persistAtom } = recoilPersist({ key: "DragDropTodo" });
export const toDoState = atom<IToDoState>({
	key: "toDo",
	default: {
		"To Do": ["a", "b"],
		Doing: ["c", "d", "e"],
		Done: ["f"],
	},
	// effects_UNSTABLE: [persistAtom],
});
