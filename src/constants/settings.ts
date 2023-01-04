import { generateKeyIv } from "../lib/blowfishGeneration"
import { GAME_TITLE } from "./strings"

export const MAX_CHALLENGES = 6
export const ALERT_TIME_MS = 2000
export const REVEAL_TIME_MS = 350
export const REVEAL_TIME_MS_SPEEDRUN = 0
export const WELCOME_INFO_MODAL_MS = 350
export const DISCOURAGE_INAPP_BROWSERS = true
export const ENABLE_MIGRATE_STATS = true
const keyIv = generateKeyIv(GAME_TITLE)
export const BLOWFISH_KEY = keyIv[0]
export const BLOWFISH_IV = keyIv[1]
