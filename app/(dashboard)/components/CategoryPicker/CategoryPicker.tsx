"use client"

import { TransactionType } from "@/app/types"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Category } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { FC, useState } from "react"
import { CategoryRow } from "../CategoryRow"
import { Command, CommandInput } from "@/components/ui/command"
import { CreateCategoryDialog } from "../CreateCategoryDialog"

interface CategoryPickerProps {
    type: TransactionType
}

export const CategoryPicker: FC<CategoryPickerProps> = ({
    type
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")

    const categoriesQuery = useQuery({
        queryKey: ["categories", type],
        queryFn: () => fetch(`/api/categories?type=${type}`)
            .then((res) => res.json())
    })

    const selectedCategory = categoriesQuery.data?.find(
        (category: Category) => {
            return category.name === value
        }
    )

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedCategory ?
                        <CategoryRow category={selectedCategory} /> : "Select category"
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command onSubmit={e => e.preventDefault()}>
                    <CommandInput placeholder="Search category..." />
                    <CreateCategoryDialog type={type} />
                </Command>
            </PopoverContent>
        </Popover>
    )
}
