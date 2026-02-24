import { requestClient } from '#/api/request';

export async function getPaperDocxLists(params: any) {
  return requestClient.post(`${import.meta.env.VITE_GLOB_API_URL}/study/docx/getPaperDocxLists`, params);
}
export async function getStudyDocIndexLists(params: any) {
  return requestClient.post(`${import.meta.env.VITE_GLOB_API_URL}/study/admin_doc/list`, params);
}
export async function getRawDocLists(params: any) {
  return requestClient.post(`${import.meta.env.VITE_GLOB_API_URL}/study/admin_doc/upfilelist`, params);
}

export async function getDocxBlob(id: number) {
  return requestClient.download<Blob>(`${import.meta.env.VITE_GLOB_API_URL}/study/admin_doc/fetchDocxBlob?id=${id}`);
}
export async function getPaperView(id: number,finaldoc:number=0) {
  return requestClient.get(`${import.meta.env.VITE_GLOB_API_URL}/study/paper/view?id=${id}&finaldoc=${finaldoc}`);
}

