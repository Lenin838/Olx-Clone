import React from 'react'
import { Link } from 'react-router-dom'
import Favorite from '../../assets/favorite.svg'
import { useWishlist } from '../Context/Wishlist'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Firebase/Firebase'
import { toast } from 'react-toastify'


const Card = ({ items, loading, error }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [user] = useAuthState(auth);

  if (loading) {
    return (
      <div className='p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen flex flex-col items-center justify-start pt-20'>
        <h1 style={{ color: '#002f34' }} className="text-2xl mb-6">Fresh recommendations</h1>
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full'>
          {[...Array(8)].map((_, i) => (
            <div key={i} className='w-full h-72 rounded-md border border-gray-200 bg-gray-50 animate-pulse overflow-hidden'>
              <div className='h-36 bg-gray-200 w-full'></div>
              <div className='p-4 space-y-2'>
                <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                <div className='h-3 bg-gray-200 rounded w-3/4'></div>
                <div className='h-3 bg-gray-200 rounded w-1/3'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen flex flex-col items-center justify-center'>
        <div className='text-center'>
          <p className='text-4xl mb-4'>⚠️</p>
          <p className='text-gray-500 font-semibold'>Could not load products</p>
          <p className='text-gray-400 text-sm mt-2 max-w-sm'>{error}</p>
        </div>
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className='p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen flex flex-col items-center justify-start'>
        <h1 style={{ color: '#002f34' }} className="text-2xl mb-6">Fresh recommendations</h1>
        <div className='flex flex-col items-center justify-center mt-20'>
          <p className='text-5xl mb-4'>📦</p>
          <p className='text-gray-500 font-semibold'>No products found</p>
        </div>
      </div>
    )
  }

  return (
    <div className='py-6'>
      <h1 className="text-[24px] text-[#002f34] mb-4 font-normal">Fresh recommendations</h1>
      <div className='grid gap-[16px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {items.map((item) => (
          <Link
            to={'/details'}
            state={{ item }}
            key={item.id}
            className='hover:no-underline'
          >
            <div className='relative w-full rounded-[4px] border border-[#ccd5d6] bg-white overflow-hidden cursor-pointer flex flex-col p-[12px] min-h-[280px] group'>
              <div className='w-full h-[160px] flex justify-center items-center overflow-hidden mb-2 relative'>
                <img
                  className='max-w-full w-full h-full object-cover'
                  src={item.imageUrl || 'https://via.placeholder.com/150'}
                  alt={item.title}
                />
              </div>

              <div className='flex flex-col flex-grow'>
                <h2 className="font-bold text-[20px] text-[#002f34] leading-tight mb-1">₹ {item.price}</h2>
                <p className="text-[14px] text-[#406367] truncate mb-1">{item.title}</p>
                <div className="mt-auto flex justify-between items-center text-[10px] sm:text-[12px] text-[#728889] uppercase pb-1 pt-2">
                    <span className="truncate max-w-[70%]">{item.category}</span>
                    <span>TODAY</span>
                </div>
              </div>

              <div 
                onClick={(e) => {
                  e.preventDefault(); 
                  if(user) {
                      toggleWishlist(item);
                      if (isInWishlist(item.id)) {
                          toast.info('Removed from wishlist');
                      } else {
                          toast.success('Added to wishlist');
                      }
                  } else {
                      toast.warn("Please login to add to wishlist");
                  }
                }}
                className='absolute flex justify-center items-center p-2 bg-white rounded-full top-4 right-4 cursor-pointer shadow-[0_1px_4px_rgba(0,0,0,0.2)] hover:scale-110 transition-transform z-10'
              >
                <img 
                  className='w-[18px] transition-colors' 
                  src={Favorite} 
                  alt="Favourite" 
                  style={{ 
                      filter: isInWishlist(item.id) 
                          ? 'invert(27%) sepia(91%) saturate(2352%) hue-rotate(331deg) brightness(94%) contrast(92%)' 
                          : 'none' 
                  }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Card
