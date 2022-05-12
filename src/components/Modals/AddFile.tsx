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
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { uploadUserData, uploadUserFile } from "../../redux/actions";
import { RootState } from "../../redux/store";
import { UserData } from "../../types/UserData";

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
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const dispatch = useDispatch();
    const currentUser = useSelector<RootState, UserData>(
        (state) => state.currentUser
    );

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        console.log(data.file[0].name.split(".")[1]);
        const fileExtension: string = data.file[0].name.split(".")[1];
        if (
            // (fileExtension !== "png" &&
            //     fileExtension !== "jpeg" &&
            //     fileExtension !== "jpg") ||
            username === "noUserName"
        )
            return;
        dispatch<any>(uploadUserFile(data.file[0], username))
            .then(() => {
                dispatch<any>(uploadUserData(username, currentUser)).then(
                    onClose
                );
            })
            .catch((err: any) => alert(err));
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
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
