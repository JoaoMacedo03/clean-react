import { ISaveAccessToken } from '@/domain/useCases/ISave-access-token'

export class SaveAccessTokenMock implements ISaveAccessToken {
    accessToken: string

    async save (accessToken: string): Promise<void> {
        this.accessToken = accessToken
    }
}
