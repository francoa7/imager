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

    const { logout, user, isAuthenticated, isLoading } = useAuth0();
    const dispatch = useDispatch();
    const currentUserData = useSelector<RootState, UserData>(
        (state) => state.currentUser
    );

    useEffect(() => {
        user &&
            user.given_name &&
            dispatch<any>(getUserData(user.given_name.toLowerCase()));
    }, [isLoading]);

    let file = "nofile";

    function openDeleteModal(fileChange: string) {
        setFileToDelete(fileChange);
        onDeleteFileOpen();
    }

    return (
        <>
            {isAuthenticated && user && (
                <>
                    <Navbar />

                    <Stack
                        flexDirection="row"
                        id="homeContainer"
                        height="fit-content"
                        justifyContent="center"
                        alignItems="center"
                        mt="0 !important"
                        p="5rem 0 2rem 0"
                    >
                        <Stack
                            justifyContent="center"
                            id="userData"
                            width="30%"
                            position="fixed"
                            left="0"
                            top="0"
                            h="100vh"
                        >
                            <Stack
                                alignSelf="center"
                                width="70%"
                                id="userInfo"
                                bgGradient="linear(to-br, primary 30%,sky )"
                                p="2rem"
                                borderRadius="10px"
                                boxShadow="lg"
                            >
                                <Text
                                    color="white"
                                    fontWeight="900"
                                    fontSize="1.5rem"
                                >
                                    {user?.name}
                                </Text>
                                <Box
                                    alignSelf="center"
                                    boxShadow="lg"
                                    p=".4rem"
                                    bg="white"
                                    borderRadius="full"
                                    width="fit-content"
                                >
                                    <Image
                                        src={user?.picture}
                                        borderRadius="full"
                                        width="100px"
                                    />
                                </Box>
                                <Text>{user?.email}</Text>
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
                                            returnTo: "http://localhost:3000/",
                                        })
                                    }
                                >
                                    Logout
                                </Button>
                            </Stack>
                        </Stack>
                        <Stack width="30%" />
                        <Stack
                            width="70%"
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
            )}
        </>
    );
}

export default Home;
