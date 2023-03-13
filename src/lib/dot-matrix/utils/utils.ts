import { DataPointType, StyleProp } from "../types";
import { CONTAINER_WIDTH_CONVERSION_FACTOR, Elements } from '../constants';
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

export const getLegendPosition = (legendPosition: string): {flexDirection: string, alignItems: string} => {
  const flexDirection = {
    left: 'row-reverse',
    right: 'row',
    top: 'column-reverse',
    bottom: 'column'
  };

  const alignment = {
    left: 'end',
    right: 'end',
    top: 'center',
    bottom: 'center'
  }
  return { flexDirection: flexDirection[legendPosition], alignItems: alignment[legendPosition]};
}

export const getStyles = (element: Elements, styles: StyleProp): object => {
  const getElementStyle = styles[element];
  if (getElementStyle) {
    return getElementStyle();
  }
  return {};
};

export const hasOverlapping = (values: number[], indexRow: number, indexColumn: number): boolean => (
  indexColumn === 0 && indexRow > 0 && values[indexRow - 1] < 1 && values[indexRow - 1] !== 0
);