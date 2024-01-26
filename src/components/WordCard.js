import {Card, CardBody, CardFooter, IconButton, Tooltip, Typography} from "@material-tailwind/react";
import {CheckIcon} from "@heroicons/react/24/solid";

export default function WordCard({
                                     className,
                                     word,
                                     speakType,
                                     languageType,
                                     mastered = false,
                                     isShowController = false,
                                     onMasteredChange
                                 }) {

    const speakHandler = () => {
        let audio = ""
        if (speakType === "us") {
            audio = new Audio(word?.us_pronounce[0])
        } else {
            audio = new Audio(word?.uk_pronounce[0])
        }

        audio.play()
    }

    return <Card className={`w-96  ${className}`}>
        <CardBody className="flex flex-col grow h-56">
            <div className="flex gap-2">
                <Typography variant="h5"
                            className="mb-2 mr-4 cursor-pointer text-blue-gray-700 hover:text-blue-gray-900"
                            onClick={speakHandler}
                >{word.text}</Typography>

                {
                    speakType === "us" && <Typography variant="h6"
                                                      className="mb-2 mr-4 cursor-pointer text-blue-gray-700 hover:text-blue-gray-900"
                                                      onClick={speakHandler}
                    >{word.us_ipa}</Typography>
                }
                {
                    speakType === "uk" && <Typography variant="h6"
                                                      className="mb-2 mr-4 cursor-pointer text-blue-gray-700 hover:text-blue-gray-900"
                                                      onClick={speakHandler}
                    >{word.uk_ipa}</Typography>
                }
            </div>

            <div className="flex-1 flex flex-col gap-2 text-ellipsis overflow-hidden">
                {
                    word && word.part_of_speeches.map((pos, i) => {
                        return <div key={i} className="flex gap-4">
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
        {
            isShowController && <CardFooter className="flex justify-end">
                <Tooltip content="已掌握">
                    <IconButton variant="outlined"
                                className="rounded-full"
                                color={mastered ? "green" : "gray"}
                                onClick={() => onMasteredChange(word.id, !mastered)}
                    >
                        <CheckIcon className="h-5 w-5"/>
                    </IconButton>
                </Tooltip>
            </CardFooter>
        }
    </Card>
}
