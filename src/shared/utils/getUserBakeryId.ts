import { prisma } from "@/db/client";
import { NotFoundError } from "../errors/not-found.error";

export async function getUserBakeryId(userId: string): Promise<string | null> {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            ownedBakery: {
                select: {
                    id: true
                }
            },
            employeeAt: {
                select: {
                   id: true
                }
            }
        }
    });

    if (!user) {
        throw new NotFoundError("User not found");
    }

    return user.ownedBakery?.id || user.employeeAt?.id || null;
}
