import {
    Box,
    CircularProgress,
    IconButton,
    Image,
    Stack,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, uploadUserData } from "../redux/actions";
import { RootState } from "../redux/store";
import { UserData } from "../types/UserData";
import { FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import AddFile from "./Modals/AddFile";
import DeleteFile from "./Modals/DeleteFile";
import { FiLogOut } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import Gallery from "./Modals/Gallery";
import background from "../assets/background.jpg";
import Landing from "./Landing";

function Home() {
    const [fileToDelete, setFileToDelete] = useState("");
    const [imageToShow, setImageToShow] = useState("");
    const [fileNameToShow, setFileNameToShow] = useState("");
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
    const { logout, user, isAuthenticated, isLoading } = useAuth0();
    const dispatch = useDispatch();
    const currentUserData = useSelector<RootState, UserData>(
        (state) => state.currentUser
    );

    let username: string | undefined;

    useEffect(() => {
        if (!isLoading) {
            username =
                user &&
                (user.given_name?.toLowerCase() ||
                    user.nickname?.toLowerCase());
            console.log(username);

            const asincronica: any =
                username &&
                currentUserData.username === "undefined" &&
                dispatch<any>(getUserData(username)).then((res: any) => res);
        }
    }, [isLoading]);

    useEffect(() => {
        if (currentUserData.username === "") {
            username =
                user &&
                (user.given_name?.toLowerCase() ||
                    user.nickname?.toLowerCase());
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

    function openGallery(image: string, filename: string) {
        setImageToShow(image);
        setFileNameToShow(filename);
        onGalleryOpen();
    }
    console.log({ user });

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
                                    fontSize="1.5rem"
                                >
                                    {user?.given_name || user.nickname}
                                </Text>
                                <Box
                                    alignSelf="center"
                                    boxShadow="lg"
                                    p={{ base: ".1rem", lg: ".3rem" }}
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
                                        color={"white"}
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
                                                ? user.given_name?.toLowerCase()
                                                : user.nickname
                                                ? user.nickname.toLowerCase()
                                                : "noUserName"
                                        }
                                    />

                                    <IconButton
                                        borderRadius="full"
                                        bg="pink"
                                        mt="0 !important"
                                        icon={<FiLogOut />}
                                        aria-label="Logout"
                                        _hover={{ bg: "pinkLight" }}
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
                            h={"100%"}
                            width={{ base: "100%", lg: "80%" }}
                            overflow="scroll"
                            p={{
                                base: "1rem .1rem 20% .1rem",
                                lg: "1rem 2rem 1rem 2rem",
                            }}
                        >
                            <Box
                                borderRadius={"2xl"}
                                id="imagesContainer"
                                gap={".5rem"}
                                p={"1rem 2.5rem"}
                            >
                                {currentUserData.files?.map((file, index) => {
                                    const url: string = `https://o6dr3jtwo0.execute-api.us-east-1.amazonaws.com/dev/imagerapp-bucket/${
                                        user.given_name?.toLowerCase() ||
                                        user.nickname?.toLowerCase()
                                    }/${file.name}`;
                                    return (
                                        <Box
                                            mb={".5rem"}
                                            mt="0 !important"
                                            position="relative"
                                            key={`file:${file.time}`}
                                            bg={"white"}
                                            role="group"
                                            _hover={{ cursor: "pointer" }}
                                            borderRadius={"2xl"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                        >
                                            <Image
                                                p={".5rem"}
                                                borderRadius={"3xl"}
                                                w={"100%"}
                                                objectFit="cover"
                                                src={url}
                                                alt="Foto no se cargo"
                                                boxShadow={"lg"}
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
                                                borderRadius={"2xl"}
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
                                                    onClick={() =>
                                                        openGallery(
                                                            url,
                                                            file.name
                                                        )
                                                    }
                                                />
                                                <IconButton
                                                    mt="0 !important"
                                                    width="fit-content"
                                                    onClick={() =>
                                                        openDeleteModal(
                                                            file.name
                                                        )
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
                                    username={
                                        user.given_name?.toLowerCase() ||
                                        user.nickname?.toLowerCase() ||
                                        ""
                                    }
                                    image={imageToShow}
                                    isOpen={isGalleryOpen}
                                    onClose={onGalleryClose}
                                    images={currentUserData.files.map(
                                        (file) =>
                                            `https://o6dr3jtwo0.execute-api.us-east-1.amazonaws.com/dev/imagerapp-bucket/${
                                                user.given_name?.toLowerCase() ||
                                                user.nickname?.toLowerCase()
                                            }/${file.name}`
                                    )}
                                />
                                <DeleteFile
                                    isOpen={isDeleteFileOpen}
                                    onClose={onDeleteFileClose}
                                    username={
                                        user.given_name?.toLocaleLowerCase() ||
                                        user.nickname?.toLowerCase() ||
                                        "noUserName"
                                    }
                                    filename={fileToDelete}
                                    currentUserData={currentUserData}
                                />
                            </Box>
                        </Stack>
                    </Stack>
                </>
            ) : isLoading ? (
                <Stack
                    w={"100%"}
                    h={"100vh"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <CircularProgress
                        isIndeterminate
                        color={"pink"}
                        size={"10rem"}
                    />
                </Stack>
            ) : (
                <>
                    <Landing />
                </>
            )}
        </>
    );
}

export default Home;
