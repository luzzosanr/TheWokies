import { Button, Divider, Flex } from "antd";
import { Player, PlayerState } from "../../../shared/models/player.model";
import { PlayerInfo } from "./player.info";
import { NewInvite } from "./newInvite";
import { useState } from "react";
import { title } from "process";

interface DashboardProps {
    players: Player[];
}

export function Dashboard(props: DashboardProps) {
    const [renderingNewInvite, setRenderingNewInvite] = useState<boolean>(false)


    return (
        <Flex className={"w-full h-full"} vertical>
            {renderingNewInvite && <NewInvite/>}
            <Flex className={"w-full" + (renderingNewInvite? " text-gray-200" : "")} vertical>
                <Button className={"w-1/6 self-center"} onClick={() => setRenderingNewInvite(true)} type={"primary"}>Add a new player</Button>
                <PlayerInfo/>
                <FilteredPlayersRender state={"ACCEPTED"} players={props.players} title={"Accepted invitations"}/>
                <FilteredPlayersRender state={"RECEIVED_INVITE"} players={props.players} title={"Pending invitations"}/>
                <FilteredPlayersRender state={"REJECTED"} players={props.players} title={"Refused invitations"}/>
            </Flex>
        </Flex>
    )
}

function FilteredPlayersRender(props: { state: PlayerState, players: Player[], title: string }) {
    return (
        <Flex className={"w-full"} vertical>
            <Divider className={"m-0"}/>
            <Flex className={"w-full h-14"} align={"center"} justify={"start"}>
                <h2 className={"text-xl font-bold"}>{props.title}</h2>
            </Flex>
            {
                props?.players.map((player: Player) => {
                    if (player.state === props.state) {
                        return <PlayerInfo key={player?.id} player={player}/>
                    }
                })
            }
        </Flex>
    )
}
