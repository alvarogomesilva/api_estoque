import { SetMetadata } from "@nestjs/common"
import { ROUTE_POLICY_KEY } from "../constants"
import { RotaPoliticas } from "../enums/rota.enum"

export const SetRota = (politica: RotaPoliticas) => {
    return SetMetadata(ROUTE_POLICY_KEY, politica)
    
}