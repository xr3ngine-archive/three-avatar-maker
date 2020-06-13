import Layout                        from '../components/layout'
import AvatarEditScreen              from '../components/AvatarEditScreen'
import NoSSR                         from 'react-no-ssr'
import React, { Suspense, useState } from 'react'
import AvatarOptionsPanel from '../components/AvatarOptionsPanel'
import avatarOptions      from '../config/avatar-options'

export default function Home() {

  // TODO: make slots list configurable from list in config, or maybe for each specie their own set of slots
  const [body, setBody] = useState(avatarOptions.defaultValues.body)
  const [color, setColor] = useState(avatarOptions.defaultValues.color)
  const [pants, setPants] = useState(avatarOptions.defaultValues.clothes.pants)
  const [torso, setTorso] = useState(avatarOptions.defaultValues.clothes.torso)
  const [boots, setBoots] = useState(avatarOptions.defaultValues.clothes.boots)

  const slotSetters = {
    'pants': setPants,
    'torso': setTorso,
    'boots': setBoots
  }

  function x({ x, y }){
    return x + y
  }

  const selectedOptions = {
    body: avatarOptions.bodies.find(row => row.id === body),
    color,
    clothes: {
      pants,
      torso,
      boots
    }
  }

  return (
    <Layout>
      <NoSSR>
        <Suspense fallback={ <div>Loading...</div> }>
          <AvatarEditScreen selectedOptions={ selectedOptions }/>
        </Suspense>
      </NoSSR>
      <AvatarOptionsPanel
        avatarOptions={ avatarOptions }
        selectedOptions={ selectedOptions }
        onColorSelect={ (e) => {
          console.log('color select', e)
          setColor(e)
        } }
        onClothSelect={ (cloth, slot) => {
          console.log('cloth select', cloth)
          slotSetters[slot](cloth)
        } }
      />
    </Layout>
  )
}
