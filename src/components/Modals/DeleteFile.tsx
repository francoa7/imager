import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Stack,
    ModalFooter,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserFile, uploadUserData } from "../../redux/actions";
import { RootState } from "../../redux/store";
import { UserData } from "../../types/UserData";

type Inputs = {
    file: FileList;
};

function DeleteFile({
    isOpen,
    onClose,
    filename,
    username,
    currentUserData,
}: {
    isOpen: boolean;
    onClose: () => void;
    filename: string;
    username: string;
    currentUserData: UserData;
}) {
    const dispatch = useDispatch();
    const currentUser = useSelector<RootState, UserData>(
        (state) => state.currentUser
    );

    function deleteFile(file: string) {

        username &&
            dispatch<any>(deleteUserFile(file, username)).then(() => {
                const name = username || "noName";

                dispatch<any>(uploadUserData(name, currentUserData)).then(
                    onClose
                );
            });
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{`Confirm ${filename} deleting`}</ModalHeader>
                    <ModalCloseButton _focus={{ outline: "none" }} />
                    <ModalBody>
                        <Text>You won't be able to get it back</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="solid"
                            colorScheme="red"
                            onClick={() => deleteFile(filename)}
                        >
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default DeleteFile;
