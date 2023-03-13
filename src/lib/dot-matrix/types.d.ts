export interface DataPointType {
  name: string,
  count: number,
  color?: string
}
export interface ChartProps {
  dimensions?: DimensionProp,
  getStyles: (string) => {},
  data: DataPointType[],
  overlappingValues: number[],
  total: number
}

export type DimensionProp = {
  rows?: number;
  columns?: number
}

export interface LegendProps {
  getStyles: (string) => {},
  data: DataPointType[]
}
export interface DotMatrixPropType {
  dataPoints: DataPointType[],
  dimensions?: DimensionProp,
  showLegend?: boolean,
  legendPosition?: 'left' | 'right' | 'top' | 'bottom'
  styles?: {
    Dot?: () => {},
    DotsContainer?: () => {},
    Container?: () => {},
    LegendContainer?: () => {},
    LegendName?: () => {},
    LegendDot?: () => {}
  }
}

