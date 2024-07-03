import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { LuMoreHorizontal } from "react-icons/lu";
import { TransactionHistoryRow } from "./columns";
import { DeleteTransactionDialog } from "@/app/(dashboard)/transactions/components/DeleteTransactionDialog";

export const RowActions = ({ transaction }: { transaction: TransactionHistoryRow }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    return (
        <>
            <DeleteTransactionDialog
                open={showDeleteDialog}
                setOpen={setShowDeleteDialog}
                transactionId={transaction.id}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} className="h-8 w-8 p-0 ">
                        <span className="sr-only">Open menu</span>
                        <LuMoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="flex items-center gap-2"
                        onSelect={() => {
                            setShowDeleteDialog((prev) => !prev);
                        }}
                    >
                        <LuTrash2 className="h-4 w-4 text-muted-foreground" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}