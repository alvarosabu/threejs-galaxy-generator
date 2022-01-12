import { Pane } from 'tweakpane'
import * as EssentialsPlugin from '@tweakpane/plugin-essentials'

export const usePane = (parameters, cb) => {
  // GUI related
  const pane = new Pane()
  pane.registerPlugin(EssentialsPlugin)

  pane
    .addInput(parameters, 'count', {
      min: 0,
      max: 100000,
    })
    .on('change', cb)
  pane
    .addInput(parameters, 'size', {
      min: 0.01,
      max: 0.1,
      step: 0.01,
    })
    .on('change', cb)
  pane
    .addInput(parameters, 'radius', {
      min: 0.1,
      max: 20,
      step: 0.01,
    })
    .on('change', cb)
  pane
    .addInput(parameters, 'branches', {
      min: 2,
      max: 10,
      step: 1,
    })
    .on('change', cb)
  pane
    .addInput(parameters, 'spin', {
      min: -5,
      max: 5,
      step: 0.01,
    })
    .on('change', cb)
  pane
    .addInput(parameters, 'randomness', {
      min: 0.1,
      max: 0.2,
      step: 0.01,
    })
    .on('change', cb)
  pane
    .addInput(parameters, 'randomnessPower', { min: 1, max: 10, step: 0.001 })
    .on('change', cb)
  pane.addInput(parameters, 'insideColor').on('change', cb)
  pane.addInput(parameters, 'outsideColor').on('change', cb)

  // FPS graph
  const fpsGraph = pane.addBlade({
    view: 'fpsgraph',
    label: 'fpsgraph',
  })

  return { pane, fpsGraph }
}
