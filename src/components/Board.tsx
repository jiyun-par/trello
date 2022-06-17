import { useForm } from "react-hook-form";
import DraggableCard from "./DraggableCard";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
interface IArearops {
	isDraggingOver: boolean;
	isDraggingFromThis: boolean;
}
const Wrapper = styled.div`
	border-radius: 10px;
	background-color: ${(props) => props.theme.titleColor};
	display: flex;
	flex-direction: column;
`;
const Area = styled.div<IArearops>`
	height: 350px;
	padding: 30px 10px 0px 10px;
	border-radius: 0px 0px 10px 10px;
	background-color: ${(props) =>
		props.isDraggingOver
			? props.theme.highlightColor
			: props.isDraggingFromThis
			? props.theme.highlightColor2
			: props.theme.boardColor};
	flex-grow: 1;
	transition: all 0.3s ease-in-out;
`;

const Title = styled.h1`
	font-size: 17px;
	text-align: center;
	color: #fff;
	padding: 10px;
`;

const Form = styled.form`
	width: 100%;
`;
interface IBoardProps {
	toDos: ITodo[];
	boardId: string;
}
interface IForm {
	toDo: string;
}

function BoardFrame({ toDos, boardId }: IBoardProps) {
	const setToDos = useSetRecoilState(toDoState);
	const { register, setValue, handleSubmit } = useForm<IForm>();
	const onValid = (toDo: IForm) => {
		const newToDo = {
			id: Date.now(),
			text: toDo.toDo,
		};

		setToDos((allBoards) => {
			return {
				...allBoards,
				[boardId]: [newToDo, ...allBoards[boardId]],
			};
		});
		setValue("toDo", "");
	};
	return (
		<Wrapper>
			<Title>{boardId}</Title>
			<Form onSubmit={handleSubmit(onValid)}>
				<input
					style={{ width: "100%", border: "none", height: "30px" }}
					{...register("toDo", { required: true })}
					type="text"
					placeholder={`Add task ${boardId}`}
				/>
				<button></button>
			</Form>
			<Droppable droppableId={boardId}>
				{(magic, info) => (
					<Area
						isDraggingFromThis={Boolean(info.draggingFromThisWith)}
						isDraggingOver={info.isDraggingOver}
						ref={magic.innerRef}
						{...magic.droppableProps}
					>
						{toDos.map((todo, idx) => (
							<DraggableCard
								key={todo.id}
								todoId={todo.id}
								toDoText={todo.text}
								idx={idx}
							/>
						))}
						{magic.placeholder}
					</Area>
				)}
			</Droppable>
		</Wrapper>
	);
}
export default BoardFrame;
