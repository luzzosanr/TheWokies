import {useEffect, useState} from "react";
import {Player} from "../../../shared/models/player.model";
import {getAllPlayers} from "../../../shared/models/player.repository";
import {notification} from "antd";

export default function useHome() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [availableTeams, setAvailableTeams] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchPlayers = async () => {
        const players = await getAllPlayers()

        if (!players) {
            return notification.error({message: "Error while fetching players"});
        }

        setPlayers(players);
        setAvailableTeams(calculateAvailableTeams(players));
        setLoading(false);
    }

    useEffect(() => {
        fetchPlayers();
    }, [])

    return {
        players,
        availableTeams,
        loading
    }
}

function calculateAvailableTeams(players: Player[]): number[] {
    // Reduce is used to accumulate the number of players in each team
    let teamCounts = players.reduce((acc: {[team: number]: number}, player: Player) => {
        acc[player.team] = (acc[player.team] || 0) + 1;
        return acc;
    }, {});

    // Filter the teams with less than 4 players and add the next available team
    const teamsWithFewPlayers: number[] = Object.keys(teamCounts).map(Number).filter((team: number) => (teamCounts[team] <= 4 && team !== 0));
    return [...teamsWithFewPlayers, Math.max(...players.map(player => player.team)) + 1];
}