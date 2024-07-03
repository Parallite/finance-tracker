import { CreateCategorySchema, CreateCategorySchemaType } from '@/app/schema/categories'
import { TransactionType } from '@/app/types'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { FC, ReactNode, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuCircleOff, LuLoader2, LuPlusSquare } from 'react-icons/lu';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CreateCategory } from '@/app/actions/categories'
import { Category } from '@prisma/client'
import { toast } from 'sonner'
import { useTheme } from 'next-themes'

interface CreateCategoryDialogProps {
    type: TransactionType;
    trigger?: ReactNode
    successCallback: (category: Category) => void;
}

export const CreateCategoryDialog: FC<CreateCategoryDialogProps> = ({
    type,
    trigger,
    successCallback
}) => {
    const theme = useTheme();
    const [open, setOpen] = useState<boolean>(false)

    const form = useForm<CreateCategorySchemaType>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
            type
        }
    })

    const queryClient = useQueryClient();

    const handleCloseButton = () => {
        form.reset
    }

    const { mutate, isPending } = useMutation({
        mutationFn: CreateCategory,
        onSuccess: async (data: Category) => {
            form.reset({
                name: "",
                icon: "",
                type
            });

            toast.success(`Category ${data.name} created successfully 👍🏻`, {
                id: "create-category"
            });

            successCallback(data)

            await queryClient.invalidateQueries({
                queryKey: ["categories"]
            })

            setOpen(prev => !prev)
        },
        onError: () => {
            toast.error("Something went wrong!", {
                id: "create-category"
            })
        }
    })

    const onSubmit = useCallback((values: CreateCategorySchemaType) => {
        toast.loading("Creating category...", {
            id: "create-category"
        });
        mutate(values)
    }, [mutate])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ? trigger : (<Button
                    variant={"ghost"}
                    className='flex border-separate items-center justify-start
                    rounded-none border-b px-3 py-3 text-muted-foreground'
                >
                    <LuPlusSquare className='mr-2 h-4 w-4' />
                    Create new
                </Button>)
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create <span className={cn(
                            "m-1",
                            type === "income" ? "text-emerald-500" : "text-red-500"
                        )}>{type}</span>
                    </DialogTitle>
                    <DialogDescription>
                        Categories are used to group your transactions
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Category" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is how your category will appear in the app
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Icon</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className='h-[100px] w-full'
                                                >
                                                    {form.watch('icon') ? (
                                                        <div className='flex flex-col items-center gap-2'>
                                                            <span className='text-5xl' role='img'>
                                                                {field.value}
                                                            </span>
                                                            <p className="text-xs text-muted-foreground">
                                                                Click to change
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className='flex flex-col items-center gap-2'>
                                                            <LuCircleOff className='h-[48px] w-[48px]' />
                                                            <p className="text-xs text-muted-foreground">
                                                                Click to select
                                                            </p>
                                                        </div>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className='w-full'>
                                                <Picker
                                                    data={data}
                                                    theme={theme.resolvedTheme}
                                                    onEmojiSelect={(emoji: { native: string }) => {
                                                        field.onChange(emoji.native)
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormDescription>
                                        This is how your category will appear in the app
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type='button' variant={'secondary'} onClick={handleCloseButton}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={isPending}
                    >
                        {!isPending && 'Create'}
                        {isPending && <LuLoader2 className='animate-spin' />}
                    </Button>
                </DialogFooter>{" "}
            </DialogContent>
        </Dialog>
    )
}
