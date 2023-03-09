import { useMemo} from "react";
import { DataPointType } from '../types';
import { COLOR_PALATTE, DEFAULT_COLUMNS , DEFAULT_ROWS } from '../constants';
import { isColorPresent } from "../utils/utils";

export const useDotMatrix = (dataPoints: DataPointType[], dimensions: { rows?: number, columns?: number }): [DataPointType[], number, number[]] => {

  const [data, total] = useMemo(() => {
    const values: DataPointType[] = [];
    let totalVal = 0
    if (dataPoints) {
      let colorIndex = 0;
      dataPoints.forEach((point: DataPointType) => {
        totalVal += point.count;
        let { color } = point;
        if (!color) {
          do {
            color = COLOR_PALATTE[colorIndex];
            colorIndex++;
          } while (isColorPresent(dataPoints, color, values))
        }
        values.push({ ...point, color });
      })
    }
    return [values, totalVal]
  }, [dataPoints]);

  const overlappingValues: number[] = useMemo(() => {
    const partial: Array<number> = [];
    if (total) {
      data?.forEach((each: DataPointType) => {
        const { rows = DEFAULT_ROWS, columns = DEFAULT_COLUMNS } = dimensions;
        const percentage = each.count / total;
        const partialDots = percentage * rows * columns;
        const value = partialDots - Math.floor(partialDots);
        partial.push(value);
      })
    }
    return partial;
  }, [total]);
  return [data, total, overlappingValues];
}