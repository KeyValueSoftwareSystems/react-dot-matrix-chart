import { DataPointType } from "../types";
import { CONTAINER_WIDTH_CONVERSION_FACTOR } from '../constants';
export const getNumberOfDots = (point: DataPointType, rows: number, columns: number, total: number): number =>  {
  const percentage = point.count / total;
  return Math.floor(percentage * rows * columns);
}

export const getContainerWidth = (columns: number): number => columns * CONTAINER_WIDTH_CONVERSION_FACTOR;

export const isColorPresent = (dataPoints: DataPointType[], color: string, dataValues: DataPointType[] = []): boolean => {
  const findColor = dataPoints?.find((e) => e.color === color);
  const colorInLocal = dataValues?.find((e) => e.color === color);
  return Boolean(findColor) || Boolean(colorInLocal);
}