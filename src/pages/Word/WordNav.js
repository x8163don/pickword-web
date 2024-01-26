import {Chip, IconButton, Input, Navbar, Typography} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import {LanguageIcon, SpeakerWaveIcon} from "@heroicons/react/24/outline";
import {useState} from "react";

export default function WordNav({onSearchTextChange, onSpeakTypeChange, onLanguageTypeChange, onMasteredTypeChange}) {

    const [speakType, setSpeakType] = useState("us")
    const [languageType, setLanguageType] = useState("zh")
    const [masteredType, setMasteredType] = useState(undefined)

    const masteredTypes = [
        {text: "全部", value: undefined},
        {text: "已掌握", value: true},
        {text: "未掌握", value: false}
    ]

    const speakTypeChangeHandler = () => {
        const newType = speakType === "us" ? "uk" : "us";
        setSpeakType(newType)
        onSpeakTypeChange(newType)
    }

    const languageTypeChangeHandler = () => {
        const newType = languageType === "zh" ? "en" : "zh";
        setLanguageType(newType)
        onLanguageTypeChange(newType)
    }

    const masteredTypeChangeHandler = () => {
        let idx = masteredTypes.findIndex(item => item.value === masteredType) + 1
        if (idx >= masteredTypes.length) {
            idx = 0
        }
        setMasteredType(masteredTypes[idx].value)
        onMasteredTypeChange(masteredTypes[idx].value)
    }

    return <Navbar className="max-w-full flex justify-between rounded-none">
        <div className="my-auto">
            <Typography variant="h6" color="gray">字卡</Typography>
        </div>

        <div className="flex gap-2">
            <IconButton
                className="hover:text-gray-800"
                variant="outlined"
                onClick={speakTypeChangeHandler}
            >
                <SpeakerWaveIcon className="w-6 h-6"/>
                <div className="uppercase">{speakType}</div>
            </IconButton>

            <IconButton
                className="hover:text-gray-800"
                variant="outlined"
                onClick={languageTypeChangeHandler}
            >
                <LanguageIcon className="w-6 h-6"/>
            </IconButton>
        </div>

        <div className="flex gap-4">
            <Chip
                variant="ghost"
                value={masteredTypes.find(item => item.value === masteredType).text}
                color={masteredType === undefined ? "gray" : masteredType ? "green" : "amber"}
                onClick={masteredTypeChangeHandler}
                className="cursor-pointer"
            />

            <div className="w-48">
                <Input
                    icon={<MagnifyingGlassIcon className="w-5 h-5"/>}
                    onChange={(e) => {
                        onSearchTextChange(e.currentTarget.value)
                    }}/>
            </div>
        </div>
    </Navbar>;
}