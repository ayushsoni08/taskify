"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const {userId, orgId} = auth();

    if(!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const {id, boardId} = data;
    let card;

    try {
        card = await db.card.delete({
            where: {
                id,
                list: {
                    board: {
                        orgId,
                    },
                },
            },
        });
    } catch (error) {
        return {
            error: "Failed to delete."
        }
    }

    revalidatePath(`/board/${boardId}`);
    return { data: card }
}

export const deleteCard = CreateSafeAction(DeleteCard, handler);