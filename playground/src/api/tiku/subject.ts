import { requestClient } from '#/api/request';

export async function getSubject(grade: number) {
  return requestClient.get<any>(
    `${import.meta.env.VITE_USER_SERVER_URL}/study/tiku/getSubject?grade=${grade}`,
  );
}
