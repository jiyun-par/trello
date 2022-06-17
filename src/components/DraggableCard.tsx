import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
	border-radius: 5px;
	padding: 10px 10px;
	background-color: ${(props) =>
		props.isDragging ? props.theme.isDraggingColor : props.theme.cardColor};
	margin-bottom: 10px;
	box-shadow: ${(props) =>
		props.isDragging ? "3px 3px 5px rgba(0,0,0,.5)" : "none"};
`;

interface IDraggableCard {
	todoId: number;
	toDoText: string;
	idx: number;
}
function DraggableCard({ toDoText, todoId, idx }: IDraggableCard) {
	return (
		<Draggable key={todoId} draggableId={todoId + ""} index={idx}>
			{(magic, snapshot) => (
				<Card
					isDragging={snapshot.isDragging}
					ref={magic.innerRef}
					{...magic.dragHandleProps}
					{...magic.draggableProps}
				>
					{toDoText}
				</Card>
			)}
		</Draggable>
	);
}

// export default DraggableCard;
export default React.memo(DraggableCard);
