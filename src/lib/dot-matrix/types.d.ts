export interface DataPointType {
  name: string,
  count: number,
  color?: string
}
export interface ChartProps {
  dimensions?: DimensionProp,
  styles: StyleProp,
  data: DataPointType[],
  overlappingValues: number[],
  total: number,
  width: number
}

export type DimensionProp = {
  rows?: number;
  columns?: number
}

export type StyleProp = {
  Dot?: () => {},
  DotsContainer?: () => {},
  Container?: () => {},
  LegendContainer?: () => {},
  LegendName?: () => {},
  LegendDot?: () => {}
}
export interface LegendProps {
  styles: StyleProp,
  data: DataPointType[]
}
export interface DotMatrixPropType {
  dataPoints: DataPointType[],
  dimensions?: DimensionProp,
  showLegend?: boolean,
  legendPosition?: 'left' | 'right' | 'top' | 'bottom'
  styles?: StyleProp
}

