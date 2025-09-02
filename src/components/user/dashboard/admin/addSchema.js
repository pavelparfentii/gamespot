import * as yup from 'yup'

export const addArticleSchema = yup.object({
  game: yup.string().required('Game name is required'),
  title: yup.string().required('Title is required').min(20).max(70),
  editor: yup.string().required('The editor is required').min(20).max(500),
  excerpt: yup.string().required('Excerpt is required').min(20).max(500),
  rating: yup.number().min(0).max(5).notOneOf(['Select from']).required('Rating is required'),
  img: yup.string().url('Invalid URL').required('Image URL is required'),
})
