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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { uploadUserData, uploadUserFile } from "../../redux/actions";
import { RootState } from "../../redux/store";
import { UserData } from "../../types/UserData";
import imageCompression from "browser-image-compression";

type Inputs = {
    file: FileList;
};

function AddFile({
    isOpen,
    onClose,
    username,
}: {
    isOpen: boolean;
    onClose: () => void;
    username: string;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const dispatch = useDispatch();
    const currentUser = useSelector<RootState, UserData>(
        (state) => state.currentUser
    );
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        if (changed)
            dispatch<any>(uploadUserData(username, currentUser)).then(onClose);
    }, [currentUser, changed]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (username === "noUserName") return;
        const compressedFile = await compressFile(data.file[0]);
        compressedFile &&
            dispatch<any>(uploadUserFile(compressedFile, username)).then(() =>
                setChanged(true)
            );
    };

    async function compressFile(file: File) {
        const imageFile = file;
        console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        let compressedFile;
        try {
            compressedFile = await imageCompression(imageFile, options);
            console.log(
                "compressedFile instanceof Blob",
                compressedFile instanceof Blob
            ); // true
            console.log(
                `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
            ); // smaller than maxSizeMB
            // await uploadToServer(compressedFile); // write your own logic
        } catch (error) {
            console.log(error);
        }
        return compressedFile;
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent fontFamily={"raleway"}>
                    <ModalHeader>Select your file to upload</ModalHeader>
                    <ModalCloseButton _focus={{ outline: "none" }} />
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl
                                mt="1rem"
                                rowGap="2rem"
                                flexDirection="column"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                mb="2rem"
                            >
                                <Input
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    w="fit-content"
                                    h="fit-content"
                                    {...register("file", {
                                        required: true,
                                    })}
                                    border="none"
                                />
                                {errors.file && (
                                    <Text color="red">
                                        The file is required
                                    </Text>
                                )}

                                <Stack flexDirection="row" columnGap="2rem">
                                    <Button
                                        alignSelf="center"
                                        type="submit"
                                        w="fit-content"
                                        variant="solid"
                                        colorScheme="green"
                                    >
                                        Send
                                    </Button>
                                    <Button
                                        variant="outline"
                                        colorScheme="red"
                                        mt="0 !important"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </FormControl>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddFile;
