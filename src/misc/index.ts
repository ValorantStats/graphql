import { AuthChecker } from "type-graphql";

export interface AuthRequest extends Request {
    user?: {
        role: string
    }
}

export interface Context {
    req: AuthRequest
    res: Response
}

export const authChecker: AuthChecker<Context> = ({ context }, roles): any => {
    if (roles.includes(context.req.user.role)) {
        return true
    }
    return false
}