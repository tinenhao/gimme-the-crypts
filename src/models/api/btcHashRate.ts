export interface dataPoint {
  x: number
  y: number
}

export interface rootModule {
  status: string
  name: string
  unit: string
  period: string
  description: string
  values: dataPoint[]
}

export interface pools {
  [key: string]: string
}
