import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function createJwt(eventId: number) {
    return JWT.sign({ eventId }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
    });
}

export const verifyJwt = (token: string) => {
    try {
        const decoded = JWT.verify(
            token,
            process.env.JWT_SECRET as string
        ) as any;
        return decoded;
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
};
