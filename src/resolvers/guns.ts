import { Resolver, Query, Authorized } from "type-graphql";
import { Guns } from "../entity/guns";

@Resolver(Guns)
export class GunsResolver {
    @Authorized("ADMIN")
    @Query(() => String)
    async helloWorld() {
        return 'Hello World!'
    }
}