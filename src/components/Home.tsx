import {
    Box,
    Button,
    CircularProgress,
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
import background from "../assets/background.jpg";
import jpgimage from "../assets/jpgs.svg";

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
    const { logout, user, isAuthenticated, isLoading, loginWithRedirect } =
        useAuth0();
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
                                                ? user.given_name?.toLowerCase()
                                                : user.nickname
                                                ? user.nickname.toLowerCase()
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
                            p={{
                                base: "1rem .1rem 20% .1rem",
                                lg: "2rem 1rem 2rem 2rem",
                            }}
                            overflowY="scroll"
                            h={{ base: "88%", lg: "100%" }}
                            alignSelf={{ base: "center", lg: "flex-end" }}
                            width={{ base: "100%", lg: "80%" }}
                            justifyContent={{
                                base: "center",
                                lg: "center",
                            }}
                            alignItems="center"
                            flexDirection="row"
                            flexWrap="wrap"
                            columnGap={{ base: "1rem", lg: ".5rem" }}
                            rowGap={{ base: "1rem", lg: ".5rem" }}
                        >
                            {currentUserData.files?.map((file, index) => {
                                const url: string = `https://o6dr3jtwo0.execute-api.us-east-1.amazonaws.com/dev/imagerapp-bucket/${
                                    user.given_name?.toLowerCase() ||
                                    user.nickname?.toLowerCase()
                                }/${file.name}`;
                                return (
                                    <Box
                                        border={"4px"}
                                        borderColor={"white"}
                                        mt="0 !important"
                                        position="relative"
                                        boxShadow="dark-lg"
                                        key={`file:${file.time}`}
                                        bg="white"
                                        boxSize={{ base: "45vw", lg: "220px" }}
                                        w={"30%"}
                                        minW={{ base: "40vw", lg: "220px" }}
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
                                                onClick={() =>
                                                    openGallery(url, file.name)
                                                }
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
                    <Stack
                        alignSelf={"center"}
                        height="100vh"
                        justifyContent="space-evenly"
                        w={"100%"}
                        alignItems="center"
                        mt="0 !important"
                        bgImg={background}
                        pb={"2rem"}
                    >
                        <Stack
                            flexDir={{ base: "column", md: "row" }}
                            w={"80%"}
                            bg={"whiteAlpha.900"}
                            p={{ base: "1.5rem .5rem", md: "3rem" }}
                            borderRadius={"xl"}
                            boxShadow={"dark-lg"}
                            rowGap={"2rem"}
                            h={"fit-content"}
                        >
                            <Stack
                                w={{ base: "100%", md: "60%" }}
                                h={{ base: "70%", md: "100%" }}
                                p={"0 5%"}
                                justifyContent={"space-between"}
                                rowGap={"1rem"}
                            >
                                <Stack>
                                    <Stack
                                        flexDir={{ base: "row", md: "column" }}
                                        wrap={"wrap"}
                                        justifyContent={{
                                            base: "center",
                                            md: "start",
                                        }}
                                    >
                                        <Text
                                            textAlign={"start"}
                                            fontSize={{
                                                base: "2xl",
                                                md: "3xl",
                                                lg: "4xl",
                                            }}
                                            position={"relative"}
                                            fontWeight={"bold"}
                                            w={"fit-content"}
                                            zIndex={1}
                                            _after={{
                                                content: "''",
                                                width: "full",
                                                height: "30%",
                                                position: "absolute",
                                                bottom: 1,
                                                left: 0,
                                                bg: "primary",
                                                zIndex: -1,
                                            }}
                                        >
                                            Upload once,
                                        </Text>
                                        <Text
                                            display={{
                                                base: "flex",
                                                md: "none",
                                            }}
                                        >
                                            &nbsp;
                                        </Text>
                                        <Text
                                            mt={"0 !important"}
                                            textAlign={"start"}
                                            fontSize={{
                                                base: "2xl",
                                                md: "3xl",
                                                lg: "4xl",
                                            }}
                                            w={"fit-content"}
                                            fontWeight={"bold"}
                                        >
                                            see everywhere!
                                        </Text>
                                    </Stack>
                                    <Text
                                        textAlign={{
                                            base: "center",
                                            md: "start",
                                        }}
                                        mt={".8rem !important"}
                                        color={"gray.500"}
                                        fontWeight={"bold"}
                                        fontSize={{ sm: "1rem", lg: "1.1rem" }}
                                    >
                                        Imager is a simple application to upload
                                        and store your images in the AWS S3
                                        service. You save them one time and then
                                        you can see them everywhere. Get your
                                        account and start saving your photos!
                                    </Text>
                                </Stack>
                                <Button
                                    alignSelf={"center"}
                                    borderRadius={"full"}
                                    p={"0 4rem"}
                                    w={{ base: "fit-content", md: "100%" }}
                                    onClick={() => loginWithRedirect()}
                                    bg={"primary"}
                                    _hover={{ bg: "primaryLight" }}
                                >
                                    Login
                                </Button>
                            </Stack>
                            <Box
                                userSelect={"none"}
                                bg={"pink"}
                                borderRadius={"10%"}
                                p={".8rem 1rem"}
                                w={{ base: "60%", md: "40%" }}
                                mt={"0 !important"}
                                alignSelf={"center"}
                                display={"flex"}
                                h={{ base: "30%", md: "100%" }}
                            >
                                <Image
                                    src={jpgimage}
                                    w={{ base: "auto", md: "100%" }}
                                    h={{ base: "100%", md: "auto" }}
                                />
                            </Box>
                        </Stack>
                    </Stack>
                </>
            )}
        </>
    );
}

export default Home;
