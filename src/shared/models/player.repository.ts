import {Player, PlayerState} from "./player.model";
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

export async function getPlayerById(id: string): Promise<Player | undefined> {
    try {
        const request = await supabase
            .from("player")
            .select("*")
            .eq("id", id);

        if (request.error) {
            return undefined;
        }

        return request.data[0] as Player;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

export async function updatePlayerStatus(id: string, status: PlayerState): Promise<Player | undefined> {
    try {
        const request = await supabase
            .from("player")
            .update({state: status})
            .eq("id", id);

        if (request.error) {
            return undefined;
        }

        console.log(request.data);
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

export async function addPlayer(player: Player): Promise<Player | undefined> {
    try {
        const request = await supabase
            .from("player")
            .insert(player);

        if (request.error) {
            return undefined;
        }

        return player;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}