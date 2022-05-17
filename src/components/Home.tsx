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
import { FiLogOut } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import Gallery from "./Modals/Gallery";
import background from "../assets/background2.jpg";

function Home() {
    const [fileToDelete, setFileToDelete] = useState("");
    const [imageToShow, setImageToShow] = useState("");
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
    const {
        isOpen: isGalleryOpen,
        onOpen: onGalleryOpen,
        onClose: onGalleryClose,
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

            const asincronica: any =
                username &&
                currentUserData.username === "undefined" &&
                dispatch<any>(getUserData(username)).then((res: any) => res);
        }
    }, [isLoading]);

    useEffect(() => {
        if (currentUserData.username === "") {
            username = user && user.given_name?.toLowerCase();
            username &&
                dispatch<any>(uploadUserData(username, { files: [], username }))
                    .then(() => {
                        username && dispatch<any>(getUserData(username));
                    })
                    .catch((err: any) => console.log({ error: err }));
        }
    }, [currentUserData]);

    function openDeleteModal(fileChange: string) {
        setFileToDelete(fileChange);
        onDeleteFileOpen();
    }

    function openGallery(image: string) {
        setImageToShow(image);
        onGalleryOpen();
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
                        fontFamily="asap"
                        bgImg={background}
                    >
                        <Stack
                            zIndex={3}
                            justifyContent="center"
                            id="userData"
                            width={{ base: "100%", lg: "20%" }}
                            h={{ base: "12%", lg: "100vh" }}
                            position={{ base: "fixed", lg: "static" }}
                            bottom={{ base: "0" }}
                        >
                            <Stack
                                columnGap="1rem"
                                alignItems="center"
                                justifyContent="center"
                                rowGap="1rem"
                                flexDirection={{ base: "row", lg: "column" }}
                                maxH={{ base: "100%", lg: "100vh" }}
                                h={{ base: "100%", lg: "100%" }}
                                alignSelf="center"
                                width={{ base: "100%", lg: "100%" }}
                                id="userInfo"
                                bgGradient={{
                                    base: "linear(to-br, primary 100%,white )",
                                    lg: "linear(to-br, primary 100%,white)",
                                }}
                                p={{ base: "none", lg: "3rem 4rem 3rem 1rem" }}
                                borderRight={{ base: "none", lg: "4px" }}
                                borderTop={{ base: "4px", lg: "none" }}
                                borderColor={{ base: "pink", lg: "pink" }}
                                borderRadius={{
                                    base: "0",
                                    lg: "0 50% 50% 0",
                                }}
                                boxShadow="dark-lg"
                            >
                                <Text
                                    display={{ base: "none", lg: "flex" }}
                                    color="black"
                                    fontWeight="900"
                                    fontSize="2rem"
                                >
                                    {user?.given_name}
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
                                        width={{ base: "3em", lg: "130px" }}
                                    />
                                </Box>
                                {/* <Text display={{ base: "none", lg: "flex" }}>
                                    {user?.email}
                                </Text> */}
                                <Stack flexDirection="row">
                                    <Stat>
                                        <StatLabel
                                            fontSize="1rem"
                                            fontWeight={700}
                                        >
                                            Images
                                        </StatLabel>
                                        <StatNumber>
                                            {currentUserData.files?.length}
                                        </StatNumber>
                                    </Stat>
                                </Stack>
                                <Stack flexDir="row" columnGap="2rem">
                                    <IconButton
                                        borderRadius="full"
                                        alignSelf="center"
                                        bg="primaryDark"
                                        color="white"
                                        w="fit-content"
                                        boxShadow="lg"
                                        onClick={onAddFileOpen}
                                        _hover={{ bg: "skobeloff" }}
                                        icon={<IoAdd />}
                                        aria-label="Add"
                                        _active={{
                                            bg: "primaryDark",
                                            outline: "none",
                                        }}
                                        _focus={{ outline: "none" }}
                                    >
                                        Add
                                    </IconButton>
                                    <AddFile
                                        isOpen={isAddFileOpen}
                                        onClose={onAddFileClose}
                                        username={
                                            user.given_name
                                                ? user.given_name.toLowerCase()
                                                : "noUserName"
                                        }
                                    />

                                    <IconButton
                                        borderRadius="full"
                                        border="2px"
                                        borderColor="primaryDark"
                                        bg="transparent"
                                        color="primaryDark"
                                        mt="0 !important"
                                        icon={<FiLogOut />}
                                        aria-label="Logout"
                                        _hover={{ bg: "primaryLight" }}
                                        onClick={() =>
                                            logout({
                                                returnTo:
                                                    window.location.origin,
                                            })
                                        }
                                    >
                                        Logout
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Stack
                            id="imagesContainer"
                            p="2rem 1rem 2rem 2rem"
                            overflowY="scroll"
                            h={{ base: "88%", lg: "100%" }}
                            alignSelf={{ base: "center", lg: "flex-end" }}
                            width={{ base: "98%", lg: "80%" }}
                            justifyContent={{
                                base: "center",
                                lg: "center",
                            }}
                            alignItems="center"
                            flexDirection="row"
                            flexWrap="wrap"
                            columnGap=".5rem"
                            rowGap=".5rem"
                        >
                            {currentUserData.files?.map((file, index) => {
                                const url: string = `https://o6dr3jtwo0.execute-api.us-east-1.amazonaws.com/dev/imagerapp-bucket/${user.given_name?.toLowerCase()}/${
                                    file.name
                                }`;
                                return (
                                    <Box
                                        border={"4px"}
                                        borderColor={"white"}
                                        mt="0 !important"
                                        position="relative"
                                        boxShadow="dark-lg"
                                        key={`file:${file.time}`}
                                        bg="white"
                                        boxSize={{ base: "120px", lg: "220px" }}
                                        w={"30%"}
                                        minW={{ base: "120px", lg: "220px" }}
                                        role="group"
                                        _hover={{ cursor: "pointer" }}
                                    >
                                        <Image
                                            minW="100%"
                                            h="100%"
                                            objectFit="cover"
                                            src={url}
                                            alt="Foto no se cargo"
                                        />
                                        <Stack
                                            transition="all .3s"
                                            opacity={0}
                                            _groupHover={{ opacity: "0.6" }}
                                            left="0"
                                            top="0"
                                            width="100%"
                                            height="100%"
                                            position="absolute"
                                            bg="#000"
                                            flexDirection="row"
                                            alignItems="center"
                                            justifyContent="center"
                                        />
                                        <Stack
                                            id="imageActions"
                                            alignItems="center"
                                            justifyContent="space-evenly"
                                            flexDirection="row"
                                            top="0"
                                            left="0"
                                            width="100%"
                                            height="100%"
                                            position="absolute"
                                            opacity={0}
                                            transition="all .3s"
                                            _groupHover={{ opacity: "1" }}
                                        >
                                            <IconButton
                                                width="fit-content"
                                                aria-label="delete"
                                                icon={<FaExternalLinkAlt />}
                                                colorScheme="gray"
                                                onClick={() => openGallery(url)}
                                            />
                                            <IconButton
                                                mt="0 !important"
                                                width="fit-content"
                                                onClick={() =>
                                                    openDeleteModal(file.name)
                                                }
                                                aria-label="delete"
                                                icon={<FaTrash />}
                                                colorScheme="red"
                                            />
                                        </Stack>
                                    </Box>
                                );
                            })}
                            <Gallery
                                image={imageToShow}
                                isOpen={isGalleryOpen}
                                onClose={onGalleryClose}
                                images={currentUserData.files.map(
                                    (file) =>
                                        `https://o6dr3jtwo0.execute-api.us-east-1.amazonaws.com/dev/imagerapp-bucket/${user.given_name?.toLowerCase()}/${
                                            file.name
                                        }`
                                )}
                            />
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
