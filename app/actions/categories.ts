'use server'

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { CreateCategorySchemaType, CreateCategorySchema } from "../schema/categories";
import { redirect } from "next/navigation";

export async function CreateCategory(form: CreateCategorySchemaType) {
    const parserBody = CreateCategorySchema.safeParse(form);
    if (!parserBody.success) {
        throw new Error("Bad request")
    }

    const user = await currentUser();
    if (!user) {
        redirect("/sign-in")
    }

    const { name, icon, type } = parserBody.data
    return prisma.category.create({
        data: {
            userId: user.id,
            name,
            icon,
            type
        }
    })
}