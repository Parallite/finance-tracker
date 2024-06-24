import { DeleteCategory } from '@/app/actions/categories';
import { TransactionType } from '@/app/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Category } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { FC, ReactNode } from 'react'
import { toast } from 'sonner';

interface DeleteCategoryDialogProps {
    trigger: ReactNode;
    category: Category;
}

export const DeleteCategoryDialog: FC<DeleteCategoryDialogProps> = ({
    trigger,
    category
}) => {
    const categoryIdentifier = `${category.name}-${category.type}`;
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: DeleteCategory,
        onSuccess: async () => {
            toast.success("Category deleted successfully", {
                id: categoryIdentifier
            });

            await queryClient.invalidateQueries({
                queryKey: ['categories']
            })
        },
        onError: () => {
            toast.error("Something went wrong", {
                id: categoryIdentifier
            });
        }
    })

    const handleContinue = () => {
        toast.loading("Deleting category...", {
            id: categoryIdentifier
        }),
            deleteMutation.mutate({
                name: category.name,
                type: category.type as TransactionType
            })
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action can not be undone. This will permanently delete your category
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleContinue}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
