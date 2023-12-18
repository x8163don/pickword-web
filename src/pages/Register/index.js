import {Button, Card, CardBody, CardHeader, Spinner, Typography} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {doLogin} from "../../utils/auth";

function Register() {

    const navigate = useNavigate();

    const {
        mutate: doLoginMutate,
        isPending: isLoginPending,
    } = useMutation({
        mutationFn: doLogin,
        onSuccess: () => {
            navigate("/dashboard")
        }
    });

    useEffect(() => {
        // eslint-disable-next-line no-undef
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_OAUTH2_CLIENT_ID,
            callback: (response) => {
                doLoginMutate({thirtyPartyToken: response.credential, loginType: "google"})
            },
        })

        // eslint-disable-next-line no-undef
        google.accounts.id.renderButton(
            document.getElementById("g-login"),
            {width: 278, theme: "outline", size: "large", type: "standard", text: "signup_with"},
        )
    }, [doLoginMutate])

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
                    {!isLoginPending &&
                    <Button
                        id="g-login"
                        size="lg"
                        variant="outlined"
                        color="blue-gray"
                        className="flex items-center gap-3"
                    >
                        <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask"
                             className="h-6 w-6"/>
                        使用 Google 帳戶註冊
                    </Button>
                    }
                    {
                        isLoginPending && <Spinner size="lg"></Spinner>
                    }
                </CardBody>
            </Card>
        </div>
    );
}

export default Register