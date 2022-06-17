import DraggableCard from "./DraggableCard";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Board = styled.div`
	height: 350px;
	padding: 30px 10px 0px 10px;
	border-radius: 10px;
	background-color: ${(props) => props.theme.boardColor};
`;
const Wrapper = styled.div``;
const Title = styled.h1`
	font-size: 17px;
	text-align: center;
	color: #fff;
	padding: 10px;
	display: inline-block;
	border-radius: 10px;
	background-color: ${(props) => props.theme.titleColor};
`;
interface IBoardProps {
	toDos: string[];
	boardId: string;
}
function BoardFrame({ toDos, boardId }: IBoardProps) {
	return (
		<Wrapper>
			<Title>{boardId}</Title>
			<Droppable droppableId={boardId}>
				{(magic) => (
					<Board ref={magic.innerRef} {...magic.droppableProps}>
						{toDos.map((todo, idx) => (
							<DraggableCard key={todo} todo={todo} idx={idx} />
						))}
						{magic.placeholder}
					</Board>
				)}
			</Droppable>
		</Wrapper>
	);
}
export default BoardFrame;
