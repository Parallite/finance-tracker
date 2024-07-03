import { TransactionType } from "@/app/types"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Category } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { FC, useCallback, useEffect, useState } from "react"
import { CategoryRow } from "../CategoryRow"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { CreateCategoryDialog } from "../CreateCategoryDialog"
import { LuCheck, LuChevronsUpDown } from "react-icons/lu"
import { cn } from "@/lib/utils"

interface CategoryPickerProps {
    type: TransactionType;
    onChange: (value: string) => void;
}

export const CategoryPicker: FC<CategoryPickerProps> = ({
    type,
    onChange
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

    const successCallback = useCallback((category: Category) => {
        setValue(category.name)
        setOpen((prev) => !prev)
    }, [setValue, setOpen])

    useEffect(() => {
        if (!value) return
        onChange(value);
    }, [onChange, value])

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
                    <LuChevronsUpDown
                        className="ml-2 h-4 w-4 shrink-0 opacity-50"
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command onSubmit={e => e.preventDefault()}>
                    <CommandInput placeholder="Search category..." />
                    <CreateCategoryDialog type={type} successCallback={successCallback} />
                    <CommandEmpty>
                        <p>Category not found</p>
                        <p className="text-xs text-muted-foreground">
                            Tip: Create a new category
                        </p>
                    </CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {
                                categoriesQuery.data && categoriesQuery.data.map((category: Category) => (
                                    <CommandItem
                                        className="flex justify-between"
                                        key={category.name}
                                        onSelect={() => {
                                            setValue(category.name);
                                            setOpen((prev) => !prev);
                                        }}
                                    >
                                        <CategoryRow category={category} />
                                        <LuCheck
                                            className={cn("mr-2 w-4 h-4 opacity-0",
                                                value === category.name && "opacity-100"
                                            )}
                                        />
                                    </CommandItem>
                                ))
                            }
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover >
    )
}
