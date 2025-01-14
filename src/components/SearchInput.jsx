
function SearchInput({handleSearch}) {
    return (
          <div className='w-full flex justify-center items-center mt-12'>
              <input 
                type='text' 
                placeholder='Search name or email' 
                onChange={handleSearch} 
                className='border-gray-600 placeholder:text-sm placeholder:italic mt-36 mb-6 sm:mt-20 placeholder:text-slate-200 block py-2 pl-3 pr-3 text-center border-1 rounded-md bg-pink-900 shadow-lg '/> 
          </div>
 
    );
}

export default SearchInput;