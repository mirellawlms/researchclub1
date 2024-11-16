"use server";
import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//test 

export async function update(params: Prisma.GeneralQUpdateInput, id: string) {
  try {
    await prisma.generalQ.update({
      data: params,
      where: {
        id,
      },
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

//cookienamen laden
export async function loadCookiename(id: string) {
  return prisma.cookies.findMany({ //findmany alle
    where: { 
      generalQId:id
    },
  });
}