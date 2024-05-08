'use server'

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { UpdateUserCurrencySchema } from "@/app/schema/userSettings";
import { redirect } from "next/navigation";

export async function UpdateUserCurrency(currency: string) {
    const paresdBody = UpdateUserCurrencySchema.safeParse({
        currency
    })

    if (!paresdBody.success) {
        throw paresdBody.error
    }

    const user = await currentUser();

    if (!user) {
        redirect("/sign-in")
    }

    const userSettings = await prisma.userSettings.update({
        where: {
            userId: user.id
        },
        data: {
            currency
        }
    })

    return userSettings
}