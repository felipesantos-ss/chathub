import { Flex } from "antd";
import Chat from "../components/Chat";
import Header from "../components/Hearder"

const Home = () => {
    return(
        <Flex style={{ height: "100vh"}} vertical >
            <Header />
            <Chat />
        </Flex>
    )
}

export default Home;