
export const videoSchema = {
  type: 'object',
  required: ['newExt', 'resolution'],
  properties: {
    newExt: {
      type: 'string',
    },
    resolution: {
      type: 'string',
    },
  }
}
