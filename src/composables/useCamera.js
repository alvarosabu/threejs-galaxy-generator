import { PerspectiveCamera } from 'three'

const VERTICAL_FIELD_OF_VIEW = 75 // degrees 45 is the normal

export const useCamera = ({
  fov = VERTICAL_FIELD_OF_VIEW,
  aspectRatio = window.innerWidth / window.innerWidth,
}) => {
  const camera = new PerspectiveCamera(fov, aspectRatio)

  function updateCamera() {
    camera.aspect = aspectRatio
    camera.updateProjectionMatrix()
  }

  return {
    camera,
    updateCamera,
  }
}
