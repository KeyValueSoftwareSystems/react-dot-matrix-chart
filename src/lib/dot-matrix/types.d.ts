export interface DataPointType {
  name: string,
  count: number,
  color?: string,
  partialVal? : number
}

export interface DotMatrixPropType {
  title?: string,
  dataPoints: DataPointType[],
  dimensions?: {
    rows: number,
    columns: number
  }
  styles?: {
    Dot: () => {},
    Title: () => {},
    Container: () => {}
  }
}

