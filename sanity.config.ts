import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

//dotenv.config()

const sanityProjectId = process.env.SANITY_STUDIO_PROJECT_ID // as string (erste option, unsafe typecast)
const sanityDataset = process.env.SANITY_STUDIO_DATASET

if (!sanityProjectId) {
  throw 'Sanity Project Id not defined in env'
}

if (!sanityDataset) {
  throw 'Sanity Dataset not defined in env'
}

export default defineConfig({
  name: 'default',
  title: 'teashop',

  projectId: sanityProjectId,
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
