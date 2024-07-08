import {Divider, Flex} from "antd";
import { Player } from "../../../shared/models/player.model";

interface PlayerInfoProps {
    player?: Player|undefined;
}

export function PlayerInfo(props: PlayerInfoProps) {
    // If player not defind (default) render the column headers

    const invitationLink = (
        <a href={"./invite/" + props.player?.id} target="_blank">{props.player?.id}</a>
    )
    
    return (
        <Flex className={"w-1/2 self-center " + (props.player != undefined ? '' :'font-bold')} align={"center"} justify={"space-between"}>
            <Flex className={"w-1/2 self-start"} align={"center"} justify={"center"}>
                <p>{props.player?.mail || "Email"}</p>
            </Flex>
            <Flex className={"w-1/2 self-end"} align={"center"} justify={"center"}>
                <p>{props.player?.name || "Name"}</p>
            </Flex>
            <Flex className={"w-1/2 self-end"} align={"center"} justify={"center"}>
                {props.player === undefined ? "Invitation link" : invitationLink}
            </Flex>
        </Flex>
    )
}