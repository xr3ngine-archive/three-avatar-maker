export default {
  "defaultValues": {
    "species": "human",
    "body": "boy",
    "color": "5",
    "clothes": {
      "torso": null,
      "pants": null,
      "boots": null
    }
  },
  "species": [
    { "id": "human", "title": "Humanoid" }
  ],
  "bodies": [
    { "id": "boy", "title": "Boy", "specie": "human", "file": "Body_Boy.gltf" }
  ],
  "clothes": [
    { "id": "no", "title": "No" },
    { "id": "jeans1", "slot": "pants", "title": "Jeans 1", "file": "Jeans.gltf" },
    { "id": "jeans2", "slot": "pants", "title": "Jeans 2", "file": "Jeans_2.gltf" },
    { "id": "shirt1", "slot": "torso", "title": "Shirt 1", "file": "Shirt_1.gltf" },
    { "id": "shirt2", "slot": "torso", "title": "Shirt 2", "file": "Shirt_2.gltf" },
    { "id": "boots", "slot": "boots", "title": "Boots", "file": "Boots.gltf" }
  ],
  "colors": [
    {"id": "0", "value": "#8d5524" },
    {"id": "1", "value": "#c68642" },
    {"id": "2", "value": "#e0ac69" },
    {"id": "3", "value": "#f1c27d" },
    {"id": "4", "value": "#ffdbac" },
    {"id": "5", "value": "#ffffff" },
    {"id": "6", "value": "#76ff00" }
  ]
}
