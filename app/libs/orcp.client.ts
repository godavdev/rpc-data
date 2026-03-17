import { createORPCClient } from "@orpc/client"
import { RPCLink } from "@orpc/client/fetch"
import { RouterClient } from "@orpc/server"
import { router } from "./orpc"

const link = new RPCLink({
  // Saber si estamos en el cliente o en el servidor para configurar la URL correctamente
  url: `${typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"}/api/rpc`,
  headers: async () => {
    if (typeof window !== "undefined") {
      return {}
    }

    const { headers } = await import("next/headers")
    return await headers()
  },
})

export const orpc: RouterClient<typeof router> = createORPCClient(link)
