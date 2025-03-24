"use client"
import React, { Suspense, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import UserAvatar from '../common/UserAvatar'
import dynamic from 'next/dynamic'

const LogoutModal = dynamic(() => import("../auth/LogoutModal"))

export default function ProfileMenu({name, image}:{
    name: string,
    image?: string
}) {

  const [openLogout, setOpenLogout] = useState(false)

  return (
    <>
    {
      openLogout && <Suspense fallback={<div>Loading...</div>}>
        <LogoutModal open={openLogout} setOpen={setOpenLogout} />
      </Suspense>
    }
    <DropdownMenu>
        <DropdownMenuTrigger>
            <UserAvatar name={name} image={image} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem> Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>  setOpenLogout(true)}> Logout</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}
