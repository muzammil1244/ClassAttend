
import { useDroppable } from "@dnd-kit/core";
export const AssignDropZone = () => {
  const { setNodeRef } = useDroppable({
    id: "assign-zone",
  });

  return (
    <div
      ref={setNodeRef}
      className="w-full h-full bg-green-50 border-2 border-dashed border-green-400 rounded-2xl flex flex-col gap-3 p-4"
    >
      <p className="text-center font-semibold">Drop Here</p>
    </div>
  );
};
