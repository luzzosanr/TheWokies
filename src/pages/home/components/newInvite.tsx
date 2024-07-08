import { Button, Flex, Input} from "antd";
import { supabase } from "../../../config/supabase";
import { Player } from "../../../shared/models/player.model";
import {useState} from "react";
import { addPlayer } from "../../../shared/models/player.repository";

export function NewInvite() {
    const [player, setPlayer] = useState<Player>({} as Player)
    const [error, setError] = useState<boolean>(false);

    const sendInvitation = async () => {
        // Not sending the invitation by email but only saving the player in the database
        // Only handeling the email and name, the state will be set to RECEIVED_INVITE in supabase
        const addedPlayer = await addPlayer(player);
        if (!addedPlayer) {
            setError(true);
            return;
        }
        window.location.reload();
    }
    function setEmail(e: string) {
        if (!player.name && e.includes("@")) {
            const name = e.split("@")[0]
            setPlayer({...player, mail: e, name: name})
        } else {
            setPlayer({...player, mail: e})
        }
    }
    function setName(e: string) {
        setPlayer({...player, name: e})
    }

    return (
        <Flex className={"w-100"} align={"center"} vertical>
            <Flex className={"w-1/3 border-8 fixed z-50 bg-white p-10"} align={"center"} vertical>
                <Flex className={"w-full h-14"} justify={"start"}>
                    <h2 className={"text-xl font-bold"}>New invitation</h2>
                    {error && <p className={"text-l text-red-400 mx-5 my-1"}>Error while adding, please check the fields</p>}
                </Flex>
                <Input placeholder={"Email"} onChange={(e) => setEmail(e.target.value)} value={player.mail}/>
                <Input placeholder={"Name"} onChange={(e) => setName(e.target.value)} value={player.name}/>
                <Button onClick={sendInvitation} type={"primary"}>Send invitation</Button>
            </Flex>
        </Flex>
    )
}



async function SendInvitation(player: Player) {
    try {
        const { data, error } = await supabase
            .from("player")
            .insert(player);
    } catch (e) {
        console.error(e);
    }
}
