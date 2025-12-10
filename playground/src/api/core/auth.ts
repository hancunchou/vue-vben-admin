import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    token: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
  export interface SendVerifyCodeResult {
    data: string;
    status: number;
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>(
    `${import.meta.env.VITE_USER_SERVER_URL}/user/auth/login`,
    data,
  );
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>(
    `${import.meta.env.VITE_USER_SERVER_URL}/user/auth/refresh`,
    {
      withCredentials: true,
    },
  );
}

export async function sendVerifyCodeApi(phoneNumber: string) {
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  return baseRequestClient.post<AuthApi.SendVerifyCodeResult>(
    `${import.meta.env.VITE_USER_SERVER_URL}/user/auth/sendverifycode`,
    { mobile: phoneNumber },
    config,
  );
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post(
    `${import.meta.env.VITE_USER_SERVER_URL}/user/auth/logout`,
    {
      withCredentials: true,
    },
  );

  //   {
  //   "code": 0,
  //   "data": "",
  //   "error": null,
  //   "message": "ok"
  // }
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>(
    `${import.meta.env.VITE_USER_SERVER_URL}/user/my/codes`,
  );
}
