import {
    Box,
    Button,
    IconButton,
    Image,
    Link,
    Stack,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserFile, getUserData, uploadUserData } from "../redux/actions";
import { RootState } from "../redux/store";
import { UserData } from "../types/UserData";
import { UserFiles } from "../types/UserFiles";
import { FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import AddFile from "./Modals/AddFile";
import DeleteFile from "./Modals/DeleteFile";

function Home() {
    const [fileToDelete, setFileToDelete] = useState("");
    const {
        isOpen: isAddFileOpen,
        onOpen: onAddFileOpen,
        onClose: onAddFileClose,
    } = useDisclosure();
    const {
        isOpen: isDeleteFileOpen,
        onOpen: onDeleteFileOpen,
        onClose: onDeleteFileClose,
    } = useDisclosure();

    const { logout, user, isAuthenticated, isLoading, loginWithRedirect } =
        useAuth0();
    const dispatch = useDispatch();
    const currentUserData = useSelector<RootState, UserData>(
        (state) => state.currentUser
    );

    let username: string | undefined;

    useEffect(() => {
        if (!isLoading) {
            username = user && user.given_name?.toLowerCase();
            console.log({ username });

            const asincronica: any =
                username &&
                currentUserData.username === "undefined" &&
                dispatch<any>(getUserData(username)).then((res) => res);
            console.log({ asincronica });
        }
    }, [isLoading]);

    useEffect(() => {
        if (currentUserData.username === "") {
            console.log(currentUserData);
            console.log("CAMBIO");
            console.log(currentUserData.username.length);

            console.log("NO EXISTE, LO CREAMOS");
            username = user && user.given_name?.toLowerCase();
            console.log({ username });

            username &&
                dispatch<any>(uploadUserData(username, { files: [], username }))
                    .then(() => {
                        console.log("LO TOMAMOS DE NUEVO");

                        username && dispatch<any>(getUserData(username));
                    })
                    .catch((err) => console.log({ error: err }));
        }
    }, [currentUserData]);

    function openDeleteModal(fileChange: string) {
        setFileToDelete(fileChange);
        onDeleteFileOpen();
    }

    return (
        <>
            {isAuthenticated && user ? (
                <>
                    <Stack
                        overflow="hidden"
                        flexDirection={{ base: "column-reverse", lg: "row" }}
                        id="homeContainer"
                        height="100vh"
                        justifyContent={{ base: "flex-end", lg: "center" }}
                        alignItems="center"
                        mt="0 !important"
                    >
                        <Stack
                            zIndex={3}
                            justifyContent="center"
                            id="userData"
                            width={{ base: "100%", lg: "30%" }}
                            h={{ base: "10%", lg: "100vh" }}
                            position={{ base: "fixed", lg: "static" }}
                            bottom={{ base: "0" }}
                        >
                            <Stack
                                columnGap="1rem"
                                alignItems="center"
                                justifyContent="space-evenly"
                                flexDirection={{ base: "row", lg: "column" }}
                                maxH={{ base: "100%", lg: "100vh" }}
                                alignSelf="center"
                                width={{ base: "100%", lg: "70%" }}
                                id="userInfo"
                                bgGradient={{
                                    base: "linear(to-t, primary 100%,sky )",
                                    lg: "linear(to-br, primary 30%,sky )",
                                }}
                                p="2rem"
                                borderRadius={{ base: "0", lg: "10px" }}
                                boxShadow="lg"
                            >
                                <Text
                                    display={{ base: "none", lg: "flex" }}
                                    color="white"
                                    fontWeight="900"
                                    fontSize="1.5rem"
                                >
                                    {user?.name}
                                </Text>
                                <Box
                                    alignSelf="center"
                                    boxShadow="lg"
                                    p={{ base: ".1rem", lg: ".4rem" }}
                                    bg="white"
                                    borderRadius="full"
                                    width="fit-content"
                                >
                                    <Image
                                        src={user?.picture}
                                        borderRadius="full"
                                        width={{ base: "3em", lg: "100px" }}
                                    />
                                </Box>
                                <Text display={{ base: "none", lg: "flex" }}>
                                    {user?.email}
                                </Text>
                                <Stack flexDirection="row">
                                    <Stat>
                                        <StatLabel>Images</StatLabel>
                                        <StatNumber>
                                            {currentUserData.files?.length}
                                        </StatNumber>
                                    </Stat>
                                </Stack>
                                <Button
                                    borderRadius="full"
                                    alignSelf="center"
                                    bg="steel"
                                    color="white"
                                    w="fit-content"
                                    boxShadow="lg"
                                    onClick={onAddFileOpen}
                                >
                                    Add
                                </Button>
                                <AddFile
                                    isOpen={isAddFileOpen}
                                    onClose={onAddFileClose}
                                    username={
                                        user.given_name
                                            ? user.given_name.toLowerCase()
                                            : "noUserName"
                                    }
                                />

                                <Button
                                    onClick={() =>
                                        logout({
                                            returnTo: window.location.origin,
                                        })
                                    }
                                >
                                    Logout
                                </Button>
                            </Stack>
                        </Stack>
                        <Stack
                            p="2rem 1rem 2rem 1rem"
                            overflowY="scroll"
                            h={{ base: "80%", lg: "100%" }}
                            alignSelf={{ base: "center", lg: "flex-end" }}
                            width={{ base: "98%", lg: "70%" }}
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="row"
                            flexWrap="wrap"
                            columnGap="1rem"
                            rowGap="1rem"
                        >
                            {currentUserData.files?.map((file, index) => {
                                const url: string = `https://o6dr3jtwo0.execute-api.us-east-1.amazonaws.com/dev/imagerapp-bucket/${user.given_name?.toLowerCase()}/${file}`;

                                return (
                                    <Box
                                        position="relative"
                                        boxShadow="lg"
                                        key={`file:${index}`}
                                        p="0.5rem"
                                        bg="white"
                                        border="2px"
                                        borderRadius="10px"
                                        borderColor="sky"
                                        width="fit-content"
                                        height="fit-content"
                                        role="group"
                                        _hover={{ cursor: "pointer" }}
                                    >
                                        <Image
                                            boxSize="200px"
                                            w="fit-content"
                                            maxW="100%"
                                            src={url}
                                            alt="Foto no se cargo"
                                        />
                                        <Stack
                                            transition="all .3s"
                                            borderRadius="10px"
                                            opacity={0}
                                            _groupHover={{ opacity: "0.6" }}
                                            left="0"
                                            top="0"
                                            width="100%"
                                            position="absolute"
                                            bg="#000"
                                            height="100%"
                                            flexDirection="row"
                                            alignItems="center"
                                            justifyContent="center"
                                        />
                                        <Stack
                                            columnGap="2em"
                                            alignItems="center"
                                            justifyContent="center"
                                            flexDirection="row"
                                            top="45%"
                                            left="0"
                                            width="100%"
                                            position="absolute"
                                            opacity={0}
                                            transition="all .3s"
                                            _groupHover={{ opacity: "1" }}
                                        >
                                            <Link
                                                target="_blank"
                                                href={`https://o6dr3jtwo0.execute-api.us-east-1.amazonaws.com/dev/imagerapp-bucket/${user.given_name?.toLowerCase()}/${file}`}
                                            >
                                                <IconButton
                                                    width="fit-content"
                                                    aria-label="delete"
                                                    icon={<FaExternalLinkAlt />}
                                                    colorScheme="gray"
                                                />
                                            </Link>
                                            <IconButton
                                                mt="0 !important"
                                                width="fit-content"
                                                onClick={() =>
                                                    openDeleteModal(file)
                                                }
                                                aria-label="delete"
                                                icon={<FaTrash />}
                                                colorScheme="red"
                                            />
                                        </Stack>
                                    </Box>
                                );
                            })}
                            <DeleteFile
                                isOpen={isDeleteFileOpen}
                                onClose={onDeleteFileClose}
                                username={
                                    user.given_name?.toLocaleLowerCase() ||
                                    "noUserName"
                                }
                                filename={fileToDelete}
                                currentUserData={currentUserData}
                            />
                        </Stack>
                    </Stack>
                </>
            ) : isLoading ? (
                <Text>Loading</Text>
            ) : (
                <>
                    <Navbar />
                    <Stack
                        height="100vh"
                        justifyContent="center"
                        alignItems="center"
                        mt="0 !important"
                    >
                        <Button onClick={() => loginWithRedirect()}>
                            Login
                        </Button>
                        ;
                    </Stack>
                </>
            )}
        </>
    );
}

export default Home;
