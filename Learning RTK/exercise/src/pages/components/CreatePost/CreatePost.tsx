import React from 'react'

const CreatePost = () => {
  return (
    <form>
    <div className='mb-6'>
      <label htmlFor='title' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
        Title
      </label>
      <input
        type='text'
        id='title'
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
        placeholder='Title'
        required
      />
    </div>
    <div className='mb-6'>
      <label htmlFor='featuredImage' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
        Featured Image
      </label>
      <input
        type='text'
        id='featuredImage'
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
        placeholder='Url image'
        required
      />
    </div>
    <div className='mb-6'>
      <div>
        <label htmlFor='description' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
          Description
        </label>
        <textarea
          id='description'
          rows={3}
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Your description...'
          required
        />
      </div>
    </div>
    <div className='mb-6'>
      <label htmlFor='publishDate' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
        Publish Date
      </label>
      <input
        type='datetime-local'
        id='publishDate'
        className='block w-56 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
        placeholder='Title'
        required
      />
    </div>
    <div className='mb-6 flex items-center'>
      <input
        id='publish'
        type='checkbox'
        className='h-4 w-4 focus:ring-2 focus:ring-blue-500'
      />
      <label htmlFor='publish' className='ml-2 text-sm font-medium text-gray-900'>
        Publish
      </label>
    </div>
    <div>
    </div>
  </form>
  )
}

export default CreatePost