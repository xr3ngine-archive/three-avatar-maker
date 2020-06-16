import styles from "./AvatarOptionsPanel.module.css"


export default function AvatarOptionsPanel({ avatarOptions, selectedOptions, onColorSelect, onClothSelect }) {

  console.log('selectedOptions', selectedOptions)

  const colors = avatarOptions.colors.map(color => {
    const style = {
      backgroundColor: color.value
    }
    const colorTitle = color.title? color.title : color.value

    return (<li style={style} title={colorTitle} className={styles.colorBox} key={color.id} onClick={() => { onColorSelect(color) }} />)
  })

  const slots = [
    { "id": "head", "title": "Head"},
    { "id": "torso", "title": "Body"},
    { "id": "pants", "title": "Pants"},
    { "id": "boots", "title": "Boots"},
  ]

  const clothesBlocks = slots.map(({ id: slotId, title}) => {
    const slotOptions = avatarOptions.clothes
      .filter(cloth => !cloth.slot || cloth.slot === slotId)
      .map(cloth => {
        return (<li key={cloth.id} onClick={() => { onClothSelect(cloth, slotId) }}>{cloth.title}</li>)
      })

    return (<div key={slotId} className={styles.clothBlock}>
      <span>{title}</span>: {selectedOptions.clothes[slotId]? selectedOptions.clothes[slotId].title : 'no' }
      <ul>{slotOptions}</ul>
    </div>)
  })

  return (
    <div className={styles.panel}>
      <div>
        <h2>Color</h2>
        <ul>{colors}</ul>
      </div>
      {clothesBlocks}
    </div>
  )
}
