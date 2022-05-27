import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Image, Link, Stack, Text } from "@chakra-ui/react";
import background from "../assets/background.jpg";
import jpgimage from "../assets/jpgs.svg";

function Landing() {
    const { loginWithRedirect } = useAuth0();
    return (
        <Stack
            alignSelf={"center"}
            height="100vh"
            justifyContent="center"
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
                mb={"2rem"}
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
                            Imager is a simple application to upload and store
                            your images in the AWS S3 service. You save them one
                            time and then you can see them everywhere. Get your
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
            <Link
                _focus={{ outline: "none" }}
                target={"_blank"}
                href="https://francoangulo.vercel.app/"
                textShadow={"1px 1px pink"}
                fontWeight={"bold"}
                borderRadius={"full"}
                p={".2rem 1rem"}
                _hover={{ bg: "whiteAlpha.600" }}
            >
                About
            </Link>
        </Stack>
    );
}

export default Landing;
