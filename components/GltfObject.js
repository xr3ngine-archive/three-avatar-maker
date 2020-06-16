import React, { useEffect, useRef, useState } from 'react'
import { useLoader, useFrame }                from 'react-three-fiber'
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

// temporary hack, while import is not working (https://discourse.threejs.org/t/can-not-load-gltfloader-in-nextjs-application/12317/11)
// let GLTFLoader

export default function GltfObject({
                                     src,
                                     node,
                                     onLoaded,
                                     ...props
                                   }) {
  const GLTFLoader = require('three/examples/jsm/loaders/GLTFLoader').GLTFLoader

  console.log('src', src)

  const { nodes, animations } = useLoader(GLTFLoader, src)
  if (typeof onLoaded === 'function') {
    onLoaded({ nodes, animations })
  }

  console.log('nodes', nodes)
  console.log('animations', animations)

  const nodeKey = node ? node : 'Scene'

  if (typeof nodes[nodeKey] === 'undefined') {
    console.warn('There is no node with key', nodeKey)
    return null
  }

  /*
   */
  return (
    <group { ...props } dispose={ null }>
      <primitive object={ nodes[nodeKey] }/>
    </group>
  )
}
