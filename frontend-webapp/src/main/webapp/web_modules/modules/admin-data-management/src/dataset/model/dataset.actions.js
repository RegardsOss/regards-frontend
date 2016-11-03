export const ADD_DATASET = 'dataset/ADD_DATASET'
export function addDataset(name) {
  return {
    type: ADD_DATASET,
    entity: {
      id: Math.floor(Math.random() * 60) + 10, // stub
      name,
    },
  }
}
