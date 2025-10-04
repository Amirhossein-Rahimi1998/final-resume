import React from 'react'
import { Badge } from './badge'

const CustomBadge = ({ backgroundColor, text }: { backgroundColor: string, text: string }) => {
    return (
        <div className="flex items-center justify-center my-6">
            <div className={`flex-1 h-0.5 ${backgroundColor} max-w-1/4`} />
            <Badge
                variant="secondary"
                className={`mx-4 ${backgroundColor} text-white`}
            >
                {text}
            </Badge>
            <div className={`flex-1 h-0.5 ${backgroundColor} max-w-1/4`} />
        </div>
    )
}

export default CustomBadge