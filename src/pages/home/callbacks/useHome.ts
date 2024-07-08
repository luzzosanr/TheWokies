import {useEffect, useState} from "react";
import {Player} from "../../../shared/models/player.model";
import {getAllPlayers} from "../../../shared/models/player.repository";
import {notification} from "antd";

export default function useHome() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPlayers = async () => {
        const players = await getAllPlayers()
        setLoading(false);

        if (!players) {
            return notification.error({message: "Error while fetching players"});
        }

        setPlayers(players);
    }

    useEffect(() => {
        fetchPlayers();
    }, [])

    return {
        players,
        loading
    }
}
