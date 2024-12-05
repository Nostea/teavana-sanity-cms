//import dotenv from 'dotenv'

import {createClient} from '@sanity/client'
//dotenv.config()
const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET
const apiVersion = process.env.SANITY_STUDIO_API_VERSION

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
