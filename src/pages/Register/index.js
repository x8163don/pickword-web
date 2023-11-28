import {Card, CardHeader, CardBody, Button, Typography} from "@material-tailwind/react";

function Register() {
    return (
        <div className="flex h-screen justify-center items-center bg-gray-200">
            <Card className="mx-auto w-full max-w-[24rem]">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-4 grid h-24 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        註冊 PickWord
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Button
                        size="lg"
                        variant="outlined"
                        color="blue-gray"
                        className="flex items-center gap-3"
                    >
                        <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask"
                             className="h-6 w-6"/>
                        使用 Google 帳戶註冊
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}

export default Register