import {defineCliConfig} from 'sanity/cli'
//import dotenv from 'dotenv'

//dotenv.config()

const sanityProjectId = process.env.SANITY_STUDIO_PROJECT_ID
const sanityDataset = process.env.SANITY_STUDIO_DATASET

export default defineCliConfig({
  api: {
    projectId: sanityProjectId,
    dataset: sanityDataset,
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
