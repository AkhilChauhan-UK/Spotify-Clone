import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full sm:w-[40%] lg:w-[20%] h-full p-3 flex flex-col gap-3 text-white bg-[#121212]">
      {/* Top Section */}
      <div className="flex flex-col gap-4 bg-[#181818] rounded p-4">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img className="w-6" src={assets.home_icon} alt="home" />
          <p className="font-bold text-sm sm:text-base">Home</p>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <img className="w-6" src={assets.search_icon} alt="search" />
          <p className="font-bold text-sm sm:text-base">Search</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex-1 bg-[#181818] rounded p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img className="w-6 sm:w-7" src={assets.stack_icon} alt="library" />
            <p className="font-semibold text-sm sm:text-base">Your Library</p>
          </div>
          <div className="flex items-center gap-2">
            <img className="w-4 sm:w-5" src={assets.arrow_icon} alt="arrow" />
            <img className="w-4 sm:w-5" src={assets.plus_icon} alt="plus" />
          </div>
        </div>

        {/* Playlist Card */}
        <div className="p-3 bg-[#242424] rounded font-semibold flex flex-col gap-2">
          <h1 className="text-sm sm:text-base">Create your first playlist</h1>
          <p className="font-light text-xs sm:text-sm">
            it's easy we will help you
          </p>
          <button className="px-3 py-1 bg-white text-[12px] sm:text-[14px] text-black rounded-full mt-2">
            Create Playlist
          </button>
        </div>

        {/* Podcast Card */}
        <div className="p-3 bg-[#242424] rounded font-semibold flex flex-col gap-2 mt-4">
          <h1 className="text-sm sm:text-base">
            Let's find some podcasts to follow
          </h1>
          <p className="font-light text-xs sm:text-sm">
            we'll keep you updated on new episodes
          </p>
          <button className="px-3 py-1 bg-white text-[12px] sm:text-[14px] text-black rounded-full mt-2">
            Browse podcasts
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
