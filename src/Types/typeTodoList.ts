export type tTodoList = {
  id: number;
  nameGroup: string; // Название группы
  tasks: tTask[]; // Задачи в группе
};

export type tTask = {
  id: number;
  name: string; // Заголовок задачи
  active: boolean; // активна ли задача
  completed: boolean; // выполнена ли задача
  subTasks?: tList[]; // массив подзадач
};

export type tList = {
  id: number;
  text: string; // Заголовок подзадачи
  active: boolean; // активна ли подзадача
  completed: boolean; // выполнена ли подзадача
};
