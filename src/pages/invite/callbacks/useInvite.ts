import { notification } from "antd";
import { Player } from "../../../shared/models/player.model";
import { getPlayerById, updatePlayerStatus } from "../../../shared/models/player.repository";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function useInvite() {
    const [player, setPlayer] = useState<Player>({} as Player);
    const [loading, setLoading] = useState<boolean>(true);

    const { id } = useParams();

    const fetchPlayer = async () => {
        const player = await getPlayerById(id as string)
        setLoading(false);

        if (!player) {
            return notification.error({message: "Error while fetching players"});
        }

        setPlayer(player);
    }

    const giveAnswer = async (accept: boolean) => {
        await updatePlayerStatus(id as string, accept ? "ACCEPTED" : "REJECTED");
        window.location.reload();
    }

    useEffect(() => {
        fetchPlayer();
    }, [])

    return {
        player,
        loading,
        giveAnswer
    }
}