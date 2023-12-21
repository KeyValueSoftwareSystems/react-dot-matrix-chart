import { useMemo } from "react";

import { DataPointType, DimensionProp, DotsType } from "../types";
import { COLOR_PALETTE, DEFAULT_COLUMNS, DEFAULT_ROWS } from "../constants";
import {
  isColorAlreadyUsed,
  isDecimal,
  mergeAndSortById
} from "../utils/utils";

export const useDotMatrix = (
  dataPoints: DataPointType[],
  dimensions: DimensionProp
): DotsType[] => {
  const [dotsWithColor, totalDots] = useMemo(() => {
    const dotMatrixData: DataPointType[] = [];
    let totalCount = 0;
    if (dataPoints) {
      let colorIndex = 0;
      dataPoints.forEach((point: DataPointType) => {
        totalCount += point.count;
        let { color } = point;
        if (!color) {
          do {
            color = COLOR_PALETTE[colorIndex];
            colorIndex++;
          } while (isColorAlreadyUsed(dataPoints, color, dotMatrixData));
        }
        dotMatrixData.push({ ...point, color });
      });
    }
    return [dotMatrixData, totalCount];
  }, [dataPoints]);

  //finding the number of dots to be rendered relative to the total number of dots and dimension
  const dots = useMemo(() => {
    const completeDots: number[] = [];
    if (totalDots) {
      dotsWithColor?.forEach((point: DataPointType) => {
        const { rows = DEFAULT_ROWS, columns = DEFAULT_COLUMNS } = dimensions;
        const pointPercentage = point.count / totalDots;
        const dotsCount = pointPercentage * rows * columns;
        completeDots.push(dotsCount);
      });
    }
    return completeDots;
  }, [totalDots, dimensions.columns, dimensions.rows]);

  const dotsToBeMapped = useMemo(() => {
    //Calculating the dots with gradient and subtracting the gradient part from the total number of dots
    const currentDots = [...dots];
    const gradientDots: DotsType[] = [];
    for (let i = 0; i < currentDots.length - 1; i++) {
      if (isDecimal(currentDots[i])) {
        let remainingDecimal = 1 - (currentDots[i] - Math.floor(currentDots[i]));
        const gradientColors = [dotsWithColor[i].color];
        const percentage = [currentDots[i] - Math.floor(currentDots[i])];
        let j = i + 1;
        while (remainingDecimal !== 0) {
          if (currentDots[j] >= remainingDecimal) {
            percentage.push(remainingDecimal);
            currentDots[j] = currentDots[j] - remainingDecimal;
            remainingDecimal = 0;
          } else {
            remainingDecimal = remainingDecimal - dots[j];
            percentage.push(currentDots[j] - Math.floor(currentDots[j]));
            currentDots[j] = 0;
          }
          currentDots[i] = Math.floor(currentDots[i]);
          gradientColors.push(dotsWithColor[j].color);
          j++;
        }
        gradientDots.push({
          id: i,
          count: 1,
          gradientColors: gradientColors ? gradientColors : [],
          gradientPercentage: percentage
        });
      }
    }
    //Calculating the remaining dots with single color
    const singleDots: DotsType[] = [];
    for (let i = 0; i < currentDots.length; i++) {
      if (currentDots[i] !== 0) {
        singleDots.push({
          id: i,
          name: dotsWithColor[i].name,
          count: Math.round(currentDots[i]),
          color: dotsWithColor[i].color
        });
      }
    }
    //merging both arrays and sorting it with respect to id
    return mergeAndSortById(gradientDots, singleDots);
  }, [dataPoints, dimensions.rows,dimensions.columns]);

  return dotsToBeMapped;
};
