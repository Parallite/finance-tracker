import { CreateCategoryDialog } from '@/app/(dashboard)/components/CreateCategoryDialog'
import { SkeletonWrapper } from '@/app/components/SkeletonWrapper'
import { TransactionType } from '@/app/types'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React, { FC } from 'react'
import { LuPlusSquare, LuTrendingDown, LuTrendingUp } from 'react-icons/lu'
import { CategoryCard } from '../CategoryCard'

interface CategoryListProps {
    type: TransactionType
}

export const CategoryList: FC<CategoryListProps> = ({
    type
}) => {
    const categoriesQuery = useQuery({
        queryKey: ["categories", type],
        queryFn: () => fetch(`/api/categories?type=${type}`)
            .then(res => res.json())
    });

    const dataAvailable = categoriesQuery.data && categoriesQuery.data.length > 0;

    return (
        <SkeletonWrapper isLoading={categoriesQuery.isLoading}>
            <Card>
                <CardHeader>
                    <CardTitle className='flex items-center justify-between gap-2'>
                        <div className="flex items-center gap-2">
                            {type === "expense" ? <LuTrendingDown
                                className='h-12 w-12 items-center rounded-lg bg-red-400/10 p-2 text-red-500'
                            /> : <LuTrendingUp
                                className='h-12 w-12 items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-500'
                            />}
                            <div>
                                {type === "income" ? "Incomes" : "Expenses"} categories
                                <div className='text-sm text-muted-foreground'>
                                    Sorted by name
                                </div>
                            </div>
                        </div>
                        <CreateCategoryDialog
                            type={type}
                            successCallback={() => categoriesQuery.refetch()}
                            trigger={
                                <Button className='gap-2 text-sm'>
                                    <LuPlusSquare h-4 w-4 />
                                    Create category
                                </Button>
                            }
                        />
                    </CardTitle>
                </CardHeader>
                <Separator />
                {
                    !dataAvailable && (
                        <div className='flex h-40 w-full flex-col items-center justify-center'>
                            <p className="">
                                No
                                <span className={cn(
                                    'mt-1 mx-1',
                                    type === 'income' ? "text-emerald-500" : "text-red-500"
                                )}>
                                    {type}
                                </span>
                                categories yet
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Create one to get started
                            </p>
                        </div>
                    )
                }
                {dataAvailable && (
                    <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {
                            categoriesQuery.data.map((category: Category) => (
                                <CategoryCard category={category} key={category.name} />
                            ))
                        }
                    </div>
                )}
            </Card>
        </SkeletonWrapper>
    )
}
