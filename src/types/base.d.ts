export type TValueOf<T> = T[keyof T]

/**
 * 分页
 */
export interface IBasePage {
  /**
   * 每页多少条
   */
  limit: number

  /**
   * 从第几条开始
   */
  skip: number
  /**
   * 总条数
   */
  total: number
}

/**
 * 分页数据结构
 */
export interface IBasePageMap<T> extends IBasePage {
  /**
   * 列表集合
   */
  list: T[]
}

export interface IPage<T> {
  count: number
  list: T[]
}
