import { Stack, Button, Image } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";

function Start() {
    const { loginWithRedirect } = useAuth0();

    return (
        <Stack>
            <Navbar />
            <Stack
                height="100vh"
                justifyContent="center"
                alignItems="center"
                mt="0 !important"
            >
                <Button onClick={() => loginWithRedirect()}>Loginnnn</Button>;
            </Stack>
        </Stack>
    );
}

export default Start;
