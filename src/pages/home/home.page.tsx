import {Flex} from "antd";
import {BannerHome} from "./components/banner.home";
import {FileAddOutlined} from "@ant-design/icons";
import useHome from "./callbacks/useHome";
import {Dashboard} from "./components/dashboard";

export function HomePage() {
    const home = useHome();

    if (home.loading) {
        return <p>Loading...</p>
    }

    return (
        <Flex vertical>
            <BannerHome icon={<FileAddOutlined />} title={"Dashboard"}/>
            <Flex justify={"space-between"} align={"center"} className={"w-full mt-4 pl-4 pr-4 box-border"}>
                <Dashboard players={home.players} availableTeams={home.availableTeams}/>
            </Flex>
        </Flex>
    )
}