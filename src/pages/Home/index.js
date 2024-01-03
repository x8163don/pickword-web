import Logo from "../../assets/logo/logo.png";
import ReviewImg from "../../assets/review.png";
import WordImg from "../../assets/word.png";
import {
    Button,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import {createElement} from "react";
import {Square3Stack3DIcon, UserCircleIcon, BookOpenIcon} from "@heroicons/react/20/solid";
import {useNavigate} from "react-router-dom";
import TryFeature from "./TryFeature";

function Home() {

    const navigate = useNavigate();

    const data = [
        {
            label: "智慧追蹤高頻單字",
            value: "principle",
            icon: Square3Stack3DIcon,
            image: WordImg,
            desc: `根據您所有觀看的影片，自動分析出高頻出現的單字，並根據單字的重要度安排您的複習內容，讓學習單字達到複利效果。`,
        },
        {
            label: "遺忘曲線",
            value: "forget",
            icon: UserCircleIcon,
            image: ReviewImg,
            desc: `忘記是學習的自然過程，但我們有方法克服！依照遺忘曲線安排複習內容，確保你的學習能夠形成長期記憶。`,
        },
        {
            label: "學習歷程",
            value: "profile",
            icon: BookOpenIcon,
            image: "",
            desc: `即將推出`,
        },
    ];

    const toRegisterHandler = () => {
        navigate("/register");
    }

    return <main className="container mx-auto flex flex-col items-center">
        <div className="mt-24 mb-24 flex flex-col items-center">
            <img src={Logo} alt="logo" className="h-32 w-32 mb-4"/>
            <Typography variant="h1" color="blue-gray">訂製專屬於你的英文學習體驗</Typography>
            <Typography variant="h3" color="gray">自然而然培養語感，用複利效果學習單字</Typography>
            <Button className="mt-4" color="light-blue" size="lg" onClick={toRegisterHandler}>
                <Typography variant="h4" className="text-white">立即加入</Typography>
            </Button>
        </div>

        <div className="h-[calc(100vh-122px)]">
            <iframe
                    className="w-screen rounded-lg h-full xl:max-w-screen-xl xl:max-h-[549px] lg:max-w-screen-lg lg:max-h-[439px] md:max-w-screen-md md:max-h-[329px]"
                    src="https://www.youtube.com/embed/O1bEyUI_Ang?si=z1iyHCn5t0DHgA43&autoplay=1&controls=0"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
            ></iframe>
        </div>

        <div className="w-[176px] h-4 bg-blue-700"></div>
        <div className="w-full container mx-auto p-32">
            <Typography color="blue-gray" className="mb-16" variant="h3">每次遇到新單字就背單字？試試把時間花在常用的單字上！</Typography>
            <TryFeature/>
        </div>


        <div className="w-[176px] h-4 bg-blue-700"></div>
        <div className="w-full h-screen container mx-auto p-16">
            <Tabs value="principle" orientation="vertical">
                <TabsHeader className="w-40">
                    {data.map(({label, value, icon}) => (
                        <Tab key={value} value={value} className="p-8">
                            <div className="flex flex-col items-center gap-2">
                                {createElement(icon, {className: "w-10 h-10"})}
                                <Typography variant="h5">
                                    {label}
                                </Typography>
                            </div>
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {data.map(({value, desc, image}) => (
                        <TabPanel key={value} value={value}
                                  className="p-16 flex flex-col justify-center items-center gap-8">
                            {
                                value !== "profile" && <>
                                    {image &&
                                    <img className="h-96 rounded-lg object-cover object-center" src={image} alt="img"/>}
                                    <Typography variant="lead">{desc}</Typography>
                                </>
                            }
                            {
                                value === "profile" && <>
                                    <Typography className="h-96" color="amber" variant="h1">即將推出</Typography>
                                </>
                            }
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>

        <div className="w-[176px] h-4 bg-blue-700"></div>
        <div className="flex justify-center container p-16">
            <Button className="mt-4" color="light-blue" size="lg" onClick={toRegisterHandler}>
                <Typography variant="h4" className="text-white">立即加入</Typography>
            </Button>
        </div>

        {/*<Typography variant="h3">Main Function</Typography>*/}

        {/*<Typography variant="h3">Sub Function1</Typography>*/}
        {/*<Typography variant="h3">Sub Function2</Typography>*/}
        {/*<div>Price</div>*/}
        {/*<Button>CTA</Button>*/}
        {/*<div>Q&A</div>*/}
    </main>
}

export default Home