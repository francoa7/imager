import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    FormControl,
    Input,
    Stack,
    Image,
    ModalFooter,
    IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import background from "../../assets/background.jpg";
import { FiDownload } from "react-icons/fi";
import axios from "axios";

function Gallery({
    isOpen,
    onClose,
    image,
    images,
    username,
}: {
    isOpen: boolean;
    onClose: () => void;
    image: string;
    images: Array<string>;
    username: string;
}) {
    const [currentImage, setCurrentImage] = useState("");

    function changeImage(to: string) {
        const compareWith = currentImage.length ? currentImage : image;
        let index = images.findIndex(
            (arrayImage) => arrayImage === compareWith
        );
        if (to === "next") {
            if (index === images.length - 1) {
                setCurrentImage(images[0]);
            } else setCurrentImage(images[++index]);
        } else if (to === "previous") {
            if (index === 0) {
                setCurrentImage(images[images.length - 1]);
            } else setCurrentImage(images[--index]);
        }
    }

    function downloadUserFile() {
        const splited = currentImage
            ? currentImage.split("/")
            : image?.split("/");
        const filename = splited[splited.length - 1];

        axios({
            url: `https://o6dr3jtwo0.execute-api.us-east-1.amazonaws.com/dev/imagerapp-bucket/${username}/${filename}`,
            method: "GET",
            responseType: "blob",
        })
            .then((response) => {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "image.jpg");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <Modal
                onClose={() => {
                    setCurrentImage("");
                    onClose();
                }}
                size={"full"}
                isOpen={isOpen}
                id="ELCONTENEDOR"
            >
                <ModalOverlay />
                <ModalContent bg="blackAlpha.900" borderRadius="0">
                    <ModalCloseButton
                        mt={"0 !important"}
                        size={"lg"}
                        p="1.2rem"
                        color="red"
                        bg="white"
                        _focus={{ outline: "none" }}
                        _hover={{
                            color: "white",
                            bgGradient: "linear(to-br, red ,pink )",
                        }}
                    />
                    <IconButton
                        aria-label="download button"
                        bg={"white"}
                        color={"primaryDark"}
                        icon={<FiDownload />}
                        fontSize={"lg"}
                        right={"5%"}
                        position={"absolute"}
                        top={"0"}
                        mt={"0.5rem !important"}
                        _focus={{ outline: "none" }}
                        _hover={{
                            color: "white",
                            bgGradient: "linear(to-br, primary  ,skobeloff )",
                        }}
                        onClick={() => downloadUserFile()}
                    />
                    <ModalBody
                        userSelect={"none"}
                        pt="2rem"
                        display={"flex"}
                        justifyContent={{ base: "space-evenly", lg: "center" }}
                        alignItems={"center"}
                        flexDir={{ base: "column", lg: "row" }}
                    >
                        <Image
                            src={background}
                            width="100vw"
                            h="100vh"
                            position={"fixed"}
                            top="0"
                            left="0"
                            zIndex={-1}
                            opacity={0.3}
                            filter="auto"
                            blur="2px"
                            objectFit={"cover"}
                        />
                        <IconButton
                            aria-label="next"
                            icon={<GrPrevious />}
                            mr="2rem"
                            onClick={() => changeImage("previous")}
                            display={{ base: "none", lg: "flex" }}
                            borderRadius="50% 10% 10% 50%"
                            _focus={{ outline: "none" }}
                            p="2.5rem 0"
                            _hover={{
                                bg: "#aaa",
                            }}
                        />
                        <Stack
                            w={{ base: "95vw", lg: "80vw" }}
                            h={{ base: "80vh" }}
                            alignItems={"center"}
                            justifyContent={{ base: "center" }}
                        >
                            <Image
                                borderRadius={"10px"}
                                transition={"all .3s"}
                                src={
                                    !currentImage.length ? image : currentImage
                                }
                                w="fit-content"
                                maxH="80vh"
                            />
                        </Stack>
                        <IconButton
                            aria-label="next"
                            icon={<GrNext />}
                            ml="2rem"
                            display={{ base: "none", lg: "flex" }}
                            onClick={() => changeImage("next")}
                            borderRadius="10% 50% 50% 10%"
                            _focus={{ outline: "none" }}
                            p="2.5rem 0"
                            _hover={{
                                bg: "#aaa",
                            }}
                        />
                        <Stack
                            display={{ base: "flex", lg: "none" }}
                            flexDir="row"
                        >
                            <IconButton
                                aria-label="next"
                                icon={<GrPrevious />}
                                mr="2rem"
                                onClick={() => changeImage("previous")}
                                display={{ base: "flex", lg: "none" }}
                            />
                            <IconButton
                                mt="0 !important"
                                aria-label="next"
                                icon={<GrNext />}
                                ml="2rem"
                                display={{ base: "flex", lg: "none" }}
                                onClick={() => changeImage("next")}
                            />
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Gallery;
