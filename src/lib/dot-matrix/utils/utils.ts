import { DataPointType, DotsType, StyleProp } from "../types";
import { Elements } from "../constants";

export const isDecimal = (number: number): boolean => number % 1 !== 0;

export const isColorAlreadyUsed = (
  dataPoints: DataPointType[],
  color: string,
  dataValues: DataPointType[] = []
): boolean => {
  const findColor = dataPoints?.find((e) => e.color === color);
  const colorInLocal = dataValues?.find((e) => e.color === color);
  return Boolean(findColor) || Boolean(colorInLocal);
};

export const getLegendPosition = (
  legendPosition: string
): { flexDirection: string; alignItems: string } => {
  const [position, alignment] = legendPosition.split("-");

  const flexDirection = {
    left: "row-reverse",
    right: "row",
    top: "column-reverse",
    bottom: "column"
  };

  return {
    flexDirection: flexDirection[position],
    alignItems: alignment ? alignment : "center"
  };
};

export const getStyles = (element: Elements, styles: StyleProp): object => {
  const getElementStyle = styles[element];
  if (getElementStyle) {
    return getElementStyle();
  }
  return {};
};

export const findContainerWidth = (id: string): number => {
  const element = document.getElementById(id);
  let value = 0;
  if (element) {
    value = element.clientWidth;
  }
  return value;
};

export const mergeAndSortById = (
  arr1: DotsType[],
  arr2: DotsType[]
): Array<DotsType> => {
  const mergedArray = [...arr2, ...arr1];

  mergedArray.sort((a, b) => a.id - b.id);

  return mergedArray;
};

export const getGradient = (
  colors: (string | undefined)[],
  percentage: number[]
): string => {
  //Assigning the gradient string with first color and percentage
  let str = `linear-gradient(to right, ${colors[0]} ${
    percentage[0] * 100 - 15
  }%, `;
  let prevPercentage = 0;
  //Looping through the colors and percentage array to update the linear gradient with all colors
  for (let i = 1; i < colors.length; i++) {
    str += `${colors[i]} ${(prevPercentage + percentage[i - 1]) * 100 + 15}%`;
    prevPercentage = percentage[i];
    if (i !== colors.length - 1) {
      str += ", ";
    } else {
      str += ")";
    }
  }
  return str;
};

export const getUniqueDots = (dotsToBeMapped: DotsType[]): DotsType[] => {
  const uniqueIds = new Set();

  return dotsToBeMapped.filter((dot) => {
    if (!uniqueIds.has(dot.id)) {
      uniqueIds.add(dot.id);
      return true;
    }
    return false;
  });
};
