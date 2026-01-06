import { requestClient } from '#/api/request';

export async function addQuestinBaseInfo(data: any) {
  return requestClient.post<any>(
    `${import.meta.env.VITE_GLOB_API_URL}/study/tiku/questionAddBaseInfo`,data
  );
}
export async function addQuestinType(data: any) {
  return requestClient.post<any>(
    `${import.meta.env.VITE_GLOB_API_URL}/study/tiku/addQuestionType`,data
  );
}
