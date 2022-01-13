import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

let pane
let fpsGraph
export const useTweakPane = () => {
  if (!pane) {
    pane = new Pane()
    pane.registerPlugin(EssentialsPlugin)
    fpsGraph = pane.addBlade({
      view: 'fpsgraph',
      label: 'fpsgraph',
    })
  }

  return { pane, fpsGraph }
}
