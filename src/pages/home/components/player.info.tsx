import {Button, Flex} from "antd";
import { Player } from "../../../shared/models/player.model";
import { changeTeam } from "../../../shared/models/player.repository";

interface PlayerInfoProps {
    player?: Player|undefined;
    availableTeams?: number[];
}

export function PlayerInfo(props: PlayerInfoProps) {
    // If player not defind (default) render the column headers

    async function updatePlayerTeam(team: number) {
        await changeTeam(props.player?.id || "", team);
        window.location.reload();
    }

    const invitationLink = (
        <a href={"./invite/" + props.player?.id} target="_blank">{props.player?.id}</a>
    )
    const teamList = (
        <Flex className={"w-1/2 self-end"} align={"center"} justify={"center"}>
            {props.availableTeams?.map((team: number) => {
                return <Button key={team} onClick={() => updatePlayerTeam(team)}>{team}</Button>
            })}
        </Flex>
    )
    const team = props.player?.team === 0 && props.player?.state == "ACCEPTED" ? teamList : props.player?.team;
    
    return (
        <Flex className={"w-2/3 self-center my-1" + (props.player != undefined ? '' :'font-bold')} align={"center"} justify={"space-between"}>
            <Flex className={"w-1/2"} align={"center"} justify={"center"}>
                <p>{props.player?.mail || "Email"}</p>
            </Flex>
            <Flex className={"w-1/2"} align={"center"} justify={"center"}>
                <p>{props.player?.name || "Name"}</p>
            </Flex>
            <Flex className={"w-1/2"} align={"center"} justify={"center"}>
                {props.player === undefined ? "Invitation link" : invitationLink}
            </Flex>
            <Flex className={"w-1/2"} align={"center"} justify={"center"}>
                <p>{props.player === undefined ? "Team" : team}</p>
            </Flex>
        </Flex>
    )
}