import { ObjectType, Field, ID } from "type-graphql";
import { Entity, BaseEntity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@ObjectType()
export class PrimaryFire {
    @Field()
    fireMode: String

    @Field()
    fireRate: Number
}

@ObjectType()
export class AltFire {
    @Field()
    fireMode: String

    @Field()
    fireRate: Number
}

@ObjectType()
export class DamageStats {
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

@Entity()
@ObjectType()
export class Guns extends BaseEntity {
    @ObjectIdColumn()
    @Field(() => ID)
    id: ObjectID

    @Column()
    @Field()
    name: String
    
    @Column()
    @Field()
    category: String

    @Column()
    @Field()
    price: String

    @Column()
    @Field()
    primaryFire: PrimaryFire

    @Column()
    @Field()
    altFire: AltFire

    @Column()
    @Field(() => [DamageStats])
    damageStats: Array<DamageStats>

    @Column()
    @Field()
    ammoSize: String

    @Column()
    @Field()
    wallPen: "High" | "Medium" | "Low"
}