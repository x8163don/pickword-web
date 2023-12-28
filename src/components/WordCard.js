import {Card, CardBody, Typography} from "@material-tailwind/react";

export default function WordCard({className, word, speakType, languageType}) {


    const speakHandler = () => {
        let audio = ""
        if (speakType === "us") {
            audio = new Audio(word?.us_pronounce[0])
        } else {
            audio = new Audio(word?.uk_pronounce[0])
        }

        audio.play()
    }

    return <Card key={word.id} className={`w-96  ${className}`}>
        <CardBody className="flex flex-col grow">
            <div className="flex gap-2">
                <Typography variant="h5"
                            className="mb-2 mr-4 cursor-pointer text-blue-gray-700 hover:text-blue-gray-900"
                            onClick={speakHandler}
                >{word.text}</Typography>
                {/*<Typography variant="h6"*/}
                {/*            className="mb-2 mr-4 cursor-pointer text-blue-gray-700 hover:text-blue-gray-900"*/}
                {/*            onClick={speakHandler}*/}
                {/*>/lflaskdjf/</Typography>*/}
            </div>

            <div className="flex flex-col gap-4">
                {
                    word && word.part_of_speeches.map((pos, i) => {
                        return <div key={pos} className="flex gap-4">
                            <Typography variant="h6" className="">{pos.pos}</Typography>
                            {
                                languageType === "zh" &&
                                <Typography variant="h6"
                                            className="flex-1">{pos.means[0].chinese_traditional}</Typography>
                            }
                            {
                                languageType === "en" &&
                                <Typography variant="h6" className="flex-1">{pos.means[0].english}</Typography>
                            }
                        </div>
                    })
                }
            </div>
        </CardBody>
    </Card>
}
