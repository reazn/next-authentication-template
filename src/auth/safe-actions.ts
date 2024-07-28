import { assertAuthenticated } from "@/auth/session"
import { env } from "@/env"
import { createServerActionProcedure } from "zsa"

const shapeErrors = ({ err }: any) => {
  const isDev = env.NODE_ENV === "development"

  if (isDev) {
    console.error(err)
    return {
      code: err.code ?? "ERROR",
      message: `${isDev ? "DEV ERROR - " : ""}${err.message}`,
    }
  }

  return {
    code: "ERROR",
    message: "Something went wrong",
  }
}

export const protectedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    const user = await assertAuthenticated()
    return { user }
  })

export const publicAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    return { user: undefined }
  })
