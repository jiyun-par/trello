import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
	border-radius: 5px;
	padding: 10px 10px;
	background-color: ${(props) => props.theme.cardColor};
	margin-bottom: 10px;
`;

interface IDraggableCard {
	todo: string;
	idx: number;
}
function DraggableCard({ todo, idx }: IDraggableCard) {
	return (
		<Draggable key={todo} draggableId={todo} index={idx}>
			{(magic) => (
				<Card
					ref={magic.innerRef}
					{...magic.dragHandleProps}
					{...magic.draggableProps}
				>
					{todo}
				</Card>
			)}
		</Draggable>
	);
}

// export default DraggableCard;
export default React.memo(DraggableCard);
