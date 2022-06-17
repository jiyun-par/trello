import React from "react";
import { createGlobalStyle } from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { toDoState } from "./atoms";
import { useRecoilState } from "recoil";
import BoardFrame from "./components/Board";

const Wrapper = styled.div`
	display: flex;
	max-width: 800px;
	width: 100%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Boards = styled.div`
	display: grid;
	width: 100%;
	gap: 10px;
	grid-template-columns: repeat(3, 1fr);
`;

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
	*{
		box-sizing:border-box;
	}

	body {
		width:100%;
		height:100vh;
		font-family:'Source Sans Pro', sans-serif;
		background-color:${(props) => props.theme.bgColor};
	}
	a{
		color:inherit;
		text-decoration:none;
	}
	li{
		list-style:none;
	}
	button{
		margin:0;
		padding:0;
		background: transparent;
		border:none;
	}

`;

function App() {
	const [toDos, setTodos] = useRecoilState(toDoState);
	const onDragEnd = (info: DropResult) => {
		const { draggableId, destination, source } = info;
		if (destination?.droppableId === source.droppableId) {
			//same board movement

			setTodos((allBoards) => {
				const boardCopy = [...allBoards[source.droppableId]];
				boardCopy.splice(source.index, 1);
				boardCopy.splice(destination?.index, 0, draggableId);
				return { ...allBoards, [source.droppableId]: boardCopy };
			});
		}
		if (destination?.droppableId !== source.droppableId) {
			setTodos((allBoards) => {
				const sourceBoard = [...allBoards[source.droppableId]];
				const targetBoard = [
					...allBoards[destination?.droppableId as any],
				];
				sourceBoard.splice(source.index, 1);
				targetBoard.splice(destination?.index as any, 0, draggableId);
				return {
					...allBoards,
					[source.droppableId]: sourceBoard,
					[destination?.droppableId as any]: targetBoard,
				};
			});
		}
	};

	return (
		<>
			<GlobalStyle />
			<DragDropContext onDragEnd={onDragEnd}>
				<Wrapper>
					<Boards>
						{Object.keys(toDos).map((boardId) => (
							<BoardFrame
								key={boardId}
								boardId={boardId}
								toDos={toDos[boardId]}
							></BoardFrame>
						))}
					</Boards>
				</Wrapper>
			</DragDropContext>
		</>
	);
}

export default App;
