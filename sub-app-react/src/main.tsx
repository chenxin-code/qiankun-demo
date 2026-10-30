import React from 'react'
import ReactDOM from 'react-dom/client'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import App from './App'

let root: ReactDOM.Root | null = null

function render(props: any = {}) {
  const { container } = props
  let rootElement: HTMLElement | null
  
  if (container) {
    rootElement = container.querySelector('#root')
    if (!rootElement) {
      rootElement = document.createElement('div')
      rootElement.id = 'root'
      container.appendChild(rootElement)
    }
  } else {
    rootElement = document.getElementById('root')
  }
  
  root = ReactDOM.createRoot(rootElement!)
  root.render(<React.StrictMode><App /></React.StrictMode>)
}

renderWithQiankun({
  bootstrap() {
    console.log('[sub-app-react] bootstrapped')
  },
  mount(props) {
    console.log('[sub-app-react] mounted', props)
    render(props)
  },
  unmount() {
    console.log('[sub-app-react] unmounted')
    if (root) {
      root.unmount()
      root = null
    }
  },
  update() {
    console.log('[sub-app-react] updated')
  }
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render()
}
