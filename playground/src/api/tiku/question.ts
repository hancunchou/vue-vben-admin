import { requestClient } from '#/api/request';

export namespace QuestionTableApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
}

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

export async function getQuestionTypes(grade: number,subject: number) {
  return requestClient.get<any>(
    `${import.meta.env.VITE_GLOB_API_URL}/study/tiku/getQuestionTypes?grade=${grade}&subject=${subject}`,
  );
}

/**
 * 获取示例表格数据
 */
export async function getQuestionLists(params: QuestionTableApi.PageFetchParams) {
  return requestClient.get(`${import.meta.env.VITE_GLOB_API_URL}/study/tiku/getQuestionLists`, { params });
}

