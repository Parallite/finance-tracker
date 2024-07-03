import { DeleteTransaction } from '@/app/actions/deleteTransaction';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { FC } from 'react'
import { toast } from 'sonner';

interface DeleteTransactionDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    transactionId: string;
}

export const DeleteTransactionDialog: FC<DeleteTransactionDialogProps> = ({
    open,
    setOpen,
    transactionId
}) => {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: DeleteTransaction,
        onSuccess: async () => {
            toast.success("Transaction deleted successfully", {
                id: transactionId
            });

            await queryClient.invalidateQueries({
                queryKey: ['transactions']
            })
        },
        onError: () => {
            toast.error("Something went wrong", {
                id: transactionId
            });
        }
    })

    const handleContinue = () => {
        toast.loading("Deleting transaction...", {
            id: transactionId
        }),
            deleteMutation.mutate(transactionId)
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action can not be undone. This will permanently delete your transaction
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
