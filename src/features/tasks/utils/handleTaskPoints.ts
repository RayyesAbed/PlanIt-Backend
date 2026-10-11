import taskDTO from "../taskDTO";
import enTaskPriority from "../types/TaskPriority";

const handleTaskPoints = (taskDTO: taskDTO) => {
  if (taskDTO.priority == enTaskPriority.SOMEDAY) {
    taskDTO.points = 10;
  } else if (taskDTO.priority == enTaskPriority.FOCUS) {
    taskDTO.points = 25;
  } else {
    taskDTO.points = 60;
  }
};

export default handleTaskPoints;
