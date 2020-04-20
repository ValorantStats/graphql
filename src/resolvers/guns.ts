import { Resolver, Query, Authorized, Mutation, Field, ArgsType, Args, InputType } from "type-graphql";
import { Guns, DamageStats } from "../entity/guns";

@InputType()
class PrimaryFireInput {
    @Field()
    fireMode: String

    @Field()
    fireRate: Number
}

@InputType()
class AltFireInput {
    @Field()
    fireMode: String

    @Field()
    fireRate: Number
}

@InputType()
class DamageStatsInput {
    @Field()
    minDistance: Number
    
    @Field()
    maxDistance: Number

    @Field()
    bodyDamage: Number

    @Field()
    headDamage: Number

    @Field()
    legOrArmDamage: Number
}

@InputType()
class GunInput {
    @Field()
    name: String
    
    @Field()
    image: String

    @Field()
    category: String

    @Field()
    price: Number

    @Field()
    primaryFire: PrimaryFireInput

    @Field({ nullable: true })
    altFire: AltFireInput

    @Field(() => [DamageStatsInput])
    damageStats: Array<DamageStatsInput>

    @Field()
    ammoSize: Number

    @Field()
    wallPen: "High" | "Medium" | "Low"
}

@ArgsType()
class CreateGunArgs {
    @Field(() => GunInput, { nullable: true })
    gun: Guns
}

@Resolver(Guns)
export class GunsResolver {
    @Query(() => [Guns])
    async listGuns() {
        return await Guns.find({})
    }

    @Authorized("ADMIN")
    @Mutation(() => Guns)
    async createGun(@Args() { gun }: CreateGunArgs) {
        return await Guns.create({
            ...gun
        }).save()
    }
}