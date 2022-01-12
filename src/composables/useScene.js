import { Scene } from 'three'

export const useScene = () => {
  const scene = new Scene()

  return {
    scene,
  }
}
