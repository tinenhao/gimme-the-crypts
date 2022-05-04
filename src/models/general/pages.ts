export interface Page {
  label: string
  path: string
  icon: JSX.Element
  page: JSX.Element
  index: number
  subpage?: SubPage
}

export interface SubPage {
  path: string
  page: JSX.Element
}

export interface RootModule {
  moduleName: string
  index: number
  pages: Page[]
}
