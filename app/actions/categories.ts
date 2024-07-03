'use server'

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { CreateCategorySchemaType, CreateCategorySchema, DeleteCategorySchemaType, DeleteCategorySchema } from "../schema/categories";
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

export async function DeleteCategory(form: DeleteCategorySchemaType) {
    const parserBody = DeleteCategorySchema.safeParse(form);
    if (!parserBody.success) {
        throw new Error("Bad request")
    }

    const user = await currentUser();
    if (!user) {
        redirect("/sign-in")
    }

    return await prisma.category.delete({
        where: {
            name_userId_type: {
                userId: user.id,
                name: parserBody.data.name,
                type: parserBody.data.type
            }
        }
    })
}