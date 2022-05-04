export interface Page {
  label: string
  path: string
  icon: JSX.Element
  page: JSX.Element
  subpage?: SubPage
}

export interface SubPage {
  path: string
  page: JSX.Element
}

export interface RootModule {
  moduleName: string
  pages: Page[]
}
