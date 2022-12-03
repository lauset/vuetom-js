import { VuetomArr } from 'types'

/**
 * 向数组第一个位置添加元素
 * @param arr 数组
 * @param val 新增元素
 * @returns 数组
 */
const addFirst = (arr: any[], val: any): any[] => {
  arr.unshift(val)
  return arr
}

/**
 * 删除数组第一个位置的元素
 * @param arr 数组
 * @returns 新数组
 */
const removeFirst = (arr: any[]): any[] => {
  if (arr?.length > 0) {
    arr.shift()
  }
  return arr
}

const Arr: VuetomArr = {
  addFirst,
  removeFirst
}

export { Arr }
