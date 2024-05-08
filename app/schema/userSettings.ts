import { z } from 'zod'
import { CURRENCIES } from '../constants'

export const UpdateUserCurrencySchema = z.object({
    currency: z.custom(value => {
        const found = CURRENCIES.some((c) => c.value === value);
        if (!found) {
            throw new Error(`invalid currency: ${value}`)
        }

        return value
    })
})