'use client'

import { CurrencyComboBox } from "@/app/components/CurrencyComboBox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"
import { CategoryList } from "./components/CategoryList"

function page() {
    return (
        <>
            <div className="border-b">
                <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
                    <div>
                        <p className="text-3xl font-bold">Manage</p>
                        <p className="text-muted-foreground">
                            Manage your account settings andcategories
                        </p>
                    </div>
                </div>
            </div>
            <div className="container flex flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Currency</CardTitle>
                        <CardDescription>
                            Set your default currency for transactions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CurrencyComboBox />
                    </CardContent>
                </Card>
                <CategoryList type="income" />
                <CategoryList type="expense" />
            </div>
        </>
    )
}

export default page