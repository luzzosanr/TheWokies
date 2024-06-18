import {Player} from "./player.model";
import {supabase} from "../../config/supabase";

export async function getAllPlayers(): Promise<Player[] | undefined> {
    try {
        const request = await supabase
            .from("player")
            .select("*");

        if (request.error) {
            return undefined;
        }

        return request.data as Player[];
    } catch (e) {
        console.error(e);
        return undefined;
    }
}
