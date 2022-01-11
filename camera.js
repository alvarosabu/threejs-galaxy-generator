import { PerspectiveCamera } from 'three'

const VERTICAL_FIELD_OF_VIEW = 75 // degrees 45 is the normal

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

export const camera = new PerspectiveCamera(
  VERTICAL_FIELD_OF_VIEW,
  sizes.width / sizes.height,
)

camera.position.set(3, 3, 5)

export default camera
