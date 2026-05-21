import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Card from '../Card/Card'
import { ItemsContext } from '../Context/Item'


const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const itemsCtx = ItemsContext();
  const { items = [], loading, error } = itemsCtx || {}

  const filteredItems = searchQuery.trim()
    ? items.filter(item =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items

  return (
    <div className="bg-white min-h-screen">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <div className="w-full py-4 mt-2 px-4 hidden md:block">
        <div className="max-w-[1280px] mx-auto bg-cover bg-center h-[250px] rounded-[4px] flex items-center bg-[#f2f4f5] border border-[#ccd5d6]/30 cursor-pointer hover:shadow-md transition-shadow" style={{ backgroundImage: 'url(https://statics.olx.in/olxin/banners/hero_bg_in_v4.jpg)' }}>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 pb-10 mt-2">
        <Card items={filteredItems} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default Home
