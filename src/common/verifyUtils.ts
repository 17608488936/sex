import * as dayjs from "dayjs";

/**
 * 验证工具类
 */

/**
 * 手机号验证
 * @param phone 手机号
 * @returns Boolean
 */
export const verifyPhone = (phone: string) => /^1[3456789]\d{9}$/.test(phone);

// 格式化时间验证
export const formatDateVerify = (
  date: string | Date,
  formatType = "YYYY-MM-DD"
) => dayjs(date).format(formatType);

//生成随机数id
export function randomId(randomLength?: number) {
  return Number(
    Math.random().toString().substr(3, randomLength) + Date.now()
  ).toString(36);
}
