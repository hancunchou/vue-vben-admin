import { requestClient } from '#/api/request';

export namespace QuestionTableApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
   export interface QuestionType {
    [key: string]: any;
    id: string;
    objective: number,
    grades: number;
    subjects: number;
    updateTime: number;
    createTime: number;

    title: string;
    desc: string;

    gradeNames: string[];
    subjectNames: string[];

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
export async function fetchQuestionType(id: any) {
  return requestClient.get<any>(
    `${import.meta.env.VITE_GLOB_API_URL}/study/tiku/fetchQuestionType`,{params:{id}}
  );
}



export async function getQuestionTypes(grade: number,subject: number) {
  return requestClient.get<any>(
    `${import.meta.env.VITE_GLOB_API_URL}/study/tiku/getQuestionTypes`,{params:{grade,subject}}
  );
}

export async function doParseQuestionResult(id: number) {
  return requestClient.get<any>(
    `${import.meta.env.VITE_GLOB_API_URL}/study/admin_doc/doParseQuestionResult`,{params:{id}}
  );
}


export async function getQuestionLists(params: QuestionTableApi.PageFetchParams) {
  return requestClient.post(`${import.meta.env.VITE_GLOB_API_URL}/study/ques/getQuestionLists`, params);
}

export async function getQuestionTypesApi(params: QuestionTableApi.PageFetchParams) {
  return requestClient.post(`${import.meta.env.VITE_GLOB_API_URL}/study/ques/getQuestionTypes`, params);
}
export async function doPaperViewHtml(id: number) {
  return requestClient.get<any>(
    `${import.meta.env.VITE_GLOB_API_URL}/study/admin_doc/doPaperViewHtml`,{params:{id}}
  );
}
