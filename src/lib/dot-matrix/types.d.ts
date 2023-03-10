export interface DataPointType {
  name: string,
  count: number,
  color?: string
}

export interface DotMatrixPropType {
  dataPoints: DataPointType[],
  dimensions?: {
    rows?: number,
    columns?: number
  }
  styles?: {
    Dot?: () => {},
    DotsContainer?: () => {},
    Container?: () => {},
    LegendContainer?: () => {},
    LegendName?: () => {},
    LegendDot?: () => {}
  }
}

