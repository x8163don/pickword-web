import {Button, Card, CardBody, ButtonGroup, Typography} from "@material-tailwind/react";
import {useRef, useState} from "react";

export default function WordCard({className, word}) {

    const usRef = useRef()
    const ukRef = useRef()

    const [posIdx, setPosIdx] = useState(0)

    const posChangeHandler = (idx) => {
        setPosIdx(idx)
    }

    return <>
        <Card className={`mt-6 w-96 max-h-52 min-h-52 ${className}`}>
            <CardBody>
                <div className="flex mb-2">
                    <Typography variant="h5" color="blue-gray" className="mb-2 mr-4"> {word.text} </Typography>
                    <Button
                        size="sm"
                        variant="text"
                        className="mr-2"
                        onClick={() => usRef.current.play()}>
                        <span className="fi fi-us"></span>
                        <audio ref={usRef}>
                            {word.us_pronounce.map((src) => <source src={src}/>)}
                        </audio>
                    </Button>
                    <Button
                        size="sm"
                        variant="text"
                        onClick={() => ukRef.current.play()}
                    >
                        <span className="fi fi-gb"></span>
                        <audio ref={ukRef}>
                            {word.uk_pronounce.map((src) => <source src={src}/>)}
                        </audio>
                    </Button>

                </div>

                <ButtonGroup className="max-w-full mb-2" color="blue" size="sm">
                    {
                        word && word.part_of_speeches.map((pos, i) => <Button key={pos}
                                                                              onClick={() => posChangeHandler(i)}>{pos.pos}</Button>)}
                </ButtonGroup>

                <Typography>
                    {word.part_of_speeches[posIdx].means[0].chinese_traditional}
                </Typography>
                <Typography>
                    {word.part_of_speeches[posIdx].means[0].english}
                </Typography>
            </CardBody>
        </Card>
    </>
}
