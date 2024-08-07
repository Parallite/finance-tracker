import { Category } from '@prisma/client'
import React, { FC } from 'react'

interface CategoryRowProps {
    category: Category
}

export const CategoryRow: FC<CategoryRowProps> = ({
    category
}) => {
    return (
        <div className='flex items-center gap-2'>
            <span role="img">{category.icon}</span>
            <span>{category.name}</span>
        </div>
    )
}
