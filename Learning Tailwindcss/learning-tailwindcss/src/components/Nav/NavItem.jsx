import React from 'react'

const NavItem = ({item}) => {
    const { label, icon, active } = item
  return (
    <li
			className={`flex p-2 justify-end items-center cursor-pointer${
				active ? ' bg-primary text-white' : ''
			}`}
		>
			<h3 className='mr-2'>{label}</h3>
			{icon}
		</li>
  )
}

export default NavItem