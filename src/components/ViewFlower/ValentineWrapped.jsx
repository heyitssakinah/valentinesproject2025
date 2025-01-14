import React from 'react'

function ValentineWrapped() {
  return (
    <div className='flex items-center justify-center m-10 space-x-8 h-screen max-w-screen'>
    <div className='border-2 border-white rounded-lg bg-gray-400/20 px-4 w-96 h-96 text-2xl sm:text-3xl text-center text-white py-4'
    >describe them in 3 words //100% of them want to spend more time with you</div>
    <div className='border-2 border-white rounded-lg bg-gray-400/20 px-4 w-96 h-96 text-2xl sm:text-3xl text-center text-white py-4'
    >You've received a total of $$ Flowers </div>
    <div className='border-2 border-white rounded-lg bg-gray-400/20 px-4 w-96 h-96 text-2xl sm:text-3xl text-center text-white py-4'
    >The longest message you received was [number of words] words long, from [Name].</div>
    </div>
  )
}

export default ValentineWrapped