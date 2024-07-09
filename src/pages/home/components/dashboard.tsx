import { Button, Divider, Flex } from "antd";
import { Player, PlayerState } from "../../../shared/models/player.model";
import { PlayerInfo } from "./player.info";
import { NewInvite } from "./newInvite";
import { useState } from "react";

interface DashboardProps {
    players: Player[];
    availableTeams: number[];
}

export function Dashboard(props: DashboardProps) {
    const [renderingNewInvite, setRenderingNewInvite] = useState<boolean>(false)


    return (
        <Flex className={"w-full h-full"} vertical>
            {renderingNewInvite && <NewInvite/>}
            <Flex className={"w-full" + (renderingNewInvite? " text-gray-200" : "")} vertical>
                <Button className={"w-1/6 self-center"} onClick={() => setRenderingNewInvite(true)} type={"primary"}>Add a new player</Button>
                <PlayerInfo/>
                <FilteredPlayersRender state={"ACCEPTED"} props={props} title={"Accepted invitations"}/>
                <FilteredPlayersRender state={"RECEIVED_INVITE"} props={props} title={"Pending invitations"}/>
                <FilteredPlayersRender state={"REJECTED"} props={props} title={"Refused invitations"}/>
            </Flex>
        </Flex>
    )
}

function FilteredPlayersRender(props: { state: PlayerState, props: DashboardProps, title: string}) {
    return (
        <Flex className={"w-full"} vertical>
            <Divider className={"m-0"}/>
            <Flex className={"w-full h-14"} align={"center"} justify={"start"}>
                <h2 className={"text-xl font-bold"}>{props.title}</h2>
            </Flex>
            {
                props.props.players.map((player: Player) => {
                    if (player.state === props.state) {
                        return <PlayerInfo key={player?.id} player={player} availableTeams={props.props.availableTeams}/>
                    }
                })
            }
        </Flex>
    )
}
