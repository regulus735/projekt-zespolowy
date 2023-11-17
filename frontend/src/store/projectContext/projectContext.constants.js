const API_URL = 'http://localhost:8080/api';

export const GET_PROJECTS_URL = `${API_URL}/project`;
export const GET_USERS_URL = `${API_URL}/user/getusers`;
export const GET_TASKS_URL = `${API_URL}/project/project`;
export const ADD_TASK_URL = `${API_URL}/task/addtask`;
export const UPDATE_TASK_STATUS_URL = `${API_URL}/task/updatetaskstatus`;
export const EDIT_TASK_URL = `${API_URL}/task/edittask`;

export const INIT_COLUMNS = [
  { title: 'To do', items: [] },
  { title: 'In progress', items: [] },
  { title: 'Review', items: [] },
  { title: 'Done', items: [] },
];
