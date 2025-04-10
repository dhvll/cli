import Configstore from "configstore"
import type { TypedConfigstore } from "./TypedConfigStore"
import { jwtDecode } from "jwt-decode"

export interface CliConfig {
  sessionToken?: string
  githubUsername?: string
  registryApiUrl?: string
}

export const cliConfig: TypedConfigstore<CliConfig> = new Configstore(
  "tscircuit",
)

export const getSessionToken = (): string | undefined => {
  return cliConfig.get("sessionToken")
}

export const setSessionToken = (token: string) => {
  cliConfig.set("sessionToken", token)
  const decoded = jwtDecode<{
    github_username: string
  }>(token)
  cliConfig.set("githubUsername", decoded.github_username)
}

export const clearSession = () => {
  cliConfig.delete("sessionToken")
  cliConfig.delete("githubUsername")
}

export const getRegistryApiUrl = (): string => {
  return cliConfig.get("registryApiUrl") ?? "https://registry-api.tscircuit.com"
}
