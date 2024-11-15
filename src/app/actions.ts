"use server";
import { GeneralQ, Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function submit(
  params: Prisma.GeneralQCreateInput
): Promise<GeneralQ> {
  const qAnswer =
    (params.q1! +
      params.q2! +
      params.q3! +
      params.q4! +
      params.q5! +
      params.q6! +
      params.q7! +
      params.q8! +
      params.q9!) /
    9;
  console.log(params);
  try {
    return await prisma.generalQ.create({
      data: { ...params, qAnswer },
    });
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
}

export async function mitZeitdruck(): Promise<boolean> {
  const mit = await prisma.generalQ.count({
    where: { zeitdruck: true },
  });
  const ohne = await prisma.generalQ.count({
    where: { zeitdruck: false },
  });
  return mit < ohne
}
