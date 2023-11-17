import { useMemo} from "react";

import { DataPointType } from '../types';
import { COLOR_PALETTE, DEFAULT_COLUMNS , DEFAULT_ROWS } from '../constants';
import { isColorAlreadyUsed } from "../utils/utils";

export const useDotMatrix = (dataPoints: DataPointType[], dimensions: { rows?: number, columns?: number }): [DataPointType[], number, number[]] => {

  const [dotsToBeMapped, totalDots] = useMemo(() => {
    const dotMatrixData: DataPointType[] = [];
    let totalCount = 0
    if (dataPoints) {
      let colorIndex = 0;
      dataPoints.forEach((point: DataPointType) => {
        totalCount += point.count;
        let { color } = point;
        if (!color) {
          do {
            color = COLOR_PALETTE[colorIndex];
            colorIndex++;
          }
          while (isColorAlreadyUsed(dataPoints, color, dotMatrixData))
        }
        dotMatrixData.push({ ...point, color });
      })
    }
    return [dotMatrixData, totalCount]
  }, [dataPoints]);

  //Calculates the fractional contribution of each data point to the total number of dots in the dot matrix
  const fractionalDots: number[] = useMemo(() => {
    const fractionalParts: Array<number> = [];
    if (totalDots) {
      dotsToBeMapped?.forEach((point: DataPointType) => {
        const { rows = DEFAULT_ROWS, columns = DEFAULT_COLUMNS } = dimensions;
        const pointPercentage = point.count / totalDots;
        const partialDots = pointPercentage * rows * columns;
        const dotFraction = partialDots - Math.floor(partialDots);
        fractionalDots?.push(dotFraction);
      })
    }
    return fractionalParts;
  }, [totalDots]);
  return [dotsToBeMapped, totalDots, fractionalDots];
}