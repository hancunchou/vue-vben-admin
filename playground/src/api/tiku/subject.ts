import { requestClient } from '#/api/request';

export async function getSubject(grade: number) {
  return requestClient.get<any>(
    `${import.meta.env.VITE_GLOB_API_URL}/study/tiku/subject?grade=${grade}`,
  );
}
