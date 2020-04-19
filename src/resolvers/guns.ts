import { Resolver, Query, Authorized } from "type-graphql";
import { Guns } from "../entity/guns";

@Resolver(Guns)
export class GunsResolver {
    @Authorized("ADMIN")
    @Query(() => [Guns])
    async listGuns() {
        return await Guns.find({})
    }
}