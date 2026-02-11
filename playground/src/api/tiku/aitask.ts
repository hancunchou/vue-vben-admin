import { requestClient } from '#/api/request';

export async function getAiTaskLists(params: any) {
  return requestClient.post(`${import.meta.env.VITE_GLOB_API_URL}/study/admin_parse/tasks`,params);
}

export async function startAITask(params: any) {
  return requestClient.get(`${import.meta.env.VITE_GLOB_API_URL}/study/admin_parse/startTask`,{params});
}
