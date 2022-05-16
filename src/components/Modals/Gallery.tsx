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
import background from "../../assets/background2.jpg";

function Gallery({
    isOpen,
    onClose,
    image,
    images,
}: {
    isOpen: boolean;
    onClose: () => void;
    image: string;
    images: Array<string>;
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
                <ModalContent bg="blackAlpha.900">
                    <ModalCloseButton
                        color="red"
                        bg="white"
                        border={"1px"}
                        borderColor={"white"}
                        _focus={{ outline: "none" }}
                        _hover={{ color: "white", bg: "red" }}
                    />
                    <ModalBody
                        display={"flex"}
                        justifyContent="center"
                        alignItems={"center"}
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
                        />
                        <IconButton
                            aria-label="next"
                            icon={<GrPrevious />}
                            mr="2rem"
                            onClick={() => changeImage("previous")}
                        />
                        <Stack w="80vw" alignItems={"center"}>
                            <Image
                                //   bg="white"
                                //   boxShadow="dark-lg"
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
                            onClick={() => changeImage("next")}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default Gallery;