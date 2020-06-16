import * as THREE                             from "three"
import React, {Suspense, useEffect, useRef, useState} from 'react'
import { useLoader, useFrame }                from "react-three-fiber"
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import lerp                                   from "lerp"
import { getMouseDegrees }                    from "../lib/utils"
import GltfObject                             from './GltfObject'

// temporary hack, while import is not working (https://discourse.threejs.org/t/can-not-load-gltfloader-in-nextjs-application/12317/11)
let GLTFLoader

function moveJoint(mouse, joint, degreeLimit = 40) {
  let degrees = getMouseDegrees(mouse.current.x, mouse.current.y, degreeLimit)
  joint.rotation.xD = lerp(joint.rotation.xD || 0, degrees.y, 0.1)
  joint.rotation.yD = lerp(joint.rotation.yD || 0, degrees.x, 0.1)
  joint.rotation.x = THREE.Math.degToRad(joint.rotation.xD)
  joint.rotation.y = THREE.Math.degToRad(joint.rotation.yD)
}

function setBodyColor(nodes, color) {
  const bodyNodesNames = [
    "CC_Base_Body.001_0",
    "CC_Base_Body.001_1",
    "CC_Base_Body.001_2",
    "CC_Base_Body.001_3",
    "CC_Base_Body.001_4",
  ]

  const newColor = new THREE.Color(color? color.value : '#ffffff')

  bodyNodesNames.forEach(nodeName => {
    if (typeof nodes[nodeName] !== 'undefined') {
      console.log('update material', nodes[nodeName].material.name, nodes[nodeName].material)
      nodes[nodeName].material.color = newColor
    }
  })
}

export default function AvatarBody({
                                     mouse,
                                     selectedOptions: { body, color, clothes: { torso, pants, boots } } = { clothes: {} },
                                     ...props }) {
  GLTFLoader = require('three/examples/jsm/loaders/GLTFLoader').GLTFLoader
  const group = useRef()
  // const { nodes, animations } = useLoader(GLTFLoader, 'models/Body_Boy.gltf')

  const modelsData = {
    torso: {},
    pants: {},
    boots: {}
  }

  function setModelsData(slot, data) {
    modelsData[slot] = data

    if (props.castShadow) {
      Object.values(data.nodes).forEach(n => {
        if (n.isMesh && n.material) {
          n.castShadow = true
        }
      })
    }

    if (slot === 'body' && modelsData.body && modelsData.body.nodes && color) {
      setBodyColor(modelsData.body.nodes, color)
    }
  }

  useFrame((state, delta) => {
    // mixer.update(delta)

    Object.values(modelsData).forEach(data => {
      if (!data.nodes) {
        return
      }
      if (typeof data.nodes['CC_Base_NeckTwist01'] !== 'undefined') {
        moveJoint(mouse, data.nodes['CC_Base_NeckTwist01'])
      }
      if (typeof data.nodes['CC_Base_Spine02'] !== 'undefined') {
        moveJoint(mouse, data.nodes['CC_Base_Spine02'])
      }
    })
  })

  // useEffect(() => {
  //   console.log('AvatarBody torso changed', torso)
  // }, [ torso ])
  // useEffect(() => {
  //   console.log('AvatarBody pants changed', pants)
  // }, [ pants ])
  // useEffect(() => {
  //   console.log('AvatarBody boots changed', boots)
  // }, [ boots ])

  useEffect(() => {
    console.log('AvatarBody color changed', color)
    if (modelsData.body && modelsData.body.nodes) {
      setBodyColor(modelsData.body.nodes, color)
    }
  }, [color])

  /*
   */
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0,0,0]} scale={[1, 1, 1]}>
        <Suspense fallback={null}>
        { (body && body.file)? <GltfObject src={'models/' + body.file} onLoaded={data => { setModelsData('body', data) }} node={'Armature001'} /> : null }
        </Suspense>
        <Suspense fallback={null}>
        { (torso && torso.file)? <GltfObject src={'models/' + torso.file} onLoaded={data => { setModelsData('torso', data) }} node={'Armature001'} /> : null }
        </Suspense>
        <Suspense fallback={null}>
        { (pants && pants.file)? <GltfObject src={'models/' + pants.file} onLoaded={data => { setModelsData('pants', data) }} node={'Armature001'} /> : null }
        </Suspense>
      </group>
    </group>
  )
}
