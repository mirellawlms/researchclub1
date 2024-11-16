"use server";

import { CookieType, Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function updateCookie(
  params: Prisma.CookiesUpdateInput,
  id: string,
  cookiename: CookieType
) {
  try {
    await prisma.cookies.upsert({
      where: {
        generalQId_cookiename: {
          generalQId: id,
          cookiename: cookiename,
        },
      },
      create: {
        cookiename: cookiename,
        generalQId: id,
      },
      update: params
    });
  } catch (error) {
    console.log(error);
  }
}

export async function loadGeneral(id: string) {
  return prisma.generalQ.findUnique({
    where: { 
      id
    },
  });
}