import { useAuth0, User } from "@auth0/auth0-react";
import { Image, Stack, Text } from "@chakra-ui/react";
import React from "react";

function Navbar() {
    const { logout, user, isAuthenticated, isLoading } = useAuth0();

    return (
        <Stack
            zIndex={3}
            display="flex"
            width="100vw"
            flexDirection="row"
            top="0"
            bg="steel"
            position="fixed"
            alignItems="center"
            p="2px 15%"
        >
            <Text>Navbar</Text>
            {user && (
                <Stack
                    id="userMenu"
                    alignItems="center"
                    justifySelf="flex-end"
                    mt="0 !important"
                >
                    <Image
                        src={user.picture}
                        width="40px"
                        borderRadius="full"
                    />
                </Stack>
            )}
        </Stack>
    );
}

export default Navbar;
