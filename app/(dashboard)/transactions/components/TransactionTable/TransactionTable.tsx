import { GetTransactionHistoryResponseType } from '@/app/api/transactions-history/route';
import { DateToUTCDate } from '@/lib/helpers';
import { useQuery } from '@tanstack/react-query';
import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, { FC, useMemo, useState } from 'react'
import { SkeletonWrapper } from '@/app/components/SkeletonWrapper';
import { columns } from '@/app/components/datatable/columns';
import { DataTableFacetedFilter } from '@/app/components/datatable/FacetedFilters';
import { DataTableViewOptions } from '@/app/components/datatable/ColumnToggle';
import { Button } from "@/components/ui/button";
import { handleExportCSV } from '@/app/components/datatable/csv';
import { LuDownload } from "react-icons/lu";


interface TransactionTableProps {
    from: Date;
    to: Date;
}

const emptyData: any[] = [];

export const TransactionTable: FC<TransactionTableProps> = ({
    from,
    to
}) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const history = useQuery<GetTransactionHistoryResponseType>({
        queryKey: ['transactions', 'history', from, to],
        queryFn: () =>
            fetch(`/api/transactions-history?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`)
                .then((res) => res.json()),
    })

    const table = useReactTable({
        data: history.data || emptyData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            sorting,
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const categoriesOptions = useMemo(() => {
        const categoriesMap = new Map();
        history.data?.forEach((transaction) => {
            categoriesMap.set(transaction.category, {
                value: transaction.category,
                label: `${transaction.categoryIcon} ${transaction.category}`
            })
        });
        const uniqueCategories = new Set(categoriesMap.values());
        return Array.from(uniqueCategories);
    }, [history.data]);

    return (
        <div className='w-full'>
            <div className='flex flex-wrap items-end justify-between gap-2 py-4 '>
                <div className="flex gap-2">
                    {
                        table.getColumn('category') && (
                            <DataTableFacetedFilter
                                title='Category'
                                column={table.getColumn('category')}
                                options={categoriesOptions}
                            />
                        )
                    }
                    {
                        table.getColumn('type') && (
                            <DataTableFacetedFilter
                                title='Type'
                                column={table.getColumn('type')}
                                options={[
                                    { label: 'Income', value: 'income' },
                                    { label: 'Expense', value: 'expense' },
                                ]}
                            />
                        )
                    }
                </div>
                <div className="flex flex-wrap gap-2 ">
                    <Button
                        variant={"outline"}
                        size={"sm"}
                        className="ml-auto h-8 lg:flex"
                        onClick={() => {
                            const data = table.getFilteredRowModel().rows.map((row) => ({
                                category: row.original.category,
                                categoryIcon: row.original.categoryIcon,
                                description: row.original.description,
                                type: row.original.type,
                                amount: row.original.amount,
                                formattedAmount: row.original.formattedAmount,
                                date: row.original.date,
                            }));
                            handleExportCSV(data);
                        }}
                    >
                        <LuDownload />
                        Export CSV
                    </Button>
                    <DataTableViewOptions table={table} />
                </div>
            </div>
            <SkeletonWrapper isLoading={history.isFetching}>
                <div className="rounded-md border bg-card">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </SkeletonWrapper>
        </div>
    )
}
