import React from 'react'
import { useNavigate } from 'react-router-dom'

const AlbumItem = ({ image, name, desc, id, onClick }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        if (onClick) {
            onClick() // use parent-provided click handler if passed
        } else {
            navigate(`/album/${id}`) // fallback navigation
        }
    }

    return (
        <div
            key={id}
            onClick={handleClick}
            className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-colors duration-200"
        >
            <img
                className="rounded w-full h-40 object-cover"
                src={image}
                alt={name || "Album cover"}
            />
            <p className="font-bold mt-2 mb-1 truncate">{name}</p>
            <p className="text-slate-200 text-sm line-clamp-2">{desc}</p>
        </div>
    )
}

export default AlbumItem
