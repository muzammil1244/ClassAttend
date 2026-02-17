import { useDraggable } from "@dnd-kit/core";


export const DraggableTeacher = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform,isDragging } = useDraggable({
    id: `teacher-${item.id}`,
    data: {
      type: "teacher",
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
      <h1 className="text-sm">{item.name}</h1>
      <h2 className="text-sm">{item.email}</h2>
    </div>
  );
};
