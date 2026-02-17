import { useDraggable } from "@dnd-kit/core";


export const DraggableSubject = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform,isDragging } = useDraggable({
    id: `subject-${item.id}`,
    data: {
      type: "subject",
      item,
    },
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : "",
    cursor: "grab",
      opacity: isDragging ? 0.3 : 1,

  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}
      className="w-full flex flex-col bg-orange-100 p-4 rounded-2xl">
      <h1 className="text-sm">{item.subject}</h1>
    </div>
  );
};
