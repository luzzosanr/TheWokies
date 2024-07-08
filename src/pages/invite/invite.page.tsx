import { Button, Flex } from "antd";
import useInvite from "./callbacks/useInvite";

export function InvitePage() {
    const invite = useInvite();
    
    if (invite.loading) {
        return <p>Loading...</p>
    }

    function acceptInvite() {
        invite.giveAnswer(true)
    }

    function refuseInvite() {
        invite.giveAnswer(false)
    }

    const choiceRedering = (
        <div>
            <h1 className={"text-xl font-bold"}>You are invited to participate</h1>
            <Flex className={"w-full my-5"} justify={"center"}>
                <Button type={"primary"} className={"bg-blue-400"} onClick={acceptInvite}>Accept</Button>
                <Button type={"primary"} className={"ml-4 bg-red-400"} onClick={refuseInvite}>Refuse</Button>
            </Flex>
        </div>
    )

    const refusedRendering = (
        <h1 className={"text-xl font-bold"}>You have refused the invitation</h1>
    )

    const acceptedRendering = (
        <h1 className={"text-xl font-bold"}>You have accepted the invitation</h1>
    )

    return (
        <Flex className={"h-full py-20"} align={"center"} vertical>
            {invite?.player.state === "RECEIVED_INVITE" && choiceRedering}
            {invite?.player.state === "REJECTED" && refusedRendering}
            {invite?.player.state === "ACCEPTED" && acceptedRendering}
        </Flex>
    )
}