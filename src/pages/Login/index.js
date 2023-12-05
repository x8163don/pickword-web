import {Card, CardHeader, CardBody, Button, Typography} from "@material-tailwind/react";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {doLogin} from "../../utils/auth";

function Login() {
    const navigate = useNavigate();

    const handleCallbackResponse = async (response) => {
        try {
            await doLogin(response.credential, "google")
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // eslint-disable-next-line no-undef
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_OAUTH2_CLIENT_ID,
            callback: handleCallbackResponse,
        })

        // eslint-disable-next-line no-undef
        google.accounts.id.renderButton(
            document.getElementById("g-login"),
            {width: 278, theme: "outline", size: "large", type: "standard", text: "signin_with"},
        )
    }, [])

    return (
        <div className="flex-1 flex justify-center items-center bg-gray-200">
            <Card className="mx-auto w-full max-w-[24rem]">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-4 grid h-24 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        登入 PickWord
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Button id="g-login"
                            size="lg"
                            variant="outlined"
                            color="blue-gray"
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

export default Login