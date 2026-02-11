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
